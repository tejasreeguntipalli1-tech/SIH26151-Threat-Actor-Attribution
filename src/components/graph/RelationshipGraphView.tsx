import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GraphNode, GraphLink, EntityType } from '@/types';

import {
  Shield,
  User,
  ShoppingCart,
  MessageSquare,
  Key,
  Wallet,
  Globe,
  Server,
  Award,
  Network,
  FileText,
  Calendar,
  X,
} from 'lucide-react';

const entityConfig: Record<
  EntityType,
  {
    color: string;
    glow: string;
    icon: React.ComponentType<{
      className?: string;
      style?: React.CSSProperties;
    }>;
  }
> = {
  actor: {
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.45)',
    icon: Shield,
  },
  alias: {
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.4)',
    icon: User,
  },
  marketplace: {
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    icon: ShoppingCart,
  },
  forum: {
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    icon: MessageSquare,
  },
  pgp: {
    color: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.4)',
    icon: Key,
  },
  wallet: {
    color: '#eab308',
    glow: 'rgba(234, 179, 8, 0.4)',
    icon: Wallet,
  },
  domain: {
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.4)',
    icon: Globe,
  },
  server: {
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.4)',
    icon: Server,
  },
  certificate: {
    color: '#14b8a6',
    glow: 'rgba(20, 184, 166, 0.4)',
    icon: Award,
  },
  ip: {
    color: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.4)',
    icon: Network,
  },
  post: {
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.4)',
    icon: FileText,
  },
  event: {
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    icon: Calendar,
  },
};

interface Props {
  nodes?: GraphNode[];
  links?: GraphLink[];
  height?: number;
  layout?: 'force' | 'radial' | 'vertical';
  showLabels?: boolean;
  onSelectNode?: (node: GraphNode) => void;
}

interface PositionedNode extends GraphNode {
  x: number;
  y: number;
}

/*
 * Fallback data.
 *
 * This is only used when the parent page does not provide
 * nodes and links. It allows the graph to render immediately.
 */
const fallbackNodes: GraphNode[] = [
  {
    id: 'actor-1',
    type: 'actor',
    label: 'THREAT ACTOR',
    sublabel: 'Actor DNA',
    risk: 94,
    confidence: 91,
    properties: {
      status: 'Under Investigation',
      profile: 'SHADOWTRACE',
    },
  },
  {
    id: 'alias-1',
    type: 'alias',
    label: 'NightWolf',
    sublabel: 'Alias',
    risk: 82,
    confidence: 89,
    properties: {
      source: 'Dark Web',
    },
  },
  {
    id: 'pgp-1',
    type: 'pgp',
    label: 'PGP-7F3A',
    sublabel: 'PGP Fingerprint',
    risk: 78,
    confidence: 86,
    properties: {
      fingerprint: '7F3A...91C2',
    },
  },
  {
    id: 'domain-1',
    type: 'domain',
    label: 'shadow-node',
    sublabel: 'Domain',
    risk: 85,
    confidence: 84,
    properties: {
      type: 'Infrastructure',
    },
  },
  {
    id: 'wallet-1',
    type: 'wallet',
    label: 'WALLET-83A',
    sublabel: 'Crypto Wallet',
    risk: 76,
    confidence: 81,
    properties: {
      network: 'Blockchain',
    },
  },
  {
    id: 'forum-1',
    type: 'forum',
    label: 'Forum Profile',
    sublabel: 'Dark-Web Forum',
    risk: 74,
    confidence: 79,
    properties: {
      activity: 'Recurring',
    },
  },
  {
    id: 'server-1',
    type: 'server',
    label: 'Server-204',
    sublabel: 'Infrastructure',
    risk: 88,
    confidence: 87,
    properties: {
      role: 'Hosting',
    },
  },
  {
    id: 'ip-1',
    type: 'ip',
    label: '185.x.x.x',
    sublabel: 'IP Address',
    risk: 71,
    confidence: 73,
    properties: {
      source: 'Network Logs',
    },
  },
  {
    id: 'market-1',
    type: 'marketplace',
    label: 'Marketplace',
    sublabel: 'Dark-Web Market',
    risk: 80,
    confidence: 76,
    properties: {
      activity: 'Observed',
    },
  },
];

const fallbackLinks: GraphLink[] = [
  {
    source: 'actor-1',
    target: 'alias-1',
    label: 'USES ALIAS',
    confidence: 91,
  },
  {
    source: 'actor-1',
    target: 'pgp-1',
    label: 'PGP LINK',
    confidence: 86,
  },
  {
    source: 'actor-1',
    target: 'domain-1',
    label: 'INFRASTRUCTURE',
    confidence: 84,
  },
  {
    source: 'actor-1',
    target: 'wallet-1',
    label: 'WALLET LINK',
    confidence: 81,
  },
  {
    source: 'actor-1',
    target: 'forum-1',
    label: 'FORUM ACTIVITY',
    confidence: 79,
  },
  {
    source: 'actor-1',
    target: 'server-1',
    label: 'HOSTING',
    confidence: 87,
  },
  {
    source: 'server-1',
    target: 'ip-1',
    label: 'RESOLVES TO',
    confidence: 73,
  },
  {
    source: 'alias-1',
    target: 'market-1',
    label: 'MARKET ACTIVITY',
    confidence: 76,
  },
  {
    source: 'domain-1',
    target: 'ip-1',
    label: 'DNS RELATION',
    confidence: 82,
  },
  {
    source: 'pgp-1',
    target: 'forum-1',
    label: 'SIGNATURE',
    confidence: 80,
  },
];

export function EntityGraph({
  nodes: inputNodes,
  links: inputLinks,
  height = 600,
  layout = 'radial',
  showLabels = true,
  onSelectNode,
}: Props) {
  /*
   * Use real project data when available.
   * Otherwise use fallback data so the visualization is visible.
   */
  const nodes =
    inputNodes && inputNodes.length > 0
      ? inputNodes
      : fallbackNodes;

  const links =
    inputLinks && inputLinks.length > 0
      ? inputLinks
      : fallbackLinks;

  const [selected, setSelected] =
    useState<GraphNode | null>(null);

  const [hovered, setHovered] =
    useState<string | null>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Find actor node.
   */
  const focalNode = useMemo(() => {
    return (
      nodes.find(
        (node) => node.type === 'actor'
      ) ||
      nodes[0] ||
      null
    );
  }, [nodes]);

  /*
   * Calculate positions.
   */
  const positioned = useMemo<
    PositionedNode[]
  >(() => {
    if (!nodes.length) {
      return [];
    }

    const width =
      containerRef.current?.clientWidth ||
      1000;

    const centerX = width / 2;
    const centerY = height / 2;

    /*
     * VERTICAL LAYOUT
     */
    if (layout === 'vertical') {
      const levels: Record<
        string,
        number
      > = {};

      if (focalNode) {
        levels[focalNode.id] = 0;
      }

      let changed = true;

      while (changed) {
        changed = false;

        links.forEach((link) => {
          if (
            levels[link.source] !==
              undefined &&
            levels[link.target] ===
              undefined
          ) {
            levels[link.target] =
              levels[link.source] + 1;

            changed = true;
          }

          if (
            levels[link.target] !==
              undefined &&
            levels[link.source] ===
              undefined
          ) {
            levels[link.source] =
              levels[link.target] + 1;

            changed = true;
          }
        });
      }

      const maxLevel = Math.max(
        ...Object.values(levels),
        0
      );

      const groups: Record<
        number,
        GraphNode[]
      > = {};

      nodes.forEach((node) => {
        const level =
          levels[node.id] ?? maxLevel;

        if (!groups[level]) {
          groups[level] = [];
        }

        groups[level].push(node);
      });

      const result: PositionedNode[] =
        [];

      Object.entries(groups).forEach(
        ([levelString, group]) => {
          const level =
            Number(levelString);

          group.forEach(
            (node, index) => {
              const x =
                group.length === 1
                  ? centerX
                  : 100 +
                    (index /
                      (group.length - 1)) *
                      Math.max(
                        width - 200,
                        400
                      );

              const y =
                60 +
                (level /
                  Math.max(
                    maxLevel,
                    1
                  )) *
                  Math.max(
                    height - 120,
                    300
                  );

              result.push({
                ...node,
                x,
                y,
              });
            }
          );
        }
      );

      return result;
    }

    /*
     * RADIAL LAYOUT
     */
    const actor = focalNode;

    if (!actor) {
      return [];
    }

    const others = nodes.filter(
      (node) =>
        node.id !== actor.id
    );

    const priority: Record<
      string,
      number
    > = {
      alias: 1,
      pgp: 2,
      domain: 3,
      wallet: 4,
      forum: 5,
      marketplace: 6,
      server: 7,
      ip: 8,
      certificate: 9,
      post: 10,
      event: 11,
    };

    const sorted = [...others].sort(
      (a, b) =>
        (priority[a.type] ?? 99) -
        (priority[b.type] ?? 99)
    );

    /*
     * Keep first 6 nodes close to actor.
     */
    const innerRing = sorted.slice(0, 6);

    /*
     * Remaining nodes form outer ring.
     */
    const outerRing = sorted.slice(6);

    const result: PositionedNode[] = [
      {
        ...actor,
        x: centerX,
        y: centerY,
      },
    ];

    innerRing.forEach(
      (node, index) => {
        const angle =
          (index /
            Math.max(
              innerRing.length,
              1
            )) *
            Math.PI *
            2 -
          Math.PI / 2;

        result.push({
          ...node,
          x:
            centerX +
            Math.cos(angle) *
              Math.min(
                width * 0.27,
                260
              ),
          y:
            centerY +
            Math.sin(angle) *
              Math.min(
                height * 0.28,
                155
              ),
        });
      }
    );

    outerRing.forEach(
      (node, index) => {
        const angle =
          (index /
            Math.max(
              outerRing.length,
              1
            )) *
            Math.PI *
            2 -
          Math.PI / 2;

        result.push({
          ...node,
          x:
            centerX +
            Math.cos(angle) *
              Math.min(
                width * 0.41,
                390
              ),
          y:
            centerY +
            Math.sin(angle) *
              Math.min(
                height * 0.40,
                225
              ),
        });
      }
    );

    return result;
  }, [
    nodes,
    links,
    layout,
    height,
    focalNode,
  ]);

  /*
   * Node lookup.
   */
  const nodeById = useMemo(
    () =>
      new Map(
        positioned.map((node) => [
          node.id,
          node,
        ])
      ),
    [positioned]
  );

  /*
   * Determine whether node is connected
   * to selected/hovered node.
   */
  const isConnected = (
    nodeId: string
  ) => {
    const focusId =
      hovered || selected?.id;

    if (!focusId) {
      return true;
    }

    if (focusId === nodeId) {
      return true;
    }

    return links.some(
      (link) =>
        (link.source === focusId &&
          link.target === nodeId) ||
        (link.target === focusId &&
          link.source === nodeId)
    );
  };

  /*
   * Curved connection path.
   */
  const createCurve = (
    source: PositionedNode,
    target: PositionedNode,
    direction: number
  ) => {
    const dx =
      target.x - source.x;

    const dy =
      target.y - source.y;

    const distance =
      Math.sqrt(
        dx * dx + dy * dy
      ) || 1;

    const normalX =
      -dy / distance;

    const normalY =
      dx / distance;

    const curve =
      Math.min(
        75,
        Math.max(
          25,
          distance * 0.12
        )
      );

    const controlX =
      (source.x + target.x) /
        2 +
      normalX *
        curve *
        direction;

    const controlY =
      (source.y + target.y) /
        2 +
      normalY *
        curve *
        direction;

    return `
      M ${source.x} ${source.y}
      Q ${controlX} ${controlY}
        ${target.x} ${target.y}
    `;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-cyber-border bg-[#050b16]"
      style={{
        height,
        minHeight: 500,
      }}
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,212,255,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,212,255,0.08) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            '32px 32px',
        }}
      />

      {/* Central glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 360,
          height: 360,
          background:
            'radial-gradient(circle, rgba(0,212,255,0.08), transparent 70%)',
        }}
      />

      {/* SVG CONNECTIONS */}
      <svg
        width="100%"
        height={height}
        className="absolute inset-0 z-[1]"
      >
        <defs>
          <marker
            id="shadowtrace-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path
              d="M0,0 L7,3.5 L0,7"
              fill="none"
              stroke="#49637f"
              strokeWidth="1"
            />
          </marker>
        </defs>

        {links.map(
          (link, index) => {
            const source =
              nodeById.get(
                link.source
              );

            const target =
              nodeById.get(
                link.target
              );

            if (!source || !target) {
              return null;
            }

            const focusId =
              hovered ||
              selected?.id;

            const connected =
              !focusId ||
              link.source ===
                focusId ||
              link.target ===
                focusId;

            const highlighted =
              link.source ===
                hovered ||
              link.target ===
                hovered ||
              link.source ===
                selected?.id ||
              link.target ===
                selected?.id;

            const confidence =
              typeof link.confidence ===
              'number'
                ? link.confidence
                : 0;

            const confidenceColor =
              confidence >= 90
                ? '#22c55e'
                : confidence >= 80
                  ? '#00d4ff'
                  : confidence >=
                      70
                    ? '#f59e0b'
                    : '#64748b';

            const path =
              createCurve(
                source,
                target,
                index % 2 === 0
                  ? 1
                  : -1
              );

            return (
              <g
                key={`${link.source}-${link.target}-${index}`}
                opacity={
                  connected
                    ? 1
                    : 0.12
                }
              >
                {/* Glow */}
                {highlighted && (
                  <path
                    d={path}
                    fill="none"
                    stroke={
                      confidenceColor
                    }
                    strokeWidth="7"
                    opacity="0.10"
                  />
                )}

                {/* Main line */}
                <path
                  d={path}
                  fill="none"
                  stroke={
                    highlighted
                      ? confidenceColor
                      : '#29415d'
                  }
                  strokeWidth={
                    highlighted
                      ? 2.2
                      : 1.2
                  }
                  strokeDasharray={
                    highlighted
                      ? '7 5'
                      : '4 6'
                  }
                  markerEnd="url(#shadowtrace-arrow)"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="24"
                    to="0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            );
          }
        )}
      </svg>

      {/* NODES */}
      {positioned.map(
        (node) => {
          const config =
            entityConfig[
              node.type
            ];

          /*
           * Safety fallback in case a future
           * node type is not configured.
           */
          if (!config) {
            return null;
          }

          const Icon =
            config.icon;

          const isHovered =
            hovered === node.id;

          const isSelected =
            selected?.id ===
            node.id;

          const connected =
            isConnected(node.id);

          const isActor =
            node.type ===
            'actor';

          const connectedLinks =
            links.filter(
              (link) =>
                link.source ===
                  node.id ||
                link.target ===
                  node.id
            );

          return (
            <motion.div
              key={node.id}
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity:
                  connected
                    ? 1
                    : 0.2,

                scale:
                  isHovered ||
                  isSelected
                    ? 1.08
                    : 1,

                x:
                  node.x -
                  (isActor
                    ? 75
                    : 62),

                y:
                  node.y -
                  (isActor
                    ? 45
                    : 25),
              }}
              transition={{
                duration: 0.25,
              }}
              className="absolute z-[5]"
              onMouseEnter={() =>
                setHovered(
                  node.id
                )
              }
              onMouseLeave={() =>
                setHovered(null)
              }
              onClick={() => {
                setSelected(
                  node
                );

                onSelectNode?.(
                  node
                );
              }}
            >
              {isActor ? (
                /*
                 * CENTRAL ACTOR
                 */
                <div
                  className="relative flex h-[90px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2"
                  style={{
                    borderColor:
                      config.color,

                    background:
                      'linear-gradient(145deg, rgba(35,12,17,.98), rgba(8,16,28,.98))',

                    boxShadow:
                      isHovered ||
                      isSelected
                        ? `0 0 30px ${config.glow}`
                        : `0 0 18px ${config.glow}`,
                  }}
                >
                  <div
                    className="absolute -inset-[6px] rounded-xl border opacity-20"
                    style={{
                      borderColor:
                        config.color,
                    }}
                  />

                  <Icon
                    className="mb-1 h-6 w-6"
                    style={{
                      color:
                        config.color,
                    }}
                  />

                  <div className="text-[12px] font-bold text-white">
                    {node.label}
                  </div>

                  <div
                    className="mt-1 text-[8px] font-mono uppercase tracking-wider"
                    style={{
                      color:
                        config.color,
                    }}
                  >
                    {node.sublabel ||
                      'THREAT ACTOR'}
                  </div>

                  {typeof node.confidence ===
                    'number' && (
                    <div className="mt-1 text-[8px] font-mono text-cyan-400">
                      CONFIDENCE{' '}
                      {
                        node.confidence
                      }
                      %
                    </div>
                  )}

                  {node.risk >=
                    85 && (
                    <span className="absolute -right-1.5 -top-1.5 h-3 w-3 animate-pulse rounded-full bg-red-400" />
                  )}
                </div>
              ) : (
                /*
                 * EVIDENCE NODE
                 */
                <div
                  className="relative flex min-w-[125px] max-w-[165px] cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2"
                  style={{
                    borderColor:
                      isHovered ||
                      isSelected
                        ? config.color
                        : `${config.color}88`,

                    background:
                      'linear-gradient(135deg, rgba(10,20,34,.97), rgba(6,13,24,.97))',

                    boxShadow:
                      isHovered ||
                      isSelected
                        ? `0 0 20px ${config.glow}`
                        : '0 5px 15px rgba(0,0,0,.3)',
                  }}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border"
                    style={{
                      borderColor:
                        `${config.color}88`,
                      background:
                        `${config.color}12`,
                    }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{
                        color:
                          config.color,
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-[9px] font-semibold text-white">
                      {node.label}
                    </div>

                    {node.sublabel && (
                      <div
                        className="truncate text-[7px] font-mono uppercase"
                        style={{
                          color:
                            config.color,
                        }}
                      >
                        {
                          node.sublabel
                        }
                      </div>
                    )}

                    {typeof node.confidence ===
                      'number' && (
                      <div className="mt-0.5 text-[7px] font-mono text-cyan-400">
                        CONF{' '}
                        {
                          node.confidence
                        }
                        %
                      </div>
                    )}
                  </div>

                  {node.risk >=
                    85 && (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-pulse rounded-full bg-red-400" />
                  )}
                </div>
              )}

              {/* Hover connection count */}
              {isHovered &&
                connectedLinks.length >
                  0 && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-cyan-800 bg-[#07111f] px-2 py-1 text-[8px] font-mono text-cyan-300">
                    {
                      connectedLinks.length
                    }{' '}
                    CONNECTION
                    {connectedLinks.length !==
                    1
                      ? 'S'
                      : ''}
                  </div>
                )}
            </motion.div>
          );
        }
      )}

      {/* SELECTED NODE PANEL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 20,
            }}
            className="absolute right-3 top-3 z-20 w-72 rounded-lg border border-cyber-border-bright bg-cyber-panel p-4 shadow-glow"
          >
            <button
              onClick={() =>
                setSelected(
                  null
                )
              }
              className="absolute right-2 top-2 text-cyber-muted hover:text-cyber-text"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-2">
              {(() => {
                const Icon =
                  entityConfig[
                    selected.type
                  ].icon;

                return (
                  <Icon
                    className="h-4 w-4"
                    style={{
                      color:
                        entityConfig[
                          selected
                            .type
                        ]
                          .color,
                    }}
                  />
                );
              })()}

              <span className="text-xs font-mono uppercase text-cyber-muted">
                {selected.sublabel ||
                  selected.type}
              </span>
            </div>

            <h3 className="mb-3 font-mono text-sm font-semibold text-cyber-text">
              {selected.label}
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-cyber-muted">
                  Risk Score
                </span>

                <span className="font-mono text-red-400">
                  {
                    selected.risk
                  }
                  /100
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-cyber-muted">
                  Confidence
                </span>

                <span className="font-mono text-cyan-400">
                  {
                    selected.confidence
                  }
                  %
                </span>
              </div>

              {selected.properties &&
                Object.entries(
                  selected.properties
                ).map(
                  ([
                    key,
                    value,
                  ]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-3 text-xs"
                    >
                      <span className="text-cyber-muted">
                        {key}
                      </span>

                      <span className="max-w-[160px] truncate text-right font-mono text-cyber-text">
                        {String(
                          value
                        )}
                      </span>
                    </div>
                  )
                )}
            </div>

            <div className="mt-3 border-t border-cyber-border pt-3">
              <div className="mb-1 text-[10px] font-mono uppercase text-cyber-muted">
                Connected Links
              </div>

              {links
                .filter(
                  (link) =>
                    link.source ===
                      selected.id ||
                    link.target ===
                      selected.id
                )
                .map(
                  (
                    link,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="flex justify-between py-0.5 text-[10px] text-cyber-text"
                    >
                      <span>
                        {link.label ||
                          'Relationship'}
                      </span>

                      <span className="font-mono text-cyan-400">
                        {
                          link.confidence
                        }
                        %
                      </span>
                    </div>
                  )
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOCAL IDENTITY */}
      {focalNode && (
        <div className="absolute left-3 top-3 z-10 rounded border border-slate-700 bg-[#07111f]/90 px-3 py-1.5 backdrop-blur">
          <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">
            FOCAL DIGITAL IDENTITY
          </div>

          <div className="text-[10px] font-semibold text-white">
            {
              focalNode.label
            }
          </div>
        </div>
      )}

      {/* STATUS */}
      <div className="absolute bottom-3 left-3 z-10 rounded-md border border-slate-800 bg-[#07111f]/90 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-3 text-[8px] font-mono">
          <span className="text-slate-500">
            NODES{' '}
            <span className="text-cyan-400">
              {nodes.length}
            </span>
          </span>

          <span className="text-slate-500">
            LINKS{' '}
            <span className="text-cyan-400">
              {links.length}
            </span>
          </span>

          <span className="text-green-400">
            ● LIVE
          </span>
        </div>
      </div>

      {/* LEGEND */}
      <div className="absolute bottom-3 right-3 z-10 flex max-w-[60%] flex-wrap gap-x-3 gap-y-1.5 rounded-md border border-slate-800 bg-[#07111f]/90 px-3 py-2 backdrop-blur">
        {Object.entries(
          entityConfig
        )
          .filter(
            ([type]) =>
              nodes.some(
                (node) =>
                  node.type ===
                  type
              )
          )
          .map(
            ([
              type,
              config,
            ]) => (
              <div
                key={type}
                className="flex items-center gap-1 text-[8px] font-mono uppercase text-slate-500"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      config.color,
                    boxShadow: `0 0 5px ${config.glow}`,
                  }}
                />
                {type}
              </div>
            )
          )}
      </div>
    </div>
  );
}

/*
 * Keep both names available.
 */
export const RelationshipGraphView =
  EntityGraph;

export default EntityGraph;