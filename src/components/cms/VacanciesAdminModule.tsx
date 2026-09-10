import React, { useState, useMemo } from 'react';
import { 
  Briefcase, Plus, Search, Download, FileText, CheckCircle2, 
  Clock, AlertCircle, AlertTriangle, Building2, MapPin, Users, Calendar, Eye, Edit3, 
  Trash2, FileSpreadsheet, Printer, Layers, UserCheck, X, ShieldCheck, Flame, ArrowLeft, Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  useJobs, Vacancy, JobApplication, KENYAN_COUNTIES
} from '../../hooks/useJobs';
import { exportPdfReport, printHtmlReport } from '../../lib/pdfPrintUtils';

export default function VacanciesAdminModule({ className = '' }: { className?: string }) {
  const { 
    vacancies, categories, departments, applications, 
    addVacancy, updateVacancy, deleteVacancy, 
    setCategories, setDepartments, updateApplicationStatus 
  } = useJobs();

  // Navigation state within Vacancies Module
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'listings' | 'all_vacancies' | 'categories_departments' | 
    'applications' | 'reports'
  >('listings');

  // Toggle for inline vacancy creation/editing form and posting mode
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [postingMode, setPostingMode] = useState<'single' | 'batch'>('single');

  // Batch vacancy posting state
  const [batchVacancies, setBatchVacancies] = useState<Array<{
    id: string;
    title: string;
    refNumber: string;
    department: string;
    category: string;
    employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
    location: string;
    positionsCount: number;
    deadline: string;
    summary: string;
  }>>([
    {
      id: 'batch-1',
      title: 'Licensed Funeral Director & Embalmer',
      refNumber: 'MFS-VAC-2026-B01',
      department: 'Mortuary Science & Care',
      category: 'Mortuary Science & Care',
      employmentType: 'Full-Time',
      location: 'Minneapolis Main Chapel',
      positionsCount: 1,
      deadline: '2026-09-30',
      summary: 'Conduct compassionate family arrangement conferences, embalming care, and direct chapel ceremonies.'
    },
    {
      id: 'batch-2',
      title: 'Advance Planning Counselor',
      refNumber: 'MFS-VAC-2026-B02',
      department: 'Advance Planning & Pre-Need',
      category: 'Advance Planning & Pre-Need',
      employmentType: 'Full-Time',
      location: 'St. Paul Chapel',
      positionsCount: 2,
      deadline: '2026-10-05',
      summary: 'Advise Twin Cities families on pre-need trusts, funeral pre-funding, and legacy arrangements.'
    },
    {
      id: 'batch-3',
      title: 'Family Concierge & Reception Specialist',
      refNumber: 'MFS-VAC-2026-B03',
      department: 'Administration & Family Concierge',
      category: 'Administration & Family Concierge',
      employmentType: 'Full-Time',
      location: 'Bloomington Memorial Center',
      positionsCount: 1,
      deadline: '2026-09-25',
      summary: 'Warmly receive client families, manage service registrations, and assist funeral directors.'
    }
  ]);

  // Category & Department Addition/Editing State
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [newCategoryForm, setNewCategoryForm] = useState({ name: '', code: '', description: '' });

  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [newDeptForm, setNewDeptForm] = useState({ name: '', code: '', head: '' });

  // Active / Selected Application for details modal
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [editingVacancyId, setEditingVacancyId] = useState<string | null>(null);

  // Search & Filter states
  const [vacSearch, setVacSearch] = useState('');
  const [vacStatusFilter, setVacStatusFilter] = useState('All');
  const [vacDeptFilter, setVacDeptFilter] = useState('All');

  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState('All');
  const [appDeptFilter, setAppDeptFilter] = useState('All');
  const [appCountyFilter, setAppCountyFilter] = useState('All');

  const [listingsSearch, setListingsSearch] = useState('');
  const [listingsDeptFilter, setListingsDeptFilter] = useState('All');

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    itemName?: string;
    message?: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: 'Confirm Deletion',
    onConfirm: () => {}
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Vacancy Form State
  const [vacForm, setVacForm] = useState({
    title: '',
    refNumber: `MFS-VAC-2026-0${Math.floor(10 + Math.random() * 90)}`,
    department: 'Mortuary Science & Care',
    category: 'Mortuary Science & Care',
    employmentType: 'Full-Time' as 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship',
    location: 'Minneapolis Main Chapel (Hennepin County)',
    workArrangement: 'On-site' as 'On-site' | 'Hybrid' | 'Remote',
    summary: '',
    responsibilitiesStr: 'Coordinate respectful family arrangement conferences.\nDirect chapel and memorial service proceedings.\nEnsure compliance with Minnesota Department of Health standards.',
    minQualificationsStr: 'Bachelor Degree or Mortuary Science Diploma.\nMinnesota Mortuary Science License or relevant credential.',
    requiredExperience: '2+ years professional experience in funeral service or mortuary care in Minnesota.',
    requiredSkillsStr: 'Compassionate Family Care, Arrangement Counseling, Minnesota EDRS, Ceremony Direction',
    preferredSkillsStr: 'Celebrant Certification, Valid Driver License',
    benefitsStr: 'Competitive Compensation, Comprehensive Health Insurance, 401(k) Match, Paid Time Off',
    workingHours: 'Monday – Friday: 8:30 AM – 5:00 PM',
    positionsCount: 1,
    deadline: '2026-10-30',
    expectedStartDate: '2026-11-15',
    status: 'Published' as 'Published' | 'Draft' | 'Scheduled' | 'Closed' | 'Archived',
    scheduledDate: '2026-10-01',
    scheduledTime: '08:00',
    scheduledNotifyApplicants: true,
    isFeatured: false,
    isUrgent: false,
    seoTitle: '',
    metaDescription: '',
    slug: ''
  });

  const handleOpenCreateVacancy = () => {
    setEditingVacancyId(null);
    setVacForm({
      title: '',
      refNumber: `MFS-VAC-2026-0${Math.floor(10 + Math.random() * 90)}`,
      department: departments[0]?.name || 'Mortuary Science & Care',
      category: categories[0]?.name || 'Mortuary Science & Care',
      employmentType: 'Full-Time',
      location: 'Minneapolis Main Chapel (Hennepin County)',
      workArrangement: 'On-site',
      summary: '',
      responsibilitiesStr: 'Coordinate respectful family arrangement conferences.\nDirect chapel and memorial service proceedings.\nEnsure compliance with Minnesota Department of Health standards.',
      minQualificationsStr: 'Bachelor Degree or Mortuary Science Diploma.\nMinnesota Mortuary Science License or relevant credential.',
      requiredExperience: '2+ years professional experience in funeral service or mortuary care in Minnesota.',
      requiredSkillsStr: 'Compassionate Family Care, Arrangement Counseling, Minnesota EDRS, Ceremony Direction',
      preferredSkillsStr: 'Celebrant Certification, Valid Driver License',
      benefitsStr: 'Competitive Compensation, Comprehensive Health Insurance, 401(k) Match, Paid Time Off',
      workingHours: 'Monday – Friday: 8:30 AM – 5:00 PM',
      positionsCount: 1,
      deadline: '2026-10-30',
      expectedStartDate: '2026-11-15',
      status: 'Published',
      scheduledDate: '2026-10-01',
      scheduledTime: '08:00',
      scheduledNotifyApplicants: true,
      isFeatured: false,
      isUrgent: false,
      seoTitle: '',
      metaDescription: '',
      slug: ''
    });
    setShowPublishForm(true);
    setActiveTab('all_vacancies');
  };

  const handleEditVacancy = (v: Vacancy) => {
    setEditingVacancyId(v.id);
    setVacForm({
      title: v.title,
      refNumber: v.refNumber,
      department: v.department,
      category: v.category,
      employmentType: v.employmentType,
      location: v.location,
      workArrangement: v.workArrangement,
      summary: v.summary,
      responsibilitiesStr: v.responsibilities.join('\n'),
      minQualificationsStr: v.minQualifications.join('\n'),
      requiredExperience: v.requiredExperience,
      requiredSkillsStr: v.requiredSkills.join(', '),
      preferredSkillsStr: v.preferredSkills.join(', '),
      benefitsStr: v.benefits.join(', '),
      workingHours: v.workingHours,
      positionsCount: v.positionsCount,
      deadline: v.deadline,
      expectedStartDate: v.expectedStartDate,
      status: v.status,
      scheduledDate: '2026-09-01',
      scheduledTime: '08:00',
      scheduledNotifyApplicants: true,
      isFeatured: !!v.isFeatured,
      isUrgent: !!v.isUrgent,
      seoTitle: v.seoTitle || '',
      metaDescription: v.metaDescription || '',
      slug: v.slug
    });
    setShowPublishForm(true);
    setActiveTab('all_vacancies');
  };

  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacForm.title.trim()) {
      showToast('Error: Vacancy Job Title is required.');
      return;
    }

    const respArray = vacForm.responsibilitiesStr.split('\n').filter(s => s.trim().length > 0);
    const qualArray = vacForm.minQualificationsStr.split('\n').filter(s => s.trim().length > 0);
    const reqSkills = vacForm.requiredSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const prefSkills = vacForm.preferredSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const benArray = vacForm.benefitsStr.split(',').map(s => s.trim()).filter(Boolean);
    const generatedSlug = vacForm.slug || vacForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingVacancyId) {
      updateVacancy(editingVacancyId, {
        title: vacForm.title,
        refNumber: vacForm.refNumber,
        department: vacForm.department,
        category: vacForm.category,
        employmentType: vacForm.employmentType,
        location: vacForm.location,
        workArrangement: vacForm.workArrangement,
        summary: vacForm.summary,
        responsibilities: respArray,
        minQualifications: qualArray,
        requiredExperience: vacForm.requiredExperience,
        requiredSkills: reqSkills,
        preferredSkills: prefSkills,
        benefits: benArray,
        workingHours: vacForm.workingHours,
        positionsCount: vacForm.positionsCount,
        deadline: vacForm.deadline,
        expectedStartDate: vacForm.expectedStartDate,
        status: vacForm.status,
        isFeatured: vacForm.isFeatured,
        isUrgent: vacForm.isUrgent,
        seoTitle: vacForm.seoTitle || `${vacForm.title} | Middleton Funeral Services Careers`,
        metaDescription: vacForm.metaDescription || vacForm.summary,
        slug: generatedSlug
      });
      showToast('Vacancy updated successfully!');
    } else {
      addVacancy({
        title: vacForm.title,
        refNumber: vacForm.refNumber,
        department: vacForm.department,
        category: vacForm.category,
        employmentType: vacForm.employmentType,
        location: vacForm.location,
        workArrangement: vacForm.workArrangement,
        summary: vacForm.summary,
        responsibilities: respArray,
        minQualifications: qualArray,
        requiredExperience: vacForm.requiredExperience,
        requiredSkills: reqSkills,
        preferredSkills: prefSkills,
        benefits: benArray,
        workingHours: vacForm.workingHours,
        positionsCount: vacForm.positionsCount,
        deadline: vacForm.deadline,
        expectedStartDate: vacForm.expectedStartDate,
        status: vacForm.status,
        isFeatured: vacForm.isFeatured,
        isUrgent: vacForm.isUrgent,
        seoTitle: vacForm.seoTitle || `${vacForm.title} | Middleton Funeral Services Careers`,
        metaDescription: vacForm.metaDescription || vacForm.summary,
        slug: generatedSlug
      });
      showToast(vacForm.status === 'Scheduled' ? `Vacancy scheduled!` : 'New Vacancy published successfully!');
    }
    setShowPublishForm(false);
    setEditingVacancyId(null);
    setActiveTab('all_vacancies');
  };

  const handleBatchPublishVacancies = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchVacancies.length === 0) {
      showToast('Error: Please add at least one vacancy.');
      return;
    }
    let count = 0;
    batchVacancies.forEach(bv => {
      if (bv.title.trim()) {
        addVacancy({
          title: bv.title,
          refNumber: bv.refNumber || `MFS-VAC-${Date.now()}`,
          department: bv.department || departments[0]?.name || 'Mortuary Science & Care',
          category: bv.category || categories[0]?.name || 'Mortuary Science & Care',
          employmentType: bv.employmentType || 'Full-Time',
          location: bv.location || 'Minneapolis Main Chapel',
          workArrangement: 'On-site',
          summary: bv.summary || `${bv.title} at Middleton Funeral Services.`,
          responsibilities: ['Provide dignified care and coordinate services in accordance with family traditions.'],
          minQualifications: ['Relevant accredited degree, certification, or mortuary license.'],
          requiredExperience: '2+ years relevant professional experience.',
          requiredSkills: ['Compassionate communication', 'Attention to detail', 'Ethical standards'],
          preferredSkills: ['Minnesota Mortuary Regulatory Knowledge'],
          benefits: ['Health, dental & vision insurance', '401(k) matching', 'Paid time off'],
          workingHours: 'Mon - Fri 8:30 AM - 5:00 PM',
          positionsCount: bv.positionsCount || 1,
          deadline: bv.deadline || '2026-09-30',
          expectedStartDate: '2026-10-15',
          status: 'Published',
          isFeatured: false,
          isUrgent: false,
          seoTitle: `${bv.title} | Middleton Funeral Services Careers`,
          metaDescription: bv.summary,
          slug: bv.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        });
        count++;
      }
    });
    showToast(`Successfully published ${count} vacancies simultaneously!`);
    setShowPublishForm(false);
    setActiveTab('all_vacancies');
  };

  const filteredVacancies = useMemo(() => {
    return vacancies.filter(v => {
      if (v.status === 'Archived') return false;
      const matchSearch = v.title.toLowerCase().includes(vacSearch.toLowerCase()) || 
                          v.refNumber.toLowerCase().includes(vacSearch.toLowerCase()) ||
                          v.location.toLowerCase().includes(vacSearch.toLowerCase());
      const matchStatus = vacStatusFilter === 'All' || v.status === vacStatusFilter;
      const matchDept = vacDeptFilter === 'All' || v.department === vacDeptFilter;
      return matchSearch && matchStatus && matchDept;
    });
  }, [vacancies, vacSearch, vacStatusFilter, vacDeptFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter(a => {
      const name = `${a.identity.firstName} ${a.identity.surname}`.toLowerCase();
      const matchSearch = name.includes(appSearch.toLowerCase()) || 
                          a.appNumber.toLowerCase().includes(appSearch.toLowerCase()) ||
                          a.vacancyTitle.toLowerCase().includes(appSearch.toLowerCase()) ||
                          a.identity.nationalId.includes(appSearch) ||
                          a.identity.phone.includes(appSearch);
      const matchStatus = appStatusFilter === 'All' || a.status === appStatusFilter;
      const matchDept = appDeptFilter === 'All' || a.department === appDeptFilter;
      const matchCounty = appCountyFilter === 'All' || a.identity.county === appCountyFilter;
      return matchSearch && matchStatus && matchDept && matchCounty;
    });
  }, [applications, appSearch, appStatusFilter, appDeptFilter, appCountyFilter]);

  const publishedVacancies = useMemo(() => {
    return vacancies.filter(v => v.status === 'Published');
  }, [vacancies]);

  const expiredPublishedCount = useMemo(() => {
    return publishedVacancies.filter(v => v.deadline && new Date(v.deadline) < new Date()).length;
  }, [publishedVacancies]);

  const filteredListings = useMemo(() => {
    return publishedVacancies.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(listingsSearch.toLowerCase()) ||
                            v.refNumber.toLowerCase().includes(listingsSearch.toLowerCase());
      const matchesDept = listingsDeptFilter === 'All' || v.department === listingsDeptFilter;
      return matchesSearch && matchesDept;
    });
  }, [publishedVacancies, listingsSearch, listingsDeptFilter]);

  const activeVacanciesCount = vacancies.filter(v => v.status === 'Published').length;
  const totalAppsCount = applications.length;
  const totalViews = vacancies.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const conversionRate = totalViews > 0 ? ((totalAppsCount / totalViews) * 100).toFixed(1) : '0.0';

  const handleExportApplicationsCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "App Number,Applicant Name,License/National ID,State ID/Tax ID,Phone,Email,County,Vacancy,Department,Status,Submission Date\n";
    applications.forEach(a => {
      const name = `${a.identity.firstName} ${a.identity.surname}`;
      csvContent += `"${a.appNumber}","${name}","${a.identity.nationalId}","${a.identity.kraPin}","${a.identity.phone}","${a.identity.email}","${a.identity.county}","${a.vacancyTitle}","${a.department}","${a.status}","${a.submissionDate}"\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Middleton_Funeral_Services_Job_Applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Applications to CSV!');
  };

  const handleExportVacanciesPDF = () => {
    if (vacancies.length === 0) return showToast('No vacancies to export.');
    const columns = ['Ref No.', 'Job Title', 'Department', 'Category', 'Type', 'Positions', 'Deadline', 'Status'];
    const rows = vacancies.map(v => [v.refNumber, v.title, v.department, v.category, v.employmentType, v.positionsCount, v.deadline, v.status]);
    exportPdfReport({
      title: 'Middleton Funeral & Cremation Services - Published Vacancies Roster',
      subtitle: `Total Active Vacancies: ${vacancies.length}`,
      columns, rows,
      filename: `Middleton_Vacancies_${new Date().toISOString().split('T')[0]}.pdf`
    });
  };

  const handlePrintVacanciesReport = () => {
    if (vacancies.length === 0) return showToast('No vacancies to print.');
    const columns = ['Ref No.', 'Job Title', 'Department', 'Category', 'Type', 'Positions', 'Deadline', 'Status'];
    const rows = vacancies.map(v => [v.refNumber, v.title, v.department, v.category, v.employmentType, v.positionsCount, v.deadline, v.status]);
    printHtmlReport({
      title: 'Middleton Funeral Services - Published Vacancies Roster',
      subtitle: `Total Active Positions: ${vacancies.length}`,
      columns, rows
    });
  };

  const handleExportApplicationsPDF = () => {
    if (applications.length === 0) return showToast('No applications to export.');
    const columns = ['App No.', 'Applicant Name', 'ID/License', 'Phone', 'County', 'Vacancy', 'Status', 'Submitted'];
    const rows = applications.map(a => [a.appNumber, `${a.identity.firstName} ${a.identity.surname}`, a.identity.nationalId, a.identity.phone, a.identity.county, a.vacancyTitle, a.status, a.submissionDate]);
    exportPdfReport({
      title: 'Middleton Funeral & Cremation Services - Job Applications Report',
      subtitle: `Total Applications: ${applications.length}`,
      columns, rows,
      filename: `Middleton_Job_Applications_${new Date().toISOString().split('T')[0]}.pdf`
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#411548] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#C5A059]/40 flex items-center gap-3 font-bold text-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#411548] via-[#2a0b30] to-[#411548] text-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#C5A059]/30 relative overflow-hidden space-y-4">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Briefcase className="w-48 h-48 text-[#C5A059]" />
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
            <Briefcase className="w-6 h-6 text-[#C5A059] shrink-0" />
            <span>VACANCIES MANAGEMENT MODULE</span>
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#C5A059] text-[#2a0b30] font-black text-[10px] uppercase tracking-wider rounded-full shadow-xs">
              Recruitment System
            </span>
            <span className="px-2.5 py-1 bg-white/10 text-white font-bold text-[10px] uppercase rounded-full border border-white/20">
              Minnesota MDH & EEO Compliant
            </span>
          </div>
        </div>

        <p className="relative z-10 text-xs md:text-sm text-white/85 font-medium leading-relaxed max-w-4xl">
          Manage vacancy lifecycles, publish positions, review candidate applications, and export HR recruitment reports.
        </p>

        <div className="relative z-10 pt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleOpenCreateVacancy}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#C5A059] hover:bg-[#b08b46] text-[#2a0b30] font-black text-xs uppercase rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Publish Vacancy</span>
          </button>
          <button
            type="button"
            onClick={handleExportVacanciesPDF}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#C5A059]" />
            <span>Export PDF</span>
          </button>
          <button
            type="button"
            onClick={handlePrintVacanciesReport}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Printer className="w-4 h-4 text-[#C5A059]" />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#C5A059]" />
            <span>Reports</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5 relative z-10">
          {[
            { id: 'dashboard', label: 'Overview', icon: Eye, badge: activeVacanciesCount },
            { id: 'listings', label: 'Listings', icon: Briefcase, badge: publishedVacancies.length },
            { id: 'all_vacancies', label: 'Vacancies', icon: Layers, badge: vacancies.length },
            { id: 'categories_departments', label: 'CAT & DEPT', icon: Building2, badge: categories.length + departments.length },
            { id: 'applications', label: 'Applications', icon: UserCheck, badge: totalAppsCount },
            { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive 
                    ? 'bg-white text-[#411548] shadow-xs font-black' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                    isActive ? 'bg-[#411548] text-[#C5A059]' : 'bg-white/20 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB: LISTINGS ================= */}
      {activeTab === 'listings' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-[#411548] p-6 rounded-3xl text-white shadow-lg flex flex-col gap-4 relative overflow-hidden border border-[#C5A059]/30">
            <div className="space-y-1.5 z-10">
              <span className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                Careers Portal Sync
              </span>
              <h3 className="font-black text-xl text-white uppercase tracking-tight">
                Live Posted Vacancies ({publishedVacancies.length})
              </h3>
            </div>
            <p className="text-xs text-white/80 font-medium max-w-3xl leading-relaxed z-10">
              Positions listed here are live and viewable by candidates on the public Careers page. Manage, unlist upon deadline expiry, or delete postings directly.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 z-10 pt-1">
              <button
                type="button"
                onClick={() => {
                  let unlistedCount = 0;
                  vacancies.forEach(v => {
                    if (v.status === 'Published' && v.deadline && new Date(v.deadline) < new Date()) {
                      updateVacancy(v.id, { status: 'Closed' });
                      unlistedCount++;
                    }
                  });
                  showToast(unlistedCount > 0 ? `Unlisted ${unlistedCount} expired vacancies!` : 'No published vacancies are expired.');
                }}
                className="px-4 py-2.5 bg-[#C5A059] text-[#2a0b30] hover:bg-[#b08b46] font-black text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Clock className="w-4 h-4" />
                <span>Unlist All Expired ({expiredPublishedCount})</span>
              </button>
              <button
                type="button"
                onClick={handleOpenCreateVacancy}
                className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-black text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center gap-2 border border-white/20"
              >
                <Plus className="w-4 h-4 text-[#C5A059]" />
                <span>New Vacancy</span>
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={listingsSearch}
                onChange={e => setListingsSearch(e.target.value)}
                placeholder="Filter live listings by title, ref..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#411548]"
              />
            </div>
            <select
              value={listingsDeptFilter}
              onChange={e => setListingsDeptFilter(e.target.value)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548]"
            >
              <option value="All">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredListings.length === 0 ? (
              <div className="col-span-full p-12 bg-white rounded-3xl border border-gray-200 text-center space-y-3">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
                <h4 className="font-black text-sm text-gray-700 uppercase">No Live Listings Match Criteria</h4>
              </div>
            ) : (
              filteredListings.map(v => {
                const isExpired = v.deadline && new Date(v.deadline) < new Date();
                return (
                  <div key={v.id} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs hover:border-[#411548]/40 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-black text-sm text-[#411548] block">{v.title}</span>
                          <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md inline-block">
                            {v.refNumber}
                          </span>
                        </div>
                        {isExpired ? (
                          <span className="px-2.5 py-1 bg-red-100 text-red-800 text-[10px] font-black uppercase rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Expired
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-full">
                            Live
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-gray-600">
                        <div><span className="text-[10px] text-gray-400 block font-bold uppercase">Department</span><strong>{v.department}</strong></div>
                        <div><span className="text-[10px] text-gray-400 block font-bold uppercase">Deadline</span><span className={`font-mono font-bold ${isExpired ? 'text-red-600' : 'text-gray-900'}`}>{v.deadline}</span></div>
                      </div>
                      {v.summary && <p className="text-xs text-gray-500 line-clamp-2 pt-1">{v.summary}</p>}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-gray-900">{v.applicationsCount || 0} Applications</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => { updateVacancy(v.id, { status: 'Closed' }); showToast(`Unlisted "${v.title}".`); }}
                          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs uppercase rounded-xl cursor-pointer border border-amber-200"
                        >
                          <Archive className="w-3.5 h-3.5 inline mr-1" /> Unlist
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteConfirmModal({
                              isOpen: true,
                              title: 'Delete Live Vacancy',
                              itemName: v.title,
                              message: `Are you sure you want to permanently delete vacancy "${v.title}"?`,
                              onConfirm: () => { deleteVacancy(v.id); showToast(`Vacancy "${v.title}" deleted.`); }
                            });
                          }}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline mr-1" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ================= TAB: OVERVIEW ================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#411548] border border-gray-200 shadow-xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500">Active Vacancies</span>
              <p className="text-2xl font-black text-[#411548]">{activeVacanciesCount}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-[#C5A059] border border-gray-200 shadow-xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500">Applications Received</span>
              <p className="text-2xl font-black text-gray-900">{totalAppsCount}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-blue-600 border border-gray-200 shadow-xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500">Vacancy Views</span>
              <p className="text-2xl font-black text-gray-900">{totalViews}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border-t-4 border-t-purple-600 border border-gray-200 shadow-xs space-y-1">
              <span className="text-[10px] font-black uppercase text-gray-500">Conversion Rate</span>
              <p className="text-2xl font-black text-purple-900">{conversionRate}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase">Recent Applications</h3>
              <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-[#411548] hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {applications.slice(0, 5).map(app => (
                <div key={app.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="font-black text-xs text-[#411548]">{app.identity.firstName} {app.identity.surname}</span>
                    <span className="text-[11px] text-gray-500 block">{app.vacancyTitle} • {app.identity.county} County</span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: ALL VACANCIES DIRECTORY ================= */}
      {activeTab === 'all_vacancies' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Publish / Edit Vacancy Form */}
          {showPublishForm && (
            <div className="bg-white rounded-2xl border-2 border-[#411548]/20 shadow-lg p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPublishForm(false)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                  </button>
                  <h3 className="font-black text-sm text-[#411548] uppercase">
                    {editingVacancyId ? 'Edit Vacancy' : 'Publish New Vacancy'}
                  </h3>
                </div>

                {!editingVacancyId && (
                  <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setPostingMode('single')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${postingMode === 'single' ? 'bg-[#411548] text-white' : 'text-gray-600'}`}
                    >
                      Single
                    </button>
                    <button
                      type="button"
                      onClick={() => setPostingMode('batch')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${postingMode === 'batch' ? 'bg-[#411548] text-[#C5A059]' : 'text-gray-600'}`}
                    >
                      Batch ({batchVacancies.length})
                    </button>
                  </div>
                )}
              </div>

              {postingMode === 'batch' && !editingVacancyId ? (
                <form onSubmit={handleBatchPublishVacancies} className="space-y-4">
                  {batchVacancies.map((bv, idx) => (
                    <div key={bv.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                      <span className="font-black text-xs text-[#411548] uppercase">Position #{idx + 1}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <input
                          type="text"
                          value={bv.title}
                          onChange={e => setBatchVacancies(prev => prev.map(b => b.id === bv.id ? { ...b, title: e.target.value } : b))}
                          placeholder="Job Title *"
                          required
                          className="p-2 bg-white border border-gray-300 rounded-xl font-bold"
                        />
                        <input
                          type="text"
                          value={bv.location}
                          onChange={e => setBatchVacancies(prev => prev.map(b => b.id === bv.id ? { ...b, location: e.target.value } : b))}
                          placeholder="Location"
                          className="p-2 bg-white border border-gray-300 rounded-xl"
                        />
                        <input
                          type="date"
                          value={bv.deadline}
                          onChange={e => setBatchVacancies(prev => prev.map(b => b.id === bv.id ? { ...b, deadline: e.target.value } : b))}
                          className="p-2 bg-white border border-gray-300 rounded-xl"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="submit" className="px-6 py-2.5 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl cursor-pointer">
                      Publish All Batch Vacancies
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveVacancy} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Job Title *</label>
                      <input
                        type="text"
                        value={vacForm.title}
                        onChange={e => setVacForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-bold text-gray-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Ref Number</label>
                      <input
                        type="text"
                        value={vacForm.refNumber}
                        onChange={e => setVacForm(prev => ({ ...prev, refNumber: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Department</label>
                      <select
                        value={vacForm.department}
                        onChange={e => setVacForm(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-bold"
                      >
                        {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Location</label>
                      <input
                        type="text"
                        value={vacForm.location}
                        onChange={e => setVacForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-gray-700">Deadline</label>
                      <input
                        type="date"
                        value={vacForm.deadline}
                        onChange={e => setVacForm(prev => ({ ...prev, deadline: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-gray-700">Role Summary</label>
                    <textarea
                      rows={2}
                      value={vacForm.summary}
                      onChange={e => setVacForm(prev => ({ ...prev, summary: e.target.value }))}
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowPublishForm(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#411548] text-[#C5A059] font-black text-xs uppercase rounded-xl shadow-md cursor-pointer"
                    >
                      {editingVacancyId ? 'Save Changes' : 'Publish Vacancy'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Directory Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-xs text-[#411548] uppercase">Vacancies Directory ({filteredVacancies.length})</h3>
              <button
                onClick={handleOpenCreateVacancy}
                className="px-3 py-1.5 bg-[#411548] text-[#C5A059] font-bold text-xs uppercase rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> New Position
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="p-4">Job Title & Ref</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {filteredVacancies.map(v => (
                    <tr key={v.id} className="hover:bg-amber-50/30">
                      <td className="p-4">
                        <span className="font-black text-xs text-gray-900 block">{v.title}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{v.refNumber}</span>
                      </td>
                      <td className="p-4 font-bold">{v.department}</td>
                      <td className="p-4">{v.location}</td>
                      <td className="p-4 font-mono">{v.deadline}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${v.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => handleEditVacancy(v)} className="p-1.5 hover:bg-gray-100 rounded-lg cursor-pointer">
                            <Edit3 className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => {
                              updateVacancy(v.id, { status: v.status === 'Published' ? 'Closed' : 'Published' });
                              showToast(`Status updated to ${v.status === 'Published' ? 'Closed' : 'Published'}`);
                            }}
                            className="p-1.5 hover:bg-amber-50 rounded-lg cursor-pointer text-amber-700"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteConfirmModal({
                                isOpen: true,
                                title: 'Delete Vacancy',
                                itemName: v.title,
                                message: `Permanently delete "${v.title}"?`,
                                onConfirm: () => { deleteVacancy(v.id); showToast('Deleted.'); }
                              });
                            }}
                            className="p-1.5 hover:bg-red-50 rounded-lg cursor-pointer text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: CAT & DEPT ================= */}
      {activeTab === 'categories_departments' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-sm text-[#411548] uppercase">Categories ({categories.length})</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = prompt('Enter new Category name:');
                    if (name) {
                      setCategories(prev => [...prev, { id: `cat-${Date.now()}`, name, code: name.slice(0, 3).toUpperCase() }]);
                      showToast(`Added category "${name}"`);
                    }
                  }}
                  className="px-3 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-bold rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Category
                </button>
              </div>
              <div className="space-y-2">
                {categories.map(c => (
                  <div key={c.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900">{c.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono ml-2">[{c.code}]</span>
                    </div>
                    <button
                      onClick={() => setCategories(prev => prev.filter(item => item.id !== c.id))}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-sm text-[#411548] uppercase">Departments ({departments.length})</h3>
                <button
                  type="button"
                  onClick={() => {
                    const name = prompt('Enter new Department name:');
                    if (name) {
                      setDepartments(prev => [...prev, { id: `dept-${Date.now()}`, name, code: name.slice(0, 3).toUpperCase(), head: 'Lead' }]);
                      showToast(`Added department "${name}"`);
                    }
                  }}
                  className="px-3 py-1.5 bg-[#411548] text-[#C5A059] text-xs font-bold rounded-xl cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 inline mr-1" /> Add Department
                </button>
              </div>
              <div className="space-y-2">
                {departments.map(d => (
                  <div key={d.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-gray-900">{d.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono ml-2">[{d.code}]</span>
                    </div>
                    <button
                      onClick={() => setDepartments(prev => prev.filter(item => item.id !== d.id))}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: APPLICATIONS ================= */}
      {activeTab === 'applications' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
            <h3 className="font-black text-xs text-[#411548] uppercase">Candidate Applications ({filteredApplications.length})</h3>
            <button
              onClick={handleExportApplicationsCSV}
              className="px-4 py-2 bg-[#411548] text-[#C5A059] font-bold text-xs uppercase rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 inline mr-1" /> Export CSV
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-extrabold uppercase border-b border-gray-100">
                  <tr>
                    <th className="p-4">Candidate & App No.</th>
                    <th className="p-4">Target Vacancy</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">County</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {filteredApplications.map(app => (
                    <tr key={app.id} className="hover:bg-amber-50/30">
                      <td className="p-4">
                        <span className="font-black text-xs text-[#411548] block">{app.identity.firstName} {app.identity.surname}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{app.appNumber}</span>
                      </td>
                      <td className="p-4 font-bold">{app.vacancyTitle}</td>
                      <td className="p-4">{app.identity.phone}</td>
                      <td className="p-4">{app.identity.county} County</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-3 py-1.5 bg-[#411548] text-[#C5A059] font-bold text-xs uppercase rounded-xl cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: REPORTS ================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-black text-xs text-[#411548] uppercase">Vacancies Roster Report</h4>
              <p className="text-xs text-gray-500">Official print or PDF export of all active and scheduled vacancies.</p>
              <div className="flex gap-2">
                <button onClick={handleExportVacanciesPDF} className="flex-1 py-2 bg-[#411548] text-white font-bold text-xs rounded-xl cursor-pointer">
                  Export PDF
                </button>
                <button onClick={handlePrintVacanciesReport} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl cursor-pointer">
                  Print
                </button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-black text-xs text-[#411548] uppercase">Applications Summary Report</h4>
              <p className="text-xs text-gray-500">Official export of candidate applications across Minnesota counties & regions.</p>
              <div className="flex gap-2">
                <button onClick={handleExportApplicationsPDF} className="flex-1 py-2 bg-[#411548] text-white font-bold text-xs rounded-xl cursor-pointer">
                  Export PDF
                </button>
                <button onClick={handleExportApplicationsCSV} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl cursor-pointer">
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-gray-200"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-black text-base text-[#411548] uppercase">
                    {selectedApp.identity.firstName} {selectedApp.identity.surname}
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">{selectedApp.appNumber} • {selectedApp.vacancyTitle}</span>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl"><strong>National / State ID:</strong> {selectedApp.identity.nationalId}</div>
                <div className="p-3 bg-gray-50 rounded-xl"><strong>License / Tax ID:</strong> {selectedApp.identity.kraPin}</div>
                <div className="p-3 bg-gray-50 rounded-xl"><strong>Phone:</strong> {selectedApp.identity.phone}</div>
                <div className="p-3 bg-gray-50 rounded-xl"><strong>County / Location:</strong> {selectedApp.identity.county} County</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <select
                  value={selectedApp.status}
                  onChange={e => {
                    const s = e.target.value as any;
                    updateApplicationStatus(selectedApp.id, s);
                    setSelectedApp(prev => prev ? { ...prev, status: s } : null);
                    showToast(`Status updated to ${s}`);
                  }}
                  className="p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#411548]"
                >
                  <option value="New">New</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
                <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs uppercase rounded-xl cursor-pointer">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border-2 border-red-500 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-black text-base text-gray-900">{deleteConfirmModal.title}</h3>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              {deleteConfirmModal.message}
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setDeleteConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteConfirmModal.onConfirm();
                  setDeleteConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}
                className="px-4 py-2 bg-red-600 text-white font-black text-xs uppercase rounded-xl cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
