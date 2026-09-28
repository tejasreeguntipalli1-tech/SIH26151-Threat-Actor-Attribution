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

export const RelationshipGraphView: React.FC<RelationshipGraphViewProps> = ({
  initialTracePath = false,
  onNavigate
}) => {
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

  // Stage 1 vs Stage 2 Mode Switcher & "Why This Candidate?" Traversal (Points 7 & 19)
  const [graphMode, setGraphMode] = useState<'stage1' | 'stage2'>(initialTracePath ? 'stage2' : 'stage1');
  const [isWhyCandidateActive, setIsWhyCandidateActive] = useState<boolean>(initialTracePath);
  const [selectedStage2Edge, setSelectedStage2Edge] = useState<any | null>(null);
  const [stage2AnalysisTab, setStage2AnalysisTab] = useState<'provenance' | 'candidates' | 'contradictions'>('provenance');

  useEffect(() => {
    if (initialTracePath) {
      setGraphMode('stage2');
      setIsWhyCandidateActive(true);
    }
  }, [initialTracePath]);

  // Stage 2 Knowledge Graph Nodes & Edges (Point 7 & Point 19)
  const stage2Nodes = useMemo(() => [
    { id: 'shadow_x17', category: 'identity', label: '@shadow_x17\nForum-X (Dread)\nDigital Persona', x: 80, y: 220 },
    { id: 'pgp_key', category: 'technical', label: 'PGP: 0x7E4A8F2C91B4\nRSA-4096 Keyserver\nCryptographic Anchor', x: 250, y: 140 },
    { id: 'domain_darkx17', category: 'domain', label: 'darkx17-vault.is\nICANN Mirror Domain\nClear-web Gateway', x: 430, y: 140 },
    { id: 'node_185', category: 'infrastructure', label: '185.220.101.45\nFlokiNET Reverse Proxy\nSSL SAN Port 8443', x: 430, y: 310 },
    { id: 'org_vector', category: 'organization', label: 'Vector Systems Ltd.\nAccount #VEC-ENT-410\nCorporate Umbrella', x: 610, y: 140 },
    { id: 'candidate_a', category: 'candidate', label: 'Candidate A: Arun Mehta\nFICTIONAL DEMO ENTITY\n74% Attribution Lead', x: 790, y: 170 },
    { id: 'candidate_b', category: 'candidate', label: 'Candidate B: Rohan Verma\nFICTIONAL DEMO ENTITY\n58% Requires Evidence', x: 790, y: 330 },
    { id: 'org_vortex', category: 'organization', label: 'Vortex Cloud AS49210\nUpstream Peering Subnet\nFrankfurt Colo Facility', x: 610, y: 330 }
  ], []);

  const stage2Edges = useMemo(() => [
    {
      id: 'e-s2-1',
      source: 'shadow_x17',
      target: 'pgp_key',
      label: 'PGP Fingerprint 94%',
      why: 'Published on Dread database leak announcements by shadow_x17',
      evidenceSource: 'OpenPGP SKS Federation Mirror & Dread Post #44912',
      sourceReliability: 'A',
      confidence: 94,
      timestamp: '12 Feb 2026',
      verificationStatus: 'Cross-source verified',
      isInCandidatePath: true
    },
    {
      id: 'e-s2-2',
      source: 'pgp_key',
      target: 'domain_darkx17',
      label: 'Subkey Match 91%',
      why: 'Cross-signed developer commit signature on darkx17 mirror repository',
      evidenceSource: 'OpenPGP Keyserver & Git Commit Signatures',
      sourceReliability: 'A',
      confidence: 91,
      timestamp: '18 Feb 2026',
      verificationStatus: 'Cross-source verified',
      isInCandidatePath: true
    },
    {
      id: 'e-s2-3',
      source: 'domain_darkx17',
      target: 'node_185',
      label: 'DNS A-Record 91%',
      why: 'Historical DNS A-record resolution & SSL SAN cert reuse on port 8443',
      evidenceSource: 'Passive DNS Archive & Shodan SSL Scans',
      sourceReliability: 'A',
      confidence: 91,
      timestamp: '20 Feb 2026',
      verificationStatus: 'Cross-source verified',
      isInCandidatePath: false
    },
    {
      id: 'e-s2-4',
      source: 'domain_darkx17',
      target: 'org_vector',
      label: 'Corporate Billing 88%',
      why: 'Mirror domain registrar account billed under Vector Systems commercial profile',
      evidenceSource: 'Synthetic WHOIS Historical Registrar Database',
      sourceReliability: 'B',
      confidence: 88,
      timestamp: '22 Feb 2026',
      verificationStatus: 'Cross-source verified',
      isInCandidatePath: true
    },
    {
      id: 'e-s2-5',
      source: 'org_vector',
      target: 'candidate_a',
      label: 'Corporate Officer 90%',
      why: 'Corporate directorship & Git commit author linkage for x17_dev moniker',
      evidenceSource: 'UK Companies House #REG-99104 & Developer Registry',
      sourceReliability: 'A',
      confidence: 90,
      timestamp: '24 Feb 2026',
      verificationStatus: 'Cross-source verified',
      isInCandidatePath: true
    },
    {
      id: 'e-s2-6',
      source: 'node_185',
      target: 'org_vortex',
      label: 'BGP Route Transit 58%',
      why: 'Autonomous system AS49210 announced upstream peering routes for proxy node',
      evidenceSource: 'BGP Routing Table & Global Traceroute Graph',
      sourceReliability: 'B',
      confidence: 58,
      timestamp: '22 Feb 2026',
      verificationStatus: 'Single-source unconfirmed',
      isInCandidatePath: false
    },
    {
      id: 'e-s2-7',
      source: 'org_vortex',
      target: 'candidate_b',
      label: 'Systems Admin 58%',
      why: 'Listed systems administrator on customer support ticket #VORTEX-8812',
      evidenceSource: 'Hosting Customer Support Ticket Telemetry',
      sourceReliability: 'B',
      confidence: 58,
      timestamp: '23 Feb 2026',
      verificationStatus: 'Single-source unconfirmed',
      isInCandidatePath: false
    }
  ], []);

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

    // Construct Cytoscape elements depending on Stage 1 vs Stage 2 mode
    const elements: cytoscape.ElementDefinition[] = graphMode === 'stage2'
      ? [
          ...stage2Nodes.map(n => {
            const isHighlighted = ['shadow_x17', 'pgp_key', 'domain_darkx17', 'org_vector', 'candidate_a'].includes(n.id);
            const classes = isWhyCandidateActive 
              ? (isHighlighted ? 'why-highlight' : 'subdued')
              : `stage2-${n.category}`;
            return {
              data: { id: n.id, label: n.label, category: n.category },
              position: { x: n.x, y: n.y },
              classes
            };
          }),
          ...stage2Edges.map(e => {
            const classes = isWhyCandidateActive
              ? (e.isInCandidatePath ? 'why-edge-highlight' : 'subdued-edge')
              : 'edge-neutral';
            return {
              data: { ...e },
              classes
            };
          })
        ]
      : [
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

        // Stage 2 Category Specific Styling
        {
          selector: 'node.stage2-identity',
          style: { 'background-color': '#111927', 'border-color': '#3B82F6', 'border-width': 2.5, 'color': '#93C5FD' }
        },
        {
          selector: 'node.stage2-technical',
          style: { 'background-color': '#1E1428', 'border-color': '#A855F7', 'border-width': 2.5, 'color': '#E9D5FF' }
        },
        {
          selector: 'node.stage2-domain',
          style: { 'background-color': '#0C1E24', 'border-color': '#06B6D4', 'border-width': 2.5, 'color': '#A5F3FC' }
        },
        {
          selector: 'node.stage2-infrastructure',
          style: { 'background-color': '#241A0C', 'border-color': '#F59E0B', 'border-width': 2.5, 'color': '#FDE68A' }
        },
        {
          selector: 'node.stage2-organization',
          style: { 'background-color': '#0C2018', 'border-color': '#10B981', 'border-width': 2.5, 'color': '#A7F3D0' }
        },
        {
          selector: 'node.stage2-candidate',
          style: { 'background-color': '#281308', 'border-color': '#EA580C', 'border-width': 3, 'color': '#FFEDD5', 'font-weight': 'bold' }
        },
        {
          selector: 'node.why-highlight',
          style: { 'background-color': '#381606', 'border-color': '#F97316', 'border-width': 4, 'color': '#FFEDD5', 'font-weight': 'bold', 'z-index': 100 }
        },
        {
          selector: 'edge.why-edge-highlight',
          style: { 'line-color': '#F97316', 'target-arrow-color': '#F97316', 'width': 4.5, 'opacity': 1, 'color': '#FDBA74', 'font-weight': 'bold', 'z-index': 90 }
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
            'opacity': 0.15,
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

      if (graphMode === 'stage2') {
        const connectedEdge = stage2Edges.find(e => e.source === clickedId || e.target === clickedId);
        if (connectedEdge) {
          setSelectedStage2Edge(connectedEdge);
        }
        return;
      }

      setFocalIdentityId(clickedId);

      // Find an edge connected to this node to select as initial pairwise comparison
      const connected = pairwiseEdges.find(e => e.source === clickedId || e.target === clickedId);
      if (connected) {
        setSelectedEdgeId(connected.id);
      }
    });

    // Edge Click -> Set Pairwise Analysis or Stage 2 Inspector (Section 9 & 14)
    cy.on('tap', 'edge', (evt) => {
      const edge = evt.target;
      const data = edge.data();

      if (graphMode === 'stage2') {
        setSelectedStage2Edge(data);
      } else {
        setSelectedEdgeId(edge.id());
        setActiveAnalysisTab('pairwise');

        // Ensure one of the endpoints is focal
        if (data.source !== focalIdentityId && data.target !== focalIdentityId) {
          setFocalIdentityId(data.source);
        }
      }
    });

    // Background Click -> Clear Edge Selection
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        if (graphMode === 'stage2') {
          setSelectedStage2Edge(null);
        }
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
  }, [digitalIdentities, pairwiseEdges, searchQuery, graphMode, isWhyCandidateActive, stage2Nodes, stage2Edges]);

  // Dynamic Highlight Class Synchronization
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    if (graphMode === 'stage2') {
      cy.batch(() => {
        cy.nodes().removeClass('why-highlight subdued neutral focal connected');
        cy.edges().removeClass('why-edge-highlight selected-edge subdued-edge edge-neutral focal-edge');

        if (isWhyCandidateActive) {
          const whyNodeIds = ['shadow_x17', 'pgp_key', 'domain_darkx17', 'org_vector', 'candidate_a'];
          const whyEdgeIds = ['e-s2-1', 'e-s2-2', 'e-s2-4', 'e-s2-5'];

          cy.nodes().forEach(node => {
            if (whyNodeIds.includes(node.id())) {
              node.addClass('why-highlight');
            } else {
              node.addClass('subdued');
            }
          });

          cy.edges().forEach(edge => {
            if (whyEdgeIds.includes(edge.id())) {
              edge.addClass('why-edge-highlight');
            } else {
              edge.addClass('subdued-edge');
            }
          });
        } else {
          cy.nodes().addClass('neutral');
          cy.edges().addClass('edge-neutral');
        }

        if (selectedStage2Edge) {
          cy.$(`edge#${selectedStage2Edge.id}`).addClass('selected-edge');
        }
      });
      return;
    }

    // Stage 1 highlighting
    cy.batch(() => {
      cy.nodes().removeClass('focal connected subdued neutral why-highlight');
      cy.edges().removeClass('focal-edge selected-edge subdued-edge edge-neutral why-edge-highlight');

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
  }, [focalIdentityId, selectedEdgeId, graphMode, isWhyCandidateActive, selectedStage2Edge]);

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
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                graphMode === 'stage1' 
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}>
                {graphMode === 'stage1' ? 'STAGE 1 // PERSONA CORRELATION GRAPH' : 'STAGE 2 // REAL-WORLD KNOWLEDGE GRAPH'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CASE: {activeCase.id}
              </span>
              <span className="text-slate-600 font-mono">|</span>
              <span className="text-xs text-slate-400 font-mono">
                TARGET: <strong className="text-white">DarkWolf Cluster (TA-001)</strong>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-mono">
              <Share2 className="w-6 h-6 text-orange-400" />
              <span>
                {graphMode === 'stage1' 
                  ? 'Multi-Identity Investigation & Relationship Graph' 
                  : 'Real-World Entity Attribution & Provenance Knowledge Graph'}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {graphMode === 'stage1' ? (
              <div className="flex items-center gap-2 bg-[#0D1016] border border-[#202734] px-3 py-1.5 rounded-lg font-mono text-xs text-slate-300">
                <span className="text-slate-500">CORRELATION CONFIDENCE:</span>
                <span className="text-orange-400 font-bold text-sm">91%</span>
                <ConfidenceBadge band="VERY STRONG EVIDENCE" size="sm" />
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-[#0D1016] border border-[#202734] px-3 py-1.5 rounded-lg font-mono text-xs text-slate-300">
                <span className="text-slate-500">ATTRIBUTION CONFIDENCE:</span>
                <span className="text-orange-400 font-bold text-sm">74%</span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded border border-orange-500/40">
                  PROBABLE CANDIDATE
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-4xl">
          {graphMode === 'stage1' ? (
            'Interactive actor-relationship exploration workspace. Evaluates whether disparate digital personas across Dread, XSS, BreachForums, and Git mirrors demonstrate evidence-backed correlation to the same underlying threat actor cluster. Click any persona node to illuminate its pairwise network.'
          ) : (
            'Multi-hop identity-link resolution and chain-of-custody knowledge graph. Traces correlated digital personas through cryptographic keys, domain mirrors, hosting infrastructure, and corporate registries to evidence-backed real-world entity candidates. Click any link to inspect provenance, source reliability, and verification status.'
          )}
        </p>
      </div>

      {/* 2. Compact Graph Toolbar (Section 18 & Point 7) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-3 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
        {/* Left: Mode Switcher & "Why This Candidate?" Traversal Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#0D1016] p-1 rounded-lg border border-[#222A38]">
            <button
              onClick={() => { setGraphMode('stage1'); setIsWhyCandidateActive(false); setSelectedStage2Edge(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                graphMode === 'stage1'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-[#161C26]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Stage 1: Personas</span>
            </button>
            <button
              onClick={() => { setGraphMode('stage2'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                graphMode === 'stage2'
                  ? 'bg-cyan-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-[#161C26]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Stage 2: Real-World Graph</span>
            </button>
          </div>

          {graphMode === 'stage2' && (
            <button
              onClick={() => {
                const nextState = !isWhyCandidateActive;
                setIsWhyCandidateActive(nextState);
                if (nextState) {
                  const firstPathEdge = stage2Edges.find(e => e.id === 'e-s2-1');
                  if (firstPathEdge) setSelectedStage2Edge(firstPathEdge);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                isWhyCandidateActive
                  ? 'bg-orange-500/25 text-orange-200 border-orange-500 shadow-lg shadow-orange-500/20 font-bold'
                  : 'bg-[#161C26] text-slate-300 border-[#2A3444] hover:border-orange-500/50 hover:text-white'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isWhyCandidateActive ? 'text-orange-400 animate-spin' : 'text-slate-400'}`} />
              <span>{isWhyCandidateActive ? 'ACTIVE: CANDIDATE PATH (ARUN MEHTA)' : 'WHY THIS CANDIDATE? (ARUN MEHTA)'}</span>
            </button>
          )}

          {graphMode === 'stage1' && (
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search persona handle..."
                className="w-full bg-[#0D1016] border border-[#222A38] focus:border-orange-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          )}
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
          {/* Top Canvas Bar: Active Mode Banner */}
          <div className="px-4 py-2.5 bg-[#0F131C] border-b border-[#1E2532] flex items-center justify-between font-mono text-xs z-10 flex-shrink-0">
            {graphMode === 'stage1' ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-slate-400">FOCAL DIGITAL IDENTITY:</span>
                <strong className="text-white bg-[#161C27] px-2 py-0.5 rounded border border-orange-500/40 text-orange-400">
                  @{focalIdentity.username}
                </strong>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-slate-400">STAGE 2 KNOWLEDGE GRAPH:</span>
                <strong className="text-white bg-[#161C27] px-2 py-0.5 rounded border border-cyan-500/40 text-cyan-300">
                  DarkWolf Cluster → Entity Candidates
                </strong>
                {isWhyCandidateActive && (
                  <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded border border-orange-500/40 font-bold hidden sm:inline">
                    PATH ACTIVE: ARUN MEHTA (74%)
                  </span>
                )}
              </div>
            )}
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {graphMode === 'stage1'
                ? 'Click any node to shift focus • Click edge for pairwise analysis'
                : 'Click any edge to inspect provenance & reliability • Click nodes to view entity'}
            </span>
          </div>

          {/* Cytoscape Viewport Container: Does not shift or reflow on page scroll */}
          <div className="flex-1 w-full h-full relative">
            <div ref={containerRef} className="w-full h-full" />

            {/* Bottom-left Mini Legend */}
            <div className="absolute bottom-3 left-3 bg-[#0D1016]/95 backdrop-blur-md border border-[#202734] rounded-lg p-2.5 font-mono text-[10px] space-y-1 text-slate-400 pointer-events-none shadow-lg z-10">
              {graphMode === 'stage1' ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-orange-600 border border-orange-400" />
                    <span className="text-slate-300">Selected / Focal Persona</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#181E29] border border-amber-400" />
                    <span className="text-slate-300">Evidence-Connected Persona</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-0.5 bg-orange-500" />
                    <span className="text-slate-300">Data-Backed Evidence Edge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-slate-800 opacity-30" />
                    <span className="text-slate-500">Subdued Unrelated Persona</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#111927] border border-blue-500" />
                    <span className="text-slate-300">Digital Persona</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#1E1428] border border-purple-500" />
                    <span className="text-slate-300">Technical Anchor (PGP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#0C1E24] border border-cyan-500" />
                    <span className="text-slate-300">Clear-web Domain Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#0C2018] border border-emerald-500" />
                    <span className="text-slate-300">Organization / Corporate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded bg-[#281308] border border-orange-500" />
                    <span className="text-orange-300 font-bold">Real-World Entity Candidate</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: STAGE 1 IDENTITY OR STAGE 2 PROVENANCE INSPECTOR */}
        <div className="lg:col-span-4 bg-[#12161E] border border-[#232A36] rounded-xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          {graphMode === 'stage2' ? (
            selectedStage2Edge ? (
              /* Stage 2 Selected Edge Provenance Inspector */
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-white uppercase tracking-wider">
                      EDGE PROVENANCE INSPECTOR
                    </h3>
                  </div>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">
                    {selectedStage2Edge.confidence}% CONFIDENCE
                  </span>
                </div>

                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">RELATIONSHIP LINK</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                      {selectedStage2Edge.id}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white tracking-wide">
                    {selectedStage2Edge.label}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300 font-mono">
                    <span className="text-orange-400 font-bold">{selectedStage2Edge.source}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-emerald-400 font-bold">{selectedStage2Edge.target}</span>
                  </div>

                  <div className="pt-2 border-t border-[#181D26] space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500">Source Reliability:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        selectedStage2Edge.sourceReliability === 'A'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        GRADE {selectedStage2Edge.sourceReliability} [{selectedStage2Edge.sourceReliability === 'A' ? 'Completely Reliable' : 'Usually Reliable'}]
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500">Verification Status:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{selectedStage2Edge.verificationStatus}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500">Observed Timestamp:</span>
                      <span className="text-slate-300">{selectedStage2Edge.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Why this link exists */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    WHY THIS LINK EXISTS:
                  </span>
                  <div className="p-3 bg-[#0D1016] border border-[#1E2430] rounded-lg text-slate-200 font-sans text-xs leading-relaxed">
                    {selectedStage2Edge.why}
                  </div>
                </div>

                {/* Evidence Source */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    EVIDENCE PROVENANCE & CUSTODY:
                  </span>
                  <div className="p-2.5 bg-[#0D1016] border border-[#1E2430] rounded-lg text-slate-300 font-mono text-[11px] flex items-center justify-between">
                    <span>{selectedStage2Edge.evidenceSource}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </div>
                </div>

                {selectedStage2Edge.isInCandidatePath && (
                  <div className="p-2.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-[11px] text-orange-300 font-sans flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span>This hop forms part of the primary evidence chain to <strong>Candidate A: Arun Mehta (74%)</strong>.</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedStage2Edge(null)}
                  className="w-full py-2 rounded-lg bg-[#161C26] hover:bg-[#202736] border border-[#263040] text-slate-300 text-xs font-mono transition-colors"
                >
                  ← Deselect Edge & View Candidate Summary
                </button>
              </div>
            ) : (
              /* Stage 2 Candidate Overview & Traversal Summary */
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2430]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-400" />
                    <h3 className="font-bold text-white uppercase tracking-wider">
                      STAGE 2 ENTITY RESOLUTION
                    </h3>
                  </div>
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1.5 py-0.5 rounded font-bold">
                    74% LEAD CONFIDENCE
                  </span>
                </div>

                {/* Lead Candidate Badge */}
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">
                        Arun Mehta
                      </div>
                      <div className="text-[10px] text-orange-400 font-mono mt-0.5">
                        FICTIONAL DEMO ENTITY // LEAD CANDIDATE
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-sans">
                        Managing Director & Shareholder (Vector Systems Ltd.)
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-orange-400">74%</span>
                      <div className="text-[9px] text-slate-500 uppercase font-mono">Attribution</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#181D26] space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Corporate Shell:</span>
                      <span className="text-slate-200">Vector Systems Ltd. (UK #REG-99104)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Root Corroboration:</span>
                      <span className="text-emerald-400 font-bold">6 Independent Feeds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Evidentiary Hops:</span>
                      <span className="text-white font-bold">4 Verified Hops</span>
                    </div>
                  </div>
                </div>

                {/* 5-Hop Trail to Inspect */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    CLICK TO INSPECT HOP PROVENANCE:
                  </span>
                  <div className="space-y-1.5">
                    {stage2Edges.filter(e => e.isInCandidatePath).map((edge, idx) => (
                      <button
                        key={edge.id}
                        onClick={() => setSelectedStage2Edge(edge)}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-[#0D1016] hover:bg-[#161C26] border border-[#1E2430] hover:border-orange-500/40 text-left transition-colors text-[11px] group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded bg-[#1A2230] text-slate-400 flex items-center justify-center text-[10px] font-bold group-hover:text-orange-400">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="text-slate-200 font-bold">{edge.label}</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-[160px]">{edge.evidenceSource.split(' ')[0]}</div>
                          </div>
                        </div>
                        <span className="text-orange-400 font-bold">{edge.confidence}%</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsWhyCandidateActive(!isWhyCandidateActive)}
                  className="w-full py-2.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 hover:border-orange-500 text-orange-300 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>{isWhyCandidateActive ? 'Reset Graph Highlight' : 'Illuminate Attribution Chain'}</span>
                </button>
              </div>
            )
          ) : (
            /* Stage 1 Existing Selected Digital Identity */
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
          )}

          <div className="p-3 bg-[#0D1016] border border-[#1A202C] rounded-lg text-[11px] text-slate-400 font-sans leading-relaxed">
            {graphMode === 'stage2'
              ? 'Clicking any multi-hop edge in the graph or sidebar exposes chain-of-custody metadata, source credibility ratings, and verification status.'
              : 'Clicking any connected identity sets it as the new focal persona, re-illuminating its specific pairwise relationship web across the cluster.'}
          </div>
        </div>
      </div>

      {/* 4. Multi-Section Analytical Breakdown (Sections 9, 10, 11) */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1E2430] bg-[#0E1117] font-mono text-xs overflow-x-auto">
          {graphMode === 'stage1' ? (
            <>
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
            </>
          ) : (
            <>
              <button
                onClick={() => setStage2AnalysisTab('provenance')}
                className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
                  stage2AnalysisTab === 'provenance'
                    ? 'border-cyan-500 text-cyan-400 bg-[#12161E]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>1. Multi-Hop Identity-Link Registry (7 Links)</span>
              </button>

              <button
                onClick={() => setStage2AnalysisTab('candidates')}
                className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
                  stage2AnalysisTab === 'candidates'
                    ? 'border-cyan-500 text-cyan-400 bg-[#12161E]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Table className="w-4 h-4" />
                <span>2. Candidate Resolution Matrix (3 Entities)</span>
              </button>

              <button
                onClick={() => setStage2AnalysisTab('contradictions')}
                className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-bold transition-colors whitespace-nowrap ${
                  stage2AnalysisTab === 'contradictions'
                    ? 'border-cyan-500 text-cyan-400 bg-[#12161E]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>3. Contradiction Analysis & Temporal Conflict</span>
              </button>
            </>
          )}
        </div>

        {/* STAGE 1 CONTENT */}
        {graphMode === 'stage1' && (
          <>
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
                <span>Threshold Standard: 91% &gt; 80% (Statutory Gate Cleared)</span>
                <span className="text-emerald-400 font-bold">ELIGIBLE FOR STAGE 2 ATTRIBUTION</span>
              </div>
            </div>
          </div>
        )}
          </>
        )}

        {/* STAGE 2 CONTENT */}
        {graphMode === 'stage2' && (
          <>
            {/* TAB 1: STAGE 2 PROVENANCE REGISTRY */}
            {stage2AnalysisTab === 'provenance' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                      STAGE 2 CHAIN-OF-CUSTODY REGISTRY
                    </span>
                    <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-cyan-400" />
                      <span>MULTI-HOP IDENTITY-LINK EVIDENCE TRAIL</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 bg-[#0D1016] border border-[#202734] px-3 py-1.5 rounded-lg font-mono text-xs">
                    <span className="text-slate-500">ATTRIBUTION LEAD:</span>
                    <span className="text-orange-400 font-bold">Arun Mehta (74%)</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#1E2430]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-[#0E121A] text-slate-400 border-b border-[#1E2430]">
                      <tr>
                        <th className="p-3">HOP ID</th>
                        <th className="p-3">SOURCE ENTITY</th>
                        <th className="p-3">TARGET ENTITY</th>
                        <th className="p-3">RELATIONSHIP LINK</th>
                        <th className="p-3 text-center">CONFIDENCE</th>
                        <th className="p-3 text-center">RELIABILITY</th>
                        <th className="p-3">STATUS</th>
                        <th className="p-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A202C] bg-[#0A0D14]">
                      {stage2Edges.map(edge => (
                        <tr 
                          key={edge.id}
                          className={`hover:bg-[#121620] transition-colors ${
                            selectedStage2Edge?.id === edge.id ? 'bg-[#182030]' : ''
                          }`}
                        >
                          <td className="p-3 text-cyan-400 font-bold">{edge.id}</td>
                          <td className="p-3 text-white font-bold">{edge.source}</td>
                          <td className="p-3 text-slate-300">{edge.target}</td>
                          <td className="p-3 text-slate-200">
                            <div>{edge.label}</div>
                            <div className="text-[10px] text-slate-500 font-sans">{edge.why}</div>
                          </td>
                          <td className="p-3 text-center">
                            <span className="font-bold text-orange-400">{edge.confidence}%</span>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              edge.sourceReliability === 'A' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            }`}>
                              GRADE {edge.sourceReliability}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`text-[11px] font-bold flex items-center gap-1 ${
                              edge.verificationStatus.includes('Cross-source') 
                                ? 'text-emerald-400' 
                                : 'text-amber-400'
                            }`}>
                              {edge.verificationStatus.includes('Cross-source') ? (
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              ) : (
                                <AlertTriangle className="w-3.5 h-3.5" />
                              )}
                              <span>{edge.verificationStatus}</span>
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedStage2Edge(edge);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="px-2.5 py-1 rounded bg-[#161C26] hover:bg-[#222B3A] border border-[#263040] text-slate-200 text-[11px] transition-colors"
                            >
                              Inspect Hop
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl flex items-start gap-3 text-xs font-sans text-slate-300">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-mono block mb-1">Chain-of-Custody Verification Principle:</strong>
                    Each identity link represents an independently logged evidentiary record with verifiable cryptographic or documentary proof. Candidate A (Arun Mehta) is supported by a 4-hop chain with 6 independent corroborating sources, satisfying the threshold for formal investigative escalation.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CANDIDATE RESOLUTION MATRIX */}
            {stage2AnalysisTab === 'candidates' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                      REAL-WORLD ENTITY CANDIDATES
                    </span>
                    <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                      <Table className="w-5 h-5 text-cyan-400" />
                      <span>CANDIDATE RESOLUTION & ATTRIBUTION MATRIX</span>
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    EVALUATED CANDIDATES: <strong className="text-white">3 ENTITIES</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
                  {/* Candidate A */}
                  <div className="bg-[#0D1016] border-2 border-orange-500/60 rounded-xl p-5 space-y-4 relative shadow-xl shadow-orange-500/5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded border border-orange-500/40">
                        PRIMARY LEAD
                      </span>
                      <span className="text-xl font-black text-orange-400">74%</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">Arun Mehta</h3>
                      <div className="text-[10px] text-orange-400 font-mono">FICTIONAL DEMO ENTITY</div>
                      <p className="text-slate-400 font-sans text-xs mt-1">
                        Managing Director & 100% Shareholder, Vector Systems Ltd. (UK #REG-99104).
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#1E2430] text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Identified Via:</span>
                        <span className="text-slate-200">PGP Key 0x7E4A8F2C91B4 → Git Moniker x17_dev → UK Companies House</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Independent Feeds:</span>
                        <span className="text-emerald-400 font-bold">6 Distinct Roots (11 Derived)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Evidentiary Gaps:</span>
                        <span className="text-amber-400 font-sans text-[11px]">Physical keystroke attribution pending lawful device seizure; remote VPN jump observed.</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#141A24] rounded-lg border border-[#202736] text-[11px] font-sans text-slate-300">
                      Recommendation: Issue formal evidentiary preservation request under statutory attribution protocols.
                    </div>
                  </div>

                  {/* Candidate B */}
                  <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-slate-800 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-700">
                        SECONDARY LEAD
                      </span>
                      <span className="text-xl font-black text-slate-400">58%</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">Rohan Verma</h3>
                      <div className="text-[10px] text-slate-500 font-mono">FICTIONAL DEMO ENTITY</div>
                      <p className="text-slate-400 font-sans text-xs mt-1">
                        Systems Administrator, Vortex Cloud AS49210 (Frankfurt colo facility).
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#1E2430] text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Identified Via:</span>
                        <span className="text-slate-200">Proxy Node 185.220.101.45 → Support Ticket #VORTEX-8812</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Independent Feeds:</span>
                        <span className="text-slate-300">1 Single Feed (Hosting Provider)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Evidentiary Gaps:</span>
                        <span className="text-amber-400 font-sans text-[11px]">Zero stylometric, cryptographic, or monetary overlap with DarkWolf personas.</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#141A24] rounded-lg border border-[#202736] text-[11px] font-sans text-slate-400">
                      Assessment: Likely technical systems contractor or hosting provider collateral; insufficient attribution basis.
                    </div>
                  </div>

                  {/* Candidate C */}
                  <div className="bg-[#0D1016] border border-[#1E2430] rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                        INFRASTRUCTURE UMBRELLA
                      </span>
                      <span className="text-xl font-black text-emerald-400">62%</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">Vector Systems Ltd.</h3>
                      <div className="text-[10px] text-emerald-400 font-mono">FICTIONAL DEMO ORGANIZATION</div>
                      <p className="text-slate-400 font-sans text-xs mt-1">
                        Commercial software consultancy registered in London, UK (#REG-99104).
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#1E2430] text-[11px]">
                      <div>
                        <span className="text-slate-500 block">Identified Via:</span>
                        <span className="text-slate-200">darkx17-vault.is ICANN WHOIS Commercial Billing Profile</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Independent Feeds:</span>
                        <span className="text-slate-300">2 Independent Feeds (Registrar + Registry)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Evidentiary Gaps:</span>
                        <span className="text-amber-400 font-sans text-[11px]">Entity is a corporate persona; individual keyboard culpability requires director-level resolution.</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#141A24] rounded-lg border border-[#202736] text-[11px] font-sans text-slate-300">
                      Assessment: Confirmed operational corporate vehicle used for domain gateway billing and server procurement.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONTRADICTIONS & TEMPORAL CONFLICT */}
            {stage2AnalysisTab === 'contradictions' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2430]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                      CONTRADICTION & NEGATIVE HYPOTHESIS TESTING
                    </span>
                    <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span>INVESTIGATIVE SAFEGUARDS & CONFLICT AUDIT</span>
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    TESTED HYPOTHESES: <strong className="text-white">10 ALTERNATIVES</strong>
                  </span>
                </div>

                {/* Critical Conflict Banner */}
                <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-5 space-y-3 font-mono">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>HIGH-SEVERITY TEMPORAL IMPOSSIBILITY DETECTED (65-SECOND SPREAD)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                    <div className="p-3 bg-[#0D1016] rounded-lg border border-red-500/30">
                      <span className="text-slate-400 block font-mono text-[10px]">EVENT A (FORUM LOGIN):</span>
                      <strong className="text-white font-mono">14:32:10 UTC — Bengaluru, India (UTC+05:30)</strong>
                      <p className="text-slate-400 text-[11px] mt-1">Direct ISP session telemetry observed on forum credentials portal.</p>
                    </div>
                    <div className="p-3 bg-[#0D1016] rounded-lg border border-red-500/30">
                      <span className="text-slate-400 block font-mono text-[10px]">EVENT B (GIT COMMIT PUSH):</span>
                      <strong className="text-white font-mono">14:33:15 UTC — Frankfurt, Germany (UTC+01:00)</strong>
                      <p className="text-slate-400 text-[11px] mt-1">SSH git commit push signed by subkey through Frankfurt proxy datacenter.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#0D1016] rounded-lg border border-[#1E2430] text-[11px] text-amber-300 font-sans">
                    <strong>Forensic Deductive Finding:</strong> Physical travel across 6,800 kilometers in 65 seconds is physically impossible. This conclusively proves the actor was operating through a remote proxy node or an automated deployment script, protecting investigators against naive single-location false attribution.
                  </div>
                </div>

                {/* 4 Tested Hypotheses */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Hypothesis 1: Stolen / Leaked Cryptographic PGP Key</span>
                      <span className="text-emerald-400 font-bold">REBUTTED (Low Probability)</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      Continuous, unbroken 18-month signature timeline without key revocation certificate; consistent commit styling and PGP subkey generation habits corroborate single authentic owner.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Hypothesis 2: Multi-Operator Threat Group Cell</span>
                      <span className="text-orange-400 font-bold">PARTIALLY PLAUSIBLE (Dual Setup)</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      While distinct browser TLS JA3 fingerprints suggest potential dual-workstation operations, identical double-hyphen (--) delimiter habits and synchronized diurnal windows (r = 0.88) confirm unified core operational leadership.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Hypothesis 3: Cloud Infrastructure Compromise (Innocent Proxy)</span>
                      <span className="text-emerald-400 font-bold">REBUTTED (Low Probability)</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      Vector Systems Ltd. maintained uninterrupted corporate card payments and recurring registrar renewals for darkx17-vault.is over 9 consecutive months, inconsistent with an unmonitored transient hijack.
                    </p>
                  </div>

                  <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Hypothesis 4: Deliberate False Flag / Frame-Up</span>
                      <span className="text-emerald-400 font-bold">REBUTTED (Low Probability)</span>
                    </div>
                    <p className="text-slate-300 font-sans text-xs leading-relaxed">
                      PGP subkey cross-signing and developer commit author timestamps precede the first public darknet leak activities by 6 months, ruling out retroactive framing by a hostile party.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#0D1016] border border-[#1E2430] rounded-xl flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Evidentiary Standard: Synthesized Confidence 74% &lt; 90% (Subpoena Standard Cleared)</span>
                  <span className="text-orange-400 font-bold">PROBABLE CANDIDATE FOR LAWFUL INQUIRY</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RelationshipGraphView;
