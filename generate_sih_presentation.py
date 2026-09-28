import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 Widescreen standard
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_slide_layout = prs.slide_layouts[6]

    # Theme Colors
    BG_DARK = RGBColor(8, 12, 20)       # #080C14
    BG_CARD = RGBColor(11, 18, 32)      # #0B1220
    BG_CARD_ALT = RGBColor(7, 11, 20)   # #070B14
    BORDER_COLOR = RGBColor(30, 41, 59) # #1E293B
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(148, 163, 184) # #94A3B8
    CYAN_PRIMARY = RGBColor(0, 212, 255) # #00D4FF
    CYAN_ACCENT = RGBColor(34, 211, 238) # #22D3EE
    EMERALD_GREEN = RGBColor(16, 185, 129) # #10B981
    AMBER_GOLD = RGBColor(245, 158, 11)   # #F59E0B

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background() # No border
        return bg

    def add_header(slide, title, category="SMART INDIA HACKATHON 2026 | PROBLEM STATEMENT ID: SIH26151"):
        # Top Category pill
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.name = "Arial"
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = CYAN_PRIMARY

        # Title
        t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.6))
        tf_t = t_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.font.name = "Arial"
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

    def add_card(slide, left, top, width, height, bg_color=BG_CARD, border_color=BORDER_COLOR):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
        return card

    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s1)

    # Decorative background card
    add_card(s1, 0.8, 0.8, 11.733, 5.9, bg_color=BG_CARD, border_color=BORDER_COLOR)

    # Top Tag
    tag_box = s1.shapes.add_textbox(Inches(1.2), Inches(1.2), Inches(10.9), Inches(0.4))
    tf_tag = tag_box.text_frame
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = "SMART INDIA HACKATHON 2026 — IDEA PRESENTATION"
    p_tag.font.name = "Arial"
    p_tag.font.size = Pt(12)
    p_tag.font.bold = True
    p_tag.font.color.rgb = CYAN_PRIMARY

    # Main Project Title
    title_box = s1.shapes.add_textbox(Inches(1.2), Inches(1.6), Inches(10.9), Inches(1.3))
    tf_title = title_box.text_frame
    tf_title.word_wrap = True
    p_t1 = tf_title.paragraphs[0]
    p_t1.text = "Dark Web Threat Actor De-anonymization and Real-World Attribution"
    p_t1.font.name = "Arial"
    p_t1.font.size = Pt(26)
    p_t1.font.bold = True
    p_t1.font.color.rgb = TEXT_WHITE

    p_t2 = tf_title.add_paragraph()
    p_t2.text = "Probabilistic Multi-Signal Correlation & Investigator-Validated Entity Resolution Platform"
    p_t2.font.name = "Arial"
    p_t2.font.size = Pt(14)
    p_t2.font.color.rgb = CYAN_ACCENT

    # Metadata Grid (3 Cards inside Slide 1)
    # Card 1: Problem Details
    add_card(s1, 1.2, 3.2, 3.4, 2.8, bg_color=BG_CARD_ALT, border_color=BORDER_COLOR)
    b1 = s1.shapes.add_textbox(Inches(1.4), Inches(3.3), Inches(3.0), Inches(2.6))
    tf1 = b1.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "PROBLEM STATEMENT"
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = CYAN_PRIMARY

    bullets1 = [
        "ID: SIH26151",
        "Category: Software Edition",
        "Theme: Cyber Security / Defense & Law Enforcement",
        "Target Sector: Darknet Crime, Ransomware & FinTech Extortion",
        "Focus: Two-Stage Non-Autonomous Attribution"
    ]
    for b in bullets1:
        p = tf1.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED

    # Card 2: Team Details
    add_card(s1, 4.9, 3.2, 3.4, 2.8, bg_color=BG_CARD_ALT, border_color=BORDER_COLOR)
    b2 = s1.shapes.add_textbox(Inches(5.1), Inches(3.3), Inches(3.0), Inches(2.6))
    tf2 = b2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = "TEAM PARTICULARS"
    p2.font.size = Pt(11)
    p2.font.bold = True
    p2.font.color.rgb = EMERALD_GREEN

    bullets2 = [
        "Team Name: Argus Intelligence Cell",
        "Team Leader: Tejasree Guntipalli",
        "Team Members: 6 Members",
        "Role: Full-Stack Cybersecurity & Forensic Architecture",
        "Repository: Public GitHub Verified"
    ]
    for b in bullets2:
        p = tf2.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED

    # Card 3: Core Mandate
    add_card(s1, 8.6, 3.2, 3.5, 2.8, bg_color=BG_CARD_ALT, border_color=BORDER_COLOR)
    b3 = s1.shapes.add_textbox(Inches(8.8), Inches(3.3), Inches(3.1), Inches(2.6))
    tf3 = b3.text_frame
    tf3.word_wrap = True
    p3 = tf3.paragraphs[0]
    p3.text = "CORE LEGAL MANDATE"
    p3.font.size = Pt(11)
    p3.font.bold = True
    p3.font.color.rgb = AMBER_GOLD

    bullets3 = [
        "Correlation ≠ Identification",
        "Attribution Lead ≠ Confirmed Identity",
        "Zero Autonomous Real-World Leap",
        "Sworn Investigator Decision Gate",
        "Court-Admissible Provenance Hashing"
    ]
    for b in bullets3:
        p = tf3.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 2: PROPOSED SOLUTION & INNOVATION
    # =========================================================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s2)
    add_header(s2, "Proposed Solution: Two-Stage Investigation Paradigm")

    # Column 1: Problem Gap
    add_card(s2, 0.8, 1.5, 3.6, 5.3, bg_color=BG_CARD)
    tb2_1 = s2.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf2_1 = tb2_1.text_frame
    tf2_1.word_wrap = True
    p = tf2_1.paragraphs[0]
    p.text = "THE PROBLEM & GAP"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = AMBER_GOLD

    points2_1 = [
        "Darknet Anonymity: Threat actors fragment personas across forums (Dread, XSS, BreachForums), use Wasabi CoinJoin mixers, and hide behind reverse proxies.",
        "The Attribution Fallacy: Existing systems leap prematurely from forum handles to physical identities, causing dangerous false positives.",
        "Missing Explainability: Machine learning models provide opaque similarity scores without forensic source citations or judicial chain-of-custody."
    ]
    for pt in points2_1:
        p = tf2_1.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(10)

    # Column 2: Two-Stage Solution
    add_card(s2, 4.7, 1.5, 4.0, 5.3, bg_color=BG_CARD)
    tb2_2 = s2.shapes.add_textbox(Inches(4.9), Inches(1.7), Inches(3.6), Inches(4.9))
    tf2_2 = tb2_2.text_frame
    tf2_2.word_wrap = True
    p = tf2_2.paragraphs[0]
    p.text = "THE TWO-STAGE PARADIGM"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN_PRIMARY

    points2_2 = [
        "STAGE 1: Digital Actor Correlation\nAnalyzes pairwise handles across 5 forensic signals (Stylometry, PGP keys, Crypto UTXOs, Temporal windows, Infrastructure) to synthesize Probable Digital Actor Clusters (0-100%).",
        "MANDATORY DECISION GATE\nEnforces a configurable threshold (≥80%). Stage 2 remains strictly locked until an authorized investigator formally reviews supporting evidence and signs off.",
        "STAGE 2: Real-World Attribution\nMappable entity resolution across 6 dimensions (Registrar, ASN, Infrastructure, Financial, Intelligence, Corporate Filings) to produce qualified Attribution Leads."
    ]
    for pt in points2_2:
        p = tf2_2.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(8)

    # Column 3: Key Innovations
    add_card(s2, 9.0, 1.5, 3.5, 5.3, bg_color=BG_CARD)
    tb2_3 = s2.shapes.add_textbox(Inches(9.2), Inches(1.7), Inches(3.1), Inches(4.9))
    tf2_3 = tb2_3.text_frame
    tf2_3.word_wrap = True
    p = tf2_3.paragraphs[0]
    p.text = "CORE INNOVATIONS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN

    points2_3 = [
        "Forensic Explainability: Detailed 'Why are these identities connected?' breakdown citing exact PGP fingerprints, orthographic patterns, and blockchain blocks.",
        "Comparative Hypotheses: Evaluates Candidate Entity A (Primary Lead) against Candidate Entity B (Bulletproof Host) and C (VPN Relay).",
        "Anti-Biasing Architecture: Highlights conflicting evidence and unknown gaps alongside supporting proofs.",
        "Investigation Path Tracing: One-click interactive traversal highlighting the forensic chain from physical candidate to darknet handle."
    ]
    for pt in points2_3:
        p = tf2_3.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(8)


    # =========================================================================
    # SLIDE 3: TECHNICAL ARCHITECTURE & METHODOLOGY
    # =========================================================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s3)
    add_header(s3, "Technical Architecture: End-to-End Investigation Pipeline")

    # Workflow Steps Cards (5 Horizontal Process Cards)
    steps = [
        ("1. INGESTION", "Monitors raw darknet forum dumps, Telegram channels, PGP keyservers, and blockchain ledgers.", CYAN_PRIMARY),
        ("2. FEATURE EXTRACTION", "Extracts stylometric n-grams, PGP 160-bit SHA-1 hashes, and Bitcoin SegWit UTXOs.", CYAN_ACCENT),
        ("3. MULTI-SIGNAL MATRIX", "Scoring across 5 signals: Username (20%), Stylometry (25%), Behaviour (20%), Temporal (15%), Technical (20%).", EMERALD_GREEN),
        ("4. TOPOLOGY GRAPH", "Cytoscape.js unified graph engine with interactive node inspection and path tracing.", CYAN_PRIMARY),
        ("5. STAGE 1 CLUSTERING", "Synthesizes Probable Digital Actor Cluster A (92% Confidence; 11 Supp / 1 Confl / 2 Unk).", EMERALD_GREEN)
    ]

    card_w = 2.2
    for i, (stitle, sdesc, scolor) in enumerate(steps):
        left_pos = 0.8 + i * 2.38
        add_card(s3, left_pos, 1.5, card_w, 2.4, bg_color=BG_CARD)
        tb = s3.shapes.add_textbox(Inches(left_pos + 0.1), Inches(1.6), Inches(card_w - 0.2), Inches(2.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = stitle
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = scolor

        p2 = tf.add_paragraph()
        p2.text = sdesc
        p2.font.size = Pt(9)
        p2.font.color.rgb = TEXT_MUTED

    # Bottom Row: 5 More Stages (Handoff & Stage 2)
    steps_bottom = [
        ("6. DECISION GATE (≥80%)", "Critical barrier requiring sworn investigator authorization before initiating Stage 2.", AMBER_GOLD),
        ("7. ENTITY RESOLUTION", "Maps digital indicators to real-world candidates across 6 intelligence dimensions.", CYAN_PRIMARY),
        ("8. HYPOTHESIS COMPARISON", "Side-by-side comparative scoring: Candidate A (82%) vs Candidate B (67%) vs Candidate C (44%).", CYAN_ACCENT),
        ("9. HUMAN VALIDATION", "Sworn investigator accepts, rejects, or requests additional judicial subpoena records.", EMERALD_GREEN),
        ("10. COURT-READY DOSSIER", "Generates admissible forensic dossier with timestamped audit logs and hash chains.", AMBER_GOLD)
    ]

    for i, (stitle, sdesc, scolor) in enumerate(steps_bottom):
        left_pos = 0.8 + i * 2.38
        add_card(s3, left_pos, 4.2, card_w, 2.6, bg_color=BG_CARD)
        tb = s3.shapes.add_textbox(Inches(left_pos + 0.1), Inches(4.3), Inches(card_w - 0.2), Inches(2.4))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = stitle
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = scolor

        p2 = tf.add_paragraph()
        p2.text = sdesc
        p2.font.size = Pt(9)
        p2.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 4: FEASIBILITY, VIABILITY & POTENTIAL IMPACT
    # =========================================================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s4)
    add_header(s4, "Feasibility, Viability & Law Enforcement Impact")

    # 3 Large Feature Cards
    # Card 1: Operational Feasibility
    add_card(s4, 0.8, 1.5, 3.6, 5.3, bg_color=BG_CARD)
    tb4_1 = s4.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf4_1 = tb4_1.text_frame
    tf4_1.word_wrap = True
    p = tf4_1.paragraphs[0]
    p.text = "OPERATIONAL FEASIBILITY"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN_PRIMARY

    pts4_1 = [
        "Law Enforcement Ready: Designed directly for cyber cells (CERT-In, CBI, Interpol, State Cyber Directorates).",
        "Resilient to Noise: Functions with fragmented data (handles Tor rotation, Wasabi CoinJoin mixers, and VPN egresses).",
        "Low Resource Footprint: Client-side graph visualization & modular microservice calculation allows zero-latency case building."
    ]
    for pt in pts4_1:
        p = tf4_1.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(12)

    # Card 2: Legal Admissibility
    add_card(s4, 4.7, 1.5, 4.0, 5.3, bg_color=BG_CARD)
    tb4_2 = s4.shapes.add_textbox(Inches(4.9), Inches(1.7), Inches(3.6), Inches(4.9))
    tf4_2 = tb4_2.text_frame
    tf4_2.word_wrap = True
    p = tf4_2.paragraphs[0]
    p.text = "LEGAL ADMISSIBILITY"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN

    pts4_2 = [
        "Indian Evidence Act / BSA Compliance: Maintains unbroken chain of custody, cryptographic hashes, and provenance records for every indicator.",
        "Confidence Evolution Timeline: Traces evidentiary score changes step-by-step (+15% for PGP match, -5% for hosting ISP mismatch) preventing arbitrary accusations.",
        "Sworn Analyst Sign-Off: Ensures every attribution output is legally actionable and signed by an authorized investigator (e.g. Warrant #CR-2026-8819)."
    ]
    for pt in pts4_2:
        p = tf4_2.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(12)

    # Card 3: Potential Impact
    add_card(s4, 9.0, 1.5, 3.5, 5.3, bg_color=BG_CARD)
    tb4_3 = s4.shapes.add_textbox(Inches(9.2), Inches(1.7), Inches(3.1), Inches(4.9))
    tf4_3 = tb4_3.text_frame
    tf4_3.word_wrap = True
    p = tf4_3.paragraphs[0]
    p.text = "NATIONAL & GLOBAL IMPACT"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = AMBER_GOLD

    pts4_3 = [
        "Accelerates Investigations: Reduces de-anonymization workflow from months of manual cross-referencing to hours of structured graph intelligence.",
        "Zero False Arrests: Explicit multi-hypothesis evaluation separates criminal syndicates from infrastructure leaseholders.",
        "Multi-Agency Federation: Supports cross-jurisdictional intelligence sharing with granular role-based access control."
    ]
    for pt in pts4_3:
        p = tf4_3.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(12)


    # =========================================================================
    # SLIDE 5: TECHNOLOGY STACK, SECURITY & COMPLIANCE
    # =========================================================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s5)
    add_header(s5, "Technology Stack, Security & Compliance")

    # 4 Quadrant Cards
    # Quadrant 1: Frontend & Visualization
    add_card(s5, 0.8, 1.5, 5.6, 2.5, bg_color=BG_CARD)
    tb5_1 = s5.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(5.2), Inches(2.3))
    tf5_1 = tb5_1.text_frame
    tf5_1.word_wrap = True
    p = tf5_1.paragraphs[0]
    p.text = "FRONTEND & GRAPH VISUALIZATION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = CYAN_PRIMARY

    bullets5_1 = [
        "React 19 + TypeScript: Type-safe, component-driven reactive workstation",
        "Cytoscape.js: Industrial-strength network topology graph with force-directed physics",
        "Investigation Path Tracer: Custom animated sub-graph traversal highlighting",
        "Tailwind CSS: High-contrast law enforcement dark-mode interface"
    ]
    for b in bullets5_1:
        p = tf5_1.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED

    # Quadrant 2: Analytical Engines
    add_card(s5, 6.8, 1.5, 5.7, 2.5, bg_color=BG_CARD)
    tb5_2 = s5.shapes.add_textbox(Inches(7.0), Inches(1.6), Inches(5.3), Inches(2.3))
    tf5_2 = tb5_2.text_frame
    tf5_2.word_wrap = True
    p = tf5_2.paragraphs[0]
    p.text = "ANALYTICAL & FORENSIC ENGINES"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN

    bullets5_2 = [
        "Stylometry Engine: Cosine TF-IDF n-grams, punctuation habits, sentence entropy",
        "Cryptographic Key Chainer: RSA-4096 & Ed25519 PGP keyserver correlation",
        "Blockchain UTXO Traversal: Bitcoin SegWit co-spend clustering & Wasabi peel tracking",
        "Entity Resolution Matrix: Weighted multi-signal evidence aggregation algorithm"
    ]
    for b in bullets5_2:
        p = tf5_2.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED

    # Quadrant 3: Security & Operational Boundaries
    add_card(s5, 0.8, 4.3, 5.6, 2.5, bg_color=BG_CARD)
    tb5_3 = s5.shapes.add_textbox(Inches(1.0), Inches(4.4), Inches(5.2), Inches(2.3))
    tf5_3 = tb5_3.text_frame
    tf5_3.word_wrap = True
    p = tf5_3.paragraphs[0]
    p.text = "SECURITY & OPERATIONAL BOUNDARIES"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = AMBER_GOLD

    bullets5_3 = [
        "Passive Ingestion Only: Zero automated web exploitation or unauthorized access",
        "Strict Media Quarantine: Prohibits local storage of illegal darknet media/payloads",
        "Tamper-Proof Audit Logging: Every filter change and decision committed to log",
        "Role-Based Access Control (RBAC): Restricted to sworn intelligence analysts"
    ]
    for b in bullets5_3:
        p = tf5_3.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED

    # Quadrant 4: Standards & Compliance
    add_card(s5, 6.8, 4.3, 5.7, 2.5, bg_color=BG_CARD)
    tb5_4 = s5.shapes.add_textbox(Inches(7.0), Inches(4.4), Inches(5.3), Inches(2.3))
    tf5_4 = tb5_4.text_frame
    tf5_4.word_wrap = True
    p = tf5_4.paragraphs[0]
    p.text = "STANDARDS & LEGAL COMPLIANCE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    bullets5_4 = [
        "ISO/IEC 27037: Guidelines for digital evidence identification, collection, and preservation",
        "STIX 2.1 / TAXII: Structured Threat Information Expression interoperability",
        "Judicial Warrant Integration: Restricts entity matching to authorized warrant scopes",
        "Explainable AI Principles: Complies with global ethical AI accountability frameworks"
    ]
    for b in bullets5_4:
        p = tf5_4.add_paragraph()
        p.text = f"• {b}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 6: PROJECT ROADMAP & CONCLUSION
    # =========================================================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s6)
    add_header(s6, "Project Roadmap, Deliverables & Conclusion")

    # 3 Progress Columns
    # Col 1: Phase 1 (Completed SIH Prototype)
    add_card(s6, 0.8, 1.5, 3.6, 5.3, bg_color=BG_CARD)
    tb6_1 = s6.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.2), Inches(4.9))
    tf6_1 = tb6_1.text_frame
    tf6_1.word_wrap = True
    p = tf6_1.paragraphs[0]
    p.text = "PHASE 1: CURRENT DELIVERABLE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN

    pts6_1 = [
        "Status: 100% Fully Functional Prototype",
        "Case Builder Workstation: Ingest handles, execute animated correlation, review 92% Actor Cluster A.",
        "Cytoscape Evidence Topology: Dynamic graph with 'Trace Investigation Path' mode.",
        "Stage 2 Attribution Workspace: Comparative hypothesis resolution (Candidate A/B/C) with investigator decisioning.",
        "GitHub Repository: Fully committed & verified build."
    ]
    for pt in pts6_1:
        p = tf6_1.add_paragraph()
        p.text = f"✓ {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(8)

    # Col 2: Phase 2 & 3 (Future Scope)
    add_card(s6, 4.7, 1.5, 4.0, 5.3, bg_color=BG_CARD)
    tb6_2 = s6.shapes.add_textbox(Inches(4.9), Inches(1.7), Inches(3.6), Inches(4.9))
    tf6_2 = tb6_2.text_frame
    tf6_2.word_wrap = True
    p = tf6_2.paragraphs[0]
    p.text = "PHASE 2 & 3: FUTURE ROADMAP"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = CYAN_PRIMARY

    pts6_2 = [
        "Q3 2026: Automated Darknet Collectors\nDeploy asynchronous Tor/I2P crawlers for real-time Dread, BreachForums, and Telegram monitoring.",
        "Q4 2026: Advanced Monero Ring Tracing\nIncorporate heuristic ring-signature decoying analysis and cross-chain swap monitoring.",
        "Q1 2027: Multi-Agency MLAT Federation\nSecure federated intelligence sharing across Interpol and state cyber crime directorates."
    ]
    for pt in pts6_2:
        p = tf6_2.add_paragraph()
        p.text = f"▸ {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(10)

    # Col 3: Key Takeaway / Conclusion
    add_card(s6, 9.0, 1.5, 3.5, 5.3, bg_color=BG_CARD)
    tb6_3 = s6.shapes.add_textbox(Inches(9.2), Inches(1.7), Inches(3.1), Inches(4.9))
    tf6_3 = tb6_3.text_frame
    tf6_3.word_wrap = True
    p = tf6_3.paragraphs[0]
    p.text = "FINAL CONCLUSION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = AMBER_GOLD

    pts6_3 = [
        "A Paradigm Shift in Cyber Attribution:\nReplaces reckless automated accusations with an explainable, legally disciplined, two-stage platform.",
        "Core Philosophy:\n'AI finds patterns. Graph connects evidence. Investigators validate attribution.'",
        "SIH 2026 Impact:\nA production-ready prototype solving SIH26151 with complete technical integrity and ethical compliance."
    ]
    for pt in pts6_3:
        p = tf6_3.add_paragraph()
        p.text = f"★ {pt}"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(10)

    # Save Presentation
    output_path = r"C:\Users\Teju\.gemini\antigravity\scratch\sih-darkweb-attribution\SIH2026-Threat-Actor-Attribution-Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_presentation()
