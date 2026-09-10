import React, { useState } from 'react';
import { 
  UserCheck, FileText, Download, Eye, Trash2, Mail, Phone, MapPin, 
  Calendar, CheckCircle2, Clock, X, Search, Filter, ShieldCheck, Briefcase, Award, BookOpen 
} from 'lucide-react';
import { useJobs, JobApplication } from '../../hooks/useJobs';

interface Props {
  onShowToast?: (msg: string) => void;
}

export default function CmsJobApplications({ onShowToast }: Props) {
  const { applications, updateApplicationStatus, vacancies } = useJobs();
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [vacancyFilter, setVacancyFilter] = useState('All');

  const filteredApps = applications.filter(app => {
    const name = `${app.identity.firstName} ${app.identity.surname}`.toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase()) || 
                          app.appNumber.toLowerCase().includes(search.toLowerCase()) ||
                          app.identity.nationalId.includes(search) ||
                          app.identity.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesVac = vacancyFilter === 'All' || app.vacancyId === vacancyFilter || app.vacancyTitle === vacancyFilter;
    return matchesSearch && matchesStatus && matchesVac;
  });

  const handleStatusChange = (appId: string, newStatus: any) => {
    updateApplicationStatus(appId, newStatus);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
    }
    if (onShowToast) {
      onShowToast(`Application status updated to "${newStatus}"`);
    }
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "App Number,Applicant Name,State ID,SSN or License,Phone,Email,County,City,Vacancy,Department,Status,Submission Date\n";
    applications.forEach(a => {
      const name = `${a.identity.firstName} ${a.identity.surname}`;
      csvContent += `"${a.appNumber}","${name}","${a.identity.nationalId}","${a.identity.kraPin}","${a.identity.phone}","${a.identity.email}","${a.identity.county}","${a.identity.subCounty || ''}","${a.vacancyTitle}","${a.department}","${a.status}","${a.submissionDate}"\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Middleton_Job_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onShowToast) onShowToast('Exported candidate applications to CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#411548] p-6 rounded-3xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#C5A059]/30">
        <div>
          <span className="px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] rounded-full text-[10px] font-black uppercase tracking-wider inline-block mb-2">
            HR Recruitment Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#C5A059]" />
            Candidate Applications ({applications.length})
          </h2>
          <p className="text-xs text-white/80 font-medium max-w-xl mt-1">
            Review applicant identities, state credentials, qualifications, mortuary care experience, and references.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08e4c] text-[#2C0E32] font-black text-xs uppercase rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export All CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search candidate name, ID, phone..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#411548]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548] focus:ring-2 focus:ring-[#411548]"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={vacancyFilter}
            onChange={e => setVacancyFilter(e.target.value)}
            className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548] max-w-[200px] focus:ring-2 focus:ring-[#411548]"
          >
            <option value="All">All Vacancies</option>
            {vacancies.map(v => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-extrabold uppercase border-b border-gray-100">
              <tr>
                <th className="p-4">App Code & Candidate</th>
                <th className="p-4">Target Role</th>
                <th className="p-4">Contact</th>
                <th className="p-4">County</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-400 font-bold">
                    No applications matching current filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-purple-50/20">
                    <td className="p-4">
                      <span className="font-black text-xs text-[#411548] block">{app.identity.firstName} {app.identity.surname}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{app.appNumber}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-gray-900 block">{app.vacancyTitle}</span>
                      <span className="text-[10px] text-gray-400">{app.department}</span>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-800">{app.identity.phone}</div>
                      <div className="text-[10px] text-gray-400">{app.identity.email}</div>
                    </td>
                    <td className="p-4 font-bold text-[#411548]">
                      {app.identity.county}
                    </td>
                    <td className="p-4 font-mono text-gray-500">
                      {app.submissionDate}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        app.status === 'Hired' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 bg-[#411548] text-[#C5A059] font-bold text-xs uppercase rounded-xl hover:bg-[#2C0E32] cursor-pointer transition-all"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-black text-[#C5A059] bg-[#411548] px-2.5 py-0.5 rounded-full">
                  {selectedApp.appNumber}
                </span>
                <h3 className="font-black text-lg text-[#411548] uppercase mt-1">
                  {selectedApp.identity.firstName} {selectedApp.identity.middleName ? `${selectedApp.identity.middleName} ` : ''}{selectedApp.identity.surname}
                </h3>
                <p className="text-xs text-gray-500 font-bold">Applying for: {selectedApp.vacancyTitle}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 block font-bold uppercase">State ID / License</span>
                <strong className="font-mono text-gray-900">{selectedApp.identity.nationalId}</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 block font-bold uppercase">SSN (Last 4) / Lic</span>
                <strong className="font-mono text-gray-900">{selectedApp.identity.kraPin}</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Phone</span>
                <strong className="text-gray-900">{selectedApp.identity.phone}</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-[10px] text-gray-400 block font-bold uppercase">County</span>
                <strong className="text-[#411548]">{selectedApp.identity.county}</strong>
              </div>
            </div>

            {/* Education & Experience */}
            {selectedApp.education && selectedApp.education.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="text-xs font-black text-[#411548] uppercase flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" /> Education & Qualifications
                </span>
                {selectedApp.education.map(e => (
                  <div key={e.id} className="text-xs text-gray-700 font-medium">
                    <strong>{e.level}</strong> — {e.institution} ({e.startYear} - {e.endYear})
                  </div>
                ))}
              </div>
            )}

            {/* References */}
            {selectedApp.references && selectedApp.references.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="text-xs font-black text-[#411548] uppercase flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#C5A059]" /> References ({selectedApp.references.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedApp.references.map(r => (
                    <div key={r.id} className="p-2 bg-white rounded-xl border border-gray-200">
                      <div className="font-black text-gray-900">{r.fullName}</div>
                      <div className="text-[10px] text-gray-500">{r.titleRelationship} • {r.company}</div>
                      <div className="text-[10px] text-[#411548] font-mono">{r.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CV Attachment */}
            {selectedApp.cv && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-emerald-900">{selectedApp.cv.fileName}</span>
                  <span className="text-[10px] text-emerald-600 font-mono">({selectedApp.cv.fileSize})</span>
                </div>
                <span className="text-[10px] text-emerald-800 font-bold uppercase bg-emerald-100 px-2 py-0.5 rounded-full">
                  PDF Verified
                </span>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700">Change Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={e => handleStatusChange(selectedApp.id, e.target.value)}
                  className="p-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-[#411548] focus:ring-2 focus:ring-[#411548]"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
