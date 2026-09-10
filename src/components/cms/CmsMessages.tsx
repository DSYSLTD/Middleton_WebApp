import React, { useState } from 'react';
import { 
  Mail, Star, Archive, Send, Search, Phone, Calendar, 
  User, CheckCircle2, Printer, Download, FileSpreadsheet, 
  FileText, Tag, MessageSquare, Clock, ArrowRight, X, Sparkles, AlertCircle
} from 'lucide-react';

interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'Care Consultation' | 'Pre-Planning' | 'Career Inquiry' | 'Floral / Tribute' | 'General';
  subject: string;
  message: string;
  date: string;
  isStarred: boolean;
  isArchived: boolean;
  isRead: boolean;
  priority: 'Immediate Need' | 'Standard' | 'Urgent';
}

interface ResponseTemplate {
  id: string;
  title: string;
  category: string;
  body: string;
}

const INITIAL_MESSAGES: InquiryMessage[] = [
  {
    id: 'msg-1',
    name: 'Rebecca Thorvald',
    email: 'r.thorvald@gmail.com',
    phone: '(952) 412-9844',
    type: 'Care Consultation',
    subject: 'Immediate Need Consultation for Mother',
    message: 'Hello, our family is in hospice care with mother in Apple Valley. We would like to arrange an in-person meeting with a director tomorrow morning to review celebration of life and burial options.',
    date: 'Today at 10:14 AM',
    isStarred: true,
    isArchived: false,
    isRead: false,
    priority: 'Immediate Need'
  },
  {
    id: 'msg-2',
    name: 'Mark Henderson',
    email: 'mhenderson.legal@gmail.com',
    phone: '(612) 770-3419',
    type: 'Pre-Planning',
    subject: 'Pre-Planning Consultation and Price Protection Trust',
    message: 'My wife and I would like to explore pre-planning our arrangements. Could you mail or email your complimentary planning guide and arrange a phone conference?',
    date: 'Yesterday at 3:45 PM',
    isStarred: false,
    isArchived: false,
    isRead: true,
    priority: 'Standard'
  },
  {
    id: 'msg-3',
    name: 'Evelyn Brooks, Mortuary Student',
    email: 'ebrooks@umn.edu',
    phone: '(651) 890-1123',
    type: 'Career Inquiry',
    subject: 'Application for Mortuary Resident & Director Opening',
    message: 'Greetings Middleton Team, I recently completed my coursework at UMN Mortuary Science program and have submitted my application for the Director position. Thank you for your review!',
    date: '2 Mar 2026',
    isStarred: true,
    isArchived: false,
    isRead: true,
    priority: 'Standard'
  }
];

const DEFAULT_TEMPLATES: ResponseTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Immediate Care Guidance & Compassion',
    category: 'Care Consultation',
    body: 'Dear {SenderName},\n\nWe extend our heartfelt condolences to you and your family during this delicate hour. We would be honored to walk alongside you. A director is available to meet with you at your convenience—either at our Apple Valley Chapel or in the comfort of your home.\n\nWarm regards,\nMiddleton Funeral Services Care Team'
  },
  {
    id: 'tmpl-2',
    title: 'Heritage Pre-Planning Information Package',
    category: 'Pre-Planning',
    body: 'Dear {SenderName},\n\nThank you for reaching out regarding advance memorial planning. Pre-arranging provides peace of mind and locks in costs with our Price-Protection Trust. We have attached our complimentary Heritage Planning Guide for your review.\n\nWarmly,\nMiddleton Pre-Arrangement Team'
  }
];

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsMessages({ onShowToast }: Props) {
  const [messages, setMessages] = useState<InquiryMessage[]>(INITIAL_MESSAGES);
  const [selectedMsg, setSelectedMsg] = useState<InquiryMessage | null>(INITIAL_MESSAGES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<'all' | 'unread' | 'care' | 'preplan' | 'starred' | 'archived'>('all');
  
  // Modals
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templates, setTemplates] = useState<ResponseTemplate[]>(DEFAULT_TEMPLATES);
  
  // Reply text
  const [replyText, setReplyText] = useState('');

  const handleSelectMessage = (msg: InquiryMessage) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      const updated = messages.map(m => m.id === msg.id ? { ...m, isRead: true } : m);
      setMessages(updated);
    }
    // Prepopulate reply
    setReplyText(`Dear ${msg.name},\n\nThank you for contacting Middleton Funeral Services regarding "${msg.subject}". `);
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, isStarred: !m.isStarred } : m));
  };

  const toggleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(messages.map(m => m.id === id ? { ...m, isArchived: !m.isArchived } : m));
    onShowToast('Updated message archive status');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMsg) return;
    onShowToast(`Sent official response to ${selectedMsg.email}`);
    setReplyText('');
  };

  const handleApplyTemplate = (tmpl: ResponseTemplate) => {
    if (!selectedMsg) return;
    const filled = tmpl.body
      .replace('{SenderName}', selectedMsg.name)
      .replace('{Subject}', selectedMsg.subject)
      .replace('{Category}', selectedMsg.type);
    setReplyText(filled);
    onShowToast(`Applied template: "${tmpl.title}"`);
  };

  const filtered = messages.filter(m => {
    if (activeFolder === 'unread' && (m.isRead || m.isArchived)) return false;
    if (activeFolder === 'starred' && (!m.isStarred || m.isArchived)) return false;
    if (activeFolder === 'care' && (m.type !== 'Care Consultation' || m.isArchived)) return false;
    if (activeFolder === 'preplan' && (m.type !== 'Pre-Planning' || m.isArchived)) return false;
    if (activeFolder === 'archived' && !m.isArchived) return false;
    if (activeFolder === 'all' && m.isArchived) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Top Header Banner (1. Title -> 2. Text -> 3. Buttons) */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-xl space-y-4 border border-[#C5A059]/40 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <Mail className="w-7 h-7 text-[#C5A059] shrink-0" />
            <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-white">
              Leads, Inquiries & Family Consultations
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Printing All Lead Dossiers...')}
              className="px-4 py-2 bg-[#C5A059] hover:bg-white text-[#411548] font-black text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print All Leads
            </button>
            <button
              onClick={() => onShowToast('Exported Excel Table')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#411548] font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#C5A059]" /> Export Excel
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-3.5 py-2 bg-white/10 hover:bg-white text-white hover:text-[#411548] font-black text-xs uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" /> Response Templates
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-white/80 font-light max-w-4xl leading-relaxed relative z-10">
          Respond to immediate family care needs, pre-planning inquiries, and memorial tribute requests with dignity and rapid attention.
        </p>

        {/* Sub-navigation folders */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-white/10 overflow-x-auto relative z-10">
          {[
            { id: 'all', label: 'All Inquiries', count: messages.filter(m => !m.isArchived).length },
            { id: 'unread', label: 'Unread', count: messages.filter(m => !m.isRead && !m.isArchived).length },
            { id: 'care', label: 'Immediate Need', count: messages.filter(m => m.type === 'Care Consultation' && !m.isArchived).length },
            { id: 'preplan', label: 'Pre-Planning', count: messages.filter(m => m.type === 'Pre-Planning' && !m.isArchived).length },
            { id: 'starred', label: 'Starred' },
            { id: 'archived', label: 'Archived' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFolder(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeFolder === tab.id
                  ? 'bg-[#C5A059] text-[#411548] shadow-md font-extrabold'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeFolder === tab.id ? 'bg-[#411548] text-white' : 'bg-white/20 text-white'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Two-Pane Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Pane: Inquiries List */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-[#faf4fa]">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search leads, names, phones..."
                className="w-full pl-10 pr-4 py-2 text-xs font-bold bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#411548]"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-100 max-h-[650px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400">No inquiries found in this category.</div>
            ) : (
              filtered.map(msg => {
                const isSelected = selectedMsg?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`p-4 cursor-pointer transition-all flex flex-col gap-2 ${
                      isSelected ? 'bg-[#faf4fa] border-l-4 border-l-[#411548]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                        )}
                        <h4 className="font-serif font-black text-xs text-gray-900 truncate max-w-[170px]">
                          {msg.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => toggleStar(msg.id, e)}
                          className={`p-1 rounded-md ${msg.isStarred ? 'text-[#C5A059]' : 'text-gray-300 hover:text-gray-500'}`}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <span className="text-[10px] font-mono text-gray-400">{msg.date}</span>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-[#411548] truncate">{msg.subject}</p>
                    <p className="text-[11px] text-gray-500 font-light line-clamp-2 leading-relaxed">{msg.message}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[9px] font-bold">
                        {msg.type}
                      </span>
                      {msg.priority === 'Immediate Need' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[9px] font-black uppercase">
                          Immediate
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Detailed Lead Dossier & Quick Reply */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          {selectedMsg ? (
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#411548]/10 text-[#411548] text-[10px] font-black uppercase rounded-full">
                      {selectedMsg.type}
                    </span>
                    {selectedMsg.priority === 'Immediate Need' && (
                      <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-black uppercase rounded-full animate-pulse">
                        Immediate Family Care
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-black text-xl text-gray-900 mt-1">{selectedMsg.subject}</h3>
                  <p className="text-xs text-gray-400 font-medium">{selectedMsg.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onShowToast(`Printing lead dossier for ${selectedMsg.name}`)}
                    className="p-2 bg-gray-100 hover:bg-[#411548] hover:text-white rounded-xl text-gray-700 transition-colors cursor-pointer"
                    title="Print Lead Dossier"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => toggleArchive(selectedMsg.id, e)}
                    className="p-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-xl text-gray-700 transition-colors cursor-pointer"
                    title="Archive Lead"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Info Bar */}
              <div className="p-4 bg-[#faf4fa] rounded-2xl border border-[#411548]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#411548] text-[#C5A059] flex items-center justify-center font-bold text-sm">
                    {selectedMsg.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedMsg.name}</h4>
                    <p className="font-mono text-[11px] text-gray-500">{selectedMsg.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-bold text-[#411548]">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>{selectedMsg.phone}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Inquiry Body</span>
                <p className="text-xs text-gray-700 leading-relaxed font-light p-4 bg-gray-50 rounded-2xl border border-gray-100 whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>

              {/* Quick Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#411548] flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-[#C5A059]" /> Quick Official Reply
                  </span>

                  {/* Template Picker */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-400 font-bold">Apply Template:</span>
                    {templates.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleApplyTemplate(t)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-[#411548] hover:text-[#C5A059] text-gray-700 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                      >
                        {t.category}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Type your compassionate response to the family..."
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[#411548]"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#411548] hover:bg-black text-[#C5A059] font-black text-xs uppercase tracking-wider rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Dispatch Email Reply</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

            </div>
          ) : (
            <div className="p-16 text-center text-gray-400 text-xs font-light">
              Select an inquiry from the left pane to review details.
            </div>
          )}
        </div>

      </div>

      {/* RESPONSE TEMPLATES MODAL */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-black text-base text-[#411548] uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A059]" /> Standard Care Response Templates
              </h3>
              <button onClick={() => setShowTemplateModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs max-h-96 overflow-y-auto">
              {templates.map(t => (
                <div key={t.id} className="p-4 bg-[#faf4fa] rounded-2xl border border-[#411548]/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-sm text-[#411548]">{t.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400">{t.category}</span>
                  </div>
                  <p className="text-gray-600 font-light whitespace-pre-wrap">{t.body}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button onClick={() => setShowTemplateModal(false)} className="px-5 py-2 bg-[#411548] text-white rounded-full text-xs font-black uppercase">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
