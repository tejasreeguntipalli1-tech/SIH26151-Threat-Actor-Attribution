import React, { useEffect, useRef, useState, useMemo } from 'react';
import cytoscape from 'cytoscape';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
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
  Search,
  ExternalLink,
  ChevronRight,
  Boxes,
  Activity,
  Layers,
  FileText,
  Lock,
  GitMerge
} from 'lucide-react';
import { 
  initialPairwiseRelationships, 
  getPairwiseRelationship,
  syntheticIdentities,
  initialActorClusters 
} from '../../data/syntheticData';
import { PairwiseRelationship } from '../../types/investigation';
import { ConfidenceBadge } from '../common/ConfidenceBadge';

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
  identityLetter?: 'A' | 'B' | 'C' | 'D';
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

  // Selection states
  const [selectedNode, setSelectedNode] = useState<GraphNodeData | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<any | null>(null);
  const [selectedPairwise, setSelectedPairwise] = useState<PairwiseRelationship | null>(null);
  const [showOverallActorModal, setShowOverallActorModal] = useState<boolean>(false);

  // Graph Layout & Search
  const [activeLayout, setActiveLayout] = useState<'concentric' | 'cose' | 'circle'>('concentric');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Trace Investigation Path Mode
  const [isPathTraceActive, setIsPathTraceActive] = useState<boolean>(initialTracePath);
  const [activePathStepIndex, setActivePathStepIndex] = useState<number | null>(null);

  // Filter dropdowns
  const [selectedEvidenceType, setSelectedEvidenceType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Investigation path steps for attribution traversal
  const investigationPathSteps = useMemo(() => [
    { id: 'candidate_a', label: 'Candidate Entity A', role: 'Real-World Organization', detail: 'Meridian Analytics S.R.O. (Subject A. K.)' },
    { id: 'intel_record_102', label: 'Intel Record: alex-k-sec', role: 'Developer Attribution', detail: 'Public Git commits & SSH comments matching mirror scripts' },
    { id: 'domain_vault', label: 'Domain: darkx17-vault.is', role: 'Domain Registrar', detail: 'A-record with Let\'s Encrypt SSL cert pointing to proxy IP' },
    { id: 'infra_node_17', label: 'Infra-Node-17 (185.220.101.45)', role: 'Infrastructure Host', detail: 'Bulletproof reverse proxy server on Njalla / FlokiNET' },
    { id: 'actor_cluster_a', label: 'Actor Cluster A (TA-001)', role: 'Probable Digital Actor', detail: 'Central Cluster synthesizing 4 correlated handles (92% Confidence)' },
    { id: 'shadow_x17', label: 'A: shadow_x17', role: 'Digital Handle', detail: 'Dread forum initial access broker & escrow operator' }
  ], []);

  const pathNodeIds = useMemo(() => new Set(investigationPathSteps.map(s => s.id)), [investigationPathSteps]);
  const pathEdgeIds = useMemo(() => new Set(['e15', 'e14', 'e12', 'e11', 'e-star-1']), []);

  // Complete Graph Elements Definition
  const elementsData: cytoscape.ElementsDefinition = useMemo(() => ({
    nodes: [
      // Central Actor Node
      { 
        data: { 
          id: 'actor_cluster_a', 
          label: 'ACTOR CLUSTER A (TA-001)', 
          type: 'Actor Cluster', 
          group: 'Digital Actor Evidence', 
          confidence: 92, 
          status: 'SUPPORTING', 
          details: 'Central Probable Threat Actor Cluster synthesizing 4 correlated digital identities (shadow_x17, x_shadow, darkx17, x17_dev) with 92% Evidence Strength.', 
          connectedCount: 8, 
          provenance: 'Stage 1 Multi-Signal Correlation Engine' 
        } 
      },
      
      // 4 Digital Identities (A, B, C, D)
      { 
        data: { 
          id: 'shadow_x17', 
          label: 'A: shadow_x17', 
          identityLetter: 'A',
          type: 'Digital Identity', 
          group: 'Digital Actor Evidence', 
          confidence: 94, 
          status: 'SUPPORTING', 
          details: 'Forum-X (Dread) initial access broker handle. Known for leak announcements and escrow broker activity.', 
          connectedCount: 5, 
          provenance: 'Stage 1 Ingestion: Dread Forum' 
        } 
      },
      { 
        data: { 
          id: 'x_shadow', 
          label: 'B: x_shadow', 
          identityLetter: 'B',
          type: 'Digital Identity', 
          group: 'Digital Actor Evidence', 
          confidence: 92, 
          status: 'SUPPORTING', 
          details: 'Market-Y (XSS Forum) access seller persona. Coordinated escrow listings within 45 mins of leak threads.', 
          connectedCount: 4, 
          provenance: 'Stage 1 Ingestion: XSS Marketplace' 
        } 
      },
      { 
        data: { 
          id: 'darkx17', 
          label: 'C: darkx17', 
          identityLetter: 'C',
          type: 'Digital Identity', 
          group: 'Digital Actor Evidence', 
          confidence: 91, 
          status: 'SUPPORTING', 
          details: 'Chat-Z (BreachForums mirror) data leak publisher and staging mirror deployer.', 
          connectedCount: 5, 
          provenance: 'Stage 1 Ingestion: BreachForums Mirror' 
        } 
      },
      { 
        data: { 
          id: 'x17_dev', 
          label: 'D: x17_dev', 
          identityLetter: 'D',
          type: 'Digital Identity', 
          group: 'Digital Actor Evidence', 
          confidence: 88, 
          status: 'SUPPORTING', 
          details: 'Developer persona observed in clearweb Git repo and exploit author comments. Source of hardened proxy toolchain.', 
          connectedCount: 4, 
          provenance: 'Stage 1 Ingestion: Developer Repository' 
        } 
      },

      // Shared Stage 1 Forensic Indicators
      { 
        data: { 
          id: 'pgp_key', 
          label: 'PGP: 0x7E4A8F2C91B4', 
          type: 'Technical Indicator', 
          group: 'Digital Actor Evidence', 
          confidence: 98, 
          status: 'SUPPORTING', 
          details: 'RSA-4096 cryptographic public key shared directly between shadow_x17 and x_shadow.', 
          connectedCount: 2, 
          provenance: 'OpenPGP SKS Keyserver' 
        } 
      },
      { 
        data: { 
          id: 'syntax_hyphen', 
          label: 'Syntax: Double-Hyphen (--)', 
          type: 'Stylometric Indicator', 
          group: 'Digital Actor Evidence', 
          confidence: 92, 
          status: 'SUPPORTING', 
          details: 'Idiosyncratic punctuation habit in 100% of analyzed forum posts across all identities.', 
          connectedCount: 4, 
          provenance: 'Stylometry NLP Extraction Engine' 
        } 
      },

      // Stage 2 Real-World Infrastructure & Attribution Nodes
      { 
        data: { 
          id: 'infra_node_17', 
          label: 'Infra-Node-17 (185.220.101.45)', 
          type: 'Infrastructure', 
          group: 'Real-World Entity Evidence', 
          confidence: 90, 
          status: 'SUPPORTING', 
          details: 'Reverse proxy server on Njalla / FlokiNET hosting mirror gateway darkx17-vault.is.', 
          connectedCount: 4, 
          provenance: 'Passive DNS & Routing Feed' 
        } 
      },
      { 
        data: { 
          id: 'domain_vault', 
          label: 'Domain: darkx17-vault.is', 
          type: 'Domain', 
          group: 'Real-World Entity Evidence', 
          confidence: 92, 
          status: 'SUPPORTING', 
          details: 'Clear-web DNS A-record pointing to 185.220.101.45 with Let\'s Encrypt staging SSL certificate.', 
          connectedCount: 3, 
          provenance: 'Registrar WHOIS & Certificate Transparency' 
        } 
      },
      { 
        data: { 
          id: 'intel_record_102', 
          label: 'Intel Record: "alex-k-sec"', 
          type: 'Intelligence Record', 
          group: 'Real-World Entity Evidence', 
          confidence: 85, 
          status: 'SUPPORTING', 
          details: 'Public Git commit author and SSH deployment comments matching mirror scripts.', 
          connectedCount: 2, 
          provenance: 'Developer Commits Archive' 
        } 
      },
      { 
        data: { 
          id: 'candidate_a', 
          label: 'CANDIDATE ENTITY A (Meridian S.R.O.)', 
          type: 'Candidate Entity', 
          group: 'Real-World Entity Evidence', 
          confidence: 82, 
          status: 'SUPPORTING', 
          details: 'Corporate entity Meridian Analytics S.R.O. (Subject A. K.) — Corporate registrant of staging mirror domain.', 
          connectedCount: 3, 
          provenance: 'Stage 2 Entity Resolution Engine' 
        } 
      },
      { 
        data: { 
          id: 'candidate_b', 
          label: 'Candidate Entity B (Vortex Cloud)', 
          type: 'Candidate Entity', 
          group: 'Real-World Entity Evidence', 
          confidence: 67, 
          status: 'CONFLICTING', 
          details: 'Bulletproof hosting leaseholder (Secondary Alternative Hypothesis). Contradicted by ASN route telemetry.', 
          connectedCount: 1, 
          provenance: 'Stage 2 Entity Resolution Engine' 
        } 
      }
    ],
    edges: [
      // Star Edges: Actor Cluster A -> Member Identities
      { data: { id: 'e-star-1', source: 'actor_cluster_a', target: 'shadow_x17', label: 'CLUSTER_MEMBER', relation: 'Cluster Member', type: 'Actor Cluster Link', status: 'SUPPORTING', confidence: 'Very Strong', weight: 4 } },
      { data: { id: 'e-star-2', source: 'actor_cluster_a', target: 'x_shadow', label: 'CLUSTER_MEMBER', relation: 'Cluster Member', type: 'Actor Cluster Link', status: 'SUPPORTING', confidence: 'Very Strong', weight: 4 } },
      { data: { id: 'e-star-3', source: 'actor_cluster_a', target: 'darkx17', label: 'CLUSTER_MEMBER', relation: 'Cluster Member', type: 'Actor Cluster Link', status: 'SUPPORTING', confidence: 'Very Strong', weight: 4 } },
      { data: { id: 'e-star-4', source: 'actor_cluster_a', target: 'x17_dev', label: 'CLUSTER_MEMBER', relation: 'Cluster Member', type: 'Actor Cluster Link', status: 'SUPPORTING', confidence: 'Very Strong', weight: 4 } },

      // EXPLICIT PAIRWISE EDGES BETWEEN IDENTITIES
      { 
        data: { 
          id: 'rel-01-02', 
          source: 'shadow_x17', 
          target: 'x_shadow', 
          label: 'A ↔ B: 94% SAME_ACTOR', 
          relation: 'Pairwise Correlation (94%)', 
          type: 'Pairwise Correlation', 
          status: 'SUPPORTING', 
          confidence: 'Strong', 
          weight: 5,
          pairwiseId: 'rel-01-02'
        } 
      },
      { 
        data: { 
          id: 'rel-02-03', 
          source: 'x_shadow', 
          target: 'darkx17', 
          label: 'B ↔ C: 89% INFRA_LINK', 
          relation: 'Infrastructure & Operational Linkage (89%)', 
          type: 'Pairwise Correlation', 
          status: 'SUPPORTING', 
          confidence: 'Strong', 
          weight: 4,
          pairwiseId: 'rel-02-03'
        } 
      },
      { 
        data: { 
          id: 'rel-03-04', 
          source: 'darkx17', 
          target: 'x17_dev', 
          label: 'C ↔ D: 86% CODE_HANDOVER', 
          relation: 'Codebase & Development Origin (86%)', 
          type: 'Pairwise Correlation', 
          status: 'SUPPORTING', 
          confidence: 'Strong', 
          weight: 4,
          pairwiseId: 'rel-03-04'
        } 
      },
      { 
        data: { 
          id: 'rel-04-01', 
          source: 'x17_dev', 
          target: 'shadow_x17', 
          label: 'D ↔ A: 91% PERSONA_HERITAGE', 
          relation: 'Historical Persona & SSH Heritage (91%)', 
          type: 'Pairwise Correlation', 
          status: 'SUPPORTING', 
          confidence: 'Strong', 
          weight: 5,
          pairwiseId: 'rel-04-01'
        } 
      },
      { 
        data: { 
          id: 'rel-01-03', 
          source: 'shadow_x17', 
          target: 'darkx17', 
          label: 'A ↔ C: 88% SYNDICATED_MIRROR', 
          relation: 'Syndicated Distribution & Mirroring (88%)', 
          type: 'Pairwise Correlation', 
          status: 'SUPPORTING', 
          confidence: 'Strong', 
          weight: 4,
          pairwiseId: 'rel-01-03'
        } 
      },

      // Shared Indicator Edges
      { data: { id: 'e-pgp-1', source: 'shadow_x17', target: 'pgp_key', label: 'SHARED_PGP', relation: 'Cryptographic Key Anchor', type: 'Technical', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e-pgp-2', source: 'x_shadow', target: 'pgp_key', label: 'SHARED_PGP', relation: 'Cryptographic Key Anchor', type: 'Technical', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e-syn-1', source: 'shadow_x17', target: 'syntax_hyphen', label: 'STYLO_MATCH', relation: 'Double-Hyphen Delimiter', type: 'Stylometric', status: 'SUPPORTING', confidence: 'Strong', weight: 2 } },
      { data: { id: 'e-syn-2', source: 'x_shadow', target: 'syntax_hyphen', label: 'STYLO_MATCH', relation: 'Double-Hyphen Delimiter', type: 'Stylometric', status: 'SUPPORTING', confidence: 'Strong', weight: 2 } },
      { data: { id: 'e-syn-3', source: 'darkx17', target: 'syntax_hyphen', label: 'STYLO_MATCH', relation: 'Double-Hyphen Delimiter', type: 'Stylometric', status: 'SUPPORTING', confidence: 'Strong', weight: 2 } },
      { data: { id: 'e-syn-4', source: 'x17_dev', target: 'syntax_hyphen', label: 'STYLO_MATCH', relation: 'Double-Hyphen Delimiter', type: 'Stylometric', status: 'SUPPORTING', confidence: 'Strong', weight: 2 } },

      // Stage 2 Cross-Stage Handoff Edges
      { data: { id: 'e11', source: 'actor_cluster_a', target: 'infra_node_17', label: 'HISTORICALLY_LINKED', relation: 'Infrastructure Attribution', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e12', source: 'infra_node_17', target: 'domain_vault', label: 'HOSTS_GATEWAY', relation: 'Hosting Infrastructure', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e13', source: 'darkx17', target: 'domain_vault', label: 'PUBLISHES_MIRROR', relation: 'Mirror Deployment', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 3 } },
      { data: { id: 'e14', source: 'domain_vault', target: 'intel_record_102', label: 'MATCHED_WITH', relation: 'Registrar WHOIS Link', type: 'Public Intelligence', status: 'SUPPORTING', confidence: 'Moderate', weight: 3 } },
      { data: { id: 'e15', source: 'intel_record_102', target: 'candidate_a', label: 'SUPPORTS', relation: 'Developer Entity Attribution', type: 'Public Intelligence', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e16', source: 'infra_node_17', target: 'candidate_a', label: 'SUPPORTS', relation: 'Infrastructure Ownership', type: 'Infrastructure', status: 'SUPPORTING', confidence: 'Strong', weight: 4 } },
      { data: { id: 'e17', source: 'infra_node_17', target: 'candidate_b', label: 'CONFLICTS_WITH', relation: 'Secondary Hypothesis Conflict', type: 'Infrastructure', status: 'CONFLICTING', confidence: 'Weak', weight: 2 } }
    ]
  }), []);

  // Filter elements based on UI state
  const filteredElements = useMemo(() => {
    let nodes = elementsData.nodes;
    let edges = elementsData.edges;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter(n => 
        n.data.label.toLowerCase().includes(q) || 
        n.data.type.toLowerCase().includes(q) ||
        (n.data.details && n.data.details.toLowerCase().includes(q))
      );
    }

    if (!isPathTraceActive) {
      if (selectedEvidenceType !== 'ALL') {
        nodes = nodes.filter(n => n.data.type.toLowerCase().includes(selectedEvidenceType.toLowerCase()));
      }
      if (selectedStatus !== 'ALL') {
        nodes = nodes.filter(n => n.data.status === selectedStatus);
      }
    }

    const activeNodeIds = new Set(nodes.map(n => n.data.id));
    edges = edges.filter(e => activeNodeIds.has(e.data.source) && activeNodeIds.has(e.data.target));

    return { nodes, edges };
  }, [elementsData, searchQuery, isPathTraceActive, selectedEvidenceType, selectedStatus]);

  // Initialize and update Cytoscape
  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: filteredElements,
      style: [
        // Base Node Style
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'font-family': 'monospace',
            'font-size': '10px',
            'font-weight': 'bold',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'color': '#F8FAFC',
            'background-color': '#16191E',
            'border-width': 2,
            'border-color': '#333D4E',
            'width': 38,
            'height': 38,
            'text-background-opacity': 0.85,
            'text-background-color': '#0D0F12',
            'text-background-padding': '3px',
            'text-background-shape': 'roundrectangle'
          }
        },

        // Central Actor Cluster Node
        {
          selector: 'node[type = "Actor Cluster"]',
          style: {
            'shape': 'hexagon',
            'width': 60,
            'height': 60,
            'background-color': '#78350F',
            'border-color': '#F59E0B',
            'border-width': 4,
            'color': '#FEF3C7',
            'font-size': '11px',
            'text-background-color': '#451A03'
          }
        },

        // Digital Identities (A, B, C, D)
        {
          selector: 'node[type = "Digital Identity"]',
          style: {
            'shape': 'ellipse',
            'width': 44,
            'height': 44,
            'background-color': '#1C1917',
            'border-color': '#EA580C',
            'border-width': 3,
            'color': '#FFEDD5',
            'font-size': '10px'
          }
        },

        // Shared Indicators
        {
          selector: 'node[type = "Technical Indicator"], node[type = "Stylometric Indicator"]',
          style: {
            'shape': 'diamond',
            'width': 32,
            'height': 32,
            'background-color': '#1E293B',
            'border-color': '#64748B',
            'border-width': 2,
            'color': '#94A3B8'
          }
        },

        // Real-World Candidate Entities
        {
          selector: 'node[type = "Candidate Entity"]',
          style: {
            'shape': 'round-rectangle',
            'width': 54,
            'height': 54,
            'background-color': '#164E63',
            'border-color': '#06B6D4',
            'border-width': 3,
            'color': '#CFFAFE'
          }
        },

        // Infrastructure & Domain
        {
          selector: 'node[type = "Infrastructure"], node[type = "Domain"], node[type = "Intelligence Record"]',
          style: {
            'shape': 'round-rectangle',
            'width': 36,
            'height': 36,
            'background-color': '#2E1065',
            'border-color': '#A855F7',
            'border-width': 2,
            'color': '#E9D5FF'
          }
        },

        // Base Edge Style
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': '#333D4E',
            'target-arrow-color': '#333D4E',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-family': 'monospace',
            'font-size': '8px',
            'color': '#94A3B8',
            'text-background-opacity': 0.85,
            'text-background-color': '#0D0F12',
            'text-background-padding': '2px'
          }
        },

        // Pairwise Correlation Edges between Identities
        {
          selector: 'edge[type = "Pairwise Correlation"]',
          style: {
            'line-color': '#EA580C',
            'target-arrow-color': '#EA580C',
            'width': 4,
            'color': '#FDBA74',
            'font-weight': 'bold',
            'line-style': 'solid'
          }
        },

        // Cluster Membership Edges
        {
          selector: 'edge[label = "CLUSTER_MEMBER"]',
          style: {
            'line-color': '#F59E0B',
            'target-arrow-color': '#F59E0B',
            'line-style': 'dashed',
            'width': 2.5,
            'color': '#FDE68A'
          }
        },

        // Conflicting Edges
        {
          selector: 'edge[status = "CONFLICTING"]',
          style: {
            'line-color': '#EF4444',
            'target-arrow-color': '#EF4444',
            'line-style': 'dashed',
            'color': '#FCA5A5'
          }
        },

        // Selection Highlights
        {
          selector: 'node:selected',
          style: {
            'border-width': 5,
            'border-color': '#F59E0B',
            'border-opacity': 1
          }
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#EA580C',
            'target-arrow-color': '#EA580C',
            'width': 5
          }
        },

        // Investigation Path Tracing
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
              'border-color': '#F59E0B',
              'background-color': '#78350F',
              'color': '#FFFFFF'
            }
          })),
          ...Array.from(pathEdgeIds).map(id => ({
            selector: `edge#${id}`,
            style: {
              'opacity': 1,
              'text-opacity': 1,
              'line-color': '#EA580C',
              'target-arrow-color': '#EA580C',
              'width': 5,
              'color': '#FDBA74'
            }
          }))
        ] : [])
      ],
      layout: activeLayout === 'concentric' ? {
        name: 'concentric',
        concentric: (node: any) => {
          if (node.id() === 'actor_cluster_a') return 3;
          if (['shadow_x17', 'x_shadow', 'darkx17', 'x17_dev'].includes(node.id())) return 2;
          return 1;
        },
        levelWidth: () => 1,
        padding: 50,
        animate: true,
        animationDuration: 400
      } : {
        name: activeLayout,
        animate: true,
        animationDuration: 400,
        padding: 40
      }
    });

    // Event Handlers
    cy.on('tap', 'node', (evt) => {
      const data = evt.target.data();
      setSelectedNode(data);
      setSelectedEdge(null);
      setSelectedPairwise(null);

      const stepIdx = investigationPathSteps.findIndex(s => s.id === data.id);
      setActivePathStepIndex(stepIdx >= 0 ? stepIdx : null);
    });

    cy.on('tap', 'edge', (evt) => {
      const data = evt.target.data();
      setSelectedEdge(data);
      setSelectedNode(null);

      // Check if this edge is a pairwise relationship
      if (data.pairwiseId) {
        const pw = initialPairwiseRelationships.find(p => p.id === data.pairwiseId);
        if (pw) {
          setSelectedPairwise(pw);
        }
      } else {
        setSelectedPairwise(null);
      }
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
        setSelectedEdge(null);
        setSelectedPairwise(null);
        setActivePathStepIndex(null);
      }
    });

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
      try {
        cy.stop();
        cy.elements().stop();
        cy.destroy();
      } catch (e) {
        // Gracefully ignore unmount frame errors
      }
      cyRef.current = null;
    };
  }, [filteredElements, activeLayout, isPathTraceActive, pathNodeIds, pathEdgeIds, investigationPathSteps]);

  // Toolbar Actions
  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleFit = () => cyRef.current?.fit(undefined, 30);
  const handleReset = () => {
    setSelectedEvidenceType('ALL');
    setSelectedStatus('ALL');
    setSearchQuery('');
    setActiveLayout('concentric');
    setIsPathTraceActive(false);
    setActivePathStepIndex(null);
    setSelectedNode(null);
    setSelectedEdge(null);
    setSelectedPairwise(null);
    cyRef.current?.fit();
  };

  const handleSelectPairwise = (relId: string) => {
    const pw = initialPairwiseRelationships.find(p => p.id === relId);
    if (!pw) return;
    setSelectedPairwise(pw);
    setSelectedNode(null);
    setSelectedEdge(null);

    // Highlight edge in graph
    if (cyRef.current) {
      const edge = cyRef.current.$(`edge#${relId}`);
      if (edge && edge.length > 0) {
        cyRef.current.animate({
          center: { eles: edge },
          zoom: 1.3
        }, { duration: 400 });
      }
    }
  };

  const handleSelectPathStep = (index: number) => {
    setActivePathStepIndex(index);
    const step = investigationPathSteps[index];
    if (!step || !cyRef.current) return;

    const node = cyRef.current.$(`node#${step.id}`);
    if (node && node.length > 0) {
      cyRef.current.animate({
        center: { eles: node },
        zoom: 1.4
      }, { duration: 400 });
      setSelectedNode(node.data());
      setSelectedEdge(null);
      setSelectedPairwise(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Interactive Toolbar */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
              ACTOR-CENTERED TOPOLOGY
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              ACTOR CLUSTER A &bull; 4 DIGITAL IDENTITIES &bull; PAIRWISE EVIDENCE
            </span>
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Share2 className="w-5 h-5 text-orange-400" />
            <span>Actor Relationship & Evidence Graph</span>
          </h1>
        </div>

        {/* Action Buttons & Modals */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Overall Actor Analysis Button */}
          <button
            onClick={() => setShowOverallActorModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600/90 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-orange-950/50"
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Overall Actor Analysis</span>
          </button>

          {/* Trace Investigation Path Toggle */}
          <button
            onClick={() => {
              setIsPathTraceActive(!isPathTraceActive);
              if (!isPathTraceActive) {
                setActivePathStepIndex(0);
              } else {
                setActivePathStepIndex(null);
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
              isPathTraceActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/60'
                : 'bg-[#181D26] hover:bg-[#222936] text-slate-300 border-[#2A3342]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPathTraceActive ? 'text-amber-400 animate-spin' : 'text-slate-400'}`} />
            <span>Trace Path</span>
          </button>

          {/* Layout Switcher */}
          <div className="flex items-center bg-[#0D1016] border border-[#202734] rounded-lg p-1 text-xs font-mono">
            <span className="text-slate-500 px-1.5 text-[10px] uppercase">Layout:</span>
            {(['concentric', 'cose', 'circle'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setActiveLayout(l)}
                className={`px-2 py-0.5 rounded capitalize transition-colors text-[11px] ${
                  activeLayout === l 
                    ? 'bg-orange-600 text-white font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l === 'concentric' ? 'Actor-Center' : l}
              </button>
            ))}
          </div>

          {/* Zoom & Fit */}
          <div className="flex items-center bg-[#0D1016] border border-[#202734] rounded-lg p-1">
            <button onClick={handleZoomIn} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181D26]" title="Zoom In">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleZoomOut} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181D26]" title="Zoom Out">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleFit} className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#181D26]" title="Fit Viewport">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={handleReset} className="p-1.5 text-orange-400 hover:text-orange-300 rounded hover:bg-[#181D26]" title="Reset Graph">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Pairwise Selector Strip */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-xl p-3 flex items-center justify-between gap-3 text-xs font-mono overflow-x-auto">
        <div className="flex items-center gap-2 flex-shrink-0">
          <GitMerge className="w-4 h-4 text-orange-400" />
          <span className="text-slate-300 font-bold uppercase text-[11px]">Pairwise Relationships:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {initialPairwiseRelationships.map((pw) => {
            const isSelected = selectedPairwise?.id === pw.id;
            return (
              <button
                key={pw.id}
                onClick={() => handleSelectPairwise(pw.id)}
                className={`px-2.5 py-1 rounded border text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/60 ring-1 ring-orange-500 font-bold'
                    : 'bg-[#0D1016] text-slate-400 border-[#202734] hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>@{pw.sourceUsername} &harr; @{pw.targetUsername}</span>
                <span className="px-1 py-0.2 rounded bg-orange-950 text-orange-400 font-bold text-[10px]">
                  {pw.overallScore}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Path Trace Stepper (Visible during Trace Mode) */}
      {isPathTraceActive && (
        <div className="bg-[#0D1016] border-2 border-orange-500/50 rounded-xl p-3.5 space-y-2 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-400 animate-spin" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Attribution Path Traversal: Candidate Entity A &rarr; Digital Identity
              </span>
            </div>
            <span className="text-[10px] font-mono text-orange-300">
              CLICK ANY STEP TO FOCUS GRAPH
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-1">
            {investigationPathSteps.map((step, idx) => {
              const isActiveStep = activePathStepIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectPathStep(idx)}
                  className={`text-left p-2 rounded-lg border transition-all flex flex-col justify-between ${
                    isActiveStep
                      ? 'bg-orange-950/80 border-orange-400 ring-1 ring-orange-400 text-white shadow-lg shadow-orange-950/50'
                      : 'bg-[#12161E] border-[#202734] hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pb-1 border-b border-[#1E2430] mb-1">
                    <span>STEP {idx + 1}</span>
                    <span className="text-orange-400 truncate max-w-[70px]">{step.role}</span>
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

      {/* Search & Filter Bar */}
      <div className="bg-[#12161E] border border-[#232A36] rounded-lg p-2.5 flex items-center justify-between gap-3 text-xs font-mono flex-wrap">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search nodes or indicators (e.g. shadow, PGP, 185.220)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1016] border border-[#202734] rounded px-2.5 py-1 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-3 h-3 text-orange-400" />
            <span className="text-[10px] uppercase font-semibold">Filter:</span>
          </div>

          <select
            value={selectedEvidenceType}
            onChange={(e) => setSelectedEvidenceType(e.target.value)}
            className="bg-[#0D1016] border border-[#202734] rounded px-2 py-1 text-slate-300 focus:outline-none text-xs"
          >
            <option value="ALL">All Node Types</option>
            <option value="Actor">Actor Cluster</option>
            <option value="Identity">Digital Identities</option>
            <option value="Technical">Technical Indicators</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Candidate">Candidate Entities</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#0D1016] border border-[#202734] rounded px-2 py-1 text-slate-300 focus:outline-none text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUPPORTING">Supporting</option>
            <option value="CONFLICTING">Conflicting</option>
          </select>
        </div>
      </div>

      {/* Main Graph Grid: Canvas + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Cytoscape Canvas Container (min-height 580px) */}
        <div className={`relative bg-[#090C12] border border-[#202734] rounded-xl overflow-hidden min-h-[580px] h-[580px] ${
          selectedNode || selectedEdge || selectedPairwise ? 'lg:col-span-7' : 'lg:col-span-12'
        }`}>
          <div ref={containerRef} className="w-full h-full min-h-[580px]" />

          {/* Graph Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#0D1016]/95 backdrop-blur-sm border border-[#202734] rounded-lg p-3 text-[10px] font-mono text-slate-300 space-y-1.5 shadow-xl pointer-events-none">
            <div className="font-bold text-slate-400 uppercase tracking-wider border-b border-[#1E2430] pb-1">
              Actor Topology Legend
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block border border-amber-300" />
              <span>Center: Actor Cluster A (92%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block border border-orange-300" />
              <span>Digital Identities (A, B, C, D)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-0.5 bg-orange-500 inline-block" />
              <span>Pairwise Correlation Edge (5 Signals)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-cyan-500 inline-block" />
              <span>Stage 2 Real-World Entities & Infra</span>
            </div>
          </div>
        </div>

        {/* Dedicated Inspector Drawer */}
        {(selectedNode || selectedEdge || selectedPairwise) && (
          <div className="lg:col-span-5 bg-[#12161E] border border-[#232A36] rounded-xl p-5 space-y-4 shadow-xl font-mono text-xs max-h-[580px] overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#1E2430]">
              <div>
                <span className="text-[10px] uppercase bg-[#0D1016] text-orange-400 px-2 py-0.5 rounded border border-[#202734] font-bold">
                  {selectedPairwise 
                    ? 'PAIRWISE RELATIONSHIP ANALYSIS' 
                    : selectedNode?.id === 'actor_cluster_a'
                      ? 'ACTOR CLUSTER ANALYSIS'
                      : selectedNode 
                        ? `${selectedNode.type.toUpperCase()}`
                        : 'RELATIONSHIP EDGE'}
                </span>
                <h2 className="text-sm font-bold text-white mt-1.5">
                  {selectedPairwise 
                    ? `@${selectedPairwise.sourceUsername} ↔ @${selectedPairwise.targetUsername}`
                    : selectedNode 
                      ? selectedNode.label 
                      : `${selectedEdge.source} → ${selectedEdge.target}`}
                </h2>
              </div>
              <button 
                onClick={() => { setSelectedNode(null); setSelectedEdge(null); setSelectedPairwise(null); }}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#181D26]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CASE 1: PAIRWISE RELATIONSHIP ANALYSIS PANEL */}
            {selectedPairwise && (
              <div className="space-y-4">
                {/* Score & Classification Header */}
                <div className="bg-[#0D1016] border border-orange-500/40 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Overall Pairwise Score</span>
                    <span className="text-2xl font-black text-orange-400">{selectedPairwise.overallScore}%</span>
                  </div>
                  <div className="text-right">
                    <ConfidenceBadge band={selectedPairwise.classification} size="sm" />
                    <span className="text-[10px] text-slate-400 block mt-1">{selectedPairwise.relationshipType}</span>
                  </div>
                </div>

                {/* 5-Signal Breakdown */}
                <div className="space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    5-Signal Correlation Breakdown
                  </div>

                  {Object.entries(selectedPairwise.signals).map(([key, signal]) => (
                    <div key={key} className="bg-[#0D1016] border border-[#1E2430] rounded-lg p-2.5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">{signal.dimension}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold ${
                            signal.score >= 90 ? 'text-emerald-400' : signal.score >= 80 ? 'text-orange-400' : 'text-amber-400'
                          }`}>
                            {signal.strength} ({signal.score}%)
                          </span>
                        </div>
                      </div>
                      <div className="text-[11px] text-orange-300/90 font-mono">
                        Pattern: {signal.observedPattern}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        {signal.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Supporting & Conflicting Evidence Lists */}
                <div className="space-y-2 pt-1 border-t border-[#1E2430]">
                  <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Supporting Evidence ({selectedPairwise.supportingEvidence.length})</span>
                  </div>
                  <ul className="space-y-1">
                    {selectedPairwise.supportingEvidence.map((item, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 font-sans bg-[#0D1016] p-2 rounded border border-[#1E2430] leading-relaxed">
                        &bull; {item}
                      </li>
                    ))}
                  </ul>

                  {selectedPairwise.conflictingEvidence.length > 0 && (
                    <>
                      <div className="text-[10px] text-red-400 uppercase font-bold tracking-wider pt-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Conflicting Evidence ({selectedPairwise.conflictingEvidence.length})</span>
                      </div>
                      <ul className="space-y-1">
                        {selectedPairwise.conflictingEvidence.map((item, idx) => (
                          <li key={idx} className="text-[11px] text-red-300 font-sans bg-[#0D1016] p-2 rounded border border-red-900/40 leading-relaxed">
                            &bull; {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Analyst Forensic Summary */}
                <div className="bg-[#0D1016] border border-orange-500/30 rounded-lg p-3 space-y-1">
                  <div className="text-[10px] text-orange-400 uppercase font-bold">Investigator Synthesis:</div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {selectedPairwise.analystSummary}
                  </p>
                </div>
              </div>
            )}

            {/* CASE 2: ACTOR CLUSTER A CLICKED */}
            {selectedNode && selectedNode.id === 'actor_cluster_a' && !selectedPairwise && (
              <div className="space-y-4">
                <div className="bg-[#0D1016] border border-amber-500/40 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Cluster Correlation Score</span>
                    <span className="text-2xl font-black text-amber-400">92%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      VERY STRONG EVIDENCE
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Stage 2 Eligible (&gt;80%)</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Interrelated Digital Identities (4 Personas):
                  </span>
                  <div className="space-y-1.5">
                    {syntheticIdentities.slice(0, 4).map((id) => (
                      <div key={id.id} className="bg-[#0D1016] border border-[#1E2430] p-2.5 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-white font-bold">@{id.username}</span>
                          <span className="text-slate-500 text-[10px] block font-sans">{id.platform}</span>
                        </div>
                        <button
                          onClick={() => {
                            const pw = initialPairwiseRelationships.find(p => p.sourceIdentityId === id.id || p.targetIdentityId === id.id);
                            if (pw) handleSelectPairwise(pw.id);
                          }}
                          className="px-2 py-1 rounded bg-[#181D26] hover:bg-[#202734] text-orange-400 text-[10px] font-mono border border-[#27303E]"
                        >
                          View Pairwise &rarr;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setShowOverallActorModal(true)}
                    className="w-full py-2.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-950/60"
                  >
                    <Boxes className="w-4 h-4" />
                    <span>View Overall Actor Analysis</span>
                  </button>

                  <button
                    onClick={() => onNavigate && onNavigate('stage2')}
                    className="w-full py-2 px-3 rounded-lg bg-[#181D26] hover:bg-[#222936] text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-[#2A3342]"
                  >
                    <span>Proceed to Stage 2 Attribution</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                  </button>
                </div>
              </div>
            )}

            {/* CASE 3: INDIVIDUAL IDENTITY NODE CLICKED */}
            {selectedNode && selectedNode.type === 'Digital Identity' && selectedNode.id !== 'actor_cluster_a' && !selectedPairwise && (
              <div className="space-y-4">
                <div className="bg-[#0D1016] border border-[#1E2430] rounded-lg p-3 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>PLATFORM // CONTEXT</span>
                    <span className="text-orange-400 font-bold">IDENTITY {selectedNode.identityLetter}</span>
                  </div>
                  <p className="text-white text-xs font-sans font-semibold">
                    {selectedNode.details}
                  </p>
                </div>

                {/* Connected Pairwise Links */}
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1.5">
                    Connected Pairwise Relationships:
                  </span>
                  <div className="space-y-1.5">
                    {initialPairwiseRelationships
                      .filter(p => p.sourceIdentityId === selectedNode.id || p.targetIdentityId === selectedNode.id)
                      .map((pw) => {
                        const otherUsername = pw.sourceIdentityId === selectedNode.id ? pw.targetUsername : pw.sourceUsername;
                        return (
                          <button
                            key={pw.id}
                            onClick={() => handleSelectPairwise(pw.id)}
                            className="w-full text-left p-2.5 rounded-lg bg-[#0D1016] border border-[#1E2430] hover:border-orange-500/50 transition-colors flex items-center justify-between"
                          >
                            <div>
                              <span className="text-slate-200 font-bold">@{otherUsername}</span>
                              <span className="text-[10px] text-slate-500 block">{pw.relationshipType}</span>
                            </div>
                            <span className="text-orange-400 font-bold bg-orange-950 px-2 py-0.5 rounded text-[11px]">
                              {pw.overallScore}% &rarr;
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div className="bg-[#0D1016] p-2.5 rounded border border-[#1E2430] text-[11px] text-slate-400">
                  <span className="text-slate-500 text-[10px] block uppercase">Provenance Origin:</span>
                  <span>{selectedNode.provenance}</span>
                </div>
              </div>
            )}

            {/* CASE 4: OTHER NODES (Stage 2, Technical) */}
            {selectedNode && selectedNode.type !== 'Digital Identity' && selectedNode.id !== 'actor_cluster_a' && !selectedPairwise && (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#0D1016] p-2 rounded border border-[#1E2430]">
                  <span className="text-slate-400">Node Type:</span>
                  <span className="text-white font-bold">{selectedNode.type}</span>
                </div>

                {selectedNode.confidence !== undefined && (
                  <div className="flex justify-between items-center bg-[#0D1016] p-2 rounded border border-[#1E2430]">
                    <span className="text-slate-400">Evidence Strength:</span>
                    <span className="text-orange-400 font-bold">{selectedNode.confidence}%</span>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-semibold mb-1">
                    Forensic Telemetry:
                  </span>
                  <p className="bg-[#0D1016] border border-[#1E2430] rounded p-2.5 text-slate-200 text-xs font-sans leading-relaxed">
                    {selectedNode.details}
                  </p>
                </div>

                <div className="bg-[#0D1016] p-2.5 rounded border border-[#1E2430] text-slate-300 text-[11px]">
                  <span className="text-slate-500 text-[10px] block uppercase">Provenance:</span>
                  <span>{selectedNode.provenance || 'Correlated Investigation Pipeline'}</span>
                </div>

                {selectedNode.group === 'Real-World Entity Evidence' && (
                  <button
                    onClick={() => onNavigate && onNavigate('stage2')}
                    className="w-full py-2 px-3 rounded bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View in Stage 2 Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* OVERALL ACTOR ANALYSIS MODAL */}
      {showOverallActorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#12161E] border-2 border-orange-500/60 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#232A36] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded border border-orange-500/30">
                    STAGE 1 SYNTHESIS DOSSIER
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    EVALUATION TARGET: ACTOR CLUSTER A (TA-001)
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Overall Actor Analysis & Multi-Signal Synthesis
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Independent multi-vector correlation across 4 digital personas: @shadow_x17, @x_shadow, @darkx17, and @x17_dev.
                </p>
              </div>
              <button
                onClick={() => setShowOverallActorModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#181D26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0D1016] border border-orange-500/40 rounded-xl p-4">
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Actor Correlation Score</span>
                <span className="text-3xl font-black text-orange-400 font-mono">92%</span>
                <span className="text-[11px] text-emerald-400 block font-mono mt-1">VERY STRONG EVIDENCE</span>
              </div>

              <div className="bg-[#0D1016] border border-[#202734] rounded-xl p-4">
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Stage 2 Eligibility</span>
                <span className="text-lg font-bold text-white font-mono mt-1 block">STAGE 2 INITIATED</span>
                <span className="text-[11px] text-slate-400 block font-mono">Approved by INV-017 (&gt;80%)</span>
              </div>

              <div className="bg-[#0D1016] border border-[#202734] rounded-xl p-4">
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Correlated Pairwise Links</span>
                <span className="text-3xl font-black text-white font-mono">5 Pairs</span>
                <span className="text-[11px] text-slate-400 block font-mono">All &gt; 85% Evidence Strength</span>
              </div>
            </div>

            {/* Narrative Interpretation */}
            <div className="bg-[#0D1016] border border-[#202734] rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                Investigative Forensic Narrative
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The four digital identities analyzed—<strong>@shadow_x17</strong> (Forum-X Dread), <strong>@x_shadow</strong> (Market-Y XSS), <strong>@darkx17</strong> (Chat-Z BreachForums), and <strong>@x17_dev</strong> (Development Mirror)—exhibit multi-dimensional convergence that firmly establishes single-operator control.
              </p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                A hard cryptographic collision was established via RSA-4096 PGP key fingerprint <code>0x7E4A8F2C91B4</code> published on dread profiles and mirrored across sales listings. This is corroborated by stylometric analysis revealing an idiosyncratic double-hyphen (--) delimiter habit present across 100% of forum postings, accompanied by synchronized diurnal activity within the 20:00–03:00 UTC window (Pearson correlation r=0.88).
              </p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Furthermore, code commit timestamps from <strong>@x17_dev</strong> consistently precede weaponized darknet exploit drops by <strong>@darkx17</strong> by 4.2 hours, sharing hardened Go compiler flags. Reverse proxy node <code>185.220.101.45</code> serves as common infrastructure across all publishing channels.
              </p>
            </div>

            {/* Combined Signal Synthesis Matrix */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Combined Multi-Vector Evidence Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#0D1016] border border-[#202734] p-3 rounded-lg space-y-1">
                  <div className="text-orange-400 font-bold">1. Cryptographic Key Collisions (96%)</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Identical PGP signature 0x7E4A8F2C91B4 utilized across Dread and XSS accounts. SSH deployment keys match development staging node.
                  </p>
                </div>

                <div className="bg-[#0D1016] border border-[#202734] p-3 rounded-lg space-y-1">
                  <div className="text-orange-400 font-bold">2. Stylometric Syntactic Uniformity (92%)</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Persistent double-hyphen (--) delimiters, consistent Oxford comma omissions, and matching lowercase hexadecimal notation.
                  </p>
                </div>

                <div className="bg-[#0D1016] border border-[#202734] p-3 rounded-lg space-y-1">
                  <div className="text-orange-400 font-bold">3. Temporal Diurnal Synchronization (91%)</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Pearson correlation r=0.88 across 180 days. Peak session frequency 22:30 UTC indicates unified UTC+03:00 operational timezone.
                  </p>
                </div>

                <div className="bg-[#0D1016] border border-[#202734] p-3 rounded-lg space-y-1">
                  <div className="text-orange-400 font-bold">4. Infrastructure Co-Location (93%)</div>
                  <p className="text-slate-400 text-[11px] font-sans">
                    Reverse proxy node 185.220.101.45 (FlokiNET/Njalla) co-hosts darkx17-vault.is mirror gateway and exploit drop mirrors.
                  </p>
                </div>
              </div>
            </div>

            {/* Legal Boundary Notice */}
            <div className="bg-[#14181F] border border-orange-500/30 rounded-xl p-4 text-xs font-mono text-slate-400 space-y-1">
              <div className="text-orange-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Investigation Boundary: Correlation &ne; Identification</span>
              </div>
              <p className="font-sans leading-relaxed text-[11px] text-slate-300">
                Stage 1 establishes that these digital identities are operated by the same underlying threat actor. It does NOT identify a real-world person. Real-world legal attribution requires authorized Stage 2 entity resolution and sworn human investigator verification.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#232A36]">
              <button
                onClick={() => setShowOverallActorModal(false)}
                className="px-4 py-2 rounded-lg bg-[#181D26] hover:bg-[#202734] text-slate-300 text-xs font-mono"
              >
                Close Synthesis
              </button>
              <button
                onClick={() => {
                  setShowOverallActorModal(false);
                  if (onNavigate) onNavigate('stage2');
                }}
                className="px-5 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-950/60"
              >
                <span>Proceed to Stage 2 Attribution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
