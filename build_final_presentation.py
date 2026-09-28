import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Professional Theme Palette: Dark Charcoal & Slate with Restrained Gold, Cyan, and Emerald accents
    BG_DARK = RGBColor(10, 15, 29)          # Deep charcoal navy (#0A0F1D)
    CARD_BG = RGBColor(15, 23, 42)          # Slate-900 (#0F172A)
    CARD_BG_ALT = RGBColor(20, 30, 52)      # Elevated Slate-850 (#141E34)
    CARD_BORDER = RGBColor(30, 41, 59)      # Slate-800 (#1E293B)
    CARD_BORDER_ACCENT = RGBColor(51, 65, 85) # Slate-700 (#334155)

    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_LIGHT = RGBColor(241, 245, 249)    # Slate-100
    TEXT_MUTED = RGBColor(148, 163, 184)    # Slate-400
    TEXT_SUBTLE = RGBColor(100, 116, 139)   # Slate-500

    ACCENT_GOLD = RGBColor(245, 158, 11)    # Amber/Gold (#F59E0B)
    ACCENT_CYAN = RGBColor(6, 182, 212)     # Cyan (#06B6D4)
    ACCENT_EMERALD = RGBColor(16, 185, 129) # Emerald (#10B981)
    ACCENT_RED = RGBColor(239, 68, 68)      # Red (#EF4444)

    def set_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="SMART INDIA HACKATHON 2026 | PROBLEM STATEMENT ID: SIH26151"):
        # Top Category Eyebrow
        cbox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.35))
        tf_c = cbox.text_frame
        tf_c.word_wrap = True
        tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0
        p_c = tf_c.paragraphs[0]
        p_c.text = category_text.upper()
        p_c.font.name = "Segoe UI"
        p_c.font.size = Pt(10)
        p_c.font.bold = True
        p_c.font.color.rgb = ACCENT_CYAN

        # Title
        tbox = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.733), Inches(0.6))
        tf_t = tbox.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.name = "Segoe UI"
        p_t.font.size = Pt(20)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE

    def add_card(slide, left, top, width, height, bg=CARD_BG, border=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg
        card.line.color.rgb = border
        card.line.width = Pt(1)
        return card

    # =========================================================================
    # SLIDE 1 — TITLE SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_bg(s1)

    # Main Card
    add_card(s1, 0.8, 0.7, 11.733, 6.1, bg=CARD_BG, border=CARD_BORDER_ACCENT)

    # Eyebrow tag
    tb = s1.shapes.add_textbox(Inches(1.2), Inches(1.0), Inches(10.9), Inches(0.35))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SMART INDIA HACKATHON 2026 | SOFTWARE EDITION | PS ID: SIH26151"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    # Project Title
    tb_title = s1.shapes.add_textbox(Inches(1.2), Inches(1.4), Inches(10.9), Inches(1.3))
    tf_title = tb_title.text_frame
    tf_title.word_wrap = True
    p1 = tf_title.paragraphs[0]
    p1.text = "Argus Threat Actor Attribution Platform"
    p1.font.name = "Segoe UI"
    p1.font.size = Pt(28)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE

    p2 = tf_title.add_paragraph()
    p2.text = "Dark Web Threat Actor De-anonymization and Real-World Attribution"
    p2.font.name = "Segoe UI"
    p2.font.size = Pt(15)
    p2.font.color.rgb = ACCENT_GOLD
    p2.space_before = Pt(4)

    # 3 Info Cards
    col_w = 3.45
    # Card 1: Problem Specifics
    add_card(s1, 1.2, 2.9, col_w, 2.5, bg=CARD_BG_ALT, border=CARD_BORDER)
    tb_i1 = s1.shapes.add_textbox(Inches(1.4), Inches(3.05), Inches(col_w - 0.4), Inches(2.2))
    tf_i1 = tb_i1.text_frame
    tf_i1.word_wrap = True
    p = tf_i1.paragraphs[0]
    p.text = "PROBLEM DOMAIN"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    bullets1 = [
        "Theme: Cyber Security / Defense & Law Enforcement",
        "Target: Darknet Initial Access Brokers & Extortionists",
        "Operational Reality: Fragmented handles & anonymous crypto",
        "Framework: Two-Stage Non-Autonomous Forensic Handoff"
    ]
    for b in bullets1:
        p = tf_i1.add_paragraph()
        p.text = f"• {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Card 2: Team Specifics
    add_card(s1, 4.95, 2.9, col_w, 2.5, bg=CARD_BG_ALT, border=CARD_BORDER)
    tb_i2 = s1.shapes.add_textbox(Inches(5.15), Inches(3.05), Inches(col_w - 0.4), Inches(2.2))
    tf_i2 = tb_i2.text_frame
    tf_i2.word_wrap = True
    p = tf_i2.paragraphs[0]
    p.text = "TEAM PARTICULARS"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    bullets2 = [
        "Team: Argus Intelligence Cell",
        "Team Leader: Tejasree Guntipalli",
        "Team Size: 6 Members",
        "Institute: [College / University Name]",
        "Implementation: Working Web Prototype + Cytoscape Topology"
    ]
    for b in bullets2:
        p = tf_i2.add_paragraph()
        p.text = f"• {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Card 3: Core Principles
    add_card(s1, 8.7, 2.9, col_w, 2.5, bg=CARD_BG_ALT, border=CARD_BORDER)
    tb_i3 = s1.shapes.add_textbox(Inches(8.9), Inches(3.05), Inches(col_w - 0.4), Inches(2.2))
    tf_i3 = tb_i3.text_frame
    tf_i3.word_wrap = True
    p = tf_i3.paragraphs[0]
    p.text = "GOVERNING PRINCIPLES"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    bullets3 = [
        "Correlation ≠ Identification",
        "Attribution Lead ≠ Confirmed Identity",
        "Zero Autonomous Real-World Leap",
        "Threshold Clearance (≥80%) Enforced",
        "Sworn Investigator Sign-off Required"
    ]
    for b in bullets3:
        p = tf_i3.add_paragraph()
        p.text = f"• {b}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Bottom Banner on Slide 1: Mandatory Visual Statement
    add_card(s1, 1.2, 5.65, 10.933, 0.85, bg=RGBColor(12, 20, 36), border=ACCENT_GOLD)
    tb_banner = s1.shapes.add_textbox(Inches(1.4), Inches(5.72), Inches(10.5), Inches(0.7))
    tf_ban = tb_banner.text_frame
    p_ban1 = tf_ban.paragraphs[0]
    p_ban1.alignment = PP_ALIGN.CENTER
    p_ban1.text = "CORRELATION ≠ IDENTIFICATION   |   ATTRIBUTION LEAD ≠ CONFIRMED IDENTITY"
    p_ban1.font.name = "Segoe UI"
    p_ban1.font.size = Pt(13)
    p_ban1.font.bold = True
    p_ban1.font.color.rgb = ACCENT_GOLD

    p_ban2 = tf_ban.add_paragraph()
    p_ban2.alignment = PP_ALIGN.CENTER
    p_ban2.text = "AI FINDS PATTERNS. GRAPH CONNECTS EVIDENCE. INVESTIGATORS VALIDATE ATTRIBUTION."
    p_ban2.font.name = "Segoe UI"
    p_ban2.font.size = Pt(10)
    p_ban2.font.color.rgb = TEXT_LIGHT


    # =========================================================================
    # SLIDE 2 — PROBLEM + PROPOSED SOLUTION + INNOVATION
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_bg(s2)
    add_header(s2, "Operational Problem & Two-Stage Attribution Paradigm")

    # Left Column: The Problem (Width: 3.5)
    add_card(s2, 0.8, 1.45, 3.6, 5.4, bg=CARD_BG, border=CARD_BORDER)
    tb_p = s2.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(3.2), Inches(5.1))
    tf_p = tb_p.text_frame
    tf_p.word_wrap = True
    p = tf_p.paragraphs[0]
    p.text = "THE OPERATIONAL PROBLEM"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    prob_pts = [
        ("Identity Fragmentation", "Threat actors operate under disparate personas across forums (Dread, XSS, BreachForums, Telegram)."),
        ("Multi-Signal Disconnect", "Connecting handles requires combining PGP keyrings, stylometric syntax, Bitcoin UTXO co-spends, and infrastructure IPs."),
        ("The False-Attribution Trap", "Prematurely jumping from darknet usernames to real-world individuals risks devastating false arrests and judicial failure."),
        ("The Need", "An explainable system where correlation never automatically triggers real-world attribution.")
    ]
    for heading, desc in prob_pts:
        p = tf_p.add_paragraph()
        p.text = heading.upper()
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(8)

        p2 = tf_p.add_paragraph()
        p2.text = desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = TEXT_MUTED

    # Center Column: Visual Two-Stage Architecture Flow (Width: 4.1)
    add_card(s2, 4.65, 1.45, 4.1, 5.4, bg=CARD_BG, border=ACCENT_CYAN)
    tb_flow = s2.shapes.add_textbox(Inches(4.85), Inches(1.6), Inches(3.7), Inches(5.1))
    tf_flow = tb_flow.text_frame
    tf_flow.word_wrap = True
    p = tf_flow.paragraphs[0]
    p.text = "TWO-STAGE SOLUTION PARADIGM"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    flow_boxes = [
        ("STAGE 1: DIGITAL ACTOR CORRELATION", "Ingests darknet handles & extracts 5 forensic signals (PGP, Stylometry, Crypto, Infrastructure, Temporal).", ACCENT_CYAN),
        ("↓ EVIDENCE STRENGTH CALCULATION", "Computes aggregate confidence score (0-100%) with 11 supporting, 1 conflicting, and 2 unknown signals.", TEXT_LIGHT),
        ("↓ INVESTIGATOR DECISION GATE (≥80%)", "MANDATORY BARRIER: System halts. Stage 2 remains locked until authorized investigator reviews evidence.", ACCENT_GOLD),
        ("↓ EXPLICIT STAGE 2 AUTHORIZATION", "Investigator logs warrant reason and explicitly clicks 'Initiate Real-World Attribution'.", ACCENT_GOLD),
        ("STAGE 2: REAL-WORLD ATTRIBUTION", "Entity resolution engine maps digital indicators to candidate entities across 6 dimensions.", ACCENT_EMERALD),
        ("↓ HUMAN VALIDATION & DOSSIER", "Produces Qualified Attribution Leads; investigator validates, rejects, or requests subpoenas.", ACCENT_EMERALD)
    ]
    for title, desc, col in flow_boxes:
        p = tf_flow.add_paragraph()
        p.text = title
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = col
        p.space_before = Pt(5)

        p2 = tf_flow.add_paragraph()
        p2.text = desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_MUTED

    # Right Column: 6 Key Innovations (Width: 3.6)
    add_card(s2, 8.95, 1.45, 3.6, 5.4, bg=CARD_BG, border=CARD_BORDER)
    tb_inn = s2.shapes.add_textbox(Inches(9.15), Inches(1.6), Inches(3.2), Inches(5.1))
    tf_inn = tb_inn.text_frame
    tf_inn.word_wrap = True
    p = tf_inn.paragraphs[0]
    p.text = "KEY SYSTEM INNOVATIONS"
    p.font.name = "Segoe UI"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    innovations = [
        ("1. Multi-Signal Actor Correlation", "Pairs 5 independent signal dimensions into a single mathematically defensible score."),
        ("2. Explainable Evidence Chains", "Explains exactly why handles link (deterministic PGP match, stylometric cosine 0.91)."),
        ("3. Cytoscape Topology Graph", "Interactive graph rendering digital actor nodes and physical candidate entities."),
        ("4. Comparative Candidate Hypotheses", "Evaluates Primary Lead vs Bulletproof Host vs VPN Relay side-by-side."),
        ("5. Investigation Path Tracing", "Highlights the uninterrupted evidence chain from candidate back to forum handle."),
        ("6. Human-in-the-Loop Attribution", "Sworn sign-off guarantees full compliance with judicial evidentiary standards.")
    ]
    for title, desc in innovations:
        p = tf_inn.add_paragraph()
        p.text = title
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(6)

        p2 = tf_inn.add_paragraph()
        p2.text = desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 3 — TECHNICAL ARCHITECTURE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_bg(s3)
    add_header(s3, "Technical Architecture: 10-Stage Visual Pipeline & Signal Weights")

    # Sub-header text
    tb_sub = s3.shapes.add_textbox(Inches(0.8), Inches(1.25), Inches(11.733), Inches(0.3))
    tf_sub = tb_sub.text_frame
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = "MODULAR END-TO-END WORKFLOW DESIGNED FOR COMPLETE INVESTIGATIVE AUDITABILITY"
    p_sub.font.name = "Segoe UI"
    p_sub.font.size = Pt(9.5)
    p_sub.font.color.rgb = TEXT_MUTED

    # Top Half: 10 Pipeline Stages (2 rows of 5 cards)
    row1_stages = [
        ("1. INGESTION", "Forum posts, chat feeds, PGP keyservers, and crypto ledgers.", ACCENT_CYAN),
        ("2. PREPROCESSING", "Tokenization, text normalization, and indicator extraction.", ACCENT_CYAN),
        ("3. CORRELATION", "Pairwise multi-signal similarity matrix scoring.", ACCENT_CYAN),
        ("4. GRAPH ENGINE", "Cytoscape topology graph mapping relationships.", ACCENT_CYAN),
        ("5. ACTOR CLUSTERING", "Community detection synthesizing Actor Cluster A.", ACCENT_CYAN)
    ]

    card_w = 2.22
    spacing = 2.38
    for i, (name, desc, col) in enumerate(row1_stages):
        pos_x = 0.8 + i * spacing
        add_card(s3, pos_x, 1.6, card_w, 1.8, bg=CARD_BG, border=CARD_BORDER)
        tb_box = s3.shapes.add_textbox(Inches(pos_x + 0.1), Inches(1.7), Inches(card_w - 0.2), Inches(1.6))
        tf_b = tb_box.text_frame
        tf_b.word_wrap = True
        p = tf_b.paragraphs[0]
        p.text = name
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = col

        p2 = tf_b.add_paragraph()
        p2.text = desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = TEXT_MUTED
        p2.space_before = Pt(3)

    row2_stages = [
        ("6. EVIDENCE STRENGTH", "Calculates supporting, conflicting, and unknown gap vectors.", ACCENT_CYAN),
        ("7. DECISION GATE (≥80%)", "Mandatory investigator checkpoint halting automatic execution.", ACCENT_GOLD),
        ("8. ENTITY RESOLUTION", "Stage 2 workspace evaluating 6 real-world dimensions.", ACCENT_EMERALD),
        ("9. CANDIDATE HYPOTHESES", "Side-by-side scoring of Candidates A, B, and C.", ACCENT_EMERALD),
        ("10. HUMAN VALIDATION", "Analyst decisioning & court-ready dossier generation.", ACCENT_EMERALD)
    ]

    for i, (name, desc, col) in enumerate(row2_stages):
        pos_x = 0.8 + i * spacing
        border_col = ACCENT_GOLD if "GATE" in name else CARD_BORDER
        add_card(s3, pos_x, 3.55, card_w, 1.8, bg=CARD_BG, border=border_col)
        tb_box = s3.shapes.add_textbox(Inches(pos_x + 0.1), Inches(3.65), Inches(card_w - 0.2), Inches(1.6))
        tf_b = tb_box.text_frame
        tf_b.word_wrap = True
        p = tf_b.paragraphs[0]
        p.text = name
        p.font.name = "Segoe UI"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = col

        p2 = tf_b.add_paragraph()
        p2.text = desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = TEXT_MUTED
        p2.space_before = Pt(3)

    # Bottom Half: Five Stage 1 Signals & Implemented Prototype Weights (Width: 11.733)
    add_card(s3, 0.8, 5.5, 11.733, 1.45, bg=CARD_BG_ALT, border=CARD_BORDER_ACCENT)
    tb_weights = s3.shapes.add_textbox(Inches(1.0), Inches(5.6), Inches(11.3), Inches(1.25))
    tf_w = tb_weights.text_frame
    tf_w.word_wrap = True
    p = tf_w.paragraphs[0]
    p.text = "STAGE 1 MULTI-SIGNAL CORRELATION WEIGHTS (IMPLEMENTED IN PROTOTYPE ENGINE)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    # 5 Signals displayed horizontally
    signals = [
        ("Username / Alias", "20%", "Morphological stems, suffixes, Levenshtein edit distance"),
        ("Stylometry (NLP)", "25%", "TF-IDF n-grams, punctuation habits (--), sentence length"),
        ("Behavioural Patterns", "20%", "Trading escrow habits, section activity, OPSEC discipline"),
        ("Temporal Activity", "15%", "UTC active hours, peak days, diurnal activity curves"),
        ("Technical / Digital", "20%", "PGP fingerprints, BTC SegWit wallets, reverse proxy IPs")
    ]
    p_sig = tf_w.add_paragraph()
    p_sig.space_before = Pt(4)
    for s_name, s_weight, s_desc in signals:
        run1 = p_sig.add_run()
        run1.text = f"[{s_name}: {s_weight}]  "
        run1.font.bold = True
        run1.font.color.rgb = ACCENT_CYAN
        run1.font.size = Pt(9)

    p_detail = tf_w.add_paragraph()
    p_detail.text = "Mathematical Model:  Aggregate Score = ∑ (Dimension Score_i × Weight_i)  |  Configurable in Investigation Settings"
    p_detail.font.name = "Segoe UI"
    p_detail.font.size = Pt(8.5)
    p_detail.font.color.rgb = TEXT_MUTED
    p_detail.space_before = Pt(3)


    # =========================================================================
    # SLIDE 4 — FEASIBILITY / IMPACT / EVIDENCE MODEL
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_bg(s4)
    add_header(s4, "Evidence Model, Empirical Case Study & Investigation Impact")

    # Column 1: Evidence Formula & Stage 1 Result (Width: 3.7)
    add_card(s4, 0.8, 1.45, 3.7, 5.4, bg=CARD_BG, border=ACCENT_CYAN)
    tb_ev = s4.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(3.3), Inches(5.1))
    tf_ev = tb_ev.text_frame
    tf_ev.word_wrap = True
    p = tf_ev.paragraphs[0]
    p.text = "EVIDENTIARY FORMULA"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    p_eq = tf_ev.add_paragraph()
    p_eq.text = "SUPPORTING EVIDENCE\n+ CONFLICTING EVIDENCE\n+ UNKNOWN / MISSING EVIDENCE\n= EVIDENCE STRENGTH"
    p_eq.font.name = "Segoe UI"
    p_eq.font.size = Pt(9)
    p_eq.font.bold = True
    p_eq.font.color.rgb = TEXT_WHITE
    p_eq.space_before = Pt(4)

    p_div = tf_ev.add_paragraph()
    p_div.text = "STAGE 1 PROTOTYPE RESULTS (CASE INV-2026-0151)"
    p_div.font.name = "Segoe UI"
    p_div.font.size = Pt(10)
    p_div.font.bold = True
    p_div.font.color.rgb = ACCENT_GOLD
    p_div.space_before = Pt(8)

    stage1_metrics = [
        ("Actor Cluster A", "92% Evidence Strength", ACCENT_EMERALD),
        ("Classification", "VERY STRONG EVIDENCE", ACCENT_EMERALD),
        ("Supporting Reasons", "11 Verified Items", TEXT_LIGHT),
        ("Conflicting Reasons", "1 Logged (Access broker vs mirror publisher)", ACCENT_GOLD),
        ("Unknown / Gap Items", "2 Pending (Tor exit IP WHOIS, Mixer hop)", TEXT_MUTED),
        ("Decision Gate Status", "CLEARED FOR REVIEW (92% ≥ 80%)", ACCENT_CYAN)
    ]
    for lbl, val, col in stage1_metrics:
        p = tf_ev.add_paragraph()
        p.text = f"{lbl}: "
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED
        r = p.add_run()
        r.text = val
        r.font.bold = True
        r.font.color.rgb = col
        p.space_before = Pt(3)

    # Column 2: Stage 2 Candidate Hypotheses (Width: 3.7)
    add_card(s4, 4.75, 1.45, 3.7, 5.4, bg=CARD_BG, border=ACCENT_GOLD)
    tb_cands = s4.shapes.add_textbox(Inches(4.95), Inches(1.6), Inches(3.3), Inches(5.1))
    tf_c = tb_cands.text_frame
    tf_c.word_wrap = True
    p = tf_c.paragraphs[0]
    p.text = "STAGE 2 CANDIDATE HYPOTHESES"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    p_warn = tf_c.add_paragraph()
    p_warn.text = "Values represent evidence-strength scores / attribution leads, NOT calibrated probabilities of legal guilt."
    p_warn.font.name = "Segoe UI"
    p_warn.font.size = Pt(8)
    p_warn.font.italic = True
    p_warn.font.color.rgb = TEXT_MUTED
    p_warn.space_before = Pt(3)

    cands = [
        ("Candidate Entity A", "82% Strength", "ATTRIBUTION LEAD", "Meridian Analytics S.R.O. (Subject A. K.)\nLinked via domain registrant, Git commit metadata, and proxy reverse-lookup.", ACCENT_CYAN),
        ("Candidate Entity B", "67% Strength", "SECONDARY HYPOTHESIS", "Vortex Cloud Holdings Inc.\nBulletproof hosting leaseholder; conflicting evidence logged.", ACCENT_GOLD),
        ("Candidate Entity C", "41% Strength", "INSUFFICIENT EVIDENCE", "Solitary VPN Relay Node\nEphemeral exit node traffic; lacks persistent technical link.", ACCENT_RED)
    ]
    for cname, cstr, cstatus, cdesc, ccolor in cands:
        p = tf_c.add_paragraph()
        p.text = f"{cname} — {cstr}"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = ccolor
        p.space_before = Pt(6)

        p2 = tf_c.add_paragraph()
        p2.text = f"Status: {cstatus}\n{cdesc}"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_LIGHT

    # Column 3: Impact on Real-World Investigations (Width: 3.8)
    add_card(s4, 8.7, 1.45, 3.833, 5.4, bg=CARD_BG, border=CARD_BORDER)
    tb_imp = s4.shapes.add_textbox(Inches(8.9), Inches(1.6), Inches(3.4), Inches(5.1))
    tf_i = tb_imp.text_frame
    tf_i.word_wrap = True
    p = tf_i.paragraphs[0]
    p.text = "FORENSIC IMPACT & VALUE"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    impacts = [
        ("Structured Investigation", "Replaces scattered spreadsheets and ad-hoc queries with an end-to-end reproducible case builder."),
        ("Explainable Relationships", "Every link presents verifiable evidence: PGP 0x7E4A8F2C91B4, SegWit wallet bc1qxy2kg..., stylometry Cosine 0.91."),
        ("Eliminates Premature Attribution", "Strict decision gate prevents biased analyst confirmation and unverified real-world accusations."),
        ("Traceable Evidence Chain", "Investigation Path Mode highlights the direct path from candidate entity to forum handle."),
        ("Human Validation & Audit", "Every investigator acceptance, rejection, or subpoena request is permanently logged.")
    ]
    for ititle, idesc in impacts:
        p = tf_i.add_paragraph()
        p.text = ititle.upper()
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(6)

        p2 = tf_i.add_paragraph()
        p2.text = idesc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_MUTED


    # =========================================================================
    # SLIDE 5 — TECHNOLOGY / SECURITY / PRIVACY
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_bg(s5)
    add_header(s5, "Implemented Technology Stack, Security Controls & Privacy Boundaries")

    # 4 Quadrants
    quad_w = 5.7
    quad_h = 2.55

    # Quad 1: Frontend & Visualization
    add_card(s5, 0.8, 1.45, quad_w, quad_h, bg=CARD_BG, border=CARD_BORDER)
    tb_q1 = s5.shapes.add_textbox(Inches(1.0), Inches(1.55), Inches(quad_w - 0.4), Inches(quad_h - 0.2))
    tf_q1 = tb_q1.text_frame
    tf_q1.word_wrap = True
    p = tf_q1.paragraphs[0]
    p.text = "FRONTEND & GRAPH ENGINE (IMPLEMENTED)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    pts_q1 = [
        "React 19 & TypeScript: Component-driven, strictly typed investigation workstation",
        "Cytoscape.js: Force-directed topology graph with dynamic layout switching (CoSE, concentric)",
        "Investigation Path Tracer: Highlighting sub-graphs from candidate entity to digital handles",
        "Tailwind CSS: Restrained dark-mode interface optimized for high-contrast courtroom projection"
    ]
    for pt in pts_q1:
        p = tf_q1.add_paragraph()
        p.text = f"• {pt}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Quad 2: Analytics & Correlation Engine
    add_card(s5, 6.833, 1.45, quad_w, quad_h, bg=CARD_BG, border=CARD_BORDER)
    tb_q2 = s5.shapes.add_textbox(Inches(7.033), Inches(1.55), Inches(quad_w - 0.4), Inches(quad_h - 0.2))
    tf_q2 = tb_q2.text_frame
    tf_q2.word_wrap = True
    p = tf_q2.paragraphs[0]
    p.text = "ANALYTICS & INVESTIGATION ENGINES"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    pts_q2 = [
        "Stylometric NLP: Character/word n-grams, vocabulary richness (TTR), cosine similarity",
        "Cryptographic Chainer: Deterministic PGP key ID and SHA-1 fingerprint matching",
        "Blockchain UTXO Correlation: Native SegWit co-spend clustering & Wasabi CoinJoin tracking",
        "Entity Resolution Engine: Multi-dimensional evidence scoring across 6 intelligence dimensions"
    ]
    for pt in pts_q2:
        p = tf_q2.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Quad 3: Security & Operational Boundaries
    add_card(s5, 0.8, 4.25, quad_w, quad_h, bg=CARD_BG, border=CARD_BORDER)
    tb_q3 = s5.shapes.add_textbox(Inches(1.0), Inches(4.35), Inches(quad_w - 0.4), Inches(quad_h - 0.2))
    tf_q3 = tb_q3.text_frame
    tf_q3.word_wrap = True
    p = tf_q3.paragraphs[0]
    p.text = "SECURITY CONTROLS & BOUNDARIES"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    pts_q3 = [
        "Passive Intelligence Workflow: Operates strictly on ingested data; zero active exploitation",
        "No Unauthorized Access: No intrusive port attacks or credential stuffing techniques",
        "Synthetic Case Validation: Demonstrated safely using realistic forensic datasets (INV-2026-0151)",
        "Audit Logging: Every correlation run, threshold change, and candidate decision is logged"
    ]
    for pt in pts_q3:
        p = tf_q3.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)

    # Quad 4: Privacy & Legal Admissibility
    add_card(s5, 6.833, 4.25, quad_w, quad_h, bg=CARD_BG, border=CARD_BORDER)
    tb_q4 = s5.shapes.add_textbox(Inches(7.033), Inches(4.35), Inches(quad_w - 0.4), Inches(quad_h - 0.2))
    tf_q4 = tb_q4.text_frame
    tf_q4.word_wrap = True
    p = tf_q4.paragraphs[0]
    p.text = "PRIVACY & LEGAL ADMISSIBILITY"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    pts_q4 = [
        "Evidence Provenance: Unbroken chain of custody tracking origin, timestamps, and confidence",
        "Investigator Accountability: Only certified analysts (e.g. INV-017) can sign attribution leads",
        "Restricted Judicial Scope: Matches entities solely within authorized warrant boundaries",
        "No PII Harvesting: Avoids mass surveillance scraping; targets active cyber extortion entities"
    ]
    for pt in pts_q4:
        p = tf_q4.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_before = Pt(3)


    # =========================================================================
    # SLIDE 6 — CURRENT STATUS / ROADMAP / CONCLUSION
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_bg(s6)
    add_header(s6, "Implementation Status, Future Roadmap & Conclusion")

    # Column 1: Current Working Prototype (Width: 4.5)
    add_card(s6, 0.8, 1.45, 4.5, 4.4, bg=CARD_BG, border=ACCENT_EMERALD)
    tb_curr = s6.shapes.add_textbox(Inches(1.0), Inches(1.6), Inches(4.1), Inches(4.1))
    tf_curr = tb_curr.text_frame
    tf_curr.word_wrap = True
    p = tf_curr.paragraphs[0]
    p.text = "CURRENT PROTOTYPE (IMPLEMENTED & WORKING)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_EMERALD

    curr_features = [
        "Case Builder Workstation with inline digital handle ingestion",
        "Multi-Signal Correlation Engine (Stylometry, PGP, Crypto, Diurnal)",
        "Actor Clustering & 92% Evidence Strength Calculation",
        "Cytoscape Evidence Topology Graph with Node Inspector",
        "Investigation Path Tracing (Candidate A → Indicator → Actor)",
        "Stage 2 Attribution Workspace with Critical Decision Gate",
        "Comparative Candidate Hypotheses (Candidate A vs B vs C)",
        "Human Validation Workflow (Accept / Reject / Subpoena)",
        "Comprehensive Case Timeline & Admissible Dossier Reports"
    ]
    for feat in curr_features:
        p = tf_curr.add_paragraph()
        p.text = f"✓  {feat}"
        p.font.name = "Segoe UI"
        p.font.size = Pt(8.5)
        p.font.color.rgb = TEXT_LIGHT
        p.space_before = Pt(3)

    # Column 2: Future Roadmap (Width: 3.4)
    add_card(s6, 5.5, 1.45, 3.4, 4.4, bg=CARD_BG, border=CARD_BORDER)
    tb_fut = s6.shapes.add_textbox(Inches(5.7), Inches(1.6), Inches(3.0), Inches(4.1))
    tf_fut = tb_fut.text_frame
    tf_fut.word_wrap = True
    p = tf_fut.paragraphs[0]
    p.text = "FUTURE WORK (PHASED ROADMAP)"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_CYAN

    future_phases = [
        ("PHASE 1: EXPANDED INTELLIGENCE", "Asynchronous daemon collectors for live darknet forum feeds, paste sites, and encrypted chat channels."),
        ("PHASE 2: ADVANCED BLOCKCHAIN", "Automated cross-chain swap tracing, Wasabi CoinJoin peel analysis, and Monero decoying heuristics."),
        ("PHASE 3: AGENCY FEDERATION", "Multi-agency threat intelligence federation with cryptographic zero-knowledge proof verification.")
    ]
    for ph_title, ph_desc in future_phases:
        p = tf_fut.add_paragraph()
        p.text = ph_title
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GOLD
        p.space_before = Pt(6)

        p2 = tf_fut.add_paragraph()
        p2.text = ph_desc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_MUTED

    # Column 3: Final Hackathon Takeaway (Width: 3.4)
    add_card(s6, 9.1, 1.45, 3.433, 4.4, bg=CARD_BG_ALT, border=ACCENT_GOLD)
    tb_sum = s6.shapes.add_textbox(Inches(9.3), Inches(1.6), Inches(3.0), Inches(4.1))
    tf_sum = tb_sum.text_frame
    tf_sum.word_wrap = True
    p = tf_sum.paragraphs[0]
    p.text = "SUMMARY & VERDICT"
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    summary_pts = [
        ("National Readiness", "Directly addresses SIH26151 with a working, production-grade cybersecurity solution."),
        ("Zero Legal Ambiguity", "Separates mathematical correlation from sworn real-world attribution."),
        ("Explainable & Auditable", "Eliminates black-box ML risks; every score is forensic evidence backed.")
    ]
    for stitle, sdesc in summary_pts:
        p = tf_sum.add_paragraph()
        p.text = stitle
        p.font.name = "Segoe UI"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        p.space_before = Pt(6)

        p2 = tf_sum.add_paragraph()
        p2.text = sdesc
        p2.font.name = "Segoe UI"
        p2.font.size = Pt(8)
        p2.font.color.rgb = TEXT_MUTED

    # Bottom Full-Width Mandate Banner across Slide 6
    add_card(s6, 0.8, 6.0, 11.733, 0.9, bg=RGBColor(12, 20, 36), border=ACCENT_GOLD)
    tb_bot = s6.shapes.add_textbox(Inches(1.0), Inches(6.05), Inches(11.3), Inches(0.8))
    tf_b = tb_bot.text_frame
    p_b1 = tf_b.paragraphs[0]
    p_b1.alignment = PP_ALIGN.CENTER
    p_b1.text = "AI FINDS PATTERNS. GRAPH CONNECTS EVIDENCE. INVESTIGATORS VALIDATE ATTRIBUTION."
    p_b1.font.name = "Segoe UI"
    p_b1.font.size = Pt(12)
    p_b1.font.bold = True
    p_b1.font.color.rgb = ACCENT_GOLD

    p_b2 = tf_b.add_paragraph()
    p_b2.alignment = PP_ALIGN.CENTER
    p_b2.text = "Correlation ≠ Identification   |   Attribution Lead ≠ Confirmed Identity"
    p_b2.font.name = "Segoe UI"
    p_b2.font.size = Pt(10)
    p_b2.font.color.rgb = TEXT_LIGHT

    # Save
    out_file = r"C:\Users\Teju\.gemini\antigravity\scratch\sih-darkweb-attribution\SIH26151-Argus-Final-Presentation.pptx"
    prs.save(out_file)
    print(f"Final presentation generated successfully at: {out_file}")

if __name__ == "__main__":
    build_presentation()
