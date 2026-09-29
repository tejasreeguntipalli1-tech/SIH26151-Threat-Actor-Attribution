import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  Fingerprint,
  Globe,
  KeyRound,
  Link2,
  MapPin,
  Network,
  Search,
  Shield,
  UserRound,
  Wallet,
} from 'lucide-react';

type EvidenceType =
  | 'IP'
  | 'DOMAIN'
  | 'ALIAS'
  | 'PGP'
  | 'WALLET'
  | 'TIMESTAMP';

interface Evidence {
  id: string;
  type: EvidenceType;
  value: string;
  source: string;
  confidence: number;
  description: string;
}

const evidence: Evidence[] = [
  {
    id: 'ip-01',
    type: 'IP',
    value: '185.XX.XX.42',
    source: 'Firewall / Web Server Logs',
    confidence: 94,
    description:
      'Observed source address associated with the simulated attack event.',
  },
  {
    id: 'domain-01',
    type: 'DOMAIN',
    value: 'shadow-node.example',
    source: 'DNS / Certificate Intelligence',
    confidence: 87,
    description:
      'Infrastructure relationship discovered during evidence enrichment.',
  },
  {
    id: 'alias-01',
    type: 'ALIAS',
    value: 'NightWolf',
    source: 'Authorized Threat Intelligence',
    confidence: 82,
    description:
      'Alias observed across related authorized intelligence records.',
  },
  {
    id: 'pgp-01',
    type: 'PGP',
    value: 'PGP-7F3A-XXXX',
    source: 'Public Key Intelligence',
    confidence: 91,
    description:
      'PGP fingerprint associated with the correlated digital persona.',
  },
  {
    id: 'wallet-01',
    type: 'WALLET',
    value: 'WALLET-83A1-XXXX',
    source: 'Blockchain Intelligence',
    confidence: 76,
    description:
      'Public blockchain relationship associated with the persona.',
  },
  {
    id: 'time-01',
    type: 'TIMESTAMP',
    value: '21:43:18 UTC',
    source: 'Security Telemetry',
    confidence: 98,
    description:
      'Activity timestamp used for temporal correlation.',
  },
];

const iconMap = {
  IP: Network,
  DOMAIN: Globe,
  ALIAS: UserRound,
  PGP: KeyRound,
  WALLET: Wallet,
  TIMESTAMP: Clock3,
};

export default function Stage2() {
  /*
    Stage flow:

    0 = Ready
    1 = Digital Evidence
    2 = Actor DNA
    3 = Evidence Enrichment
    4 = Cross-Persona Correlation
    5 = Identity Resolution
    6 = Attribution Lead
  */

  const [activeStage, setActiveStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedEvidence, setSelectedEvidence] =
    useState<Evidence>(evidence[0]);

  /*
    Average value is only a DEMO correlation indicator.
    It should be replaced by your actual scoring engine later.
  */
  const averageConfidence = useMemo(() => {
    return Math.round(
      evidence.reduce((sum, item) => sum + item.confidence, 0) /
        evidence.length
    );
  }, []);

  /*
    RUN CORRELATION
    Sequentially activates every investigation stage.
  */
  const runAnalysis = () => {
    if (running) return;

    setRunning(true);
    setActiveStage(1);
  };

  /*
    Main stage progression.
  */
  useEffect(() => {
    if (!running) return;

    if (activeStage >= 6) {
      setRunning(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveStage((current) => current + 1);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [running, activeStage]);

  /*
    During Stage 1, cycle through evidence items.
  */
  useEffect(() => {
    if (!running || activeStage !== 1) return;

    let index = 0;

    setSelectedEvidence(evidence[0]);

    const timer = window.setInterval(() => {
      index += 1;

      if (index < evidence.length) {
        setSelectedEvidence(evidence[index]);
      } else {
        window.clearInterval(timer);
      }
    }, 350);

    return () => window.clearInterval(timer);
  }, [running, activeStage]);

  return (
    <div className="min-h-screen bg-[#07111f] text-white p-5 md:p-8 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <header className="mb-7">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-300/30 flex items-center justify-center">
                  <Fingerprint className="w-6 h-6 text-cyan-300" />
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.35em] text-cyan-400 font-mono">
                    SHADOWTRACE / STAGE 02
                  </p>

                  <h1 className="text-2xl md:text-3xl font-semibold">
                    Digital Evidence → Identity Resolution
                  </h1>
                </div>
              </div>

              <p className="text-sm text-slate-400 max-w-4xl leading-6">
                Correlate authorized digital evidence across infrastructure,
                identity, behavioral and temporal signals to generate an
                evidence-backed attribution lead.
              </p>
            </div>

            {/* RUN BUTTON */}
            <button
              onClick={runAnalysis}
              disabled={running}
              className={`group relative overflow-hidden px-7 py-4 rounded-xl font-semibold transition-all duration-500 shrink-0 ${
                running
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-300/40'
                  : activeStage >= 6
                    ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-300/40'
                    : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
              }`}
            >
              {running && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[scan_1.2s_linear_infinite]" />
              )}

              <span className="relative flex items-center gap-2">
                <Activity className="w-4 h-4" />

                {running
                  ? 'CORRELATION RUNNING...'
                  : activeStage >= 6
                    ? 'RUN AGAIN'
                    : 'RUN CORRELATION'}
              </span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* STATUS CARDS */}
        {/* ========================================================= */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          <StatCard
            icon={<Database className="w-4 h-4" />}
            label="Evidence Items"
            value={evidence.length.toString()}
            active={activeStage >= 1}
          />

          <StatCard
            icon={<Link2 className="w-4 h-4" />}
            label="Correlated Signals"
            value={activeStage >= 4 ? '12' : '0'}
            active={activeStage >= 4}
          />

          <StatCard
            icon={<Activity className="w-4 h-4" />}
            label="Actor Correlation"
            value={activeStage >= 4 ? `${averageConfidence}%` : '--'}
            active={activeStage >= 4}
          />

          <StatCard
            icon={<Shield className="w-4 h-4" />}
            label="Investigation Status"
            value={
              running
                ? 'RUNNING'
                : activeStage >= 6
                  ? 'COMPLETE'
                  : 'READY'
            }
            active={activeStage >= 6}
          />
        </div>

        {/* ========================================================= */}
        {/* MAIN INVESTIGATION PIPELINE */}
        {/* ========================================================= */}

        <div className="relative">

          {/* DESKTOP FLOW ARROW 1 */}
          <FlowArrow
            position="left"
            active={activeStage >= 2}
            color="cyan"
          />

          {/* DESKTOP FLOW ARROW 2 */}
          <FlowArrow
            position="right"
            active={activeStage >= 3}
            color="purple"
          />

          <div className="grid lg:grid-cols-[1fr_1.15fr_1fr] gap-7 xl:gap-12 items-stretch">

            {/* ===================================================== */}
            {/* LEFT: DIGITAL EVIDENCE */}
            {/* ===================================================== */}

            <section
              className={`rounded-2xl border overflow-hidden transition-all duration-700 ${
                activeStage >= 1
                  ? 'border-cyan-300/40 bg-slate-900/80 shadow-[0_0_35px_rgba(34,211,238,0.08)]'
                  : 'border-slate-700/70 bg-slate-900/60'
              }`}
            >
              <SectionHeader
                icon={<Search className="w-4 h-4" />}
                title="1. DIGITAL EVIDENCE"
                subtitle="Observed / authorized telemetry"
                active={activeStage >= 1}
              />

              <div className="p-4 space-y-3">
                {evidence.map((item, index) => {
                  const Icon = iconMap[item.type];

                  const selected =
                    selectedEvidence.id === item.id;

                  const activelyProcessing =
                    running &&
                    activeStage === 1 &&
                    selected;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedEvidence(item)}
                      className={`relative w-full text-left rounded-xl p-3 border transition-all duration-500 overflow-hidden ${
                        selected
                          ? 'border-cyan-300/70 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.12)]'
                          : 'border-slate-700 bg-slate-950/40 hover:border-slate-500'
                      } ${
                        activelyProcessing
                          ? 'scale-[1.02] shadow-[0_0_30px_rgba(34,211,238,0.25)]'
                          : ''
                      }`}
                    >
                      {activelyProcessing && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent animate-[scan_0.8s_linear_infinite]" />
                      )}

                      <div className="relative flex items-start gap-3">

                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                            selected
                              ? 'bg-cyan-300/15 text-cyan-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex justify-between gap-3">
                            <span className="text-[10px] font-mono text-cyan-400">
                              {item.type}
                            </span>

                            <span className="text-[10px] text-slate-400">
                              {item.confidence}%
                            </span>
                          </div>

                          <p className="text-sm font-semibold text-white truncate mt-1">
                            {item.value}
                          </p>

                          <p className="text-[11px] text-slate-500 mt-1">
                            {item.source}
                          </p>
                        </div>

                        {activeStage >= 2 && selected && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-300 shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Evidence footer */}
              <div className="px-5 pb-5">
                <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">
                  <p className="text-[10px] text-slate-500 font-mono tracking-wider">
                    COLLECTION STATUS
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeStage >= 1
                          ? 'bg-cyan-300 animate-pulse'
                          : 'bg-slate-600'
                      }`}
                    />

                    <span className="text-xs text-slate-300">
                      {activeStage >= 1
                        ? 'Evidence available for analysis'
                        : 'Awaiting evidence'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================== */}
            {/* CENTER: ACTOR DNA */}
            {/* ===================================================== */}

            <section
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-700 ${
                activeStage >= 2
                  ? 'border-cyan-300/70 bg-cyan-400/[0.06] shadow-[0_0_55px_rgba(34,211,238,0.18)] scale-[1.01]'
                  : 'border-slate-700/70 bg-slate-900/70'
              }`}
            >

              {/* Small active indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activeStage >= 2
                      ? 'bg-cyan-300 animate-pulse'
                      : 'bg-slate-700'
                  }`}
                />

                <span className="text-[9px] font-mono text-slate-500">
                  {activeStage >= 2 ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>

              <div className="text-center mb-5">
                <p className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono">
                  CORRELATION ENGINE
                </p>

                <h2 className="text-xl font-semibold mt-2">
                  Actor DNA Construction
                </h2>

                <p className="text-xs text-slate-500 mt-2">
                  Multiple independent signals are evaluated together.
                </p>
              </div>

              {/* ACTOR DNA HUB */}
              <div className="flex justify-center mb-6">

                <div
                  className={`relative w-32 h-32 rounded-full flex items-center justify-center border transition-all duration-700 ${
                    activeStage >= 2
                      ? 'border-cyan-300 bg-cyan-400/10 shadow-[0_0_60px_rgba(34,211,238,0.35)]'
                      : 'border-slate-600 bg-slate-950'
                  }`}
                >

                  {activeStage >= 2 && (
                    <>
                      <div className="absolute inset-2 rounded-full border border-cyan-300/20 animate-ping" />

                      <div className="absolute inset-4 rounded-full border border-cyan-300/20" />
                    </>
                  )}

                  <div className="relative z-10 text-center">
                    <Fingerprint
                      className={`w-7 h-7 mx-auto mb-2 transition-all ${
                        activeStage >= 2
                          ? 'text-cyan-300'
                          : 'text-slate-500'
                      }`}
                    />

                    <p className="text-[9px] tracking-[0.2em] text-cyan-300 font-mono">
                      ACTOR
                    </p>

                    <p className="font-bold text-sm">
                      DNA
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTOR DNA SIGNALS */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <DNAChip
                  title="Technical"
                  active={activeStage >= 2}
                />

                <DNAChip
                  title="Behavioral"
                  active={activeStage >= 2}
                />

                <DNAChip
                  title="Linguistic"
                  active={activeStage >= 2}
                />

                <DNAChip
                  title="Temporal"
                  active={activeStage >= 2}
                />
              </div>

              {/* PIPELINE */}
              <div className="space-y-3">

                <PipelineStep
                  number="01"
                  title="Evidence Extraction"
                  description="IPs, aliases, domains, PGP, wallets and timestamps"
                  active={activeStage >= 1}
                  current={activeStage === 1}
                />

                <PipelineArrow active={activeStage >= 2} />

                <PipelineStep
                  number="02"
                  title="Actor DNA"
                  description="Technical, behavioral, linguistic and temporal fingerprint"
                  active={activeStage >= 2}
                  current={activeStage === 2}
                />

                <PipelineArrow active={activeStage >= 3} />

                <PipelineStep
                  number="03"
                  title="Evidence Enrichment"
                  description="Contextual enrichment of correlated indicators"
                  active={activeStage >= 3}
                  current={activeStage === 3}
                />

                <PipelineArrow active={activeStage >= 4} />

                <PipelineStep
                  number="04"
                  title="Cross-Persona Correlation"
                  description="Compare connected identities and infrastructure"
                  active={activeStage >= 4}
                  current={activeStage === 4}
                />

                <PipelineArrow active={activeStage >= 5} />

                <PipelineStep
                  number="05"
                  title="Identity Resolution"
                  description="Public / authorized identity relationships"
                  active={activeStage >= 5}
                  current={activeStage === 5}
                />

                <PipelineArrow active={activeStage >= 6} />

                <PipelineStep
                  number="06"
                  title="Attribution Lead"
                  description="Evidence-backed candidate for investigator review"
                  active={activeStage >= 6}
                  current={activeStage === 6}
                />
              </div>
            </section>

            {/* ===================================================== */}
            {/* RIGHT: EVIDENCE ENRICHMENT */}
            {/* ===================================================== */}

            <section
              className={`rounded-2xl border overflow-hidden transition-all duration-700 ${
                activeStage >= 3
                  ? 'border-purple-300/50 bg-purple-400/[0.04] shadow-[0_0_40px_rgba(168,85,247,0.10)]'
                  : 'border-slate-700/70 bg-slate-900/70'
              }`}
            >

              <SectionHeader
                icon={<MapPin className="w-4 h-4" />}
                title="2. EVIDENCE ENRICHMENT"
                subtitle="Context, not direct identity"
                active={activeStage >= 3}
              />

              <div className="p-5">

                {/* Selected indicator */}
                <div
                  className={`rounded-xl border p-4 mb-5 transition-all duration-700 ${
                    activeStage >= 3
                      ? 'border-purple-300/40 bg-purple-400/5 shadow-[0_0_25px_rgba(168,85,247,0.10)]'
                      : 'border-slate-700 bg-slate-950/40'
                  }`}
                >
                  <p className="text-[10px] tracking-widest text-purple-300 font-mono">
                    SELECTED INDICATOR
                  </p>

                  <h3 className="text-lg font-semibold mt-2">
                    {selectedEvidence.value}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-5">
                    {selectedEvidence.description}
                  </p>
                </div>

                {/* Enrichment information */}
                <div className="space-y-1">

                  <EnrichmentRow
                    label="Source"
                    value={selectedEvidence.source}
                    active={activeStage >= 3}
                  />

                  <EnrichmentRow
                    label="Evidence confidence"
                    value={`${selectedEvidence.confidence}%`}
                    active={activeStage >= 3}
                  />

                  {selectedEvidence.type === 'IP' && (
                    <>
                      <EnrichmentRow
                        label="Network context"
                        value="ISP / ASN enrichment"
                        active={activeStage >= 3}
                      />

                      <EnrichmentRow
                        label="Geographic context"
                        value="Approximate network region"
                        active={activeStage >= 3}
                      />

                      <EnrichmentRow
                        label="Identity status"
                        value="Not directly established"
                        active={activeStage >= 3}
                      />
                    </>
                  )}

                  {selectedEvidence.type === 'DOMAIN' && (
                    <>
                      <EnrichmentRow
                        label="Infrastructure"
                        value="DNS / certificate relationship"
                        active={activeStage >= 3}
                      />

                      <EnrichmentRow
                        label="Identity status"
                        value="Requires independent evidence"
                        active={activeStage >= 3}
                      />
                    </>
                  )}

                  {selectedEvidence.type === 'ALIAS' && (
                    <>
                      <EnrichmentRow
                        label="Persona relationship"
                        value="Potential cross-platform link"
                        active={activeStage >= 3}
                      />

                      <EnrichmentRow
                        label="Identity status"
                        value="Requires independent evidence"
                        active={activeStage >= 3}
                      />
                    </>
                  )}

                  {selectedEvidence.type === 'PGP' && (
                    <EnrichmentRow
                      label="Identity relationship"
                      value="Public key identity metadata"
                      active={activeStage >= 3}
                    />
                  )}

                  {selectedEvidence.type === 'WALLET' && (
                    <EnrichmentRow
                      label="Blockchain context"
                      value="Public transaction relationship"
                      active={activeStage >= 3}
                    />
                  )}

                  {selectedEvidence.type === 'TIMESTAMP' && (
                    <EnrichmentRow
                      label="Temporal context"
                      value="Activity timeline correlation"
                      active={activeStage >= 3}
                    />
                  )}
                </div>

                {/* Warning */}
                <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                  <div className="flex gap-3">

                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />

                    <div>
                      <p className="text-sm font-medium text-amber-300">
                        Attribution limitation
                      </p>

                      <p className="text-xs text-slate-400 leading-5 mt-1">
                        An IP address alone does not establish a person's
                        physical location or identity. SHADOWTRACE requires
                        multiple independent signals and appropriate
                        public or authorized identity evidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CORRELATION RESULT */}
        {/* ========================================================= */}

        <section
          className={`mt-7 rounded-2xl border p-6 transition-all duration-1000 ${
            activeStage >= 4
              ? 'border-purple-300/40 bg-purple-400/[0.05] shadow-[0_0_45px_rgba(168,85,247,0.12)]'
              : 'border-slate-700/70 bg-slate-900/60'
          }`}
        >

          <div className="flex items-center gap-3 mb-5">

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeStage >= 4
                  ? 'bg-purple-400/10 border border-purple-300/30'
                  : 'bg-slate-800 border border-slate-700'
              }`}
            >
              <Link2
                className={`w-5 h-5 ${
                  activeStage >= 4
                    ? 'text-purple-300'
                    : 'text-slate-500'
                }`}
              />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.25em] text-purple-300 font-mono">
                CORRELATION LAYER
              </p>

              <h2 className="text-lg font-semibold">
                Cross-Persona Relationship Analysis
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-3">

            <CorrelationNode
              title="Digital Personas"
              value={activeStage >= 4 ? '4 linked' : '--'}
              active={activeStage >= 4}
              icon={<UserRound className="w-4 h-4" />}
            />

            <CorrelationNode
              title="Infrastructure"
              value={activeStage >= 4 ? '7 linked' : '--'}
              active={activeStage >= 4}
              icon={<Network className="w-4 h-4" />}
            />

            <CorrelationNode
              title="Evidence Graph"
              value={activeStage >= 4 ? '18 relations' : '--'}
              active={activeStage >= 4}
              icon={<Link2 className="w-4 h-4" />}
            />

            <CorrelationNode
              title="Actor Cluster"
              value={activeStage >= 4 ? 'Cluster A' : '--'}
              active={activeStage >= 4}
              icon={<Fingerprint className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* IDENTITY RESOLUTION */}
        {/* ========================================================= */}

        <section
          className={`mt-7 rounded-2xl border p-6 transition-all duration-1000 ${
            activeStage >= 5
              ? 'border-indigo-300/40 bg-indigo-400/[0.05] shadow-[0_0_45px_rgba(99,102,241,0.12)]'
              : 'border-slate-700/70 bg-slate-900/60'
          }`}
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div className="flex items-center gap-3">

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeStage >= 5
                    ? 'bg-indigo-400/10 border border-indigo-300/30'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              >
                <UserRound
                  className={`w-5 h-5 ${
                    activeStage >= 5
                      ? 'text-indigo-300'
                      : 'text-slate-500'
                  }`}
                />
              </div>

              <div>
                <p className="text-[10px] tracking-[0.25em] text-indigo-300 font-mono">
                  IDENTITY RESOLUTION
                </p>

                <h2 className="text-lg font-semibold">
                  Digital Identity → Real-World Entity Candidate
                </h2>
              </div>
            </div>

            {activeStage >= 5 && (
              <div className="flex items-center gap-2 text-xs text-indigo-300">
                <CheckCircle2 className="w-4 h-4" />
                Evidence relationships resolved
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-3">

            <ResolutionNode
              title="Digital Personas"
              value={activeStage >= 5 ? '4 linked' : 'Pending'}
              active={activeStage >= 5}
              icon={<UserRound className="w-4 h-4" />}
            />

            <ResolutionNode
              title="Public / Authorized Sources"
              value={activeStage >= 5 ? 'Checked' : 'Pending'}
              active={activeStage >= 5}
              icon={<Globe className="w-4 h-4" />}
            />

            <ResolutionNode
              title="Identity Relationships"
              value={activeStage >= 5 ? '3 links' : 'Pending'}
              active={activeStage >= 5}
              icon={<Link2 className="w-4 h-4" />}
            />

            <ResolutionNode
              title="Entity Resolution"
              value={activeStage >= 5 ? 'Review Required' : 'Pending'}
              active={activeStage >= 5}
              icon={<Shield className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL ATTRIBUTION LEAD */}
        {/* ========================================================= */}

        <section
          className={`mt-7 rounded-2xl border p-6 transition-all duration-1000 ${
            activeStage >= 6
              ? 'border-cyan-300/60 bg-gradient-to-r from-cyan-400/[0.08] to-purple-400/[0.08] shadow-[0_0_60px_rgba(34,211,238,0.16)]'
              : 'border-slate-700/70 bg-slate-900/50'
          }`}
        >

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>
              <p className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono">
                INVESTIGATION OUTPUT
              </p>

              <h2 className="text-2xl font-semibold mt-2">
                {activeStage >= 6
                  ? 'Evidence-Backed Attribution Lead'
                  : 'Attribution Lead'}
              </h2>

              <p className="text-sm text-slate-400 mt-2 max-w-3xl leading-6">
                {activeStage >= 6
                  ? 'Multiple independent signals have been correlated into a traceable relationship hypothesis for investigator validation.'
                  : 'Run correlation to generate an evidence-backed attribution lead.'}
              </p>
            </div>

            <div className="flex items-center gap-5">

              <div className="text-right">

                <p className="text-xs text-slate-500">
                  Correlation confidence
                </p>

                <p
                  className={`text-3xl font-bold transition-all ${
                    activeStage >= 6
                      ? 'text-cyan-300'
                      : 'text-slate-600'
                  }`}
                >
                  {activeStage >= 6
                    ? `${averageConfidence}%`
                    : '--'}
                </p>
              </div>

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-700 ${
                  activeStage >= 6
                    ? 'border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_35px_rgba(34,211,238,0.25)]'
                    : 'border-slate-700 bg-slate-900'
                }`}
              >
                <CheckCircle2
                  className={`w-7 h-7 ${
                    activeStage >= 6
                      ? 'text-cyan-300'
                      : 'text-slate-700'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Final status */}
          <div className="mt-6 pt-5 border-t border-slate-700/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

            <div className="flex items-center gap-2">

              <div
                className={`w-2 h-2 rounded-full ${
                  activeStage >= 6
                    ? 'bg-cyan-300 animate-pulse'
                    : 'bg-slate-700'
                }`}
              />

              <span className="text-xs font-mono text-slate-400">
                {activeStage >= 6
                  ? 'ATTRIBUTION LEAD GENERATED'
                  : 'AWAITING CORRELATION'}
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Final attribution requires investigator validation.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

/* =============================================================== */
/* REUSABLE COMPONENTS */
/* =============================================================== */

function StatCard({
  icon,
  label,
  value,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-700 ${
        active
          ? 'border-cyan-300/30 bg-cyan-400/[0.04]'
          : 'border-slate-700 bg-slate-900/70'
      }`}
    >
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p
        className={`text-xl font-semibold mt-2 transition-all ${
          active ? 'text-white' : 'text-slate-500'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active: boolean;
}) {
  return (
    <div
      className={`border-b px-5 py-4 transition-all duration-500 ${
        active
          ? 'border-cyan-300/20'
          : 'border-slate-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={active ? 'text-cyan-300' : 'text-slate-400'}>
          {icon}
        </span>

        <h2 className="text-xs tracking-wider font-semibold">
          {title}
        </h2>
      </div>

      <p className="text-[11px] text-slate-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}

function FlowArrow({
  position,
  active,
  color,
}: {
  position: 'left' | 'right';
  active: boolean;
  color: 'cyan' | 'purple';
}) {
  const isCyan = color === 'cyan';

  return (
    <div
      className={`hidden lg:flex absolute z-30 top-1/2 -translate-y-1/2 items-center transition-all duration-700 ${
        position === 'left'
          ? 'left-[31%]'
          : 'right-[31%]'
      } ${
        active ? 'opacity-100' : 'opacity-20'
      }`}
    >
      <div
        className={`w-14 xl:w-20 h-[2px] relative overflow-hidden ${
          isCyan
            ? 'bg-cyan-300/20'
            : 'bg-purple-300/20'
        }`}
      >
        {active && (
          <div
            className={`absolute top-0 left-0 h-full w-10 ${
              isCyan
                ? 'bg-cyan-300'
                : 'bg-purple-300'
            } animate-[flow_1s_linear_infinite]`}
          />
        )}
      </div>

      <ArrowRight
        className={`w-5 h-5 ${
          isCyan
            ? 'text-cyan-300'
            : 'text-purple-300'
        }`}
      />
    </div>
  );
}

function PipelineArrow({
  active,
}: {
  active: boolean;
}) {
  return (
    <div className="flex justify-center h-3">
      <ArrowDown
        className={`w-4 h-4 transition-all duration-500 ${
          active
            ? 'text-cyan-300 animate-pulse'
            : 'text-slate-700'
        }`}
      />
    </div>
  );
}

function PipelineStep({
  number,
  title,
  description,
  active,
  current,
}: {
  number: string;
  title: string;
  description: string;
  active: boolean;
  current: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 transition-all duration-700 ${
        current
          ? 'border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_25px_rgba(34,211,238,0.15)] scale-[1.02]'
          : active
            ? 'border-cyan-300/30 bg-cyan-300/[0.04]'
            : 'border-slate-700 bg-slate-950/30'
      }`}
    >
      <div className="flex gap-3">

        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono shrink-0 transition-all ${
            active
              ? 'bg-cyan-300/15 text-cyan-300'
              : 'bg-slate-800 text-slate-500'
          }`}
        >
          {number}
        </div>

        <div className="min-w-0">

          <p
            className={`text-sm font-medium ${
              active
                ? 'text-white'
                : 'text-slate-500'
            }`}
          >
            {title}
          </p>

          <p className="text-[11px] text-slate-500 mt-1 leading-4">
            {description}
          </p>
        </div>

        {active && (
          <CheckCircle2 className="w-4 h-4 text-cyan-300 ml-auto shrink-0" />
        )}
      </div>
    </div>
  );
}

function DNAChip({
  title,
  active,
}: {
  title: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center transition-all duration-700 ${
        active
          ? 'border-cyan-300/30 bg-cyan-300/[0.05] text-cyan-200'
          : 'border-slate-700 bg-slate-950/40 text-slate-600'
      }`}
    >
      <span className="text-[10px] font-mono tracking-wider">
        {title}
      </span>
    </div>
  );
}

function EnrichmentRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-3 border-b border-slate-800 transition-all duration-500 ${
        active ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <span className="text-xs text-slate-500">
        {label}
      </span>

      <span
        className={`text-xs text-right ${
          active
            ? 'text-slate-200'
            : 'text-slate-600'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function CorrelationNode({
  title,
  value,
  active,
  icon,
}: {
  title: string;
  value: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-700 ${
        active
          ? 'border-purple-300/30 bg-purple-300/[0.05] shadow-[0_0_20px_rgba(168,85,247,0.08)]'
          : 'border-slate-700 bg-slate-950/40'
      }`}
    >
      <div
        className={`mb-3 ${
          active
            ? 'text-purple-300'
            : 'text-slate-600'
        }`}
      >
        {icon}
      </div>

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p
        className={`text-sm font-semibold mt-1 ${
          active
            ? 'text-white'
            : 'text-slate-600'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ResolutionNode({
  title,
  value,
  active,
  icon,
}: {
  title: string;
  value: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-700 ${
        active
          ? 'border-indigo-300/30 bg-indigo-300/[0.05]'
          : 'border-slate-700 bg-slate-950/40'
      }`}
    >
      <div
        className={`mb-3 ${
          active
            ? 'text-indigo-300'
            : 'text-slate-600'
        }`}
      >
        {icon}
      </div>

      <p className="text-xs text-slate-500">
        {title}
      </p>

      <p
        className={`text-sm font-semibold mt-1 ${
          active
            ? 'text-white'
            : 'text-slate-600'
        }`}
      >
        {value}
      </p>
    </div>
  );
}