import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  UserPlus, 
  LogIn, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Clock, 
  Building, 
  User, 
  Heart, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Upload,
  MessageSquare
} from 'lucide-react';
import CustomIcon from '../components/CustomIcon';
import { useAuth } from '../context/AuthContext';
import { ObituaryItem, saveCustomObituary } from '../data/obituariesData';
import FormProgressBar from '../components/FormProgressBar';

interface InitialCondolence {
  id: string;
  name: string;
  message: string;
  date: string;
}

export default function SubmitObituary() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'preview' | 'success'>('form');
  const [previewTab, setPreviewTab] = useState<'obituary' | 'funeral' | 'condolences' | 'photos'>('obituary');

  // Registration year automatic
  const currentYear = new Date().getFullYear().toString();

  // Basic Deceased Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [category, setCategory] = useState<'Woman' | 'Man' | 'Veteran' | 'Youth' | 'Teen' | 'Others'>('Woman');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfPassing, setDateOfPassing] = useState('');
  const [location, setLocation] = useState('');
  const [residence, setResidence] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [lifeStory, setLifeStory] = useState('');
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);

  // Funeral Details
  const [serviceType, setServiceType] = useState('Funeral Mass & Celebration of Life');
  const [visitationDate, setVisitationDate] = useState('');
  const [visitationTime, setVisitationTime] = useState('4:00 PM – 7:00 PM');
  const [serviceDate, setServiceDate] = useState('');
  const [serviceTime, setServiceTime] = useState('11:00 AM');
  const [locationName, setLocationName] = useState('Middleton Funeral Home Chapel');
  const [serviceAddress, setServiceAddress] = useState('123 Compassion Way, Minneapolis, MN 55401');
  const [finalDisposition, setFinalDisposition] = useState('Cremation & Interment');
  const [site, setSite] = useState('Middleton Memorial Park, Garden of Peace');

  // Family Representative Information
  const [creatorName, setCreatorName] = useState('');
  const [creatorRelationship, setCreatorRelationship] = useState('Family Representative');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [creatorPhone, setCreatorPhone] = useState('');
  const [creatorPhoto, setCreatorPhoto] = useState<string | null>(null);

  // Gallery Photos (Max 6)
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Multiple Condolences
  const [condolences, setCondolences] = useState<InitialCondolence[]>([
    {
      id: '1',
      name: 'Sarah & Mark Davis',
      message: 'Sending our deepest prayers and condolences during this time of remembrance.',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
  ]);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const mainPhotoInputRef = useRef<HTMLInputElement>(null);
  const creatorPhotoInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill creator info when user is available
  useEffect(() => {
    if (user) {
      setCreatorName(prev => prev || user.name || '');
      setCreatorEmail(prev => prev || user.email || '');
      setCreatorPhone(prev => prev || user.phone || '(952) 486-2871');
      setCreatorRelationship(prev => prev || user.relationship || 'Family Representative');
      setCreatorPhoto(prev => prev || user.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    }
  }, [user]);

  // Handle Main Deceased Photo Upload
  const handleMainPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, mainPhoto: 'File size must be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainPhoto(reader.result as string);
        setErrors(prev => ({ ...prev, mainPhoto: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Family Representative Photo Upload
  const handleCreatorPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCreatorPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Gallery Photos Upload (Max 6)
  const handleGalleryPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = Array.from(e.target.files);

    if (galleryPhotos.length + files.length > 6) {
      setErrors(prev => ({ ...prev, galleryPhotos: 'Maximum 6 gallery photographs allowed.' }));
    } else {
      setErrors(prev => ({ ...prev, galleryPhotos: '' }));
    }

    const availableSlots = 6 - galleryPhotos.length;
    const filesToProcess = files.slice(0, availableSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryPhoto = (index: number) => {
    setGalleryPhotos(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => ({ ...prev, galleryPhotos: '' }));
  };

  // Condolences Management
  const addCondolenceRow = () => {
    setCondolences(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        message: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      }
    ]);
  };

  const updateCondolence = (id: string, field: 'name' | 'message' | 'date', value: string) => {
    setCondolences(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCondolence = (id: string) => {
    setCondolences(prev => prev.filter(c => c.id !== id));
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = 'First name of deceased is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name of deceased is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!dateOfPassing) newErrors.dateOfPassing = 'Date of passing is required';
    if (!location.trim()) newErrors.location = 'Location (City, State) is required';
    if (!lifeStory.trim()) newErrors.lifeStory = 'Life story / biography is required';

    if (dateOfBirth && dateOfPassing) {
      if (new Date(dateOfBirth) > new Date(dateOfPassing)) {
        newErrors.dateOfPassing = 'Date of passing cannot precede date of birth';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setStep('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit and Publish
  const [publishedId, setPublishedId] = useState<string>('');

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const birthYear = dateOfBirth ? new Date(dateOfBirth).getFullYear() : '1950';
    const passYear = dateOfPassing ? new Date(dateOfPassing).getFullYear() : currentYear;
    const yearsFormatted = `${birthYear}–${passYear}`;
    const datesFormatted = `${dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : ''} - ${dateOfPassing ? new Date(dateOfPassing).toLocaleDateString() : ''}`;

    const newObituaryId = `submitted-${Date.now()}`;

    const newObituary: ObituaryItem = {
      id: newObituaryId,
      name: `${firstName.trim()} ${lastName.trim()}`,
      years: yearsFormatted,
      dates: datesFormatted,
      location: location || 'Twin Cities, MN',
      residence: residence || `${location} — Residence`,
      img: mainPhoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      familyImg: creatorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      otherPhotos: galleryPhotos.length > 0 ? galleryPhotos : [
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80'
      ],
      featured: true,
      abstract: abstractText.trim() || `${firstName} ${lastName} lived a life characterized by love, devotion, and cherished family moments.`,
      category: category,
      bio: lifeStory,
      service: {
        locationName: locationName || 'Middleton Funeral Home Chapel',
        visitationDate: visitationDate ? new Date(visitationDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'To Be Announced',
        visitationTime: visitationTime || '4:00 PM – 7:00 PM',
        serviceDate: serviceDate ? new Date(serviceDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'To Be Announced',
        serviceTime: serviceTime || '11:00 AM',
        address: serviceAddress || '123 Compassion Way, Minneapolis, MN 55401',
        finalDisposition: finalDisposition || 'Cremation',
        site: site || 'Middleton Memorial Park',
        mapCoordinates: { lat: 44.9778, lng: -93.2650 },
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(serviceAddress)}`
      },
      creator: {
        name: creatorName || user?.name || 'Family Representative',
        relationship: creatorRelationship || user?.relationship || 'Family Representative',
        memberSince: user?.memberSince || currentYear,
        email: creatorEmail || user?.email || '',
        phone: creatorPhone || user?.phone || '(952) 486-2871',
        img: creatorPhoto || user?.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      condolences: condolences.filter(c => c.name.trim() && c.message.trim()).map(c => ({
        name: c.name.trim(),
        message: c.message.trim(),
        date: c.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        timestamp: Date.now()
      })),
      testimonial: {
        quote: 'Middleton Funeral Services helped our family navigate every detail with immense compassion and dignity.',
        author: creatorName || 'Family Representative',
        role: creatorRelationship || 'Family Representative',
        img: creatorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    };

    saveCustomObituary(newObituary);
    setPublishedId(newObituaryId);
    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS STEP VIEW
  if (step === 'success') {
    return (
      <div className="bg-[#fcf8fc] min-h-screen py-20 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 size={44} />
          </div>
          <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
            Obituary Published Successfully
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#411548] font-black uppercase mb-4 tracking-tight">
            In Loving Memory of {firstName} {lastName}
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed font-light max-w-lg mx-auto">
            The obituary and funeral details have been synchronized and published to the Middleton memorial portal. Family and friends can now view the obituary, read service logistics, leave condolences, and view photo memories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={`/obituaries/${publishedId}`} 
              className="bg-[#411548] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2"
            >
              View Published Obituary <ArrowRight size={16} />
            </Link>
            <Link 
              to="/obituaries" 
              className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              All Obituaries Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PREVIEW STEP VIEW
  if (step === 'preview') {
    return (
      <div className="bg-[#f8f9fa] min-h-screen pb-20">
        {/* Banner */}
        <div className="bg-[#411548] pt-12 pb-20 relative overflow-hidden text-white">
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setStep('form')}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border border-white/20"
              >
                <ArrowLeft size={14} /> Edit Submission
              </button>
              <span className="bg-amber-400 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Interactive Preview Mode
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden shrink-0 shadow-lg bg-purple-100">
                {mainPhoto ? (
                  <img src={mainPhoto} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-300">
                    <User size={48} />
                  </div>
                )}
              </div>
              <div className="text-white text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-script font-medium mb-1 drop-shadow-md text-white">
                  {firstName} {lastName}
                </h1>
                <p className="text-white/90 mb-4 font-medium tracking-wide text-sm">
                  {dateOfBirth ? new Date(dateOfBirth).getFullYear() : '1950'} – {dateOfPassing ? new Date(dateOfPassing).getFullYear() : currentYear} &bull; {location}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full border border-white/20">
                    Category: {category}
                  </span>
                  <span className="bg-white/10 text-white text-xs px-4 py-1.5 rounded-full border border-white/20">
                    Submitted by: {creatorName || 'Family Representative'} ({creatorRelationship})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar Container */}
        <div className="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 px-6 flex flex-wrap gap-4 font-bold text-sm justify-between items-center">
            <div className="flex gap-6">
              <button 
                onClick={() => setPreviewTab('obituary')}
                className={`pb-1 border-b-2 transition-colors ${previewTab === 'obituary' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent'}`}
              >
                Obituary
              </button>
              <button 
                onClick={() => setPreviewTab('funeral')}
                className={`pb-1 border-b-2 transition-colors ${previewTab === 'funeral' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent'}`}
              >
                Funeral Details
              </button>
              <button 
                onClick={() => setPreviewTab('condolences')}
                className={`pb-1 border-b-2 transition-colors ${previewTab === 'condolences' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent'}`}
              >
                Condolences ({condolences.filter(c => c.name).length})
              </button>
              <button 
                onClick={() => setPreviewTab('photos')}
                className={`pb-1 border-b-2 transition-colors ${previewTab === 'photos' ? 'text-[#411548] border-[#411548]' : 'text-gray-500 border-transparent'}`}
              >
                Photographs ({galleryPhotos.length})
              </button>
            </div>

            <button 
              onClick={handleFinalSubmit}
              className="bg-[#411548] text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-md flex items-center gap-2"
            >
              Confirm & Publish Obituary <CheckCircle2 size={16} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {previewTab === 'obituary' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {firstName} {lastName}</h2>
                {abstractText && (
                  <p className="text-[#411548] font-medium bg-purple-50 p-4 rounded-xl border border-purple-100 mb-6 text-sm">
                    "{abstractText}"
                  </p>
                )}
                <div className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-wrap font-light">
                  {lifeStory}
                </div>
              </div>
            )}

            {previewTab === 'funeral' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <h2 className="text-2xl font-serif font-black text-[#411548] uppercase pb-3 border-b border-gray-100">
                  Funeral Service Details
                </h2>

                <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-center gap-3">
                  <Building size={20} className="text-[#411548]" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#411548]/70 block">Service Type</span>
                    <p className="text-gray-900 font-bold text-sm">{serviceType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-gray-400 block">Visitation Schedule</span>
                    <p className="text-gray-900 font-bold text-base">{visitationDate || 'To Be Announced'}</p>
                    <p className="text-[#411548] text-xs font-bold mt-1">{visitationTime}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-gray-400 block">Service Schedule</span>
                    <p className="text-gray-900 font-bold text-base">{serviceDate || 'To Be Announced'}</p>
                    <p className="text-[#411548] text-xs font-bold mt-1">{serviceTime}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400 block">Service Location & Address</span>
                  <p className="text-gray-900 font-bold text-base">{locationName}</p>
                  <p className="text-gray-600 text-sm">{serviceAddress}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-gray-400 block">Final Disposition</span>
                    <p className="text-gray-900 font-bold text-sm">{finalDisposition}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-gray-400 block">Memorial Site / Cemetery</span>
                    <p className="text-gray-900 font-bold text-sm">{site}</p>
                  </div>
                </div>
              </div>
            )}

            {previewTab === 'condolences' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
                  Initial Condolences ({condolences.filter(c => c.name).length})
                </h2>
                <div className="space-y-4">
                  {condolences.filter(c => c.name && c.message).map((c, i) => (
                    <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">{c.name}</h4>
                        <span className="text-xs text-gray-400">{c.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm italic">"{c.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewTab === 'photos' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">
                  Photographs Gallery ({galleryPhotos.length} / 6 photos)
                </h2>
                {galleryPhotos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryPhotos.map((photo, i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
                        <img src={photo} alt={`Memory ${i + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Memory #{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-8">No gallery photographs added.</p>
                )}
              </div>
            )}
          </div>

          {/* Right Column Sidebar Preview (Family Member Card) */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#411548] mb-4 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Family Representative Card
              </span>

              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#411548]/20 shadow-md">
                {creatorPhoto ? (
                  <img src={creatorPhoto} alt={creatorName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-purple-50 flex items-center justify-center text-purple-400">
                    <User size={36} />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-0.5">{creatorName || 'Your Name'}</h3>
              <p className="text-xs font-semibold text-[#411548] mb-1">{creatorRelationship}</p>
              <p className="text-xs text-gray-500 mb-4">Member Since : {user?.memberSince || currentYear}</p>

              <div className="w-full border-t border-gray-100 pt-4 text-xs text-gray-500 space-y-1 text-left">
                <p><strong className="text-gray-700">Contact Email:</strong> {creatorEmail || 'Not provided'}</p>
                <p><strong className="text-gray-700">Phone:</strong> {creatorPhone || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN FORM STEP VIEW
  return (
    <div className="bg-[#fcf8fc] min-h-screen pb-20">
      {/* Header Hero Banner */}
      <section className="bg-[#411548] py-16 lg:py-20 px-4 relative overflow-hidden text-white mb-10">
        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-white font-black text-[9px] tracking-[0.3em] uppercase mb-4 p-2.5 px-6 bg-white/10 rounded-full border border-white/20">
            <CustomIcon size={12} className="text-white" /> Online Memorial Publication Portal
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4 uppercase font-black tracking-tight text-white">
            Submit An Obituary
          </h1>
          <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Create a dignified memorial page for your loved one. Complete the details below including funeral logistics, family card information, gallery photos (max 6), and condolences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl">
        <FormProgressBar
          steps={[
            { num: 1, label: 'Obituary & Funeral Details' },
            { num: 2, label: 'Interactive Preview' },
            { num: 3, label: 'Memorial Published' }
          ]}
          currentStep={step === 'form' ? 1 : step === 'preview' ? 2 : 3}
          className="mb-8"
        />

        {!user || !user.isLoggedIn ? (
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-200 text-center">
            <div className="w-20 h-20 bg-purple-100 text-[#411548] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Lock size={36} />
            </div>
            <span className="inline-block bg-purple-100 text-[#411548] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              Authentication Required
            </span>
            <h2 className="font-serif text-3xl font-black text-[#411548] uppercase mb-4 tracking-tight">
              Registered Visitor & Admin Portal
            </h2>
            <p className="text-gray-600 text-sm font-light leading-relaxed max-w-lg mx-auto mb-8">
              Only registered members and administrators can publish obituaries or family memorial cards. Please complete registration or sign in to proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-[#411548] hover:bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <UserPlus size={16} /> Register New Account
              </Link>
              <Link
                to="/login"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <LogIn size={16} /> Member / Admin Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form className="space-y-10">
            {/* User Session Bar */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#411548]">
                  <img src={creatorPhoto || user.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Logged in as: <span className="text-[#411548]">{user.name}</span></p>
                  <p className="text-[11px] text-gray-500">Role: <strong className="uppercase">{user.role}</strong> &bull; Member since {user.memberSince || currentYear}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Authorized Submitter
              </span>
            </div>

            {/* SECTION 1: DECEASED BASIC INFORMATION */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-purple-100 text-[#411548] rounded-xl flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Obituary & Deceased Details</h3>
                  <p className="text-xs text-gray-500">Basic biographical information and main memorial portrait.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. William"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Anderson"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  >
                    <option value="Woman">Woman</option>
                    <option value="Man">Man</option>
                    <option value="Veteran">Veteran</option>
                    <option value="Youth">Youth</option>
                    <option value="Teen">Teen</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Date of Passing <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={dateOfPassing}
                    onChange={(e) => setDateOfPassing(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                  {errors.dateOfPassing && <p className="text-red-500 text-xs mt-1">{errors.dateOfPassing}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Location (City, State) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Minneapolis, MN"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Residence / Region Details</label>
                  <input
                    type="text"
                    value={residence}
                    onChange={(e) => setResidence(e.target.value)}
                    placeholder="e.g. Minneapolis, Minnesota — Twin Cities"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Brief Abstract / Summary</label>
                <input
                  type="text"
                  value={abstractText}
                  onChange={(e) => setAbstractText(e.target.value)}
                  placeholder="e.g. Devoted husband, father and community mentor whose warmth touched many lives."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Obituary Biography (Life Story) <span className="text-red-500">*</span></label>
                <textarea
                  rows={6}
                  value={lifeStory}
                  onChange={(e) => setLifeStory(e.target.value)}
                  placeholder="Share details of their life story, achievements, family members, passion, and memories..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548] resize-none"
                ></textarea>
                {errors.lifeStory && <p className="text-red-500 text-xs mt-1">{errors.lifeStory}</p>}
              </div>

              {/* Main Deceased Portrait Upload */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Main Portrait Photo of Deceased</label>
                <input 
                  type="file" 
                  ref={mainPhotoInputRef} 
                  onChange={handleMainPhotoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                {mainPhoto ? (
                  <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-4 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <img src={mainPhoto} alt="Portrait" className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-white" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Main Portrait Loaded</p>
                        <p className="text-xs text-gray-500">Ready for obituary header</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setMainPhoto(null)} 
                      className="text-red-500 text-xs font-bold hover:underline"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => mainPhotoInputRef.current?.click()} 
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:bg-purple-50/50 transition-colors flex flex-col items-center justify-center gap-2"
                  >
                    <Upload size={28} className="text-[#411548]" />
                    <span className="text-xs font-bold text-[#411548]">Click to Upload Deceased Portrait Photo</span>
                    <p className="text-[11px] text-gray-400">JPG, PNG or GIF (Max 5MB)</p>
                  </div>
                )}
                {errors.mainPhoto && <p className="text-red-500 text-xs mt-1">{errors.mainPhoto}</p>}
              </div>
            </div>

            {/* SECTION 2: FUNERAL DETAILS & SERVICE LOGISTICS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-purple-100 text-[#411548] rounded-xl flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Funeral & Service Details</h3>
                  <p className="text-xs text-gray-500">Schedule, location, visitation times and final disposition.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Service Type</label>
                <input
                  type="text"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="e.g. Funeral Mass & Celebration of Life"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold uppercase text-[#411548]">Visitation Schedule</span>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Visitation Date</label>
                    <input
                      type="date"
                      value={visitationDate}
                      onChange={(e) => setVisitationDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#411548] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Visitation Time</label>
                    <input
                      type="text"
                      value={visitationTime}
                      onChange={(e) => setVisitationTime(e.target.value)}
                      placeholder="e.g. 4:00 PM – 7:00 PM"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#411548] bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold uppercase text-[#411548]">Funeral Service Schedule</span>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Service Date</label>
                    <input
                      type="date"
                      value={serviceDate}
                      onChange={(e) => setServiceDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#411548] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Service Time</label>
                    <input
                      type="text"
                      value={serviceTime}
                      onChange={(e) => setServiceTime(e.target.value)}
                      placeholder="e.g. 11:00 AM"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#411548] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Service Location Name</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. St. Mary's Cathedral Chapel"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Full Address</label>
                  <input
                    type="text"
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    placeholder="e.g. 123 Compassion Way, Minneapolis, MN 55401"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Final Disposition</label>
                  <input
                    type="text"
                    value={finalDisposition}
                    onChange={(e) => setFinalDisposition(e.target.value)}
                    placeholder="e.g. Cremation / Earth Burial"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Site / Cemetery Details</label>
                  <input
                    type="text"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    placeholder="e.g. Sunset Memorial Park, Garden of Grace"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: FAMILY MEMBER OR REPRESENTATIVE CARD */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-purple-100 text-[#411548] rounded-xl flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-gray-900">Family Representative Card</h3>
                  <p className="text-xs text-gray-500">Captured information for the sidebar family representative card on the obituary page.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Representative Name</label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="e.g. David Vance"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Relationship to Deceased</label>
                  <input
                    type="text"
                    value={creatorRelationship}
                    onChange={(e) => setCreatorRelationship(e.target.value)}
                    placeholder="e.g. Son / Daughter / Spouse"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={creatorEmail}
                    onChange={(e) => setCreatorEmail(e.target.value)}
                    placeholder="e.g. representative@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={creatorPhone}
                    onChange={(e) => setCreatorPhone(e.target.value)}
                    placeholder="e.g. (952) 486-2871"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#411548]"
                  />
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#411548] shrink-0 bg-white">
                    {creatorPhoto ? (
                      <img src={creatorPhoto} alt="Representative" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={24} />
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#411548] block">Automatic Verification</span>
                    <p className="text-xs font-bold text-gray-900">Member Since : {user?.memberSince || currentYear}</p>
                    <p className="text-[11px] text-gray-500">Automatically synchronized from registration year</p>
                  </div>
                </div>

                <div>
                  <input 
                    type="file" 
                    ref={creatorPhotoInputRef} 
                    onChange={handleCreatorPhotoUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  <button 
                    type="button" 
                    onClick={() => creatorPhotoInputRef.current?.click()} 
                    className="bg-white border border-[#411548] text-[#411548] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#411548] hover:text-white transition-colors"
                  >
                    Change Representative Photo
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 4: PHOTOGRAPHS GALLERY (MAX 6 PHOTOS) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-[#411548] rounded-xl flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">Photographs Screen</h3>
                    <p className="text-xs text-gray-500">Upload memorial gallery images (maximum of 6 photos allowed).</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${galleryPhotos.length >= 6 ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-[#411548]'}`}>
                  {galleryPhotos.length} / 6 Uploaded
                </span>
              </div>

              {errors.galleryPhotos && (
                <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-200">
                  {errors.galleryPhotos}
                </p>
              )}

              {galleryPhotos.length < 6 && (
                <div>
                  <input
                    type="file"
                    ref={galleryInputRef}
                    onChange={handleGalleryPhotoUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div 
                    onClick={() => galleryInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-purple-50/50 transition-colors flex flex-col items-center justify-center gap-3"
                  >
                    <ImageIcon size={32} className="text-[#411548]" />
                    <div>
                      <p className="text-xs font-bold text-[#411548] uppercase tracking-wider">
                        Click or Drop Gallery Photographs Here
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        You can select up to {6 - galleryPhotos.length} more photo(s)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {galleryPhotos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  {galleryPhotos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 relative group">
                      <img src={photo} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeGalleryPhoto(index)}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                          title="Remove Photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Memory #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SECTION 5: INITIAL CONDOLENCES (MULTIPLE SUPPORTED) */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-[#411548] rounded-xl flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900">Condolences Screen</h3>
                    <p className="text-xs text-gray-500">Add individual condolences or multiple messages at once.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addCondolenceRow}
                  className="bg-[#411548] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Plus size={14} /> Add Condolence
                </button>
              </div>

              <div className="space-y-4">
                {condolences.map((c, idx) => (
                  <div key={c.id} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#411548] tracking-widest">
                        Condolence Message #{idx + 1}
                      </span>
                      {condolences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCondolence(c.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Author Name / Family</label>
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => updateCondolence(c.id, 'name', e.target.value)}
                          placeholder="e.g. Sarah & Mark Davis"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#411548]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Date</label>
                        <input
                          type="text"
                          value={c.date}
                          onChange={(e) => updateCondolence(c.id, 'date', e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#411548]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">Tribute / Condolence Message</label>
                      <textarea
                        rows={2}
                        value={c.message}
                        onChange={(e) => updateCondolence(c.id, 'message', e.target.value)}
                        placeholder="Write message of comfort, memory, or condolence..."
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-[#411548] resize-none"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PREVIEW BUTTON */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handlePreview}
                className="w-full bg-[#411548] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Preview Obituary Details Page <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
