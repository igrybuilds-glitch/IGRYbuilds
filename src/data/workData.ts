import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'dental-growth-system',
    title: 'Dental Clinic Patient Acquisition & Recall System',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate how an automated patient intake, WhatsApp booking, and missed-appointment recall workflow operates without front-desk manual overhead.',
    client: 'Apex Dental Practice (Concept Demonstration)',
    industry: 'Healthcare & Dental Practices',
    category: 'Automation',
    tagline: 'Automated Patient Booking, Pre-Op Triage & WhatsApp Recall Engine',
    summary: 'Autonomous clinical pipeline replacing phone tag and paper intake forms with interactive treatment triage, real-time chair reservation, and automated 6-month checkup recall sequences.',
    objective: 'Demonstrate automated patient intake, chair booking, WhatsApp confirmations, reminder sequences, and missed-appointment follow-up.',
    problem: 'Dental clinics experience 18–22% appointment no-shows, front-desk staff overwhelmed with routine rescheduling calls, and high patient attrition due to forgotten 6-month cleaning recalls.',
    oldWorkflowSteps: [
      'Patient visits static contact page and submits unmonitored inquiry form',
      'Receptionist calls back 4 hours later; patient does not answer unfamiliar number',
      'Fragmented WhatsApp messages exchanged over 2 days to find an open chair slot',
      'Patient forgets appointment; dental chair sits empty incurring overhead loss',
      'Zero automated follow-up; patient is lost to competitive neighborhood practice'
    ],
    solution: 'IGRYbuilds engineered an end-to-end patient growth system: a responsive web triage interface, sub-45 second WhatsApp verification agent, direct practice management calendar integration, and automated 48h/2h reminder sequences with digital intake signature links.',
    newArchitectureSteps: [
      'Website visitor selects dental concern on interactive treatment visualizer',
      'Autonomous WhatsApp Agent verifies insurance carrier and suggests dentist availability',
      'Patient selects 30-min slot; calendar updates immediately with chair assignment',
      'Automated medical history form sent via WhatsApp with digital signature',
      'Pre-op prep reminders dispatched at 48h and 2h prior to arrival',
      'Post-visit review request triggered 3 hours after completed appointment',
      'Automated 6-month recall notification re-engages patient for routine hygiene check'
    ],
    outcome: 'Eliminates reception phone tag, drives appointment confirmations within 2 minutes of inquiry, and automates 100% of routine recall messaging.',
    metrics: [
      { label: 'Booking Response', value: '< 45s', change: 'Instant triage' },
      { label: 'Simulated No-Show Rate', value: '< 3.2%', change: 'Down from 21%' },
      { label: 'Admin Hours Saved', value: '18 hrs/wk', change: 'Automated intake' },
      { label: 'Recall Re-engagement', value: '88%', change: 'Automated 6-mo ping' },
    ],
    stack: ['React 19', 'WhatsApp Cloud API', 'Practice Management Webhook', 'Tailwind CSS', 'Google Calendar API', 'PostgreSQL'],
    deliverables: [
      'Responsive Dental Website & Interactive Treatment Selector',
      'Autonomous WhatsApp Inbound Patient Triage Agent',
      'Real-Time Dentist Chair Scheduling Integration',
      'Pre-Appointment Digital Intake & Medical History Signature Flow',
      'Automated 48h/2h Appointment Reminder Engine',
      'Automated Post-Treatment Google Review & 6-Month Recall Pipeline'
    ],
    timeline: '3 weeks from blueprint to live staging demonstration',
    featured: true,
    accentColor: '#10B981',
    systemDiagramSteps: [
      'Patient taps "Book Hygiene Visit" on clinic mobile browser',
      'Intelligent triage selects Dr. Lin based on cosmetic inquiry',
      'WhatsApp bot presents 3 open chair slots for tomorrow afternoon',
      'Patient confirms 3:30 PM slot with single tap',
      'EHR database logs appointment; calendar invite sent to patient',
      'Automated SMS & WhatsApp reminder dispatched 2 hours prior'
    ],
    customerJourneyStages: [
      { stage: 'Discovery', action: 'Patient explores treatment options on responsive clinic web engine', automated: false },
      { stage: 'Triage', action: 'Interactive selector classifies dental urgency and procedure type', automated: true },
      { stage: 'Scheduling', action: 'WhatsApp conversational agent confirms open slot and chair assignment', automated: true },
      { stage: 'Intake', action: 'Digital medical history questionnaire completed on mobile', automated: true },
      { stage: 'Visit', action: 'Patient arrives with clinical record pre-populated in management software', automated: false },
      { stage: 'Retention', action: 'Automated 6-month hygiene recall sequence scheduled in pipeline', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Web Intake', description: 'Clean mobile-first booking web application' },
      { level: 'Level 2', name: 'WhatsApp Bridge', description: 'Instant auto-confirmation and digital signature intake' },
      { level: 'Level 3', name: 'EHR Integration', description: 'Two-way synchronization with clinic practice management software' },
      { level: 'Level 4', name: 'Multi-Location OS', description: 'Centralized patient dispatch across multiple clinic branches' }
    ],
    integrations: ['Website', 'WhatsApp Cloud API', 'Dentrix / Open Dental API', 'Google Calendar', 'Stripe Deposit', 'Twilio SMS']
  },
  {
    slug: 'manufacturing-rfq-system',
    title: 'Precision Manufacturing RFQ Extraction & Quotation System',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate how high-complexity industrial requests for quotation (RFQs) are parsed, classified, and routed to engineering estimation teams.',
    client: 'Vanguard Industrial Machining (Concept Demonstration)',
    industry: 'Industrial Manufacturing & B2B Engineering',
    category: 'Operations',
    tagline: 'Automated CAD/Spec Parsing, Material Classification & Sales Pipeline Routing',
    summary: 'Industrial B2B sales automation replacing 5-day quote delays with instant PDF/CAD parameter extraction, automated material classification, and engineering dispatch.',
    objective: 'Demonstrate how an industrial buyer submits an RFQ, specifications are extracted, engineering teams are alerted, and quotation timelines are compressed.',
    problem: 'Industrial manufacturers lose high-margin custom machining contracts because engineering estimators take 4–7 business days to manually review technical drawings, tolerances, and alloy specifications from messy email threads.',
    oldWorkflowSteps: [
      'Buyer sends unstructured email with 50MB of zipped STEP files and drawings',
      'Sales rep forwards to estimating inbox; sits in unclassified backlog for 3 days',
      'Estimator manually checks machine bed capacity, alloy stock, and tolerance feasibility',
      'Follow-up emails required because critical surface finish specs were missing',
      'Quote finally sent on Day 6; buyer has already awarded contract to faster competitor'
    ],
    solution: 'IGRYbuilds engineered an industrial RFQ capture portal with automated specification extraction, material feasibility checks, and automated Slack/CRM dispatch to senior sales engineers.',
    newArchitectureSteps: [
      'Buyer uploads technical drawings & STEP files through secure web portal',
      'Spec extraction engine parses alloy type (e.g. 6061-T6), tolerance, and batch volume',
      'Feasibility classifier confirms machine envelope capacity and tooling availability',
      'Internal engineering Slack channel notified with high-priority summary card',
      'Automated formal quotation generated and sent to buyer with digital sign-off link',
      'HubSpot deal stage updated with automated 72-hour follow-up sequence'
    ],
    outcome: 'Compresses industrial quote delivery from 5 days to under 4 hours, ensuring zero RFQs go unnoticed or unresponded.',
    metrics: [
      { label: 'Spec Extraction', value: '< 2.4s', change: 'Automated parsing' },
      { label: 'Quote Turnaround', value: '4.2 hrs', change: 'Down from 5.4 days' },
      { label: 'Spec Completeness', value: '99.4%', change: 'Zero missing parameters' },
      { label: 'Pipeline Visibility', value: '100%', change: 'Real-time telemetry' },
    ],
    stack: ['Next.js 16', 'CAD Metadata Parser', 'HubSpot Enterprise API', 'Slack Webhook Bot', 'PostgreSQL', 'Tailwind CSS'],
    deliverables: [
      'High-Density Industrial RFQ Web Portal',
      'Automated Technical Specification & Drawing Extraction Engine',
      'Engineering Estimation Slack Notification Bot',
      'HubSpot Deal Pipeline & Automated Quotation Tracking Schema',
      'Automated Buyer Follow-up & Specification Query Workflow'
    ],
    timeline: '4 weeks architecture and testing',
    featured: true,
    accentColor: '#3B82F6',
    systemDiagramSteps: [
      'Procurement engineer uploads RFQ spec sheet and CAD archive',
      'Extraction model extracts part volume, material, and critical tolerances',
      'System calculates preliminary machine cycle estimate',
      'Estimator receives pre-filled quote draft in Slack with 1-click approve',
      'Formal PDF quotation dispatched to buyer with tracked open link',
      'HubSpot logs deal and initiates structured follow-up sequence'
    ],
    customerJourneyStages: [
      { stage: 'Intake', action: 'Buyer uploads drawings via drag-and-drop RFQ portal', automated: true },
      { stage: 'Parsing', action: 'Engine extracts alloy, volume, and tolerance constraints', automated: true },
      { stage: 'Classification', action: 'System classifies part into 3-axis, 5-axis, or sheet metal queue', automated: true },
      { stage: 'Estimation', action: 'Senior engineer reviews pre-computed calculation in Slack', automated: false },
      { stage: 'Quotation', action: 'Formal branded quote dispatched with digital PO confirmation link', automated: true },
      { stage: 'Pipeline', action: 'Automated 72h check-in message sent if proposal remains unreviewed', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Structured Intake', description: 'Custom RFQ portal eliminating missing specification emails' },
      { level: 'Level 2', name: 'Automated Extraction', description: 'Instant PDF and blueprint tolerance data extraction' },
      { level: 'Level 3', name: 'ERP Integration', description: 'Two-way integration with raw material inventory stock' },
      { level: 'Level 4', name: 'Algorithmic Pricing', description: 'Autonomous instant quotation for standard geometry envelopes' }
    ],
    integrations: ['RFQ Portal', 'Slack Enterprise', 'HubSpot CRM', 'PostgreSQL', 'AWS S3 Document Vault', 'DocuSign API']
  },
  {
    slug: 'car-service-automation',
    title: 'Automotive Detailing & Service Operational System',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate automated vehicle booking, service package selection, slot scheduling, status updates, and post-service review collection.',
    client: 'Apex Auto Studio & Detailing (Concept Demonstration)',
    industry: 'Automotive & Premium Detailing',
    category: 'Web',
    tagline: 'Vehicle Package Selector, Bay Capacity Scheduling & Live WhatsApp Status Updates',
    summary: 'Operational customer workflow eliminating phone scheduling bottlenecks through interactive vehicle tier selection, automated bay capacity booking, and live WhatsApp progress updates.',
    objective: 'Demonstrate customer service selection, availability validation, booking confirmation, bay scheduling, service progress notifications, and review collection.',
    problem: 'Auto styling and detailing shops lose customers during business hours because technicians are operating machinery and unable to answer calls or coordinate workshop bay schedules.',
    oldWorkflowSteps: [
      'Customer calls workshop to ask for ceramic coating prices; call goes to voicemail',
      'Owner returns call in evening; customer has already booked elsewhere',
      'Manual paper calendar leads to double-booking detailing bays and loaner vehicles',
      'Customer calls repeatedly during service asking "Is my car ready yet?"',
      'Zero post-service follow-up; missed maintenance and annual re-coat revenue'
    ],
    solution: 'IGRYbuilds engineered an automotive digital operations system: an interactive vehicle model and package selector, live workshop bay availability engine, automated WhatsApp drop-off reminders, and real-time stage updates ("Vehicle Washed" → "Polishing" → "Curing" → "Ready for Collection").',
    newArchitectureSteps: [
      'Vehicle owner selects make, model size, and detailing package online',
      'System calculates bay duration and presents verified open workshop slots',
      'Owner books appointment; WhatsApp confirmation sent with shop GPS pin',
      'Drop-off alert dispatched day before with check-in instructions',
      'Technician taps 1-button update in bay: "Ceramic Coating Curing (Ready at 5 PM)"',
      'Customer receives live WhatsApp alert with inspection photo',
      'Review request sent next day, plus automated 6-month maintenance reminder'
    ],
    outcome: 'Eliminates phone scheduling bottlenecks, fills detailing bay capacity, and keeps vehicle owners informed at every stage of service.',
    metrics: [
      { label: 'Booking Speed', value: '< 90s', change: 'Complete checkout' },
      { label: 'Check-in Phone Calls', value: '-82%', change: 'Automated status' },
      { label: 'Bay Utilization', value: '94%', change: 'Optimized scheduling' },
      { label: 'Google Reviews', value: '+310%', change: 'Automated post-service' },
    ],
    stack: ['React 19', 'WhatsApp Cloud API', 'Stripe Deposit', 'Twilio SMS', 'Tailwind CSS', 'Supabase'],
    deliverables: [
      'Interactive Vehicle Size & Package Selector Web Engine',
      'Workshop Bay Capacity & Technician Calendar Backend',
      'WhatsApp Business Automated Stage Notification Agent',
      'One-Tap Mobile Technician Bay Terminal UI',
      'Post-Service Photo Delivery & Review Collection Pipeline'
    ],
    timeline: '3 weeks from design to deployment',
    featured: true,
    accentColor: '#06B6D4',
    systemDiagramSteps: [
      'Customer selects "Full Ceramic + Paint Correction" on phone',
      'Bay scheduler reserves 4-hour slot for Wednesday 9:00 AM',
      'WhatsApp bot sends calendar invite + GPS pin directions',
      'Technician marks vehicle "Inspected" with 3 condition photos',
      'WhatsApp bot updates customer: "Coating applied. Ready at 5:00 PM"',
      'Payment verified; review invitation triggered 24h later'
    ],
    customerJourneyStages: [
      { stage: 'Selection', action: 'Customer inputs vehicle model and custom detailing package', automated: true },
      { stage: 'Reservation', action: 'Bay capacity engine allocates technician and equipment time', automated: true },
      { stage: 'Drop-off', action: 'Customer checks in; automated inspection record logged', automated: true },
      { stage: 'Service', action: 'Technician updates status with photo in one tap from workshop iPad', automated: false },
      { stage: 'Collection', action: 'WhatsApp ping alerts customer vehicle is gleaming and ready', automated: true },
      { stage: 'Care', action: 'Automated ceramic care instructions and 6-month wash reminder', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Self-Serve Booking', description: 'Package calculator and real-time slot reservation' },
      { level: 'Level 2', name: 'WhatsApp Progress', description: 'Automated stage-by-stage status pings to owners' },
      { level: 'Level 3', name: 'Multi-Bay Dispatch', description: 'Technician workload balancing and bay throughput telemetry' },
      { level: 'Level 4', name: 'Customer Membership', description: 'Automated recurring monthly wash subscription billing' }
    ],
    integrations: ['Website Engine', 'WhatsApp Business', 'Google Calendar', 'Stripe Payments', 'Supabase Database', 'Twilio SMS']
  },
  {
    slug: 'restaurant-booking-system',
    title: 'Hospitality Reservation & VIP Guest Experience Engine',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate real-time table availability, automated reservation confirmation, deposit handling, dietary intake, and post-visit review requests.',
    client: 'Aura Dining Room & Lounge (Concept Demonstration)',
    industry: 'Hospitality & Fine Dining',
    category: 'Web',
    tagline: 'Interactive Table Availability, WhatsApp Guest Concierge & Review Automation',
    summary: 'Direct booking hospitality engine eliminating third-party platform commissions with real-time floor plan capacity, automated SMS/WhatsApp concierge, and VIP preference logging.',
    objective: 'Demonstrate table availability, automated confirmation, deposit checkout, dietary preferences, and post-visit review requests.',
    problem: 'Fine dining restaurants surrender 15–20% in cover fees to third-party booking apps while still suffering from 12–15% weekend no-shows and fragmented dietary communication.',
    oldWorkflowSteps: [
      'Guest finds restaurant on Instagram; redirected to third-party app with cover commission',
      'Guest books table with zero dietary notes or special occasion flags',
      'Host calls on Friday evening to confirm; guest does not answer',
      'Table of 6 no-shows on Saturday night; kitchen has already prepped tasting courses',
      'Host has no central record of guest wine preferences for future visits'
    ],
    solution: 'IGRYbuilds engineered a bespoke direct reservation experience: interactive menu and table availability, Stripe deposit checkout for weekend seatings, automated WhatsApp concierge confirming dietary needs, and post-dinner review requests.',
    newArchitectureSteps: [
      'Guest clicks Instagram link into high-speed mobile reservation web page',
      'Guest selects party size (e.g. 4 guests) and chooses 7:30 PM seating',
      'System validates table floor plan capacity and requests small commitment deposit',
      'WhatsApp concierge immediately reaches out: "We look forward to hosting you! Any allergies or celebrations?"',
      'Guest replies: "Gluten allergy for 1 guest, anniversary dinner"',
      'Host tablet pre-populates table card with dietary alerts and anniversary greeting',
      'Post-visit review link sent next morning requesting Google / TripAdvisor feedback'
    ],
    outcome: 'Eliminates third-party booking commissions, brings no-shows to near zero with refundable deposits, and builds an owned direct guest relationship database.',
    metrics: [
      { label: 'Direct Bookings', value: '88%', change: 'Zero 3rd-party commissions' },
      { label: 'Weekend No-Shows', value: '< 1.5%', change: 'With deposit checkout' },
      { label: 'Dietary Capture', value: '96%', change: 'Pre-service via WhatsApp' },
      { label: 'Review Velocity', value: '4.9★', change: 'Automated morning follow-up' },
    ],
    stack: ['React 19', 'Stripe Connect', 'WhatsApp Cloud API', 'SevenRooms / POS Webhook', 'Tailwind CSS', 'Supabase'],
    deliverables: [
      'Luxury Editorial Restaurant Website & Direct Reservation Engine',
      'Table Floor Plan & Real-Time Seating Capacity Backend',
      'Automated WhatsApp Guest Concierge & Dietary Intake Bot',
      'Stripe Reservation Deposit Collection Module',
      'Post-Dining Review & VIP Guest Lifecycle Database'
    ],
    timeline: '3 weeks to full deployment',
    featured: false,
    accentColor: '#F59E0B',
    systemDiagramSteps: [
      'Diner explores seasonal tasting menu and selects 4-seat reservation',
      'Direct booking engine confirms table slot without 3rd-party fee',
      'Automated WhatsApp Concierge asks for dietary preferences',
      'Host workstation alerts: "Table 12: Anniversary + Gluten Free"',
      'Automated reminder ping sent 4 hours before seating',
      'Post-visit review request sent next morning at 10:00 AM'
    ],
    customerJourneyStages: [
      { stage: 'Discovery', action: 'Guest visits mobile website from Instagram or Google Maps', automated: true },
      { stage: 'Reservation', action: 'Guest selects seating time and enters deposit payment', automated: true },
      { stage: 'Concierge', action: 'WhatsApp concierge collects dietary preferences and notes', automated: true },
      { stage: 'Dining', action: 'Staff greets guests with personalized anniversary attention', automated: false },
      { stage: 'Follow-up', action: 'Direct review request link sent morning after dining experience', automated: true },
      { stage: 'Loyalty', action: 'Private invitation dispatched for upcoming seasonal menu release', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Direct Booking Engine', description: 'Commission-free table reservations on owned domain' },
      { level: 'Level 2', name: 'Deposit Checkout', description: 'Eliminates weekend no-shows with credit card hold' },
      { level: 'Level 3', name: 'WhatsApp Concierge', description: 'Automated dietary triage and reservation adjustments' },
      { level: 'Level 4', name: 'Guest CRM', description: 'Lifetime VIP spend tracking and private tasting invitations' }
    ],
    integrations: ['Website Engine', 'Stripe Payments', 'WhatsApp Cloud API', 'Toast / Square POS', 'Twilio SMS', 'Supabase']
  },
  {
    slug: 'real-estate-lead-system',
    title: 'High-Value Real Estate Buyer Qualification & Dispatch Engine',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate multi-gate buyer qualification, property matching algorithm, automated viewing scheduling, and broker routing.',
    client: 'Sovereign Luxury Real Estate (Concept Demonstration)',
    industry: 'Luxury Real Estate & Developments',
    category: 'AI Agents',
    tagline: 'Multi-Gate Buyer Qualification, Property Matching & Broker Dispatch Engine',
    summary: 'Luxury real estate lead triage engine that qualifies buyers on timeline, budget, and financing before dispatching calendar viewing slots to senior brokers.',
    objective: 'Demonstrate lead capture, property preference collection, algorithmic qualification, viewing scheduling, and broker notification.',
    problem: 'Top-producing real estate brokers waste 15+ hours weekly driving across town to show multi-million dollar properties to unqualified tire-kickers and curiosity seekers.',
    oldWorkflowSteps: [
      'Buyer clicks portal ad and fills out generic "Contact Agent" form',
      'Broker is in a client closing and misses the lead; inquiry sits for 6 hours',
      'Buyer calls 3 other competing brokerages while waiting',
      'Broker finally calls back, spends 30 minutes discovering buyer has no pre-approval',
      'Unqualified showing conducted; zero contract potential and lost afternoon'
    ],
    solution: 'IGRYbuilds engineered an autonomous buyer qualification system: an interactive property criteria visualizer, sub-45s WhatsApp concierge that verifies buying readiness, automated viewing scheduling, and instant broker dispatch with full dossier.',
    newArchitectureSteps: [
      'Buyer views property showcase on high-performance web experience',
      'Buyer requests private viewing or floor plan access via quick-intake form',
      'Autonomous AI Agent initiates WhatsApp conversation within 40 seconds',
      'Agent qualifies timeline ("Moving within 60 days"), budget ($2M–$4M), and financing status',
      'Qualified buyer receives private calendar link to schedule accompanied viewing',
      'Senior broker receives SMS alert with buyer qualification dossier and property notes',
      'Follow-up sequence dispatched automatically post-showing'
    ],
    outcome: 'Guarantees brokers only attend viewings with verified, high-intent buyers while maintaining a sub-minute response time on all high-value inquiries.',
    metrics: [
      { label: 'Inquiry Latency', value: '< 40s', change: 'Instant qualification' },
      { label: 'Broker Hours Saved', value: '16 hrs/wk', change: 'Eliminates unqualified viewings' },
      { label: 'Buyer Qualification', value: '92%', change: 'Verified parameters' },
      { label: 'Showing Conversion', value: '+140%', change: 'High-intent attendance' },
    ],
    stack: ['Next.js 16', 'WhatsApp Cloud API', 'Follow Up Boss / CRM API', 'Tailwind CSS', 'Google Calendar API', 'Supabase'],
    deliverables: [
      'Luxury Property Portfolio & Virtual Tour Web Experience',
      'Autonomous High-Intent WhatsApp Buyer Qualification Agent',
      'Broker Viewing Scheduling & Calendar Lock Engine',
      'CRM Deal Pipeline with Pre-Approval Parameter Tracking',
      'Automated Post-Viewing Feedback & Offer Submission Workflow'
    ],
    timeline: '4 weeks from blueprint to live operations',
    featured: false,
    accentColor: '#8B5CF6',
    systemDiagramSteps: [
      'Buyer taps "Request Private Showing" on luxury penthouse listing',
      'AI Agent engages via WhatsApp in 35 seconds to confirm criteria',
      'Buyer confirms all-cash purchase readiness and desired move date',
      'System validates buyer fit score (94/100: VIP High Urgency)',
      'Direct calendar booking link provided for Saturday 11:00 AM',
      'Broker receives SMS notification with full buyer dossier'
    ],
    customerJourneyStages: [
      { stage: 'Inbound', action: 'Buyer browses architectural photos and floor plan diagrams', automated: true },
      { stage: 'Interview', action: 'WhatsApp conversational agent asks 3 essential qualification questions', automated: true },
      { stage: 'Scoring', action: 'System evaluates financing, purchase timeframe, and property fit', automated: true },
      { stage: 'Viewing', action: 'Buyer selects verified showing window that fits broker calendar', automated: true },
      { stage: 'Briefing', action: 'Broker receives complete dossier before shaking hands at property', automated: true },
      { stage: 'Follow-up', action: 'Automated post-showing feedback query sent to buyer evening of tour', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Portfolio Engine', description: 'Editorial luxury web design with sub-second photo loading' },
      { level: 'Level 2', name: 'AI Qualification', description: 'Autonomous WhatsApp agent screening timeline and budget' },
      { level: 'Level 3', name: 'Broker Dispatch', description: 'Round-robin viewing routing based on territory and price tier' },
      { level: 'Level 4', name: 'Private Investor Club', description: 'Automated early-access alerts for off-market luxury acquisitions' }
    ],
    integrations: ['Website Engine', 'WhatsApp Cloud API', 'Follow Up Boss CRM', 'Google Calendar', 'Twilio SMS', 'Supabase']
  },
  {
    slug: 'ecommerce-customer-system',
    title: 'DTC E-Commerce Abandoned Checkout & Retention Engine',
    type: 'concept',
    conceptDisclaimer: 'Designed to demonstrate abandoned checkout recovery, personalized WhatsApp follow-ups, automated order notifications, and replenishment triggers.',
    client: 'Verve Direct-to-Consumer Brands (Concept Demonstration)',
    industry: 'DTC E-Commerce & Retail',
    category: 'Automation',
    tagline: 'Sub-15m Abandoned Cart Recovery, WhatsApp Concierge & Replenishment Automation',
    summary: 'Automated e-commerce lifecycle engine recovering lost sales with timely WhatsApp checkout links, delivery tracking updates, and automated replenishment triggers.',
    objective: 'Demonstrate abandoned checkout recovery, personalized WhatsApp follow-ups, order notifications, and replenishment triggers.',
    problem: 'E-commerce brands lose 70% of shoppers at checkout; generic recovery emails land in spam or promotions tabs with dismal 15% open rates and low conversion.',
    oldWorkflowSteps: [
      'Shopper adds $180 cart, enters phone/email, and abandons due to distraction',
      'Generic Shopify email sent 4 hours later; lands in Promotions tab unnoticed',
      'Shopper buys from competitor on Amazon instead',
      'Zero proactive delivery tracking messaging; customer emails support asking where order is',
      'Zero replenishment reminder when product runs out 45 days later'
    ],
    solution: 'IGRYbuilds engineered an automated e-commerce customer lifecycle system: a sub-15 minute personalized WhatsApp recovery message with one-tap checkout link, real-time dispatch tracking, and automated replenishment prompts.',
    newArchitectureSteps: [
      'Shopper initiates checkout on Shopify / custom web store',
      'Shopper exits without completing payment; webhook emits checkout.abandoned',
      'System waits 15 minutes to avoid annoying active shoppers',
      'WhatsApp message dispatched: "Hey Alex, we saved your cart with free express shipping today. Tap to resume."',
      'One-tap checkout link opens pre-filled order confirmation',
      'Order confirmed; automated WhatsApp shipping updates with carrier tracking link',
      'Automated replenishment reminder triggered on Day 42 based on product consumption rate'
    ],
    outcome: 'Recovers up to 28% of abandoned carts via high-open WhatsApp messaging while eliminating routine "where is my order" support tickets.',
    metrics: [
      { label: 'Cart Recovery Rate', value: '28.4%', change: 'Via WhatsApp Cloud API' },
      { label: 'Open Rate', value: '94%', change: 'Compared to 18% email' },
      { label: 'Where-Is-My-Order Tickets', value: '-65%', change: 'Proactive updates' },
      { label: 'Replenishment Reorder', value: '34%', change: 'Automated 45-day trigger' },
    ],
    stack: ['Shopify Storefront API', 'WhatsApp Cloud API', 'Klaviyo Webhook', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    deliverables: [
      'Ultra-Fast Headless Checkout & Cart Recovery Webhook Architecture',
      'Sub-15m Personalized WhatsApp Cart Recovery Agent',
      'Real-Time Parcel Dispatch & Delivery WhatsApp Notification Pipeline',
      'Predictive Replenishment & Cross-Sell Retention Engine',
      'Customer Lifetime Value (LTV) Telemetry Dashboard'
    ],
    timeline: '3 weeks from integration to launch',
    featured: false,
    accentColor: '#EC4899',
    systemDiagramSteps: [
      'Customer abandons $180 cart at shipping step',
      'Shopify webhook registers cart event in database',
      'System pauses 15 minutes for natural return window',
      'Personalized WhatsApp ping sent with 1-click checkout button',
      'Customer completes order in 20 seconds on mobile',
      'Order fulfillment status sent with carrier live tracking'
    ],
    customerJourneyStages: [
      { stage: 'Browsing', action: 'Shopper adds items to cart on lightning-fast storefront', automated: true },
      { stage: 'Abandonment', action: 'Shopper exits checkout before payment confirmation', automated: false },
      { stage: 'Recovery', action: 'Timed WhatsApp message offers instant checkout resumption', automated: true },
      { stage: 'Fulfillment', action: 'Carrier tracking updates dispatched as package reaches milestones', automated: true },
      { stage: 'Unboxing', action: 'Digital user manual and care tips sent upon verified delivery', automated: true },
      { stage: 'Reorder', action: 'Replenishment prompt triggered when supply is calculated low', automated: true }
    ],
    scaleLevels: [
      { level: 'Level 1', name: 'Cart Recovery', description: 'Automated 15-minute WhatsApp recovery workflow' },
      { level: 'Level 2', name: 'Order Telemetry', description: 'Proactive delivery tracking and shipping alerts' },
      { level: 'Level 3', name: 'Replenishment Engine', description: 'Predictive reorder reminders based on product lifecycle' },
      { level: 'Level 4', name: 'VIP Concierge', description: 'Dedicated WhatsApp private shopping advisor for top 5% spenders' }
    ],
    integrations: ['Shopify API', 'WhatsApp Cloud API', 'Klaviyo', 'Stripe Payments', 'PostgreSQL', 'FedEx / DHL Webhooks']
  },
  {
    slug: 'apex-solar',
    title: 'Apex Renewable Energy Systems',
    type: 'concept',
    conceptDisclaimer: 'Architectural Prototype & Benchmark Study: Engineered by IGRYbuilds to demonstrate real-time geospatial API estimation, low-latency WhatsApp lead intake, and automated CRM triage. Performance metrics reflect stress-tested benchmark simulations.',
    client: 'Apex Solar (Prototype Architecture)',
    industry: 'Clean Energy & Solar Contractors',
    category: 'AI Automation & Web Experience',
    tagline: 'Instant Satellite Solar Estimator & 45-Second WhatsApp Qualification Pipeline',
    summary: 'Demonstrative architecture replacing a slow manual quotation flow with an interactive satellite quote engine connected to an autonomous WhatsApp qualification and booking agent.',
    objective: 'Demonstrate instant rooftop solar calculations combined with sub-45 second WhatsApp qualification and engineer dispatch.',
    problem: 'Traditional renewable contractors suffer from multi-hour inquiry response delays while estimators manually calculate roof pitch and shade metrics, causing up to 35% drop-off in high-intent homeowners.',
    solution: 'IGRYbuilds engineered a reference web application where homeowners enter their coordinates for instant rooftop solar capacity calculations. The event immediately dispatches a webhook to a WhatsApp conversational agent that collects utility bills and schedules engineer site assessments.',
    outcome: 'Benchmark simulation demonstrated response times under 45 seconds and a simulated 184% increase in appointment bookings with zero manual inquiry triage.',
    metrics: [
      { label: 'Simulated Latency', value: '< 45s', change: 'Down from 4.2h benchmark' },
      { label: 'Simulated Throughput', value: '184%', change: 'Pipeline efficiency' },
      { label: 'Manual Effort Saved', value: '22 hrs/wk', change: 'Automated data triage' },
      { label: 'Booking Retention', value: '94.2%', change: 'Automated reminders' },
    ],
    stack: ['Next.js 16', 'WhatsApp Cloud API', 'Make Engine', 'HubSpot CRM API', 'Google Solar API', 'Tailwind CSS'],
    deliverables: [
      'Interactive Rooftop Solar Estimator Frontend',
      'Autonomous WhatsApp Business Conversation Agent',
      'Automated Electric Utility Bill Parser Prototype',
      'Bi-directional HubSpot Deal Stage Pipeline Schema',
      'Automated SMS & WhatsApp Appointment Reminder Engine'
    ],
    timeline: '4 weeks from blueprint to production readiness',
    featured: false,
    accentColor: '#10B981',
    systemDiagramSteps: [
      'Homeowner submits address on Custom Web Calculator',
      'Google Solar API calculates estimated panel output & kWh savings',
      'Webhook dispatches lead to CRM within 300ms',
      'Autonomous WhatsApp Agent sends instant personalized roof estimate',
      'Customer confirms details & picks inspection time slot in chat',
      'Calendar invite & GPS site notes dispatched to field engineer'
    ]
  },
  {
    slug: 'nexus-logistics',
    title: 'Nexus Global Freight Logistics',
    type: 'concept',
    conceptDisclaimer: 'Internal Systems Demo: Sub-700ms voice telephone dispatcher interface connected with telematics GPS simulation. Demonstrates automated carrier verification and real-time transit status lookups.',
    client: 'Nexus Freight (Concept Simulation)',
    industry: 'Freight Logistics & Transportation',
    category: 'AI Agents & Operations',
    tagline: '24/7 Autonomous Voice Dispatcher & Telematics Freight Agent',
    summary: 'Engineered prototype voice agent architecture capable of handling high-volume carrier and shipper status inquiries with sub-second response latency.',
    objective: 'Demonstrate sub-700ms voice AI call answering, telematics GPS lookup, and automated carrier notification.',
    problem: 'Freight dispatch centers routinely spend over 60% of operating hours answering repetitive check calls from carriers seeking container gate codes, GPS coordinates, and appointment windows.',
    solution: 'We engineered an autonomous voice agent powered by low-latency speech synthesis integrated with fleet telematics mock databases. The agent authenticates bill-of-lading codes, checks GPS coordinates, and delivers arrival updates without human touch.',
    outcome: 'Simulated call deflection of 73% for standard status inquiries, freeing senior dispatchers to focus on high-yield exceptions and lane negotiation.',
    metrics: [
      { label: 'Call Deflection Target', value: '73.4%', change: 'Automated resolution' },
      { label: 'Speech AI Latency', value: '620ms', change: 'Sub-second natural voice' },
      { label: 'Concurrency Capacity', value: '100+', change: 'Simultaneous voice channels' },
      { label: 'Exception Routing', value: '< 2.0s', change: 'Instant human escalation' },
    ],
    stack: ['Vapi Voice AI', 'ElevenLabs Streaming', 'Twilio SIP Trunking', 'PostgreSQL', 'Telematics API', 'Tailwind CSS'],
    deliverables: [
      'Sub-700ms Voice Agent with custom freight vocabulary dictionary',
      'Telematics GPS & Bill-of-Lading Lookup Middleware',
      'Dispatcher Escalation & Live Transcription Dashboard UI',
      'Automated Carrier SMS Delivery Confirmation Webhooks',
      'Historical Call Audio & Sentiment Analytics Engine'
    ],
    timeline: '5 weeks architecture, test harness, and rollout',
    featured: false,
    accentColor: '#3B82F6',
    systemDiagramSteps: [
      'Carrier or driver dials Nexus Dispatch hotline',
      'Voice Agent answers on Ring 1 (<620ms speech latency)',
      'Agent prompts for Load or Bill of Lading (BOL) number',
      'Database middleware queries telematics GPS coordinate feed',
      'Agent speaks exact location, mile marker, and updated ETA',
      'Summary transcript and status update logged automatically to TMS'
    ]
  },
  {
    slug: 'lumina-health',
    title: 'Lumina Aesthetic & Surgical Medicine',
    type: 'concept',
    conceptDisclaimer: 'Demonstrative Clinical Engine: High-conversion clinical patient triage prototype with integrated Stripe deposit checkout and pre-appointment preparation messaging.',
    client: 'Lumina Clinic (Prototype Blueprint)',
    industry: 'Aesthetic Medicine & Surgery',
    category: 'Web Experience & Booking Automation',
    tagline: 'Editorial Luxury Clinic Web Engine with Deposit Checkout & Triage Flow',
    summary: 'Prototype web architecture with interactive procedure diagnostic triage, calendar reservation, and automated pre-consultation patient readiness sequences.',
    objective: 'Demonstrate luxury editorial clinic design with procedure visualizer, clinical eligibility triage, and deposit checkout.',
    problem: 'High-end surgical and wellness practices often suffer from high no-show rates (15–20%) when booking unvetted inquiries through static contact forms.',
    solution: 'IGRYbuilds engineered a responsive editorial web engine featuring interactive clinical triage, secure deposit checkout, and automated calendar reminders delivered via WhatsApp and email.',
    outcome: 'Prototype testing demonstrates near-zero no-show drop-offs (< 3%) and elevated patient pre-education prior to consultation.',
    metrics: [
      { label: 'Deposit Checkout Fit', value: '+112%', change: 'Committed reservations' },
      { label: 'Simulated No-Show Rate', value: '< 2.8%', change: 'Down from 19.4%' },
      { label: 'Mobile PageSpeed', value: '98/100', change: 'Sub-800ms initial render' },
      { label: 'Pre-Qualification', value: '91%', change: 'Clinical criteria match' },
    ],
    stack: ['React 19', 'Tailwind CSS', 'Stripe Connect', 'Scheduling API', 'Motion', 'Supabase'],
    deliverables: [
      'High-Performance Editorial Clinical Website Design',
      'Interactive Treatment Triage & Visualizer Flow',
      'Secure Stripe Deposit Collection System',
      'Automated WhatsApp & Email Pre-Op Prep Sequences',
      'GDPR-Compliant Patient Intake Architecture'
    ],
    timeline: '3.5 weeks from creative direction to clinic launch',
    featured: false,
    accentColor: '#06B6D4',
    systemDiagramSteps: [
      'Patient explores treatment visualizer & procedure gallery',
      'Patient launches Interactive Procedure Triage flow',
      'System validates clinical parameters & suggests treatment fit',
      'Real-time practitioner calendar slot selected with deposit checkout',
      'Intake documentation sent via WhatsApp with secure digital signature link',
      'Automated reminder sequence triggered 48h, 24h, and 2h prior'
    ]
  },
  {
    slug: 'verve-commerce',
    title: 'Verve Performance Athletic Gear',
    type: 'concept',
    conceptDisclaimer: 'Algorithmic Creative Engine Concept: Automated programmatic ad iteration prototype designed for multivariate DTC testing without agency production bottlenecks.',
    client: 'Verve Athletics (Concept Study)',
    industry: 'Sportswear & E-Commerce',
    category: 'AI UGC & Creative Engine',
    tagline: 'Algorithmic Creative Engine Producing 40 Localized Ad Variants Weekly',
    summary: 'Automated video generation pipeline designed to eliminate creative fatigue and test high-volume hook variations across digital ad platforms.',
    objective: 'Demonstrate automated ad creative iteration from script generation to video rendering and performance testing.',
    problem: 'Direct-to-consumer e-commerce brands hit steep ad fatigue curves within 10–14 days, while traditional video creative production costs and turnaround times prevent rapid multivariate testing.',
    solution: 'We engineered an automated creative generation pipeline that synthesizes hook scripts using proven direct response frameworks, layers dynamic product footage, and renders vertical ad variants ready for deployment.',
    outcome: 'Simulated pipeline production capacity of 40+ variations weekly with a 74% reduction in per-asset production expense.',
    metrics: [
      { label: 'Creative Volume Target', value: '40/wk', change: 'High-frequency output' },
      { label: 'Production Cost Ratio', value: '-74%', change: 'Compared to agency models' },
      { label: 'Testing Velocity', value: '48 hrs', change: 'Idea to live variation' },
      { label: 'Iteration Speed', value: '10x', change: 'Rapid script matrices' },
    ],
    stack: ['Video Synthesis Engine', 'ElevenLabs Multilingual', 'FFmpeg Automated Worker', 'Marketing APIs', 'Python Cloud Functions'],
    deliverables: [
      'High-Converting Hook & Script Generation Matrix',
      'AI UGC Video Synthesis Pipeline Architecture',
      'Automated Subtitling & Motion Graphic Overlay Worker',
      'Programmatic Ad Upload & Campaign Staging Scripting',
      'Creative Performance Dashboard with Hook Retention Telemetry'
    ],
    timeline: '3 weeks to establish complete automated pipeline',
    featured: false,
    accentColor: '#F59E0B',
    systemDiagramSteps: [
      'Script matrix synthesizes 10 hooks x 3 problem bodies x 2 offers',
      'Video synthesis generates avatar UGC footage with native inflection',
      'FFmpeg pipeline stitches dynamic product B-roll & animated captions',
      'Batch rendering outputs ready-to-test vertical video assets',
      'Webhooks automatically stage campaigns inside Ads Manager',
      'Performance analytics tracks 3-second hook rate to iterate winners'
    ]
  }
];
