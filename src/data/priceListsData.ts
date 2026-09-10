export interface PriceItem {
  code: string;
  name: string;
  price: string;
  desc: string;
}

export interface PriceListDoc {
  id: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  badge: string;
  description: string;
  items: PriceItem[];
  ftcDisclaimer: string;
}

export const PRICE_LISTS: PriceListDoc[] = [
  {
    id: 'gpl',
    title: 'General Price List (GPL)',
    subtitle: 'Complete Breakdown of Professional Services, Facilities, Transportation & Packages',
    effectiveDate: 'July 1, 2026',
    badge: 'FTC Required',
    description: 'The General Price List provides full transparency into basic services of funeral director, staff, embalming, facility usage, transportation, itemized merchandise ranges, and funeral/cremation packages.',
    ftcDisclaimer: 'The goods and services shown below are those we can provide to our customers. You may choose only the items you desire. However, any funeral arrangements you select will include a charge for our basic services and overhead. If legal or other requirements mean you must buy any items you did not specifically ask for, we will explain the reason in writing on the statement we provide describing the funeral goods and services you selected.',
    items: [
      { code: 'GPL-A01', name: 'Basic Services of the Funeral Director and Staff and Overhead', price: '$2,685', desc: 'Arrangement conference, funeral planning, consultation with family/clergy, sheltering remains, filing death notices/permits, and third-party coordination. Added to selected arrangements (included in direct cremation, immediate burial, aquamation).' },
      { code: 'GPL-B01', name: 'Embalming Care', price: '$695', desc: 'Professional embalming care. Except in certain cases, embalming is not required by law.' },
      { code: 'GPL-C01', name: 'Cosmetic, Dressing, and Casketing of Deceased', price: '$295', desc: 'Cosmetics, dressing, hair styling, and casket placement.' },
      { code: 'GPL-C02', name: 'Special Care for Autopsied Deceased', price: '$295', desc: 'Specialized surgical restoration and care for autopsied remains.' },
      { code: 'GPL-C03', name: 'Washing/Disinfecting for Private Family Viewing', price: '$195', desc: 'Sanitizing, bathing, and preparation for un-embalmed private family viewing.' },
      { code: 'GPL-C04', name: 'Dressing of Embalmed Body', price: '$100', desc: 'Dressing and personal preparation of embalmed remains.' },
      { code: 'GPL-C05', name: 'Additional Care of Deceased in Excess of 300 lbs', price: '$200', desc: 'Specialized care and equipment for bariatric remains.' },
      { code: 'GPL-D01', name: 'Use of Facilities & Staff for Viewing at Funeral Home', price: '$395', desc: 'Visitation and viewing services in our chapel.' },
      { code: 'GPL-D02', name: 'Use of Facilities & Staff for Funeral Ceremony at Funeral Home', price: '$395', desc: 'Funeral service direction and facility usage.' },
      { code: 'GPL-D03', name: 'Use of Facilities & Staff for Memorial Service at Funeral Home', price: '$395', desc: 'Memorial service direction and chapel facility usage.' },
      { code: 'GPL-D04', name: 'Use of Equipment & Staff for Graveside Casketed Service', price: '$395', desc: 'Graveside direction, staff, and equipment for casketed burial.' },
      { code: 'GPL-D05', name: 'Use of Equipment & Staff for Graveside Cremation Service', price: '$255', desc: 'Graveside direction, staff, and equipment for urn committal.' },
      { code: 'GPL-D06', name: 'Hearse / Funeral Coach', price: '$595', desc: 'Professional hearse transport to service or cemetery.' },
      { code: 'GPL-D07', name: 'Limousine', price: 'Market rate', desc: 'Chauffeured family transport at current market rates.' },
      { code: 'GPL-E01', name: 'Saturday, Sunday, Holidays or Evening Services (4-7 pm)', price: '$400', desc: 'Facility and staff fee for off-hours or holiday services.' },
      { code: 'GPL-E02', name: 'Cremation Fee at Crematory', price: '$440', desc: 'Official crematory processing fee.' },
      { code: 'GPL-E03', name: 'Aquamation Fee (Alkaline Hydrolysis)', price: '$600', desc: 'Eco-friendly water-based cremation process fee.' },
      { code: 'GPL-F01', name: 'Transfer of Remains to Funeral Home (within 30-mile radius)', price: '$495', desc: 'Initial removal response. Beyond 30-mile radius is $3 per mile.' },
      { code: 'GPL-F02', name: 'Transfer of Remains to Funeral Home Chapel or Other Location', price: '$495', desc: 'Transport of remains to chapel or specified service location.' },
      { code: 'GPL-F03', name: 'Transfer of Remains to Place of Service / Cemetery', price: '$495', desc: 'Local funeral transport to cemetery or service site.' },
      { code: 'GPL-F04', name: 'Transfer of Remains to Crematory', price: '$155', desc: 'Transportation of remains to crematory facility.' },
      { code: 'GPL-F05', name: 'Service Vehicle (Flowers, Equipment & Errands)', price: '$155', desc: 'Transport vehicle for floral arrangements and equipment.' },
      { code: 'GPL-F06', name: 'Transfer of Remains to/from Airport (MSP)', price: '$300', desc: 'Transport to or from Minneapolis/St. Paul International Airport.' },
      { code: 'GPL-G01', name: 'Forwarding of Remains to Other Funeral Homes', price: '$2,000', desc: 'Includes basic services, removal, embalming, and local transport. (International ship out embassy document fee: $2,200).' },
      { code: 'GPL-H01', name: 'Receiving of Remains from Another Funeral Home', price: '$1,695', desc: 'Includes basic services, care of remains, and transport to cemetery or crematory.' },
      { code: 'GPL-I01', name: 'Direct Cremation / Simple Cremation Range', price: '$2,605 – $6,070', desc: 'Direct cremation without ceremony. Includes basic staff, removal, crematory transport, permits, and cardboard container (A: Purchaser container $2,605 | B: Alternative container $2,805 | C: Funeral home container $2,605 + container cost).' },
      { code: 'GPL-J01', name: 'Immediate Burial Range', price: '$2,495 – $15,495', desc: 'Immediate burial without ceremony. Includes basic staff, removal, and cemetery transport (A: Purchaser casket $2,495 | B: Alternative container $2,695 | C: Funeral home casket $2,495 + casket cost).' },
      { code: 'GPL-K01', name: 'Medical Examiner Cremation Authorization', price: 'County dependent', desc: 'Official county medical examiner authorization fee.' },
      { code: 'GPL-K02', name: 'Air Tray for Shipping for Airlines', price: '$200', desc: 'Mandatory airline protective shipping tray for casketed remains.' },
      { code: 'GPL-PKG01', name: 'Traditional Funeral Package', price: '$5,410', desc: 'Itemized package: Basic services, removal/transfer (30-mi), preparation, embalming, cosmetics, dressing, casketing, 1-hr visitation, ceremony, vehicles, cemetery transfer, graveside service, and flower transport.' },
      { code: 'GPL-PKG02', name: 'Graveside Service Package', price: '$4,065', desc: 'Itemized package: Basic services, removal/transfer (30-mi), preparation, washing/disinfecting, dressing, casketing, cars/staff, cemetery transfer, and graveside service.' },
      { code: 'GPL-PKG03', name: 'Full Service Cremation Package', price: '$5,905', desc: 'Itemized package: Basic services, removal/transfer (30-mi), embalming, cosmetics, dressing, casketing, 1-hr visitation, ceremony, crematory transport, service vehicle, and crematory fee.' },
      { code: 'GPL-PKG04', name: 'Memorial Service / Visitation Cremation Package', price: '$3,715', desc: 'Itemized package: Basic services, removal/transfer (30-mi), memorial service, 1-hr visitation, crematory transport, and crematory fee.' },
      { code: 'GPL-PKG05', name: 'Direct and Simple Cremation Package', price: '$2,805', desc: 'Complete package: Removal (30-mi), securing authorization, death certificate filing, Social Security notification, crematory transport, crematory fee, and minimum cremation container.' },
      { code: 'GPL-RNG01', name: 'Caskets Range', price: '$1,665 – $13,000', desc: 'Complete selection range for all hardwood, bronze, and steel caskets.' },
      { code: 'GPL-RNG02', name: 'Cremation Containers Range', price: '$200 – $3,465', desc: 'Complete selection range for alternative and wood cremation containers.' },
      { code: 'GPL-RNG03', name: 'Outer Burial Containers (Vaults) Range', price: '$1,000 – $5,500', desc: 'Complete selection range for full-size burial vaults.' },
      { code: 'GPL-RNG04', name: 'Outer Burial Containers for Urns Range', price: '$295 – $890', desc: 'Complete selection range for urn vaults.' },
      { code: 'GPL-RNG05', name: 'Urns Range', price: '$250 – $2,295', desc: 'Complete selection range for memorial urns.' }
    ]
  },
  {
    id: 'caskets',
    title: 'Casket Price List',
    subtitle: 'Solid Mahogany, Bronze, Cherry, Walnut, Maple, Oak & Steel Caskets',
    effectiveDate: 'July 1, 2026',
    badge: 'Selection Range',
    description: 'Complete range of 32 caskets effective July 1, 2026. Features solid mahogany, 32 oz bronze, walnut, cherry, maple, oak, stainless steel, and 18/20 gauge steel.',
    ftcDisclaimer: 'Prices are subject to change without notice. These prices are effective as of July 1, 2026. A complete price list will be provided at the funeral establishment.',
    items: [
      { code: 'CSK-01', name: 'Parliament', price: '$13,000.00', desc: 'Material: Solid Mahogany | Interior: Sand Velvet' },
      { code: 'CSK-02', name: 'Harrison', price: '$12,000.00', desc: 'Material: 32 Ounce Bronze | Interior: Almond Velvet' },
      { code: 'CSK-03', name: 'Winfield', price: '$9,500.00', desc: 'Material: Solid Cherry | Interior: Almond Velvet' },
      { code: 'CSK-04', name: 'Diplomat', price: '$8,995.00', desc: 'Material: Solid Walnut | Interior: Almond Velvet' },
      { code: 'CSK-05', name: 'Manhattan', price: '$7,065.00', desc: 'Material: Solid Cherry | Interior: Almond Velvet' },
      { code: 'CSK-06', name: 'Centura', price: '$6,295.00', desc: 'Material: Stainless Steel | Interior: Blue Velvet' },
      { code: 'CSK-07', name: 'Michelangelo', price: '$5,995.00', desc: 'Material: Solid Maple | Interior: Almond Velvet' },
      { code: 'CSK-08', name: 'Andover', price: '$5,965.00', desc: 'Material: Solid Maple | Interior: Pink Velvet' },
      { code: 'CSK-09', name: 'Mansfield', price: '$5,465.00', desc: 'Material: Stainless Steel | Interior: White Velvet' },
      { code: 'CSK-10', name: 'Cameo Rose', price: '$4,865.00', desc: 'Material: 18 Gauge Steel | Interior: Pink Velvet' },
      { code: 'CSK-11', name: 'Stafford', price: '$4,865.00', desc: 'Material: 18 Gauge Steel | Interior: Arbutus Velvet' },
      { code: 'CSK-12', name: 'Ashland', price: '$4,765.00', desc: 'Material: Solid Ash | Interior: Rosetan Crepe' },
      { code: 'CSK-13', name: 'Puritan II', price: '$4,695.00', desc: 'Material: 18 Gauge Steel | Interior: Rosetan Crepe' },
      { code: 'CSK-14', name: 'Cameo', price: '$4,695.00', desc: 'Material: Solid Poplar | Interior: Pink Velvet' },
      { code: 'CSK-15', name: 'Oakland', price: '$4,695.00', desc: 'Material: Solid Oak | Interior: Rosetan Crepe' },
      { code: 'CSK-16', name: 'American Barnwood', price: '$4,395.00', desc: 'Material: Solid Oak | Interior: Natural Cotton' },
      { code: 'CSK-17', name: 'Provincial', price: '$4,365.00', desc: 'Material: Solid Poplar | Interior: Rosetan Crepe' },
      { code: 'CSK-18', name: 'Country Pine', price: '$4,265.00', desc: 'Material: Solid Pine | Interior: Champagne Weave' },
      { code: 'CSK-19', name: 'Hyacinth', price: '$3,995.00', desc: 'Material: 18 Gauge Steel | Interior: Pink Crepe' },
      { code: 'CSK-20', name: 'Hancock', price: '$3,995.00', desc: 'Material: 18 Gauge Steel | Interior: Silver Crepe' },
      { code: 'CSK-21', name: 'Harris', price: '$3,865.00', desc: 'Material: Solid Poplar | Interior: Bamboo Weave' },
      { code: 'CSK-22', name: 'Livingston', price: '$3,695.00', desc: 'Material: Oak Veneer | Interior: Rosetan Crepe' },
      { code: 'CSK-23', name: 'Sterling (Blue Crepe)', price: '$3,265.00', desc: 'Material: 18 Gauge Steel | Interior: Blue Crepe' },
      { code: 'CSK-24', name: 'Sterling (Pink Crepe)', price: '$3,165.00', desc: 'Material: 18 Gauge Steel | Interior: Pink Crepe' },
      { code: 'CSK-25', name: 'Sierra', price: '$2,995.00', desc: 'Material: 18 Gauge Steel | Interior: Rosetan Crepe' },
      { code: 'CSK-26', name: 'Whitmire II', price: '$2,995.00', desc: 'Material: Poplar Veneer | Interior: Rosetan Crepe' },
      { code: 'CSK-27', name: 'Jessup', price: '$2,895.00', desc: 'Material: 20 Gauge Steel | Interior: Rosetan Crepe' },
      { code: 'CSK-28', name: 'Camry', price: '$2,765.00', desc: 'Material: 18 Gauge Steel | Interior: Silver Crepe' },
      { code: 'CSK-29', name: 'Sandhurst II', price: '$2,765.00', desc: 'Material: Poplar Veneer | Interior: Rosetan Crepe' },
      { code: 'CSK-30', name: 'Portland', price: '$2,465.00', desc: 'Material: Poplar Veneer | Interior: Rosetan Crepe' },
      { code: 'CSK-31', name: 'Coleman', price: '$2,165.00', desc: 'Material: 20 Gauge Steel | Interior: Rosetan Crepe' },
      { code: 'CSK-32', name: 'Viceroy', price: '$1,665.00', desc: 'Material: 20 Gauge Steel | Interior: White Crepe' }
    ]
  },
  {
    id: 'vaults',
    title: 'Outer Burial Container (Vaults) Price List',
    subtitle: 'Full-Size Burial Vaults & Urn Vaults',
    effectiveDate: 'July 1, 2026',
    badge: 'Cemetery Required',
    description: 'Official Outer Burial Container Price List effective July 1, 2026. Features full-size concrete, asphalt, plastic, and bronze-lined vaults, as well as urn vaults.',
    ftcDisclaimer: 'Prices are subject to change without notice. Effective as of July 1, 2026. In most areas of Minnesota, state or local law does not require an outer burial container. However, cemeteries frequently require them to prevent ground collapse.',
    items: [
      { code: 'VLT-01', name: 'Grave box', price: '$1,000.00', desc: 'Full-size unlined concrete grave box meeting cemetery structural soil requirements.' },
      { code: 'VLT-02', name: 'Delphi', price: '$1,200.00', desc: 'Reinforced concrete burial vault.' },
      { code: 'VLT-03', name: 'Phoenix', price: '$1,595.00', desc: 'Heavy concrete burial vault with asphalt/plastic inner liner seal.' },
      { code: 'VLT-04', name: 'Athenian', price: '$2,200.00', desc: 'High-strength reinforced concrete burial vault with protective casing.' },
      { code: 'VLT-05', name: 'Patrician', price: '$2,300.00', desc: 'Heavy-duty plastic lined concrete burial vault with reinforced cover.' },
      { code: 'VLT-06', name: 'Titan', price: '$2,400.00', desc: 'Structural concrete burial vault with water-resistant inner liner.' },
      { code: 'VLT-07', name: 'Tiara', price: '$2,600.00', desc: 'Premium reinforced concrete burial vault with durable interior seal.' },
      { code: 'VLT-08', name: 'Lydian', price: '$2,895.00', desc: 'High-grade copper/plastic lined protective burial vault.' },
      { code: 'VLT-09', name: 'Bronze', price: '$5,500.00', desc: 'Solid bronze-lined concrete protective burial vault.' },
      { code: 'UVLT-01', name: 'Standard concrete vault (Urn)', price: '$295.00', desc: 'Standard concrete urn vault for ground committal.' },
      { code: 'UVLT-02', name: 'Titan UV', price: '$535.00', desc: 'Protective urn vault with sealed interior liner.' },
      { code: 'UVLT-03', name: 'Tiara UV', price: '$535.00', desc: 'Reinforced urn vault with durable outer finish.' },
      { code: 'UVLT-04', name: 'Patrician UV', price: '$670.00', desc: 'Heavy-duty plastic lined concrete urn vault.' },
      { code: 'UVLT-05', name: 'Athenian UV', price: '$805.00', desc: 'Premium inner liner protective urn vault.' },
      { code: 'UVLT-06', name: 'Lydian UV', price: '$825.00', desc: 'High-grade metal lined concrete urn vault.' },
      { code: 'UVLT-07', name: 'Bronze UV', price: '$890.00', desc: 'Solid bronze lined urn vault for maximum protection.' }
    ]
  },
  {
    id: 'cremation-containers',
    title: 'Cremation Container Price List',
    subtitle: 'Solid Poplar, Fiberwood Veneer & Alternative Containers',
    effectiveDate: 'July 1, 2026',
    badge: 'Cremation Specific',
    description: 'Official Cremation Container Price List effective July 1, 2026. Features solid poplar, fiberwood veneer, and cardboard alternative containers.',
    ftcDisclaimer: 'Prices are subject to change without notice. Effective as of July 1, 2026. Disclaimer of Warranties: Our company makes no representations or warranties regarding caskets, cremation containers or alternative containers. The only warranties expressed or implied are those extended by the manufacturers thereof.',
    items: [
      { code: 'CRM-01', name: 'Wilton', price: '$3,465.00', desc: 'Material: Solid Poplar | Interior: Rosetan Crepe' },
      { code: 'CRM-02', name: 'Clivedon', price: '$2,865.00', desc: 'Material: Solid Poplar | Interior: Rosetan Crepe' },
      { code: 'CRM-03', name: 'Classic', price: '$2,395.00', desc: 'Material: Fiberwood Veneer | Interior: Rosetan Crepe' },
      { code: 'CRM-04', name: 'Lexington', price: '$2,195.00', desc: 'Material: Fiberwood Veneer | Interior: Rosetan Crepe' },
      { code: 'CRM-05', name: 'Natural', price: '$1,865.00', desc: 'Material: Fiberwood Veneer | Interior: Ivory Crepe' },
      { code: 'CRM-06', name: 'Longley', price: '$1,665.00', desc: 'Material: Fiberwood Veneer | Interior: Blue Crepe' },
      { code: 'CRM-07', name: 'Alternative Container', price: '$200.00', desc: 'Material: Cardboard | Interior: None' },
      { code: 'CRM-08', name: 'Baden Alternative Container', price: '$395.00', desc: 'Material: Heavy Cardboard with Pillow | Interior: Rosetan Crepe' }
    ]
  },
  {
    id: 'urns',
    title: 'Urns Price List',
    subtitle: 'Serene, Veneer, Bandoo, Pewter, Rosewood & Companion Urns',
    effectiveDate: 'July 1, 2026',
    badge: 'Memorial Keepsakes',
    description: 'Official Urns Price List effective July 1, 2026. Features serene blue, natural veneer, Orleans blue, bandoo, pewter, Brazilian rosewood, and companion urns.',
    ftcDisclaimer: 'Prices are subject to change without notice. Effective as of July 1, 2026. A complete price list will be provided at the funeral establishment.',
    items: [
      { code: 'URN-01', name: 'Serene blue', price: '$250.00', desc: 'Serene blue finished urn for memorial placement or columbarium niche.' },
      { code: 'URN-02', name: 'Natural veneer', price: '$295.00', desc: 'Natural wood veneer urn with clean satin finish.' },
      { code: 'URN-03', name: 'Orleans blue', price: '$295.00', desc: 'Deep Orleans blue finished memorial urn.' },
      { code: 'URN-04', name: 'Bandoo', price: '$295.00', desc: 'Crafted natural bamboo wood memorial urn.' },
      { code: 'URN-05', name: 'Heathered burgundy', price: '$350.00', desc: 'Rich heathered burgundy urn finish.' },
      { code: 'URN-06', name: 'Midnight', price: '$450.00', desc: 'Polished midnight black memorial urn.' },
      { code: 'URN-07', name: 'Athens pewter blue', price: '$595.00', desc: 'Fine pewter urn with blue accented finish.' },
      { code: 'URN-08', name: 'Brazilian rosewood', price: '$595.00', desc: 'Exquisite solid Brazilian rosewood urn.' },
      { code: 'URN-09', name: 'Destiny', price: '$675.00', desc: 'Premium sculpted memorial urn.' },
      { code: 'URN-10', name: 'St. Joseph', price: '$725.00', desc: 'Hand-crafted St. Joseph spiritual memorial urn.' },
      { code: 'URN-11', name: 'Together companion', price: '$2,295.00', desc: 'Large companion urn designed for two loved ones.' }
    ]
  },
  {
    id: 'containers',
    title: 'Containers & Enclosures Price Schedule',
    subtitle: 'Comprehensive Pricing for Caskets, Urns, Burial Vaults & Cremation Containers',
    effectiveDate: 'July 1, 2026',
    badge: 'Full Enclosure Schedule',
    description: 'Consolidated price schedule covering all funeral containers offered by Middleton Funeral Services, including hardwood and metal caskets, outer burial vaults, memorial urns, and alternative cremation containers.',
    ftcDisclaimer: 'Prices are effective as of July 1, 2026 and subject to change without notice. In accordance with the FTC Funeral Rule, you may select any container without being required to purchase unrequested merchandise.',
    items: [
      { code: 'CSK-RANGE', name: 'Caskets Selection Range', price: '$1,665.00 – $13,000.00', desc: 'Solid Mahogany, Bronze, Cherry, Walnut, Maple, Oak, 18-Gauge Steel, 20-Gauge Steel.' },
      { code: 'URN-RANGE', name: 'Memorial Urns Range', price: '$250.00 – $2,295.00', desc: 'Cast metals, brass, hand-carved stone, fine hardwoods, ceramic, and eco-friendly bio urns.' },
      { code: 'VLT-RANGE', name: 'Outer Burial Containers (Vaults)', price: '$1,000.00 – $5,500.00', desc: 'Unlined grave boxes, asphalt/plastic-lined concrete vaults, and bronze-lined protective vaults.' },
      { code: 'UVLT-RANGE', name: 'Outer Burial Containers for Urns', price: '$295.00 – $890.00', desc: 'Standard concrete urn vaults to solid bronze-lined protective urn vaults.' },
      { code: 'CRM-RANGE', name: 'Cremation Containers Selection Range', price: '$200.00 – $3,465.00', desc: 'Heavy cardboard alternative containers to premium solid poplar ceremonial containers.' }
    ]
  }
];

export function getPriceListDoc(docId: string): PriceListDoc {
  return PRICE_LISTS.find(d => d.id === docId) || PRICE_LISTS[0];
}

export function generatePriceListDocText(doc: PriceListDoc): string {
  return `
===================================================================
MIDDLETON FUNERAL SERVICES
14850 Garret Ave, Apple Valley MN 55124 | Phone: 952 486 2871 || 952 486 0880
Email: inquiries@middletonfuneralservices.com | Website: www.middletonfuneralservices.com

${doc.title.toUpperCase()}
${doc.subtitle}
Effective Date: ${doc.effectiveDate}
===================================================================

FTC REGULATORY NOTICE:
${doc.ftcDisclaimer}

-------------------------------------------------------------------
ITEMIZED PRICE SCHEDULE
-------------------------------------------------------------------

${doc.items.map((item, idx) => `
[${idx + 1}] ${item.code} - ${item.name}
PRICE: ${item.price}
DETAILS: ${item.desc}
-------------------------------------------------------------------`).join('\n')}

SUMMARY:
Prices are subject to change without notice in accordance with Minnesota Mortuary Law.
Middleton Funeral Services owned and operated by Mwansa and Elsie Kamangala.
For questions or personalized consultations, call 952 486 2871 || 952 486 0880.
===================================================================
`;
}
