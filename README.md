# Dark Web Threat Actor De-anonymization and Real-World Attribution
### Smart India Hackathon (SIH 2026) — Problem Statement: SIH26151
**Investigation ID**: `INV-2026-0151` &bull; **Case Officer**: `Investigator INV-017`

An investigator-centric digital forensics and threat intelligence platform designed to analyze fragmented dark web identities, calculate evidentiary correlation confidence, and enable authorized human investigators to evaluate real-world attribution leads.

---

## 🏛️ End-to-End Investigation Architecture

```
   [ STAGE 1: DIGITAL ACTOR CORRELATION ]
     • Username / Alias Morphology & N-grams
     • Stylometry & Textual Habit Analysis (Sentence length, TTR, Punctuation)
     • Behavioural Profiling & OPSEC Discipline
     • Temporal Analysis (Active UTC hours, Diurnal curve)
     • Technical Indicators (PGP, BTC SegWit, XMR subaddresses, Reverse-Proxy IP)
                    ↓
   [ ACTOR CLUSTERING & EVIDENCE CONFIDENCE ]
     • Actor Cluster A (92% Very Strong Evidence)
     • Actor Cluster B (84% Strong Evidence)
     • Actor Cluster C (67% Weak / Inconclusive)
                    ↓
  ════════════════════════════════════════════════════════════════
  🔒 STAGE 2 EVIDENCE GATE (Human-in-the-Loop Authorization)
  ════════════════════════════════════════════════════════════════
     • Never automatically moves to Stage 2
     • Mandatory threshold verification (Default: ≥ 80%)
     • Explicit Investigator Authorization Modal
                    ↓ (Authorized Clusters Only)
   [ STAGE 2: REAL-WORLD ENTITY ATTRIBUTION ]
     • Module 1: Digital Actor Profile Card
     • Module 2: Known Digital Indicators Inventory (IND-0041, IND-0022, etc.)
     • Module 3: Entity Resolution Engine (6 Consistency Dimensions)
     • Module 4: Candidate Entity Discovery Table (Candidates A, B, C)
                    ↓
   [ 8 INNOVATIVE INVESTIGATIVE FEATURES ]
     1. Evidence Chain Explorer (Trace: Actor → Indicator → Relationship → Entity)
     2. Support / Conflict / Unknown Matrix (Prevents treating missing data as negative)
     3. Attribution Confidence Evolution (Step-by-step strength visualization)
     4. What Evidence is Still Missing? (Lawful evidence gap directives)
     5. Multi-Hypothesis Attribution Board (Retains multiple candidate hypotheses)
     6. Why Did This Entity Appear? (Explainable rationale breakdown)
     7. What Would Change This Assessment? (Strengthening vs. weakening factors)
     8. Evidence Provenance & Trace Back to Source
                    ↓
   [ HUMAN-IN-THE-LOOP VALIDATION ]
     • Per-relationship Accept / Reject / Need More Evidence with mandatory rationale
     • Final Attribution Lead Decision
     • Immutable Attribution Decision Audit Log
                    ↓
   [ FINAL OUTPUT: ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED ]
```

---

## ⚖️ Essential System Principles

1. **Correlation ≠ Identification**:
   Strong correlation between dark web handles indicates they are likely operated by the same digital threat actor. It does **not** prove legal real-world identity.
2. **Attribution Lead ≠ Confirmed Identity**:
   Stage 2 entity resolution yields an evidence-backed lead for mutual legal assistance (MLAT) and court subpoenas, not an automated conviction.
3. **Missing Evidence is Not Negative Evidence**:
   When an indicator is missing, it is explicitly cataloged as `UNKNOWN`, `NOT AVAILABLE`, or `INSUFFICIENT DATA`. It is **never** penalized as negative evidence.
4. **Iterative Investigation Loop**:
   If Stage 2 reveals insufficient entity-level evidence, investigators can click `[ RETURN TO STAGE 1 ]` to refine digital actor correlation without losing Stage 2 findings.
5. **No Black-Box Scores**:
   Every score must be broken down by contributing signal weights, accompanied by explainable reasoning (`✓ WHY Connected`, `⚠ Conflicting Evidence`, `? Unknown Data`, and `Evidence Gaps`).

---

## 🔬 Evidence Confidence Bands

| Confidence Band | Range | Interpretation & Stage 2 Status |
| :--- | :--- | :--- |
| **VERY STRONG EVIDENCE** | 90–100% | Immediate Stage 2 Candidate (Investigator review permitted) |
| **STRONG EVIDENCE** | 80–89% | Meets default threshold (Investigator review permitted) |
| **MODERATE EVIDENCE** | 70–79% | Below threshold; requires secondary corroboration |
| **WEAK / INCONCLUSIVE** | 50–69% | Not eligible for Stage 2; active monitoring required |
| **INSUFFICIENT EVIDENCE** | Below 50% | Strictly rejected; isolated or false-positive collision |

> *"Confidence bands represent the strength of available evidence and are not definitive identity determinations."*

---

## 🧪 Demonstration Dataset (Synthetic & Controlled)

In strict accordance with prototype boundaries, all identities and indicators are 100% synthetic:
- **`@shadow_x17`** (Forum-X / Dread, initial access broker, PGP `0x7E4A8F2C91B4`, BTC `bc1qxy...`)
- **`@x_shadow`** (Market-Y / XSS, Telegram access broker, PGP `0x7E4A8F2C91B4`, IP `185.220.101.45`)
- **`@darkx17`** (Chat-Z / BreachForums, operator of `darkx17-vault.is`, PGP `0x7E4A8F2C91B4`)
  - **Actor Cluster A**: **92% Correlation Strength** (VERY STRONG &rarr; Eligible for Stage 2)
  - **Candidate Entity A**: **82% Attribution Evidence Strength** (Subject A. K. / Meridian Analytics Front)
  - **Candidate Entity B**: **67% Attribution Evidence Strength** (Vortex Cloud Hosting Ltd.)
  - **Candidate Entity C**: **41% Attribution Evidence Strength** (Autonomous Proxy Operator #88)
- **`@night_market`** & **`@ghost_404`** (CryptBB & Bohemia clone carding storefronts)
  - **Actor Cluster B**: **84% Correlation Strength** (STRONG &rarr; Eligible for Stage 2)
- **`@silentnode`** (Ramp Market, standalone cryptographic researcher, Ed25519 key)
  - **Actor Cluster C**: **67% Correlation Strength** (WEAK / INCONCLUSIVE &rarr; Stage 2 Blocked)
- **Actor Cluster D**: **43% Correlation Strength** (INSUFFICIENT EVIDENCE &rarr; Stage 2 Blocked)

---

## 📑 13-Section Formal Investigation Dossier

The built-in report generator compiles an official 13-section report:
1. Section 1 — Digital Identities
2. Section 2 — Actor Correlation
3. Section 3 — Actor Clusters
4. Section 4 — Investigator Validation (Stage 1)
5. Section 5 — Stage 2 Initiation
6. Section 6 — Digital Indicators Inventory
7. Section 7 — Entity Resolution (Six Dimensions)
8. Section 8 — Candidate Entities
9. Section 9 — Supporting / Conflicting / Unknown Evidence
10. Section 10 — Evidence Gaps & Directives
11. Section 11 — Attribution Evidence Strength
12. Section 12 — Investigator Decisions
13. Section 13 — Final Attribution Lead (`ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED`)

---

## 🛠️ Tech Stack & Key Modules

- **Frontend Core**: React 19, TypeScript, Vite 8
- **Styling**: Tailwind CSS v4 (Cybersecurity Analyst dark theme: Slate-950, Cyan & Emerald accents, minimal red)
- **Graph Visualizer**: **Cytoscape.js** (Cross-stage grouping: Digital Actor Evidence vs. Real-World Entity Evidence with COSE, Concentric, Circle, and Breadthfirst layouts)
- **Icons**: Lucide React
- **Architecture**: Modular service-oriented design ready for seamless connection to FastAPI / Python backend intelligence engines (`actorService`, `indicatorService`, `entityResolutionService`, `evidenceService`, `attributionService`, `timelineService`, `reportService`).

---

## 🚀 Running the Prototype Locally

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed.

### 2. Installation
```powershell
cd C:\Users\Teju\.gemini\antigravity\scratch\sih-darkweb-attribution
npm install
```

### 3. Launch Development Server
```powershell
npm run dev
```
Open your browser at `http://localhost:5173` (or the port displayed in your terminal).

### 4. Production Build
```powershell
npm run build
npm run preview
```
