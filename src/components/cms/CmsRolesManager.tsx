import React, { useState } from 'react';
import { UserCheck, Shield, Check, X, Plus } from 'lucide-react';
import { blogStore, RoleDefinition } from '../../lib/blogStore';

interface Props {
  onShowToast: (msg: string) => void;
}

export default function CmsRolesManager({ onShowToast }: Props) {
  const [roles, setRoles] = useState<RoleDefinition[]>(() => blogStore.getRoles());

  const togglePermission = (roleId: string, permKey: keyof RoleDefinition['permissions']) => {
    const updated = roles.map(r => {
      if (r.id === roleId) {
        return {
          ...r,
          permissions: {
            ...r.permissions,
            [permKey]: !r.permissions[permKey]
          }
        };
      }
      return r;
    });
    blogStore.saveRoles(updated);
    setRoles(updated);
    onShowToast('Role permissions updated');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#411548] p-6 md:p-8 rounded-3xl text-white shadow-lg space-y-4 border border-[#C5A059]/30">
        <div className="flex items-center gap-3">
          <UserCheck className="w-6 h-6 text-[#C5A059]" />
          <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight">Staff Roles & Permissions Manager</h2>
        </div>
        <p className="text-xs md:text-sm text-white/80 font-light max-w-3xl">
          Role-based governance for licensed directors, family counselors, mortuary residents, and operations associates.
        </p>
      </div>

      {/* Roles Cards & Permission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map(role => (
          <div key={role.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif font-black text-base text-gray-900">{role.name}</h3>
                  <p className="text-xs text-gray-500 font-light mt-0.5">{role.description}</p>
                </div>
                <span className="px-2.5 py-1 bg-[#411548]/10 text-[#411548] rounded-full text-[10px] font-black uppercase shrink-0">
                  {role.assignedUsersCount} Staff
                </span>
              </div>

              {/* Permissions Checklist */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Granted Capabilities</p>
                
                {[
                  { key: 'canPublishArticles' as const, label: 'Publish & Edit Memorial Articles' },
                  { key: 'canManageVacancies' as const, label: 'Post & Review Career Openings' },
                  { key: 'canViewInquiries' as const, label: 'View Family Inquiries & Leads' },
                  { key: 'canManageMedia' as const, label: 'Upload Digital Media & Chapels' },
                  { key: 'canEditSystemSettings' as const, label: 'Configure Core System Settings' }
                ].map(p => {
                  const isEnabled = role.permissions[p.key];
                  return (
                    <button
                      key={p.key}
                      onClick={() => togglePermission(role.id, p.key)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs hover:bg-gray-50 transition-colors text-left cursor-pointer"
                    >
                      <span className="font-medium text-gray-700">{p.label}</span>
                      <span className={`p-1 rounded-md ${isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-400'}`}>
                        {isEnabled ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <X className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic pt-2 border-t border-gray-100">
              Click any permission above to toggle access for this role group.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
