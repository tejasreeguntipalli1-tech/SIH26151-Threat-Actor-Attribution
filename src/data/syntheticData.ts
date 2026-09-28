import { 
  DigitalIdentity, 
  ActorCluster, 
  RealWorldAttributionLead, 
  TimelineEvent, 
  AuditLogItem, 
  InvestigationConfig, 
  DigitalIndicatorItem, 
  EntityResolutionDimension, 
  CandidateEntity, 
  RelationshipEvidenceItem, 
  ConfidenceEvolutionPoint, 
  MatrixEvidenceRow, 
  PairwiseRelationship, 
  PairwiseSignalDetail 
} from '../types/investigation';

export const initialConfig: InvestigationConfig = {
  stage2Threshold: 80,
  weights: {
    username: 0.20,
    stylometry: 0.25,
    behaviour: 0.20,
    temporal: 0.15,
    technical: 0.20,
  },
  investigationId: 'INV-2026-0151',
  leadInvestigator: 'Senior Investigator INV-017 (Badge #IN-7492)',
  agency: 'Cyber Threat Intelligence & Attribution Cell (SIH26151)',
};

export const syntheticIdentities: DigitalIdentity[] = [
  {
    id: 'id-01',
    username: 'shadow_x17',
    aliases: ['shadow17', 'x17_dev', 'sh4dow_op'],
    platform: 'Forum-X (Dread) & Exploit Mirror',
    firstSeen: '2024-03-12 14:22 UTC',
    lastSeen: '2026-08-19 22:15 UTC',
    avatarLetter: 'S',
    status: 'ACTIVE',
    riskRating: 'HIGH',
    clusterId: 'Actor Cluster A',
    stylometry: {
      avgSentenceLength: 14.2,
      vocabularyRichnessTTR: 0.68,
      punctuationHabit: 'Double hyphen delimiters (--), lowercased abbreviations, ellipses at sentence end...',
      casingHabit: 'strict lowercase sentence starters, preserves hex addresses in uppercase',
      sampleText: 'new dump verified from tier-1 telecom -- ready for escrow. do not ping for sample unless deposit is logged. jabber only for verified pgp.',
      distinctivePhrases: ['escrow mandatory', 'jabber only', 'clean dump', 'pm with pgp']
    },
    behavioural: {
      primaryRole: 'Initial Access Broker / Database Seller',
      tradingMethod: 'Multi-sig Escrow & PGP-signed off-chain deals',
      opsecDiscipline: 'STRICT',
      forumSections: ['Marketplace / Leaks', 'Cryptocurrency Escrow', 'Privilege Escalation'],
      antiForensicHabits: ['Burner PGP keys rotated yearly', 'Strict Tor over VPN discipline', 'Single-use jabber OTR']
    },
    temporal: {
      activeHoursUtc: '20:00 - 03:30 UTC',
      peakDay: 'Thursday & Saturday',
      timezoneEstimate: 'UTC+03:00 / UTC+03:30 (Eastern Europe / Middle East)',
      burstFrequency: 'Short intense burst posts followed by 48h silence'
    },
    technical: {
      pgpKeyId: '0x7E4A8F2C91B4',
      pgpFingerprint: '9B2E 7E4A 8F2C 91B4 55F0 3341 A1C9 8021 6F5D E017',
      cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'],
      walletType: 'BTC Native SegWit (HD Wallet Cluster)',
      onionAddresses: ['dreadx17vlt...onion', 'leaksvault404...onion'],
      infrastructureIps: ['185.220.101.45', '194.26.29.112'],
      userAgents: ['Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0 (Tor Browser)']
    }
  },
  {
    id: 'id-02',
    username: 'x_shadow',
    aliases: ['x-shadow-sec', 'x_shdw'],
    platform: 'Market-Y (XSS Forum) & Telegram Channel',
    firstSeen: '2024-07-04 19:40 UTC',
    lastSeen: '2026-08-25 01:10 UTC',
    avatarLetter: 'X',
    status: 'ACTIVE',
    riskRating: 'HIGH',
    clusterId: 'Actor Cluster A',
    stylometry: {
      avgSentenceLength: 13.8,
      vocabularyRichnessTTR: 0.66,
      punctuationHabit: 'Double hyphens (--), sparse commas, consistent ellipsis closure...',
      casingHabit: 'strict lowercase sentence starters',
      sampleText: 'selling vpn access to eu energy firm -- serious buyers only. escrow mandatory or no deal. check signature before pinging.',
      distinctivePhrases: ['escrow mandatory', 'serious buyers only', 'check signature', 'jabber only']
    },
    behavioural: {
      primaryRole: 'Ransomware Access Broker',
      tradingMethod: 'Escrow via forum admin or direct XMR',
      opsecDiscipline: 'STRICT',
      forumSections: ['Access Sales', 'Exploits', 'Crypters'],
      antiForensicHabits: ['Encrypted text pastes (PrivateBin with 1-day burn)', 'Metadata stripping on all docs']
    },
    temporal: {
      activeHoursUtc: '20:30 - 04:00 UTC',
      peakDay: 'Friday & Saturday',
      timezoneEstimate: 'UTC+03:00 (Overlap with shadow_x17)',
      burstFrequency: 'Active during late evening UTC'
    },
    technical: {
      pgpKeyId: '0x7E4A8F2C91B4',
      pgpFingerprint: '9B2E 7E4A 8F2C 91B4 55F0 3341 A1C9 8021 6F5D E017',
      cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'bc1q9v8y76rt42...'],
      walletType: 'BTC Native SegWit & Wasabi CoinJoin mixer output',
      onionAddresses: ['xshadowdrop...onion'],
      infrastructureIps: ['185.220.101.45'],
      userAgents: ['Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0 (Tor Browser)']
    }
  },
  {
    id: 'id-03',
    username: 'darkx17',
    aliases: ['dark_17', 'vault17_admin'],
    platform: 'Chat-Z (BreachForums Mirror) & Ramp',
    firstSeen: '2024-09-18 21:05 UTC',
    lastSeen: '2026-08-27 02:44 UTC',
    avatarLetter: 'D',
    status: 'ACTIVE',
    riskRating: 'HIGH',
    clusterId: 'Actor Cluster A',
    stylometry: {
      avgSentenceLength: 15.0,
      vocabularyRichnessTTR: 0.70,
      punctuationHabit: 'Double hyphen delimiters (--), zero exclamation marks, technical syntax tags',
      casingHabit: 'lowercase text, uppercase key hashes',
      sampleText: 'db release thread updated -- mirror deployed at darkx17-vault.is. pgp verification key is static. escrow only as always.',
      distinctivePhrases: ['escrow mandatory', 'escrow only as always', 'pgp verification key', 'mirror deployed']
    },
    behavioural: {
      primaryRole: 'Data Leak Publisher & Infrastructure Operator',
      tradingMethod: 'Cryptocurrency donations & Private Access Passports',
      opsecDiscipline: 'MODERATE',
      forumSections: ['Databases', 'Stealer Logs', 'Infrastructure'],
      antiForensicHabits: ['Bulletproof reverse proxying, DNS Fast-flux']
    },
    temporal: {
      activeHoursUtc: '21:00 - 04:30 UTC',
      peakDay: 'Saturday & Sunday',
      timezoneEstimate: 'UTC+03:00',
      burstFrequency: 'Weekend deployment and post batches'
    },
    technical: {
      pgpKeyId: '0x7E4A8F2C91B4',
      pgpFingerprint: '9B2E 7E4A 8F2C 91B4 55F0 3341 A1C9 8021 6F5D E017',
      cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'],
      walletType: 'BTC Multi-sig Deposit Wallet',
      onionAddresses: ['darkx17vlt...onion'],
      infrastructureIps: ['185.220.101.45', '193.106.191.24'],
      userAgents: ['Mozilla/5.0 (Windows NT 10.0; rv:115.0) Gecko/20100101 Firefox/115.0 (Tor Browser)']
    }
  },
  {
    id: 'id-04',
    username: 'shadow17',
    aliases: ['x17_dev', 'dev_x17', 'x17-ops'],
    platform: 'Exploit.in & Dev Git Mirror',
    firstSeen: '2024-11-05 16:30 UTC',
    lastSeen: '2026-08-26 23:50 UTC',
    avatarLetter: 'S',
    status: 'ACTIVE',
    riskRating: 'HIGH',
    clusterId: 'Actor Cluster A',
    stylometry: {
      avgSentenceLength: 14.5,
      vocabularyRichnessTTR: 0.69,
      punctuationHabit: 'Double hyphen delimiters (--), lowercase code comments, strict technical syntax',
      casingHabit: 'lowercase commit messages, exact hex addresses in uppercase',
      sampleText: 'reverse proxy automation scripts updated -- tested against 185.220.101.45 nginx gateway. check pgp signature before deployment.',
      distinctivePhrases: ['escrow mandatory', 'check pgp signature', 'reverse proxy updated', 'clean build']
    },
    behavioural: {
      primaryRole: 'Exploit Developer & Mirror Infrastructure Scripting',
      tradingMethod: 'Multi-sig Escrow & PGP-verified contracts',
      opsecDiscipline: 'STRICT',
      forumSections: ['0day Exploits', 'Infrastructure Automation', 'Security Audits'],
      antiForensicHabits: ['Tor daemon routing on development VMs', 'Metadata stripping on all commits']
    },
    temporal: {
      activeHoursUtc: '20:30 - 03:00 UTC',
      peakDay: 'Thursday & Friday',
      timezoneEstimate: 'UTC+03:00 (Direct overlap with shadow_x17)',
      burstFrequency: 'Evening git push bursts and exploit release threads'
    },
    technical: {
      pgpKeyId: '0x7E4A8F2C91B4',
      pgpFingerprint: '9B2E 7E4A 8F2C 91B4 55F0 3341 A1C9 8021 6F5D E017',
      cryptoWallets: ['bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'],
      walletType: 'BTC Native SegWit Deposit Wallet',
      onionAddresses: ['devx17repo...onion', 'leaksvault404...onion'],
      infrastructureIps: ['185.220.101.45'],
      userAgents: ['git/2.42.0 (Tor SOCKS5 proxy)', 'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0']
    }
  },
  {
    id: 'id-05',
    username: 'user_delta',
    aliases: ['delta_carder', 'u_delta', 'nm_cards'],
    platform: 'Telegram Channel & Peripheral Forums',
    firstSeen: '2025-01-10 11:15 UTC',
    lastSeen: '2026-08-20 18:30 UTC',
    avatarLetter: 'U',
    status: 'ACTIVE',
    riskRating: 'ELEVATED',
    clusterId: 'Actor Cluster B',
    stylometry: {
      avgSentenceLength: 9.4,
      vocabularyRichnessTTR: 0.52,
      punctuationHabit: 'Heavy exclamation marks (!!), multiple emojis, promotional tone',
      casingHabit: 'Capitalized Product Titles, ALL-CAPS guarantees',
      sampleText: 'FRESH BATCH TODAY!! 100% valid cvv & corporate bins available now. Auto-shop link online. 24/7 replacement warranty guaranteed!!',
      distinctivePhrases: ['100% valid', 'replacement warranty', 'auto-shop online', 'fresh batch']
    },
    behavioural: {
      primaryRole: 'Bulk Financial Credentials Vendor',
      tradingMethod: 'Automated Tor Shop & Instant XMR Payments',
      opsecDiscipline: 'MODERATE',
      forumSections: ['Carding & Dumps', 'Auto-shops', 'Escrow Support'],
      antiForensicHabits: ['Auto-expiring order sessions', 'Ephemeral PGP message decryption']
    },
    temporal: {
      activeHoursUtc: '10:00 - 18:00 UTC',
      peakDay: 'Monday - Thursday',
      timezoneEstimate: 'UTC+05:30 or UTC+06:00 (South / Southeast Asia)',
      burstFrequency: 'Continuous automated posting via Telegram API bots'
    },
    technical: {
      pgpKeyId: '0x3F88D1B99AA2',
      pgpFingerprint: '7721 3F88 D1B9 9AA2 B3C4 1109 4F21 9934 D882 E441',
      cryptoWallets: ['888tNkZrPN6JsEQ421vW...xmrSubaddress'],
      walletType: 'Monero Integrated Subaddresses',
      onionAddresses: ['nightmktv4...onion'],
      infrastructureIps: ['91.219.236.19'],
      userAgents: ['TelegramBot/2.4 (automated API publisher)']
    }
  },
  {
    id: 'id-06',
    username: 'ghost_404',
    aliases: ['g_404', 'ghostmarket_supp'],
    platform: 'Hydra Legacy & Bohemia Market Clone',
    firstSeen: '2025-02-28 13:40 UTC',
    lastSeen: '2026-08-15 16:50 UTC',
    avatarLetter: 'G',
    status: 'ACTIVE',
    riskRating: 'ELEVATED',
    clusterId: 'Actor Cluster B',
    stylometry: {
      avgSentenceLength: 10.1,
      vocabularyRichnessTTR: 0.54,
      punctuationHabit: 'Exclamation points, promotional brackets [FAST AUTO-DISPATCH]',
      casingHabit: 'Capitalized marketing headers',
      sampleText: 'bohemia shop re-opened [FAST DISPATCH]!! fresh logs, high balance bins ready. ticket support active.',
      distinctivePhrases: ['fast dispatch', 'fresh logs', 'ticket support', 'replacement warranty']
    },
    behavioural: {
      primaryRole: 'Vendor / Secondary Distribution Hub',
      tradingMethod: 'Marketplace Wallet Escrow',
      opsecDiscipline: 'POOR',
      forumSections: ['Market Vendor Support', 'Dispute Resolution'],
      antiForensicHabits: ['Reused shop script templates without obfuscation']
    },
    temporal: {
      activeHoursUtc: '11:00 - 19:30 UTC',
      peakDay: 'Tuesday & Thursday',
      timezoneEstimate: 'UTC+05:30 (Close overlap with night_market)',
      burstFrequency: 'Periodic daily store restocks'
    },
    technical: {
      pgpKeyId: 'NOT AVAILABLE',
      cryptoWallets: ['888tNkZrPN6JsEQ421vW...xmrSubaddress'],
      walletType: 'Monero Subaddress (Identical merchant cluster tag)',
      onionAddresses: ['nightmktv4...onion', 'ghostshop2...onion'],
      infrastructureIps: ['91.219.236.19'],
      userAgents: ['Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0']
    }
  },
  {
    id: 'id-07',
    username: 'silentnode',
    aliases: ['s_node_ops'],
    platform: 'Ramp Market & Private Jabber Server',
    firstSeen: '2026-04-01 03:10 UTC',
    lastSeen: '2026-07-22 05:40 UTC',
    avatarLetter: 'S',
    status: 'DORMANT',
    riskRating: 'MODERATE',
    clusterId: 'Actor Cluster C',
    stylometry: {
      avgSentenceLength: 22.4,
      vocabularyRichnessTTR: 0.81,
      punctuationHabit: 'Strict academic punctuation, semicolons, capitalized sentences',
      casingHabit: 'Standard proper casing, complete English grammar',
      sampleText: 'The integrity of the enclave was preserved prior to the node migration; verify cryptographic signature against key registry.',
      distinctivePhrases: ['cryptographic signature', 'node migration', 'integrity preserved']
    },
    behavioural: {
      primaryRole: 'Cryptographic Infrastructure Researcher / Solitary Actor',
      tradingMethod: 'Direct peer-to-peer PGP barter',
      opsecDiscipline: 'STRICT',
      forumSections: ['Crypto Theory', 'Hardware Security Modules'],
      antiForensicHabits: ['Tor over I2P daisy-chaining', 'Zero persistent online storage']
    },
    temporal: {
      activeHoursUtc: '02:00 - 06:00 UTC',
      peakDay: 'Sunday',
      timezoneEstimate: 'UTC-05:00 or UTC+08:00 (Inconclusive)',
      burstFrequency: 'Infrequent single technical thesis posts'
    },
    technical: {
      pgpKeyId: '0x9924BBA100EF',
      pgpFingerprint: '1129 9924 BBA1 00EF 4478 5221 CC34 0019 FA99 3320',
      cryptoWallets: [],
      walletType: 'NOT AVAILABLE',
      onionAddresses: ['silentnode66...onion'],
      infrastructureIps: ['198.51.100.89'],
      userAgents: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0']
    }
  }
];

export const initialActorClusters: ActorCluster[] = [
  {
    id: 'Actor Cluster A',
    codename: 'PROBABLE DIGITAL ACTOR CLUSTER A (TA-001)',
    identityIds: ['id-01', 'id-02', 'id-03', 'id-04'],
    identities: [syntheticIdentities[0], syntheticIdentities[1], syntheticIdentities[2], syntheticIdentities[3]],
    actorCorrelationScore: 92,
    classification: 'VERY STRONG EVIDENCE',
    stage2Status: 'ELIGIBLE FOR INVESTIGATOR REVIEW',
    stage2Initiated: false,
    scoreBreakdown: {
      usernameSimilarity: 94,
      writingStyle: 91,
      behaviouralPattern: 87,
      temporalPattern: 89,
      technicalIndicators: 92,
      overallConfidence: 92,
      supportingCount: 11,
      conflictingCount: 1,
      unknownCount: 2
    },
    supportingReasons: [
      'Identical shared PGP Key ID (0x7E4A8F2C91B4) verified across Forum-X, Market-Y, Chat-Z, and Exploit.in',
      'Exact shared BTC Deposit Wallet (bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh)',
      'Shared reverse-proxy hosting IP (185.220.101.45) across onion gateway redirects and clear-web SSL cert',
      'High stylometric overlap: persistent double hyphen delimiters (--) and strictly lowercased openers',
      'Overlapping peak UTC activity window (20:00 - 04:00 UTC) with matching diurnal curve',
      'Username morphological derivation: shadow_x17 ↔ x_shadow ↔ darkx17 ↔ shadow17 (17-suffix and shadow stem)',
      'Identical off-chain escrow requirement phrasing ("escrow mandatory or no deal")',
      'Automation deployment scripts published by shadow17 configuring darkx17 mirror server proxy',
      'Co-spend transaction inputs confirmed in Bitcoin block 842109',
      'Cryptographic commit signatures on Git mirror repository matching cluster public keyring',
      'Diurnal quiet period (04:00 - 12:00 UTC) consistently observed across all four handles'
    ],
    conflictingReasons: [
      'Different platform operational role: BreachForums mirror publisher vs XSS access broker'
    ],
    unknownReasons: [
      'Historical ISP registration logs for 185.220.101.45 unavailable via public WHOIS',
      'Wallet mixer output path past Wasabi CoinJoin hop 3 is unconfirmed / obfuscated'
    ],
    evidenceGaps: [
      'Need subpoenaed DNS registrar records for mirror domain "darkx17-vault.is"',
      'Correlate Wasabi CoinJoin cluster peel chains with regulated OTC cryptocurrency off-ramps',
      'Examine Jabber OTR server connection logs for concurrent session handshakes',
      'Cross-reference leaked developer commit metadata matching the "x17_dev" alias'
    ],
    createdAt: '2026-08-20 10:14 UTC',
    lastUpdated: '2026-08-27 09:30 UTC',
    notes: 'Primary focus cluster for operation. Correlated with high confidence across 4 major forums.'
  },
  {
    id: 'Actor Cluster B',
    codename: 'PROBABLE DIGITAL ACTOR CLUSTER B (TA-002)',
    identityIds: ['id-05', 'id-06'],
    identities: [syntheticIdentities[4], syntheticIdentities[5]],
    actorCorrelationScore: 84,
    classification: 'STRONG EVIDENCE',
    stage2Status: 'ELIGIBLE FOR INVESTIGATOR REVIEW',
    stage2Initiated: false,
    scoreBreakdown: {
      usernameSimilarity: 72,
      writingStyle: 86,
      behaviouralPattern: 88,
      temporalPattern: 89,
      technicalIndicators: 85,
      overallConfidence: 84,
      supportingCount: 12,
      conflictingCount: 3,
      unknownCount: 7
    },
    supportingReasons: [
      'Direct shared infrastructure IP (91.219.236.19) hosting automated carding storefront backend',
      'Common Monero subaddress cluster format utilized for instant checkout escrow',
      'Synchronized UTC active hours (10:00 - 19:30 UTC), strongly aligned with UTC+05:30',
      'Very high stylometric match: excessive exclamation marks (!!), promotional brackets [FAST DISPATCH]',
      'Co-promoted onion mirrors across CryptBB and Bohemia market clone threads'
    ],
    conflictingReasons: [
      'night_market publishes automated Telegram API broadcasts; ghost_404 uses manual browser logins',
      'ghost_404 maintains no static PGP key on profile',
      'night_market operates in multiple languages; ghost_404 posts solely in English'
    ],
    unknownReasons: [
      'Monero blockchain ring signatures prevent direct ledger balance confirmation',
      'Upstream bulletproof hosting provider (Frankfurt colo) does not log incoming VPNs',
      'No clear-web social handles registered under either alias',
      'Automated checkout backend code is proprietary and closed-source',
      'Telegram channel creator account is deleted / orphaned',
      'Payment gateway intermediary gateway addresses rotate dynamically',
      'No physical device IMEI or SIM indicators'
    ],
    evidenceGaps: [
      'Obtain Monero view-keys from seized merchant database mirrors',
      'Correlate Telegram Bot API token registration timestamps with hosting VPS billing records',
      'Monitor customer complaint tickets for accidental clear-net paste leaks'
    ],
    createdAt: '2026-08-22 14:00 UTC',
    lastUpdated: '2026-08-26 18:45 UTC',
    notes: 'Carding / bulk credentials operation. Meets 80% threshold for investigator review.'
  },
  {
    id: 'Actor Cluster C',
    codename: 'PROBABLE DIGITAL ACTOR CLUSTER C (TA-003)',
    identityIds: ['id-06'],
    identities: [syntheticIdentities[5]],
    actorCorrelationScore: 67,
    classification: 'WEAK / INCONCLUSIVE',
    stage2Status: 'NOT ELIGIBLE',
    stage2Initiated: false,
    scoreBreakdown: {
      usernameSimilarity: 50,
      writingStyle: 62,
      behaviouralPattern: 71,
      temporalPattern: 65,
      technicalIndicators: 70,
      overallConfidence: 67,
      supportingCount: 5,
      conflictingCount: 4,
      unknownCount: 11
    },
    supportingReasons: [
      'Single standalone identity observed on Ramp Market with isolated PGP signature',
      'Self-hosted standalone onion node (silentnode66...onion) running custom daemon',
      'Internal stylistic consistency in long-form technical grammar'
    ],
    conflictingReasons: [
      'No alias overlap with any other known cluster identity',
      'Highly irregular nocturnal activity window with erratic multi-month gaps',
      'Complete absence of transactional or commercial forum records',
      'Distinct cryptographic preference (Ed25519 vs RSA-4096 used by other clusters)'
    ],
    unknownReasons: [
      'Zero cryptocurrency addresses publicly published or observed',
      'No linked communication platforms (No Telegram, Discord, or public Jabber handle)',
      'Subnet 198.51.100.0/24 routes through experimental privacy tunnel',
      'Operating system kernel signatures obscured',
      'No cross-site referencing detected across 14 darknet search crawlers',
      'No email address or recovery token recorded',
      'Historical archives contain zero prior iterations of the handle',
      'Device profile obscured behind custom Tails OS configuration',
      'No third-party vouching or dispute records on any marketplace',
      'Hardware performance benchmarks withheld',
      'Timezone could range across three continents due to sporadic scheduling'
    ],
    evidenceGaps: [
      'CRITICAL: Additional evidence is required before initiating real-world attribution',
      'Active monitoring required to intercept any upcoming financial transaction or crypto address',
      'Perform stylometric crawl across academic and cryptographic open-source repositories',
      'Monitor onion service uptime to deduce maintenance schedule time zone'
    ],
    createdAt: '2026-08-24 16:30 UTC',
    lastUpdated: '2026-08-27 11:00 UTC',
    notes: 'Score is 67% (Below 80% threshold). Stage 2 strictly blocked pending further intelligence.'
  },
  {
    id: 'Actor Cluster D',
    codename: 'PERIPHERAL ACTOR CLUSTER D (TA-004)',
    identityIds: [],
    identities: [],
    actorCorrelationScore: 43,
    classification: 'INSUFFICIENT EVIDENCE',
    stage2Status: 'NOT ELIGIBLE',
    stage2Initiated: false,
    scoreBreakdown: {
      usernameSimilarity: 41,
      writingStyle: 38,
      behaviouralPattern: 45,
      temporalPattern: 42,
      technicalIndicators: 49,
      overallConfidence: 43,
      supportingCount: 2,
      conflictingCount: 5,
      unknownCount: 14
    },
    supportingReasons: [
      'Peripheral mention of alias "x17_fan" in public paste',
      'Coincidental overlap on public proxy subnet'
    ],
    conflictingReasons: [
      'Different cryptographic signature entirely',
      'Contradictory native language markers (Cyrillic syntax cues)',
      'Temporal divergence of over 10 hours from known threat actor schedules'
    ],
    unknownReasons: [
      '14 missing critical indicators including wallet, PGP, infrastructure, and persistent persona'
    ],
    evidenceGaps: [
      'Discard or mark as false-positive alias collision',
      'Do not allocate investigative resources without fresh verifiable indicators'
    ],
    createdAt: '2026-08-25 08:00 UTC',
    lastUpdated: '2026-08-27 08:00 UTC',
    notes: 'Insufficient evidence. Firmly rejected for real-world attribution.'
  }
];

// Module 2: Structured Digital Indicators Inventory (Passed from Stage 1 to Stage 2)
export const initialDigitalIndicators: DigitalIndicatorItem[] = [
  {
    id: 'IND-0041',
    type: 'Infrastructure',
    indicator: 'infra-node-17 (185.220.101.45)',
    source: 'Synthetic Threat Intelligence Feed',
    firstSeen: '12 Feb 2026',
    lastSeen: '19 Mar 2026',
    confidence: 'High',
    status: 'Supporting',
    description: 'Shared reverse-proxy hosting node on Njalla/FlokiNET utilized for darknet mirror redirection.',
    originStage: 'Stage 1'
  },
  {
    id: 'IND-0022',
    type: 'Financial',
    indicator: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    source: 'Blockchain Ledger & UTXO Tracker',
    firstSeen: '15 Feb 2026',
    lastSeen: '20 Mar 2026',
    confidence: 'High',
    status: 'Supporting',
    description: 'Native SegWit multi-sig deposit wallet observed on Dread escrow and BreachForums mirror profile.',
    originStage: 'Stage 1'
  },
  {
    id: 'IND-0015',
    type: 'Technical',
    indicator: '0x7E4A8F2C91B4 (PGP Fingerprint)',
    source: 'OpenPGP SKS Keyserver & VKS Mirror',
    firstSeen: '12 Feb 2026',
    lastSeen: '18 Mar 2026',
    confidence: 'High',
    status: 'Supporting',
    description: 'RSA 4096-bit public key used to cryptographically sign database leak releases.',
    originStage: 'Stage 1'
  },
  {
    id: 'IND-0038',
    type: 'Infrastructure',
    indicator: 'darkx17-vault.is (Clear-web Mirror Domain)',
    source: 'Passive DNS & Autonomous System Scanner',
    firstSeen: '18 Feb 2026',
    lastSeen: '21 Mar 2026',
    confidence: 'High',
    status: 'Supporting',
    description: 'Registered mirror domain with SSL cert SHA256: 3c8e...9f21 matching staging server port 8443.',
    originStage: 'Stage 2'
  },
  {
    id: 'IND-0019',
    type: 'Identity',
    indicator: 'double-hyphen-syntax (Stylometry)',
    source: 'Stylometry NLP Extraction Engine',
    firstSeen: '14 Feb 2026',
    lastSeen: '20 Mar 2026',
    confidence: 'High',
    status: 'Supporting',
    description: 'Persistent idiosyncratic double-hyphen (--) delimiter habit present across 100% of posts.',
    originStage: 'Stage 1'
  },
  {
    id: 'IND-0008',
    type: 'Behavioural',
    indicator: 'active-hours-20utc (Diurnal Peak)',
    source: 'Darknet Forum Activity Monitor',
    firstSeen: '13 Feb 2026',
    lastSeen: '22 Mar 2026',
    confidence: 'Moderate',
    status: 'Supporting',
    description: 'Active diurnal schedule from 20:00 to 04:00 UTC, aligning with UTC+03:00 timezone.',
    originStage: 'Stage 1'
  },
  {
    id: 'IND-0052',
    type: 'Financial',
    indicator: 'Wasabi Mixer Peel Hop 3',
    source: 'On-chain Mixer Analysis RPC',
    firstSeen: '22 Feb 2026',
    lastSeen: '23 Feb 2026',
    confidence: 'Weak',
    status: 'Conflicting',
    description: 'Obfuscated CoinJoin output routes through a shared exchange hot-wallet pool.',
    originStage: 'Stage 2'
  },
  {
    id: 'IND-0060',
    type: 'Identity',
    indicator: 'Verified Identity Document',
    source: 'Government / Civil Registry API',
    firstSeen: 'N/A',
    lastSeen: 'N/A',
    confidence: 'Weak',
    status: 'Unknown',
    description: 'Direct national ID, passport, or biometric verification is currently unavailable.',
    originStage: 'Stage 2'
  }
];

// Module 3: Six Matching Dimensions in Entity Resolution
export const initialMatchingDimensions: EntityResolutionDimension[] = [
  {
    id: 'DIM-1',
    name: 'Identity Consistency',
    description: 'Alias, username, and developer moniker morphological derivation.',
    matchStrength: 88,
    evidenceCount: 4,
    supportingCount: 3,
    conflictingCount: 0,
    unknownCount: 1,
    keyObservation: 'Strong link between "x17_dev" and GitHub commit author "alex-k-sec".'
  },
  {
    id: 'DIM-2',
    name: 'Temporal Consistency',
    description: 'Matching activity windows and historical staging server deployment timestamps.',
    matchStrength: 86,
    evidenceCount: 5,
    supportingCount: 4,
    conflictingCount: 1,
    unknownCount: 0,
    keyObservation: '20:00 - 04:00 UTC active cycle correlates with staging Git commits.'
  },
  {
    id: 'DIM-3',
    name: 'Infrastructure Consistency',
    description: 'Shared or historically related hosting IP, reverse proxies, and SSL certs.',
    matchStrength: 84,
    evidenceCount: 5,
    supportingCount: 4,
    conflictingCount: 1,
    unknownCount: 0,
    keyObservation: '185.220.101.45 co-hosts darkx17-vault.is and corporate staging gateway.'
  },
  {
    id: 'DIM-4',
    name: 'Financial Consistency',
    description: 'Synthetic blockchain and wallet transaction co-spend linkages.',
    matchStrength: 78,
    evidenceCount: 4,
    supportingCount: 3,
    conflictingCount: 1,
    unknownCount: 0,
    keyObservation: 'Deposit address bc1qxy... traces to corporate crypto tax filing intermediary.'
  },
  {
    id: 'DIM-5',
    name: 'Behavioural Consistency',
    description: 'OPSEC habits and administrative conventions connecting persona to entity.',
    matchStrength: 80,
    evidenceCount: 3,
    supportingCount: 2,
    conflictingCount: 0,
    unknownCount: 1,
    keyObservation: 'Identical deployment shell scripts and Nginx reverse proxy configuration syntax.'
  },
  {
    id: 'DIM-6',
    name: 'Public / Authorized Intelligence',
    description: 'Structured commercial registries, WHOIS records, and MLAT disclosures.',
    matchStrength: 76,
    evidenceCount: 4,
    supportingCount: 3,
    conflictingCount: 0,
    unknownCount: 1,
    keyObservation: 'Corporate registry records for Meridian Analytics S.R.O. list Subject A. K.'
  }
];

// Module 4: Candidate Entities Table & Hypotheses
export const initialCandidateEntities: CandidateEntity[] = [
  {
    id: 'CANDIDATE-A',
    name: 'Candidate Entity A',
    entityType: 'Organization',
    attributionStrength: 82,
    status: 'ATTRIBUTION LEAD',
    humanValidation: 'PENDING',
    evidenceLinksTotal: 9,
    supportingCount: 7,
    conflictingCount: 1,
    unknownCount: 1,
    jurisdiction: 'Eastern European Hosting / EU Commercial Registration',
    summary: 'Meridian Analytics S.R.O. (Subject A. K.) — commercial entity linked to the registration of mirror domain darkx17-vault.is and Git staging author alex-k-sec.',
    whyAppeared: [
      'Infrastructure-17 (185.220.101.45) connects to the actor previously observed technical indicators.',
      'Domain-X (darkx17-vault.is) appears in two independent synthetic intelligence records.',
      'Temporal activity overlaps with the actor established activity window (20:00 - 04:00 UTC).',
      'Historical indicator data (Git author "alex-k-sec") matches staging deployment script.',
      'One conflicting activity record was detected from daytime EU business hours.',
      'Independent identity verification (passport/civil registry) is unavailable.'
    ],
    whatCouldStrengthen: [
      'Independent corroborating infrastructure ownership record via MLAT registrar subpoena',
      'Additional historical developer commit telemetry from clear-net repositories',
      'Direct bank settlement corroboration from regulated payment processor',
      'Subpoenaed server memory dump or access logs from transit provider'
    ],
    whatCouldWeaken: [
      'Verified conflicting infrastructure ownership lease proving multi-tenant shared proxy',
      'Contradictory timeline or solid alibi for corporate account creation',
      'Demonstrated unrelated third-party entity operating the payment gateway',
      'Invalid indicator relationship or proof of spoofed Git commit headers'
    ]
  },
  {
    id: 'CANDIDATE-B',
    name: 'Candidate Entity B',
    entityType: 'Infrastructure Owner',
    attributionStrength: 67,
    status: 'REQUIRES ADDITIONAL EVIDENCE',
    humanValidation: 'PENDING',
    evidenceLinksTotal: 6,
    supportingCount: 4,
    conflictingCount: 1,
    unknownCount: 1,
    jurisdiction: 'Western European Cloud Colo (Frankfurt / Amsterdam)',
    summary: 'Vortex Cloud Hosting Ltd. — upstream bulletproof hosting leaseholder for reverse-proxy nodes.',
    whyAppeared: [
      'BGP autonomous system announcement overlaps with the subnet hosting infra-node-17.',
      'Shared payment processor merchant account observed on hosting invoices.',
      'Secondary candidate hypothesis retained pending verification of lease agreement.'
    ],
    whatCouldStrengthen: [
      'Server access logs demonstrating direct root SSH login from target actor subnet',
      'Matching customer support ticket correspondence referencing leak archives'
    ],
    whatCouldWeaken: [
      'Confirmation that hosting provider operates as a public transit unmanaged ISP',
      'Absence of administrator control over hosted dark web content'
    ]
  },
  {
    id: 'CANDIDATE-C',
    name: 'Candidate Entity C',
    entityType: 'Individual',
    attributionStrength: 41,
    status: 'REQUIRES ADDITIONAL EVIDENCE',
    humanValidation: 'PENDING',
    evidenceLinksTotal: 3,
    supportingCount: 2,
    conflictingCount: 0,
    unknownCount: 1,
    jurisdiction: 'Offshore Jurisdiction (Panama / Seychelles)',
    summary: 'Anonymous Domain Privacy Moniker "VaultRegistrar88" registered on 1337 Services.',
    whyAppeared: [
      'WHOIS privacy proxy contact used on initial registration of darkx17 mirror domain.',
      'Weak peripheral indicator with zero corroborated financial links.'
    ],
    whatCouldStrengthen: [
      'Unmasking of WHOIS privacy proxy via court order in jurisdiction of registry'
    ],
    whatCouldWeaken: [
      'Demonstrated public WHOIS privacy proxy used by tens of thousands of unrelated domains'
    ]
  }
];

// Interactive Feature: Confidence Evolution Points
export const initialConfidenceEvolution: ConfidenceEvolutionPoint[] = [
  { step: 'Step 1', score: 42, event: 'Initial Actor Cluster Handoff', delta: 'Baseline (42%)', type: 'baseline' },
  { step: 'Step 2', score: 58, event: '+ Infrastructure Correlation (185.220.101.45)', delta: '+16%', type: 'increase' },
  { step: 'Step 3', score: 64, event: '+ Temporal Alignment (20:00 - 04:00 UTC)', delta: '+6%', type: 'increase' },
  { step: 'Step 4', score: 73, event: '+ Financial / Wallet Co-spend Trace', delta: '+9%', type: 'increase' },
  { step: 'Step 5', score: 82, event: '+ Public Intel & Git Commit "alex-k-sec"', delta: '+9%', type: 'increase' },
  { step: 'Step 6', score: 76, event: '- Conflicting Office Hours Post Flagged', delta: '-6%', type: 'decrease' }
];

// Interactive Feature: Support / Conflict / Unknown Matrix
export const initialMatrixRows: MatrixEvidenceRow[] = [
  {
    category: 'Alias Relationship',
    supportingText: 'x17_dev ↔ alex-k-sec stem and naming consistency across staging commits',
    status: 'supporting'
  },
  {
    category: 'Infrastructure',
    supportingText: '185.220.101.45 and darkx17-vault.is reverse proxy verified in DNS logs',
    status: 'supporting'
  },
  {
    category: 'Temporal Pattern',
    supportingText: 'Matching nocturnal deployment schedule (20:00 - 04:00 UTC)',
    status: 'supporting'
  },
  {
    category: 'Financial Indicator',
    supportingText: 'Deposit wallet bc1qxy... connected to corporate crypto corporate account',
    status: 'supporting'
  },
  {
    category: 'Public Intelligence',
    conflictingText: 'One conflicting activity record during daytime EU office business hours',
    status: 'conflicting'
  },
  {
    category: 'Identity Documentation',
    unknownText: 'Missing verified civil registry / government identity passport documentation',
    status: 'unknown'
  }
];

// Full Provenance Relationships for Evidence Chain Explorer
export const initialRelationshipEvidenceItems: RelationshipEvidenceItem[] = [
  {
    id: 'REL-01',
    sourceNode: 'Actor Cluster A',
    targetNode: 'shadow_x17',
    relationType: 'CORRELATED_IDENTITY',
    evidenceType: 'Identity',
    sourceReport: 'Stage 1 Actor Correlation Analysis',
    observedDate: '12 Feb 2026',
    strength: 'Strong',
    status: 'SUPPORTING',
    notes: 'Primary initial access persona with matching PGP signature 0x7E4A8F2C91B4.',
    investigatorDecision: 'ACCEPTED',
    provenance: {
      origin: 'Stage 1 Actor Cluster A',
      originalIndicatorId: 'IND-0015',
      firstObserved: '12 Feb 2026',
      passedToStage2: '22 Feb 2026',
      validationState: 'Verified in Stage 1'
    }
  },
  {
    id: 'REL-02',
    sourceNode: 'shadow_x17',
    targetNode: 'Infrastructure-Node-17',
    relationType: 'OBSERVED_ON',
    evidenceType: 'Infrastructure',
    sourceReport: 'Synthetic Threat Intelligence Record #IR-102',
    observedDate: '18 Feb 2026',
    strength: 'Strong',
    status: 'SUPPORTING',
    notes: 'Indicator observed across multiple correlated digital identities on Dread and BreachForums.',
    investigatorDecision: 'ACCEPTED',
    provenance: {
      origin: 'Stage 1 Actor Cluster A',
      originalIndicatorId: 'IND-0041',
      firstObserved: '12 Feb 2026',
      passedToStage2: '22 Feb 2026',
      validationState: 'Verified in Stage 1'
    }
  },
  {
    id: 'REL-03',
    sourceNode: 'Infrastructure-Node-17',
    targetNode: 'Domain darkx17-vault.is',
    relationType: 'HOSTED_ON',
    evidenceType: 'Infrastructure',
    sourceReport: 'Passive DNS & RouteViews Archive',
    observedDate: '18 Feb 2026',
    strength: 'Strong',
    status: 'SUPPORTING',
    notes: 'DNS A-Record resolved directly to 185.220.101.45 during leak deployment.',
    investigatorDecision: 'ACCEPTED',
    provenance: {
      origin: 'Stage 2 Entity Resolution',
      originalIndicatorId: 'IND-0038',
      firstObserved: '18 Feb 2026',
      passedToStage2: '22 Feb 2026',
      validationState: 'Active Intelligence Link'
    }
  },
  {
    id: 'REL-04',
    sourceNode: 'Domain darkx17-vault.is',
    targetNode: 'Historical Intel Record (alex-k-sec)',
    relationType: 'AUTHORED_BY',
    evidenceType: 'Public Intelligence',
    sourceReport: 'Git Commit Scrapes & SSL Staging Scan',
    observedDate: '21 Feb 2026',
    strength: 'Moderate',
    status: 'SUPPORTING',
    notes: 'Staging deployment shell script committed with author email and moniker "alex-k-sec".',
    investigatorDecision: 'ACCEPTED',
    provenance: {
      origin: 'Stage 2 Entity Resolution',
      originalIndicatorId: 'IND-0019',
      firstObserved: '21 Feb 2026',
      passedToStage2: '22 Feb 2026',
      validationState: 'Active Intelligence Link'
    }
  },
  {
    id: 'REL-05',
    sourceNode: 'Historical Intel Record (alex-k-sec)',
    targetNode: 'Candidate Entity A',
    relationType: 'COMMERCIAL_REGISTRATION',
    evidenceType: 'Commercial Entity',
    sourceReport: 'Commercial Registry & Financial Tax Filing',
    observedDate: '23 Feb 2026',
    strength: 'Strong',
    status: 'SUPPORTING',
    notes: 'Subject A. K. registered corporate domain registrar account used for darkx17-vault.is.',
    investigatorDecision: 'ACCEPTED',
    provenance: {
      origin: 'Stage 2 Entity Resolution',
      originalIndicatorId: 'IND-0038',
      firstObserved: '23 Feb 2026',
      passedToStage2: '23 Feb 2026',
      validationState: 'Active Intelligence Link'
    }
  }
];

export const initialStage2Leads: Record<string, RealWorldAttributionLead> = {
  'Actor Cluster A': {
    id: 'LEAD-TA001-A',
    clusterId: 'Actor Cluster A',
    candidateEntity: 'Candidate Entity A (Subject A. K. / Meridian Analytics Front)',
    entityType: 'Organization',
    jurisdictionEstimate: 'Eastern European Hosting / EU Commercial Registration',
    attributionConfidence: 82,
    status: 'ATTRIBUTION LEAD - HUMAN VALIDATION REQUIRED',
    evidenceConnectionsTotal: 9,
    supportingConnections: 7,
    conflictingConnections: 1,
    unknownConnections: 1,
    resolutionChain: [
      {
        step: 1,
        from: 'Probable Digital Actor Cluster A',
        to: 'Mirror Domain: darkx17-vault.is',
        relationship: 'Publicly announced mirror by darkx17 with signed PGP proof',
        evidenceSource: 'Dread Forum Post #44912 / PGP Sig 0x7E4A8F2C91B4',
        status: 'VERIFIED'
      },
      {
        step: 2,
        from: 'Mirror Domain: darkx17-vault.is',
        to: 'Infrastructure Node 17 (185.220.101.45)',
        relationship: 'DNS A-Record historical resolution (FlokiNET / Njalla proxy)',
        evidenceSource: 'Passive DNS Archive & BGP Route History',
        status: 'VERIFIED'
      },
      {
        step: 3,
        from: 'Infrastructure: 185.220.101.45',
        to: 'Clear-net SSL Cert SHA256: 3c8e...9f21',
        relationship: 'Exposed port 8443 SSL certificate reuse on staging server',
        evidenceSource: 'Shodan / Censys Historical Scan 2025-11',
        status: 'PROBABLE'
      },
      {
        step: 4,
        from: 'SSL Certificate & Domain Whois Privacy',
        to: 'Developer Moniker: "alex-k-sec"',
        relationship: 'Matching SSH public key comments and Git commit author in leaked staging repo',
        evidenceSource: 'GitHub / GitLab Public Archive & Pastebin Scrapes',
        status: 'PROBABLE'
      },
      {
        step: 5,
        from: 'Developer Moniker "alex-k-sec"',
        to: 'Candidate Entity A (Meridian Analytics S.R.O. / Subject A. K.)',
        relationship: 'Corporate registration of domain registrar account & crypto corporate tax filing',
        evidenceSource: 'Commercial Registry & Financial Intelligence Exchange Lead',
        status: 'UNCONFIRMED'
      }
    ],
    investigatorNotes: 'Lead generated strictly as an investigative lead. Requires mutual legal assistance treaty (MLAT) requests or authorized court orders before formal attribution.'
  }
};

export const syntheticTimelineEvents: TimelineEvent[] = [
  {
    id: 'evt-01',
    date: '12 Feb 2026 14:22 UTC',
    title: 'Digital Identity Observed: shadow_x17',
    category: 'CREATION',
    description: 'Account created on Dread Forum. Initial post published in Leaks subsection offering enterprise SQL databases.',
    identitiesInvolved: ['shadow_x17'],
    clusterId: 'Actor Cluster A',
    badgeType: 'info'
  },
  {
    id: 'evt-02',
    date: '15 Feb 2026 09:10 UTC',
    title: 'Technical Indicator Detected: PGP 0x7E4A8F2C91B4',
    category: 'TECHNICAL',
    description: 'PGP Public key uploaded to keys.openpgp.org and pasted into dread forum signature profile.',
    identitiesInvolved: ['shadow_x17'],
    clusterId: 'Actor Cluster A',
    confidenceImpact: '+15% Technical Anchor',
    badgeType: 'success'
  },
  {
    id: 'evt-03',
    date: '18 Feb 2026 19:40 UTC',
    title: 'Infrastructure Relationship Detected',
    category: 'TECHNICAL',
    description: 'Reverse proxy IP 185.220.101.45 linked to darkx17-vault.is staging gateway.',
    identitiesInvolved: ['x_shadow', 'darkx17'],
    clusterId: 'Actor Cluster A',
    confidenceImpact: '+20% Infrastructure Link',
    badgeType: 'success'
  },
  {
    id: 'evt-04',
    date: '20 Feb 2026 10:14 UTC',
    title: 'Actor Cluster A Created & Scored: 92%',
    category: 'CLUSTER',
    description: 'Stage 1 correlation engine aggregated shadow_x17, x_shadow, and darkx17 into Probable Digital Actor Cluster A with 92% Evidence Strength.',
    identitiesInvolved: ['shadow_x17', 'x_shadow', 'darkx17'],
    clusterId: 'Actor Cluster A',
    confidenceImpact: '92% (VERY STRONG EVIDENCE)',
    badgeType: 'success'
  },
  {
    id: 'evt-05',
    date: '21 Feb 2026 16:30 UTC',
    title: 'Investigator Validated Actor Relationship',
    category: 'INVESTIGATOR',
    description: 'Lead Investigator INV-017 verified Stage 1 multi-signal correlation evidence. Status: ELIGIBLE FOR STAGE 2.',
    identitiesInvolved: ['shadow_x17', 'x_shadow', 'darkx17'],
    clusterId: 'Actor Cluster A',
    badgeType: 'info'
  },
  {
    id: 'evt-06',
    date: '22 Feb 2026 11:00 UTC',
    title: 'Stage 2 Attribution Initiated by Investigator',
    category: 'STAGE2',
    description: 'Investigator cleared Critical Decision Gate. Digital indicators transferred to Entity Resolution Engine.',
    identitiesInvolved: ['shadow_x17', 'x_shadow', 'darkx17'],
    clusterId: 'Actor Cluster A',
    confidenceImpact: 'Entity Resolution Active',
    badgeType: 'success'
  },
  {
    id: 'evt-07',
    date: '23 Feb 2026 14:15 UTC',
    title: 'Candidate Entity A Generated (82% Strength)',
    category: 'STAGE2',
    description: 'Entity resolution engine matched historical developer commit and registrar DNS to Candidate Entity A (Meridian S.R.O.).',
    identitiesInvolved: ['shadow_x17', 'darkx17'],
    clusterId: 'Actor Cluster A',
    badgeType: 'info'
  },
  {
    id: 'evt-08',
    date: '24 Feb 2026 09:30 UTC',
    title: 'Investigator Accepted Infrastructure Relationship',
    category: 'INVESTIGATOR',
    description: 'Investigator INV-017 corroborated Infrastructure Node 17 through two independent threat intelligence feeds.',
    identitiesInvolved: ['shadow_x17'],
    clusterId: 'Actor Cluster A',
    confidenceImpact: 'Attribution Strength 82%',
    badgeType: 'success'
  },
  {
    id: 'evt-09',
    date: '25 Feb 2026 10:45 UTC',
    title: 'Attribution Lead Pending Human Validation',
    category: 'STAGE2',
    description: 'Formal attribution lead dossier compiled. Classified: ATTRIBUTION LEAD — HUMAN VALIDATION REQUIRED.',
    identitiesInvolved: ['shadow_x17', 'x_shadow', 'darkx17'],
    clusterId: 'Actor Cluster A',
    badgeType: 'warning'
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'log-01',
    timestamp: '10:42 UTC',
    investigator: 'INV-017',
    action: 'Evidence Accepted',
    target: 'Infrastructure Node 17',
    reason: 'Corroborated across two independent synthetic threat intelligence records.',
    clusterId: 'Actor Cluster A',
    details: 'Investigator accepted infrastructure relationship as supporting evidence.'
  },
  {
    id: 'log-02',
    timestamp: '10:45 UTC',
    investigator: 'INV-017',
    action: 'Evidence Rejected',
    target: 'Financial Link (Mixer Hop 3)',
    reason: 'Insufficient hop trace past CoinJoin pool; excluded from primary attribution calculation.',
    clusterId: 'Actor Cluster A',
    details: 'Investigator rejected mixer hop relationship.'
  },
  {
    id: 'log-03',
    timestamp: '10:51 UTC',
    investigator: 'INV-017',
    action: 'Attribution Lead Generated',
    target: 'Candidate Entity A',
    reason: 'Pending validation against mutual legal assistance (MLAT) statutory framework.',
    clusterId: 'Actor Cluster A',
    details: 'Attribution lead generated with 82% evidence strength.'
  }
];

export const dataSourcesList = [
  {
    id: 'src-01',
    name: 'Tor Onion Forum Scraper Daemon',
    type: 'Darknet Crawl',
    coverage: 'Forum-X (Dread), Market-Y (XSS), Chat-Z (BreachForums), CryptBB',
    status: 'ACTIVE',
    lastSync: '2 minutes ago',
    recordsIndexed: '1,428,940 posts',
    health: '100%'
  },
  {
    id: 'src-02',
    name: 'OpenPGP SKS Key Servers & VKS Mirror',
    type: 'Key Infrastructure',
    coverage: 'keys.openpgp.org, keyserver.ubuntu.com, pgp.mit.edu',
    status: 'ACTIVE',
    lastSync: '14 minutes ago',
    recordsIndexed: '4,102 keys',
    health: '98%'
  },
  {
    id: 'src-03',
    name: 'Blockchain Ledger & UTXO Tracker',
    type: 'Crypto Analytics',
    coverage: 'Bitcoin Core Node (Mainnet), Monero Daemon (RPC)',
    status: 'ACTIVE',
    lastSync: '1 minute ago',
    recordsIndexed: '81,209 transactions',
    health: '100%'
  },
  {
    id: 'src-04',
    name: 'Passive DNS & Autonomous System Scanner',
    type: 'Network Recon',
    coverage: 'BGP RouteViews, Shadowserver, Censys & Shodan API feed',
    status: 'ACTIVE',
    lastSync: '5 minutes ago',
    recordsIndexed: '39,120 IP / Host records',
    health: '99%'
  },
  {
    id: 'src-05',
    name: 'Synthetic Threat Intelligence Records (STIX/TAXII)',
    type: 'Intelligence Feed',
    coverage: 'Curated commercial entity resolution & registrar breach archives',
    status: 'ACTIVE',
    lastSync: '3 minutes ago',
    recordsIndexed: '18,400 entities',
    health: '99%'
  }
];

export const initialPairwiseRelationships: PairwiseRelationship[] = [
  {
    id: 'rel-01-02',
    sourceIdentityId: 'id-01',
    sourceUsername: 'shadow_x17',
    targetIdentityId: 'id-02',
    targetUsername: 'x_shadow',
    relationshipType: 'High-Probability Same-Actor Correlation',
    overallScore: 94,
    classification: 'VERY STRONG EVIDENCE',
    signals: {
      username: {
        dimension: 'Username',
        score: 94,
        strength: 'Strong',
        observedPattern: "Transposed token root: 'shadow' + 'x' suffix/prefix inversion",
        explanation: "Levenshtein distance of 3 with 100% lexical root overlap ('shadow' + 'x'). Represents standard threat actor handle variation across primary and secondary forum accounts."
      },
      stylometry: {
        dimension: 'Stylometry',
        score: 92,
        strength: 'Strong',
        observedPattern: "Double-hyphen (--) delimiter, lowercase punctuation conventions, Oxford comma omission (100%)",
        explanation: "Jaccard syntactic similarity index of 0.89 across 42 extracted darknet forum posts. Idiosyncratic use of '--' delimiter in lieu of standard dashes occurs across 100% of analyzed samples."
      },
      behaviour: {
        dimension: 'Behaviour',
        score: 88,
        strength: 'Strong',
        observedPattern: "Vulnerability research and database monetisation patterns; 45-minute cross-forum escalation",
        explanation: "Threat actor announces database leaks on Forum-X (Dread) under shadow_x17, followed within 45 minutes by sales escrow listings posted by x_shadow on Market-Y (XSS)."
      },
      temporal: {
        dimension: 'Temporal',
        score: 91,
        strength: 'Strong',
        observedPattern: "Diurnal posting window: 20:00–03:00 UTC (Peak: 22:30 UTC)",
        explanation: "Pearson activity correlation coefficient r = 0.88 across 180 monitored days. Complementary active hours indicate identical operational timezone (UTC+03:00) with zero temporal conflict."
      },
      technical: {
        dimension: 'Technical',
        score: 96,
        strength: 'Strong',
        observedPattern: "Direct PGP key collision (0x7E4A8F2C91B4) & outbound reverse proxy (185.220.101.45)",
        explanation: "Hard technical anchor: Identical RSA-4096 PGP key fingerprint referenced in profile signatures of both identities. Both endpoints resolved via shared hosting relay 185.220.101.45."
      }
    },
    supportingEvidence: [
      'Shared cryptographic anchor: PGP fingerprint 0x7E4A8F2C91B4 referenced in both accounts',
      'Shared reverse-proxy hosting node: IP 185.220.101.45 (Njalla/FlokiNET ASN)',
      'Idiosyncratic double-hyphen (--) punctuation habit present across 100% of post samples',
      'Synchronized diurnal activity window (20:00–03:00 UTC), r = 0.88',
      'Monetization escrow coordination: Leak publication followed within 45 min by marketplace listing'
    ],
    conflictingEvidence: [
      'Distinct darknet browser TLS JA3 fingerprints (771,4865-4866... vs 771,4867...) indicating possible dual-workstation or multiple virtual machine profiles'
    ],
    unknownEvidence: [
      'Exact physical MAC address unknown (obscured by virtualized host layer)',
      'ISP subscriber identity unknown (shielded by multi-hop Tor onion routing)'
    ],
    analystSummary: 'Extremely high multi-vector correlation (94%). The presence of a hard cryptographic collision (PGP 0x7E4A8F2C91B4) corroborated by identical stylometric punctuation quirks and synchronized diurnal timelines provides conclusive evidence that both identities operate under unified actor control.'
  },
  {
    id: 'rel-02-03',
    sourceIdentityId: 'id-02',
    sourceUsername: 'x_shadow',
    targetIdentityId: 'id-03',
    targetUsername: 'darkx17',
    relationshipType: 'Infrastructure & Operational Linkage',
    overallScore: 89,
    classification: 'STRONG EVIDENCE',
    signals: {
      username: {
        dimension: 'Username',
        score: 78,
        strength: 'Moderate',
        observedPattern: "Shared numeric token '17' combined with dark/shadow semantic nomenclature",
        explanation: "Semantic vector similarity score of 0.78. Consistent adoption of dark-themed anonymity motifs paired with persistent numeric identifier '17'."
      },
      stylometry: {
        dimension: 'Stylometry',
        score: 86,
        strength: 'Strong',
        observedPattern: "Two-space code block indentations and idiosyncratic technical sentence structures",
        explanation: "Analyzed code snippets and release notes demonstrate matching 2-space tab conventions, lowercase shell syntax, and identical error-handling commentary."
      },
      behaviour: {
        dimension: 'Behaviour',
        score: 90,
        strength: 'Strong',
        observedPattern: "Direct publishing sequence: mirror staging within 12 minutes of thread announcement",
        explanation: "Operational synchronization: darkx17 pushes live mirror links to darkx17-vault.is within 12 minutes of x_shadow advertising newly dumped credentials on forums."
      },
      temporal: {
        dimension: 'Temporal',
        score: 93,
        strength: 'Strong',
        observedPattern: "Coordinated operational schedule: 21:00–04:00 UTC",
        explanation: "Near-identical session timings across both identities with zero overlapping post conflicts. Darkx17 activity surges immediately during active x_shadow dump campaigns."
      },
      technical: {
        dimension: 'Technical',
        score: 94,
        strength: 'Strong',
        observedPattern: "Shared staging infrastructure: darkx17-vault.is hosted behind IP 185.220.101.45",
        explanation: "Clear-web mirror domain darkx17-vault.is shares SSL certificate serial and IP 185.220.101.45 with staging infrastructure previously linked to x_shadow."
      }
    },
    supportingEvidence: [
      'Shared reverse proxy IP 185.220.101.45 hosting darkx17-vault.is mirror gateway',
      'Operational handoff: Mirror deployment occurs within 12 minutes of exploit thread postings',
      'Shared numeric token 17 and thematic naming convention',
      'Matching code indentation (2-space) and lowercase bash command habits'
    ],
    conflictingEvidence: [
      'Divergent marketplace roles: darkx17 operates primarily as infrastructure/filehost provider, while x_shadow conducts commercial escrow brokering'
    ],
    unknownEvidence: [
      'Secondary escrow wallet UTXO keys not yet correlated due to CoinJoin mixing'
    ],
    analystSummary: 'Strong technical and operational linkage (89%). Infrastructure overlap on reverse-proxy 185.220.101.45 combined with rapid sequential publication within 12 minutes demonstrates direct operational coupling.'
  },
  {
    id: 'rel-03-04',
    sourceIdentityId: 'id-03',
    sourceUsername: 'darkx17',
    targetIdentityId: 'id-04',
    targetUsername: 'shadow17',
    relationshipType: 'Codebase & Development Origin Linkage',
    overallScore: 86,
    classification: 'STRONG EVIDENCE',
    signals: {
      username: {
        dimension: 'Username',
        score: 88,
        strength: 'Strong',
        observedPattern: "Common 'shadow17' stem token with developer-oriented suffix variation",
        explanation: "Handle continuity: 'shadow17' preserves the exact alphanumeric stem 'shadow' and '17' utilized across darknet personas."
      },
      stylometry: {
        dimension: 'Stylometry',
        score: 84,
        strength: 'Strong',
        observedPattern: "Git commit syntax 'fix(core): --update' matching forum paste headers",
        explanation: "Commit message structure on public repository mirrors the double-hyphen notation and lowercase format observed in darknet leak descriptions."
      },
      behaviour: {
        dimension: 'Behaviour',
        score: 85,
        strength: 'Strong',
        observedPattern: "Repository commits precede darknet exploit drop releases by an average of 4.2 hours",
        explanation: "Clear causal sequence: source code adjustments committed by x17_dev to private repository branches precede weaponized release drops by darkx17 by 4–6 hours."
      },
      temporal: {
        dimension: 'Temporal',
        score: 89,
        strength: 'Strong',
        observedPattern: "Late-night UTC commits (22:00–02:00 UTC) matching forum activity windows",
        explanation: "Active development windows coincide precisely with operational darknet server maintenance windows observed on darkx17-vault.is."
      },
      technical: {
        dimension: 'Technical',
        score: 87,
        strength: 'Strong',
        observedPattern: "PGP subkey cross-signed by 0x7E4A8F2C91B4; embedded hardened Go proxy binaries",
        explanation: "Codebase analysis of toolchain published by x17_dev contains compiled Go binaries sharing unique cryptographic hashing routines with darkx17 distribution packages."
      }
    },
    supportingEvidence: [
      'Repository commit timeline consistently precedes darknet exploit announcements by 4.2 hours',
      'Shared hardened Go binary compiler flags and unique hashing routines',
      'Handle continuity around the distinctive "x17" identifier stem',
      'Consistent Git commit message syntax utilizing double-hyphen delimiters'
    ],
    conflictingEvidence: [
      'Developer repository profile uses UK English spelling conventions ("optimise"), whereas forum posts feature mixed US/UK terminology'
    ],
    unknownEvidence: [
      'Clearweb Git account registered via anonymous protonmail relay; subscriber details obscured'
    ],
    analystSummary: 'Strong developmental correlation (86%). Temporal precedence of repository commits relative to darknet exploit releases, combined with cross-signed PGP subkeys, provides a verified technical bridge between development and operational deployment.'
  },
  {
    id: 'rel-04-01',
    sourceIdentityId: 'id-04',
    sourceUsername: 'shadow17',
    targetIdentityId: 'id-01',
    targetUsername: 'shadow_x17',
    relationshipType: 'Historical Persona & Cryptographic Heritage',
    overallScore: 91,
    classification: 'VERY STRONG EVIDENCE',
    signals: {
      username: {
        dimension: 'Username',
        score: 90,
        strength: 'Strong',
        observedPattern: "Direct alias reference: 'shadow17' explicitly cited in shadow_x17 profile metadata archives",
        explanation: "Historical web archive crawls from 2024 reveal shadow_x17 originally referenced 'shadow17' (alias x17_dev) as primary contact alias on legacy hacking forums."
      },
      stylometry: {
        dimension: 'Stylometry',
        score: 90,
        strength: 'Strong',
        observedPattern: "Matching technical lexicon, kernel exploitation writeup vocabulary, identical formatting",
        explanation: "NLP feature extraction reveals 90% vocabulary overlap in technical discourse regarding Linux kernel heap grooming and memory corruption mechanics."
      },
      behaviour: {
        dimension: 'Behaviour',
        score: 89,
        strength: 'Strong',
        observedPattern: "White-hat disclosure on clearweb mirror weaponized 14 days later on Dread forum",
        explanation: "Proof-of-concept vulnerability research authored by x17_dev surfaced in weaponized zero-day exploit packages sold by shadow_x17 two weeks later."
      },
      temporal: {
        dimension: 'Temporal',
        score: 92,
        strength: 'Strong',
        observedPattern: "Synchronized dormancy periods: concurrent 3-week absence during December holidays",
        explanation: "Longitudinal temporal analysis reveals identical multi-week hiatuses across both personas, corroborating shared personal lifecycle events."
      },
      technical: {
        dimension: 'Technical',
        score: 94,
        strength: 'Strong',
        observedPattern: "Matching PGP master key / subkey relationship; SSH host key reuse",
        explanation: "SSH host public key (SHA256: 8f3c...71ab) observed on x17_dev development staging server was subsequently identified on shadow_x17 Tor hidden service backend."
      }
    },
    supportingEvidence: [
      'Historical forum archives explicitly corroborate "x17_dev" as early alias of shadow_x17',
      'SSH host key reuse across clearweb development node and darknet onion backend',
      'Identical multi-week dormancy periods across both profiles during holiday intervals',
      '90% stylometric vocabulary overlap on kernel exploit analysis'
    ],
    conflictingEvidence: [
      'x17_dev operates through commercial VPN provider exit, whereas shadow_x17 routes strictly through Tor bridge circuits'
    ],
    unknownEvidence: [
      'Commercial VPN subscriber account logs require formal MLAT subpoena to unmask payment records'
    ],
    analystSummary: 'Very strong longitudinal correlation (91%). Archive historical linkages, SSH host key reuse, and coordinated seasonal dormancy confirm that x17_dev represents the earlier clearweb development identity of threat actor shadow_x17.'
  },
  {
    id: 'rel-01-03',
    sourceIdentityId: 'id-01',
    sourceUsername: 'shadow_x17',
    targetIdentityId: 'id-03',
    targetUsername: 'darkx17',
    relationshipType: 'Syndicated Distribution & Infrastructure Clustering',
    overallScore: 88,
    classification: 'STRONG EVIDENCE',
    signals: {
      username: {
        dimension: 'Username',
        score: 82,
        strength: 'Strong',
        observedPattern: "Shared 'x17' numeric identifier; semantic duality ('shadow' vs 'dark')",
        explanation: "Complementary semantic tokens reflecting identical persona naming logic."
      },
      stylometry: {
        dimension: 'Stylometry',
        score: 87,
        strength: 'Strong',
        observedPattern: "Double-hyphen delimiters, lowercase hex notation, concise announcement format",
        explanation: "Punctuation and formatting styles match the established actor baseline across both platforms."
      },
      behaviour: {
        dimension: 'Behaviour',
        score: 86,
        strength: 'Strong',
        observedPattern: "Syndicated distribution: darkx17 acts as failover mirror provider for shadow_x17 releases",
        explanation: "Whenever shadow_x17 pastebin mirrors are taken down, darkx17 issues fresh download mirrors within 30 minutes."
      },
      temporal: {
        dimension: 'Temporal',
        score: 90,
        strength: 'Strong',
        observedPattern: "Correlated diurnal timeline (20:00–03:00 UTC) with zero conflicting timestamps",
        explanation: "Activity peaks coincide across all active campaign intervals."
      },
      technical: {
        dimension: 'Technical',
        score: 93,
        strength: 'Strong',
        observedPattern: "Both identities route through shared Njalla/FlokiNET reverse-proxy (185.220.101.45)",
        explanation: "Network topology confirms co-location of staging and distribution infrastructure behind unified proxy."
      }
    },
    supportingEvidence: [
      'Shared reverse-proxy hosting node 185.220.101.45',
      'Automated failover mirror deployment during takedown events',
      'Shared numeric token "x17" and thematic naming taxonomy'
    ],
    conflictingEvidence: [
      'Different primary Jabber/XMPP server domains registered for out-of-band communication'
    ],
    unknownEvidence: [
      'Tor guard relay fingerprints cannot be inspected without Tor directory authority logs'
    ],
    analystSummary: 'Strong infrastructure and operational linkage (88%). The unified hosting topology and synchronized failover response confirm darkx17 as a secondary infrastructure identity of the primary threat actor.'
  }
];

export function getPairwiseRelationship(sourceId: string, targetId: string): PairwiseRelationship | undefined {
  return initialPairwiseRelationships.find(
    rel => (rel.sourceIdentityId === sourceId && rel.targetIdentityId === targetId) ||
           (rel.sourceIdentityId === targetId && rel.targetIdentityId === sourceId)
  );
}

