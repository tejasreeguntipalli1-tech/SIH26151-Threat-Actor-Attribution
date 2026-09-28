import React, { useEffect, useRef, useState, useMemo } from 'react';
import cytoscape from 'cytoscape';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Search, 
  Filter, 
  Layers, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Key, 
  Server, 
  Globe, 
  User, 
  Users, 
  Sparkles,
  ExternalLink,
  Table,
  Sliders
} from 'lucide-react';
import { initialPairwiseRelationships } from '../../data/syntheticData';
import { PairwiseRelationship } from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';
import { useCase } from '../../context/CaseContext';

interface IdentityNodeData {
  id: string;
  username: string;
  platform: string;
  cluster: string;
  aliases: string[];
  role: string;
  evidenceStrength: number;
  connectedCount: number;
  avatarLetter: string;
  isFocal?: boolean;
}

interface RelationshipGraphViewProps {
  initialTracePath?: boolean;
  onNavigate?: (tabId: string) => void;
}

export const RelationshipGraphView: React.FC<RelationshipGraphViewProps> = () => {
  const { activeCase, selectedClusterId } = useCase();
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core | null>(null);

  // Core Focal Identity Interaction State (Section 6 & 8)
  const [focalIdentityId, setFocalIdentityId] = useState<string>('shadow_x17');
  const [selectedEdgeId, setSelectedEdgeId] = useState<string>('rel-01-02');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvidenceFilter, setSelectedEvidenceFilter] = useState<string>('ALL');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'pairwise' | 'one-to-many' | 'cluster'>('pairwise');

  // Ground-Truth Digital Identities (Section 4 & 5)
  const digitalIdentities: IdentityNodeData[] = useMemo(() => [
    {
      id: 'shadow_x17',
      username: 'shadow_x17',
      platform: 'Forum-X (Dread)',
      cluster: 'Actor Cluster A',
      aliases: ['shadow17', 'x17_root', 'sh4dow_op'],
      role: 'Initial Access Broker / Database Seller',
      evidenceStrength: 92,
      connectedCount: 3,
      avatarLetter: 'S'
    },
    {
      id: 'x_shadow',
      username: 'x_shadow',
      platform: 'Market-Y (XSS Forum)',
      cluster: 'Actor Cluster A',
      aliases: ['x-shadow-sec', 'x_shdw'],
      role: 'Ransomware Access Broker',
      evidenceStrength: 94,
      connectedCount: 3,
      avatarLetter: 'X'
    },
    {
      id: 'darkx17',
      username: 'darkx17',
      platform: 'Chat-Z (BreachForums Mirror)',
      cluster: 'Actor Cluster A',
      aliases: ['dark_17', 'vault17_admin'],
      role: 'Data Leak Publisher & Gateway Operator',
      evidenceStrength: 89,
      connectedCount: 3,
      avatarLetter: 'D'
    },
    {
      id: 'shadow17',
      username: 'shadow17',
      platform: 'Exploit.in & Dev Git Mirror',
      cluster: 'Actor Cluster A',
      aliases: ['x17_dev', 'dev_x17', 'x17-ops'],
      role: 'Exploit Developer & Infrastructure Automation',
      evidenceStrength: 91,
      connectedCount: 3,
      avatarLetter: 'S'
    },
    {
      id: 'user_delta',
      username: 'user_delta',
      platform: 'Telegram Channel / CardBB',
      cluster: 'Actor Cluster B (Peripheral)',
      aliases: ['delta_carder', 'u_delta', 'nm_cards'],
      role: 'Bulk Financial Credentials Vendor',
      evidenceStrength: 42,
      connectedCount: 0,
      avatarLetter: 'U'
    }
  ], []);

  // Preset Layout Coordinates for Clear Visual Spacing (Section 5)
  const identityPositions: Record<string, { x: number; y: number }> = {
    shadow_x17: { x: 380, y: 240 },
    x_shadow:   { x: 170, y: 110 },
    darkx17:    { x: 170, y: 370 },
    shadow17:   { x: 590, y: 120 },
    user_delta: { x: 630, y: 380 },
  };

  // Explicit Data-Backed Relationships (Section 7)
  const pairwiseEdges = useMemo(() => [
    {
      id: 'rel-01-02',
      source: 'shadow_x17',
      target: 'x_shadow',
      relationshipType: 'ACTOR CORRELATION',
      score: 94,
      classification: 'VERY STRONG EVIDENCE',
      evidenceLabel: 'ACTOR CORRELATION // 94%',
      primarySignals: ['Stylometry (--)', 'Username root', 'Temporal r=0.88', 'PGP Key']
    },
    {
      id: 'rel-01-03',
      source: 'shadow_x17',
      target: 'darkx17',
      relationshipType: 'INFRASTRUCTURE LINK',
      score: 88,
      classification: 'STRONG EVIDENCE',
      evidenceLabel: 'INFRASTRUCTURE & OP // 88%',
      primarySignals: ['Reverse Proxy 185.220.101.45', 'Escrow phrasing', 'Double hyphens']
    },
    {
      id: 'rel-04-01',
      source: 'shadow_x17',
      target: 'shadow17',
      relationshipType: 'TECHNICAL INDICATOR',
      score: 91,
      classification: 'VERY STRONG EVIDENCE',
      evidenceLabel: 'DEV MIRROR & PGP // 91%',
      primarySignals: ['Historical alias archive', 'SSH host key reuse', 'Go binary hash']
    },
    {
      id: 'rel-02-03',
      source: 'x_shadow',
      target: 'darkx17',
      relationshipType: 'BEHAVIOURAL SIMILARITY',
      score: 89,
      classification: 'STRONG EVIDENCE',
      evidenceLabel: 'EXPLOIT MONETIZATION // 89%',
      primarySignals: ['12-min publication sequence', 'Shared proxy 185.220.101.45', 'BTC input']
    },
    {
      id: 'rel-03-04',
      source: 'darkx17',
      target: 'shadow17',
      relationshipType: 'INFRASTRUCTURE LINK',
      score: 86,
      classification: 'STRONG EVIDENCE',
      evidenceLabel: 'GATEWAY HOSTING // 86%',
      primarySignals: ['darkx17-vault.is DNS A-record', 'Git commit automation', 'Subkey sig']
    },
    {
      id: 'rel-02-04',
      source: 'x_shadow',
      target: 'shadow17',
      relationshipType: 'BEHAVIOURAL SIMILARITY',
      score: 87,
      classification: 'STRONG EVIDENCE',
      evidenceLabel: 'ESCROW SCRIPTING // 87%',
      primarySignals: ['Escrow automation daemon', 'Multi-sig contract verification']
    }
  ], []);

  // Focal Identity Object
  const focalIdentity = useMemo(() => {
    return digitalIdentities.find(id => id.id === focalIdentityId) || digitalIdentities[0];
  }, [digitalIdentities, focalIdentityId]);

  // Connected identities to focal
  const connectedIdentitiesToFocal = useMemo(() => {
    const connectedIds = new Set<string>();
    pairwiseEdges.forEach(e => {
      if (e.source === focalIdentityId) connectedIds.add(e.target);
      if (e.target === focalIdentityId) connectedIds.add(e.source);
    });
    return digitalIdentities.filter(id => connectedIds.has(id.id));
  }, [pairwiseEdges, focalIdentityId, digitalIdentities]);

  // Active Pairwise Relationship Data for Detailed View (Section 9)
  const activePairwiseData = useMemo(() => {
    // Find matching in initialPairwiseRelationships
    const fromList = initialPairwiseRelationships.find(p => p.id === selectedEdgeId);
    if (fromList) return fromList;

    // Fallback to synthetic relationship
    const foundEdge = pairwiseEdges.find(e => e.id === selectedEdgeId);
    if (!foundEdge) return initialPairwiseRelationships[0];

    return {
      id: foundEdge.id,
      sourceIdentityId: foundEdge.source,
      sourceUsername: foundEdge.source,
      targetIdentityId: foundEdge.target,
      targetUsername: foundEdge.target,
      relationshipType: foundEdge.relationshipType,
      overallScore: foundEdge.score,
      classification: foundEdge.classification as any,
      signals: {
        username: {
          dimension: 'Username',
          score: 92,
          strength: 'Strong',
          observedPattern: "Common stem 'shadow' and numerical suffix '17'",
          explanation: "Levenshtein distance of 3 with 100% lexical root continuity across primary and secondary accounts."
        },
        stylometry: {
          dimension: 'Stylometry',
          score: 92,
          strength: 'Strong',
          observedPattern: "Double-hyphen (--) delimiter habit present in 100% of posts",
          explanation: "Jaccard syntactic similarity index of 0.89 across darknet forum posts."
        },
        behaviour: {
          dimension: 'Behaviour',
          score: 88,
          strength: 'Strong',
          observedPattern: "Escrow enforcement mandatory; 45-minute exploit-to-sale escalation",
          explanation: "Announcements followed within 45 minutes by sales escrow listings on secondary marketplace."
        },
        temporal: {
          dimension: 'Temporal',
          score: 91,
          strength: 'Strong',
          observedPattern: "Diurnal posting window: 20:00–03:00 UTC (Peak: 22:30 UTC)",
          explanation: "Pearson activity correlation coefficient r = 0.88 across 180 monitored days in UTC+03:00."
        },
        technical: {
          dimension: 'Technical',
          score: 96,
          strength: 'Strong',
          observedPattern: "Shared PGP key (0x7E4A8F2C91B4) & reverse proxy 185.220.101.45",
          explanation: "Hard technical anchor: Identical RSA-4096 key signature referenced on profile metadata."
        }
      },
      supportingEvidence: [
        'Shared cryptographic anchor: PGP fingerprint 0x7E4A8F2C91B4 referenced in profiles',
        'Shared reverse-proxy hosting node: IP 185.220.101.45 (Njalla/FlokiNET ASN)',
        'Idiosyncratic double-hyphen (--) punctuation habit present across 100% of post samples',
        'Synchronized diurnal activity window (20:00–03:00 UTC), r = 0.88',
        'Monetization escrow coordination: Leak publication followed within 45 min by marketplace listing'
      ],
      conflictingEvidence: [
        'Distinct darknet browser TLS JA3 fingerprints indicating potential dual-workstation operational setup'
      ],
      unknownEvidence: [
        'Exact hardware MAC address unknown behind virtualized environment',
        'ISP subscriber identity unknown (shielded by multi-hop Tor onion routing)'
      ],
      analystSummary: 'Very high multi-vector correlation. Hard cryptographic anchor corroborated by identical stylometric punctuation quirks and diurnal synchronization confirms unified actor control.'
    } as PairwiseRelationship;
  }, [selectedEdgeId, pairwiseEdges]);

  // Cytoscape Canvas Initialization (Section 12, 13, 14, 15, 16, 17)
  useEffect(() => {
    if (!containerRef.current) return;

    // Filter identities based on search
    const filteredNodes = digitalIdentities.filter(node => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        node.username.toLowerCase().includes(q) ||
        node.platform.toLowerCase().includes(q) ||
        node.aliases.some(a => a.toLowerCase().includes(q))
      );
    });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));

    // Construct Cytoscape elements
    const elements: cytoscape.ElementDefinition[] = [
      // Identity Nodes (Rectangular Professional Cards)
      ...filteredNodes.map(id => ({
        data: {
          id: id.id,
          username: id.username,
          platform: id.platform,
          cluster: id.cluster,
          score: id.evidenceStrength,
          connectedCount: id.connectedCount,
          label: `${id.username}\n${id.platform}\n${id.cluster}`
        },
        position: identityPositions[id.id] || { x: 300, y: 250 },
        classes: id.id === focalIdentityId ? 'focal' : 'neutral'
      })),

      // Pairwise Edges
      ...pairwiseEdges
        .filter(e => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target))
        .map(e => ({
          data: {
            id: e.id,
            source: e.source,
            target: e.target,
            label: e.evidenceLabel,
            score: e.score,
            relType: e.relationshipType
          },
          classes: 'edge-neutral'
        }))
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      boxSelectionEnabled: false,
      autoungrabify: false,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      minZoom: 0.4,
      maxZoom: 2.5,
      layout: {
        name: 'preset',
        fit: true,
        padding: 50
      },
      style: [
        // Base Identity Node (Clean Rectangular Badge Card)
        {
          selector: 'node',
          style: {
            'shape': 'round-rectangle',
            'width': 180,
            'height': 68,
            'background-color': '#12161E',
            'border-color': '#2A3444',
            'border-width': 1.5,
            'color': '#F8FAFC',
            'font-family': 'JetBrains Mono, monospace',
            'font-size': '10px',
            'text-valign': 'center',
            'text-halign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': '160px',
            'line-height': 1.3,
            'padding': '8px',
            'text-margin-y': 0,
            'transition-property': 'background-color, border-color, border-width, opacity',
            'transition-duration': 0.25
          }
        },

        // Focal / Selected Identity Node
        {
          selector: 'node.focal',
          style: {
            'background-color': '#231408',
            'border-color': '#EA580C',
            'border-width': 3.5,
            'color': '#FFEDD5',
            'font-weight': 'bold',
            'opacity': 1,
            'z-index': 100
          }
        },

        // Connected Identity Node
        {
          selector: 'node.connected',
          style: {
            'background-color': '#181E29',
            'border-color': '#F59E0B',
            'border-width': 2,
            'color': '#FFFFFF',
            'opacity': 1,
            'z-index': 90
          }
        },

        // Subdued / Unrelated Identity Node
        {
          selector: 'node.subdued',
          style: {
            'opacity': 0.22,
            'border-color': '#1A202C',
            'z-index': 1
          }
        },

        // Base Edge Style
        {
          selector: 'edge',
          style: {
            'width': 2.5,
            'line-color': '#2A3444',
            'target-arrow-color': '#2A3444',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-family': 'JetBrains Mono, monospace',
            'font-size': '8px',
            'color': '#94A3B8',
            'text-background-opacity': 0.95,
            'text-background-color': '#0D0F12',
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle',
            'opacity': 0.5,
            'transition-property': 'line-color, width, opacity, color',
            'transition-duration': 0.25
          }
        },

        // Focal Active Edges
        {
          selector: 'edge.focal-edge',
          style: {
            'line-color': '#EA580C',
            'target-arrow-color': '#EA580C',
            'width': 3.5,
            'opacity': 1,
            'color': '#FDBA74',
            'font-weight': 'bold',
            'z-index': 50
          }
        },

        // Selected Specific Edge
        {
          selector: 'edge.selected-edge',
          style: {
            'line-color': '#F59E0B',
            'target-arrow-color': '#F59E0B',
            'width': 5,
            'opacity': 1,
            'color': '#FEF08A',
            'font-weight': 'bold',
            'z-index': 60
          }
        },

        // Subdued Edges
        {
          selector: 'edge.subdued-edge',
          style: {
            'opacity': 0.1,
            'z-index': 1
          }
        }
      ]
    });

    // Node Click -> Set Focal Identity (Section 6 & 14)
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const clickedId = node.id();
      setFocalIdentityId(clickedId);

      // Find an edge connected to this node to select as initial pairwise comparison
      const connected = pairwiseEdges.find(e => e.source === clickedId || e.target === clickedId);
      if (connected) {
        setSelectedEdgeId(connected.id);
      }
    });

    // Edge Click -> Set Pairwise Analysis (Section 9 & 14)
    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      const clickedEdgeId = edge.id();
      setSelectedEdgeId(clickedEdgeId);
      setActiveAnalysisTab('pairwise');

      const data = edge.data();
      // Ensure one of the endpoints is focal
      if (data.source !== focalIdentityId && data.target !== focalIdentityId) {
        setFocalIdentityId(data.source);
      }
    });

    // Background Click -> Clear Edge Selection
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        // preserve focal identity but clear edge highlight
      }
    });

    // Zoom listener for percentage display
    cy.on('zoom', () => {
      setZoomLevel(Math.round(cy.zoom() * 100));
    });

    cyRef.current = cy;

    const handleResize = () => {
      if (cyRef.current) {
        cyRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        cy.stop();
        cy.elements().stop();
        cy.destroy();
      } catch (e) {
        // safely ignore teardown
      }
      cyRef.current = null;
    };
  }, [digitalIdentities, pairwiseEdges, searchQuery]);

  // Dynamic Highlight Class Synchronization
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.batch(() => {
      cy.nodes().removeClass('focal connected subdued neutral');
      cy.edges().removeClass('focal-edge selected-edge subdued-edge edge-neutral');

      if (focalIdentityId) {
        const focalNode = cy.$(`node#${focalIdentityId}`);
        focalNode.addClass('focal');

        const connectedEdges = focalNode.connectedEdges();
        connectedEdges.addClass('focal-edge');

        const connectedNodes = connectedEdges.connectedNodes().not(focalNode);
        connectedNodes.addClass('connected');

        cy.nodes().not(focalNode).not(connectedNodes).addClass('subdued');
        cy.edges().not(connectedEdges).addClass('subdued-edge');

        if (selectedEdgeId) {
          cy.$(`edge#${selectedEdgeId}`).addClass('selected-edge');
        }
      } else {
        cy.nodes().addClass('neutral');
        cy.edges().addClass('edge-neutral');
      }
    });
  }, [focalIdentityId, selectedEdgeId]);

  // Toolbar Actions (Section 13 & 18)
  const handleZoomIn = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 1.25);
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 0.8);
    }
  };

  const handleZoom100 = () => {
    if (cyRef.current) {
      cyRef.current.zoom(1.0);
      cyRef.current.center();
    }
  };

  const handleFit = () => {
    if (cyRef.current) {
      cyRef.current.fit(undefined, 40);
    }
  };

  const handleReset = () => {
    setFocalIdentityId('shadow_x17');
    setSelectedEdgeId('rel-01-02');
    setSearchQuery('');
    setSelectedEvidenceFilter('ALL');
    if (cyRef.current) {
      cyRef.current.fit(undefined, 40);
    }
  };

  // Switch focal identity by clicking from connected list (Section 8)
  const handleSelectFocalIdentity = (id: string) => {
    setFocalIdentityId(id);
    const connectedEdge = pairwiseEdges.find(e => 
      (e.source === id && e.target === focalIdentityId) || 
      (e.target === id && e.source === focalIdentityId)
    );
    if (connectedEdge) {
      setSelectedEdgeId(connectedEdge.id);
    }
    if (cyRef.current) {
      const node = cyRef.current.$(`node#${id}`);
      if (node.length > 0) {
        cyRef.current.animate({
          center: { eles: node },
          duration: 300
        });
      }
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header & Investigation Principle */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-6 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#1E2430]">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
                STAGE 1 // RELATIONSHIP GRAPH
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CASE: {activeCase.id}
              </span>
              <span className="text-slate-600 font-mono">|</span>
              <span className="text-xs text-slate-400 font-mono">
                TARGET CLUSTER: <strong className="text-white">Actor Cluster A</strong>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
              <Share2 className="w-6 h-6 text-orange-400" />
              <span>Multi-Identity Investigation & Relationship Graph</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[#0D1016] border border-[#202734] px-3 py-1.5 rounded-lg font-mono text-xs text-slate-300">
            <span className="text-slate-500">CORRELATION CONFIDENCE:</span>
            <span className="text-orange-400 font-bold text-sm">92%</span>
            <ConfidenceBadge band="VERY STRONG EVIDENCE" size="sm" />
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-4xl">
          Interactive actor-relationship exploration workspace. Evaluates whether disparate digital personas across Dread, XSS, BreachForums, and Git mirrors demonstrate evidence-backed correlation to the same underlying threat actor. Click any digital identity node to illuminate its evidentiary network.
        </p>
      </div>

      {/* 2. Compact Graph Toolbar (Section 18) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-3 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Search & Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search identity handle (e.g. shadow_x17, darkx17)..."
              className="w-full bg-[#0D1016] border border-[#222A38] focus:border-orange-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

          <select
            value={selectedEvidenceFilter}
            onChange={(e) => setSelectedEvidenceFilter(e.target.value)}
            className="bg-[#0D1016] border border-[#222A38] text-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
          >
            <option value="ALL">All Relationships</option>
            <option value="VERY_STRONG">Very Strong (&gt;90%)</option>
            <option value="STRONG">Strong (&gt;80%)</option>
          </select>
        </div>

        {/* Right: Graph Zoom Controls (Section 13) */}
        <div className="flex items-center gap-1.5 self-end md:self-auto">
          <button
            onClick={handleZoomOut}
            className="px-2.5 py-1.5 rounded bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-200 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleZoom100}
            className="px-2.5 py-1.5 rounded bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-200 transition-colors font-mono text-[11px]"
            title="Reset Zoom to 100%"
          >
            {zoomLevel}%
          </button>

          <button
            onClick={handleZoomIn}
            className="px-2.5 py-1.5 rounded bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-200 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            onClick={handleFit}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-200 transition-colors text-[11px]"
            title="Fit Graph in Viewport"
          >
            <Maximize2 className="w-3 h-3 text-orange-400" />
            <span>Fit Graph</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-200 transition-colors text-[11px]"
            title="Reset View"
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 3. Main Graph Canvas & Selected Identity Panel (Grid Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* GRAPH CANVAS: Fixed Controlled Viewport Height (Section 12) */}
        <div className="lg:col-span-8 bg-[#0B0E14] border border-[#232A36] rounded-xl overflow-hidden shadow-2xl relative flex flex-col h-[540px]">
          {/* Top Canvas Bar: Active Focal Identity Status Banner */}
          <div className="px-4 py-2.5 bg-[#0F131C] border-b border-[#1E2532] flex items-center justify-between font-mono text-xs z-10 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-slate-400">FOCAL DIGITAL IDENTITY:</span>
              <strong className="text-white bg-[#161C27] px-2 py-0.5 rounded border border-orange-500/40 text-orange-400">
                @{focalIdentity.username}
              </strong>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Click any node to shift focus • Click edge for pairwise analysis
            </span>
          </div>

          {/* Cytoscape Viewport Container: Does not shift or reflow on page scroll */}
          <div className="flex-1 w-full h-full relative">
            <div ref={containerRef} className="w-full h-full" />

            {/* Bottom-left Mini Legend */}
            <div className="absolute bottom-3 left-3 bg-[#0D1016]/90 backdrop-blur-md border border-[#202734] rounded-lg p-2.5 font-mono text-[10px] space-y-1 text-slate-400 pointer-events-none shadow-lg z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-orange-600 border border-orange-400" />
                <span className="text-slate-300">Selected / Focal Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#181E29] border border-amber-400" />
                <span className="text-slate-300">Evidence-Connected Identity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-0.5 bg-orange-500" />
                <span className="text-slate-300">Data-Backed Evidence Edge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-slate-800 opacity-30" />
                <span className="text-slate-500">Subdued Unrelated Persona</span>
              </div>
            </div>
          </div>
        </div>

        {/* SELECTED USER PANEL (Section 8) */}
        <div className="lg:col-span-4 bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  SELECTED DIGITAL IDENTITY
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded">
                FOCAL NODE
              </span>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-3 font-mono text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base font-bold text-white tracking-wide">
                    @{focalIdentity.username}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {focalIdentity.platform}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold text-sm">
                  {focalIdentity.avatarLetter}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#181D26] text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Known Aliases:</span>
                  <span className="text-slate-200 font-sans">{focalIdentity.aliases.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Actor Cluster:</span>
                  <span className="text-orange-400 font-semibold">{focalIdentity.cluster}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Evidence Strength:</span>
                  <span className="text-emerald-400 font-bold">{focalIdentity.evidenceStrength}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Connected Identities:</span>
                  <span className="text-white font-bold">{connectedIdentitiesToFocal.length} personas</span>
                </div>
              </div>
            </div>

            {/* CONNECTED IDENTITIES LIST (Section 8 Prompt Mandated) */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold tracking-wider block">
                CONNECTED IDENTITIES ({connectedIdentitiesToFocal.length}):
              </span>

              {connectedIdentitiesToFocal.length > 0 ? (
                <div className="space-y-1.5">
                  {connectedIdentitiesToFocal.map(conn => (
                    <button
                      key={conn.id}
                      onClick={() => handleSelectFocalIdentity(conn.id)}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#0D1016] hover:bg-[#161C26] border border-[#1E2430] hover:border-orange-500/40 text-left transition-colors font-mono text-xs group"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
                        <div>
                          <div className="font-bold text-white">@{conn.username}</div>
                          <div className="text-[10px] text-slate-500">{conn.platform.split(' ')[0]}</div>
                        </div>
                      </div>
                      <span className="text-orange-400 font-bold text-[11px]">
                        {conn.evidenceStrength}%
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-[#0D1016] border border-[#1E2430] rounded-lg text-xs font-mono text-slate-500 italic text-center">
                  No verified same-actor relationships linked to this persona.
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-[#0D1016] border border-[#1A202C] rounded-lg text-[11px] text-slate-400 font-sans leading-relaxed">
            Clicking any connected identity sets it as the new focal persona, re-illuminating its specific pairwise relationship web across the cluster.
          </div>
        </div>
      </div>

      {/* 4. Multi-Section Analytical Breakdown (Sections 9, 10, 11) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1E2430] bg-[#0E1117] font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveAnalysisTab('pairwise')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeAnalysisTab === 'pairwise'
                ? 'border-orange-500 text-orange-400 bg-[#12161E]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>1. Pairwise Relationship Analysis (One-to-One)</span>
          </button>

          <button
            onClick={() => setActiveAnalysisTab('one-to-many')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeAnalysisTab === 'one-to-many'
                ? 'border-orange-500 text-orange-400 bg-[#12161E]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>2. One-to-Many Actor Relationship Analysis</span>
          </button>

          <button
            onClick={() => setActiveAnalysisTab('cluster')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeAnalysisTab === 'cluster'
                ? 'border-orange-500 text-orange-400 bg-[#12161E]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. Overall Actor Cluster Synthesis</span>
          </button>
        </div>

        {/* TAB 1: PAIRWISE RELATIONSHIP ANALYSIS (Section 9 Prompt Mandated) */}
        {activeAnalysisTab === 'pairwise' && (
          <div className="p-6 space-y-6">
            {/* Pair Heading & Evidence Strength */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  STAGE 1 PAIRWISE FORENSIC INSPECTOR
                </span>
                <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <span>PAIRWISE RELATIONSHIP ANALYSIS:</span>
                  <span className="text-orange-400">
                    @{activePairwiseData.sourceUsername} ↔ @{activePairwiseData.targetUsername}
                  </span>
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-500 uppercase block">Evidence Strength</span>
                  <span className="text-2xl font-black text-orange-400">
                    {activePairwiseData.overallScore}%
                  </span>
                </div>
                <ConfidenceBadge band={activePairwiseData.classification} />
              </div>
            </div>

            {/* The Six Analysis Dimensions (Section 9 Prompt Mandated) */}
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-[#1A202C] pb-2">
                The Six Evidentiary Dimensions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Username / Alias Similarity */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">1. Username / Alias Similarity</span>
                    <span className="text-orange-400 font-bold">{activePairwiseData.signals.username.score}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.username.observedPattern}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.username.explanation}
                    </p>
                  </div>
                </div>

                {/* 2. Stylometry / Writing Style */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">2. Stylometry / Writing Style</span>
                    <span className="text-orange-400 font-bold">{activePairwiseData.signals.stylometry.score}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.stylometry.observedPattern}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.stylometry.explanation}
                    </p>
                  </div>
                </div>

                {/* 3. Behavioural Similarity */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">3. Behavioural Similarity</span>
                    <span className="text-orange-400 font-bold">{activePairwiseData.signals.behaviour.score}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.behaviour.observedPattern}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.behaviour.explanation}
                    </p>
                  </div>
                </div>

                {/* 4. Temporal Activity */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">4. Temporal Activity</span>
                    <span className="text-orange-400 font-bold">{activePairwiseData.signals.temporal.score}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.temporal.observedPattern}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.temporal.explanation}
                    </p>
                  </div>
                </div>

                {/* 5. Technical / Digital Indicators */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">5. Technical / Digital Indicators</span>
                    <span className="text-orange-400 font-bold">{activePairwiseData.signals.technical.score}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.technical.observedPattern}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      {activePairwiseData.signals.technical.explanation}
                    </p>
                  </div>
                </div>

                {/* 6. Infrastructure / Relationship Evidence */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#181D26]">
                    <span className="font-bold text-white">6. Infrastructure / Relationship Evidence</span>
                    <span className="text-orange-400 font-bold">92%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Evidence:</span>
                    <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                      Reverse-proxy routing relay IP 185.220.101.45 co-hosting clearweb gateway mirror darkx17-vault.is.
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase block">Assessment:</span>
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      Staging certificates and backend proxy rules confirm unified infrastructure orchestration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting, Conflicting, Unknown Triage Cards (Section 9 Prompt Mandated) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              {/* Supporting Evidence */}
              <div className="bg-[#09140E] border border-emerald-900/60 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SUPPORTING EVIDENCE ({activePairwiseData.supportingEvidence.length})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                  {activePairwiseData.supportingEvidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conflicting Evidence */}
              <div className="bg-[#170A0A] border border-red-900/60 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CONFLICTING EVIDENCE ({activePairwiseData.conflictingEvidence.length})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                  {activePairwiseData.conflictingEvidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold">✗</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unknown / Missing Evidence */}
              <div className="bg-[#141007] border border-amber-900/60 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
                  <HelpCircle className="w-4 h-4" />
                  <span>UNKNOWN / MISSING EVIDENCE ({activePairwiseData.unknownEvidence.length})</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                  {activePairwiseData.unknownEvidence.map((ev, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">?</span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ONE-TO-MANY ACTOR RELATIONSHIP ANALYSIS (Section 10 Prompt Mandated) */}
        {activeAnalysisTab === 'one-to-many' && (
          <div className="p-6 space-y-6">
            <div className="pb-4 border-b border-[#1E2430]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">
                MULTI-PERSONA CONVERGENCE MATRIX
              </span>
              <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                <span>ONE-TO-MANY ACTOR RELATIONSHIP ANALYSIS</span>
              </h2>
              <div className="flex items-center gap-4 mt-2 font-mono text-xs text-slate-400">
                <div>Focal Identity: <strong className="text-orange-400 font-bold">@{focalIdentity.username}</strong></div>
                <span>|</span>
                <div>Connected Personas: <strong className="text-white font-bold">{connectedIdentitiesToFocal.length}</strong></div>
              </div>
            </div>

            {/* Matrix Table (Section 10 Prompt Example Format) */}
            <div className="overflow-x-auto border border-[#1E2430] rounded-xl bg-[#0D1016]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#141822] text-slate-400 border-b border-[#1E2430]">
                    <th className="p-3 font-bold text-white uppercase text-[11px]">Connected Identity</th>
                    <th className="p-3 font-bold uppercase text-[11px]">Platform</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Username</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Stylometry</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Behaviour</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Temporal</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Technical</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-center">Infrastructure</th>
                    <th className="p-3 font-bold uppercase text-[11px] text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A202C]">
                  {connectedIdentitiesToFocal.map((id) => (
                    <tr key={id.id} className="hover:bg-[#121622] transition-colors">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        <span>@{id.username}</span>
                      </td>
                      <td className="p-3 text-slate-400 font-sans text-[11px]">{id.platform}</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-400 font-bold">✓</td>
                      <td className="p-3 text-right text-orange-400 font-bold text-sm">
                        {id.evidenceStrength}%
                      </td>
                    </tr>
                  ))}
                  {connectedIdentitiesToFocal.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-slate-500 italic">
                        No connected identities for the selected persona.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Narrative Pattern Analysis */}
            <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-5 space-y-2 text-xs font-sans text-slate-300 leading-relaxed">
              <span className="font-mono text-xs font-bold text-orange-400 uppercase tracking-wider block">
                Evidence Co-Occurrence Summary:
              </span>
              <p>
                Cross-identity multi-vector analysis confirms that the primary focal identity <strong className="text-white font-mono">@{focalIdentity.username}</strong> exhibits persistent shared markers across all three associated personas. Specifically, cryptographic PGP key ID 0x7E4A8F2C91B4 and reverse proxy gateway 185.220.101.45 appear in 100% of the active pairwise correlations, corroborated by the idiosyncratic double-hyphen (--) delimiter habit.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: OVERALL ACTOR CLUSTER ANALYSIS (Section 11 Prompt Mandated) */}
        {activeAnalysisTab === 'cluster' && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold block mb-1">
                  MULTI-PERSONA CLUSTER DOSSIER
                </span>
                <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <span>OVERALL ACTOR CLUSTER ANALYSIS:</span>
                  <span className="text-orange-400">Actor Cluster A (TA-001)</span>
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Identities: <span className="text-slate-200">@shadow_x17, @x_shadow, @darkx17, @shadow17</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-500 uppercase block">Cluster Confidence</span>
                  <span className="text-2xl font-black text-orange-400">92%</span>
                </div>
                <ConfidenceBadge band="VERY STRONG EVIDENCE" />
              </div>
            </div>

            {/* Synthesized Narrative Analysis (Section 11 Prompt Mandated) */}
            <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                <FileText className="w-4 h-4 text-orange-400" />
                <span>Analytical Synthesis & Independent Corroboration</span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The selected cluster contains four distinct digital identities operating across multiple darknet marketplaces, leak forums, and development repositories. Rather than computing an arbitrary average of isolated scores, the SPECTRA correlation engine synthesizes repeated signals and independent corroboration:
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-[#141822] border border-[#202734]">
                  <strong className="text-orange-400 block mb-1">1. Hard Cryptographic Collisions (Repeated Signals):</strong>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Identical RSA-4096 PGP key fingerprint (0x7E4A8F2C91B4) verified across Forum-X, Market-Y, Chat-Z, and Exploit.in Git repositories. CoinJoin transaction telemetry establishes co-spend inputs from common SegWit deposit address bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#141822] border border-[#202734]">
                  <strong className="text-orange-400 block mb-1">2. Staging Infrastructure & Operational Precedence:</strong>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Clear-web mirror domain darkx17-vault.is and Dread paste mirrors route through the same reverse-proxy IP (185.220.101.45) hosted on Njalla / FlokiNET. Source code adjustments committed by developer persona @shadow17 precede public database release announcements by darkx17 by 4.2 hours.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#141822] border border-[#202734]">
                  <strong className="text-orange-400 block mb-1">3. Longitudinal Stylometric & Temporal Cohesion:</strong>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Double-hyphen (--) punctuation delimiter present in 100% of post samples and Git commit headers. Activity curves show synchronized diurnal windows (20:00–03:30 UTC, r = 0.88, UTC+03:00 timezone) and an identical multi-week hiatus during December holiday intervals.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E2430] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Threshold Standard: 92% &gt; 80% (Statutory Gate Cleared)</span>
                <span className="text-emerald-400 font-bold">ELIGIBLE FOR STAGE 2 ATTRIBUTION</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelationshipGraphView;
