import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, PhoneCall, Calendar } from 'lucide-react';
import CustomIcon from '../components/CustomIcon';

export default function BurialComparison() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const comparisonData = [
    {
      id: 'traditional',
      name: 'Traditional Vault Burial',
      price: '$4,250 - $7,800',
      ecoRating: 'Standard',
      cemeteryReq: 'Vault / Outer Burial Container Required',
      personalization: 'High (Casket, Vault, Headstone, Graveside Ceremony)',
      perpetualCare: 'Included in Cemetery Endowment Fund',
      highlights: [
        'Full traditional visitation and viewing prior to burial',
        'Casket placed inside reinforced concrete outer vault',
        'Permanent granite monument or lawn marker engraved',
        'Standard choice for traditional family plots'
      ],
      idealFor: 'Families desiring a traditional ceremony with physical casket viewing and permanent grave marker.'
    },
    {
      id: 'green',
      name: 'Natural Green Eco-Burial',
      price: '$2,850 - $4,900',
      ecoRating: 'Highest (Carbon Neutral)',
      cemeteryReq: 'Biodegradable Casket / Shroud (No Concrete Vault)',
      personalization: 'High (Organic Tributes, Native Plant Markers)',
      perpetualCare: 'Natural Conservation Land Management',
      highlights: [
        'Zero toxic embalming fluids or formaldehyde',
        'Un-vaulted burial in certified conservation grounds',
        'Biodegradable wicker, pine, or linen shroud options',
        'Preserves natural flora, fauna, and local ecology'
      ],
      idealFor: 'Environmentally conscious individuals seeking a natural return to the earth in a conservation cemetery.'
    },
    {
      id: 'mausoleum',
      name: 'Mausoleum Entombment',
      price: '$5,500 - $12,000+',
      ecoRating: 'Moderate',
      cemeteryReq: 'Clean Above-Ground Crypt Seal',
      personalization: 'Very High (Private Family Crypt or Community Wall)',
      perpetualCare: 'Indoor Climate-Controlled Building Maintenance',
      highlights: [
        'Above-ground entombment in granite crypt structure',
        'Protected from weather and soil moisture year-round',
        'Clean, elegant indoor or outdoor courtyard setting',
        'Inscribed bronze plaque or marble memorial face'
      ],
      idealFor: 'Families preferring above-ground rest, climate-controlled visitation, and grand permanent structures.'
    },
    {
      id: 'columbarium',
      name: 'Columbarium Niche Burial',
      price: '$1,850 - $3,600',
      ecoRating: 'High',
      cemeteryReq: 'Permanent Urn Niche Seal',
      personalization: 'High (Custom Urn & Engraved Glass/Granite Face)',
      perpetualCare: 'Columbarium Wall & Garden Upkeep',
      highlights: [
        'Permanent resting place for cremated remains',
        'Glass-front or granite-front wall niche in memorial garden',
        'Significantly smaller physical footprint',
        'Allows placement of personal mementos inside glass niches'
      ],
      idealFor: 'Families choosing cremation who desire a dignified, permanent physical memorial site to visit.'
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#411548] text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-full text-xs font-bold tracking-[0.25em] uppercase mb-8 border border-white/20 backdrop-blur-md">
            Side-by-Side Analysis
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tight mb-6 text-white">
            Burial Options <span className="text-white">& Cost Comparison</span>
          </h1>
          <p className="text-white/80 font-light text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Compare costs, environmental impact, cemetery requirements, and ceremony personalization across traditional, green, mausoleum, and columbarium rest options to find the right choice for your family.
          </p>
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#411548] block mb-3">
              CLEAR & UNBUNDLED COMPARISON
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-[#411548] uppercase tracking-tight">
              Methods of Rest Overview
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comparisonData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                className={`bg-white rounded-[2.5rem] p-8 border shadow-lg flex flex-col justify-between transition-all relative ${
                  selectedMethod === item.id ? 'border-[#411548] ring-2 ring-[#411548]/20' : 'border-gray-100'
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#411548]/60 block mb-2">
                    Option {item.id === 'traditional' ? '01' : item.id === 'green' ? '02' : item.id === 'mausoleum' ? '03' : '04'}
                  </span>
                  <h3 className="text-xl font-serif font-black text-[#411548] uppercase tracking-tight mb-4">
                    {item.name}
                  </h3>

                  <div className="bg-purple-50/70 p-4 rounded-2xl mb-6 border border-purple-100">
                    <span className="text-[10px] uppercase tracking-widest text-[#411548]/70 block font-bold">Est. Price Range</span>
                    <span className="text-xl font-serif font-black text-[#411548]">{item.price}</span>
                  </div>

                  <div className="space-y-4 mb-6 text-xs text-gray-700">
                    <div>
                      <span className="font-bold text-gray-900 block uppercase tracking-wider text-[10px]">Eco Rating</span>
                      <span className="text-gray-600 font-light">{item.ecoRating}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block uppercase tracking-wider text-[10px]">Cemetery Vault Requirement</span>
                      <span className="text-gray-600 font-light">{item.cemeteryReq}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block uppercase tracking-wider text-[10px]">Perpetual Care</span>
                      <span className="text-gray-600 font-light">{item.perpetualCare}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <span className="font-bold text-[#411548] text-xs uppercase tracking-wider block mb-3">Key Highlights</span>
                    <ul className="space-y-2 text-xs text-gray-600 font-light">
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-[#411548] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] italic text-gray-500 font-light bg-gray-50 p-4 rounded-xl mb-6">
                    "{item.idealFor}"
                  </p>
                  <Link
                    to={`/book-appointment?step=2&service=${encodeURIComponent(item.name)}`}
                    className="w-full bg-[#411548] text-white hover:bg-[#310f36] py-3.5 px-6 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 hover:scale-102"
                  >
                    Select & Discuss <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Guidance Banner */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#411548] text-white rounded-[3rem] p-12 text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase mb-6 text-white">
              <span className="text-white">Need Guidance</span> Choosing the Right Path?
            </h2>
            <p className="text-white/80 font-light text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Our licensed funeral directors are available 24/7 to walk you through cemetery requirements, plot availability, custom headstone options, and itemized costs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/book-appointment"
                className="bg-white text-[#411548] px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl flex items-center gap-3"
              >
                Schedule Private Consultation <Calendar size={16} />
              </Link>
              <Link
                to="/prices"
                className="bg-white/10 text-white border border-white/20 px-8 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-md"
              >
                View General Price List
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
