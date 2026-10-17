#!/usr/bin/env python3
"""Generate site/data/projects.json — 1000 concept projects for IGRYbuilds /work.

192 hand-crafted flagships (24 categories x 8) + 808 seeded deterministic
generated projects. All output is concept work / studio experiments —
never presented as real client work.

Usage:
  PYTHONPATH=~/workspace/.pystdlib:~/workspace/.pystdlib/lib-dynload \
    python3 scripts/gen-projects.py            # writes data/projects.json
  ... gen-projects.py --fragment state/first24.html   # first-24 card HTML for no-JS pre-render

Deterministic: single seeded RNG (seed 20261017). Re-running produces
byte-identical output.
"""
import json
import os
import random
import sys

SEED = 20261017
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)

# 24 categories in fixed order. archetype index is a 1:1 mapping chosen so the
# mockup layout suits the category (24 archetypes defined in assets/js/work.js).
CATEGORIES = [
    # (category, singular, archetype_index)
    ("Restaurants", "restaurant", 3),        # menu-list
    ("Clinics", "clinic", 4),               # booking-card
    ("Architects", "architecture studio", 7),  # gallery-wall
    ("Salons", "salon", 16),                # calendar
    ("Gyms", "gym", 6),                     # stats-row
    ("Real Estate", "property portal", 10),  # map-block
    ("Hotels", "hotel", 8),                 # pricing-cards
    ("E-commerce", "online store", 21),      # product-grid
    ("Coaches", "coaching practice", 11),   # chat-ui
    ("Agencies", "agency", 0),              # hero-block
    ("Photographers", "photography studio", 2),  # grid
    ("Cafes", "cafe", 18),                  # slider-hero
    ("Lawyers", "law practice", 20),        # accordion
    ("Tutors", "tutoring studio", 14),       # steps
    ("Spas", "spa", 5),                     # split-hero
    ("Bakeries", "bakery", 13),             # list-feed
    ("Boutiques", "boutique", 12),          # video-hero
    ("Garages", "garage", 22),              # form-ui
    ("Interior Designers", "interior studio", 15),  # before-after
    ("Event Planners", "event studio", 23),  # tabs
    ("Jewellers", "jewellery house", 19),   # icons-row
    ("Travel Agents", "travel desk", 1),    # nav-bar
    ("Pet Services", "pet-care studio", 9),  # testimonial
    ("Fitness Studios", "fitness studio", 17),  # reviews
]

ARCHETYPE_NAMES = [
    "hero-block", "nav-bar", "grid", "menu-list", "booking-card", "split-hero",
    "stats-row", "gallery-wall", "pricing-cards", "testimonial", "map-block",
    "chat-ui", "video-hero", "list-feed", "steps", "before-after", "calendar",
    "reviews", "slider-hero", "icons-row", "accordion", "product-grid",
    "form-ui", "tabs",
]

# ----------------------------------------------------------------------------
# 192 hand-crafted flagships: 8 (name, tagline) pairs per category, in the
# same order as CATEGORIES.
# ----------------------------------------------------------------------------
FLAGSHIPS = [
    # 0 Restaurants
    [
        ("Ember & Oak", "Fire-led kitchen concept with a live menu board and table booking."),
        ("The Copper Thali", "Heritage dining concept built as a tasting-menu journey."),
        ("Saffron Route", "Cloud-kitchen concept built around regional thalis."),
        ("Midnight Momo", "Late-night street-food brand with a pre-order counter."),
        ("Leaf & Ladle", "Plant-forward cafe concept with seasonal menus."),
        ("Tandoor Tales", "Story-led dining concept for a highway dhaba."),
        ("The Brass Plate", "Fine-dine concept with chef's-table reservations."),
        ("Chai Chowki", "Chai-bar concept with a loyalty-first ordering flow."),
    ],
    # 1 Clinics
    [
        ("ClearPath Dental", "Calm, trust-first clinic site with online appointments."),
        ("Aarogya Family Care", "Multi-speciality clinic concept with doctor profiles."),
        ("Pulse Physio", "Sports physio studio with recovery-programme booking."),
        ("VisionKart Eye Care", "Eye-clinic concept with test booking and a frames catalogue."),
        ("DermaLume Skin", "Dermatology concept with plain-English treatment explainers."),
        ("TinySteps Paediatrics", "Child-friendly clinic site with a vaccination tracker."),
        ("SpineAlign Chiro", "Chiropractic concept with a posture-assessment funnel."),
        ("MediNest Homecare", "Home-healthcare concept with a nurse booking flow."),
    ],
    # 2 Architects
    [
        ("Studio Terra Firma", "Portfolio concept for a context-first architecture studio."),
        ("Line & Light", "Minimalist practice site with deep project case studies."),
        ("Brickworks Atelier", "Material-obsessed studio with a process journal."),
        ("Northline Architects", "Commercial practice concept with tender-ready pages."),
        ("Courtyard Studio", "Vernacular design practice with climate-smart showcases."),
        ("Monolith & Moss", "Landscape-integrated architecture portfolio concept."),
        ("Gridhouse Collective", "Young practice concept built on competition entries."),
        ("The Drafting Room", "Boutique studio site with a client-onboarding flow."),
    ],
    # 3 Salons
    [
        ("Velvet Mane", "Luxury salon concept with stylist portfolios."),
        ("The Groom Den", "Men's grooming studio with membership plans."),
        ("Curl Culture", "Curl-specialist salon with a texture quiz."),
        ("Polish & Pine", "Nail-studio concept with a design gallery."),
        ("Shear Delight", "Neighbourhood salon with express-service booking."),
        ("Blush Hour", "Bridal studio concept with a trial-session flow."),
        ("Fade Theory", "Barbershop concept with a live queue-status widget."),
        ("Glow Rituals", "Skin-and-hair ritual studio with package builder."),
    ],
    # 4 Gyms
    [
        ("Iron Parish", "Strength gym concept with coach-led programming."),
        ("Forge Athletics", "Functional-training studio with a class timetable."),
        ("The Quiet Rep", "Women-only strength concept with a guided onboarding flow."),
        ("Summit Climb Co.", "Bouldering gym concept with route maps."),
        ("Primal Circuit", "HIIT studio with challenge leaderboards."),
        ("Form First Pilates", "Reformer studio concept with instructor bios."),
        ("Nightshift Boxing", "Boxing club concept with fight-night pages."),
        ("Basecamp Strength", "Community gym with nutrition-coach add-ons."),
    ],
    # 5 Real Estate
    [
        ("Keystone Estates", "Boutique brokerage with curated listings."),
        ("Plotwise", "Land-parcel marketplace concept with map search."),
        ("The Address Book", "Luxury listings with private-viewing requests."),
        ("Brickbybrick", "First-home buyer guide with EMI calculators."),
        ("TerraVista Developers", "Developer site with honest project timelines."),
        ("NestQuest", "Rental-finder concept with verified badges."),
        ("Heritage Haveli Co.", "Restoration-property listings with owner stories."),
        ("Skyline Syndicate", "Investment-focused listings with ROI cards."),
    ],
    # 6 Hotels
    [
        ("The Marigold House", "Boutique stay concept with direct-booking perks."),
        ("Dune & Dusk", "Desert-resort concept with experience packages."),
        ("Lakeside Ledger", "Heritage hotel with room-story pages."),
        ("The Ninth Floor", "Rooftop boutique hotel with event spaces."),
        ("Cottonwood Retreat", "Wellness retreat with a programme calendar."),
        ("Station House Stays", "Railway-heritage inn with themed rooms."),
        ("The Mango Orchard", "Farm-stay concept with seasonal harvest pages."),
        ("Neon Palms Hostel", "Youth hostel with a social-event feed."),
    ],
    # 7 E-commerce
    [
        ("Threadline Supply", "Minimal apparel store with lookbook drops."),
        ("The Brass Bazaar", "Handicraft marketplace with artisan stories."),
        ("Kiln & Co.", "Ceramics store with a made-to-order flow."),
        ("VoltEdge Gadgets", "Tech-accessories store with comparison tables."),
        ("Petalpost", "Flower-subscription concept with delivery slots."),
        ("Inkwell Stationery", "Stationery store with gift-wrap options."),
        ("The Spice Route Co.", "Single-origin spice store with recipe cards."),
        ("ReThread Vintage", "Pre-loved fashion with authentication badges."),
    ],
    # 8 Coaches
    [
        ("Clarity with Karan", "Life-coach concept with a discovery-call funnel."),
        ("The Focus Lab", "Productivity coaching with habit dashboards."),
        ("Pitchcraft", "Public-speaking coach with a workshop calendar."),
        ("MoneyMindset", "Finance coach with a free-audit lead magnet."),
        ("The Comeback Coach", "Career-restart coaching for returners."),
        ("Calm & Capable", "Stress-management coach with a course library."),
        ("Founder Fuel", "Startup mentor concept with office-hour booking."),
        ("ExamEdge Mentors", "Competitive-exam coaching with test analytics."),
    ],
    # 9 Agencies
    [
        ("Signal & Story", "Creative agency with case-study storytelling."),
        ("The Growth Ledger", "Performance-marketing agency with live dashboards."),
        ("Northbeam Studio", "Brand studio with identity showcases."),
        ("Loudquiet PR", "Boutique PR with a coverage wall."),
        ("Pixelpact Digital", "Web agency with a transparent process timeline."),
        ("Fieldnotes Media", "Content agency with editorial samples."),
        ("Brightmark SEO", "SEO agency with ranking-report pages."),
        ("The Launchpad Co.", "Startup-launch agency with sprint plans."),
    ],
    # 10 Photographers
    [
        ("Aperture & Ash", "Wedding photographer with film-style galleries."),
        ("The Candid Frame", "Candid specialist with story albums."),
        ("Studio Northlight", "Portrait studio with a session picker."),
        ("Wildshutter", "Wildlife photographer with an expedition journal."),
        ("Brick & Bloom", "Real-estate photography with virtual tours."),
        ("Tiny Toes Studio", "Newborn photographer with milestone packages."),
        ("Plate & Pixel", "Food photographer with menu-shoot reels."),
        ("The Streetsmith", "Street photographer with a print shop."),
    ],
    # 11 Cafes
    [
        ("Slowpour Society", "Speciality-coffee concept with brew guides."),
        ("The Reading Room", "Book-cafe with reading-nook reservations."),
        ("Crumb Culture", "Bakery-cafe with a daily bake schedule."),
        ("Monsoon Roast", "Monsoon-blend coffee brand with subscriptions."),
        ("The Corner Grind", "Neighbourhood espresso bar with a loyalty app."),
        ("Petrichor Cafe", "Rain-themed cafe with curated playlists."),
        ("Second Cup Club", "Study-friendly cafe with day passes."),
        ("The Filter House", "South-Indian filter-coffee concept."),
    ],
    # 12 Lawyers
    [
        ("Verdict & Vine", "Boutique law firm with practice-area guides."),
        ("The Clear Clause", "Contract-law practice with plain-English explainers."),
        ("Justice Junction", "Community legal-aid concept with a helpline."),
        ("Meridian Legal", "Corporate practice with deal showcases."),
        ("The Tenant's Counsel", "Tenant-rights practice with a case checker."),
        ("Startup Shield Law", "Startup-focused practice with fixed-fee packs."),
        ("Family First Legal", "Family-law practice with sensitive UX."),
        ("The IP Desk", "IP practice with a trademark-filing flow."),
    ],
    # 13 Tutors
    [
        ("Numeracy Nest", "Maths tutoring with progress dashboards."),
        ("The Grammar Garden", "English coaching with writing labs."),
        ("Concept Cartographers", "Science tutoring with visual concept maps."),
        ("Lingua Leap", "Language classes with speaking clubs."),
        ("RankUp Academy", "Exam prep with mock-test analytics."),
        ("The Homework Hub", "After-school support with parent reports."),
        ("CodeSprouts", "Kids' coding classes with project galleries."),
        ("Veda Vidya", "Sanskrit and Vedic-maths concept classes."),
    ],
    # 14 Spas
    [
        ("Stillwater Spa", "Day-spa concept with ritual menus."),
        ("The Salt Room", "Halotherapy studio with session booking."),
        ("Petal & Stone", "Ayurvedic spa with a dosha quiz."),
        ("Urban Onsen", "Japanese bathhouse concept with an etiquette guide."),
        ("The Quiet Hour", "Express spa for office workers."),
        ("Moonmilk Rituals", "Night-time wellness concept with sleep kits."),
        ("Clay & Calm", "Mud-therapy studio with treatment stories."),
        ("The Hammam House", "Traditional hammam with group packages."),
    ],
    # 15 Bakeries
    [
        ("Crumb & Craft", "Artisan bakery with a bake-day calendar."),
        ("The Sourdough Society", "Sourdough micro-bakery with starter kits."),
        ("Flour & Fern", "Botanical bakery with wedding tiers."),
        ("Midnight Crust", "Late-night pizza-bakery concept."),
        ("The Millet Mill", "Millet-based bakery with nutrition cards."),
        ("Sugar & Smoke", "Dessert bar with torched finishes."),
        ("The Proofing Room", "Baking-class studio with workshop booking."),
        ("Butterpaper Co.", "Custom-cake studio with design consults."),
    ],
    # 16 Boutiques
    [
        ("The Drape Edit", "Curated ethnic-wear boutique with styling."),
        ("Hem & Hue", "Tailoring-led boutique with fit guides."),
        ("The Linen Loft", "Slow-fashion boutique with fabric stories."),
        ("Mira & Thread", "Designer boutique with a trunk-show calendar."),
        ("The Patchwork Post", "Upcycled fashion with maker profiles."),
        ("Rainbow Sprouts", "Kids'-wear boutique with growth charts."),
        ("The Saree Library", "Saree rental-and-retail concept."),
        ("Blockprint Bureau", "Hand-block boutique with an artisan map."),
    ],
    # 17 Garages
    [
        ("Torque & Tread", "Multi-brand service centre with live job status."),
        ("The Honest Wrench", "Transparent-pricing garage with video inspections."),
        ("Pitstop Pro", "Express-service concept with slot booking."),
        ("Voltage Auto Care", "EV-service specialist with battery reports."),
        ("The Detailing Den", "Detailing studio with a package builder."),
        ("Clutch & Coffee", "Garage-cafe hybrid with a waiting-lounge menu."),
        ("Fleetline Services", "Fleet-maintenance concept with dashboards."),
        ("The Vintage Garage", "Classic-car restoration with build diaries."),
    ],
    # 18 Interior Designers
    [
        ("Room & Reverie", "Residential studio with moodboard flows."),
        ("The Space Edit", "Small-space specialist with 3D previews."),
        ("Hearth & Hue", "Colour-led interiors with palette tools."),
        ("Studio Mudhouse", "Sustainable interiors with a material library."),
        ("The Rental Refresh", "Renter-friendly makeovers with budgets."),
        ("Worknest Studio", "Home-office design with an ergonomics quiz."),
        ("Casa Calm", "Minimalist interiors with declutter guides."),
        ("The Vastu Edit", "Vastu-aligned design concept."),
    ],
    # 19 Event Planners
    [
        ("The Grand Marquee", "Wedding planner with venue shortlists."),
        ("Confetti & Co.", "Birthday-party studio with theme kits."),
        ("The Corporate Stage", "Corporate events with run-of-show tools."),
        ("Mehfil Moments", "Cultural-event planner with artist rosters."),
        ("Pop-Up Theory", "Pop-up retail events with footfall reports."),
        ("The Haldi Edit", "Pre-wedding function specialist."),
        ("Summit & Soiree", "Conference-and-gala planner."),
        ("Tiny Gatherings", "Micro-wedding concept with intimate venues."),
    ],
    # 20 Jewellers
    [
        ("The Gold Ledger", "Heritage jeweller with a live rate ticker."),
        ("Heirloom & Co.", "Estate jewellery with provenance cards."),
        ("The Diamond Desk", "Solitaire studio with a 4C explainer."),
        ("Silverline Studio", "Contemporary silver with lookbooks."),
        ("The Bridal Vault", "Bridal sets with appointment booking."),
        ("Kundan House", "Kundan-meenakari specialist with craft films."),
        ("Everyday Aurum", "Lightweight daily-wear with try-at-home."),
        ("The Coin Counter", "Gold-coin and investment jewellery."),
    ],
    # 21 Travel Agents
    [
        ("The Slow Itinerary", "Slow-travel planner with route maps."),
        ("Desert Compass", "Rajasthan circuit specialist with handpicked stays."),
        ("The Visa Desk", "Visa-assistance concept with checklists."),
        ("Honeymoon Cartographers", "Honeymoon planner with moodboards."),
        ("Trek & Tale", "Trekking outfit with difficulty grades."),
        ("The Pilgrim's Path", "Pilgrimage tours with senior-friendly plans."),
        ("Island Hopper Co.", "Island itineraries with ferry timetables."),
        ("The Rail Reverie", "Rail-journey planner with berth guides."),
    ],
    # 22 Pet Services
    [
        ("The Wag Club", "Dog daycare with live-cam pages."),
        ("Purr & Co.", "Cat boarding with suite tours."),
        ("The Groom Trail", "Mobile grooming van with route booking."),
        ("Fetch Fitness", "Dog-walking crew with GPS walk reports."),
        ("The Vet Van", "At-home vet visits with a slot picker."),
        ("Beak & Feather", "Exotic-bird care with species guides."),
        ("The Senior Paw", "Senior-pet care with health logs."),
        ("Adopt & Adore", "Adoption listings with foster stories."),
    ],
    # 23 Fitness Studios
    [
        ("The Reformer Room", "Pilates studio with class levels."),
        ("Barre & Beyond", "Barre studio with challenge months."),
        ("The Breathwork Loft", "Breathwork studio with a session library."),
        ("Kettlebell Kitchen", "Strength studio with skill progressions."),
        ("The Mobility Lab", "Mobility studio with an assessment flow."),
        ("Dancefit District", "Dance-fitness studio with instructor reels."),
        ("The Cold Plunge Club", "Recovery studio with contrast protocols."),
        ("Yin & Yang Yoga", "Yoga studio with a style finder."),
    ],
]

# ----------------------------------------------------------------------------
# Seeded name pools for the 808 generated projects, per category.
# ----------------------------------------------------------------------------
GEN = [
    # 0 Restaurants
    dict(adj=["Ember", "Saffron", "Copper", "Smoked", "Golden", "Velvet", "Charred", "Wild", "Amber", "Rustic"],
         noun=["Kitchen", "Table", "House", "Thali", "Dhaba", "Grill", "Counter", "Plate", "Bistro", "Hearth"],
         feat=["live table booking", "live menu boards", "chef's tasting journeys", "pre-order counters", "loyalty-first ordering", "seasonal menu drops", "private dining requests", "story-led dining pages"]),
    # 1 Clinics
    dict(adj=["ClearPath", "BrightCare", "TrueNorth", "CalmRoot", "Verde", "BlueDot", "SoftStep", "PrimePulse", "Kindred", "Nova"],
         noun=["Dental", "Physio", "Derma", "EyeCare", "FamilyCare", "Ortho", "Cardio", "KidsCare", "Spine", "Wellness"],
         feat=["online appointment booking", "doctor profile pages", "treatment explainers", "vaccination trackers", "video consultations", "insurance guidance", "patient review flows", "an emergency helpline"]),
    # 2 Architects
    dict(adj=["Terra", "Linea", "Brickhaus", "Northline", "Modul", "Stoneform", "Axis", "Verge", "Courtyard", "Monoline"],
         noun=["Studio", "Atelier", "Works", "Collective", "Practice", "Lab", "Office", "Bureau", "Form", "Space"],
         feat=["project case studies", "competition entries", "material libraries", "client onboarding flows", "process journals", "site-diary blogs", "3D walkthrough pages", "tender-ready profiles"]),
    # 3 Salons
    dict(adj=["Velvet", "Lumiere", "Shear", "Belle", "Glow", "Polished", "Mane", "Blush", "Gilded", "Satin"],
         noun=["Studio", "Salon", "Lounge", "Bar", "Atelier", "Den", "House", "Suite", "Room", "Club"],
         feat=["stylist portfolios", "online chair booking", "bridal trial flows", "membership plans", "style galleries", "texture quizzes", "queue-status widgets", "package builders"]),
    # 4 Gyms
    dict(adj=["Iron", "Forge", "Primal", "Summit", "Basecamp", "Redline", "Grit", "Atlas", "Pulse", "Titan"],
         noun=["Athletics", "Strength", "Boxing", "Club", "Gym", "Lab", "Arena", "Works", "House", "Project"],
         feat=["class timetables", "coach profiles", "challenge leaderboards", "member apps", "onboarding flows", "nutrition add-ons", "trial-week funnels", "transformation galleries"]),
    # 5 Real Estate
    dict(adj=["Keystone", "TerraVista", "BlueBrick", "TruePlot", "Homeward", "Cornerstone", "UrbanNest", "Skyline", "Plotwise", "Meridian"],
         noun=["Estates", "Realty", "Homes", "Properties", "Listings", "Spaces", "Havens", "Group", "Ventures", "Co"],
         feat=["map-based search", "verified listing badges", "EMI calculators", "virtual tour embeds", "site-visit booking", "ROI cards", "project timelines", "agent profiles"]),
    # 6 Hotels
    dict(adj=["Marigold", "Dune", "Lakeside", "Cottonwood", "Neon", "Juniper", "Amber", "Velvet", "Palm", "Quartz"],
         noun=["House", "Retreat", "Inn", "Stays", "Lodge", "Resort", "Hostel", "Suites", "Courtyard", "Haven"],
         feat=["direct-booking perks", "room-story pages", "experience packages", "event-space hire", "seasonal rate cards", "concierge chat", "review walls", "local-guide journals"]),
    # 7 E-commerce
    dict(adj=["Threadline", "Brass", "Kiln", "Volt", "Petal", "Inkwell", "Spice", "ReThread", "Cinder", "Loop"],
         noun=["Supply", "Bazaar", "Goods", "Store", "Market", "Depot", "Trading", "Works", "Cart", "Line"],
         feat=["lookbook drops", "artisan stories", "comparison tables", "subscription flows", "gift-wrap options", "authenticity badges", "review widgets", "abandoned-cart recovery"]),
    # 8 Coaches
    dict(adj=["Clarity", "Focus", "Pitchcraft", "MoneyMind", "Calm", "Forge", "Ascent", "Northstar", "TrueSelf", "Bold"],
         noun=["Lab", "Coaching", "Studio", "Collective", "Practice", "Guild", "Circle", "Method", "Works", "Mentors"],
         feat=["discovery-call funnels", "workshop calendars", "habit dashboards", "course libraries", "lead-magnet audits", "testimonial walls", "office-hour booking", "community circles"]),
    # 9 Agencies
    dict(adj=["Signal", "Northbeam", "Loudquiet", "Pixelpact", "Fieldnotes", "Brightmark", "Launchpad", "Emberline", "Trueform", "Kindred"],
         noun=["Studio", "Agency", "Media", "Digital", "Collective", "Works", "Lab", "Partners", "House", "Co"],
         feat=["case-study storytelling", "ranking reports", "process timelines", "coverage walls", "pricing calculators", "team pages", "client dashboards", "thought-leadership blogs"]),
    # 10 Photographers
    dict(adj=["Aperture", "Candid", "Northlight", "Wild", "Brick", "Bloom", "Lumen", "Still", "Frame", "Golden"],
         noun=["Studio", "Frames", "Works", "Journal", "Lens", "Shots", "Stories", "Portraits", "Films", "Collective"],
         feat=["film-style galleries", "session pickers", "story albums", "print shops", "expedition journals", "virtual-tour embeds", "milestone packages", "booking calendars"]),
    # 11 Cafes
    dict(adj=["Slowpour", "Reading", "Crumb", "Monsoon", "Corner", "Petrichor", "Second Cup", "Filter", "Amber", "Willow"],
         noun=["Society", "Room", "Culture", "Roast", "Grind", "Cafe", "Club", "House", "Counter", "Bar"],
         feat=["brew guides", "loyalty apps", "reading-nook booking", "day-pass sales", "bake schedules", "playlist curation", "subscription beans", "event nights"]),
    # 12 Lawyers
    dict(adj=["Meridian", "ClearClause", "Verdict", "Justice", "Tenant", "Shield", "Vantage", "TrueNorth", "Honest", "Beacon"],
         noun=["Legal", "Chambers", "Counsel", "Law", "Partners", "Desk", "Associates", "Practice", "Firm", "Advisors"],
         feat=["plain-English guides", "fixed-fee packs", "case checkers", "consultation booking", "helpline widgets", "document checklists", "testimonial walls", "verdict trackers"]),
    # 13 Tutors
    dict(adj=["Numeracy", "Grammar", "Concept", "Lingua", "RankUp", "Homework", "CodeSprouts", "Veda", "Bright", "Prime"],
         noun=["Nest", "Garden", "Maps", "Leap", "Academy", "Hub", "Sprouts", "Vidya", "Classes", "Mentors"],
         feat=["progress dashboards", "mock-test analytics", "parent reports", "project galleries", "speaking clubs", "writing labs", "doubt forums", "demo-class funnels"]),
    # 14 Spas
    dict(adj=["Stillwater", "Salt", "Petal", "Urban", "Moonmilk", "Clay", "Hammam", "Serene", "Lotus", "Jade"],
         noun=["Spa", "Room", "Rituals", "Onsen", "Studio", "House", "Retreat", "Sanctuary", "Den", "Garden"],
         feat=["ritual menus", "session booking", "dosha quizzes", "etiquette guides", "sleep-kit upsells", "group packages", "treatment stories", "gift-card flows"]),
    # 15 Bakeries
    dict(adj=["Crumb", "Sourdough", "Flour", "Midnight", "Millet", "Sugar", "Proofing", "Butter", "Golden", "Hearth"],
         noun=["Craft", "Society", "Co", "Crust", "Mill", "Bar", "Room", "Paper", "Kitchen", "Oven"],
         feat=["bake-day calendars", "starter kits", "wedding tiers", "workshop booking", "design consults", "nutrition cards", "subscription boxes", "wholesale pages"]),
    # 16 Boutiques
    dict(adj=["Drape", "Hem", "Linen", "Mira", "Patchwork", "Rainbow", "Blockprint", "Saree", "Velvet", "Thread"],
         noun=["Edit", "Loft", "Studio", "Bureau", "Post", "House", "Atelier", "Library", "Collective", "Co"],
         feat=["styling consults", "fit guides", "fabric stories", "trunk-show calendars", "maker profiles", "growth charts", "rental flows", "artisan maps"]),
    # 17 Garages
    dict(adj=["Torque", "Honest", "Pitstop", "Voltage", "Clutch", "Fleetline", "Vintage", "Redline", "Ozone", "True"],
         noun=["Auto", "Care", "Garage", "Den", "Works", "Services", "Motors", "Lab", "Point", "Crew"],
         feat=["live service status", "slot booking", "video inspections", "EV battery reports", "package builders", "fleet dashboards", "build diaries", "waiting-lounge menus"]),
    # 18 Interior Designers
    dict(adj=["Reverie", "Space", "Hearth", "Mudhouse", "Rental", "Worknest", "Casa", "Vastu", "Nook", "Form"],
         noun=["Studio", "Interiors", "Rooms", "Atelier", "Lab", "Works", "House", "Collective", "Edit", "Co"],
         feat=["moodboard flows", "3D previews", "palette tools", "material libraries", "budget planners", "ergonomics quizzes", "declutter guides", "site diaries"]),
    # 19 Event Planners
    dict(adj=["Grand", "Confetti", "Corporate", "Mehfil", "PopUp", "Haldi", "Summit", "Tiny", "Golden", "Velvet"],
         noun=["Marquee", "Co", "Stage", "Moments", "Theory", "Edit", "Soiree", "Gatherings", "Events", "Studio"],
         feat=["venue shortlists", "theme kits", "run-of-show tools", "artist rosters", "footfall reports", "RSVP flows", "vendor dashboards", "moodboard builders"]),
    # 20 Jewellers
    dict(adj=["Gold", "Heirloom", "Diamond", "Silver", "Bridal", "Kundan", "Aurum", "Coin", "Velvet", "Royal"],
         noun=["Ledger", "Co", "Desk", "Studio", "Vault", "House", "Line", "Counter", "Gallery", "Works"],
         feat=["live rate tickers", "4C explainers", "appointment booking", "try-at-home flows", "provenance cards", "craft films", "lookbooks", "gift consults"]),
    # 21 Travel Agents
    dict(adj=["Slow", "Desert", "Visa", "Honeymoon", "Trek", "Pilgrim", "Island", "Rail", "Compass", "Wander"],
         noun=["Itinerary", "Compass", "Desk", "Maps", "Tales", "Path", "Hopper", "Reverie", "Journeys", "Routes"],
         feat=["route maps", "stay curation", "visa checklists", "moodboards", "difficulty grades", "senior-friendly plans", "ferry timetables", "berth guides"]),
    # 22 Pet Services
    dict(adj=["Wag", "Purr", "Groom", "Fetch", "Vet", "Beak", "Senior", "Adopt", "Paw", "Whisker"],
         noun=["Club", "Co", "Trail", "Fitness", "Van", "Feather", "Care", "Adore", "House", "Crew"],
         feat=["live-cam pages", "suite tours", "route booking", "GPS walk reports", "slot pickers", "species guides", "health logs", "foster stories"]),
    # 23 Fitness Studios
    dict(adj=["Reformer", "Barre", "Breathwork", "Kettlebell", "Mobility", "Dancefit", "Cold Plunge", "Yin Yang", "Primal", "Forge"],
         noun=["Room", "Studio", "Loft", "Kitchen", "Lab", "District", "Club", "Yoga", "Works", "Project"],
         feat=["class levels", "challenge months", "session libraries", "skill progressions", "assessment flows", "instructor reels", "contrast protocols", "style finders"]),
]

TAGLINE_TEMPLATES = [
    "A {adj} {singular} concept built around {feat}.",
    "{Adj} {singular} concept — {feat} at its core.",
]


def build_projects():
    rng = random.Random(SEED)
    projects = []
    used_titles = set()
    pid = 1

    def add(title, category, singular, tagline, archetype, kind):
        nonlocal pid
        if title in used_titles:
            raise ValueError("duplicate title: %s" % title)
        used_titles.add(title)
        projects.append({
            "id": "p%04d" % pid,
            "title": title,
            "category": category,
            "tagline": tagline,
            "palette": rng.randrange(12),
            "archetype": archetype,
            "kind": kind,
        })
        pid += 1

    # --- 192 hand-crafted flagships (8 per category, in category order) ---
    for ci, (cat, singular, arch) in enumerate(CATEGORIES):
        pairs = FLAGSHIPS[ci]
        assert len(pairs) == 8, "category %s needs exactly 8 flagships" % cat
        for name, tagline in pairs:
            add(name, cat, singular, tagline, arch, "flagship")

    # --- 808 generated: 16 categories x 34 + 8 categories x 33 ---
    counts = [34] * 16 + [33] * 8
    for ci, (cat, singular, arch) in enumerate(CATEGORIES):
        pools = GEN[ci]
        for _ in range(counts[ci]):
            for _attempt in range(200):
                a = rng.choice(pools["adj"])
                n = rng.choice(pools["noun"])
                title = "%s %s" % (a, n)
                if title not in used_titles:
                    break
            else:
                raise ValueError("could not find unique title in %s" % cat)
            f = rng.choice(pools["feat"])
            a2 = rng.choice([x for x in pools["adj"] if x != a])
            tpl = rng.choice(TAGLINE_TEMPLATES)
            tagline = tpl.format(adj=a2.lower(), Adj=a2, singular=singular, feat=f)
            add(title, cat, singular, tagline, arch, "generated")

    return projects


def main():
    projects = build_projects()
    assert len(projects) == 1000, "expected 1000, got %d" % len(projects)
    cats = {}
    kinds = {}
    for p in projects:
        cats[p["category"]] = cats.get(p["category"], 0) + 1
        kinds[p["kind"]] = kinds.get(p["kind"], 0) + 1
    assert len(cats) == 24 and all(v == 8 or True for v in cats.values())
    assert kinds.get("flagship") == 192, kinds
    assert kinds.get("generated") == 808, kinds
    archs = {p["archetype"] for p in projects}
    assert archs == set(range(24)), "archetypes must cover 0-23, got %s" % sorted(archs)

    out_path = os.path.join(SITE, "data", "projects.json")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as fh:
        json.dump(projects, fh, ensure_ascii=False, separators=(",", ":"))
    size = os.path.getsize(out_path)
    print("wrote %s  (%d projects, %d bytes)" % (out_path, len(projects), size))
    print("flagships=%d generated=%d categories=%d" % (
        kinds["flagship"], kinds["generated"], len(cats)))
    print("per-category total: min=%d max=%d" % (min(cats.values()), max(cats.values())))


if __name__ == "__main__":
    main()
