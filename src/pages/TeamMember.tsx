import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HEADER_FOOTER_LOGO } from '../constants/assets';
import { DRIVE_IMAGES } from '../utils/driveImages';

const teamData = {
  mwansa: {
    name: 'Mwansa Kamangala',
    title: 'Co-Founder of Middleton Funeral Services',
    subtitle: 'Funeral Director and Licensed Embalmer',
    degree: 'Bsc Mortuary Science',
    img: DRIVE_IMAGES.MWANSA_2,
    qualificationsImg: DRIVE_IMAGES.MWANSA_1,
    bio: [
      "Mwansa Kamangala is the co-founder of Middleton Funeral Services and is a licensed embalmer and funeral director in Minnesota. He earned his Bachelor of Science degree from the University of Minnesota’s Mortuary Science program, equipping him with the skills and knowledge to serve families with compassion and professionalism.",
      "Originally from Zambia, Mwansa moved to the United States with his family at a young age. His passion for funeral services began when he lost his aunt in his childhood. He vividly remembers helping plan her funeral and digging the grave, as it was a family responsibility in his culture. The experience was deeply impactful, especially after witnessing the poor preparation of his aunt’s body by the funeral home. That moment became his driving force to ensure families receive the highest level of care and respect during their time of loss.",
      "With nearly a decade of experience in the industry, Mwansa has assisted countless families, including those seeking to repatriate their loved ones for burial in different countries. He has worked with diverse cultural and religious communities throughout Minnesota, understanding the importance of honoring traditions and personal wishes.",
      "Mwansa believes that a funeral is a time to honor and remember loved ones. He states, “A funeral is a time to remember our loved ones. I believe it’s our job to be there for families, understanding their grief and emotions. They have entrusted us with their loved ones, and we must care for them with dignity, respect, and compassion”.",
      "Passionate about his profession, Mwansa finds fulfillment in helping families navigate their loss while respecting their customs and beliefs. In his free time, he enjoys spending quality time with his family and traveling with his wife Elsie to explore cultural mourning practices worldwide."
    ]
  },
  elsie: {
    name: 'Elsie Nyaboke Kamangala',
    title: 'Co-Founder of Middleton Funeral Services',
    subtitle: 'Data Analyst And Grief Counselor',
    degree: 'MSc Data Analytics\nCertified Grief Counselor',
    img: DRIVE_IMAGES.ELSIE_1,
    qualificationsImg: DRIVE_IMAGES.ELSIE_2,
    bio: [
      "Elsie Nyaboke Kamangala is one of the co-founders of Middleton Funeral Services. She is a dedicated Data Analyst and Grief Counselor with a unique blend of technical expertise and compassionate care in the funeral services industry. Elsie holds a master’s degree in data Analytics and is certified in Grief Counseling, allowing her to analyze trends in funeral services while also providing emotional guidance to those in mourning.",
      "Her analytical skills help funeral homes optimize logistics, improve client experiences, and ensure resources are allocated efficiently. Meanwhile, her role as a grief counselor enables her to support families with empathy, helping them navigate the emotional challenges of loss.",
      "Her journey into this unique profession was inspired by personal experiences with loss of a parent, which drove her passion for making funeral services both efficient and deeply meaningful. Elsie leverages data analytics to study trends in bereavement care, cultural funeral practices, and service personalization, ensuring that families receive the best possible support during their time of need.",
      "She believes that data and compassion go hand in hand, stating: “Funeral services are more than just ceremonies; they are a crucial part of the healing process. By using data to enhance service efficiency and providing emotional support, we can ensure families receive both practical assistance and heartfelt care.”",
      "With several years of experience in both fields, Elsie has worked with diverse communities, ensuring that different cultural and religious practices are respected. In her free time, Elsie enjoys volunteering with bereavement support groups and traveling with her husband Mwansa to explore cultural mourning practices worldwide."
    ]
  }
};

export default function TeamMember() {
  const { id } = useParams<{ id: string }>();
  const memberKey = id?.toLowerCase() as keyof typeof teamData;
  const member = teamData[memberKey];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterConsent && newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
        setNewsletterName('');
        setNewsletterConsent(false);
      }, 5000);
    }
  };

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4 text-gray-900">Member not found</h1>
          <Link to="/about" className="text-[#411548] underline">Return to About Us</Link>
        </div>
      </div>
    );
  }

  // Derive simple first name for header from the id
  const simpleName = id ? id.charAt(0).toUpperCase() + id.slice(1) : "";

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="container mx-auto px-4 lg:px-12 max-w-7xl pt-16 lg:pt-24">
        
        <h1 className="text-4xl lg:text-5xl font-serif text-black mb-12">{simpleName}</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Image & Plaque) */}
          <div className="w-full lg:w-1/3 flex flex-col items-center gap-8">
            <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden mb-4 border-4 border-gray-100 shadow-md bg-[#fcf8fc]">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Qualification Card replacing image */}
            <div className="w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-purple-100 bg-white p-6 relative">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#411548] font-bold">
                  ★
                </div>
                <div>
                  <h3 className="font-serif font-black text-base text-[#411548] uppercase tracking-tight">{member.name}</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{member.title}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#411548] block mb-1">Education & Certifications</span>
                  <p className="text-xs font-bold text-gray-900 whitespace-pre-line">{member.degree}</p>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1">Specialization</span>
                  <p className="text-xs font-medium text-gray-700">
                    {memberKey === 'mwansa' 
                      ? 'Minnesota Licensed Mortician, Embalmer & Repatriation Director' 
                      : 'Data Analytics in Funeral Care & Certified Grief Counseling'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full max-w-sm gap-3 mt-2">
              <Link 
                to="/book-appointment" 
                className="flex-1 bg-white border-2 border-[#411548] text-[#411548] hover:bg-[#411548] hover:text-white text-center py-3.5 px-4 rounded-full font-black text-xs tracking-widest uppercase transition-all shadow-md hover:scale-105"
              >
                Consultation
              </Link>
              <Link 
                to="/book-appointment" 
                className="flex-1 bg-[#411548] text-white text-center py-3.5 px-4 rounded-full font-black text-xs tracking-widest uppercase hover:bg-black transition-all shadow-md hover:scale-105"
              >
                Appointment
              </Link>
            </div>
          </div>

          {/* Right Column (Bio) */}
          <div className="w-full lg:w-2/3">
            <div className="prose prose-lg max-w-none text-black">
               {member.bio.map((paragraph, idx) => (
                 <p key={idx} className="leading-loose mb-6 font-light text-[17px]">
                   {paragraph.split(/(Middleton Funeral Services|Data Analyst and Grief Counselor|Data Analyst|Grief Counselor)/i).map((part, i) => {
                     if (part.toLowerCase() === 'middleton funeral services' || 
                         part.toLowerCase() === 'data analyst and grief counselor' ||
                         part.toLowerCase() === 'data analyst' ||
                         part.toLowerCase() === 'grief counselor') {
                       return <strong key={i} className="font-semibold text-gray-900">{part}</strong>;
                     }
                     return part;
                   })}
                 </p>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-[#411548] text-center border-t border-[#f4e6f4]/20 relative overflow-hidden">
         <div 
           className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-cover bg-center"
           style={{ backgroundImage: `url(${HEADER_FOOTER_LOGO})` }}
         ></div>
         <div className="container mx-auto px-4 max-w-4xl relative z-10">
           <span className="text-white font-bold text-sm tracking-[0.3em] uppercase mb-6 block">We stand by you in your most difficult moments.</span>
           <h2 className="font-serif text-4xl md:text-5xl text-white mb-8">
             <span className="opacity-90 font-script font-medium text-6xl">Comfort</span> in Loss, <span className="opacity-90 font-script font-medium text-6xl">Support</span> in Sorrow.
           </h2>
           <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed font-light mb-10">
             We understand how overwhelming this time can be, so we take every measure to relieve your stress. Our team handles all the details efficiently and with care, allowing you to focus on what matters most, <span className="italic">honoring your loved one</span>. We are here to support you every step of the way, with kindness, professionalism, and a deep understanding of your needs.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link 
               to="/services" 
               className="inline-flex items-center justify-center bg-white text-[#411548] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl hover:scale-105"
             >
               Our Services
             </Link>
             <Link 
               to="/about" 
               className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#411548] transition-all shadow-xl hover:scale-105"
             >
               How We Work
             </Link>
           </div>
         </div>
      </section>

      {/* STRATEGIC WHITE SEPARATOR BAND BETWEEN CTA RIBBON & NEWSLETTER */}
      <div className="py-12 bg-white"></div>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#411548] text-center border-t border-white/10 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 uppercase font-black tracking-tight">Join Our Newsletter</h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 font-light">
            Grief does not end with the service, and neither does our support. Subscribe to our newsletter for access to grief counselling, support groups, aftercare resources, online resources, and updates on our services, ensuring that you have professional emotional support whenever you need it. Let us help you and your family navigate loss and heal beyond the ceremony.
          </p>
          <div className="mb-10">
            <Link to="/join-support-group" className="inline-flex items-center gap-3 bg-white text-[#411548] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
              Join A Support Group Circle
            </Link>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-white/10 border border-white/20 rounded-3xl p-6 max-w-lg mx-auto text-white">
              <p className="font-bold text-lg">Thank you for subscribing!</p>
              <p className="text-sm font-light text-white/80 mt-1">You will receive our care journal, grief support literature, and service updates.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-3xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="bg-white/10 border border-white/30 text-white px-6 py-4 rounded-full focus:outline-none focus:bg-white/20 focus:border-white w-full sm:w-1/3 placeholder-white/60 text-sm" 
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/30 text-white px-6 py-4 rounded-full focus:outline-none focus:bg-white/20 focus:border-white w-full sm:w-1/3 placeholder-white/60 text-sm" 
                  required 
                />
                <button 
                  type="submit" 
                  disabled={!newsletterConsent}
                  className={`px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all sm:w-auto shadow-lg cursor-pointer ${
                    newsletterConsent 
                      ? 'bg-white text-[#411548] hover:bg-black hover:text-white' 
                      : 'bg-white/30 text-white/50 cursor-not-allowed'
                  }`}
                >
                  Subscribe
                </button>
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="bio-newsletter-consent"
                  checked={newsletterConsent}
                  onChange={(e) => setNewsletterConsent(e.target.checked)}
                  required
                  className="w-4 h-4 rounded accent-[#411548] cursor-pointer shrink-0"
                />
                <label htmlFor="bio-newsletter-consent" className="text-white/80 text-xs font-light text-left cursor-pointer select-none">
                  I consent to receive newsletter updates, grief counselling resources, and aftercare literature in accordance with the Privacy Policy.
                </label>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
