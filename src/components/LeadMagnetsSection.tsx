import React from 'react';
import { Link } from 'react-router-dom';
import { Download, MessageCircle, Calendar } from 'lucide-react';
import CustomIcon from './CustomIcon';
import { useModals } from '../context/ModalContext';

interface LeadMagnet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  filename: string;
  content: string;
}

export default function LeadMagnetsSection() {
  const { openDownloadModal } = useModals();

  const magnets: LeadMagnet[] = [
    {
      id: 'checklist',
      title: 'Funeral Planning Checklist',
      subtitle: 'Complete Step-by-Step Organizer',
      description: 'An essential 25-point roadmap covering immediate steps, legal documents, ceremony choices, and key family notifications.',
      badge: 'Most Popular',
      filename: 'middleton-funeral-planning-checklist.txt',
      content: `MIDDLETON FUNERAL SERVICES - OFFICIAL FUNERAL PLANNING CHECKLIST\n\n1. IMMEDIATE STEPS AFTER A LOSS\n- Contact licensed funeral home (24/7 Dispatch: 952 486-2871)\n- Request official death certificate copies (minimum 5-10)\n- Notify immediate family and key contacts\n\n2. CEREMONY & SERVICE CHOICES\n- Select traditional burial, direct cremation, or memorial service\n- Choose casket, vault, or memorial urn\n- Select officiant, readings, eulogists, and musical selections\n\n3. LEGAL & FINANCIAL DOCUMENTATION\n- Locate birth certificate, marriage license, and military discharge (DD-214)\n- Locate existing life insurance policies and estate documents\n- Notify social security administration and financial institutions\n\n4. MEMORIAL DETAILS\n- Draft obituary and memorial announcements\n- Select sympathy flowers, guestbook, and memorial stationery\n- Arrange repast / reception venue and catering`
    },
    {
      id: 'spiritual',
      title: 'Spiritual Care & Memory Guide',
      subtitle: 'Clergy & Inter-Faith Traditions',
      description: 'A practical resource on inter-faith funeral protocols, spiritual care coordination, prayer selections, and memorial readings.',
      badge: 'Spiritual Care',
      filename: 'middleton-spiritual-care-memory-guide.txt',
      content: `MIDDLETON FUNERAL SERVICES - SPIRITUAL CARE & MEMORY GUIDE\n\nINTER-FAITH & CLERGY COORDINATION:\n- Collaborating with local Minnesota pastors, priests, rabbis, imams, and spiritual directors\n- Customizing prayer services, vigil hours, and committal rituals\n- Selecting meaningful scriptural readings, poetry, and memorial music\n\n24/7 SPIRITUAL CARE ASSISTANCE:\nContact our care coordinators at 952 486-2871 for immediate clergy liaison.`
    },
    {
      id: 'preplanning',
      title: 'Preplanning Guide',
      subtitle: 'Advance Care & Peace of Mind Roadmap',
      description: 'Learn how advance arrangements lock in transparent rates, spare loved ones emotional stress, and protect your legacy.',
      badge: 'Essential',
      filename: 'middleton-preplanning-guide.txt',
      content: `MIDDLETON FUNERAL SERVICES - PREPLANNING & ADVANCE CARE GUIDE\n\nWHY PREPLAN?\n- Protect your family from making stressful emotional decisions during grief\n- Lock in today's transparent prices and protect against future inflation\n- Ensure your exact personal, cultural, and spiritual wishes are honored\n\nSTEP-BY-STEP PREPLANNING PROCESS:\n1. Record your personal preferences (Burial vs. Cremation, Venue, Music)\n2. Choose your merchandise (Casket, Urn, Headstone, Keepsakes)\n3. Set up pre-funding options or trust accounts if desired\n4. Share your completed guide with your family and funeral director`
    },
    {
      id: 'bereavement',
      title: 'Bereavement Resources',
      subtitle: 'Navigating Loss & Grief Management',
      description: 'Comprehensive guide to understanding emotional responses, family coping strategies, and professional support networks in Minnesota.',
      badge: 'Support',
      filename: 'middleton-bereavement-resources.txt',
      content: `MIDDLETON FUNERAL SERVICES - BEREAVEMENT CARE & RESOURCES\n\nUNDERSTANDING GRIEVE:\nGrief is a personal and non-linear process. You may experience shock, sadness, anger, and fatigue. Allow yourself time and space without self-judgment.\n\nCOMMUNITY SUPPORT RESOURCES:\n- 24/7 Minnesota Grief Support Helpline: 952 486-2871\n- Twin Cities Bereavement Counseling & Support Groups\n- Youth & Family Grief Support Services\n- Annual Memorial Remembrance Ceremonies`
    },
    {
      id: 'wellness',
      title: 'Wellness Resources',
      subtitle: 'Holistic Self-Care During Mourning',
      description: 'Practical self-care protocols, sleep hygiene, nutrition tips, and mindfulness exercises for individuals working through deep grief.',
      badge: 'Wellness',
      filename: 'middleton-wellness-resources.txt',
      content: `MIDDLETON FUNERAL SERVICES - MOURNING & WELLNESS GUIDE\n\nDAILY SELF-CARE PROTOCOLS DURING MOURNING:\n1. Physical Health: Prioritize hydration, gentle walking, and nutrient-dense foods.\n2. Sleep Hygiene: Rest even if sleep is elusive. Limit screen time before bed.\n3. Mindful Breathing: Practice 4-7-8 breathing during moments of anxiety.\n4. Emotional Boundaries: It is okay to step away from social obligations when feeling overwhelmed.`
    },
    {
      id: 'library',
      title: 'Grief Resource Library',
      subtitle: 'Recommended Reading & Digital Tools',
      description: 'A curated directory of books, podcasts, therapy platforms, and downloadable workbooks for adults, children, and families.',
      badge: 'Comprehensive',
      filename: 'middleton-grief-resource-library.txt',
      content: `MIDDLETON FUNERAL SERVICES - CURATED GRIEF RESOURCE LIBRARY\n\nRECOMMENDED READINGS:\n- "The Year of Magical Thinking" by Joan Didion\n- "It's OK That You're Not OK" by Megan Devine\n- "Bearing the Unbearable" by Dr. Joanne Cacciatore\n\nDIGITAL PODCASTS & PLATFORMS:\n- Terrible, Thanks for Asking Podcast\n- What's Your Grief Online Community\n- National Alliance for Children's Grief (NACG)`
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#411548]/10 text-[#411548] px-5 py-2.5 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-4 shadow-sm">
            <CustomIcon size={16} /> Free Educational Downloads
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-black text-[#411548] uppercase tracking-tight mb-4">
            Free <span className="text-black">Planning & Grief Guides</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-light max-w-2xl mx-auto">
            Download our expert guides, checklists, and bereavement resources instantly to assist you and your family.
          </p>
        </div>

        {/* Lead Magnet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magnets.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[2.5rem] p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <CustomIcon size={24} variant="hover-white" className="text-[#411548]" />
                </div>
                <h3 className="text-2xl font-serif font-black text-[#411548] uppercase mb-2">{item.title}</h3>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-4">{item.subtitle}</span>
                <p className="text-xs text-gray-600 font-light leading-relaxed mb-8">{item.description}</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openDownloadModal({
                    title: item.title,
                    filename: item.filename,
                    contentGenerator: () => item.content
                  })}
                  className="w-full bg-[#411548] text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  Download Guide <Download size={14} />
                </button>

                <a
                  href={`https://wa.me/19524862871?text=${encodeURIComponent(`Hello Middleton Funeral Services, I have a question regarding the ${item.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  WhatsApp Us Directly <MessageCircle size={14} />
                </a>

                <Link
                  to={`/book-appointment?service=${encodeURIComponent(item.title)}`}
                  className="w-full bg-gray-100 text-[#411548] py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-purple-100 transition-all flex items-center justify-center gap-2 cursor-pointer text-center block"
                >
                  Schedule Consultation <Calendar size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
