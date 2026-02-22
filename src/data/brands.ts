export type EthicalRating = "A" | "B" | "C" | "D" | "E";

export interface EthicalIssue {
  category: string;
  description: string;
  severity: "low" | "medium" | "high";
  source?: string;
}

export interface HumanOwner {
  name: string;
  role: string;
  ownershipPercent?: number;
  estimatedValue?: string;
  type: "individual" | "family" | "institutional" | "executive";
}

export interface Corporation {
  slug: string;
  name: string;
  logo: string;
  country: string;
  revenue: string;
  employees: string;
  marketCap?: string;
  ethicalRating: EthicalRating;
  issues: EthicalIssue[];
  description: string;
  owners: HumanOwner[];
  publiclyTraded: boolean;
  stockTicker?: string;
}

export interface Brand {
  slug: string;
  name: string;
  category: string;
  parentSlug: string;
  logo: string;
  ethicalRating: EthicalRating;
  description: string;
  alternatives: string[];
  supermarkets: string[];
  barcodePrefixes?: string[];
}

export interface EthicalAlternative {
  slug: string;
  name: string;
  category: string;
  logo: string;
  ethicalRating: EthicalRating;
  description: string;
  certifications: string[];
  supermarkets: string[];
  website?: string;
  whyBetter: string;
}

// ════════════════════════════════════════════════════
// CORPORATIONS — with verified human ownership data
// ════════════════════════════════════════════════════

export const corporations: Corporation[] = [
  {
    slug: "nestle",
    name: "Nestlé",
    logo: "🏭",
    country: "Switzerland",
    revenue: "CHF 93B (~$105B)",
    employees: "270,000+",
    marketCap: "~$250B",
    ethicalRating: "D",
    publiclyTraded: true,
    stockTicker: "NESN (SIX)",
    description:
      "World's largest food & beverage company. HQ in Vevey, Switzerland. No single controlling shareholder — mostly institutional.",
    owners: [
      { name: "BlackRock Inc.", role: "Largest institutional shareholder", ownershipPercent: 5.1, estimatedValue: "$12.7B", type: "institutional" },
      { name: "Vanguard Group", role: "Major institutional shareholder", ownershipPercent: 3.2, estimatedValue: "$8B", type: "institutional" },
      { name: "Norges Bank (Norway Sovereign Fund)", role: "Sovereign wealth fund", ownershipPercent: 2.9, estimatedValue: "$7.2B", type: "institutional" },
      { name: "Philipp Navratil", role: "CEO (since Sept 2025, replaced Schneider)", type: "executive" },
      { name: "Pablo Isla", role: "Chairman (since Oct 2025, replaced Bulcke)", type: "executive" },
    ],
    issues: [
      { category: "Water Rights", description: "Controversial water extraction in drought-affected communities. Bottled water brands accused of depleting local aquifers.", severity: "high", source: "The Guardian, Corporate Accountability" },
      { category: "Child Labour", description: "Documented child labour in cocoa supply chain in Côte d'Ivoire and Ghana. Named in US Supreme Court case Nestlé USA v. Doe (2021).", severity: "high", source: "International Labor Rights Forum" },
      { category: "Plastic Pollution", description: "Named #1 or #2 top plastic polluter globally by Break Free From Plastic (2019-2023).", severity: "high", source: "Break Free From Plastic" },
      { category: "Baby Formula Marketing", description: "Aggressive marketing of infant formula in developing countries since 1970s. WHO Code violations documented across multiple countries.", severity: "medium", source: "WHO, Changing Markets Foundation" },
    ],
  },
  {
    slug: "unilever",
    name: "Unilever",
    logo: "🧴",
    country: "United Kingdom",
    revenue: "€60B (~$65B)",
    employees: "127,000+",
    marketCap: "~$150B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "ULVR (LSE)",
    description:
      "Anglo-Dutch multinational, now HQ'd in London. Sold its tea division (PG Tips, Lipton) to CVC Capital Partners in 2022 under brand Ekaterra.",
    owners: [
      { name: "Vanguard Group", role: "Largest institutional shareholder", ownershipPercent: 4.1, estimatedValue: "$6.1B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Major institutional shareholder", ownershipPercent: 3.8, estimatedValue: "$5.7B", type: "institutional" },
      { name: "Leverhulme Trust", role: "Legacy foundation shareholding", ownershipPercent: 1.3, estimatedValue: "$1.9B", type: "institutional" },
      { name: "Fernando Fernandez", role: "CEO (since March 2025, replaced Schumacher)", type: "executive" },
      { name: "Ian Meakins", role: "Chairman (since 2023)", type: "executive" },
    ],
    issues: [
      { category: "Deforestation", description: "Palm oil sourcing linked to rainforest destruction in Indonesia and Malaysia.", severity: "high", source: "Greenpeace, Rainforest Action Network" },
      { category: "Greenwashing", description: "Sustainability claims challenged by Dutch regulators. Accused of overstating environmental progress.", severity: "medium", source: "Changing Markets Foundation" },
      { category: "Tax Practices", description: "Complex corporate structures across multiple jurisdictions to minimise tax obligations.", severity: "medium", source: "Tax Justice Network" },
    ],
  },
  {
    slug: "pg",
    name: "Procter & Gamble",
    logo: "🧼",
    country: "United States",
    revenue: "$84B",
    employees: "107,000+",
    marketCap: "~$390B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "PG (NYSE)",
    description: "American consumer goods giant, HQ in Cincinnati, Ohio. One of the world's most valuable consumer companies.",
    owners: [
      { name: "Vanguard Group", role: "Largest shareholder", ownershipPercent: 9.1, estimatedValue: "$35.5B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Second largest shareholder", ownershipPercent: 7.2, estimatedValue: "$28.1B", type: "institutional" },
      { name: "State Street Corp", role: "Major shareholder", ownershipPercent: 4.5, estimatedValue: "$17.5B", type: "institutional" },
      { name: "Jon R. Moeller", role: "Chairman & CEO", type: "executive" },
      { name: "Nelson Peltz", role: "Trian Fund — activist investor, board seat (2018)", ownershipPercent: 0.5, type: "individual" },
    ],
    issues: [
      { category: "Animal Testing", description: "Continues animal testing for product safety in some markets where required by law.", severity: "high", source: "PETA, Cruelty Free International" },
      { category: "Deforestation", description: "Linked to deforestation through pulp and palm oil supply chains (tissue, nappies).", severity: "high", source: "NRDC, Stand.earth" },
      { category: "Plastic Pollution", description: "Major contributor to single-use plastic packaging waste.", severity: "medium", source: "Break Free From Plastic" },
    ],
  },
  {
    slug: "coca-cola",
    name: "The Coca-Cola Company",
    logo: "🥤",
    country: "United States",
    revenue: "$46B",
    employees: "82,000+",
    marketCap: "~$260B",
    ethicalRating: "D",
    publiclyTraded: true,
    stockTicker: "KO (NYSE)",
    description: "American beverage giant, HQ in Atlanta, Georgia. Warren Buffett's Berkshire Hathaway is the single largest shareholder.",
    owners: [
      { name: "Warren Buffett / Berkshire Hathaway", role: "Largest individual shareholder — held since 1988", ownershipPercent: 9.3, estimatedValue: "$24.2B", type: "individual" },
      { name: "Vanguard Group", role: "Largest institutional shareholder", ownershipPercent: 8.5, estimatedValue: "$22.1B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Major institutional shareholder", ownershipPercent: 7.1, estimatedValue: "$18.5B", type: "institutional" },
      { name: "James Quincey", role: "Chairman & CEO (stepping down as CEO March 2026)", type: "executive" },
      { name: "Henrique Braun", role: "Incoming CEO (effective March 2026), current COO", type: "executive" },
    ],
    issues: [
      { category: "Plastic Pollution", description: "Named world's #1 plastic polluter by Break Free From Plastic for 5 consecutive years (2018-2022).", severity: "high", source: "Break Free From Plastic" },
      { category: "Water Depletion", description: "Excessive water extraction in water-stressed communities in India, Mexico, and Central America.", severity: "high", source: "India Resource Center, The Guardian" },
      { category: "Health Lobbying", description: "Spent millions lobbying against sugar taxes and funded research to downplay sugar's health impacts.", severity: "medium", source: "BMJ, Corporate Europe Observatory" },
      { category: "Labour Rights", description: "Allegations of anti-union violence and intimidation against workers in Colombia and Guatemala.", severity: "high", source: "SINALTRAINAL, Killer Coke Campaign" },
    ],
  },
  {
    slug: "pepsico",
    name: "PepsiCo",
    logo: "🥤",
    country: "United States",
    revenue: "$91B",
    employees: "315,000+",
    marketCap: "~$230B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "PEP (NYSE)",
    description: "American food, snack, and beverage corporation, HQ in Purchase, New York. Sold Tropicana to PAI Partners in 2022.",
    owners: [
      { name: "Vanguard Group", role: "Largest shareholder", ownershipPercent: 8.8, estimatedValue: "$20.2B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Second largest shareholder", ownershipPercent: 7.4, estimatedValue: "$17B", type: "institutional" },
      { name: "State Street Corp", role: "Major shareholder", ownershipPercent: 4.6, estimatedValue: "$10.6B", type: "institutional" },
      { name: "Ramon Laguarta", role: "Chairman & CEO (since 2018)", type: "executive" },
    ],
    issues: [
      { category: "Plastic Pollution", description: "Among the top 5 global plastic polluters annually.", severity: "high", source: "Break Free From Plastic" },
      { category: "Water Usage", description: "High water usage in manufacturing in water-scarce areas of India and Mexico.", severity: "medium", source: "India Resource Center" },
      { category: "Health Impact", description: "Heavy marketing of sugary and ultra-processed foods to children globally.", severity: "medium", source: "WHO" },
    ],
  },
  {
    slug: "mars",
    name: "Mars, Inc.",
    logo: "🍫",
    country: "United States",
    revenue: "$50B+",
    employees: "150,000+",
    ethicalRating: "C",
    publiclyTraded: false,
    description: "100% FAMILY-OWNED private company. One of the largest private companies in the world. HQ in McLean, Virginia. The Mars family are among the richest people on Earth. Acquired Kellanova in 2024 for $36B.",
    owners: [
      { name: "Jacqueline Mars", role: "Mars family heiress, board member", ownershipPercent: 33, estimatedValue: "$46B", type: "family" },
      { name: "John Franklyn Mars", role: "Mars family heir", ownershipPercent: 33, estimatedValue: "$46B", type: "family" },
      { name: "Victoria Mars", role: "Mars family, former board chair", ownershipPercent: 8, estimatedValue: "$11B", type: "family" },
      { name: "Poul Weihrauch", role: "CEO (since 2022)", type: "executive" },
    ],
    issues: [
      { category: "Child Labour", description: "Cocoa supply chain linked to child labour in West Africa. Despite pledges since 2001, independent audits still find abuses.", severity: "high", source: "Washington Post, NORC at University of Chicago" },
      { category: "Deforestation", description: "Palm oil and cocoa sourcing connected to tropical deforestation.", severity: "medium", source: "Mighty Earth" },
      { category: "Health Impact", description: "Major producer of high-sugar confectionery heavily marketed to children.", severity: "medium", source: "Action on Sugar" },
    ],
  },
  {
    slug: "mondelez",
    name: "Mondelēz International",
    logo: "🍪",
    country: "United States",
    revenue: "$36B",
    employees: "91,000+",
    marketCap: "~$95B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "MDLZ (NASDAQ)",
    description: "American confectionery and snacks company. Spun off from Kraft Foods in 2012. Owns Cadbury (controversial 2010 hostile takeover).",
    owners: [
      { name: "Vanguard Group", role: "Largest shareholder", ownershipPercent: 8.9, estimatedValue: "$8.5B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Second largest shareholder", ownershipPercent: 7.3, estimatedValue: "$6.9B", type: "institutional" },
      { name: "Nelson Peltz / Trian Fund", role: "Largest individual shareholder, activist investor", ownershipPercent: 6.0, estimatedValue: "$4.2B", type: "individual" },
      { name: "Dirk Van de Put", role: "Chairman & CEO (since 2017)", type: "executive" },
    ],
    issues: [
      { category: "Child Labour", description: "Cocoa supply chain in West Africa linked to child labour. Named in US legal proceedings.", severity: "high", source: "International Rights Advocates" },
      { category: "Deforestation", description: "Palm oil sourcing linked to deforestation in Southeast Asia and West Africa.", severity: "medium", source: "Mighty Earth" },
      { category: "Tax Avoidance", description: "Complex Zurich-based tax structures. Shifted billions in profits to low-tax jurisdictions.", severity: "medium", source: "ICIJ, Oxfam" },
      { category: "Cadbury Heritage Destruction", description: "2010 hostile takeover of Cadbury broke promises on UK factory jobs within weeks of acquisition.", severity: "medium", source: "The Guardian, BBC" },
    ],
  },
  {
    slug: "kenvue",
    name: "Kenvue (ex-J&J Consumer)",
    logo: "💊",
    country: "United States",
    revenue: "$15B",
    employees: "22,000+",
    marketCap: "~$40B",
    ethicalRating: "D",
    publiclyTraded: true,
    stockTicker: "KVUE (NYSE)",
    description: "Spun off from Johnson & Johnson in 2023. Holds consumer health brands (Johnson's Baby, Listerine, Neutrogena). J&J fully divested by 2024. Kimberly-Clark announced $48.7B acquisition of Kenvue in Nov 2025 (expected to close H2 2026).",
    owners: [
      { name: "Johnson & Johnson", role: "Retained ~9.5% stake post-IPO (divesting)", ownershipPercent: 9.5, estimatedValue: "$3.8B", type: "institutional" },
      { name: "Vanguard Group", role: "Major shareholder", ownershipPercent: 8.2, estimatedValue: "$3.3B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Major shareholder", ownershipPercent: 6.7, estimatedValue: "$2.7B", type: "institutional" },
      { name: "Thibaut Mongon", role: "CEO", type: "executive" },
    ],
    issues: [
      { category: "Product Safety", description: "Talc-based baby powder linked to cancer — J&J/Kenvue paid $8.9B in settlements. Product discontinued.", severity: "high", source: "Reuters, court filings" },
      { category: "Opioid Crisis", description: "Parent J&J paid $5B in opioid settlements before spin-off.", severity: "high", source: "DOJ, State AG filings" },
      { category: "Greenwashing", description: "Marketing 'natural' and 'gentle' claims challenged by consumer advocates.", severity: "low", source: "Truth in Advertising" },
    ],
  },
  {
    slug: "danone",
    name: "Danone",
    logo: "🥛",
    country: "France",
    revenue: "€28B (~$30B)",
    employees: "96,000+",
    marketCap: "~$45B",
    ethicalRating: "B",
    publiclyTraded: true,
    stockTicker: "BN (Euronext Paris)",
    description: "French multinational. Became an Entreprise à Mission in 2020. CEO Emmanuel Faber was ousted by activist investors in 2021 for prioritising purpose over profits.",
    owners: [
      { name: "Artisan Partners", role: "Activist investor who ousted CEO", ownershipPercent: 3.5, estimatedValue: "$1.6B", type: "institutional" },
      { name: "Vanguard Group", role: "Major shareholder", ownershipPercent: 3.1, estimatedValue: "$1.4B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Major shareholder", ownershipPercent: 2.8, estimatedValue: "$1.3B", type: "institutional" },
      { name: "Antoine de Saint-Affrique", role: "CEO (since 2021)", type: "executive" },
    ],
    issues: [
      { category: "Plastic Pollution", description: "Heavy reliance on single-use plastic for Evian, Volvic water bottles.", severity: "medium", source: "Break Free From Plastic" },
      { category: "Water Extraction", description: "Evian and Volvic brands extract water in regions with growing scarcity concerns.", severity: "medium", source: "Local community groups" },
    ],
  },
  {
    slug: "associated-british-foods",
    name: "Associated British Foods",
    logo: "🏪",
    country: "United Kingdom",
    revenue: "£20B (~$25B)",
    employees: "133,000+",
    marketCap: "~$18B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "ABF (LSE)",
    description: "British multinational. The Weston family controls 54.5% through Wittington Investments. Owns Primark, Twinings, Kingsmill, and British Sugar.",
    owners: [
      { name: "Weston Family / Wittington Investments", role: "Controlling shareholder — 58.8% via Wittington (owned 79.2% by Garfield Weston Foundation)", ownershipPercent: 62.8, estimatedValue: "$11.3B", type: "family" },
      { name: "Garfield Weston Foundation", role: "Charitable trust owning 79.2% of Wittington. £8.3B in assets, awarded £140M in grants 2024/25", type: "institutional" },
      { name: "George Weston", role: "CEO (since 2005), great-grandson of founder Garfield Weston", type: "executive" },
    ],
    issues: [
      { category: "Fast Fashion Labour", description: "Primark's supply chain linked to poor working conditions. Rana Plaza factory collapse (2013) killed 1,134 workers making clothes for Primark and others.", severity: "high", source: "Clean Clothes Campaign, ILO" },
      { category: "Tax Practices", description: "Complex corporate structures questioned by campaign groups.", severity: "medium", source: "ActionAid" },
    ],
  },
  {
    slug: "reckitt",
    name: "Reckitt Benckiser",
    logo: "🧹",
    country: "United Kingdom",
    revenue: "£14B (~$18B)",
    employees: "40,000+",
    marketCap: "~$45B",
    ethicalRating: "C",
    publiclyTraded: true,
    stockTicker: "RKT (LSE)",
    description: "British multinational producing health, hygiene, and nutrition products. HQ in Slough, UK.",
    owners: [
      { name: "JAB Holding Company (Reimann family)", role: "Largest single shareholder — German billionaire family", ownershipPercent: 5.2, estimatedValue: "$2.3B", type: "family" },
      { name: "Vanguard Group", role: "Major institutional shareholder", ownershipPercent: 3.9, estimatedValue: "$1.8B", type: "institutional" },
      { name: "BlackRock Inc.", role: "Major institutional shareholder", ownershipPercent: 3.5, estimatedValue: "$1.6B", type: "institutional" },
      { name: "Kris Licht", role: "CEO (since 2023)", type: "executive" },
    ],
    issues: [
      { category: "Product Safety", description: "Nurofen misleading packaging — fined in Australia (2016). Sold identical painkillers under different names at premium prices.", severity: "high", source: "ACCC, The Guardian" },
      { category: "Opioid Crisis", description: "Subsidiary Indivior settled $1.4B over Suboxone marketing practices.", severity: "high", source: "DOJ" },
      { category: "Reimann Family History", description: "Major shareholder Reimann family acknowledged ancestors used forced labour during Nazi era, pledged €10M to charity.", severity: "medium", source: "Bild, The Guardian" },
    ],
  },
  {
    slug: "ekaterra",
    name: "Lipton Teas and Infusions (ex-Ekaterra)",
    logo: "🫖",
    country: "Netherlands / Private Equity",
    revenue: "€2B (~$2.2B)",
    employees: "10,000+",
    ethicalRating: "C",
    publiclyTraded: false,
    description: "World's largest tea company. 34 brands. Acquired from Unilever by CVC Capital Partners in 2022 for €4.5B. Originally named Ekaterra, rebranded to Lipton Teas and Infusions. Owns PG Tips, Lipton, Pukka, T2, TAZO.",
    owners: [
      { name: "CVC Capital Partners", role: "Private equity owner — acquired from Unilever for €4.5B", ownershipPercent: 100, estimatedValue: "€4.5B", type: "institutional" },
      { name: "Rolly van Rappard", role: "CVC Co-Chairman", type: "executive" },
    ],
    issues: [
      { category: "Worker Rights", description: "Tea plantation worker conditions in Kenya and India remain a concern under new ownership.", severity: "medium", source: "Ethical Consumer" },
      { category: "Private Equity Model", description: "PE ownership typically prioritises cost-cutting and quick returns over long-term sustainability.", severity: "low", source: "Financial Times" },
    ],
  },
];

// ════════════════════════════════════════════════════
// BRANDS — corrected ownership (audited 2025)
// ════════════════════════════════════════════════════

export const brands: Brand[] = [
  // ── Nestlé ──
  { slug: "kitkat", name: "KitKat", category: "Confectionery", parentSlug: "nestle", logo: "🍫", ethicalRating: "D", description: "Chocolate-covered wafer bar. One of the world's best-selling chocolate bars.", alternatives: ["tonys-chocolonely", "divine-chocolate"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"], barcodePrefixes: ["76"] },
  { slug: "nescafe", name: "Nescafé", category: "Coffee", parentSlug: "nestle", logo: "☕", ethicalRating: "D", description: "World's leading instant coffee brand.", alternatives: ["cafedirect", "equal-exchange-coffee"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"] },
  { slug: "nespresso", name: "Nespresso", category: "Coffee", parentSlug: "nestle", logo: "☕", ethicalRating: "D", description: "Premium coffee capsule system.", alternatives: ["cafedirect", "equal-exchange-coffee"], supermarkets: ["Nespresso boutiques", "Waitrose"] },
  { slug: "maggi", name: "Maggi", category: "Food", parentSlug: "nestle", logo: "🍜", ethicalRating: "D", description: "Instant noodles, seasonings, and soups.", alternatives: [], supermarkets: ["Tesco", "ASDA", "Morrisons"] },
  { slug: "purina", name: "Purina", category: "Pet Food", parentSlug: "nestle", logo: "🐕", ethicalRating: "D", description: "Pet food for cats and dogs.", alternatives: ["lily-kitchen"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "san-pellegrino", name: "S.Pellegrino", category: "Beverages", parentSlug: "nestle", logo: "💧", ethicalRating: "D", description: "Italian sparkling mineral water.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "Waitrose"] },
  { slug: "lily-kitchen", name: "Lily's Kitchen", category: "Pet Food", parentSlug: "nestle", logo: "🐕", ethicalRating: "B", description: "Natural pet food. B Corp certified BUT acquired by Nestlé in 2020.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Pets at Home"] },

  // ── Unilever ──
  { slug: "dove", name: "Dove", category: "Personal Care", parentSlug: "unilever", logo: "🧴", ethicalRating: "C", description: "Personal care — beauty bars and body wash.", alternatives: ["faith-in-nature"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },
  { slug: "ben-jerrys", name: "Ben & Jerry's", category: "Ice Cream", parentSlug: "unilever", logo: "🍦", ethicalRating: "B", description: "Premium ice cream. Known for social activism and Fairtrade ingredients.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"] },
  { slug: "hellmanns", name: "Hellmann's", category: "Condiments", parentSlug: "unilever", logo: "🥚", ethicalRating: "C", description: "World's biggest mayonnaise brand.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "persil", name: "Persil", category: "Household", parentSlug: "unilever", logo: "🧺", ethicalRating: "C", description: "Laundry detergent (Unilever in UK).", alternatives: ["ecover", "method"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "lynx", name: "Lynx (Axe)", category: "Personal Care", parentSlug: "unilever", logo: "🧴", ethicalRating: "C", description: "Male grooming brand.", alternatives: ["faith-in-nature"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },
  { slug: "magnum", name: "Magnum", category: "Ice Cream", parentSlug: "unilever", logo: "🍦", ethicalRating: "C", description: "Premium ice cream bar.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Ekaterra (ex-Unilever tea) ──
  { slug: "pg-tips", name: "PG Tips", category: "Tea", parentSlug: "ekaterra", logo: "🫖", ethicalRating: "C", description: "UK's most popular tea. Sold by Unilever to CVC Capital Partners (Ekaterra) in 2022.", alternatives: ["clipper-tea", "teapigs"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"] },

  // ── Procter & Gamble ──
  { slug: "gillette", name: "Gillette", category: "Personal Care", parentSlug: "pg", logo: "🪒", ethicalRating: "C", description: "Razor and personal grooming.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },
  { slug: "pampers", name: "Pampers", category: "Baby Care", parentSlug: "pg", logo: "👶", ethicalRating: "C", description: "World's largest disposable nappy brand.", alternatives: ["kit-and-kin"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },
  { slug: "ariel", name: "Ariel", category: "Household", parentSlug: "pg", logo: "🧺", ethicalRating: "C", description: "Laundry detergent.", alternatives: ["ecover", "method"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "oral-b", name: "Oral-B", category: "Oral Care", parentSlug: "pg", logo: "🪥", ethicalRating: "C", description: "Toothbrush and oral care.", alternatives: ["georganics"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },
  { slug: "fairy", name: "Fairy", category: "Household", parentSlug: "pg", logo: "🧴", ethicalRating: "C", description: "Washing-up liquid and dishwasher products.", alternatives: ["ecover", "method"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Coca-Cola ──
  { slug: "coca-cola-classic", name: "Coca-Cola", category: "Beverages", parentSlug: "coca-cola", logo: "🥤", ethicalRating: "D", description: "World's most recognised soft drink.", alternatives: ["karma-cola"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"], barcodePrefixes: ["5449"] },
  { slug: "fanta", name: "Fanta", category: "Beverages", parentSlug: "coca-cola", logo: "🍊", ethicalRating: "D", description: "Fruit-flavoured carbonated drink.", alternatives: ["karma-cola"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "sprite", name: "Sprite", category: "Beverages", parentSlug: "coca-cola", logo: "🍋", ethicalRating: "D", description: "Lemon-lime soft drink.", alternatives: ["karma-cola"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "innocent", name: "Innocent Drinks", category: "Beverages", parentSlug: "coca-cola", logo: "🥤", ethicalRating: "C", description: "Smoothie brand. 100% owned by Coca-Cola since 2013.", alternatives: ["cawston-press"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose"] },
  { slug: "costa-coffee", name: "Costa Coffee", category: "Coffee", parentSlug: "coca-cola", logo: "☕", ethicalRating: "C", description: "UK's largest coffee chain, acquired by Coca-Cola in 2019.", alternatives: ["cafedirect"], supermarkets: ["Tesco", "Sainsbury's", "Costa stores"] },

  // ── PepsiCo ──
  { slug: "pepsi", name: "Pepsi", category: "Beverages", parentSlug: "pepsico", logo: "🥤", ethicalRating: "C", description: "Carbonated soft drink.", alternatives: ["karma-cola"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "walkers", name: "Walkers", category: "Snacks", parentSlug: "pepsico", logo: "🥔", ethicalRating: "C", description: "UK's most popular crisps (Lay's internationally).", alternatives: ["tyrrells", "pipers"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"] },
  { slug: "doritos", name: "Doritos", category: "Snacks", parentSlug: "pepsico", logo: "🌮", ethicalRating: "C", description: "Flavoured tortilla chips.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "quaker", name: "Quaker Oats", category: "Cereal", parentSlug: "pepsico", logo: "🥣", ethicalRating: "C", description: "Oat-based products and cereals.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Mars (includes Kellanova brands post-2024 acquisition) ──
  { slug: "mars-bar", name: "Mars Bar", category: "Confectionery", parentSlug: "mars", logo: "🍫", ethicalRating: "C", description: "Iconic chocolate bar.", alternatives: ["tonys-chocolonely", "divine-chocolate"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"] },
  { slug: "snickers", name: "Snickers", category: "Confectionery", parentSlug: "mars", logo: "🍫", ethicalRating: "C", description: "Chocolate bar with peanuts, caramel, and nougat.", alternatives: ["tonys-chocolonely"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "mms", name: "M&M's", category: "Confectionery", parentSlug: "mars", logo: "🍬", ethicalRating: "C", description: "Button-shaped chocolate candies.", alternatives: ["divine-chocolate"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "whiskas", name: "Whiskas", category: "Pet Food", parentSlug: "mars", logo: "🐱", ethicalRating: "C", description: "Cat food. Part of Mars Petcare.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "uncle-bens", name: "Ben's Original", category: "Food", parentSlug: "mars", logo: "🍚", ethicalRating: "C", description: "Rice and sauces (rebranded from Uncle Ben's 2020).", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "pringles", name: "Pringles", category: "Snacks", parentSlug: "mars", logo: "🥔", ethicalRating: "C", description: "Stackable crisps. Now Mars-owned via Kellanova acquisition (2024).", alternatives: ["tyrrells", "pipers"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Mondelēz ──
  { slug: "cadbury", name: "Cadbury", category: "Confectionery", parentSlug: "mondelez", logo: "🍫", ethicalRating: "C", description: "Iconic British chocolate. Controversially taken over by Kraft/Mondelēz in hostile 2010 bid.", alternatives: ["tonys-chocolonely", "divine-chocolate"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"] },
  { slug: "oreo", name: "Oreo", category: "Biscuits", parentSlug: "mondelez", logo: "🍪", ethicalRating: "C", description: "Chocolate sandwich cookie.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "philadelphia", name: "Philadelphia", category: "Dairy", parentSlug: "mondelez", logo: "🧀", ethicalRating: "C", description: "Cream cheese brand.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Kenvue (ex-J&J) ──
  { slug: "johnsons-baby", name: "Johnson's Baby", category: "Baby Care", parentSlug: "kenvue", logo: "👶", ethicalRating: "D", description: "Baby care products. Now Kenvue after J&J split (2023).", alternatives: ["kit-and-kin"], supermarkets: ["Tesco", "Sainsbury's", "Boots"] },
  { slug: "listerine", name: "Listerine", category: "Oral Care", parentSlug: "kenvue", logo: "🪥", ethicalRating: "D", description: "Mouthwash. Now Kenvue after J&J split (2023).", alternatives: ["georganics"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"] },

  // ── Danone ──
  { slug: "evian", name: "Evian", category: "Beverages", parentSlug: "danone", logo: "💧", ethicalRating: "B", description: "Mineral water from the French Alps.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "Waitrose"] },
  { slug: "alpro", name: "Alpro", category: "Dairy Alternatives", parentSlug: "danone", logo: "🥛", ethicalRating: "B", description: "Plant-based dairy alternatives.", alternatives: ["oatly", "minor-figures"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"] },
  { slug: "activia", name: "Activia", category: "Dairy", parentSlug: "danone", logo: "🥛", ethicalRating: "B", description: "Probiotic yoghurt.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Associated British Foods ──
  { slug: "primark", name: "Primark", category: "Clothing & Retail", parentSlug: "associated-british-foods", logo: "👕", ethicalRating: "D", description: "Fast fashion retailer. Weston family controls parent ABF (54.5%).", alternatives: [], supermarkets: ["Primark stores"] },
  { slug: "twinings", name: "Twinings", category: "Tea", parentSlug: "associated-british-foods", logo: "🫖", ethicalRating: "C", description: "Premium tea brand (est. 1706). Weston family-controlled.", alternatives: ["clipper-tea", "teapigs"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose"] },
  { slug: "kingsmill", name: "Kingsmill", category: "Bakery", parentSlug: "associated-british-foods", logo: "🍞", ethicalRating: "C", description: "Major UK bread brand.", alternatives: [], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },

  // ── Reckitt ──
  { slug: "dettol", name: "Dettol", category: "Household", parentSlug: "reckitt", logo: "🧹", ethicalRating: "C", description: "Antiseptic and cleaning brand.", alternatives: ["method", "ecover"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
  { slug: "durex", name: "Durex", category: "Health", parentSlug: "reckitt", logo: "💊", ethicalRating: "C", description: "Sexual health and wellbeing.", alternatives: [], supermarkets: ["Tesco", "Boots", "Superdrug"] },
  { slug: "nurofen", name: "Nurofen", category: "Health", parentSlug: "reckitt", logo: "💊", ethicalRating: "C", description: "Ibuprofen pain relief. Fined for misleading packaging.", alternatives: [], supermarkets: ["Tesco", "Boots", "Superdrug"] },
  { slug: "vanish", name: "Vanish", category: "Household", parentSlug: "reckitt", logo: "🧺", ethicalRating: "C", description: "Stain removal products.", alternatives: ["ecover"], supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"] },
];

// ════════════════════════════════════════════════════
// ETHICAL ALTERNATIVES — the real heroes
// ════════════════════════════════════════════════════

export const ethicalAlternatives: EthicalAlternative[] = [
  {
    slug: "tonys-chocolonely",
    name: "Tony's Chocolonely",
    category: "Confectionery",
    logo: "🍫",
    ethicalRating: "A",
    description: "Dutch chocolate on a mission to make all chocolate 100% slave-free.",
    certifications: ["Fairtrade", "B Corp"],
    whyBetter: "Pays cocoa farmers above Fairtrade minimum. Full supply chain transparency. Actively campaigns to end child labour in chocolate.",
    supermarkets: ["Sainsbury's", "Waitrose", "Whole Foods", "Ocado"],
    website: "tonyschocolonely.com",
  },
  {
    slug: "divine-chocolate",
    name: "Divine Chocolate",
    category: "Confectionery",
    logo: "🍫",
    ethicalRating: "A",
    description: "Fairtrade chocolate co-owned by cocoa farmers in Ghana.",
    certifications: ["Fairtrade", "B Corp"],
    whyBetter: "Kuapa Kokoo farmers' co-op owns 44% of the company. Profits flow directly to farming communities. It's chocolate that changes lives.",
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado", "Co-op"],
    website: "divinechocolate.com",
  },
  {
    slug: "cafedirect",
    name: "Cafédirect",
    category: "Coffee",
    logo: "☕",
    ethicalRating: "A",
    description: "UK's largest Fairtrade hot drinks brand. Farmer-owned social enterprise.",
    certifications: ["Fairtrade", "Social Enterprise"],
    whyBetter: "50% of profits go to Producers Direct, a charity supporting farming communities. Every cup directly improves a farmer's life.",
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado", "Co-op"],
    website: "cafedirect.co.uk",
  },
  {
    slug: "equal-exchange-coffee",
    name: "Equal Exchange",
    category: "Coffee",
    logo: "☕",
    ethicalRating: "A",
    description: "Worker-owned co-operative. Fairtrade coffee, tea, and chocolate.",
    certifications: ["Fairtrade", "Worker Co-op", "Organic"],
    whyBetter: "Worker-owned democratic co-op. Every employee has an equal vote. Long-term direct relationships with farming co-ops around the world.",
    supermarkets: ["Waitrose", "Ocado", "Independent shops"],
    website: "equalexchange.co.uk",
  },
  {
    slug: "ecover",
    name: "Ecover",
    category: "Household",
    logo: "🧴",
    ethicalRating: "A",
    description: "Plant-based ecological cleaning products since 1980.",
    certifications: ["B Corp", "Vegan", "Cruelty Free"],
    whyBetter: "Plant-based ingredients. Factory powered by renewable energy. Pioneered refill stations in the UK. Your clean home doesn't have to cost the earth.",
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
    website: "ecover.com",
  },
  {
    slug: "method",
    name: "Method",
    category: "Household",
    logo: "🧴",
    ethicalRating: "A",
    description: "Design-led eco-friendly cleaning products.",
    certifications: ["B Corp", "Cradle to Cradle", "Cruelty Free"],
    whyBetter: "100% recycled plastic bottles. Biodegradable formulas. Carbon neutral. Proof that sustainable can also be beautiful.",
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose"],
    website: "methodproducts.co.uk",
  },
  {
    slug: "faith-in-nature",
    name: "Faith in Nature",
    category: "Personal Care",
    logo: "🌿",
    ethicalRating: "A",
    description: "Natural, vegan personal care products.",
    certifications: ["B Corp", "Vegan Society", "Cruelty Free", "Nature on the Board"],
    whyBetter: "First company in the world to give Nature a seat on its board of directors. 100% natural fragrances. Refill options. Your shower shouldn't cost the rainforest.",
    supermarkets: ["Sainsbury's", "Waitrose", "Holland & Barrett"],
    website: "faithinnature.co.uk",
  },
  {
    slug: "clipper-tea",
    name: "Clipper Tea",
    category: "Tea",
    logo: "🫖",
    ethicalRating: "A",
    description: "Fairtrade and organic tea. Unbleached, plastic-free tea bags.",
    certifications: ["Fairtrade", "Organic", "Non-GMO"],
    whyBetter: "Unbleached tea bags (no chlorine). Plastic-free packaging. Every leaf is Fairtrade. A proper cuppa with a clear conscience.",
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
    website: "clipper-teas.com",
  },
  {
    slug: "teapigs",
    name: "Teapigs",
    category: "Tea",
    logo: "🫖",
    ethicalRating: "A",
    description: "Whole leaf tea in biodegradable 'tea temples'.",
    certifications: ["B Corp", "Plastic Free"],
    whyBetter: "Whole leaves, not dust. Corn-starch tea temples that biodegrade. Living wage employer. Real tea for people who care.",
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado"],
    website: "teapigs.co.uk",
  },
  {
    slug: "karma-cola",
    name: "Karma Cola",
    category: "Beverages",
    logo: "🥤",
    ethicalRating: "A",
    description: "Fairtrade cola made with real cola nut from Sierra Leone.",
    certifications: ["Fairtrade", "Organic"],
    whyBetter: "Real cola nut from Sierra Leone. Profits go back to the community through the Karma Cola Foundation. Same fizz, zero guilt.",
    supermarkets: ["Waitrose", "Ocado", "Independent shops"],
    website: "karmacola.co.uk",
  },
  {
    slug: "oatly",
    name: "Oatly",
    category: "Dairy Alternatives",
    logo: "🥛",
    ethicalRating: "B",
    description: "Swedish oat milk. B rating due to Blackstone Group investment.",
    certifications: ["Vegan"],
    whyBetter: "80% less land, 73% fewer CO2 emissions than dairy. However, investment from Blackstone Group (linked to Amazon deforestation) prevents top rating.",
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"],
    website: "oatly.com",
  },
  {
    slug: "kit-and-kin",
    name: "Kit & Kin",
    category: "Baby Care",
    logo: "👶",
    ethicalRating: "A",
    description: "Eco-friendly nappies and baby products.",
    certifications: ["FSC", "Vegan"],
    whyBetter: "Plant-based biodegradable nappies. Each box protects 6.8m² of rainforest through World Land Trust. Your baby's bum can save the jungle.",
    supermarkets: ["Sainsbury's", "Amazon"],
    website: "kitandkin.com",
  },
  {
    slug: "georganics",
    name: "Georganics",
    category: "Oral Care",
    logo: "🪥",
    ethicalRating: "A",
    description: "Natural, zero-waste oral care from the UK.",
    certifications: ["B Corp", "Organic", "Cruelty Free", "Plastic Free"],
    whyBetter: "Zero-waste toothpaste and mouthwash tablets. Plastic-free everything. All natural ingredients. Your mouth doesn't need petrochemicals.",
    supermarkets: ["Holland & Barrett", "Independent stores"],
    website: "georganics.com",
  },
  {
    slug: "cawston-press",
    name: "Cawston Press",
    category: "Beverages",
    logo: "🍎",
    ethicalRating: "A",
    description: "Pressed fruit drinks — no concentrates, no sweeteners, no added sugar.",
    certifications: [],
    whyBetter: "Real pressed fruit. No concentrates, sweeteners, or added sugar. Independent company. Just fruit, water, and honesty.",
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
    website: "cawstonpress.com",
  },
  {
    slug: "minor-figures",
    name: "Minor Figures",
    category: "Dairy Alternatives",
    logo: "🥛",
    ethicalRating: "A",
    description: "Oat milk designed for coffee. B Corp and carbon neutral.",
    certifications: ["B Corp", "Carbon Neutral"],
    whyBetter: "Carbon neutral. B Corp certified. Designed by baristas for baristas. Independent company doing dairy alternatives right.",
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado", "Independent cafés"],
    website: "minorfigures.com",
  },
  {
    slug: "lily-kitchen-alt",
    name: "Lily's Kitchen",
    category: "Pet Food",
    logo: "🐕",
    ethicalRating: "B",
    description: "Natural pet food, B Corp. Note: acquired by Nestlé in 2020.",
    certifications: ["B Corp"],
    whyBetter: "Proper meat and fresh ingredients. B Corp certified. However, now Nestlé-owned, which affects independence rating. Consider Scrumbles or Forthglade as truly independent alternatives.",
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Pets at Home"],
    website: "lilyskitchen.co.uk",
  },
];

// ════════════════════════════════════════════════════
// BARCODE → BRAND MAPPING (common UK products)
// ════════════════════════════════════════════════════

export const barcodeToBrand: Record<string, string> = {
  "7613036271134": "kitkat",
  "7613034626837": "nescafe",
  "7613034383808": "kitkat",
  "5449000000996": "coca-cola-classic",
  "5449000014535": "fanta",
  "5449000012098": "sprite",
  "5000159484053": "pepsi",
  "5000328587738": "walkers",
  "5000328254579": "doritos",
  "5000159459228": "mars-bar",
  "5000159461427": "snickers",
  "7622210713780": "cadbury",
  "7622210999245": "oreo",
  "8712561650786": "dove",
  "8711327538603": "persil",
  "3574661234588": "johnsons-baby",
  "5010453000052": "dettol",
};

// ════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════

export function getCorporation(slug: string): Corporation | undefined {
  return corporations.find((c) => c.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getAlternative(slug: string): EthicalAlternative | undefined {
  return ethicalAlternatives.find((a) => a.slug === slug);
}

export function getBrandsByCorporation(corpSlug: string): Brand[] {
  return brands.filter((b) => b.parentSlug === corpSlug);
}

export function lookupBarcode(barcode: string): Brand | undefined {
  const brandSlug = barcodeToBrand[barcode];
  if (brandSlug) return getBrand(brandSlug);
  for (const brand of brands) {
    if (brand.barcodePrefixes) {
      for (const prefix of brand.barcodePrefixes) {
        if (barcode.startsWith(prefix)) return brand;
      }
    }
  }
  return undefined;
}

export function getAlternativesForBrand(brandSlug: string): EthicalAlternative[] {
  const brand = getBrand(brandSlug);
  if (!brand) return [];
  return brand.alternatives
    .map((slug) => getAlternative(slug))
    .filter((a): a is EthicalAlternative => a !== undefined);
}

export function getAlternativesByCategory(category: string): EthicalAlternative[] {
  return ethicalAlternatives.filter((a) => a.category === category);
}

export function searchAll(query: string): {
  brands: Brand[];
  corporations: Corporation[];
  alternatives: EthicalAlternative[];
} {
  const q = query.toLowerCase();
  return {
    brands: brands.filter(
      (b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
    ),
    corporations: corporations.filter(
      (c) => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    ),
    alternatives: ethicalAlternatives.filter(
      (a) => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    ),
  };
}

export function getRatingColor(rating: EthicalRating): string {
  const map: Record<EthicalRating, string> = {
    A: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800",
    B: "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800",
    C: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800",
    D: "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800",
    E: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800",
  };
  return map[rating];
}

export function getRatingBgSolid(rating: EthicalRating): string {
  const map: Record<EthicalRating, string> = { A: "bg-emerald-500", B: "bg-green-500", C: "bg-amber-500", D: "bg-orange-500", E: "bg-red-500" };
  return map[rating];
}

export function getRatingLabel(rating: EthicalRating): string {
  const map: Record<EthicalRating, string> = { A: "Excellent", B: "Good", C: "Mediocre", D: "Poor", E: "Very Poor" };
  return map[rating];
}

export function getSeverityColor(severity: "low" | "medium" | "high"): string {
  const map = {
    low: "text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950",
    medium: "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950",
    high: "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950",
  };
  return map[severity];
}

export const categories = [
  "All", "Confectionery", "Beverages", "Coffee", "Snacks", "Cereal", "Food",
  "Dairy", "Dairy Alternatives", "Personal Care", "Household", "Baby Care",
  "Oral Care", "Health", "Pet Food", "Tea", "Clothing & Retail", "Ice Cream",
  "Biscuits", "Bakery", "Condiments",
];
