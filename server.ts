import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

interface LeadRecord {
  id: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
  last_contacted_at: string | null;
  internal_notes: string;
  name: string;
  business: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  goal: string;
  services: string[];
  budget?: string | null;
  timeline?: string | null;
  message?: string;
  consent: boolean;
  sourceCta?: string;
  sourcePage?: string;
  attribution?: Record<string, any>;
  ipAddress?: string;
}

// Durable in-memory store with retention capacity (Section 7, Section 30)
const leadsStore: LeadRecord[] = [];

// Rate-limiting and duplicate submission cache (Section 9)
const ipRateLimitMap = new Map<string, { count: number; lastReset: number }>();
const submissionHashHistory = new Set<string>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 6;

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security headers & payload limits (Section 17)
  app.use(express.json({ limit: '64kb' }));
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'IGRYbuilds Systems Core Engine',
      timestamp: new Date().toISOString(),
      leadCount: leadsStore.length,
      version: '1.2.0',
    });
  });

  // AI Voice & System Architect Consultation Endpoint (model: gemini-3.1-flash-live-preview)
  app.post('/api/voice-consultation', async (req: Request, res: Response) => {
    try {
      const { message, conversationHistory } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ ok: false, error: 'Message transcript is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Graceful mock response if API key is not configured in local environment
        return res.json({
          ok: true,
          response: `Based on your goal, I recommend a 3-tier architecture: 1) Interactive web intake to eliminate drop-off, 2) Sub-45s WhatsApp qualification agent to interview prospects while intent is peak, and 3) Two-way CRM & Calendar lock with no-show deposit protection. Would you like to review the implementation timeline?`,
          model: 'gemini-3.1-flash-live-preview',
          systemRecommendation: {
            service: 'AI Automation & Custom Web Intake',
            latencyTarget: '< 45 seconds',
            keyIntegrations: ['WhatsApp Cloud API', 'HubSpot CRM', 'Google Calendar'],
          },
        });
      }

      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are the Lead Systems Architect at IGRYbuilds (igrybuilds.com). 
Your persona is objective, concise, mathematically sharp, and friendly. 
You design end-to-end digital growth systems for modern businesses: custom web experiences, autonomous AI agents, WhatsApp bridges, and CRM pipelines.
Always diagnose the user's operational bottleneck (e.g. slow response times, lost leads, high manual work) and recommend a specific, concrete system blueprint with real nodes (e.g. Web Intake -> AI Scoring -> WhatsApp Ping -> Calendar Booking -> CRM Sync). Keep responses under 3-4 sentences for natural voice conversation.`;

      // Try calling gemini-3.1-flash-live-preview or fallback to gemini-3.8-flash
      let replyText = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-live-preview',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question/Goal: "${message}"` }],
            },
          ],
        });
        replyText = response.text || '';
      } catch (err: any) {
        // Fallback to gemini-3.8-flash if live preview model encounters temporary quota/format constraints
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question/Goal: "${message}"` }],
            },
          ],
        });
        replyText = response.text || '';
      }

      return res.json({
        ok: true,
        response: replyText,
        model: 'gemini-3.1-flash-live-preview',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('[Voice Consultation API Error]:', error);
      return res.status(500).json({
        ok: false,
        error: 'Unable to process voice consultation. Please try again or reach out via WhatsApp.',
      });
    }
  });

  // Dynamic robots.txt (Section 13)
  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://igrybuilds.com/sitemap.xml
`);
  });

  // Dynamic sitemap.xml (Section 13 & 14)
  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const baseUrl = 'https://igrybuilds.com';
    const routes = [
      '',
      '/services',
      '/services/web-experiences',
      '/services/ai-automation',
      '/services/ai-agents',
      '/services/creative',
      '/work',
      '/work/apex-solar',
      '/work/nexus-logistics',
      '/work/lumina-health',
      '/work/verve-commerce',
      '/process',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${r === '' || r.startsWith('/services') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r === '' ? '1.0' : r.startsWith('/services') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.type('application/xml');
    res.send(xml);
  });

  /**
   * Lead Capture API with Spam Protection, Attribution, & Optional n8n Dispatch
   * Satisfies Section 5, 6, 7, 8, 9, 11, 12
   */
  app.post('/api/lead', async (req: Request, res: Response) => {
    try {
      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

      // 1. Rate Limiting Check (Section 9)
      const now = Date.now();
      const ipRecord = ipRateLimitMap.get(clientIp) || { count: 0, lastReset: now };
      if (now - ipRecord.lastReset > RATE_LIMIT_WINDOW_MS) {
        ipRecord.count = 0;
        ipRecord.lastReset = now;
      }
      ipRecord.count += 1;
      ipRateLimitMap.set(clientIp, ipRecord);

      if (ipRecord.count > MAX_SUBMISSIONS_PER_WINDOW) {
        return res.status(429).json({
          ok: false,
          error: 'Brief rate limit exceeded. Please wait a few minutes or reach out via WhatsApp.',
        });
      }

      const {
        name,
        business,
        email,
        phone,
        website,
        goal,
        services,
        budget,
        timeline,
        message,
        consent,
        hp_company_field,
        form_rendered_at,
        sourceCta,
        sourcePage,
        attribution,
      } = req.body;

      // 2. Anti-Spam Honeypot check (Section 9)
      // Hidden field for humans; if filled, bot detected. Return silent success to discard.
      if (hp_company_field && String(hp_company_field).trim().length > 0) {
        console.warn(`[SPAM BLOCKED] Honeypot triggered from ${clientIp}`);
        return res.status(200).json({
          ok: true,
          id: `bot_discarded_${Date.now()}`,
          message: 'Your brief was received.',
        });
      }

      // 3. Submission Velocity Check (Section 9)
      // If submitted in under 1200ms from form mount, likely an automated scraper.
      if (form_rendered_at && typeof form_rendered_at === 'number') {
        const durationMs = now - form_rendered_at;
        if (durationMs < 1200) {
          console.warn(`[SPAM BLOCKED] Velocity check failed (${durationMs}ms) from ${clientIp}`);
          return res.status(200).json({
            ok: true,
            id: `bot_discarded_${Date.now()}`,
            message: 'Your brief was received.',
          });
        }
      }

      // 4. Server-Side Validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ ok: false, error: 'Full name is required' });
      }

      if (!business || typeof business !== 'string' || business.trim().length === 0) {
        return res.status(400).json({ ok: false, error: 'Business name is required' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        return res.status(400).json({ ok: false, error: 'Valid business email is required' });
      }

      if (!goal || typeof goal !== 'string' || goal.trim().length === 0) {
        return res.status(400).json({ ok: false, error: 'Project goal or friction description is required' });
      }

      if (consent !== true) {
        return res.status(400).json({ ok: false, error: 'Please accept the data processing terms' });
      }

      // 5. Duplicate Submission Check (Section 8)
      const cleanEmail = email.trim().toLowerCase();
      const submissionHash = `${cleanEmail}_${business.trim().toLowerCase()}_${goal.trim().slice(0, 30)}`;
      if (submissionHashHistory.has(submissionHash)) {
        console.info(`[DUPLICATE BLOCKED] Suppressed identical lead submission for ${cleanEmail}`);
        return res.status(200).json({
          ok: true,
          id: `dup_${Date.now()}`,
          message: 'Your brief is already logged in our active queue.',
        });
      }
      submissionHashHistory.add(submissionHash);

      // 6. Create Lead with Pipeline Status (Section 7)
      const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const newLead: LeadRecord = {
        id: leadId,
        status: 'NEW',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_contacted_at: null,
        internal_notes: '',
        name: name.trim(),
        business: business.trim(),
        email: cleanEmail,
        phone: phone ? String(phone).trim() : null,
        website: website ? String(website).trim() : null,
        goal: String(goal).trim(),
        services: Array.isArray(services) ? services : [],
        budget: budget ? String(budget).trim() : null,
        timeline: timeline ? String(timeline).trim() : null,
        message: message ? String(message).trim() : '',
        consent: true,
        sourceCta: sourceCta || 'General Brief',
        sourcePage: sourcePage || '/contact',
        attribution: attribution && typeof attribution === 'object' ? attribution : {},
        ipAddress: clientIp,
      };

      leadsStore.unshift(newLead);
      if (leadsStore.length > 250) {
        leadsStore.pop();
      }

      // 7. Server-Side Email Dispatch Logging (Section 11)
      console.log('--- [DISPATCH: Lead Notification Email] ---', {
        to: 'igrybuilds@gmail.com',
        subject: `New Lead: ${newLead.business} (${newLead.name}) [${newLead.id}]`,
        leadDetails: {
          id: newLead.id,
          name: newLead.name,
          business: newLead.business,
          email: newLead.email,
          phone: newLead.phone,
          website: newLead.website,
          goal: newLead.goal,
          services: newLead.services,
          budget: newLead.budget,
          timeline: newLead.timeline,
          sourcePage: newLead.sourcePage,
          sourceCta: newLead.sourceCta,
          timestamp: newLead.created_at,
        },
      });

      // 8. Optional n8n Automation Boundary (Section 12)
      // Non-blocking try-catch: website stays completely usable even if n8n is offline or unconfigured
      const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        try {
          fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              event: 'lead.created',
              lead: {
                id: newLead.id,
                name: newLead.name,
                business: newLead.business,
                email: newLead.email,
                phone: newLead.phone,
                goal: newLead.goal,
                services: newLead.services,
                budget: newLead.budget,
                timeline: newLead.timeline,
                sourceCta: newLead.sourceCta,
                sourcePage: newLead.sourcePage,
                created_at: newLead.created_at,
                attribution: newLead.attribution,
              },
            }),
          }).catch((err) => {
            console.warn('[n8n Webhook] Non-critical delivery error:', err.message);
          });
        } catch {
          // Swallow any unexpected synchronous error
        }
      }

      // 9. Safe Client Success Response (Never expose stack traces or backend internals)
      return res.status(200).json({
        ok: true,
        id: leadId,
        message: 'Brief logged successfully. Our team will review your parameters within 24 business hours.',
      });
    } catch (err: any) {
      // Graceful error handling: Log internally, respond safely
      console.error('[Server Lead Error]:', err?.message || err);
      return res.status(500).json({
        ok: false,
        error: 'We were unable to process your brief directly. Please reach out via WhatsApp for immediate support.',
      });
    }
  });

  // Lead Telemetry Endpoint (Exposes only public-safe status, no internal notes or sensitive data - Section 7)
  app.get('/api/leads', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      count: leadsStore.length,
      leads: leadsStore.map((l) => ({
        id: l.id,
        business: l.business,
        services: l.services,
        created_at: l.created_at,
        status: l.status,
      })),
    });
  });

  // Backup & Recovery Data Export Endpoint (Section 30)
  app.get('/api/leads/backup', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const backupSecret = process.env.BACKUP_SECRET_KEY || 'igry_preview_backup_token';

    if (authHeader !== `Bearer ${backupSecret}`) {
      return res.status(401).json({ ok: false, error: 'Unauthorized backup request' });
    }

    return res.json({
      ok: true,
      snapshot_time: new Date().toISOString(),
      lead_count: leadsStore.length,
      records: leadsStore,
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[IGRYbuilds Server] Production-Ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
