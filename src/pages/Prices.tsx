import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileText, Download, Eye, X, Printer, CheckCircle, Search, 
  Shield, ArrowDownToLine, Lock, KeyRound, Phone, Mail, User, CheckCircle2,
  Calendar, PhoneCall, HeartHandshake, ArrowRight, Image as ImageIcon
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { useModals } from '../context/ModalContext';
import { downloadCasketImage } from '../utils/downloadHelpers';
import FormProgressBar from '../components/FormProgressBar';

interface PriceItem {
  code: string;
  name: string;
  price: string;
  desc: string;
}

interface PriceListDoc {
  id: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  badge: string;
  description: string;
  items: PriceItem[];
  ftcDisclaimer: string;
}

export default function Prices() {
  const { openDownloadModal, openCallbackModal } = useModals();
  const [selectedDocId, setSelectedDocId] = useState<string>('gpl');
  const [viewingModalDoc, setViewingModalDoc] = useState<PriceListDoc | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const priceLists: PriceListDoc[] = [
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
        { code: 'CRM-07', name: 'Alternative Container', price: '$200.00', desc: 'Material: Cardboard | Interior: None' }
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
    }
  ];

  const activeDoc = priceLists.find(doc => doc.id === selectedDocId) || priceLists[0];

  const generateDocText = (doc: PriceListDoc) => {
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
  };

  const triggerFileDownload = (doc: PriceListDoc) => {
    const textContent = `
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

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.id}-middleton-funeral-services.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadClick = (doc: PriceListDoc) => {
    openDownloadModal({
      title: doc.title,
      filename: `${doc.id}-middleton-funeral-services.txt`,
      contentGenerator: () => generateDocText(doc)
    });
  };

  const filteredItems = activeDoc.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
              <CustomIcon size={12} variant="white" /> FTC Compliant Pricing
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
              Pricing & Itemized Costs
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Middleton Funeral Services provides complete price transparency. View online or download any of our official price lists below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-7xl py-20">

        {/* SECTION 1: DOWNLOADABLE CARDS FOR ALL 5 PRICE LISTS */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#411548]">Official Funeral Price Schedules</span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-[#411548] uppercase mt-2">Download Official Price Lists</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-3 font-light">
              Click <strong className="text-[#411548] font-bold">"View List"</strong> to preview complete line-items, or <strong className="text-[#411548] font-bold">"Download"</strong> to save a verified copy directly to your device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {priceLists.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -6 }}
                className={`bg-white rounded-[2.5rem] p-8 border transition-all flex flex-col justify-between ${
                  selectedDocId === doc.id
                    ? 'border-[#411548] shadow-2xl ring-2 ring-[#411548]/10'
                    : 'border-gray-200 shadow-md hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#411548] flex items-center justify-center font-bold">
                      <FileText size={28} />
                    </div>
                    <span className="bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {doc.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-black text-[#411548] uppercase mb-2 leading-tight">
                    {doc.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Effective: {doc.effectiveDate}
                  </p>
                  <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setViewingModalDoc(doc);
                    }}
                    className="flex-1 bg-gray-100 hover:bg-[#411548] hover:text-white text-[#411548] text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> View List
                  </button>
                  <button
                    onClick={() => openDownloadModal({
                      title: doc.title,
                      filename: `${doc.id}-middleton-funeral-services.txt`,
                      contentGenerator: () => generateDocText(doc)
                    })}
                    className="flex-1 bg-[#411548] text-white hover:bg-black text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download size={16} /> Download
                  </button>
                </div>
              </motion.div>
            ))}

            {/* IMPACTFUL CTA CARD BESIDE URNS PRICE LIST CARD */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#411548] text-white rounded-[2.5rem] p-8 transition-all flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10 group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold border border-white/20">
                    <HeartHandshake size={28} />
                  </div>
                  <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                    Personalized Quotes
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-black uppercase mb-3 leading-tight text-white">
                  Need a Custom Memorial Package?
                </h3>
                <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
                  24/7 Director Consultations Available
                </p>
                <p className="text-white/80 text-sm font-light leading-relaxed mb-6">
                  Get a complete, customized price estimate for your family's exact burial, cremation, or urn memorial needs with zero pressure.
                </p>
              </div>

              <div className="pt-6 border-t border-white/15 flex flex-col gap-3">
                <Link
                  to="/book-appointment"
                  className="w-full bg-white text-[#411548] hover:bg-gray-100 text-xs font-black uppercase tracking-widest py-4 px-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <Calendar size={16} /> Schedule Appointment
                </Link>
                <button
                  onClick={() => openCallbackModal('Custom Pricing & Package Quote')}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold uppercase tracking-wider py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} /> Request Call Back
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: INTERACTIVE ON-PAGE DOCUMENT EXPLORER */}
        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-14 border border-gray-200 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-gray-200">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#411548] block mb-2">Interactive Document Browser</span>
              <h3 className="text-3xl font-serif font-black text-[#411548] uppercase">{activeDoc.title}</h3>
              <p className="text-gray-500 text-sm font-light mt-1">{activeDoc.subtitle} — Effective {activeDoc.effectiveDate}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleDownloadClick(activeDoc)}
                className="bg-[#411548] text-white px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <ArrowDownToLine size={16} /> Download {activeDoc.title}
              </button>
              <button
                onClick={() => window.print()}
                className="bg-white border border-gray-300 text-gray-700 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                <Printer size={16} /> Print Document
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-3 pb-6 mb-8 no-scrollbar">
            {priceLists.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                  selectedDocId === doc.id
                    ? 'bg-[#411548] text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <FileText size={15} /> {doc.title.split(' Price List')[0]}
              </button>
            ))}
          </div>

          {/* FTC Disclosure banner */}
          <div className="bg-purple-100/70 border border-purple-200 rounded-2xl p-5 mb-8 text-xs text-[#411548] flex items-start gap-3 leading-relaxed">
            <Shield size={20} className="shrink-0 mt-0.5 text-[#411548]" />
            <div>
              <strong className="font-bold block uppercase tracking-wider mb-1">FTC Disclosure Notice:</strong>
              {activeDoc.ftcDisclaimer}
            </div>
          </div>

          {/* Search items inside active document */}
          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search items in ${activeDoc.title}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-6 py-4 text-sm outline-none focus:border-[#411548] transition-all"
            />
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <div key={idx} className="p-6 md:p-8 hover:bg-purple-50/40 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
                          {item.code}
                        </span>
                        <h4 className="font-bold text-[#411548] text-lg">{item.name}</h4>
                      </div>
                      <p className="text-gray-500 text-sm font-light leading-relaxed pl-0">{item.desc}</p>
                    </div>

                    <div className="shrink-0 bg-purple-50 px-5 py-3 rounded-xl border border-purple-100 text-right">
                      <span className="text-xs uppercase tracking-widest text-gray-400 block">Fee / Price</span>
                      <span className="text-xl font-serif font-black text-[#411548]">{item.price}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-gray-400 font-light">
                  No items matched your search "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Standard Pre-Footer Section */}
      <section className="bg-[#411548] py-16 text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black uppercase mb-3 text-white tracking-tight">
            Have Questions About Pricing & Estimates?
          </h2>
          <p className="text-white/80 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Our licensed funeral directors can provide a detailed itemized estimate tailored to your family's exact preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-[#411548] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg">
              Contact A Director
            </Link>
            <Link to="/book-appointment" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-lg">
              Request Full Quote
            </Link>
          </div>
        </div>
      </section>

      {/* DOCUMENT PREVIEW MODAL */}
      <AnimatePresence>
        {viewingModalDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100"
            >
              <div className="bg-[#411548] text-white p-6 md:p-8 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 block mb-1">Official Document Preview</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black uppercase">{viewingModalDoc.title}</h3>
                  <p className="text-xs text-white/70 font-light mt-1">Middleton Funeral Services &bull; Effective {viewingModalDoc.effectiveDate}</p>
                </div>
                <button
                  onClick={() => setViewingModalDoc(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-600 leading-relaxed font-light">
                  <strong className="font-bold text-[#411548] block mb-1">FTC Notice:</strong>
                  {viewingModalDoc.ftcDisclaimer}
                </div>

                <div className="space-y-4">
                  {viewingModalDoc.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-white flex justify-between items-start gap-4 hover:border-purple-200 transition-colors">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-mono font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {item.code}
                          </span>
                          <span className="font-bold text-gray-900 text-base">{item.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-light">{item.desc}</p>
                      </div>
                      <span className="font-serif font-black text-[#411548] text-lg whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => setViewingModalDoc(null)}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadClick(viewingModalDoc)}
                  className="bg-[#411548] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center gap-2 shadow-md"
                >
                  <Download size={16} /> Download {viewingModalDoc.title}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
