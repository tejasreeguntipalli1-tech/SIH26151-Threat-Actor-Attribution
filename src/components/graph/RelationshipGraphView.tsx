import React, { useEffect, useRef, useState, useMemo } from 'react';
import cytoscape from 'cytoscape';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  X, 
  RotateCcw, 
  Filter, 
  Info,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Building2,
  Globe,
  Server,
  Key,
  Wallet,
  User,
  ArrowRight,
  GitCommit,
  Compass,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface GraphNodeData {
  id: string;
  label: string;
  type: string;
  group: 'Digital Actor Evidence' | 'Real-World Entity Evidence';
  cluster?: string;
  confidence?: number;
  details?: string;
  connectedCount?: number;
  status?: 'SUPPORTING' | 'CONFLICTING' | 'UNKNOWN';
  provenance?: string;
}

interface RelationshipGraphViewProps {
  initialTracePath?: boolean;
  onNavigate?: (tabId: string) => void;
}

export const RelationshipGraphView: React.FC<RelationshipGraphViewProps> = ({
  initialTracePath = false,
  onNavigate
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<any | null>(null);
  const [activeLayout, setActiveLayout] = useState<'cose' | 'concentric' | 'circle' | 'breadthfirst'>('cose');

  // Trace Investigation Path Mode
  const [isPathTraceActive, setIsPathTraceActive] = useState<boolean>(initialTracePath);
  const [activePathStepIndex, setActivePathStepIndex] = useState<number | null>(null);

  // Filters
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('ALL');

  // Investigation path definition (From Candidate A to Darknet Handle)
  const investigationPathSteps = useMemo(() => [
    { id: 'candidate_a', label: 'Candidate Entity A', role: 'Real-World Organization', detail: 'Meridian Analytics S.R.O. (Subject A. K.)' },
    { id: 'intel_record_102', label: 'Intel Record: alex-k-sec', role: 'Developer Attribution', detail: 'Public Git commits & SSH comments matching mirror scripts' },
    { id: 'domain_vault', label: 'Domain: darkx17-vault.is', role: 'Domain Registrar', detail: 'A-record with Let\'s Encrypt SSL cert pointing to proxy IP' },
    { id: 'infra_node_17', label: 'Infra-Node-17 (185.220.101.45)', role: 'Infrastructure Host', detail: 'Bulletproof reverse proxy server on FlokiNET' },
    { id: 'actor_cluster_a', label: 'Actor Cluster A (TA-001)', role: 'Probable Digital Actor', detail: 'Correlated across 3 darknet forums (92% Confidence)' },
    { id: 'shadow_x17', label: '@shadow_x17', role: 'Digital Handle', detail: 'Dread forum initial access broker & escrow operator' }
  ], []);

  const pathNodeIds = useMemo(() => new Set(investigationPathSteps.map(s => s.id)), [investigationPathSteps]);
  const pathEdgeIds = useMemo(() => new Set(['e15', 'e14', 'e12', 'e11', 'e1']), []);

  const elementsData: cytoscape.ElementsDefinition = {
    nodes: [
      // --- STAGE 1: DIGITAL ACTOR EVIDENCE ---
      { data: { id: 'actor_cluster_a', label: 'ACTOR CLUSTER A', type: 'Actor', group: 'Digital Actor Evidence', confidence: 92, status: 'SUPPORTING', details: 'Core Probable Digital Actor Cluster correlated across 3 dark web forums.', connectedCount: 6, provenance: 'Stage 1 Actor Clustering' } },
      
      { data: { id: 'shadow_x17', label: '@shadow_x17', type: 'Account', group: 'Digital Actor Evidence', confidence: 94, status: 'SUPPORTING', details: 'Forum-X (Dread) initial access broker handle.', connectedCount: 4, provenance: 'Stage 1 Ingestion' } },
      { data: { id: 'x_shadow', label: '@x_shadow', type: 'Account', group: 'Digital Actor Evidence', confidence: 92, status: 'SUPPORTING', details: 'Market-Y (XSS Forum) access seller persona.', connectedCount: 3, provenance: 'Stage 1 Ingestion' } },
      { data: { id: 'darkx17', label: '@darkx17', type: 'Account', group: 'Digital Actor Evidence', confidence: 91, status: 'SUPPORTING', details: 'Chat-Z (BreachForums mirror) data leak publisher.', connectedCount: 4, provenance: 'Stage 1 Ingestion' } },

      { data: { id: 'alias_x17dev', label: 'Alias: x17_dev', type: 'Alias', group: 'Digital Actor Evidence', confidence: 88, status: 'SUPPORTING', details: 'Developer handle stem referenced in Dread escrow threads.', connectedCount: 2, provenance: 'Stage 1 Stylometry' } },
      { data: { id: 'pgp_key', label: 'PGP: 0x7E4A8F2C91B4', type: 'Technical Indicator', group: 'Digital Actor Evidence', confidence: 98, status: 'SUPPORTING', details: 'RSA-4096 cryptographic signature verified across all three handles.', connectedCount: 3, provenance: 'Stage 1 PGP Keyserver' } },
      { data: { id: 'btc_wallet', label: 'BTC: bc1qxy2kg...', type: 'Wallet Indicator', group: 'Digital Actor Evidence', confidence: 95, status: 'SUPPORTING', details: 'Native SegWit deposit wallet with repeated co-spend history.', connectedCount: 3, provenance: 'Stage 1 Blockchain Ledger' } },
      { data: { id: 'behavior_hyphen', label: 'Syntax: Double-Hyphen (--)', type: 'Behaviour', group: 'Digital Actor Evidence', confidence: 91, status: 'SUPPORTING', details: 'Idiosyncratic punctuation habit in 100% of analyzed forum posts.', connectedCount: 3, provenance: 'Stage 1 Stylometry' } },

      // --- STAGE 2: REAL-WORLD ENTITY EVIDENCE ---
      { data: { id: 'infra_node_17', label: 'Infra-Node-17 (185.220.101.45)', type: 'Infrastructure', group: 'Real-World Entity Evidence', confidence: 90, status: 'SUPPORTING', details: 'Reverse proxy server on Njalla / FlokiNET hosting mirror gateway.', connectedCount: 3, provenance: 'Stage 2 Threat Intel #IR-102' } },
      { data: { id: 'domain_vault', label: 'Domain: darkx17-vault.is', type: 'Domain', group: 'Real-World Entity Evidence', confidence: 92, status: 'SUPPORTING', details: 'Clear-web DNS A-record pointing to 185.220.101.45 with staging SSL cert.', connectedCount: 3, provenance: 'Stage 2 Passive DNS' } },
      { data: { id: 'intel_record_102', label: 'Intel Record: "alex-k-sec"', type: 'Intelligence Record', group: 'Real-World Entity Evidence', confidence: 85, status: 'SUPPORTING', details: 'Public Git commit author and SSH deployment comments matching mirror scripts.', connectedCount: 2, provenance: 'Stage 2 Developer Commits' } },
      { data: { id: 'candidate_a', label: 'CANDIDATE ENTITY A', type: 'Candidate Entity', group: 'Real-World Entity Evidence', confidence: 82, status: 'SUPPORTING', details: 'Meridian Analytics S.R.O. (Subject A. K.) — Corporate registrant of domain.', connectedCount: 3, provenance: 'Stage 2 Entity Resolution' } },
      { data: { id: 'candidate_b', label: 'Candidate Entity B (Vortex Cloud)', type: 'Candidate Entity', group: 'Real-World Entity Evidence', confidence: 67, status: 'CONFLICTING', details: 'Bulletproof hosting leaseholder (Secondary Hypothesis).', connectedCount: 1, provenance: 'Stage 2 Entity Resolution' } }
    ],
    edges: [
      // Stage 1 Edges
      { data: { id: 'e1', source: 'shadow_x17', target: 'actor_cluster_a', label: 'ALIAS_OF', relation: 'ALIAS_OF', type: 'Identity', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e2', source: 'x_shadow', target: 'actor_cluster_a', label: 'ALIAS_OF', relation: 'ALIAS_OF', type: 'Identity', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e3', source: 'darkx17', target: 'actor_cluster_a', label: 'ALIAS_OF', relation: 'ALIAS_OF', type: 'Identity', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e4', source: 'shadow_x17', target: 'pgp_key', label: 'OBSERVED_ON', relation: 'OBSERVED_ON', type: 'Technical', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e5', source: 'x_shadow', target: 'pgp_key', label: 'OBSERVED_ON', relation: 'OBSERVED_ON', type: 'Technical', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e6', source: 'darkx17', target: 'pgp_key', label: 'OBSERVED_ON', relation: 'OBSERVED_ON', type: 'Technical', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e7', source: 'shadow_x17', target: 'btc_wallet', label: 'CONNECTED_TO', relation: 'CONNECTED_TO', type: 'Financial', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e8', source: 'darkx17', target: 'btc_wallet', label: 'CONNECTED_TO', relation: 'CONNECTED_TO', type: 'Financial', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e9', source: 'shadow_x17', target: 'behavior_hyphen', label: 'ASSOCIATED_WITH', relation: 'ASSOCIATED_WITH', type: 'Behavioural', status: 'SUPPORTING', confidence: 'Moderate', weight: 2 } },
      { data: { id: 'e10', source: 'darkx17', target: 'behavior_hyphen', label: 'ASSOCIATED_WITH', relation: 'ASSOCIATED_WITH', type: 'Behavioural', status: 'SUPPORTING', confidence: 'Moderate', weight: 2 } },

      // Cross-Stage Handoff & Stage 2 Resolution Edges
      { data: { id: 'e11', source: 'actor_cluster_a', target: 'infra_node_17', label: 'HISTORICALLY_LINKED', relation: 'HISTORICALLY_LINKED', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e12', source: 'infra_node_17', target: 'domain_vault', label: 'CONNECTED_TO', relation: 'CONNECTED_TO', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e13', source: 'darkx17', target: 'domain_vault', label: 'OBSERVED_ON', relation: 'OBSERVED_ON', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e14', source: 'domain_vault', target: 'intel_record_102', label: 'MATCHED_WITH', relation: 'MATCHED_WITH', type: 'Public Intelligence', status: 'SUPPORTING', confidence: 'Moderate', weight: 3 } },
      { data: { id: 'e15', source: 'intel_record_102', target: 'candidate_a', label: 'SUPPORTS', relation: 'SUPPORTS', type: 'Public Intelligence', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e16', source: 'infra_node_17', target: 'candidate_a', label: 'SUPPORTS', relation: 'SUPPORTS', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e17', source: 'infra_node_17', target: 'candidate_b', label: 'CONFLICTS_WITH', relation: 'CONFLICTS_WITH', type: 'Infrastructure', status: 'CONFLICTING', confidence: 'Weak', weight: 2 } }
    ]
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Filter nodes
    const filteredNodes = elementsData.nodes.filter(node => {
      const type = node.data.type;
      const status = node.data.status;
      const conf = node.data.confidence || 0;

      if (!isPathTraceActive) {
        if (selectedEvidenceType !== 'ALL' && !type.toLowerCase().includes(selectedEvidenceType.toLowerCase())) return false;
        if (selectedStatus !== 'ALL' && status !== selectedStatus) return false;
        if (selectedConfidence === 'Strong' && conf < 80) return false;
        if (selectedConfidence === 'Moderate' && (conf < 60 || conf >= 80)) return false;
        if (selectedConfidence === 'Weak' && conf >= 60) return false;
      }

      return true;
    });

    const activeNodeIds = new Set(filteredNodes.map(n => n.data.id));
    const filteredEdges = elementsData.edges.filter(edge => {
      return activeNodeIds.has(edge.data.source) && activeNodeIds.has(edge.data.target);
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements: {
        nodes: filteredNodes,
        edges: filteredEdges
      },
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'font-family': 'monospace',
            'font-size': '10px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'color': '#cbd5e1',
            'background-color': '#1e293b',
            'border-width': 2,
            'border-color': '#475569',
            'width': 36,
            'height': 36,
            'text-background-opacity': 0.85,
            'text-background-color': '#090d16',
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle'
          }
        },
        // Group: Digital Actor Evidence (Emerald)
        {
          selector: 'node[group = "Digital Actor Evidence"]',
          style: {
            'background-color': '#064e3b',
            'border-color': '#10b981',
            'color': '#6ee7b7'
          }
        },
        {
          selector: 'node[type = "Actor"]',
          style: {
            'background-color': '#065f46',
            'border-color': '#34d399',
            'border-width': 4,
            'width': 48,
            'height': 48
          }
        },
        // Group: Real-World Entity Evidence (Cyan)
        {
          selector: 'node[group = "Real-World Entity Evidence"]',
          style: {
            'background-color': '#164e63',
            'border-color': '#06b6d4',
            'color': '#a5f3fc'
          }
        },
        {
          selector: 'node[type = "Candidate Entity"]',
          style: {
            'background-color': '#0e7490',
            'border-color': '#22d3ee',
            'border-width': 4,
            'width': 50,
            'height': 50,
            'shape': 'hexagon',
            'color': '#e0f2fe'
          }
        },
        {
          selector: 'node[type = "Infrastructure"]',
          style: {
            'shape': 'rectangle',
            'border-color': '#e879f9',
            'background-color': '#581c87'
          }
        },
        {
          selector: 'node[type = "Domain"]',
          style: {
            'shape': 'round-rectangle',
            'border-color': '#60a5fa',
            'background-color': '#1e3a8a'
          }
        },
        // Edges
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': '#334155',
            'target-arrow-color': '#334155',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-family': 'monospace',
            'font-size': '8px',
            'color': '#94a3b8',
            'text-background-opacity': 0.85,
            'text-background-color': '#090d16',
            'text-background-padding': '2px'
          }
        },
        {
          selector: 'edge[status = "CONFLICTING"]',
          style: {
            'line-color': '#ef4444',
            'target-arrow-color': '#ef4444',
            'line-style': 'dashed',
            'color': '#fca5a5'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#38bdf8',
            'background-color': '#0284c7'
          }
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#38bdf8',
            'target-arrow-color': '#38bdf8',
            'width': 4
          }
        },
        // Investigation Path Tracing Styles (When isPathTraceActive is TRUE)
        ...(isPathTraceActive ? [
          {
            selector: 'node',
            style: {
              'opacity': 0.2,
              'text-opacity': 0.2
            }
          },
          {
            selector: 'edge',
            style: {
              'opacity': 0.15,
              'text-opacity': 0.1
            }
          },
          ...Array.from(pathNodeIds).map(id => ({
            selector: `node#${id}`,
            style: {
              'opacity': 1,
              'text-opacity': 1,
              'border-width': 4,
              'border-color': '#22d3ee',
              'background-color': '#0891b2',
              'color': '#ffffff'
            }
          })),
          ...Array.from(pathEdgeIds).map(id => ({
            selector: `edge#${id}`,
            style: {
              'opacity': 1,
              'text-opacity': 1,
              'line-color': '#06b6d4',
              'target-arrow-color': '#06b6d4',
              'width': 5,
              'color': '#67e8f9'
            }
          }))
        ] : [])
      ],
      layout: {
        name: activeLayout,
        animate: true,
        animationDuration: 400,
        padding: 40
      }
    });

    cy.on('tap', 'node', (evt) => {
      const data = evt.target.data();
      setSelectedNode(data);
      setSelectedEdge(null);
      const stepIdx = investigationPathSteps.findIndex(s => s.id === data.id);
      setActivePathStepIndex(stepIdx >= 0 ? stepIdx : null);
    });

    cy.on('tap', 'edge', (evt) => {
      setSelectedEdge(evt.target.data());
      setSelectedNode(null);
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
        setSelectedEdge(null);
        setActivePathStepIndex(null);
      }
    });

    // Resize observer to prevent clipping or improper bounds
    const handleResize = () => {
      if (cyRef.current) {
        cyRef.current.resize();
        cyRef.current.fit(undefined, 30);
      }
    };

    window.addEventListener('resize', handleResize);
    cyRef.current = cy;

    return () => {
      window.removeEventListener('resize', handleResize);
      cy.destroy();
    };
  }, [activeLayout, selectedEvidenceType, selectedStatus, selectedConfidence, isPathTraceActive, pathNodeIds, pathEdgeIds, investigationPathSteps]);

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 30);
  const handleReset = () => {
    setSelectedEvidenceType('ALL');
    setSelectedStatus('ALL');
    setSelectedConfidence('ALL');
    setActiveLayout('cose');
    setIsPathTraceActive(false);
    setActivePathStepIndex(null);
    setSelectedNode(null);
    setSelectedEdge(null);
    cyRef.current?.fit();
  };

  // Center on a specific step in the investigation path
  const handleSelectPathStep = (index: number) => {
    setActivePathStepIndex(index);
    const step = investigationPathSteps[index];
    if (!step || !cyRef.current) return;

    const node = cyRef.current.$(`node#${step.id}`);
    if (node && node.length > 0) {
      cyRef.current.animate({
        center: { eles: node },
        zoom: 1.4
      }, {
        duration: 400
      });
      setSelectedNode(node.data());
      setSelectedEdge(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Layout Controls */}
      <div className="bg-[#0b1220] border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
              CROSS-STAGE EVIDENCE TOPOLOGY
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              STAGE 1 ACTOR &rarr; STAGE 2 ENTITY GRAPH
            </span>
          </div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span>Relationship Topology Graph</span>
          </h2>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* TRACE INVESTIGATION PATH Mode Toggle */}
          <button
            onClick={() => {
              setIsPathTraceActive(!isPathTraceActive);
              if (!isPathTraceActive) {
                setActivePathStepIndex(0);
              } else {
                setActivePathStepIndex(null);
              }
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all shadow-md ${
              isPathTraceActive
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white border border-cyan-300 shadow-cyan-950/60 ring-2 ring-cyan-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPathTraceActive ? 'text-amber-300 animate-spin' : 'text-cyan-400'}`} />
            <span>TRACE INVESTIGATION PATH</span>
            {isPathTraceActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>

          {/* Layout Switcher */}
          <div className="flex items-center bg-[#070b14] border border-slate-800 rounded-lg p-1 text-xs font-mono">
            <span className="text-slate-400 px-2 text-[11px]">Layout:</span>
            {(['cose', 'concentric', 'circle', 'breadthfirst'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLayout(l)}
                className={`px-2 py-0.5 rounded capitalize transition-colors text-[11px] ${
                  activeLayout === l 
                    ? 'bg-cyan-600 text-white font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Zoom / Pan / Reset */}
          <div className="flex items-center bg-[#070b14] border border-slate-800 rounded-lg p-1">
            <button onClick={handleZoomIn} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button onClick={handleZoomOut} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button onClick={handleFit} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800" title="Fit to Viewport">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button onClick={handleReset} className="p-1.5 text-amber-400 hover:text-white rounded hover:bg-slate-800" title="Reset Graph">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trace Investigation Path Stepper (Appears when Trace Mode is Active) */}
      {isPathTraceActive && (
        <div className="bg-[#070b14] border-2 border-cyan-500/70 rounded-xl p-3.5 space-y-2 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Investigation Traversal: Candidate Entity A &rarr; Digital Identity
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">
              CLICK ANY STEP TO FOCUS GRAPH
            </span>
          </div>

          {/* Path Steps */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-1">
            {investigationPathSteps.map((step, idx) => {
              const isActiveStep = activePathStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectPathStep(idx)}
                  className={`text-left p-2 rounded-lg border transition-all flex flex-col justify-between ${
                    isActiveStep
                      ? 'bg-cyan-950/80 border-cyan-400 ring-1 ring-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-[#0b1220] border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pb-1 border-b border-slate-800/80 mb-1">
                    <span>STEP {idx + 1}</span>
                    <span className="text-cyan-400 truncate max-w-[70px]">{step.role}</span>
                  </div>
                  <div className="text-xs font-mono font-bold truncate">
                    {step.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Bar (When not in Path Trace mode) */}
      {!isPathTraceActive && (
        <div className="bg-[#070b14] border border-slate-800 rounded-lg p-2.5 flex items-center justify-between gap-3 text-xs font-mono flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400 uppercase font-semibold">Topology Filters:</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={selectedEvidenceType}
              onChange={(e) => setSelectedEvidenceType(e.target.value)}
              className="bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none text-xs"
            >
              <option value="ALL">All Evidence Types</option>
              <option value="Identity">Identity</option>
              <option value="Technical">Technical</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Financial">Financial</option>
              <option value="Intelligence">Public Intelligence</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none text-xs"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUPPORTING">Supporting</option>
              <option value="CONFLICTING">Conflicting</option>
              <option value="UNKNOWN">Unknown</option>
            </select>

            <select
              value={selectedConfidence}
              onChange={(e) => setSelectedConfidence(e.target.value)}
              className="bg-[#0b1220] border border-slate-700 rounded px-2.5 py-1 text-slate-200 focus:outline-none text-xs"
            >
              <option value="ALL">All Confidence Bands</option>
              <option value="Strong">Strong (&ge; 80%)</option>
              <option value="Moderate">Moderate (60-79%)</option>
              <option value="Weak">Weak (&lt; 60%)</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Canvas & Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Cytoscape Canvas Container (Strictly bounded min-height 580px) */}
        <div className={`relative bg-[#060a12] border border-slate-800 rounded-xl overflow-hidden min-h-[580px] h-[580px] ${
          selectedNode || selectedEdge ? 'lg:col-span-8' : 'lg:col-span-12'
        }`}>
          <div ref={containerRef} className="w-full h-full min-h-[580px]" />

          {/* Dual World Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#0b1220]/95 backdrop-blur-sm border border-slate-800 rounded-lg p-3 text-[10px] font-mono text-slate-300 space-y-1.5 shadow-xl pointer-events-none">
            <div className="font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-1">
              Cross-Stage Topology Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
              <span>Digital Actor Evidence (Stage 1)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-cyan-500 inline-block" />
              <span>Real-World Entity Evidence (Stage 2)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-red-400 inline-block" />
              <span className="text-red-300">Conflicting Relationship Edge</span>
            </div>
            {isPathTraceActive && (
              <div className="flex items-center gap-2 text-cyan-300 font-bold pt-0.5 border-t border-slate-800">
                <span className="w-3 h-1 bg-cyan-400 inline-block shadow-sm" />
                <span>Active Investigation Path</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Node or Edge Inspector Drawer */}
        {(selectedNode || selectedEdge) && (
          <div className="lg:col-span-4 bg-[#0b1220] border-2 border-cyan-500/50 rounded-xl p-5 space-y-4 shadow-xl font-mono text-xs max-h-[580px] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
                  {selectedNode ? `${selectedNode.group}` : 'RELATIONSHIP EDGE'}
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  {selectedNode ? selectedNode.label : `${selectedEdge.source} → ${selectedEdge.target}`}
                </h3>
              </div>
              <button 
                onClick={() => { setSelectedNode(null); setSelectedEdge(null); setActivePathStepIndex(null); }}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedNode && (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#070b14] p-2 rounded border border-slate-800">
                  <span className="text-slate-400">Node Type:</span>
                  <span className="text-white font-bold">{selectedNode.type}</span>
                </div>

                {selectedNode.confidence !== undefined && (
                  <div className="flex justify-between items-center bg-[#070b14] p-2 rounded border border-slate-800">
                    <span className="text-slate-400">Evidence Strength:</span>
                    <span className="text-cyan-400 font-bold">{selectedNode.confidence}%</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-semibold mb-1">
                    Forensic Telemetry:
                  </span>
                  <p className="bg-[#070b14] border border-slate-800 rounded p-2.5 text-slate-200 text-xs font-sans leading-relaxed">
                    {selectedNode.details}
                  </p>
                </div>

                <div className="bg-[#070b14] p-2.5 rounded border border-cyan-950 text-cyan-300 text-[11px]">
                  <span className="text-slate-400 text-[10px] block uppercase">Provenance Origin:</span>
                  <span>{selectedNode.provenance || 'Correlated Investigation Pipeline'}</span>
                </div>

                {/* Cross-Stage Jump Action Button */}
                <div className="pt-2">
                  {selectedNode.group === 'Digital Actor Evidence' ? (
                    <button
                      onClick={() => onNavigate && onNavigate('correlation')}
                      className="w-full py-2 px-3 rounded bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Jump to Stage 1 Correlation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate && onNavigate('stage2')}
                      className="w-full py-2 px-3 rounded bg-cyan-600/90 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Jump to Stage 2 Attribution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {selectedEdge && (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#070b14] p-2 rounded border border-slate-800">
                  <span className="text-slate-400">Relationship Type:</span>
                  <span className="text-cyan-400 font-bold">{selectedEdge.relation}</span>
                </div>

                <div className="flex justify-between items-center bg-[#070b14] p-2 rounded border border-slate-800">
                  <span className="text-slate-400">Evidence Status:</span>
                  <span className={`font-bold ${selectedEdge.status === 'SUPPORTING' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selectedEdge.status}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-[#070b14] p-2 rounded border border-slate-800">
                  <span className="text-slate-400">Connection Strength:</span>
                  <span className="text-white font-bold">{selectedEdge.confidence}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
