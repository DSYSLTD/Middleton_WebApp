import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export interface SmartLeadFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  options?: string[];
}

export interface SmartLeadFormProps {
  type: string;
  title?: string;
  description?: string;
  ctaText?: string;
  fields: SmartLeadFormField[];
  successMessage?: string;
}

export default function SmartLeadForm({
  type,
  title,
  description,
  ctaText = 'Submit Information',
  fields,
  successMessage = 'Thank you! Your information has been received. Our team will follow up with you promptly.'
}: SmartLeadFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(f => {
      initial[f.name] = f.defaultValue || '';
    });
    return initial;
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storageKey = 'middleton_lead_submissions';
    const existing = localStorage.getItem(storageKey);
    const list = existing ? JSON.parse(existing) : [];
    list.unshift({
      id: `lead-${Date.now()}`,
      type,
      data: formData,
      submittedDate: new Date().toISOString()
    });
    localStorage.setItem(storageKey, JSON.stringify(list));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#411548]/5 border-2 border-[#411548]/20 rounded-3xl p-8 text-center space-y-4">
        <div className="w-14 h-14 bg-[#411548] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-7 h-7 text-[#C5A059]" />
        </div>
        <h3 className="font-serif text-2xl font-black text-[#411548] uppercase tracking-tight">
          Submission Confirmed
        </h3>
        <p className="text-gray-700 text-sm font-medium max-w-md mx-auto leading-relaxed">
          {successMessage}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 bg-[#411548] hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-full transition-all"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="font-serif text-2xl md:text-3xl font-black text-[#411548] uppercase tracking-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-sm font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {fields.map(field => (
          <div key={field.name} className="space-y-1">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#411548]">
              {field.label} {field.required && <span className="text-[#C5A059]">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                required={field.required}
                rows={4}
                value={formData[field.name] || ''}
                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#411548] focus:bg-white focus:outline-none transition-all"
              />
            ) : field.type === 'select' ? (
              <select
                required={field.required}
                value={formData[field.name] || ''}
                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#411548] focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="">Select option</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#411548] focus:bg-white focus:outline-none transition-all"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-4 bg-[#411548] hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 group"
        >
          <Send className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
          <span>{ctaText}</span>
        </button>
      </form>
    </div>
  );
}
