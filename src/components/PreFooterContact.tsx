import { Phone, Mail, MapPin } from 'lucide-react';

export default function PreFooterContact() {
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-[#411548]" />,
      label: "Get free quote",
      value: "952 486-2871",
      href: "tel:9524862871"
    },
    {
      icon: <Mail size={20} className="text-[#411548]" />,
      label: "Email address",
      value: "info@middletonfunerals.com",
      href: "mailto:info@middletonfunerals.com"
    },
    {
      icon: <MapPin size={20} className="text-[#411548]" />,
      label: "Address:",
      value: "24173 Williams Rd. Rogers 55374",
      href: "https://maps.google.com/?q=24173+Williams+Rd.+Rogers+55374"
    }
  ];

  return (
    <section className="bg-[#411548] py-14">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {contactInfo.map((item, idx) => (
            <div key={idx} className="flex items-center justify-center md:justify-start gap-5 relative">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-[10px] font-black tracking-[0.1em] mb-1 capitalize">{item.label}</span>
                <a 
                  href={item.href} 
                  className="text-white text-lg md:text-xl font-black tracking-tight hover:text-white/80 transition-colors"
                >
                  {item.value}
                </a>
              </div>
              {idx < contactInfo.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/20"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
