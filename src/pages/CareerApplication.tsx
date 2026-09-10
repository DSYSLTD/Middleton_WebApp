import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SmartLeadForm from '../components/SmartLeadForm';

export default function CareerApplication() {
  const [searchParams] = useSearchParams();
  const jobTitle = searchParams.get('jobTitle') || '';

  return (
    <main className="flex-grow bg-[#faf4fa] py-16 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link 
          to="/careers" 
          className="inline-flex items-center gap-2 text-xs font-black text-[#411548] hover:text-black uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
          <span>Back to All Careers</span>
        </Link>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl">
          <SmartLeadForm 
            type="Career"
            title="Direct Application"
            description={`Join our compassionate team at Middleton Funeral Services. You are applying for: ${jobTitle || 'General Career Application'}`}
            fields={[
              { name: 'name', label: 'Full Legal Name', type: 'text', placeholder: 'e.g. Eleanor Vance', required: true },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. name@example.com', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'e.g. (952) 486-2871', required: true },
              { name: 'position', label: 'Position of Interest', type: 'text', placeholder: 'Position', required: true, defaultValue: jobTitle },
              { name: 'experience', label: 'Years in Mortuary / Funeral Care', type: 'select', required: true, options: ['Entry Level / Mortuary Student', '1-3 Years Experience', '4-7 Years Experience', '8+ Years Senior Experience'] },
              { name: 'message', label: 'Cover Note & Statement of Calling', type: 'textarea', placeholder: "Tell us about your background, values, and why you feel called to serve grieving families with Middleton Funeral Services...", required: true }
            ]}
            ctaText="Submit Direct Application"
          />
        </div>
      </div>
    </main>
  );
}
