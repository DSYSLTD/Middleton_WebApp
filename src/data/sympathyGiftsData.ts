export interface SympathyGiftProduct {
  id: number;
  name: string;
  price: number;
  category: 'Flowers' | 'Memorial Candles' | 'Photo Gifts' | 'Plants & Garden' | 'Keepsakes' | 'Sympathy Cards';
  image: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  description: string;
  purpose: 'Thinking of You' | 'Memory Lives On' | 'Peace & Comfort' | 'Personalized';
  isPersonalizable?: boolean;
}

export const SYMPATHY_GIFTS: SympathyGiftProduct[] = [
  // ==================== 1. FLOWERS (8 items) ====================
  {
    id: 101,
    name: "White Lily & Rose Casket Spray",
    price: 325.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 42,
    badge: "Full Casket Drape",
    description: "Lush full-length casket spray designed with fragrant oriental white lilies, premium Ecuadorian white roses, and silver dollar eucalyptus.",
    purpose: "Memory Lives On"
  },
  {
    id: 102,
    name: "Standing Tribute Heart Easel",
    price: 275.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 38,
    badge: "Ceremonial Easel",
    description: "Solid open heart floral wreath crafted with pure white carnations, soft blush spray roses, and cascading English ivy.",
    purpose: "Thinking of You"
  },
  {
    id: 103,
    name: "Classic Sympathy Flower Basket",
    price: 125.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 56,
    badge: "Bestseller",
    description: "A traditional expression of comfort featuring cream garden roses, snapdragons, stock, and seasonal foliage in a woven wicker basket.",
    purpose: "Thinking of You"
  },
  {
    id: 104,
    name: "Pure Grace Floor Standing Spray",
    price: 210.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 29,
    badge: "Service Display",
    description: "Towering vertical sympathy spray in a white fluted ceramic urn with gladiolus, white delphinium, and Hydrangea macrophylla.",
    purpose: "Peace & Comfort"
  },
  {
    id: 105,
    name: "Serene Calla Lily Tribute Vase",
    price: 165.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 31,
    badge: "Modern Elegance",
    description: "Hand-arranged architectural display of twelve long-stemmed white Dutch calla lilies in an engraved heavy glass cylinder.",
    purpose: "Peace & Comfort"
  },
  {
    id: 106,
    name: "Pastel Remembrance Urn Surround",
    price: 195.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 24,
    badge: "Urn Table Wreath",
    description: "Circular garland of delicate peach roses, lavender lisianthus, and dusty miller perfectly proportioned to surround a memorial urn or portrait.",
    purpose: "Memory Lives On"
  },
  {
    id: 107,
    name: "Loving Remembrance Standing Cross",
    price: 295.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 33,
    badge: "Sacred Cross",
    description: "Easel-mounted standing cross layered with pristine white carnations and a diagonal sash of deep red Ecuadorian roses.",
    purpose: "Memory Lives On"
  },
  {
    id: 108,
    name: "Peaceful Meadow Fireside Basket",
    price: 145.00,
    category: "Flowers",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 27,
    badge: "Low Profile Basket",
    description: "Subtle country garden arrangement of lavender larkspur, white daisies, veronica, and Queen Anne's lace designed for floor or altar display.",
    purpose: "Thinking of You"
  },

  // ==================== 2. MEMORIAL CANDLES (8 items) ====================
  {
    id: 201,
    name: "Personalized Soy Memorial Pillar Candle",
    price: 35.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 68,
    badge: "Custom Laser Inscribed",
    description: "Hand-poured 100% soy wax pillar candle custom printed with your loved one's full name, memorial dates, and personal quote.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 202,
    name: "Eternal Flame Votive Gift Set (Trio)",
    price: 48.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 44,
    badge: "Gift Boxed",
    description: "Three frosted glass votives with gold-leaf inscriptions of Peace, Hope, and Eternal Memory. Includes 3 soy tea lights.",
    purpose: "Peace & Comfort"
  },
  {
    id: 203,
    name: "Botanical Pressed Flower Memorial Candle",
    price: 42.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 32,
    badge: "Handcrafted Wax",
    description: "Artisan pillar candle embedded with genuine pressed forget-me-not flowers and English lavender buds. Subtly scented with white tea.",
    purpose: "Memory Lives On"
  },
  {
    id: 204,
    name: "Everlasting Glow Flameless LED Memory Candle",
    price: 38.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1572293007244-8b60335d2b7d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 51,
    badge: "Safe LED Timer",
    description: "Real wax candle with gentle dancing LED flame, 6-hour automatic timer, and engraved verse: 'Your light shines forever in our hearts.'",
    purpose: "Peace & Comfort",
    isPersonalizable: true
  },
  {
    id: 205,
    name: "Heritage Brass Solace Lantern Candle",
    price: 65.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 29,
    badge: "Indoor / Outdoor",
    description: "Antiqued brushed brass memorial lantern with tempered glass panels and removable long-burning white pillar candle.",
    purpose: "Memory Lives On"
  },
  {
    id: 206,
    name: "Lavender & Chamomile Solace Aromatherapy Candle",
    price: 32.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 39,
    badge: "Pure Essential Oils",
    description: "Calming essential oil candle formulated with French lavender and Roman chamomile to bring stillness during grief.",
    purpose: "Peace & Comfort"
  },
  {
    id: 207,
    name: "Engraved Glass Cylinder Remembrance Candle",
    price: 50.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 27,
    badge: "Heavy Glass Hurricane",
    description: "Thick hand-blown hurricane glass cylinder etched with a delicate dove motif, family name, and warm ivory wax center.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 208,
    name: "Pure Beeswax Ceremonial Taper Set (Pack of 4)",
    price: 28.00,
    category: "Memorial Candles",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 19,
    badge: "100% Pure Beeswax",
    description: "Natural honeycomb rolled tapers that burn cleanly without smoke, accompanied by glazed ceramic candle stands.",
    purpose: "Peace & Comfort"
  },

  // ==================== 3. PHOTO GIFTS (8 items) ====================
  {
    id: 301,
    name: "Solid Mahogany 'Always in Our Hearts' Frame",
    price: 40.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 53,
    badge: "Archival Hardwood",
    description: "Hand-finished 5x7 solid mahogany frame with double museum matting and gold foil inscribed sympathy blessing.",
    purpose: "Memory Lives On",
    isPersonalizable: true
  },
  {
    id: 302,
    name: "Engraved Natural Slate Memorial Photo Plaque",
    price: 58.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 37,
    badge: "Natural Chiseled Slate",
    description: "Natural edge metamorphic slate stone laser-etched with your submitted portrait and personalized tribute inscription.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 303,
    name: "Framed Linen Memorial Photo & Memory Board",
    price: 75.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 28,
    badge: "Large 16x20 Display",
    description: "Easel-backed wooden framed display with natural linen pinboard and 12 brass clips for showcasing family photos at the service.",
    purpose: "Thinking of You"
  },
  {
    id: 304,
    name: "K9 Optical 3D Laser Etched Crystal Portrait Cube",
    price: 85.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 46,
    badge: "3D Sub-Surface Laser",
    description: "Heavy K9 crystal cube preserving a three-dimensional volumetric laser portrait of your loved one. Includes LED illumination base.",
    purpose: "Memory Lives On",
    isPersonalizable: true
  },
  {
    id: 305,
    name: "Ceramic Tribute Photo Tile with Display Stand",
    price: 36.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviewsCount: 22,
    badge: "Gloss Kiln-Fired",
    description: "6x6 inch kiln-fired porcelain tile with vibrant permanent sublimation portrait and black wrought iron tabletop display easel.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 306,
    name: "Heirloom Remembrance Velvet Shadow Box",
    price: 90.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 19,
    badge: "Deep Display Case",
    description: "Deep-recessed walnut shadow box with black velvet backing and glass door for preserving portraits, medals, and funeral ribbons.",
    purpose: "Memory Lives On"
  },
  {
    id: 307,
    name: "Gallery Wrapped Fine Art Memorial Canvas (12x16)",
    price: 68.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 34,
    badge: "Museum Grade Canvas",
    description: "Stretched artist canvas printed with archival pigmented inks and protective satin varnish. Ready to hang without framing.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 308,
    name: "Embossed Leather Memorial Photo Album",
    price: 52.00,
    category: "Photo Gifts",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 31,
    badge: "Archival Leather",
    description: "Rich top-grain bonded leather memory album with 50 acid-free slip-in pages, gold foil lettering, and silk page ribbon marker.",
    purpose: "Memory Lives On"
  },

  // ==================== 4. PLANTS & GARDEN (8 items) ====================
  {
    id: 401,
    name: "Peace Lily in White Ceramic Planter",
    price: 75.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 64,
    badge: "Living Remembrance",
    description: "Lush evergreen peace lily featuring graceful white spathes that thrive indoors. Potted in a high-gloss embossed white ceramic bowl.",
    purpose: "Peace & Comfort"
  },
  {
    id: 402,
    name: "Memorial Deep-Tone Resonant Wind Chime",
    price: 68.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 52,
    badge: "Hand-Tuned Chime",
    description: "Heavy-gauge anodized aluminum chime tubes hand-tuned to deep resonant notes. Inscribed sail: 'Listen to the wind and know I am near.'",
    purpose: "Peace & Comfort"
  },
  {
    id: 403,
    name: "Succulent Memory Garden Dish with River Stones",
    price: 65.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 36,
    badge: "Long Lasting",
    description: "Arrangement of resilient, easy-care succulents in an earthy stoneware bowl adorned with polished Minnesota river stones.",
    purpose: "Peace & Comfort"
  },
  {
    id: 404,
    name: "Norfolk Island Living Memorial Pine",
    price: 80.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 25,
    badge: "Tribute Tree",
    description: "Evergreen living pine tree in a rustic birch bark pot with burlap wrap. Can be kept indoors or planted outdoors in spring.",
    purpose: "Memory Lives On"
  },
  {
    id: 405,
    name: "Hand-Carved Garden Memory Stepping Stone",
    price: 45.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 47,
    badge: "Weatherproof Stone",
    description: "Cast stone plaque engraved with: 'Those we love don\\'t go away, they walk beside us every day.' Suitable for flower beds or walkways.",
    purpose: "Memory Lives On"
  },
  {
    id: 406,
    name: "Cast Bronze Memorial Tree Dedication Marker",
    price: 110.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1620336214101-76c2417728ce?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 18,
    badge: "Cemetery Spec Bronze",
    description: "Solid cast bronze marker on a 24-inch steel ground stake, permanently engraved with loved one\\'s name and memorial dedication.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 407,
    name: "European Blooming Sympathy Dish Garden",
    price: 88.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 31,
    badge: "Multi-Plant Basket",
    description: "Harmonious combination of flowering kalanchoe, English ivy, parlor palm, and dieffenbachia arranged in a whitewashed wicker planter.",
    purpose: "Thinking of You"
  },
  {
    id: 408,
    name: "Cast Stone Garden Memorial Bird Bath",
    price: 95.00,
    category: "Plants & Garden",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 23,
    badge: "Outdoor Sanctuary",
    description: "Two-piece weatherproof concrete bird bath with sculpted peaceful dove medallion, creating a tranquil memorial sanctuary in the home garden.",
    purpose: "Peace & Comfort"
  },

  // ==================== 5. KEEPSAKES (8 items) ====================
  {
    id: 501,
    name: "Sterling Silver Filigree Ashes Memorial Locket",
    price: 180.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 62,
    badge: ".925 Sterling Silver",
    description: "Intricately detailed sterling silver locket with threaded air-tight inner capsule for holding cremation ash, dried petals, or lock of hair.",
    purpose: "Memory Lives On",
    isPersonalizable: true
  },
  {
    id: 502,
    name: "HD Laser Inscribed Thumbprint Memorial Pendant",
    price: 195.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 48,
    badge: "Custom Fingerprint",
    description: "Solid pendant precision laser-etched with your loved one's actual fingerprint scan on the front and custom cursive signature on the back.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 503,
    name: "Solid Walnut Velvet-Lined Keepsake Memory Box",
    price: 75.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 39,
    badge: "Solid American Walnut",
    description: "Handmade hardwood keepsake box with routed brass hinges, midnight blue velvet lining, and laser-carved family crest or name.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 504,
    name: "Hand-Blown Crystal Ash Memory Orb with LED Stand",
    price: 160.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 34,
    badge: "Artisan Crystal Glass",
    description: "Solid glass sphere hand-blown by Minnesota artisans, entangling cremation ash with ethereal sapphire and gold glass spirals.",
    purpose: "Memory Lives On"
  },
  {
    id: 505,
    name: "Natural Opalite Pocket Angel Worry Stone",
    price: 22.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 71,
    badge: "Pocket Comfort",
    description: "Hand-polished iridescent gemstone sculpted into a gentle guardian angel shape, sized to fit comfortably in a pocket or palm.",
    purpose: "Peace & Comfort"
  },
  {
    id: 506,
    name: "Pewter Remembrance Tokens (Set of 5 in Gift Bag)",
    price: 55.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 41,
    badge: "Solid Cast Pewter",
    description: "Five solid pewter pocket stones stamped with words of comfort: 'Strength', 'Peace', 'Always', 'Love', and 'Courage'. For family sharing.",
    purpose: "Thinking of You"
  },
  {
    id: 507,
    name: "Hand-Engraved Miniature Sharing Brass Urn",
    price: 60.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 35,
    badge: "Family Keepsake",
    description: "3-inch solid brass keepsake urn with floral scrollwork, velvet presentation case, and threaded lid for preserving a small portion of ash.",
    purpose: "Memory Lives On"
  },
  {
    id: 508,
    name: "Coordinates & Signature Memorial Leather Keychain",
    price: 30.00,
    category: "Keepsakes",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 29,
    badge: "Full-Grain Leather",
    description: "Hand-burnished leather fob laser-engraved with the precise latitude and longitude of your loved one's resting place.",
    purpose: "Personalized",
    isPersonalizable: true
  },

  // ==================== 6. SYMPATHY CARDS (8 items) ====================
  {
    id: 601,
    name: "Handwritten Letterpress Gold Foil Sympathy Cards (Pack of 6)",
    price: 24.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 65,
    badge: "Letterpress Foil",
    description: "Heavy 300gsm cotton cardstock stamped with metallic gold foil sentiments and lined matching envelopes. Blank inside for your words.",
    purpose: "Thinking of You"
  },
  {
    id: 602,
    name: "Botanical Watercolor Condolence Card Collection (Box of 8)",
    price: 28.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 43,
    badge: "Watercolor Art",
    description: "Original watercolor paintings of white lilies, weeping eucalyptus, and olive branches printed on textured watercolor paper.",
    purpose: "Thinking of You"
  },
  {
    id: 603,
    name: "Comfort & Strength Blind-Embossed Sympathy Card",
    price: 8.50,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 38,
    badge: "Individual Card",
    description: "Minimalist luxury card featuring deep blind-embossed script: 'Wishing you quiet strength and gentle comfort.' Includes pearlized envelope.",
    purpose: "Peace & Comfort"
  },
  {
    id: 604,
    name: "Handmade Deckle-Edge Tree of Life Sympathy Card",
    price: 9.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 26,
    badge: "Handmade Cotton Paper",
    description: "Artisan deckle-edged recycled cotton paper stamped with a bronze foil silhouette of the Tree of Life symbolizing eternal roots.",
    purpose: "Memory Lives On"
  },
  {
    id: 605,
    name: "Heavenly Peace Wooden Dove Detachable Ornament Card",
    price: 9.50,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 31,
    badge: "Keepsake Ornament Card",
    description: "Thick greeting card featuring a detachable laser-cut natural birchwood dove ornament for the grieving family to keep and hang.",
    purpose: "Peace & Comfort"
  },
  {
    id: 606,
    name: "Gentle Heart Memory Booklet & Sympathy Card",
    price: 12.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1473216016654-e0696328310c?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviewsCount: 19,
    badge: "Storytelling Booklet",
    description: "4-page accordion folding booklet with dedicated sections to write favorite stories, memories, and personal blessings for the family.",
    purpose: "Memory Lives On"
  },
  {
    id: 607,
    name: "Custom Handwritten Calligraphy Condolence Note Card",
    price: 15.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    reviewsCount: 52,
    badge: "Personalized Calligraphy",
    description: "Our in-house calligrapher hand-inscribes your personal condolence message in archival iron-gall ink and seals the envelope with wax.",
    purpose: "Personalized",
    isPersonalizable: true
  },
  {
    id: 608,
    name: "Serenity Memorial Prayer & Scripture Cards (Pack of 25)",
    price: 35.00,
    category: "Sympathy Cards",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewsCount: 33,
    badge: "Laminated Pack",
    description: "Heavy laminated wallet-size memorial cards with 23rd Psalm, Beatitudes, and peaceful Minnesota landscape imagery.",
    purpose: "Peace & Comfort"
  }
];
