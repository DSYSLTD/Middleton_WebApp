import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Calendar, MapPin, ArrowRight, ArrowLeft, Clock, Building, Compass } from 'lucide-react';
import TikTokIcon from '../components/TikTokIcon';
import CustomIcon from '../components/CustomIcon';
import { ObituaryDetailSkeleton } from '../components/Skeleton';
import { useAuth } from '../context/AuthContext';
import { OBITUARIES_DATA } from '../data/obituariesData';

export default function ObituaryDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const obituary = useMemo(() => {
    const found = OBITUARIES_DATA.find(item => item.id === id || String(item.id) === String(id));
    if (found) return found;
    if (id === '1') return OBITUARIES_DATA[0];
    if (id === '2') return OBITUARIES_DATA[1];
    if (id === '3') return OBITUARIES_DATA[2];
    return OBITUARIES_DATA[0];
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [id]);

  const [activeTab, setActiveTab] = useState('obituary');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [condolenceName, setCondolenceName] = useState('');
  const [condolenceMessage, setCondolenceMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedPhotos(prev => [...prev, imageUrl]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const [condolences, setCondolences] = useState(() => obituary.condolences || []);

  useEffect(() => {
    if (obituary?.condolences) {
      setCondolences(obituary.condolences);
    }
  }, [obituary]);

  const sortedCondolences = useMemo(() => {
    return [...condolences].sort((a, b) => b.timestamp - a.timestamp);
  }, [condolences]);

  const isFormValid = condolenceName.trim().length >= 2 && condolenceMessage.trim().length >= 5;

  const handleCondolenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setCondolences(prev => [
      {
        name: condolenceName.trim(),
        message: condolenceMessage.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        timestamp: Date.now()
      },
      ...prev
    ]);

    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setCondolenceName('');
      setCondolenceMessage('');
    }, 2500);
  };



  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {isLoading ? (
        <div className="pt-24">
          <ObituaryDetailSkeleton />
        </div>
      ) : (
        <>
          {/* Top Banner */}
      <div className="bg-[#411548] pt-12 pb-24 relative overflow-hidden print:hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-10 flex items-end justify-center pointer-events-none">
           <svg width="100%" height="150" viewBox="0 0 1000 150" preserveAspectRatio="none" fill="currentColor" className="text-white">
             <path d="M0,150 C100,50 300,50 500,150 C700,50 900,50 1000,150 L1000,150 L0,150 Z" />
             <path d="M-100,150 C50,100 200,100 400,150 C600,100 850,100 1100,150 L1100,150 L-100,150 Z" opacity="0.5"/>
           </svg>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="mb-6">
            <Link to="/obituaries" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border border-white/20 shadow-sm">
              <ArrowLeft size={14} /> Back to Obituaries
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-lg">
              <img src={obituary.img} alt={obituary.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-white text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-script font-medium mb-1 drop-shadow-md text-white">{obituary.name}</h1>
              <p className="text-white/90 mb-6 font-medium tracking-wide text-base">
                {obituary.years || obituary.dates}
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link to={`/flowers?deceased=${encodeURIComponent(obituary.name)}&address=${encodeURIComponent(obituary.service.address)}`} className="bg-black hover:bg-[#411548] text-white px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                   <CustomIcon size={16} variant="white"/> Send Flowers
                </Link>
                <Link to={`/shop?deceased=${encodeURIComponent(obituary.name)}&address=${encodeURIComponent(obituary.service.address)}`} className="bg-white text-[#411548] px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-gray-100 transition-colors">
                   <CustomIcon size={16}/> Shop Gifts
                </Link>
                <button onClick={handlePrint} className="bg-transparent hover:bg-white/10 border border-white/60 text-white px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors">
                   <CustomIcon size={16} variant="white"/> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar Container */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 print:hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex flex-wrap gap-6 font-bold text-sm">
              <button 
                onClick={() => setActiveTab('obituary')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'obituary' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Obituary
              </button>
              <button 
                onClick={() => setActiveTab('funeral')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'funeral' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Funeral details
              </button>
              <button 
                onClick={() => setActiveTab('condolences')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'condolences' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Condolences
              </button>
              <button 
                onClick={() => setActiveTab('photos')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'photos' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Photographs
              </button>
              <button 
                onClick={() => setActiveTab('flowers')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'flowers' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Send flowers
              </button>
              <button 
                onClick={() => setActiveTab('shop')}
                className={`pb-2 border-b-2 transition-colors ${activeTab === 'shop' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent hover:text-gray-900'}`}
              >
                Shop gifts
              </button>
           </div>
           <div className="flex items-center gap-3 text-gray-500 text-sm">
              <span className="font-medium mr-1">Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
              >
                <Facebook size={14}/>
              </a>
              <a
                href={`https://x.com/intent/post?text=${encodeURIComponent(`In Loving Memory of ${obituary.name} (${obituary.years}) - Middleton Funeral Services`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:text-black hover:border-black transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"
              >
                <Linkedin size={14}/>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`In Loving Memory of ${obituary.name}: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:text-emerald-600 hover:border-emerald-600 transition-colors"
              >
                <Instagram size={14}/>
              </a>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column (Main Info) */}
        <div className="flex-1 space-y-8 print:w-full print:block">
           
           {activeTab === 'obituary' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:shadow-none print:border-none print:p-0">
               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                 About {obituary.name}
               </h2>
               <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line font-light">
                 {obituary.bio}
               </p>
             </div>
           )}

           {activeTab === 'funeral' && (
             <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 print:shadow-none print:border-none print:p-0 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#411548]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <h2 className="text-2xl md:text-3xl font-serif font-black text-[#411548] uppercase mb-8 border-b border-gray-100 pb-4 tracking-tight">
                 Funeral <span className="text-black italic font-light lowercase">Details</span>
               </h2>
               
               <div className="space-y-6 max-w-4xl">
                 {/* Residence */}
                 <div className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100/60 flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-[#411548] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                     <Building size={18} />
                   </div>
                   <div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#411548]/60 block mb-0.5">Residence</span>
                     <p className="text-gray-900 font-bold text-base">{obituary.residence}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Visitation */}
                   <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                     <div className="flex items-center gap-2 text-[#411548]">
                       <Clock size={16} />
                       <span className="text-xs font-black uppercase tracking-wider">Visitation Schedule</span>
                     </div>
                     <p className="text-gray-900 font-bold text-lg">{obituary.service.visitationDate}</p>
                     <p className="text-[#411548] font-bold text-sm bg-white inline-block px-3 py-1 rounded-md border border-gray-200">{obituary.service.visitationTime}</p>
                   </div>

                   {/* Memorial / Funeral Service */}
                   <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                     <div className="flex items-center gap-2 text-[#411548]">
                       <Calendar size={16} />
                       <span className="text-xs font-black uppercase tracking-wider">Service Schedule</span>
                     </div>
                     <p className="text-gray-900 font-bold text-lg">{obituary.service.serviceDate}</p>
                     <p className="text-[#411548] font-bold text-sm bg-white inline-block px-3 py-1 rounded-md border border-gray-200">{obituary.service.serviceTime}</p>
                   </div>
                 </div>

                 {/* Location & Address */}
                 <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                   <div className="flex items-center gap-2 text-[#411548]">
                     <MapPin size={16} />
                     <span className="text-xs font-black uppercase tracking-wider">Service Location</span>
                   </div>
                   <p className="text-gray-900 font-bold text-lg">{obituary.service.locationName}</p>
                   <p className="text-gray-600 text-sm">{obituary.service.address}</p>
                 </div>

                 {/* Final Disposition & Site */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#411548]/60 block mb-1">Final Disposition</span>
                     <p className="text-gray-900 font-bold text-sm">{obituary.service.finalDisposition}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#411548]/60 block mb-1">Location / Site</span>
                     <p className="text-gray-900 font-bold text-sm leading-snug">{obituary.service.site}</p>
                   </div>
                 </div>

                 {/* Get Directions Button */}
                 <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#411548] text-white p-6 rounded-2xl shadow-lg">
                   <div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 block">Navigation & Location</span>
                     <p className="text-sm font-bold text-white mt-0.5">
                       View interactive service location map and directions
                     </p>
                   </div>
                   <button 
                     onClick={() => setIsMapModalOpen(true)}
                     className="w-full sm:w-auto bg-white text-[#411548] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-md shrink-0 cursor-pointer"
                   >
                     Get Directions <ArrowRight size={14} />
                   </button>
                 </div>

               </div>
             </div>
           )}

           {activeTab === 'condolences' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:shadow-none print:border-none print:p-0">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4 print:hidden">
                  <h2 className="text-xl font-bold text-gray-900">Condolences ({condolences.length})</h2>
                  <button onClick={() => setIsModalOpen(true)} className="bg-[#411548] text-white px-4 py-2 rounded font-bold text-sm hover:bg-[#300f35] transition-colors">
                    Leave a Message
                  </button>
                </div>
                {sortedCondolences.length > 0 ? (
                  <div className="space-y-6">
                    {sortedCondolences.map((condolence, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-gray-900">{condolence.name}</h3>
                          <span className="text-sm text-gray-500">{condolence.date}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed font-light whitespace-pre-wrap">
                          "{condolence.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                     <p className="text-gray-500">No condolences yet. Be the first to share your memories.</p>
                  </div>
                )}
             </div>
           )}

           {activeTab === 'photos' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:hidden">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8 border-b border-gray-100 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Photographs ({obituary.otherPhotos.length + uploadedPhotos.length})</h3>
                    <p className="text-gray-500 text-sm">Cherished moments and family memories of {obituary.name}.</p>
                  </div>
                  <div className="shrink-0">
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="bg-[#411548] text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all hover:bg-black shadow-md whitespace-nowrap shrink-0 min-w-[160px]">
                      <CustomIcon size={16} variant="white" className="shrink-0" /> <span className="whitespace-nowrap">Upload Photo</span>
                    </button>
                  </div>
                </div>

                {/* Combined Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {obituary.otherPhotos.map((photoUrl, i) => (
                    <div key={`official-${i}`} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-md relative group">
                      <img 
                        src={photoUrl} 
                        alt={`${obituary.name} memorial photo ${i + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-xs font-bold bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                          Memory #{i + 1}
                        </span>
                      </div>
                    </div>
                  ))}

                  {uploadedPhotos.map((photo, i) => (
                    <div key={`user-${i}`} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-md relative group">
                      <img src={photo} alt={`Uploaded photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Uploaded
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'flowers' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:hidden">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 text-center">Memorial Flowers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Flower Product Card */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm group">
                    <div className="h-48 bg-gray-50 relative overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=400&q=80" alt="White Roses" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">Elegant White Roses</h3>
                      <p className="text-black font-bold mt-2">$55.00</p>
                      <Link to="/flowers" className="mt-4 block w-full bg-[#f4e6f4] text-[#411548] py-2 rounded font-bold text-sm hover:bg-[#411548] hover:text-white transition-colors">
                        Purchase
                      </Link>
                    </div>
                  </div>
                  {/* Flower Product Card 2 */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm group">
                    <div className="h-48 bg-gray-50 relative overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1542385151-efd850a1bf6f?auto=format&fit=crop&w=400&q=80" alt="Lily Arrangement" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">Peaceful Lily Arrangement</h3>
                      <p className="text-black font-bold mt-2">$75.00</p>
                      <Link to="/flowers" className="mt-4 block w-full bg-[#f4e6f4] text-[#411548] py-2 rounded font-bold text-sm hover:bg-[#411548] hover:text-white transition-colors">
                        Purchase
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link to="/flowers" className="text-[#411548] font-bold text-sm hover:underline">View More Flowers &rarr;</Link>
                </div>
             </div>
           )}

           {activeTab === 'shop' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:hidden">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4 text-center">Memorial Keepsakes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shop Product Card */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm group">
                    <div className="h-48 bg-gray-50 relative overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80" alt="Urn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">Biodegradable Earth Urn</h3>
                      <p className="text-black font-bold mt-2">$120.00</p>
                      <Link to="/shop" className="mt-4 block w-full bg-[#f4e6f4] text-[#411548] py-2 rounded font-bold text-sm hover:bg-[#411548] hover:text-white transition-colors">
                        Purchase
                      </Link>
                    </div>
                  </div>
                  {/* Shop Product Card 2 */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm group">
                    <div className="h-48 bg-gray-50 relative overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80" alt="Locket" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-gray-900">Silver Ash Locket</h3>
                      <p className="text-black font-bold mt-2">$155.00</p>
                      <Link to="/shop" className="mt-4 block w-full bg-[#f4e6f4] text-[#411548] py-2 rounded font-bold text-sm hover:bg-[#411548] hover:text-white transition-colors">
                        Purchase
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                   <Link to="/shop" className="text-[#411548] font-bold text-sm hover:underline">View All Memorial Items &rarr;</Link>
                </div>
             </div>
           )}

        </div>
        
        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-80 shrink-0 print:hidden">
           {/* Profile Block */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden">
             
             {/* Decorative faint flower */}
             <CustomIcon size={120} className="absolute -top-10 -right-10 opacity-10 rotate-12 pointer-events-none" />

             <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-white shadow-md relative z-10">
                <img src={obituary.creator.img} alt={obituary.creator.name} className="w-full h-full object-cover" />
             </div>
             
             <h3 className="font-bold text-xl text-gray-900 mb-1 relative z-10">{obituary.creator.name}</h3>
             <p className="text-xs font-semibold text-[#411548] mb-1 relative z-10">{obituary.creator.relationship}</p>
             <p className="text-xs text-gray-500 mb-6 relative z-10">Member Since : {obituary.creator.memberSince}</p>
             
             <Link to="/obituaries" className="w-full bg-[#f0eaf2] text-[#411548] hover:bg-[#e4d5e8] py-3 rounded-xl font-bold text-sm transition-colors relative z-10 text-center block">
                View all Obituaries &rarr;
             </Link>
           </div>
        </div>
      </div>

      {/* Condolence Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm print:hidden">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative p-6 md:p-8">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CustomIcon size={24} />
            </button>
            <div className="p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <CustomIcon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent</h3>
                  <p className="text-gray-500">Your condolence has been shared with the family.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CustomIcon size={24} />
                    Leave a Condolence
                  </h2>
                  <form onSubmit={handleCondolenceSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={condolenceName}
                        onChange={(e) => setCondolenceName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#411548] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                      <textarea 
                        id="message"
                        required
                        rows={5}
                        value={condolenceMessage}
                        onChange={(e) => setCondolenceMessage(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#411548] focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Share a memory or words of comfort..."
                      ></textarea>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={!isFormValid}
                        className={`px-6 py-2 rounded font-medium shadow-sm transition-colors ${
                          isFormValid 
                            ? 'bg-[#411548] text-white hover:bg-[#300f35]' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden relative border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#411548] text-white p-6 flex justify-between items-start shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-purple-300" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">Service Location Map</span>
                </div>
                <h3 className="font-serif font-black text-xl text-white uppercase tracking-tight">{obituary.service.locationName}</h3>
                <p className="text-xs text-white/80 font-medium">{obituary.service.address}</p>
              </div>
              <button 
                onClick={() => setIsMapModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
                aria-label="Close Map Modal"
              >
                ✕
              </button>
            </div>

            {/* Map Frame */}
            <div className="w-full h-[400px] bg-gray-100 relative">
              <iframe 
                title="Service Location Google Map"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${obituary.service.mapCoordinates.lat},${obituary.service.mapCoordinates.lng}&hl=en&z=15&output=embed`}
                className="w-full h-full border-0"
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <div className="text-xs text-gray-500 font-medium">
                Pinned at <span className="font-bold text-gray-800">{obituary.service.locationName}</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setIsMapModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                <a 
                  href={obituary.service.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#411548] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md flex-1 sm:flex-initial"
                >
                  Open in Google Maps <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

        </>
      )}
    </div>
  );
}
