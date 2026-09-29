# SPECTRA — Threat Actor Attribution Platform

### Smart India Hackathon (SIH 2026) | Problem Statement: SIH26151
**Theme**: Cybersecurity & Law Enforcement Digital Forensics  
**Developed by**: Team SPECTRA  
**Case Reference**: `CASE-2026-001 // Operation DarkEcho` &bull; **Lead Investigator**: `Senior Investigator INV-017`

---

## 🛡️ Executive Overview

**SPECTRA** is an enterprise-grade digital forensics and threat actor attribution platform engineered for cybercrime investigators, national intelligence agencies, and incident response teams. The platform bridges the critical evidentiary gap between fragmented anonymous dark web personas and verified real-world entity candidates.

Unlike conventional black-box analytics tools, SPECTRA implements a **two-stage investigative methodology** bounded by strict statutory guidelines, negative hypothesis challenge engines, deduplicated chain-of-custody tracking, and human-in-the-loop decision gates.

---

## 🏛️ End-to-End Investigation Architecture

```
                                [ DIGITAL EVIDENCE INGESTION ]
          ┌───────────────────────────────────┼───────────────────────────────────┐
          ↓                                   ↓                                   ↓
    Forum-X (Dread)                   Market-Y (XSS Forum)              Chat-Z (BreachForums)
   Leak Publisher: @shadow_x17       Access Broker: @x_shadow          Gateway Host: @darkx17
          └───────────────────────────────────┬───────────────────────────────────┘
                                              ↓
                        [ STAGE 1: MULTI-SIGNAL CORRELATION ]
            • Username / Alias Lexical Morphology (Levenshtein & N-gram roots)
            • Stylometric Habit Analysis (Jaccard punctuation, double-hyphen habit)
            • Diurnal Temporal Synchronization (UTC+03:00 diurnal window, r = 0.88)
            • Cryptographic Fingerprinting (RSA-4096 PGP key 0x7E4A8F2C91B4)
            • Infrastructure Intersection (Shared reverse-proxy 185.220.101.45)
                                              ↓
                   [ DIGITAL ACTOR CLUSTER: DarkWolf Cluster (TA-001) ]
                                 Stage 1 Confidence: 91%
                                              ↓
    ═════════════════════════════════════════════════════════════════════════════════
    🔒 CRITICAL DECISION GATE (Human-in-the-Loop Statutory Authorization)
    ═════════════════════════════════════════════════════════════════════════════════
            • Mandatory statutory correlation threshold verification (≥ 80%)
            • Sworn officer authorization required with mandatory written justification
            • Action recorded to immutable cryptographic audit log
                                              ↓ (Authorized Cases Only)
                 [ STAGE 2: REAL-WORLD ENTITY RESOLUTION & ATTRIBUTION ]
            • Multi-Hop Identity-Link Discovery & Traversal
            • Cross-Registry Correlation (ICANN WHOIS, Corporate Registrars, BGP Routing)
            • Lineage Deduplication (11 derived reporting feeds → 6 independent roots)
            • Negative Hypothesis Testing Engine (10 alternative explanations evaluated)
            • High-Severity Temporal Conflict Safeguard (Bengaluru 14:32 vs Frankfurt 14:33)
                                              ↓
                   [ REAL-WORLD ENTITY CANDIDATES RESOLUTION MATRIX ]
            ├── Candidate A: Arun Mehta (FICTIONAL DEMO ENTITY) [74% — PRIMARY ATTRIBUTION LEAD]
            ├── Candidate B: Rohan Verma (FICTIONAL DEMO ENTITY) [58% — SINGLE-SOURCE COLLATERAL]
            └── Candidate C: Vector Systems Ltd. (FICTIONAL DEMO ORG) [62% — CORPORATE SHELL]
                                              ↓
                    [ FINAL HUMAN-IN-THE-LOOP INVESTIGATOR DECISION ]
            • Per-hop provenance validation & evidence status tracking
            • Final Decision: VALIDATED INVESTIGATIVE LEAD (Subject to lawful subpoena)
            • Comprehensive 16-Section Legal Investigation Dossier Generation
            • Continuous Telemetry Simulation ("Watch This Actor" dynamic re-scoring)
```

---

## ⚖️ Core Evidentiary Principles & Safeguards

1. **Correlation ≠ Identification**:
   Strong correlation between dark web personas indicates unified operational control. It does **not** assert the physical identity of an individual.
2. **Attribution Lead ≠ Confirmed Guilt**:
   Stage 2 outputs an *evidence-backed real-world entity candidate* for formal subpoena and mutual legal assistance treaty (MLAT) requests, strictly preventing automated conviction.
3. **Negative Evidence Rigor**:
   Missing indicators are cataloged as `UNKNOWN` or `INSUFFICIENT DATA` and are never treated as negative proof.
4. **Temporal Impossibility Safeguard**:
   When events occur across disparate geographic regions within impossible human travel windows (e.g. Bengaluru, India at 14:32 UTC and Frankfurt, Germany at 14:33 UTC — 65 seconds apart), the platform flags a critical anomaly, proving the actor used a remote proxy jump or automated cron daemon.
5. **Deduplicated Lineage Tracking**:
   The engine traces intelligence feeds back to primary root sources, preventing circular reporting from artificially inflating attribution scores.

---

## 🔬 Evidence Confidence Standards

| Tier | Range | Analytical Interpretation | Statutory Action |
| :--- | :---: | :--- | :--- |
| **VERY STRONG EVIDENCE** | 90–100% | Hard cryptographic & multi-vector overlap | Eligible for Stage 2 Authorization Review |
| **STRONG EVIDENCE** | 80–89% | Consistent longitudinal signals across platforms | Meets statutory threshold for review |
| **MODERATE EVIDENCE** | 70–79% | Probable behavioral & temporal alignment | Requires secondary independent corroboration |
| **WEAK / INCONCLUSIVE** | 50–69% | Peripheral connection; potential shared host | Retained in passive monitoring; Stage 2 blocked |
| **INSUFFICIENT EVIDENCE** | < 50% | Isolated indicator or false-positive collision | Rejected from attribution analysis |

---

## ✨ Key Features & Platform Capabilities

### 1. Dual-Mode Cytoscape.js Relationship & Knowledge Graph
- **Stage 1 (Persona Correlation)**: Explores pairwise and cluster connections between forum aliases with dynamic focal highlighting.
- **Stage 2 (Real-World Knowledge Graph)**: Maps directed links across personas, PGP anchors, clear-web domains, proxy nodes, corporate entities, and candidate persons.
- **"WHY THIS CANDIDATE?" Button**: Automatically highlights the 5-hop critical path to Candidate A (`@shadow_x17 → PGP Key → darkx17-vault.is → Vector Systems Ltd. → Arun Mehta`) while subduing unrelated peripheral nodes.

### 2. Edge Provenance Inspector
- Click any knowledge graph edge to reveal chain-of-custody metadata, source credibility ratings (**Grade A–E**), verification status, observed timestamps, and primary source citations.

### 3. Attribution Challenge Engine (Negative Hypothesis Testing)
- Rigorously tests 10 alternative explanations (Credential Stuffing / Stolen Key, Shared Team Multi-Operator Setup, False Flag / Frame-up, Cloud Jump-Host Collateral) with evidence for, evidence against, and rebuttal assessments.

### 4. Continuous Monitoring & Live Telemetry Simulation
- The "Watch This Actor" module enables ongoing telemetry tracking with live simulation capabilities, showing how new data points (e.g., German BKA MLAT response, secondary ISP logs) dynamically adjust attribution confidence.

### 5. Official 16-Section Legal Investigation Dossier
- Generates a comprehensive, court-admissible forensic report complete with executive briefings, chain-of-custody audit logs, candidate matrices, and investigator signature blocks.

### 6. Developer API & Specifications
- Complete **OpenAPI 3.1** specification (`api/openapi.yaml`) and **Postman Collection** (`api/postman/SPECTRA-API.postman_collection.json`) covering authentication, case management, digital identities, correlation, attribution, and reporting.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Graph Visualization**: Cytoscape.js (Directed knowledge graph with custom layout and node styling)
- **Styling & Design System**: Tailwind CSS v4 (Cybersecurity dark charcoal `#0D0F12`, border `#1E2535`, amber/orange accents `#EA580C`)
- **Typography**: JetBrains Mono, Inter, IBM Plex Sans
- **Icons**: Lucide React
- **Data Visualization**: Recharts

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tejasreeguntipalli1-tech/SIH26151-Threat-Actor-Attribution.git
   cd SIH26151-Threat-Actor-Attribution
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🧪 Synthetic Lab Demonstration Data

All dark web identities, domain mirrors, IP addresses, corporate records, and person names in this repository are **100% synthetic demonstration data** created strictly for evaluating algorithmic entity resolution within the Smart India Hackathon scope:
- **Correlated Cluster**: `DarkWolf Cluster (TA-001)`
- **Candidate A**: `Arun Mehta (FICTIONAL DEMO ENTITY)` — 74% Attribution Lead
- **Candidate B**: `Rohan Verma (FICTIONAL DEMO ENTITY)` — 58% Single-Source Lead
- **Candidate C**: `Vector Systems Ltd. (FICTIONAL DEMO ORGANIZATION)` — 62% Corporate Umbrella

---

## 📄 License & Attribution

This project is developed for the **Smart India Hackathon (SIH 2026)** under Problem Statement **SIH26151**.  
Developed by **Team SPECTRA**. All rights reserved.
