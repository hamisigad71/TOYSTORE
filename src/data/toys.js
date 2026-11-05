export const CURRENCIES = {
  KES: { symbol: 'KSh ', rate: 129, label: 'KES (KSh)' },
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' }
};

export const PROMO_CODES = {
  MINISO15: { code: 'MINISO15', type: 'percent', value: 15, minOrder: 0, desc: '15% Off Storewide Promo' },
  GENTS20: { code: 'GENTS20', type: 'percent', value: 20, minOrder: 50, desc: '20% Off Orders Over KSh 6,500' },
  WELCOME10: { code: 'WELCOME10', type: 'fixed', value: 10, minOrder: 30, desc: 'KSh 1,290 Off Orders Over KSh 3,900' }
};

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'RUNDA MALL 3RD FLOOR • FLAGSHIP COLLECTION',
    title: 'Precision Die-Cast Racers & Mechanical Brick Sets',
    subtitle: 'Experience the Miniso-style impulse toy store built for boys, dads, builders, and hobbyists at Runda Mall, 3rd Floor. Every item 100% wholesome, safety-certified, and shelf-ready.',
    ctaPrimary: 'Explore Full Catalog',
    ctaPrimaryPage: 'shop',
    ctaSecondary: 'Build a 3-Toy Bundle (15% Off)',
    ctaSecondaryPage: 'bundles',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=1400&q=85',
    stats: [
      { label: 'Starting Price', value: 'KSh 1,150' },
      { label: 'Flagship Location', value: 'Runda Mall 3F' },
      { label: 'Safety Standard', value: 'ASTM & EN71' }
    ]
  },
  {
    id: 'slide-2',
    tag: 'FLOOR 4 • MYSTERY CAPSULE ALLEY',
    title: 'Unbox the Surprise: Series 4 Blind-Box Collectibles',
    subtitle: 'Pick a sealed capsule, shake to test your luck, and reveal 1 of 18 collectible racers, mecha defenders, and retro arcade bots.',
    ctaPrimary: 'Launch Unboxer Studio',
    ctaPrimaryPage: 'blindbox',
    ctaSecondary: 'Shop Blind Boxes',
    ctaSecondaryPage: 'shop',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=85',
    stats: [
      { label: 'Single Capsule', value: 'KSh 1,290' },
      { label: 'Secret Chase Odds', value: '1 in 72' },
      { label: 'Full 6-Pack Case', value: 'No Duplicates' }
    ]
  },
  {
    id: 'slide-3',
    tag: 'FLOOR 2 • STEM & CLOCKWORK LAB',
    title: 'Laser-Cut 3D Wooden Gears & Technic Engineering',
    subtitle: 'Zero glue required. Assemble working pendulums, steam locomotives, and heavy rescue cranes with real mechanical gear ratios.',
    ctaPrimary: 'Shop Brick & Gear Lab',
    ctaPrimaryPage: 'shop',
    ctaSecondary: 'Book In-Store Build Table',
    ctaSecondaryPage: 'stores',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1400&q=85',
    stats: [
      { label: 'Piece Counts', value: '150 to 1,200+' },
      { label: 'Age Rating', value: 'Ages 6 to 99' },
      { label: 'Runda Mall Workshops', value: 'Daily Sessions' }
    ]
  }
];

export const DOLLHOUSE_ROOMS = [
  {
    id: 'all',
    name: 'All Departments',
    subtitle: 'Complete 6-Floor Store Catalog',
    floor: 'All Floors',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    icon: 'Store',
    description: 'Browse our complete collection across all 6 floors, from pocket-priced impulse toys to centerpiece mechanical builds.'
  },
  {
    id: 'garage',
    name: '1F: The Speed Garage',
    subtitle: 'Die-Cast Metal Cars, RC Drift & Trains',
    floor: 'Floor 1',
    color: '#e11d48',
    bgLight: '#ffe4e6',
    icon: 'Car',
    description: '1:18, 1:24 & 1:64 scale zinc-alloy die-cast vehicles, 2.4GHz proportional RC drift cars, and electric railway sets.'
  },
  {
    id: 'workshop',
    name: '2F: Brick & Gear Lab',
    subtitle: 'Building Bricks, Technic & 3D Wood Kits',
    floor: 'Floor 2',
    color: '#d97706',
    bgLight: '#fef3c7',
    icon: 'Blocks',
    description: 'Interlocking ABS brick sets, technic crane trucks, and laser-cut birch mechanical clockwork models.'
  },
  {
    id: 'vault',
    name: '3F: Hero & Mecha Vault',
    subtitle: 'Articulated Action Figures & Space Bots',
    floor: 'Floor 3',
    color: '#2563eb',
    bgLight: '#dbeafe',
    icon: 'Bot',
    description: 'Posable mecha robots, galactic rangers, superhero defenders, and collector display figures with flight stands.'
  },
  {
    id: 'blindbox',
    name: '4F: Mystery Capsule Alley',
    subtitle: 'Miniso-Style Blind Boxes & Vinyl Minis',
    floor: 'Floor 4',
    color: '#d0106f',
    bgLight: '#f9d8e8',
    icon: 'Gift',
    description: 'Sealed surprise capsules! Collect stylized racers, space pups, and retro arcade bots with rare metallic chase editions.'
  },
  {
    id: 'arcade',
    name: '5F: Tabletop & Retro Den',
    subtitle: 'Speed Cubes, Fingerboards, Plush & Games',
    floor: 'Floor 5',
    color: '#059669',
    bgLight: '#d1fae5',
    icon: 'Gamepad2',
    description: 'Competition magnetic speed cubes, 5-ply maple fingerboard skate parks, tabletop foosball, and plush companions.'
  },
  {
    id: 'outdoor',
    name: 'Roof: Sky Arena & Flyers',
    subtitle: 'Foam Blasters, Gliders & Mini Drones',
    floor: 'Rooftop',
    color: '#0284c7',
    bgLight: '#e0f2fe',
    icon: 'Plane',
    description: 'Indoor/outdoor altitude-hold mini quadcopters, soft foam dart blasters, LED stunt gliders, and sports targets.'
  },
  {
    id: 'shower',
    name: 'Bath, Body & Shower Gels',
    subtitle: 'Botanical Amino-Acid Wash & Spa Aromas',
    floor: 'Bath & Body',
    color: '#06b6d4',
    bgLight: '#cffafe',
    icon: 'Sparkles',
    description: 'Refreshing Japanese Yuzu and hydrating Sakura blossom shower gels, rich foaming body washes, and gentle botanical cleansers.'
  },
  {
    id: 'chargers',
    name: 'Fast Chargers & Power Hub',
    subtitle: '65W GaN Plugs, Magnetic Power Banks & PD Cables',
    floor: 'Tech & Power',
    color: '#8b5cf6',
    bgLight: '#ede9fe',
    icon: 'Zap',
    description: 'Ultra-compact 65W Gallium Nitride (GaN) multi-port wall plugs, 10,000mAh magnetic wireless power banks, and armored braided 100W cables.'
  },
  {
    id: 'fragrance',
    name: 'Perfumes & Fine Cologne Bar',
    subtitle: 'Eau De Parfum, Nordic Woods & Crisp Citrus',
    floor: 'Fragrance',
    color: '#ec4899',
    bgLight: '#fce7f3',
    icon: 'Heart',
    description: 'Long-lasting designer-grade perfumes and colognes crafted with natural Nordic cedar, crystal amber, bergamot, and white tea notes.'
  },
  {
    id: 'bottles',
    name: 'Water Bottles & Thermal Tumblers',
    subtitle: 'Double-Wall Stainless Steel & Gradient Tritan',
    floor: 'Drinkware',
    color: '#14b8a6',
    bgLight: '#ccfbf1',
    icon: 'Cup',
    description: '24-hour ice-cold insulated stainless steel travel tumblers with dual-sip lids and 1000ml BPA-free gradient motivational sports bottles.'
  },
  {
    id: 'bags',
    name: 'Laptop Bags & Tech Sleeves',
    subtitle: 'Shockproof 15.6" Backpacks & Commuter Packs',
    floor: 'Bags & Sleeves',
    color: '#f59e0b',
    bgLight: '#fef3c7',
    icon: 'Shield',
    description: 'Water-resistant 900D Oxford laptop backpacks with 360° air cushion protection, USB charge ports, and slim shockproof padded laptop folios.'
  }
];

export const TOY_PRODUCTS = [
  {
    id: 'tgd-001',
    sku: 'TGD-1F-001',
    name: 'Apex GT-R 1:24 Die-Cast Metal Racer',
    brand: 'Gents SpeedWorks',
    room: 'garage',
    roomLabel: '1F: The Speed Garage',
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewsCount: 214,
    badge: 'BESTSELLER',
    badgeClass: 'badge-red',
    ageGroup: '6-8',
    age: '6+',
    pieces: 'Die-Cast Metal + Pull-Back',
    scale: '1:24 Scale',
    material: 'Heavy Zinc Alloy & ABS',
    dimensions: '20.5 × 8.8 × 6.2 cm',
    variants: ['Crimson Red', 'Midnight Pearl', 'Championship White'],
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Heavyweight zinc-alloy body with opening gullwing doors, working LED headlights, and pull-back turbo action.',
    features: [
      'Die-cast zinc alloy body with rubber grip tires and independent suspension',
      'Press front wheels to trigger realistic engine sound & LED headlights',
      'Opening hood, trunk, and doors with detailed dashboard cockpit',
      'Includes removable collector display plinth with nameplate'
    ],
    stock: 18,
    isFlashDeal: true
  },
  {
    id: 'tgd-002',
    sku: 'TGD-3F-002',
    name: 'Cyber-Defender Titan Mecha Figure',
    brand: 'MechaForge Studio',
    room: 'vault',
    roomLabel: '3F: Hero & Mecha Vault',
    price: 29.99,
    originalPrice: 36.00,
    rating: 4.8,
    reviewsCount: 168,
    badge: 'HOT DROP',
    badgeClass: 'badge-blue',
    ageGroup: '9-12',
    age: '8+',
    pieces: '32 Points of Articulation',
    scale: '7-Inch Figure',
    material: 'High-Impact POM & PVC',
    dimensions: '18.0 × 11.5 × 6.0 cm',
    variants: ['Cobalt Strike', 'Crimson Vanguard', 'Stealth Matte'],
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Fully articulated armored mecha action figure with snap-on booster pack, energy shield, and flight stand.',
    features: [
      '32 ratcheted joints for rock-solid dynamic action poses',
      '6 interchangeable hands, twin beam blades, and photon shield',
      'Weather-resistant metallic paint finish with luminous visor',
      'Articulated clear flight stand included inside collector box'
    ],
    stock: 12,
    isFlashDeal: false
  },
  {
    id: 'tgd-003',
    sku: 'TGD-2F-003',
    name: 'Steampunk Locomotive 880-Pc Brick Set',
    brand: 'BrickWorks Master',
    room: 'workshop',
    roomLabel: '2F: Brick & Gear Lab',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviewsCount: 302,
    badge: 'FAN FAVORITE',
    badgeClass: 'badge-amber',
    ageGroup: '9-12',
    age: '8+',
    pieces: '880 Building Bricks',
    scale: '38cm Long',
    material: 'Precision ABS Bricks',
    dimensions: '38.0 × 9.5 × 12.4 cm',
    variants: ['Classic Brass & Black', 'Royal Emerald Express'],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Build a classic steam express train with moving piston rods, tender coal car, and display track rails.',
    features: [
      '880 precision-molded ABS bricks (100% compatible with major brick brands)',
      'Working mechanical side-rods that drive as the wheels roll',
      '112-page full-color step-by-step illustrated instruction manual',
      'Includes 3 railway engineer mini-figures and 54cm display track'
    ],
    stock: 25,
    isFlashDeal: true
  },
  {
    id: 'tgd-004',
    sku: 'TGD-4F-004',
    name: 'Gents Mystery Garage Capsule (Series 4)',
    brand: 'Dollhouse Originals',
    room: 'blindbox',
    roomLabel: '4F: Mystery Capsule Alley',
    price: 9.99,
    originalPrice: 12.99,
    rating: 4.9,
    reviewsCount: 519,
    badge: 'BLIND BOX',
    badgeClass: 'badge-red',
    ageGroup: '6-8',
    age: '6+',
    pieces: '1 Mystery Figure + Collector Card',
    scale: '3.5-Inch Vinyl',
    material: 'Soft-Touch PVC & ABS',
    dimensions: '9.0 × 7.5 × 7.5 cm',
    variants: ['Single Mystery Box', '3-Pack Starter Set', '6-Box Sealed Tray'],
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Miniso-style surprise box! Contains 1 of 12 stylized helmeted racer & robot vinyl figures (1:72 Gold Chase odds).',
    features: [
      '12 regular designs + 1 secret Golden Trophy Edition',
      'Soft-touch matte PVC with magnetic flip-up helmet visor',
      'Includes holographic character stats card & collector checklist',
      'Stackable clear acrylic mini display cube included'
    ],
    stock: 50,
    isFlashDeal: false
  },
  {
    id: 'tgd-005',
    sku: 'TGD-1F-005',
    name: 'TurboDrift 4WD 2.4GHz Mini RC Car',
    brand: 'Gents SpeedWorks',
    room: 'garage',
    roomLabel: '1F: The Speed Garage',
    price: 27.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviewsCount: 143,
    badge: 'MINISO PICK',
    badgeClass: 'badge-red',
    ageGroup: '9-12',
    age: '8+',
    pieces: 'RC Car + Remote + 8 Cones',
    scale: '1:28 Scale',
    material: 'Polycarbonate Shell & Nylon Chassis',
    dimensions: '16.5 × 7.8 × 5.2 cm',
    variants: ['Drift Orange', 'Neon Cyber Blue'],
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Proportional steering desktop RC racer with swap-ready slick drift tires and 8 mini traffic cones.',
    features: [
      '2.4GHz interference-free pistol-grip transmitter (race 10 cars at once)',
      'Includes 4 rubber racing tires + 4 hard polycarbonate drift tires',
      'USB-C rechargeable Li-Po battery (35 mins run time per charge)',
      'Comes with 8 mini pylons to build an indoor living-room drift course'
    ],
    stock: 9,
    isFlashDeal: true
  },
  {
    id: 'tgd-006',
    sku: 'TGD-2F-006',
    name: 'Da Vinci Clockwork Pendulum 3D Wood Kit',
    brand: 'ChronoWood Craft',
    room: 'workshop',
    roomLabel: '2F: Brick & Gear Lab',
    price: 24.99,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 97,
    badge: 'STEM BUILD',
    badgeClass: 'badge-emerald',
    ageGroup: '12+',
    age: '10+',
    pieces: '176 Laser-Cut Wood Pieces',
    scale: 'No Glue Needed',
    material: 'Nordic Birch Plywood',
    dimensions: '23.0 × 14.0 × 29.5 cm',
    variants: ['Natural Birch', 'Walnut Stain Edition'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Laser-cut birch plywood mechanical gear puzzle that winds up and ticks with a real escapement mechanism.',
    features: [
      'Precision laser-cut basswood sheets that snap together with zero glue',
      'Wind-up steel spring drives visible wooden gears for up to 3 hours',
      'Satisfying tactile build (approx. 2.5 hours assembly)',
      'Includes wax stick for lubricating gear teeth'
    ],
    stock: 16,
    isFlashDeal: false
  },
  {
    id: 'tgd-007',
    sku: 'TGD-5F-007',
    name: 'Pro Magnetic Speed Cube 3x3 Stickerless',
    brand: 'AeroCube Pro',
    room: 'arcade',
    roomLabel: '5F: Tabletop & Retro Den',
    price: 11.99,
    originalPrice: 15.99,
    rating: 4.9,
    reviewsCount: 410,
    badge: 'UNDER KSh 1,600',
    badgeClass: 'badge-emerald',
    ageGroup: '6-8',
    age: '6+',
    pieces: '48 Internal Magnets',
    scale: '56mm Competition Size',
    material: 'Frosted Eco-ABS',
    dimensions: '5.6 × 5.6 × 5.6 cm',
    variants: ['Frosted Stickerless', 'UV Glossy Coating'],
    image: 'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Butter-smooth corner cutting with 48 snap-aligning magnets and frosted anti-scratch stickerless tiles.',
    features: [
      '48 capsule magnets for rapid flicking and speed-solving',
      '9-level dual-spring tension adjustment system with tool',
      'Includes tripod display stand and illustrated algorithm guide',
      'Anti-pop torpedo core engineering'
    ],
    stock: 42,
    isFlashDeal: false
  },
  {
    id: 'tgd-008',
    sku: 'TGD-3F-008',
    name: 'Galactic Ranger Captain & Jetpack Set',
    brand: 'MechaForge Studio',
    room: 'vault',
    roomLabel: '3F: Hero & Mecha Vault',
    price: 16.99,
    originalPrice: 21.99,
    rating: 4.7,
    reviewsCount: 88,
    badge: 'NEW ARRIVAL',
    badgeClass: 'badge-blue',
    ageGroup: '3-5',
    age: '5+',
    pieces: 'Figure + 5 Snap Accessories',
    scale: '6-Inch Scale',
    material: 'Kid-Safe ABS & PVC',
    dimensions: '15.2 × 8.0 × 4.5 cm',
    variants: ['Solar White Suit', 'Deep Space Navy'],
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Classic space explorer figure with spring-loaded grappling hook, flip-down helmet visor, and rover dog.',
    features: [
      'Flip-down tinted space helmet with chest light button',
      'Includes articulated robotic space hound companion figure',
      'Durable kid-safe ABS & PVC construction',
      'Collectible retro blister-card packaging'
    ],
    stock: 21,
    isFlashDeal: false
  },
  {
    id: 'tgd-009',
    sku: 'TGD-5F-009',
    name: 'Maple Pro Fingerboard Skate Park Kit',
    brand: 'DeckLab Mini',
    room: 'arcade',
    roomLabel: '5F: Tabletop & Retro Den',
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.8,
    reviewsCount: 176,
    badge: 'POCKET HIT',
    badgeClass: 'badge-amber',
    ageGroup: '6-8',
    age: '6+',
    pieces: '2 Pro Decks + Half-Pipe Ramp',
    scale: '96mm Pro Deck',
    material: '5-Ply Canadian Maple & Alloy',
    dimensions: '28.0 × 18.0 × 11.0 cm',
    variants: ['Street Rail Park', 'Half-Pipe Bowl'],
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: '5-ply real maple wood fingerboards with bearing wheels, metal trucks, foam grip tape, and modular rail ramp.',
    features: [
      'Real 5-ply maple wood deck with pro concave shape',
      'Single-axle metal trucks with mini skate tool & spare wheels',
      'Modular stair-set and powder-coated aluminum grind rail',
      'Non-slip silicone pads underneath ramp modules'
    ],
    stock: 30,
    isFlashDeal: false
  },
  {
    id: 'tgd-010',
    sku: 'TGD-4F-010',
    name: 'Pixel-Bot Retro Arcade Blind Box',
    brand: 'Dollhouse Originals',
    room: 'blindbox',
    roomLabel: '4F: Mystery Capsule Alley',
    price: 8.99,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 289,
    badge: 'BLIND BOX',
    badgeClass: 'badge-red',
    ageGroup: '6-8',
    age: '6+',
    pieces: '1 Mini Arcade Bot + Sticker Sheet',
    scale: '3-Inch Collectible',
    material: 'ABS & Mechanical Micro-Switches',
    dimensions: '7.8 × 5.5 × 5.5 cm',
    variants: ['Single Mystery Capsule', '2-Pack Combo'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Adorable mini arcade cabinet characters with clicky mechanical buttons and changeable lenticular face screens!',
    features: [
      'Clicky mechanical arcade buttons you can actually press and fidget with',
      'Lenticular 3D screen changes expression when tilted',
      '9 retro colorways to collect in Series 1',
      'Detachable keychain clasp included inside box'
    ],
    stock: 64,
    isFlashDeal: false
  },
  {
    id: 'tgd-011',
    sku: 'TGD-2F-011',
    name: 'Heavy Rescue Crane 640-Pc Technic Build',
    brand: 'BrickWorks Master',
    room: 'workshop',
    roomLabel: '2F: Brick & Gear Lab',
    price: 28.99,
    originalPrice: 35.99,
    rating: 4.8,
    reviewsCount: 132,
    badge: 'WORKING GEARS',
    badgeClass: 'badge-amber',
    ageGroup: '9-12',
    age: '8+',
    pieces: '640 Technic Pins & Beams',
    scale: 'Extendable 45cm Boom',
    material: 'High-Precision ABS Technic',
    dimensions: '32.0 × 12.5 × 45.0 cm',
    variants: ['Engineering Yellow', 'Fire Rescue Red'],
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Build a working engineering crane truck with 360-degree rotating cab, ratcheting winch, and fold-out stabilizer legs.',
    features: [
      'Real worm-gear winch lifts up to 250g loads safely',
      '4-wheel linked rack-and-pinion steering knob',
      'Fold-out outrigger stabilizers lock into place',
      'Teaches real mechanical gear ratios through hands-on play'
    ],
    stock: 14,
    isFlashDeal: false
  },
  {
    id: 'tgd-012',
    sku: 'TGD-5F-012',
    name: 'Tabletop Mini Championship Foosball',
    brand: 'Gents Club Games',
    room: 'arcade',
    roomLabel: '5F: Tabletop & Retro Den',
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewsCount: 119,
    badge: '2-PLAYER FUN',
    badgeClass: 'badge-emerald',
    ageGroup: '6-8',
    age: '5+',
    pieces: 'Wood Table + 2 Mini Soccer Balls',
    scale: '51cm Portable Table',
    material: 'MDF Hardwood & Chrome Steel Rods',
    dimensions: '51.0 × 31.0 × 10.5 cm',
    variants: ['Stadium Turf Green', 'Classic Oak Finish'],
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Compact wooden tabletop soccer game with chrome steel rods, sliding score trackers, and textured grip handles.',
    features: [
      'Fits on any coffee table, study desk, or playroom floor',
      '4 chrome-plated steel player rods with rubberized ergonomic grips',
      'Instant ball-return pockets on both ends',
      '5-minute assembly with included Allen key'
    ],
    stock: 11,
    isFlashDeal: true
  },
  {
    id: 'tgd-013',
    sku: 'TGD-RF-013',
    name: 'SkyHover Pocket Altitude-Hold Mini Drone',
    brand: 'AeroFlyer Tech',
    room: 'outdoor',
    roomLabel: 'Roof: Sky Arena & Flyers',
    price: 32.99,
    originalPrice: 42.00,
    rating: 4.8,
    reviewsCount: 154,
    badge: 'ROOFTOP HIT',
    badgeClass: 'badge-blue',
    ageGroup: '9-12',
    age: '8+',
    pieces: 'Drone + Controller + 2 Batteries',
    scale: 'Propeller Guard Cage',
    material: 'Flexible PP Safety Cage',
    dimensions: '12.0 × 12.0 × 4.2 cm',
    variants: ['Arctic White', 'Cyber Orange'],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Beginner-friendly indoor/outdoor mini quadcopter with full 360° safety propeller guards and one-key takeoff.',
    features: [
      'Barometric altitude hold keeps the drone hovering steady hands-free',
      'Full wrap-around flexible guards protect walls, furniture, and fingers',
      'One-button 360° aerial flip stunt mode and 3 speed gears',
      'Includes 2 modular USB-rechargeable batteries (22 mins total flight)'
    ],
    stock: 15,
    isFlashDeal: false
  },
  {
    id: 'tgd-014',
    sku: 'TGD-RF-014',
    name: 'AeroStrike Pro Foam Dart Blaster & Target Kit',
    brand: 'AeroFlyer Tech',
    room: 'outdoor',
    roomLabel: 'Roof: Sky Arena & Flyers',
    price: 18.99,
    originalPrice: 23.99,
    rating: 4.9,
    reviewsCount: 205,
    badge: 'SAFE FOAM PLAY',
    badgeClass: 'badge-red',
    ageGroup: '6-8',
    age: '6+',
    pieces: 'Blaster + 30 Foam Darts + 3 Targets',
    scale: 'Rotating 6-Dart Drum',
    material: 'ABS & Soft EVA Foam',
    dimensions: '29.0 × 17.5 × 6.5 cm',
    variants: ['Tactical Blue & Orange', 'Championship White'],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Spring-action rotating drum blaster with 30 soft suction-tip EVA foam darts and 3 knock-down tin targets.',
    features: [
      '100% battery-free slide-priming mechanism with slam-fire mode',
      'Soft hollow EVA foam tips with whistle & suction darts included',
      'Includes 3 auto-resetting scoring targets for bedroom or yard accuracy challenges',
      'ASTM F963 certified eye-safe velocity'
    ],
    stock: 27,
    isFlashDeal: false
  },
  {
    id: 'tgd-015',
    sku: 'TGD-1F-015',
    name: '6-Car Collector Alloy Supercar Pack (1:64)',
    brand: 'Gents SpeedWorks',
    room: 'garage',
    roomLabel: '1F: The Speed Garage',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviewsCount: 340,
    badge: 'VALUE 6-PACK',
    badgeClass: 'badge-amber',
    ageGroup: '3-5',
    age: '3+',
    pieces: '6 Die-Cast Cars + Carry Case',
    scale: '1:64 Pocket Scale',
    material: 'Die-Cast Metal & ABS',
    dimensions: '7.2 cm per car',
    variants: ['European Exotics Pack', 'JDM Legends Pack'],
    image: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Gift-ready set of 6 pocket-scale metal race cars with metallic paintjobs and free-rolling track wheels.',
    features: [
      '6 distinct licensed-style GT and endurance race car castings',
      'Compatible with standard orange gravity race tracks',
      'Includes transparent snap-lock 6-slot garage carry case',
      'Under KSh 325 per metal car, our #1 birthday gift pick'
    ],
    stock: 38,
    isFlashDeal: false
  },
  {
    id: 'tgd-016',
    sku: 'TGD-5F-016',
    name: 'Captain Barnaby Aviator Bear Plush (30cm)',
    brand: 'Dollhouse Originals',
    room: 'arcade',
    roomLabel: '5F: Tabletop & Retro Den',
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.9,
    reviewsCount: 412,
    badge: 'MINISO SOFT',
    badgeClass: 'badge-red',
    ageGroup: '3-5',
    age: '3+',
    pieces: 'Ultra-Soft Mochi Plush + Goggles',
    scale: '30cm Hug Size',
    material: 'Hypoallergenic Micro-Spandex Down',
    dimensions: '30.0 × 21.0 × 16.0 cm',
    variants: ['Bomber Jacket Bear', 'Racing Suit Shiba Inu'],
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Signature Miniso-grade cloud-soft marshmallow plush mascot wearing a removable vintage corduroy flight jacket.',
    features: [
      'Crafted from ultra-stretchy, cloud-soft micro-velboa fabric',
      'Removable stitched aviator goggles and corduroy jacket',
      'Machine-washable (gentle cycle) and 100% hypoallergenic fill',
      'Official mascot of The Gents Dollhouse toy store!'
    ],
    stock: 45,
    isFlashDeal: false
  },
  {
    id: 'tgd-017',
    sku: 'MNS-SHW-017',
    name: 'Miniso Japanese Yuzu & Amino Acid Refreshing Shower Gel 500ml',
    brand: 'Miniso Daily Botanicals',
    room: 'shower',
    roomLabel: 'Bath, Body & Shower Gels',
    price: 14.99,
    originalPrice: 18.50,
    rating: 4.9,
    reviewsCount: 312,
    badge: 'MINISO BESTSELLER',
    badgeClass: 'badge-red',
    ageGroup: 'all',
    age: 'All Ages',
    pieces: '500ml Pump Dispenser',
    scale: 'pH 5.5 Balanced',
    material: 'Natural Yuzu Extract & Amino Acids',
    dimensions: '19.5 × 7.2 × 7.2 cm',
    variants: ['Japanese Yuzu (Citrus)', 'Nordic Pine & Eucalyptus', 'Sweet White Peach'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://i.pinimg.com/736x/a9/51/ca/a951ca81b8b97eff2b285af8d0198548.jpg'
    ],
    shortDesc: 'Silky micro-foam body wash infused with zesty Japanese Yuzu, botanical moisture ceramides, and refreshing citrus peel.',
    features: [
      'Gentle plant-derived amino acid cleansing base that preserves natural skin barrier',
      'Infused with real cold-pressed Japanese Yuzu essential oil for an uplifting morning scent',
      'Zero sulfates, parabens, or harsh detergents—100% cruelty-free & vegan',
      'Large 500ml family pump bottle with twist-lock travel dispenser'
    ],
    stock: 35,
    isFlashDeal: true
  },
  {
    id: 'tgd-018',
    sku: 'MNS-SHW-018',
    name: 'Miniso Cherry Blossom Hydrating Spa Shower Gel 400ml',
    brand: 'Miniso Sakura Series',
    room: 'shower',
    roomLabel: 'Bath, Body & Shower Gels',
    price: 12.99,
    originalPrice: 16.00,
    rating: 4.8,
    reviewsCount: 245,
    badge: 'POPULAR',
    badgeClass: 'badge-blue',
    ageGroup: 'all',
    age: 'All Ages',
    pieces: '400ml Petal Gel Bottle',
    scale: 'Deep Hydration',
    material: 'Sakura Petals & Niacinamide',
    dimensions: '18.0 × 6.8 × 6.8 cm',
    variants: ['Tokyo Sakura Blossom', 'English Lavender Dream', 'Rose Hydrosol'],
    image: 'https://i.pinimg.com/736x/a9/51/ca/a951ca81b8b97eff2b285af8d0198548.jpg',
    gallery: [
      'https://i.pinimg.com/736x/a9/51/ca/a951ca81b8b97eff2b285af8d0198548.jpg'
    ],
    shortDesc: 'Gentle floral shower gel with real suspended sakura petals that melt on skin, leaving a lasting delicate spring blossom perfume.',
    features: [
      'Real suspended moisture petals enriched with brightening niacinamide and vitamin E',
      'Produces a dense, creamy lather that leaves skin velvety soft without dryness',
      'Subtle, non-overpowering Parisian cherry blossom perfume notes',
      'Elegant aesthetic translucent bottle perfect for modern bathroom displays'
    ],
    stock: 28,
    isFlashDeal: false
  },
  {
    id: 'tgd-019',
    sku: 'MNS-CHG-019',
    name: 'Miniso 65W GaN Dual USB-C + USB-A Ultra-Fast Wall Charger',
    brand: 'Miniso PowerTech',
    room: 'chargers',
    roomLabel: 'Fast Chargers & Power Hub',
    price: 28.50,
    originalPrice: 35.00,
    rating: 4.9,
    reviewsCount: 428,
    badge: 'GAN 3.0 TECH',
    badgeClass: 'badge-red',
    ageGroup: '12+',
    age: '12+ & Tech',
    pieces: '65W GaN Charger Unit',
    scale: 'Dual USB-C + USB-A',
    material: 'Aerospace GaN & Fireproof PC',
    dimensions: '5.2 × 5.2 × 3.0 cm',
    variants: ['Glacier White', 'Matte Midnight Black', 'Sakura Pink'],
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Charges MacBook, iPad, iPhone, and Android laptops simultaneously from 0% to 60% in just 30 minutes.',
    features: [
      'Next-gen Gallium Nitride (GaN 3.0) technology runs 40% cooler and 50% smaller than stock bricks',
      'Dual Type-C PD 3.0 (65W Max) + USB-A QC 4.0 ports to charge 3 gadgets at once',
      'Smart dynamic power allocation protects device battery health against overvoltage and surges',
      'Foldable plug pins for ultra-compact travel in any laptop bag or pocket'
    ],
    stock: 42,
    isFlashDeal: true
  },
  {
    id: 'tgd-020',
    sku: 'MNS-CHG-020',
    name: 'Miniso 10,000mAh Magnetic Wireless MagSafe Power Bank + Kickstand',
    brand: 'Miniso PowerTech',
    room: 'chargers',
    roomLabel: 'Fast Chargers & Power Hub',
    price: 32.00,
    originalPrice: 39.99,
    rating: 4.8,
    reviewsCount: 380,
    badge: '15W WIRELESS',
    badgeClass: 'badge-gold',
    ageGroup: '12+',
    age: '12+ & Tech',
    pieces: '10000mAh Magnetic Battery',
    scale: '15W MagSafe + 20W PD',
    material: 'Aviation Aluminum & Soft Silicone Pad',
    dimensions: '10.4 × 6.8 × 1.6 cm',
    variants: ['Space Gray', 'Alpine White', 'Mint Mist'],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Snap-on magnetic wireless charging with 1,200g strong neodymium magnets and foldable aluminum kickstand for video calls.',
    features: [
      '1,200g ultra-strong magnetic lock snaps firmly onto iPhone 12/13/14/15/16 & magnetic cases',
      'Foldable aluminum alloy kickstand holds phone upright in portrait or landscape while charging',
      'Charges 2 devices at once: 15W wireless + 20W two-way USB-C Power Delivery port',
      'Digital LED percentage display shows remaining battery level at a glance'
    ],
    stock: 24,
    isFlashDeal: false
  },
  {
    id: 'tgd-021',
    sku: 'MNS-CHG-021',
    name: 'Miniso Armored 100W Type-C to Type-C Braided Fast Cable (1.5m)',
    brand: 'Miniso PowerTech',
    room: 'chargers',
    roomLabel: 'Fast Chargers & Power Hub',
    price: 9.99,
    originalPrice: 13.50,
    rating: 4.9,
    reviewsCount: 512,
    badge: 'DURABLE 100W',
    badgeClass: 'badge-blue',
    ageGroup: 'all',
    age: 'All Devices',
    pieces: '1.5-Meter Cable + Leather Tie',
    scale: '100W 5A E-Marker',
    material: 'Ballistic Nylon & Zinc Alloy Ends',
    dimensions: '150.0 × 1.2 × 0.6 cm',
    variants: ['Midnight Braided Black', 'Crimson Red / Black', 'Steel Silver'],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Tangle-free 100W Power Delivery cable tested for 25,000+ bends with built-in leather tie strap and alloy casing.',
    features: [
      'Supports up to 100W (20V/5A) PD fast charging for MacBooks, iPads, and high-wattage smartphones',
      'Built-in E-Marker smart chip automatically negotiates correct current to avoid battery degradation',
      'Double-braided ballistic nylon jacket tested to withstand over 25,000 bend cycles',
      'Includes premium embossed vegan leather cable tie for neat organization'
    ],
    stock: 60,
    isFlashDeal: false
  },
  {
    id: 'tgd-022',
    sku: 'MNS-PER-022',
    name: 'Miniso Nordic Woods Eau De Cologne 100ml',
    brand: 'Miniso Fragrance Atelier',
    room: 'fragrance',
    roomLabel: 'Perfumes & Fine Cologne Bar',
    price: 18.99,
    originalPrice: 24.00,
    rating: 4.9,
    reviewsCount: 290,
    badge: 'SIGNATURE SCENT',
    badgeClass: 'badge-red',
    ageGroup: '12+',
    age: '12+ & Adult',
    pieces: '100ml Heavy Glass Bottle',
    scale: '10-Hour Wear',
    material: 'Natural Essences, Denatured Grain Alcohol',
    dimensions: '14.5 × 6.5 × 4.2 cm',
    variants: ['Nordic Woods (Cedar & Pine)', 'Silver Mountain Water', 'Amber Noir Intense'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Crisp, invigorating woody aromatic cologne balancing northern pine breeze, smoky cedarwood, and sun-drenched Italian bergamot.',
    features: [
      'Top notes: Italian Bergamot, Lemon Zest, Fresh Mint; Heart: Juniper Berry, Sage, Crisp Green Apple',
      'Base notes: Virginian Cedarwood, Haitian Vetiver, White Amber, and Cashmere Musk',
      'Crafted by veteran Grasse perfumers for a fresh, confident everyday collector scent profile',
      'Presented in a weighted smoked-glass flacon with magnetic closure cap'
    ],
    stock: 32,
    isFlashDeal: true
  },
  {
    id: 'tgd-023',
    sku: 'MNS-PER-023',
    name: 'Miniso Crystal Amber & White Tea Eau De Parfum 50ml',
    brand: 'Miniso Fragrance Atelier',
    room: 'fragrance',
    roomLabel: 'Perfumes & Fine Cologne Bar',
    price: 16.50,
    originalPrice: 21.00,
    rating: 4.8,
    reviewsCount: 198,
    badge: 'EAU DE PARFUM',
    badgeClass: 'badge-gold',
    ageGroup: '12+',
    age: '12+ & Adult',
    pieces: '50ml Fine Mist Vaporisateur',
    scale: 'Concentrated EDP',
    material: 'White Tea Extract & Warm Amber',
    dimensions: '12.0 × 5.5 × 3.5 cm',
    variants: ['Crystal White Tea', 'Golden Mandarin & Vanilla', 'Midnight Orchid'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Subtle, clean, and elegant Parisian-crafted fragrance blending calm white tea notes with a warm, velvety amber dry-down.',
    features: [
      'High-concentration Eau de Parfum formula designed for 8–12 hours of soft, clean sillage',
      'Calming top notes of Japanese white tea buds and mandarin orange blossoms',
      'Warm amber and soft cedarwood finish that sits close to skin for intimate daily wear',
      'Minimalist frosted aesthetic flacon fits easily in handbag, desk drawer, or glovebox'
    ],
    stock: 26,
    isFlashDeal: false
  },
  {
    id: 'tgd-024',
    sku: 'MNS-BTL-024',
    name: 'Miniso Double-Wall Vacuum Stainless Tumbler with Straw (750ml)',
    brand: 'Miniso PureHydrate',
    room: 'bottles',
    roomLabel: 'Water Bottles & Thermal Tumblers',
    price: 19.50,
    originalPrice: 25.00,
    rating: 4.9,
    reviewsCount: 367,
    badge: '24H COLD',
    badgeClass: 'badge-blue',
    ageGroup: 'all',
    age: 'All Ages',
    pieces: '750ml Tumbler + Silicone Straw',
    scale: '24H Cold / 12H Hot',
    material: 'Food-Grade 304 Stainless Steel',
    dimensions: '24.0 × 8.5 × 8.5 cm',
    variants: ['Cream White', 'Sage Green Mist', 'Midnight Matte Black', 'Pastel Lilac'],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Keeps icy cold for 24 hours or piping hot for 12 hours. Features dual-sip leakproof lid, soft silicone straw, and sweat-free powder coat.',
    features: [
      'Double-wall copper vacuum insulation prevents external condensation and maintains iced temperature all day',
      'Dual-sip lid design: use the flip straw for fast hydration or open the spout for hot drinks',
      'Tapered slim base fits easily into vehicle car cup holders and gym machine slots',
      'Wide-mouth opening accommodates full-size ice cubes and makes hand-cleaning effortless'
    ],
    stock: 40,
    isFlashDeal: true
  },
  {
    id: 'tgd-025',
    sku: 'MNS-BTL-025',
    name: 'Miniso Gradient Motivational Sport Water Jug with Straw (1000ml)',
    brand: 'Miniso PureHydrate',
    room: 'bottles',
    roomLabel: 'Water Bottles & Thermal Tumblers',
    price: 13.99,
    originalPrice: 17.50,
    rating: 4.7,
    reviewsCount: 284,
    badge: 'BPA FREE',
    badgeClass: 'badge-green',
    ageGroup: 'all',
    age: 'All Ages',
    pieces: '1-Litre Bottle + Carry Strap',
    scale: 'Time Tracker Markers',
    material: '100% BPA-Free US Tritan Co-Polyester',
    dimensions: '28.0 × 7.8 × 7.8 cm',
    variants: ['Peach & Ocean Blue Gradient', 'Purple Sunset Gradient', 'Smoky Black Translucent'],
    image: 'https://images.unsplash.com/photo-1550989460-0adc9f677773?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550989460-0adc9f677773?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Shatterproof pastel gradient sports bottle with motivating hourly drink markers, pop-up silicone straw, and ergonomic carrying lanyard.',
    features: [
      'Hourly water intake timestamps encourage you to hit your daily 2-litre hydration goals',
      'Crafted from durable, drop-resistant American Tritan plastic with zero plastic odor or taste',
      'One-click flip cap with safety lock ring ensures zero leaks inside backpacks or gym lockers',
      'Detachable wrist lanyard and soft silicone drinking nozzle'
    ],
    stock: 34,
    isFlashDeal: false
  },
  {
    id: 'tgd-026',
    sku: 'MNS-BAG-026',
    name: 'Miniso Urban Commuter Waterproof 15.6" Laptop Backpack',
    brand: 'Miniso Urban Gear',
    room: 'bags',
    roomLabel: 'Laptop Bags & Tech Sleeves',
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.9,
    reviewsCount: 450,
    badge: 'WEATHERPROOF',
    badgeClass: 'badge-red',
    ageGroup: '12+',
    age: 'Teens & Adults',
    pieces: 'Fits 15.6" - 16" Laptops',
    scale: '20L Expandable Storage',
    material: 'Water-Repellent 900D Oxford & PU Film',
    dimensions: '44.0 × 30.5 × 14.0 cm',
    variants: ['Graphite Black', 'Stealth Navy', 'Heather Gray'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Streamlined commuter backpack with 360° air-cushioned laptop sleeve, luggage trolley strap, hidden anti-theft back pocket, and USB charge port.',
    features: [
      'Padded shockproof compartment fits all laptops and MacBooks up to 16 inches with strap lock',
      'Hydrophobic waterproof exterior fabric sheds heavy Nairobi rainstorms and accidental spills',
      'Ergonomic breathable honey-comb mesh back panel and S-shaped shoulder straps reduce spinal load',
      'Luggage strap passes over rolling suitcase handles for frictionless airport and commuter travel'
    ],
    stock: 22,
    isFlashDeal: true
  },
  {
    id: 'tgd-027',
    sku: 'MNS-BAG-027',
    name: 'Miniso Minimalist Shockproof Padded Laptop Sleeve 14–15.6"',
    brand: 'Miniso Urban Gear',
    room: 'bags',
    roomLabel: 'Laptop Bags & Tech Sleeves',
    price: 17.99,
    originalPrice: 22.50,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'SLIM CUSHION',
    badgeClass: 'badge-gold',
    ageGroup: 'all',
    age: 'All Laptops',
    pieces: 'Universal 14-15.6" Sleeve',
    scale: '2.5cm Ultra-Slim Profile',
    material: 'Shock-Absorbing EVA Foam & Velvet Lining',
    dimensions: '38.0 × 27.0 × 2.5 cm',
    variants: ['Charcoal Heather', 'Midnight Blue', 'Blush Rose'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Featherweight briefcase sleeve with 5-layer shock-absorbing bubble foam, front organizer zipper pocket for charger & mouse, and hideaway carry handles.',
    features: [
      'Plush microfiber fleece interior protects laptop aluminum shell from scratches and scuffs',
      '360-degree reinforced impact edge corners guard against corner drops and desk bumps',
      'Spacious front zipper pocket holds charger, mouse, phone, notebook, and pens with ease',
      'Retractable handles allow you to carry as a briefcase or slide seamlessly into a larger backpack'
    ],
    stock: 36,
    isFlashDeal: false
  },
  {
    id: 'tgd-028',
    sku: 'MNS-TOY-028',
    name: 'Miniso Fluffy Shiba Inu Weighted Huggable Plushie (45cm)',
    brand: 'Miniso Sweet Dreamers',
    room: 'arcade',
    roomLabel: '5F: Tabletop & Retro Den',
    price: 21.00,
    originalPrice: 26.50,
    rating: 5.0,
    reviewsCount: 580,
    badge: 'MINISO VIRAL',
    badgeClass: 'badge-red',
    ageGroup: 'all',
    age: 'All Ages',
    pieces: '45cm Squishy Plush Doll',
    scale: 'Jumbo Cuddle Size',
    material: 'Ultra-Elastic Microfiber & Down Cotton',
    dimensions: '45.0 × 24.0 × 20.0 cm',
    variants: ['Classic Honey Shiba', 'Sleepy Panda Boba', 'Matcha Dino Bear'],
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Viral ultra-soft squishy Shiba Inu comfort plushie with embroidered cheeks. Super stretchy, washable, and warm.',
    features: [
      'Crafted from Miniso signature 4-way stretch velvet fabric filled with resilient down-alternative cotton',
      'Double-stitched seams ensure longevity even with daily hugging, sleeping, or couch lounging',
      'Hypoallergenic and odorless materials safe for toddlers, kids, teenagers, and adult collectors',
      'The #1 viral gifting item across Miniso flagship stores globally!'
    ],
    stock: 50,
    isFlashDeal: true
  }
];

export const BLINDBOX_SERIES = [
  {
    id: 'series-garage',
    name: 'Series 4: Mystery Speed Garage',
    price: 9.99,
    casePrice: 54.99,
    themeColor: '#d0106f',
    description: 'Stylized helmeted drivers and mini metallic supercars with magnetic visors.',
    figures: [
      { id: 'sg-1', name: 'Apex Golden GT-R', rarity: 'SECRET CHASE (1.5%)', emoji: '01/CHASE', value: 'KSh 3,870', isRare: true },
      { id: 'sg-2', name: 'Nitro Drift King Rx', rarity: 'SUPER RARE (10%)', emoji: '02/RARE', value: 'KSh 2,190', isRare: true },
      { id: 'sg-3', name: 'Silver Bullet LeMans', rarity: 'COLLECTOR (22%)', emoji: '03/SPEC', value: 'KSh 1,550', isRare: false },
      { id: 'sg-4', name: 'Midnight Rally Buggy', rarity: 'REGULAR (22%)', emoji: '04/CORE', value: 'KSh 1,290', isRare: false },
      { id: 'sg-5', name: 'Pit-Stop Chief Otto', rarity: 'REGULAR (22%)', emoji: '05/CORE', value: 'KSh 1,290', isRare: false },
      { id: 'sg-6', name: 'Classic Track Kart #7', rarity: 'REGULAR (22.5%)', emoji: '06/CORE', value: 'KSh 1,290', isRare: false }
    ]
  },
  {
    id: 'series-mecha',
    name: 'Series 2: Cyber-Mecha Squadron',
    price: 10.99,
    casePrice: 59.99,
    themeColor: '#2563eb',
    description: 'Pocket-sized armored mecha defenders with glow-in-the-dark visors and snap jetpacks.',
    figures: [
      { id: 'cm-1', name: 'Omega Chrome Valkyrie', rarity: 'SECRET CHASE (1.5%)', emoji: 'M1/CHASE', value: 'KSh 4,130', isRare: true },
      { id: 'cm-2', name: 'Cobalt Titan Mk-IV', rarity: 'SUPER RARE (12%)', emoji: 'M2/RARE', value: 'KSh 2,320', isRare: true },
      { id: 'cm-3', name: 'Solar Flare Interceptor', rarity: 'COLLECTOR (21%)', emoji: 'M3/SPEC', value: 'KSh 1,550', isRare: false },
      { id: 'cm-4', name: 'Astro-Pup Rover Unit', rarity: 'REGULAR (22%)', emoji: 'M4/CORE', value: 'KSh 1,420', isRare: false },
      { id: 'cm-5', name: 'Lunar Heavy Loader', rarity: 'REGULAR (22%)', emoji: 'M5/CORE', value: 'KSh 1,420', isRare: false },
      { id: 'cm-6', name: 'Stealth Scout Drone', rarity: 'REGULAR (21.5%)', emoji: 'M6/CORE', value: 'KSh 1,420', isRare: false }
    ]
  },
  {
    id: 'series-arcade',
    name: 'Series 1: Pixel-Bot Retro Arcade',
    price: 8.99,
    casePrice: 49.99,
    themeColor: '#059669',
    description: 'Mini arcade cabinet buddies with real clicky micro-switch buttons and lenticular screens.',
    figures: [
      { id: 'pa-1', name: '8-Bit Transparent Gold Boy', rarity: 'SECRET CHASE (1.5%)', emoji: 'A1/CHASE', value: 'KSh 3,225', isRare: true },
      { id: 'pa-2', name: 'Neon Synthwave Cabinet', rarity: 'SUPER RARE (11%)', emoji: 'A2/RARE', value: 'KSh 1,935', isRare: true },
      { id: 'pa-3', name: 'Pinball Wizard Bot', rarity: 'COLLECTOR (22%)', emoji: 'A3/SPEC', value: 'KSh 1,420', isRare: false },
      { id: 'pa-4', name: 'Pocket Brick-Breaker', rarity: 'REGULAR (22%)', emoji: 'A4/CORE', value: 'KSh 1,160', isRare: false },
      { id: 'pa-5', name: 'Cassette Tape DJ Bot', rarity: 'REGULAR (22%)', emoji: 'A5/CORE', value: 'KSh 1,160', isRare: false },
      { id: 'pa-6', name: 'Turbo Joystick Buddy', rarity: 'REGULAR (21.5%)', emoji: 'A6/CORE', value: 'KSh 1,160', isRare: false }
    ]
  }
];

export const STORE_LOCATIONS = [
  {
    id: 'store-1',
    name: 'The Gents Dollhouse, Runda Mall Flagship',
    city: 'Runda Mall, 3rd Floor',
    address: '3rd Floor, Runda Mall (Main Atrium Wing), Nairobi',
    hours: 'Mon to Sun: 9:00 AM to 8:30 PM',
    phone: '0768987084',
    email: 'thegenttoystore@gmail.com',
    status: 'Open Now • Flagship Store & Customer Care Desk',
    features: ['6 Interactive Toy Zones', 'Mystery Capsule Wall', '30-Min Click & Collect Desk', 'Free Gift Wrapping'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'store-2',
    name: 'The Gents Dollhouse, Runda Mall RC & Build Lounge',
    city: 'Runda Mall, 3rd Floor (Suite 304)',
    address: '3rd Floor, Runda Mall, Interactive Hobby Wing',
    hours: 'Mon to Sun: 9:30 AM to 8:30 PM',
    phone: '0768987084',
    email: 'thegenttoystore@gmail.com',
    status: 'Open Now • RC Drift Track & Build Tables Active',
    features: ['Indoor Mini RC Drift Track', 'Blind-Box Trading Station', 'Weekend Brick Workshops'],
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    productId: 'tgd-001',
    author: 'Marcus T.',
    role: 'Verified Collector',
    rating: 5,
    date: '2 days ago',
    title: 'Incredible die-cast weight for under KSh 2,600!',
    comment: 'Bought this with my 8-year-old son at Runda Mall 3rd Floor. We ended up getting two: one for his race track and one for my office bookshelf. The LED headlights and metal doors feel like a KSh 6,500 model.'
  },
  {
    id: 'rev-2',
    productId: 'tgd-003',
    author: 'David & Leo K.',
    role: 'Weekend Brick Builders',
    rating: 5,
    date: '5 days ago',
    title: 'Best father-son weekend build we have done',
    comment: '880 pieces snapped together smoothly with zero missing parts. Watching the steam piston rods actually move when you push the train along the track is pure magic.'
  },
  {
    id: 'rev-3',
    productId: 'tgd-004',
    author: 'Kelvin M.',
    role: 'Blind Box Fan',
    rating: 5,
    date: '1 week ago',
    title: 'Miniso vibes but tailored for car & robot fans!',
    comment: 'Finally a store like Miniso where I can grab cool desk toys, mini race cars, and mystery figures without spending a fortune. Pulled the Nitro Drift King on my second box!'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What kind of store is The Gents Dollhouse?',
    a: 'The Gents Dollhouse is a bright, family-friendly, Miniso-style toy and hobby retail concept. Our flagship store at Runda Mall 3rd Floor is organized into six themed floors: 1F Speed Garage (Die-Cast & RC), 2F Brick & Gear Lab, 3F Hero & Mecha Vault, 4F Mystery Capsule Alley, 5F Tabletop & Retro Den, and Roof Sky Arena. Every single product is a 100% wholesome, safety-certified toy for kids, teens, parents, and collectors.'
  },
  {
    q: 'How does the Pick Any 3 Toys for 15% Off Miniso Bundle work?',
    a: 'Whenever you add 3 or more toys from any department to your shopping bag (or build a custom box on our Bundles page), our checkout automatically applies an instant 15% Bundle Discount with no coupon required. You can also stack promo codes like WELCOME10 on qualifying orders.'
  },
  {
    q: 'Are all toys safety-certified for children?',
    a: 'Yes. Every toy in our catalog complies with international ASTM F963 and EN71 toy safety standards. We use non-toxic ABS plastics, lead-free die-cast zinc alloys, and FSC-certified basswood for our 3D mechanical puzzles. Age ratings (3+, 6+, 8+, 10+) are clearly marked on every product.'
  },
  {
    q: 'Can I order online and pick up at Runda Mall 3rd Floor on the same day?',
    a: 'Absolutely. Select Free In-Store Pickup (Ready in 30 Mins) during Step 1 of Checkout and collect your toys at our Runda Mall 3rd Floor Customer Care counter.'
  },
  {
    q: 'How do I reach Customer Care directly?',
    a: 'Call or WhatsApp our Runda Mall 3rd Floor Customer Care team on 0768987084, or email thegenttoystore@gmail.com between 9:00 AM and 8:30 PM daily.'
  },
  {
    q: 'Do you offer franchise or wholesale partnerships?',
    a: 'Yes. Inspired by Miniso turnkey retail stores, we offer modular store-in-store kiosks and full flagship store partnerships. Use the Franchise Inquiry form on our About page or email thegenttoystore@gmail.com to request our retail pitch deck.'
  }
];
