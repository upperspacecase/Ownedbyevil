export type EthicalRating = "A" | "B" | "C" | "D" | "E";

export interface EthicalIssue {
  category: string;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface Corporation {
  slug: string;
  name: string;
  logo: string; // emoji placeholder
  country: string;
  revenue: string;
  employees: string;
  ethicalRating: EthicalRating;
  issues: EthicalIssue[];
  description: string;
}

export interface Brand {
  slug: string;
  name: string;
  category: string;
  parentSlug: string;
  logo: string; // emoji placeholder
  ethicalRating: EthicalRating;
  description: string;
  alternatives: string[]; // slugs of alternative brands
  supermarkets: string[]; // where you can find it in UK
}

export const corporations: Corporation[] = [
  {
    slug: "nestle",
    name: "Nestlé",
    logo: "🏭",
    country: "Switzerland",
    revenue: "$100B+",
    employees: "270,000+",
    ethicalRating: "D",
    description:
      "World's largest food & beverage company. Headquartered in Vevey, Switzerland.",
    issues: [
      {
        category: "Water Rights",
        description:
          "Controversial water extraction practices in drought-affected communities",
        severity: "high",
      },
      {
        category: "Child Labour",
        description:
          "Documented child labour in cocoa supply chain in West Africa",
        severity: "high",
      },
      {
        category: "Plastic Pollution",
        description:
          "Consistently ranked as one of the world's top plastic polluters",
        severity: "high",
      },
      {
        category: "Baby Formula",
        description:
          "Aggressive marketing of baby formula in developing countries",
        severity: "medium",
      },
    ],
  },
  {
    slug: "unilever",
    name: "Unilever",
    logo: "🧴",
    country: "United Kingdom / Netherlands",
    revenue: "$60B+",
    employees: "127,000+",
    ethicalRating: "C",
    description:
      "Multinational consumer goods company co-headquartered in London and Rotterdam.",
    issues: [
      {
        category: "Deforestation",
        description: "Palm oil sourcing linked to rainforest destruction",
        severity: "high",
      },
      {
        category: "Greenwashing",
        description:
          "Sustainability claims questioned by regulators and activists",
        severity: "medium",
      },
      {
        category: "Tax Practices",
        description: "Complex corporate structures to minimise tax obligations",
        severity: "medium",
      },
    ],
  },
  {
    slug: "pg",
    name: "Procter & Gamble",
    logo: "🧼",
    country: "United States",
    revenue: "$82B+",
    employees: "101,000+",
    ethicalRating: "C",
    description:
      "American multinational consumer goods corporation headquartered in Cincinnati, Ohio.",
    issues: [
      {
        category: "Animal Testing",
        description: "Continues animal testing for some product lines",
        severity: "high",
      },
      {
        category: "Deforestation",
        description:
          "Linked to deforestation through pulp and palm oil supply chains",
        severity: "high",
      },
      {
        category: "Plastic Pollution",
        description: "Major contributor to single-use plastic packaging",
        severity: "medium",
      },
    ],
  },
  {
    slug: "coca-cola",
    name: "The Coca-Cola Company",
    logo: "🥤",
    country: "United States",
    revenue: "$45B+",
    employees: "82,000+",
    ethicalRating: "D",
    description:
      "American multinational beverage corporation headquartered in Atlanta, Georgia.",
    issues: [
      {
        category: "Plastic Pollution",
        description:
          "World's #1 plastic polluter for multiple consecutive years",
        severity: "high",
      },
      {
        category: "Water Depletion",
        description:
          "Excessive water extraction in water-stressed communities globally",
        severity: "high",
      },
      {
        category: "Health Impact",
        description:
          "Lobbying against sugar taxes and public health initiatives",
        severity: "medium",
      },
      {
        category: "Labour Rights",
        description: "Allegations of anti-union violence in South America",
        severity: "high",
      },
    ],
  },
  {
    slug: "pepsico",
    name: "PepsiCo",
    logo: "🥤",
    country: "United States",
    revenue: "$86B+",
    employees: "315,000+",
    ethicalRating: "C",
    description:
      "American multinational food, snack, and beverage corporation headquartered in Purchase, New York.",
    issues: [
      {
        category: "Plastic Pollution",
        description: "Among the top global plastic polluters",
        severity: "high",
      },
      {
        category: "Water Usage",
        description:
          "High water usage in manufacturing processes in water-scarce areas",
        severity: "medium",
      },
      {
        category: "Health Impact",
        description:
          "Heavy marketing of sugary and ultra-processed foods to children",
        severity: "medium",
      },
    ],
  },
  {
    slug: "mars",
    name: "Mars, Inc.",
    logo: "🍫",
    country: "United States",
    revenue: "$47B+",
    employees: "140,000+",
    ethicalRating: "C",
    description:
      "American multinational manufacturer of confectionery, pet food, and other products. Privately held.",
    issues: [
      {
        category: "Child Labour",
        description: "Cocoa supply chain linked to child labour in West Africa",
        severity: "high",
      },
      {
        category: "Deforestation",
        description:
          "Palm oil and cocoa sourcing connected to deforestation",
        severity: "medium",
      },
      {
        category: "Health Impact",
        description:
          "Major producer of high-sugar confectionery marketed to children",
        severity: "medium",
      },
    ],
  },
  {
    slug: "kelloggs",
    name: "Kellanova (Kellogg's)",
    logo: "🥣",
    country: "United States",
    revenue: "$15B+",
    employees: "30,000+",
    ethicalRating: "C",
    description:
      "American multinational food manufacturing company headquartered in Chicago.",
    issues: [
      {
        category: "Labour Rights",
        description: "Major worker strikes over pay and conditions in 2021",
        severity: "medium",
      },
      {
        category: "Health Impact",
        description:
          "High sugar content in cereals marketed to children",
        severity: "medium",
      },
      {
        category: "Deforestation",
        description: "Palm oil supply chain concerns",
        severity: "medium",
      },
    ],
  },
  {
    slug: "jnj",
    name: "Johnson & Johnson",
    logo: "💊",
    country: "United States",
    revenue: "$85B+",
    employees: "130,000+",
    ethicalRating: "D",
    description:
      "American multinational pharmaceutical and consumer goods company.",
    issues: [
      {
        category: "Product Safety",
        description:
          "Talc-based products linked to cancer in multiple lawsuits",
        severity: "high",
      },
      {
        category: "Opioid Crisis",
        description:
          "Paid billions in settlements related to the opioid epidemic",
        severity: "high",
      },
      {
        category: "Animal Testing",
        description: "Continues animal testing for pharmaceutical products",
        severity: "medium",
      },
    ],
  },
  {
    slug: "mondelez",
    name: "Mondelēz International",
    logo: "🍪",
    country: "United States",
    revenue: "$36B+",
    employees: "91,000+",
    ethicalRating: "C",
    description:
      "American multinational confectionery, food, holding and beverage company. Spun off from Kraft.",
    issues: [
      {
        category: "Child Labour",
        description:
          "Cocoa supply chain in West Africa linked to child labour",
        severity: "high",
      },
      {
        category: "Deforestation",
        description:
          "Palm oil sourcing linked to deforestation in Southeast Asia",
        severity: "medium",
      },
      {
        category: "Tax Avoidance",
        description:
          "Complex tax structures to minimise obligations in multiple countries",
        severity: "medium",
      },
    ],
  },
  {
    slug: "danone",
    name: "Danone",
    logo: "🥛",
    country: "France",
    revenue: "$28B+",
    employees: "96,000+",
    ethicalRating: "B",
    description:
      "French multinational food-products corporation. B Corp certified since 2022.",
    issues: [
      {
        category: "Plastic Pollution",
        description: "Heavy reliance on single-use plastic packaging",
        severity: "medium",
      },
      {
        category: "Water Extraction",
        description:
          "Evian and Volvic brands extract water in regions with scarcity concerns",
        severity: "medium",
      },
    ],
  },
  {
    slug: "associated-british-foods",
    name: "Associated British Foods",
    logo: "🏪",
    country: "United Kingdom",
    revenue: "$21B+",
    employees: "133,000+",
    ethicalRating: "C",
    description:
      "British multinational food processing and retailing company. Owns Primark.",
    issues: [
      {
        category: "Labour Rights",
        description:
          "Primark supply chain linked to poor working conditions",
        severity: "high",
      },
      {
        category: "Tax Practices",
        description: "Questioned tax arrangements in multiple jurisdictions",
        severity: "medium",
      },
    ],
  },
  {
    slug: "reckitt",
    name: "Reckitt Benckiser",
    logo: "🧹",
    country: "United Kingdom",
    revenue: "$16B+",
    employees: "40,000+",
    ethicalRating: "C",
    description:
      "British multinational consumer goods company producing health, hygiene, and nutrition products.",
    issues: [
      {
        category: "Product Safety",
        description:
          "Nurofen misleading packaging fines in Australia; Suboxone antitrust settlement",
        severity: "high",
      },
      {
        category: "Animal Testing",
        description: "Some product lines still tested on animals",
        severity: "medium",
      },
    ],
  },
];

export const brands: Brand[] = [
  // ── Nestlé brands ──
  {
    slug: "kitkat",
    name: "KitKat",
    category: "Confectionery",
    parentSlug: "nestle",
    logo: "🍫",
    ethicalRating: "D",
    description: "Chocolate-covered wafer bar. One of the world's best-selling chocolate bars.",
    alternatives: ["tonys-chocolonely", "divine-chocolate"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "nescafe",
    name: "Nescafé",
    category: "Coffee & Beverages",
    parentSlug: "nestle",
    logo: "☕",
    ethicalRating: "D",
    description: "Instant coffee brand. World's leading coffee brand by volume.",
    alternatives: ["cafedirect", "equal-exchange-coffee"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "maggi",
    name: "Maggi",
    category: "Food",
    parentSlug: "nestle",
    logo: "🍜",
    ethicalRating: "D",
    description: "Instant noodles, seasonings, and soups brand.",
    alternatives: ["kallo"],
    supermarkets: ["Tesco", "ASDA", "Morrisons"],
  },
  {
    slug: "nespresso",
    name: "Nespresso",
    category: "Coffee & Beverages",
    parentSlug: "nestle",
    logo: "☕",
    ethicalRating: "D",
    description: "Premium coffee capsule system and brand.",
    alternatives: ["cafedirect", "equal-exchange-coffee"],
    supermarkets: ["Waitrose", "John Lewis"],
  },
  {
    slug: "purina",
    name: "Purina",
    category: "Pet Food",
    parentSlug: "nestle",
    logo: "🐕",
    ethicalRating: "D",
    description: "Pet food brand producing dry and wet food for cats and dogs.",
    alternatives: ["lily-kitchen"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "san-pellegrino",
    name: "S.Pellegrino",
    category: "Beverages",
    parentSlug: "nestle",
    logo: "💧",
    ethicalRating: "D",
    description: "Italian sparkling mineral water brand.",
    alternatives: ["highland-spring"],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose"],
  },
  {
    slug: "haagen-dazs",
    name: "Häagen-Dazs",
    category: "Ice Cream",
    parentSlug: "nestle",
    logo: "🍦",
    ethicalRating: "D",
    description: "Premium ice cream brand.",
    alternatives: ["ben-jerrys"],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
  },
  {
    slug: "cheerios",
    name: "Cheerios",
    category: "Cereal",
    parentSlug: "nestle",
    logo: "🥣",
    ethicalRating: "D",
    description: "Toasted oat cereal brand (Nestlé license outside North America).",
    alternatives: ["dorset-cereals"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Unilever brands ──
  {
    slug: "dove",
    name: "Dove",
    category: "Personal Care",
    parentSlug: "unilever",
    logo: "🧴",
    ethicalRating: "C",
    description: "Personal care brand known for beauty bars and body wash.",
    alternatives: ["faith-in-nature"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },
  {
    slug: "ben-jerrys",
    name: "Ben & Jerry's",
    category: "Ice Cream",
    parentSlug: "unilever",
    logo: "🍦",
    ethicalRating: "B",
    description: "Premium ice cream brand known for social activism and Fairtrade ingredients.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"],
  },
  {
    slug: "hellmanns",
    name: "Hellmann's",
    category: "Condiments",
    parentSlug: "unilever",
    logo: "🥚",
    ethicalRating: "C",
    description: "Mayonnaise and condiments brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "persil",
    name: "Persil",
    category: "Household",
    parentSlug: "unilever",
    logo: "🧺",
    ethicalRating: "C",
    description: "Laundry detergent brand (Unilever in UK, Henkel in other markets).",
    alternatives: ["ecover", "method"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "lynx",
    name: "Lynx (Axe)",
    category: "Personal Care",
    parentSlug: "unilever",
    logo: "🧴",
    ethicalRating: "C",
    description: "Male grooming brand known as Axe in most markets.",
    alternatives: ["faith-in-nature", "bulldog"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },
  {
    slug: "pg-tips",
    name: "PG Tips",
    category: "Tea",
    parentSlug: "unilever",
    logo: "🫖",
    ethicalRating: "C",
    description: "One of the UK's most popular tea brands. Rainforest Alliance certified.",
    alternatives: ["clipper-tea", "teapigs"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "magnum",
    name: "Magnum",
    category: "Ice Cream",
    parentSlug: "unilever",
    logo: "🍦",
    ethicalRating: "C",
    description: "Premium ice cream bar brand.",
    alternatives: ["ben-jerrys"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Procter & Gamble brands ──
  {
    slug: "gillette",
    name: "Gillette",
    category: "Personal Care",
    parentSlug: "pg",
    logo: "🪒",
    ethicalRating: "C",
    description: "Razor and personal grooming brand.",
    alternatives: ["safety-razor-co", "bulldog"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },
  {
    slug: "pampers",
    name: "Pampers",
    category: "Baby Care",
    parentSlug: "pg",
    logo: "👶",
    ethicalRating: "C",
    description: "Disposable nappy/diaper brand. World's largest nappy brand.",
    alternatives: ["kit-and-kin", "bamboo-nappies"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },
  {
    slug: "ariel",
    name: "Ariel",
    category: "Household",
    parentSlug: "pg",
    logo: "🧺",
    ethicalRating: "C",
    description: "Laundry detergent brand.",
    alternatives: ["ecover", "method"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "oral-b",
    name: "Oral-B",
    category: "Oral Care",
    parentSlug: "pg",
    logo: "🪥",
    ethicalRating: "C",
    description: "Toothbrush and oral care brand.",
    alternatives: ["georganics", "brush-with-bamboo"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },
  {
    slug: "fairy",
    name: "Fairy",
    category: "Household",
    parentSlug: "pg",
    logo: "🧴",
    ethicalRating: "C",
    description: "Washing-up liquid and dishwasher products brand.",
    alternatives: ["ecover", "method"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Coca-Cola brands ──
  {
    slug: "coca-cola-classic",
    name: "Coca-Cola",
    category: "Beverages",
    parentSlug: "coca-cola",
    logo: "🥤",
    ethicalRating: "D",
    description: "World's most recognised soft drink brand.",
    alternatives: ["karma-cola", "ubuntu-cola"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "fanta",
    name: "Fanta",
    category: "Beverages",
    parentSlug: "coca-cola",
    logo: "🍊",
    ethicalRating: "D",
    description: "Fruit-flavoured carbonated soft drink.",
    alternatives: ["karma-cola"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "sprite",
    name: "Sprite",
    category: "Beverages",
    parentSlug: "coca-cola",
    logo: "🍋",
    ethicalRating: "D",
    description: "Lemon-lime flavoured soft drink.",
    alternatives: ["karma-cola"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "innocent",
    name: "Innocent Drinks",
    category: "Beverages",
    parentSlug: "coca-cola",
    logo: "🥤",
    ethicalRating: "C",
    description: "Smoothie and juice brand. Majority owned by Coca-Cola since 2013.",
    alternatives: ["cawston-press"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Pret"],
  },
  {
    slug: "costa-coffee",
    name: "Costa Coffee",
    category: "Coffee & Beverages",
    parentSlug: "coca-cola",
    logo: "☕",
    ethicalRating: "C",
    description: "UK's largest coffee chain, acquired by Coca-Cola in 2019.",
    alternatives: ["cafedirect"],
    supermarkets: ["Tesco", "Sainsbury's", "Costa stores"],
  },

  // ── PepsiCo brands ──
  {
    slug: "pepsi",
    name: "Pepsi",
    category: "Beverages",
    parentSlug: "pepsico",
    logo: "🥤",
    ethicalRating: "C",
    description: "Major carbonated soft drink brand.",
    alternatives: ["karma-cola", "ubuntu-cola"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "walkers",
    name: "Walkers",
    category: "Snacks",
    parentSlug: "pepsico",
    logo: "🥔",
    ethicalRating: "C",
    description: "UK's most popular crisp brand (known as Lay's internationally).",
    alternatives: ["tyrrells", "pipers"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "doritos",
    name: "Doritos",
    category: "Snacks",
    parentSlug: "pepsico",
    logo: "🌮",
    ethicalRating: "C",
    description: "Flavoured tortilla chip brand.",
    alternatives: ["tyrrells"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "quaker",
    name: "Quaker Oats",
    category: "Cereal",
    parentSlug: "pepsico",
    logo: "🥣",
    ethicalRating: "C",
    description: "Oat-based products and cereals brand.",
    alternatives: ["flahavans", "dorset-cereals"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "tropicana",
    name: "Tropicana",
    category: "Beverages",
    parentSlug: "pepsico",
    logo: "🍊",
    ethicalRating: "C",
    description: "Premium orange juice brand.",
    alternatives: ["cawston-press"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose"],
  },

  // ── Mars brands ──
  {
    slug: "mars-bar",
    name: "Mars Bar",
    category: "Confectionery",
    parentSlug: "mars",
    logo: "🍫",
    ethicalRating: "C",
    description: "Iconic chocolate bar with nougat and caramel.",
    alternatives: ["tonys-chocolonely", "divine-chocolate"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "snickers",
    name: "Snickers",
    category: "Confectionery",
    parentSlug: "mars",
    logo: "🍫",
    ethicalRating: "C",
    description: "Chocolate bar with peanuts, caramel, and nougat.",
    alternatives: ["tonys-chocolonely"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "mms",
    name: "M&M's",
    category: "Confectionery",
    parentSlug: "mars",
    logo: "🍬",
    ethicalRating: "C",
    description: "Button-shaped chocolate candies.",
    alternatives: ["divine-chocolate"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "whiskas",
    name: "Whiskas",
    category: "Pet Food",
    parentSlug: "mars",
    logo: "🐱",
    ethicalRating: "C",
    description: "Cat food brand. Part of Mars Petcare.",
    alternatives: ["lily-kitchen"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "uncle-bens",
    name: "Ben's Original",
    category: "Food",
    parentSlug: "mars",
    logo: "🍚",
    ethicalRating: "C",
    description: "Rice and sauce brand (rebranded from Uncle Ben's in 2020).",
    alternatives: ["tilda"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Kellogg's brands ──
  {
    slug: "corn-flakes",
    name: "Corn Flakes",
    category: "Cereal",
    parentSlug: "kelloggs",
    logo: "🥣",
    ethicalRating: "C",
    description: "Classic breakfast cereal.",
    alternatives: ["dorset-cereals"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "pringles",
    name: "Pringles",
    category: "Snacks",
    parentSlug: "kelloggs",
    logo: "🥔",
    ethicalRating: "C",
    description: "Stackable potato-based crisp brand.",
    alternatives: ["tyrrells", "pipers"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "coco-pops",
    name: "Coco Pops",
    category: "Cereal",
    parentSlug: "kelloggs",
    logo: "🥣",
    ethicalRating: "C",
    description: "Chocolate-flavoured rice cereal.",
    alternatives: ["dorset-cereals"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Johnson & Johnson brands ──
  {
    slug: "johnsons-baby",
    name: "Johnson's Baby",
    category: "Baby Care",
    parentSlug: "jnj",
    logo: "👶",
    ethicalRating: "D",
    description: "Baby care products including shampoo, lotion, and powder.",
    alternatives: ["kit-and-kin"],
    supermarkets: ["Tesco", "Sainsbury's", "Boots"],
  },
  {
    slug: "listerine",
    name: "Listerine",
    category: "Oral Care",
    parentSlug: "jnj",
    logo: "🪥",
    ethicalRating: "D",
    description: "Antiseptic mouthwash brand.",
    alternatives: ["georganics"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Boots"],
  },

  // ── Mondelēz brands ──
  {
    slug: "cadbury",
    name: "Cadbury",
    category: "Confectionery",
    parentSlug: "mondelez",
    logo: "🍫",
    ethicalRating: "C",
    description: "Iconic British chocolate brand, owned by Mondelēz since 2010 Kraft takeover.",
    alternatives: ["tonys-chocolonely", "divine-chocolate"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons", "Waitrose"],
  },
  {
    slug: "oreo",
    name: "Oreo",
    category: "Biscuits",
    parentSlug: "mondelez",
    logo: "🍪",
    ethicalRating: "C",
    description: "Chocolate sandwich cookie brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    category: "Dairy",
    parentSlug: "mondelez",
    logo: "🧀",
    ethicalRating: "C",
    description: "Cream cheese brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Danone brands ──
  {
    slug: "evian",
    name: "Evian",
    category: "Beverages",
    parentSlug: "danone",
    logo: "💧",
    ethicalRating: "B",
    description: "Premium mineral water brand sourced from the French Alps.",
    alternatives: ["highland-spring"],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose"],
  },
  {
    slug: "alpro",
    name: "Alpro",
    category: "Dairy Alternatives",
    parentSlug: "danone",
    logo: "🥛",
    ethicalRating: "B",
    description: "Plant-based dairy alternative brand (oat, soy, almond milks).",
    alternatives: ["oatly", "minor-figures"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"],
  },
  {
    slug: "activia",
    name: "Activia",
    category: "Dairy",
    parentSlug: "danone",
    logo: "🥛",
    ethicalRating: "B",
    description: "Probiotic yoghurt brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Associated British Foods brands ──
  {
    slug: "primark",
    name: "Primark",
    category: "Clothing & Retail",
    parentSlug: "associated-british-foods",
    logo: "👕",
    ethicalRating: "D",
    description: "Fast fashion retailer known for extremely low prices.",
    alternatives: ["patagonia", "lucy-yak"],
    supermarkets: ["Primark stores"],
  },
  {
    slug: "twinings",
    name: "Twinings",
    category: "Tea",
    parentSlug: "associated-british-foods",
    logo: "🫖",
    ethicalRating: "C",
    description: "Premium tea brand, established 1706.",
    alternatives: ["clipper-tea", "teapigs"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose"],
  },
  {
    slug: "kingsmill",
    name: "Kingsmill",
    category: "Bakery",
    parentSlug: "associated-british-foods",
    logo: "🍞",
    ethicalRating: "C",
    description: "Major UK bread brand.",
    alternatives: ["hovis"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Reckitt brands ──
  {
    slug: "dettol",
    name: "Dettol",
    category: "Household",
    parentSlug: "reckitt",
    logo: "🧹",
    ethicalRating: "C",
    description: "Antiseptic and cleaning products brand.",
    alternatives: ["method", "ecover"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },
  {
    slug: "durex",
    name: "Durex",
    category: "Health",
    parentSlug: "reckitt",
    logo: "💊",
    ethicalRating: "C",
    description: "Sexual health and wellbeing brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Boots", "Superdrug"],
  },
  {
    slug: "nurofen",
    name: "Nurofen",
    category: "Health",
    parentSlug: "reckitt",
    logo: "💊",
    ethicalRating: "C",
    description: "Ibuprofen-based pain relief brand.",
    alternatives: [],
    supermarkets: ["Tesco", "Boots", "Superdrug"],
  },
  {
    slug: "vanish",
    name: "Vanish",
    category: "Household",
    parentSlug: "reckitt",
    logo: "🧺",
    ethicalRating: "C",
    description: "Stain removal product brand.",
    alternatives: ["ecover"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Morrisons"],
  },

  // ── Ethical alternatives (independent / B-Corp / Fairtrade) ──
  {
    slug: "tonys-chocolonely",
    name: "Tony's Chocolonely",
    category: "Confectionery",
    parentSlug: "",
    logo: "🍫",
    ethicalRating: "A",
    description:
      "Dutch chocolate brand on a mission to make chocolate 100% slave-free. Fairtrade certified.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Waitrose", "Whole Foods", "Ocado"],
  },
  {
    slug: "divine-chocolate",
    name: "Divine Chocolate",
    category: "Confectionery",
    parentSlug: "",
    logo: "🍫",
    ethicalRating: "A",
    description:
      "Fairtrade chocolate co-owned by cocoa farmers in Ghana. B Corp certified.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado", "Co-op"],
  },
  {
    slug: "cafedirect",
    name: "Cafédirect",
    category: "Coffee & Beverages",
    parentSlug: "",
    logo: "☕",
    ethicalRating: "A",
    description:
      "UK's largest Fairtrade hot drinks brand. Farmer-owned social enterprise.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado", "Co-op"],
  },
  {
    slug: "equal-exchange-coffee",
    name: "Equal Exchange",
    category: "Coffee & Beverages",
    parentSlug: "",
    logo: "☕",
    ethicalRating: "A",
    description: "Worker-owned co-operative selling Fairtrade coffee, tea, and chocolate.",
    alternatives: [],
    supermarkets: ["Waitrose", "Ocado", "independent shops"],
  },
  {
    slug: "ecover",
    name: "Ecover",
    category: "Household",
    parentSlug: "",
    logo: "🧴",
    ethicalRating: "A",
    description:
      "Ecological cleaning products brand. Pioneer in plant-based cleaning since 1980.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
  },
  {
    slug: "method",
    name: "Method",
    category: "Household",
    parentSlug: "",
    logo: "🧴",
    ethicalRating: "A",
    description: "Design-led eco-friendly cleaning products. B Corp certified.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose"],
  },
  {
    slug: "faith-in-nature",
    name: "Faith in Nature",
    category: "Personal Care",
    parentSlug: "",
    logo: "🌿",
    ethicalRating: "A",
    description:
      "Natural, vegan personal care products. Employee and nature-owned B Corp.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Waitrose", "Holland & Barrett"],
  },
  {
    slug: "clipper-tea",
    name: "Clipper Tea",
    category: "Tea",
    parentSlug: "",
    logo: "🫖",
    ethicalRating: "A",
    description: "Fairtrade and organic tea brand. Unbleached tea bags.",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Ocado"],
  },
  {
    slug: "oatly",
    name: "Oatly",
    category: "Dairy Alternatives",
    parentSlug: "",
    logo: "🥛",
    ethicalRating: "B",
    description: "Swedish oat milk brand. Controversial investment from Blackstone Group.",
    alternatives: ["minor-figures"],
    supermarkets: ["Tesco", "Sainsbury's", "ASDA", "Waitrose", "Ocado"],
  },
  {
    slug: "karma-cola",
    name: "Karma Cola",
    category: "Beverages",
    parentSlug: "",
    logo: "🥤",
    ethicalRating: "A",
    description:
      "Fairtrade cola made with real cola nut from Sierra Leone. Organic and ethical.",
    alternatives: [],
    supermarkets: ["Waitrose", "Ocado", "independent shops"],
  },
  {
    slug: "lily-kitchen",
    name: "Lily's Kitchen",
    category: "Pet Food",
    parentSlug: "nestle",
    logo: "🐕",
    ethicalRating: "B",
    description: "Natural pet food brand. B Corp certified but now owned by Nestlé (acquired 2020).",
    alternatives: [],
    supermarkets: ["Tesco", "Sainsbury's", "Waitrose", "Pets at Home"],
  },
  {
    slug: "kit-and-kin",
    name: "Kit & Kin",
    category: "Baby Care",
    parentSlug: "",
    logo: "👶",
    ethicalRating: "A",
    description: "Eco-friendly nappies and baby products co-founded by Emma Bunton.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Amazon"],
  },
  {
    slug: "teapigs",
    name: "Teapigs",
    category: "Tea",
    parentSlug: "",
    logo: "🫖",
    ethicalRating: "A",
    description: "Premium whole leaf tea brand. Plastic-free tea temples. B Corp.",
    alternatives: [],
    supermarkets: ["Sainsbury's", "Waitrose", "Ocado"],
  },
];

// Helper functions
export function getCorporation(slug: string): Corporation | undefined {
  return corporations.find((c) => c.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandsByCorporation(corpSlug: string): Brand[] {
  return brands.filter((b) => b.parentSlug === corpSlug);
}

export function getIndependentBrands(): Brand[] {
  return brands.filter((b) => b.parentSlug === "");
}

export function searchBrands(query: string): Brand[] {
  const q = query.toLowerCase();
  return brands.filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
  );
}

export function searchAll(query: string): { brands: Brand[]; corporations: Corporation[] } {
  const q = query.toLowerCase();
  return {
    brands: brands.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    ),
    corporations: corporations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    ),
  };
}

export function getRatingColor(rating: EthicalRating): string {
  switch (rating) {
    case "A":
      return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800";
    case "B":
      return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800";
    case "C":
      return "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950 dark:border-amber-800";
    case "D":
      return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800";
    case "E":
      return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
  }
}

export function getRatingBgSolid(rating: EthicalRating): string {
  switch (rating) {
    case "A":
      return "bg-emerald-500";
    case "B":
      return "bg-green-500";
    case "C":
      return "bg-amber-500";
    case "D":
      return "bg-orange-500";
    case "E":
      return "bg-red-500";
  }
}

export function getRatingLabel(rating: EthicalRating): string {
  switch (rating) {
    case "A":
      return "Excellent";
    case "B":
      return "Good";
    case "C":
      return "Mediocre";
    case "D":
      return "Poor";
    case "E":
      return "Very Poor";
  }
}

export function getSeverityColor(severity: "low" | "medium" | "high"): string {
  switch (severity) {
    case "low":
      return "text-yellow-700 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950";
    case "medium":
      return "text-orange-700 bg-orange-50 dark:text-orange-400 dark:bg-orange-950";
    case "high":
      return "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950";
  }
}

export const categories = [
  "All",
  "Confectionery",
  "Beverages",
  "Coffee & Beverages",
  "Snacks",
  "Cereal",
  "Food",
  "Dairy",
  "Dairy Alternatives",
  "Personal Care",
  "Household",
  "Baby Care",
  "Oral Care",
  "Health",
  "Pet Food",
  "Tea",
  "Clothing & Retail",
  "Ice Cream",
  "Biscuits",
  "Bakery",
  "Condiments",
];
