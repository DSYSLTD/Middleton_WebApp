import { useState, useEffect } from 'react';

export const MINNESOTA_COUNTIES = [
  'Hennepin', 'Ramsey', 'Dakota', 'Anoka', 'Washington', 'Carver', 'Scott',
  'Olmsted', 'St. Louis', 'Stearns', 'Wright', 'Sherburne', 'Blue Earth',
  'Rice', 'Winona', 'Clay', 'Crow Wing', 'Chisago', 'Isanti', 'Goodhue',
  'Itasca', 'Beltrami', 'Kandiyohi', 'Mower', 'Otter Tail', 'Douglas'
];

// Alias for backwards compatibility
export const KENYAN_COUNTIES = MINNESOTA_COUNTIES;

export interface EducationRecord {
  id: string;
  level: 'Certificate' | 'Diploma' | 'Higher Diploma' | 'Degree' | 'Masters' | 'PhD';
  institution: string;
  startYear: string;
  endYear: string;
  docName?: string;
}

export interface EmploymentRecord {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  responsibilities: string;
}

export interface MembershipRecord {
  id: string;
  bodyName: string;
  regNumber?: string;
}

export interface ReferenceRecord {
  id: string;
  fullName: string;
  titleRelationship: string;
  company: string;
  yearsKnown: string;
  phone: string;
  email: string;
}

export interface VacancyCategory {
  id: string;
  name: string;
  code: string;
  vacanciesCount?: number;
  description?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  vacanciesCount?: number;
}

export interface Vacancy {
  id: string;
  title: string;
  refNumber: string;
  department: string;
  category: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  location: string;
  workArrangement: 'On-site' | 'Hybrid' | 'Remote';
  summary: string;
  responsibilities: string[];
  minQualifications: string[];
  requiredExperience: string;
  requiredSkills: string[];
  preferredSkills: string[];
  benefits: string[];
  workingHours: string;
  positionsCount: number;
  deadline: string;
  expectedStartDate: string;
  status: 'Published' | 'Draft' | 'Scheduled' | 'Closed' | 'Archived';
  viewsCount: number;
  applicationsCount: number;
  isFeatured?: boolean;
  isUrgent?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  slug: string;
}

export interface JobApplication {
  id: string;
  appNumber: string;
  vacancyId: string;
  vacancyTitle: string;
  vacancyRef: string;
  department: string;
  status: 'New' | 'Shortlisted' | 'Under Review' | 'Interview Scheduled' | 'Rejected' | 'Hired';
  submissionDate: string;
  identity: {
    surname: string;
    firstName: string;
    middleName?: string;
    nationalId: string;
    nationalIdDocName?: string;
    kraPin: string;
    kraPinCertName?: string;
    phone: string;
    email: string;
    county: string;
    subCounty?: string;
    ward?: string;
  };
  education: EducationRecord[];
  employment: EmploymentRecord[];
  memberships?: MembershipRecord[];
  references: ReferenceRecord[];
  cv: { fileName: string; fileSize: string } | null;
  declaration: {
    certifiedTrue: boolean;
    dataConsent: boolean;
  };
}

const STORAGE_KEY_VACANCIES = 'middleton_vacancies_list';
const STORAGE_KEY_CATEGORIES = 'middleton_vacancies_categories';
const STORAGE_KEY_DEPARTMENTS = 'middleton_vacancies_departments';
const STORAGE_KEY_APPLICATIONS = 'middleton_job_applications';

const INITIAL_CATEGORIES: VacancyCategory[] = [
  { id: 'cat-1', name: 'Mortuary Science & Care', code: 'MOR', vacanciesCount: 2, description: 'Embalming, restorative art, clinical care, and Minnesota health regulatory compliance.' },
  { id: 'cat-2', name: 'Funeral Direction & Coordination', code: 'DIR', vacanciesCount: 2, description: 'Family arrangement conferences, service direction, and committal logistics.' },
  { id: 'cat-3', name: 'Advance Planning & Pre-Need', code: 'ADV', vacanciesCount: 1, description: 'Pre-arrangement consultations, estate planning liaison, and pre-funding trusts.' },
  { id: 'cat-4', name: 'Family Care & Grief Support', code: 'GRF', vacanciesCount: 1, description: 'Bereavement aftercare, grief support circles, and community memorial events.' },
  { id: 'cat-5', name: 'Care Operations & Fleet Livery', code: 'TRN', vacanciesCount: 1, description: 'Respectful transfers, ceremonial vehicle fleet, and pallbearer coordination.' },
  { id: 'cat-6', name: 'Administration & Family Concierge', code: 'ADM', vacanciesCount: 1, description: 'Family reception, guest services, vital records registration, and office operations.' }
];

const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Mortuary Science & Care', code: 'MOR', head: 'Director of Mortuary Science', vacanciesCount: 2 },
  { id: 'dept-2', name: 'Funeral Direction & Family Services', code: 'DIR', head: 'Lead Funeral Director', vacanciesCount: 2 },
  { id: 'dept-3', name: 'Advance Planning & Pre-Need', code: 'ADV', head: 'Advance Planning Director', vacanciesCount: 1 },
  { id: 'dept-4', name: 'Family Care & Grief Counseling', code: 'GRF', head: 'Bereavement Care Coordinator', vacanciesCount: 1 },
  { id: 'dept-5', name: 'Transportation & Fleet Livery', code: 'TRN', head: 'Fleet Logistics Supervisor', vacanciesCount: 1 },
  { id: 'dept-6', name: 'Memorial Media & Technology', code: 'MED', head: 'Memorial Technology Specialist', vacanciesCount: 1 }
];

const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 'vac-1',
    title: 'Licensed Funeral Director & Embalmer',
    refNumber: 'MFS-VAC-2026-001',
    department: 'Mortuary Science & Care',
    category: 'Mortuary Science & Care',
    employmentType: 'Full-Time',
    location: 'Minneapolis Main Chapel (Hennepin County)',
    workArrangement: 'On-site',
    summary: 'Lead compassionate family arrangement conferences, execute skilled clinical embalming and restorative art in compliance with Minnesota Department of Health standards, and direct dignified chapel and cemetery committal ceremonies.',
    responsibilities: [
      'Meet with grieving families to plan traditional funerals, memorial celebrations of life, and personalized cremation tributes.',
      'Perform compassionate embalming, restorative art, cosmetology, and casketing according to OSHA and Minnesota state protocols.',
      'Coordinate and direct visitations, chapel services, church ceremonies, and graveside committals with poise and empathy.',
      'File certified death certificates, burial-transit permits, and cremation authorizations through the Minnesota Electronic Death Registration System (EDRS).'
    ],
    minQualifications: [
      'Bachelor of Science in Mortuary Science from an ABFSE-accredited institution.',
      'Current Minnesota Mortuary Science License in good standing (or active state reciprocity eligibility).',
      'Valid Minnesota Driver\'s License with an insurable driving record.'
    ],
    requiredExperience: '2+ years of licensed funeral directing experience in Minnesota or reciprocal jurisdiction.',
    requiredSkills: ['Embalming & Restorative Care', 'Family Arrangement Counseling', 'Minnesota EDRS', 'Cremation Procedures'],
    preferredSkills: ['Certified Celebrant Training', 'Bilingual (English/Spanish or English/Hmong)'],
    benefits: ['Competitive Salary ($78,000 - $94,000/yr)', 'Comprehensive Health, Dental & Vision Insurance', '401(k) with 4% Company Match', 'Continuing Education (CEU) Reimbursement', 'Generous Paid Time Off & Rotating Weekend Schedule'],
    workingHours: 'Monday – Friday: 8:30 AM – 5:00 PM (Rotating on-call schedule)',
    positionsCount: 1,
    deadline: '2026-09-30',
    expectedStartDate: '2026-10-15',
    status: 'Published',
    viewsCount: 428,
    applicationsCount: 12,
    isFeatured: true,
    isUrgent: true,
    seoTitle: 'Licensed Funeral Director & Embalmer | Middleton Funeral Services Careers',
    metaDescription: 'Join Middleton Funeral Services in Minneapolis, MN as a Licensed Funeral Director & Embalmer. Offering compassionate care and competitive compensation.',
    slug: 'licensed-funeral-director-embalmer'
  },
  {
    id: 'vac-2',
    title: 'Family Care & Grief Aftercare Coordinator',
    refNumber: 'MFS-VAC-2026-002',
    department: 'Family Care & Grief Counseling',
    category: 'Family Care & Grief Support',
    employmentType: 'Full-Time',
    location: 'St. Paul Chapel (Ramsey County)',
    workArrangement: 'Hybrid',
    summary: 'Coordinate bereavement support circles, guide families through post-service practical tasks (Social Security notifications, memorial keepsakes, probate referrals), and facilitate our annual candlelight remembrance gatherings.',
    responsibilities: [
      'Provide compassionate 30-day, 90-day, and 1-year bereavement follow-up consultations with client families.',
      'Facilitate monthly grief support circles and specialized remembrance workshops in the Twin Cities community.',
      'Assist families in navigating vital affairs, VA burial benefit paperwork, and memorial book publications.',
      'Organize the Middleton Annual Holiday Candlelight Memorial Service for honoring departed loved ones.'
    ],
    minQualifications: [
      'Degree or formal training in Thanatology, Social Work, Counseling, Psychology, or Pastoral Care.',
      'Demonstrated experience in grief support facilitation, hospice care, or funeral service aftercare.'
    ],
    requiredExperience: '2+ years in bereavement support, social work, or community mental health outreach.',
    requiredSkills: ['Compassionate Grief Counseling', 'Support Group Facilitation', 'Bereavement Literature', 'Community Outreach'],
    preferredSkills: ['Certified Thanatologist (CT®)', 'Crisis Intervention'],
    benefits: ['Competitive Salary ($54,000 - $66,000/yr)', 'Comprehensive Medical, Dental & Vision', 'Hybrid Scheduling Flexibility', 'Professional Development Stipend'],
    workingHours: 'Monday – Friday: 9:00 AM – 5:00 PM (Occasional evening support group)',
    positionsCount: 1,
    deadline: '2026-09-25',
    expectedStartDate: '2026-10-10',
    status: 'Published',
    viewsCount: 310,
    applicationsCount: 18,
    isFeatured: true,
    isUrgent: false,
    seoTitle: 'Family Care & Grief Aftercare Coordinator | Middleton Funeral Services Careers',
    metaDescription: 'Middleton Funeral Services is seeking a Family Care & Aftercare Coordinator in St. Paul, MN.',
    slug: 'family-care-aftercare-coordinator'
  },
  {
    id: 'vac-3',
    title: 'Advance Planning Counselor (Pre-Need Advisor)',
    refNumber: 'MFS-VAC-2026-003',
    department: 'Advance Planning & Pre-Need',
    category: 'Advance Planning & Pre-Need',
    employmentType: 'Full-Time',
    location: 'Twin Cities Metro (Minneapolis / Bloomington)',
    workArrangement: 'Hybrid',
    summary: 'Educate community members and families on the emotional and financial peace of advance funeral planning. Guide individuals through pre-arrangement trusts, service selections, and legacy documentation.',
    responsibilities: [
      'Conduct consultative pre-planning appointments with families in their homes or at our funeral chapels.',
      'Explain Minnesota trust-funded and insurance-funded pre-need options with complete pricing transparency.',
      'Deliver informative educational seminars on advance healthcare directives, legacy planning, and funeral pre-funding.',
      'Maintain diligent record-keeping in accordance with Minnesota Department of Commerce rules.'
    ],
    minQualifications: [
      'Minnesota Life Insurance Producer License (or willingness to obtain within 60 days of hire).',
      'Strong consultative communication skills with a client-centric, non-aggressive advisory style.'
    ],
    requiredExperience: '2+ years in pre-need funeral sales, insurance planning, or financial advisory.',
    requiredSkills: ['Consultative Advisory', 'Pre-Need Trust Administration', 'Public Presentation', 'Compassionate Rapport'],
    preferredSkills: ['Minnesota Mortuary Regulatory Knowledge'],
    benefits: ['Base Salary + Commission Structure ($65,000 - $95,000+ OTE)', 'Health & Dental Insurance', 'Mileage Reimbursement', 'Flexible Schedule'],
    workingHours: 'Monday – Friday: 9:00 AM – 5:00 PM with client appointment flexibility',
    positionsCount: 2,
    deadline: '2026-10-05',
    expectedStartDate: '2026-10-20',
    status: 'Published',
    viewsCount: 385,
    applicationsCount: 14,
    isFeatured: false,
    isUrgent: false,
    seoTitle: 'Advance Planning Counselor | Middleton Funeral Services Careers',
    metaDescription: 'Help families achieve peace of mind as an Advance Planning Counselor with Middleton Funeral Services in Minnesota.',
    slug: 'advance-planning-counselor'
  },
  {
    id: 'vac-4',
    title: 'Mortuary Operations & Fleet Specialist',
    refNumber: 'MFS-VAC-2026-004',
    department: 'Transportation & Fleet Livery',
    category: 'Care Operations & Fleet Livery',
    employmentType: 'Full-Time',
    location: 'Twin Cities Metro Fleet Facility',
    workArrangement: 'On-site',
    summary: 'Conduct dignified first-call transfers with absolute respect and professionalism, maintain our immaculate ceremonial fleet (hearse, limousines, transfer coaches), and assist funeral directors during chapel services and cemetery interments.',
    responsibilities: [
      'Respond promptly to first-call transfer dispatches from residences, care centers, hospices, and medical examiner facilities.',
      'Ensure the highest standards of dignity, reverent care, and strict chain of custody for every decedent.',
      'Clean, detail, and inspect funeral coaches, limousines, and service vehicles before and after ceremonies.',
      'Assist with chapel setup, casket staging, floral transportation, and procession traffic coordination on service days.'
    ],
    minQualifications: [
      'Valid Minnesota Driver\'s License with clean driving history.',
      'Physical ability to lift and maneuver mortuary transfer cots safely (up to 75 lbs unassisted).',
      'Professional, respectful demeanor and impeccable personal presentation.'
    ],
    requiredExperience: '1+ years in mortuary transport, emergency medical transport, or luxury livery service.',
    requiredSkills: ['Decedent Transfer Protocol', 'Fleet Care', 'Pallbearer Assistance', 'Discretion & Dignity'],
    preferredSkills: ['Knowledge of Twin Cities Metro hospitals and roadways'],
    benefits: ['Hourly Wage ($22 - $26/hr + On-Call Shift Differential)', 'Overtime Opportunities', 'Medical & Dental Benefits', 'Uniform & Dry Cleaning Allowance'],
    workingHours: 'Full-Time with scheduled on-call rotation',
    positionsCount: 2,
    deadline: '2026-09-30',
    expectedStartDate: '2026-10-15',
    status: 'Published',
    viewsCount: 275,
    applicationsCount: 21,
    isFeatured: false,
    isUrgent: false,
    seoTitle: 'Mortuary Operations & Fleet Specialist | Middleton Funeral Services Careers',
    metaDescription: 'Join our dedicated care team as a Mortuary Operations & Fleet Specialist at Middleton Funeral Services in Minnesota.',
    slug: 'mortuary-operations-fleet-specialist'
  }
];

const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    appNumber: 'MFS-APP-849201',
    vacancyId: 'vac-1',
    vacancyTitle: 'Licensed Funeral Director & Embalmer',
    vacancyRef: 'MFS-VAC-2026-001',
    department: 'Mortuary Science & Care',
    status: 'Shortlisted',
    submissionDate: '2026-08-14',
    identity: {
      surname: 'Lindstrom',
      firstName: 'Sarah',
      middleName: 'Ann',
      nationalId: 'MN-MS-48291',
      nationalIdDocName: 'Mortuary_License_MN.pdf',
      kraPin: 'DL-L49204817-MN',
      kraPinCertName: 'Minnesota_Drivers_License.pdf',
      phone: '(612) 555-0184',
      email: 's.lindstrom@example.com',
      county: 'Hennepin',
      subCounty: 'Minneapolis',
      ward: 'South Metro'
    },
    education: [
      { id: 'edu-1', level: 'Degree', institution: 'University of Minnesota - Program of Mortuary Science', startYear: '2017', endYear: '2021', docName: 'BS_Mortuary_Science_UMN.pdf' }
    ],
    employment: [
      { id: 'emp-1', company: 'Twin Cities Memorial Chapels', jobTitle: 'Resident Funeral Director & Embalmer', startDate: '2021-06', endDate: '2026-07', isCurrent: false, responsibilities: 'Directed over 180 services annually, handled full embalming, restorative cosmetizing, and family pre-need arrangements.' }
    ],
    memberships: [
      { id: 'mem-1', bodyName: 'Minnesota Funeral Directors Association (MFDA)', regNumber: 'MFDA-9821' },
      { id: 'mem-2', bodyName: 'National Funeral Directors Association (NFDA)', regNumber: 'NFDA-34201' }
    ],
    references: [
      { id: 'ref-1', fullName: 'David H. Carlson', titleRelationship: 'Managing Mortuary Director', company: 'Twin Cities Memorial Chapels', yearsKnown: '4 Years', phone: '(612) 555-0149', email: 'dcarlson@twincitiesmemorial.com' },
      { id: 'ref-2', fullName: 'Prof. Michael K. Vance', titleRelationship: 'Faculty Advisor & Professor', company: 'University of Minnesota Mortuary Science', yearsKnown: '5 Years', phone: '(612) 555-0177', email: 'vance012@umn.edu' },
      { id: 'ref-3', fullName: 'Rev. Elizabeth Walker', titleRelationship: 'Senior Pastor', company: 'St. Andrew Lutheran Church', yearsKnown: '6 Years', phone: '(651) 555-0193', email: 'pastor.walker@standrewmn.org' },
      { id: 'ref-4', fullName: 'Karen E. Larson', titleRelationship: 'Lead Bereavement Counselor', company: 'Hennepin County Grief Services', yearsKnown: '3 Years', phone: '(952) 555-0162', email: 'karen.larson@hennepinhospice.org' }
    ],
    cv: { fileName: 'Sarah_Lindstrom_Funeral_Director_CV.pdf', fileSize: '1.2 MB' },
    declaration: {
      certifiedTrue: true,
      dataConsent: true
    }
  }
];

export function useJobs() {
  const [vacancies, setVacanciesState] = useState<Vacancy[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_VACANCIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_VACANCIES, JSON.stringify(INITIAL_VACANCIES));
        return INITIAL_VACANCIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_VACANCIES;
    }
  });

  const [categories, setCategoriesState] = useState<VacancyCategory[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        return INITIAL_CATEGORIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [departments, setDepartmentsState] = useState<Department[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DEPARTMENTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_DEPARTMENTS, JSON.stringify(INITIAL_DEPARTMENTS));
        return INITIAL_DEPARTMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEPARTMENTS;
    }
  });

  const [applications, setApplicationsState] = useState<JobApplication[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const saveVacancies = (updated: Vacancy[]) => {
    setVacanciesState(updated);
    localStorage.setItem(STORAGE_KEY_VACANCIES, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('middleton_cms_vacancies_updated'));
  };

  const setCategories = (updater: VacancyCategory[] | ((prev: VacancyCategory[]) => VacancyCategory[])) => {
    setCategoriesState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(next));
      return next;
    });
  };

  const setDepartments = (updater: Department[] | ((prev: Department[]) => Department[])) => {
    setDepartmentsState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY_DEPARTMENTS, JSON.stringify(next));
      return next;
    });
  };

  const addVacancy = (newVac: Omit<Vacancy, 'id' | 'viewsCount' | 'applicationsCount'>) => {
    const item: Vacancy = {
      ...newVac,
      id: `vac-${Date.now()}`,
      viewsCount: 0,
      applicationsCount: 0
    };
    const updated = [item, ...vacancies];
    saveVacancies(updated);
    return item;
  };

  const updateVacancy = (id: string, patch: Partial<Vacancy>) => {
    const updated = vacancies.map(v => v.id === id ? { ...v, ...patch } : v);
    saveVacancies(updated);
  };

  const deleteVacancy = (id: string) => {
    const updated = vacancies.filter(v => v.id !== id);
    saveVacancies(updated);
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    const updated = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplicationsState(updated);
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('middleton_cms_applications_updated'));
  };

  const submitJobApplication = (payload: Omit<JobApplication, 'id' | 'appNumber' | 'submissionDate'>) => {
    const appCode = `MFS-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEntry: JobApplication = {
      ...payload,
      id: `app-${Date.now()}`,
      appNumber: appCode,
      submissionDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newEntry, ...applications];
    setApplicationsState(updated);
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(updated));

    // Update applications count on vacancy
    const updatedVacancies = vacancies.map(v => 
      v.id === payload.vacancyId 
        ? { ...v, applicationsCount: (v.applicationsCount || 0) + 1 } 
        : v
    );
    saveVacancies(updatedVacancies);

    window.dispatchEvent(new CustomEvent('middleton_cms_applications_updated'));
    return { appNumber: appCode };
  };

  return {
    vacancies,
    categories,
    departments,
    applications,
    addVacancy,
    updateVacancy,
    deleteVacancy,
    setCategories,
    setDepartments,
    updateApplicationStatus,
    submitJobApplication
  };
}
