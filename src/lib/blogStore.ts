export interface BlogBlock {
  id: string;
  type: 'headline' | 'text' | 'tip' | 'cta' | 'image' | 'video' | 'quote';
  content: string;
  settings?: {
    link?: string;
    caption?: string;
  };
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  authorId?: string;
  authorName: string;
  authorInitials?: string;
  authorAvatar?: string;
  authorRole?: string;
  date: string;
  readTime?: string;
  image: string;
  views?: number;
  likes?: number;
  status: 'Published' | 'Draft' | 'Scheduled' | 'Archived' | 'Trash';
  isFeatured?: boolean;
  blocks?: BlogBlock[];
  content?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogImage?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    focusKeyword?: string;
    schemaType?: string;
  };
  revisions?: Array<{
    id: string;
    timestamp: string;
    author: string;
    title: string;
    content: string;
  }>;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  avatar: string;
  coverPhoto?: string;
  email: string;
  status?: 'Approved' | 'Pending';
  createdAt?: string;
  socials?: Record<string, string>;
  education?: string;
  experience?: string;
  expertise?: string[];
}

export interface BlogComment {
  id: string;
  postSlug: string;
  postTitle?: string;
  name?: string;
  email?: string;
  comment?: string;
  authorName: string;
  authorEmail: string;
  content: string;
  status: 'Approved' | 'Pending' | 'Spam' | 'Trash';
  date: string;
}

export interface MediaItem {
  id: string;
  title: string;
  filename: string;
  url: string;
  thumbnail: string;
  size: string;
  dimensions: string;
  uploadDate: string;
  optimized?: boolean;
  altText?: string;
  description?: string;
  mediaType?: 'image' | 'video' | 'document';
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract';
  description: string;
  requirements: string[];
  deadline: string;
  status: 'Open' | 'Closed';
  applicantsCount?: number;
  refNumber?: string;
  employmentType?: string;
  workArrangement?: string;
  summary?: string;
  isUrgent?: boolean;
}

export interface BeneficiaryRecord {
  id: string;
  name: string;
  familyContact: string;
  serviceDate: string;
  serviceType: string;
  tributeTitle: string;
  status: 'Active Care' | 'Completed' | 'Aftercare Support';
  notes?: string;
  chapelLocation?: string;
}

export interface ObituaryItem {
  id: string;
  name: string;
  sunrise: string;
  sunset: string;
  serviceDate: string;
  serviceLocation: string;
  biography: string;
  photo: string;
  status: 'published' | 'pending' | 'draft';
  featured?: boolean;
  condolencesCount?: number;
  publishedAt?: string;
}

export interface SiteSettings {
  siteName: string;
  contactEmail: string;
  emergencyPhone: string;
  officePhone: string;
  address: string;
  businessHours: string;
  maintenanceMode: boolean;
  onlineArrangementsEnabled: boolean;
}

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: {
    canPublishArticles: boolean;
    canManageVacancies: boolean;
    canViewInquiries: boolean;
    canEditSystemSettings: boolean;
    canManageMedia: boolean;
  };
  assignedUsersCount: number;
}

export interface SocialMediaLink {
  id: string;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube';
  label: string;
  url: string;
  enabled: boolean;
}

export interface TrackingSettings {
  googleAnalyticsId: string;
  metaPixelId: string;
  cookieConsentBanner: boolean;
  customHeadScript: string;
}

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Middleton Memorial Chapel Interior',
    filename: 'chapel-interior.jpg',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300',
    size: '1.8 MB',
    dimensions: '1920x1080',
    uploadDate: '2026-03-01',
    altText: 'Serene view of the Middleton Funeral Services main chapel sanctuary with soft ambient lighting',
    mediaType: 'image'
  },
  {
    id: 'med-2',
    title: 'Peaceful Dove Memorial Insignia',
    filename: 'memorial-dove-crest.jpg',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=300',
    size: '820 KB',
    dimensions: '1200x800',
    uploadDate: '2026-02-28',
    altText: 'Middleton Funeral Services emblem of peace and remembrance',
    mediaType: 'image'
  },
  {
    id: 'med-3',
    title: 'Sympathy White Lilies & Floral Tribute',
    filename: 'sympathy-lilies.jpg',
    url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=300',
    size: '1.2 MB',
    dimensions: '1600x1067',
    uploadDate: '2026-02-20',
    altText: 'Arrangement of white lilies and roses handcrafted for memorial services',
    mediaType: 'image'
  },
  {
    id: 'med-4',
    title: 'Family Arrangement Conference Suite',
    filename: 'family-conference-room.jpg',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=300',
    size: '2.1 MB',
    dimensions: '2048x1365',
    uploadDate: '2026-02-14',
    altText: 'Private, comfortable conference consultation suite for families planning funeral arrangements',
    mediaType: 'image'
  }
];

export const INITIAL_BENEFICIARIES: BeneficiaryRecord[] = [
  {
    id: 'ben-1',
    name: 'Robert Arthur Sterling',
    familyContact: 'Margaret Sterling (Wife) • (952) 486-1122',
    serviceDate: '2026-03-18',
    serviceType: 'Traditional Church Liturgy & Burial',
    tributeTitle: 'Life Well Lived: Honoring Robert Sterling',
    status: 'Active Care',
    notes: 'Military honors by VFW Post 1776; reception in South Chapel following internment.',
    chapelLocation: 'Main Sanctuary, Apple Valley'
  },
  {
    id: 'ben-2',
    name: 'Dorothy Marie Lindqvist',
    familyContact: 'Erik Lindqvist (Son) • (612) 889-4011',
    serviceDate: '2026-03-12',
    serviceType: 'Celebration of Life & Scattering Ceremony',
    tributeTitle: 'Joyful Memories of Dorothy Lindqvist',
    status: 'Aftercare Support',
    notes: 'Family attended weekly grief support circle; memorial tree planted at Minnesota Arboretum.',
    chapelLocation: 'Garden View Chapel'
  },
  {
    id: 'ben-3',
    name: 'Samuel James Holloway',
    familyContact: 'Patricia Holloway (Daughter) • (651) 322-9090',
    serviceDate: '2026-02-27',
    serviceType: 'Private Family Memorial & Cremation',
    tributeTitle: 'In Loving Remembrance of Samuel Holloway',
    status: 'Completed',
    notes: 'Keepsake jewelry crafted and delivered; death certificates certified and finalized.',
    chapelLocation: 'Quiet Reflection Parlor'
  }
];

export const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: 'role-1',
    name: 'Administrator',
    description: 'Complete operational and administrative access across all CMS modules, settings, and staff accounts.',
    permissions: { canPublishArticles: true, canManageVacancies: true, canViewInquiries: true, canEditSystemSettings: true, canManageMedia: true },
    assignedUsersCount: 2
  },
  {
    id: 'role-2',
    name: 'Licensed Funeral Director',
    description: 'Manages family inquiries, service tributes, memorial articles, and public chapel schedules.',
    permissions: { canPublishArticles: true, canManageVacancies: false, canViewInquiries: true, canEditSystemSettings: false, canManageMedia: true },
    assignedUsersCount: 4
  },
  {
    id: 'role-3',
    name: 'Aftercare & Grief Counselor',
    description: 'Manages bereavement articles, support group entries, and post-service follow-up correspondence.',
    permissions: { canPublishArticles: true, canManageVacancies: false, canViewInquiries: true, canEditSystemSettings: false, canManageMedia: false },
    assignedUsersCount: 2
  },
  {
    id: 'role-4',
    name: 'Operations & Mortuary Assistant',
    description: 'Logistics coordination, vehicle livery updates, and general media library contributions.',
    permissions: { canPublishArticles: false, canManageVacancies: false, canViewInquiries: false, canEditSystemSettings: false, canManageMedia: true },
    assignedUsersCount: 3
  }
];

export const INITIAL_SOCIALS: SocialMediaLink[] = [
  { id: 'soc-1', platform: 'facebook', label: 'Facebook', url: 'https://facebook.com/MiddletonFuneralServices', enabled: true },
  { id: 'soc-2', platform: 'instagram', label: 'Instagram', url: 'https://instagram.com/MiddletonFunerals', enabled: true },
  { id: 'soc-3', platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/middleton-funeral-services', enabled: true },
  { id: 'soc-4', platform: 'twitter', label: 'X (Twitter)', url: 'https://x.com/MiddletonCare', enabled: true },
  { id: 'soc-5', platform: 'youtube', label: 'YouTube Memorial Livestreams', url: 'https://youtube.com/@MiddletonFuneralServices', enabled: true }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Middleton Funeral Services',
  contactEmail: 'inquiries@middletonfuneralservices.com',
  emergencyPhone: '(952) 486-2871',
  officePhone: '(952) 486-2870',
  address: 'Twin Cities Metro Area, Minnesota',
  businessHours: '24/7 Immediate Need Care • Office: Mon-Fri 8:30 AM - 5:00 PM',
  maintenanceMode: false,
  onlineArrangementsEnabled: true
};

export const INITIAL_TRACKING: TrackingSettings = {
  googleAnalyticsId: 'G-MIDD77912',
  metaPixelId: '10982736451829',
  cookieConsentBanner: true,
  customHeadScript: '<!-- Middleton Verification Protocol -->'
};

export const INITIAL_AUTHORS: BlogAuthor[] = [
  {
    id: 'auth-1',
    name: 'Eleanor Middleton',
    initials: 'EM',
    role: 'Licensed Funeral Director & Managing Partner',
    bio: 'Guiding families with empathy, precision, and personalized service for over two decades across the Twin Cities metro area.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
    email: 'eleanor@middletonfuneralservices.com',
    education: 'B.S. in Mortuary Science (University of Minnesota) & Certified Funeral Service Practitioner (CFSP)',
    experience: '22+ Years in Funeral Directing, Bereavement Care & Celebration of Life Design',
    expertise: ['Funeral Directing', 'Grief Accompaniment', 'Personalized Memorials', 'Advance Care Planning']
  },
  {
    id: 'auth-2',
    name: 'David Vance',
    initials: 'DV',
    role: 'Director of Mortuary Care & Restorative Art',
    bio: 'Dedicated to the highest standards of dignity, restorative art, and sacred presentation, ensuring peaceful final memories for every family.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    email: 'david.vance@middletonfuneralservices.com',
    education: 'B.S. Mortuary Science & Certified Crematory Operator (CCO)',
    experience: '16+ Years in Embalming, Preparation & Cremation Standards',
    expertise: ['Restorative Care', 'Cremation Protocols', 'Sacred Preparation', 'Green Burial Options']
  },
  {
    id: 'auth-3',
    name: 'Sarah Jenkins',
    initials: 'SJ',
    role: 'Family Counselor & Aftercare Coordinator',
    bio: 'Providing ongoing grief support, community bereavement circles, and aftercare guidance to help families rebuild and heal.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1200',
    email: 'sarah.jenkins@middletonfuneralservices.com',
    education: 'M.A. in Thanatology & Licensed Clinical Social Work (LCSW)',
    experience: '12+ Years in Grief Counseling, Support Groups & Youth Bereavement',
    expertise: ['Bereavement Circles', 'Anticipatory Grief', 'Youth Counseling', 'Estate Closure Support']
  }
];

export const INITIAL_CATEGORIES: BlogCategory[] = [
  { id: 'cat-1', name: 'Grief Support & Healing', slug: 'grief-support-healing', description: 'Thoughtful guidance, emotional navigation, and support resources for the journey of loss.', color: '#411548' },
  { id: 'cat-2', name: 'Pre-Planning Guidance', slug: 'pre-planning-guidance', description: 'Checklists and considerations for making advance funeral and memorial choices with peace of mind.', color: '#C5A059' },
  { id: 'cat-3', name: 'Memorial Traditions', slug: 'memorial-traditions', description: 'Honoring heritage, cultural ceremonies, and innovative tribute ideas.', color: '#411548' },
  { id: 'cat-4', name: 'Funeral Etiquette & FAQs', slug: 'funeral-etiquette-faqs', description: 'Practical advice on attending visitations, writing sympathy notes, and what to expect.', color: '#2d0e32' },
  { id: 'cat-5', name: 'Legal & Heritage Planning', slug: 'legal-heritage-planning', description: 'Estate documentation, death certificate processing, and probate considerations.', color: '#411548' }
];

export const INITIAL_POSTS: BlogPostItem[] = [
  {
    id: 'post-1',
    slug: 'understanding-ambiguous-loss-in-modern-grief-support',
    title: 'Understanding Ambiguous Loss in Modern Grief Support',
    excerpt: 'When loss arrives without closure or clear finality, navigating the emotional landscape requires patience, community circles, and gentle rituals.',
    category: 'Grief Support & Healing',
    tags: ['Grief Healing', 'Bereavement', 'Family Care'],
    authorId: 'auth-3',
    authorName: 'Sarah Jenkins',
    authorInitials: 'SJ',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    authorRole: 'Family Counselor & Aftercare Coordinator',
    date: '12 Mar 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1000',
    views: 1840,
    likes: 42,
    status: 'Published',
    isFeatured: true,
    blocks: [
      { id: 'b-1', type: 'headline', content: 'The Nature of Ambiguous Grief' },
      { id: 'b-2', type: 'text', content: 'Grief rarely adheres to linear stages. When families encounter ambiguous loss—whether through prolonged illness, cognitive decline, or sudden absence—the lack of tangible punctuation marks can leave hearts feeling stranded between grief and hope.\n\nAt Middleton Funeral Services, we create space for honest emotion. Acknowledging that not every question has an immediate answer allows family members to grant themselves grace.' },
      { id: 'b-3', type: 'tip', content: 'Tip: Creating a small, dedicated remembrance corner in your home with a candle and favorite photographs helps ground grief in comforting daily mindfulness.' },
      { id: 'b-4', type: 'headline', content: 'Small Rituals That Anchor the Soul' },
      { id: 'b-5', type: 'text', content: 'Memorial ceremonies do not need to wait for distant milestones. Lighting a memorial lantern, planting a perennial garden, or holding a quiet candlelit family gathering provides the psychological anchor needed to honor what was, while gently holding what is.' },
      { id: 'b-6', type: 'cta', content: 'Join Our Free Monthly Grief Support Circle', settings: { link: '/join-support-group' } }
    ]
  },
  {
    id: 'post-2',
    slug: 'step-by-step-guide-to-pre-planning-a-meaningful-funeral',
    title: 'A Step-by-Step Guide to Pre-Planning a Meaningful Funeral',
    excerpt: 'Pre-planning your arrangements protects your family from emotional distress, locks in current costs, and ensures your exact wishes are honored.',
    category: 'Pre-Planning Guidance',
    tags: ['Pre-Planning', 'Peace of Mind', 'Family Care'],
    authorId: 'auth-1',
    authorName: 'Eleanor Middleton',
    authorInitials: 'EM',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    authorRole: 'Licensed Funeral Director & Managing Partner',
    date: '28 Feb 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1000',
    views: 2450,
    likes: 58,
    status: 'Published',
    isFeatured: true,
    blocks: [
      { id: 'b-1', type: 'headline', content: 'The Greatest Gift of Preparedness' },
      { id: 'b-2', type: 'text', content: 'When a loss occurs, families are asked to make more than 70 critical decisions within 24 to 48 hours while under acute emotional shock. By taking the time today to record your preferences—from music and readings to burial or cremation choices—you lift an overwhelming burden from those you love most.' },
      { id: 'b-3', type: 'tip', content: 'Middleton pre-planning consultations are completely free, confidential, and carry zero obligation. Your recorded directives are preserved in our secure registry.' },
      { id: 'b-4', type: 'headline', content: 'Key Elements to Document' },
      { id: 'b-5', type: 'text', content: '1. Disposition Preference: Traditional burial, natural green burial, or cremation.\n2. Service Style: Religious liturgy, military honors, humanist celebration of life, or private family gathering.\n3. Memorial Keepsakes: Preferred flowers, favorite musical pieces, and charitable memorial donations in lieu of flowers.\n4. Financial Security: Locking in services with an insured pre-need trust protects against future inflation.' },
      { id: 'b-6', type: 'cta', content: 'Download Our Complimentary Pre-Planning Booklet', settings: { link: '/pre-planning' } }
    ]
  },
  {
    id: 'post-3',
    slug: 'celebration-of-life-vs-traditional-funeral-finding-the-right-fit',
    title: 'Celebration of Life vs. Traditional Funeral: Finding the Right Fit',
    excerpt: 'Explore the meaningful differences between traditional religious services and personalized celebrations of life, and how to blend both.',
    category: 'Memorial Traditions',
    tags: ['Celebration of Life', 'Traditions', 'Ceremonies'],
    authorId: 'auth-2',
    authorName: 'David Vance',
    authorInitials: 'DV',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    authorRole: 'Director of Mortuary Care & Restorative Art',
    date: '15 Feb 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1000',
    views: 1290,
    likes: 31,
    status: 'Published',
    blocks: [
      { id: 'b-1', type: 'headline', content: 'Honoring Individuality and Heritage' },
      { id: 'b-2', type: 'text', content: 'Today, many families choose to integrate the solemn beauty of traditional rites with contemporary, personalized touches. A service can begin with sacred reflection and conclude with a warm reception highlighting the deceased\'s favorite music, hobbies, and culinary recipes.' },
      { id: 'b-3', type: 'quote', content: 'A funeral is not just about marking an end; it is about gathering those who loved to weave the memories that carry forward.' },
      { id: 'b-4', type: 'cta', content: 'Explore Custom Service Arrangements', settings: { link: '/services' } }
    ]
  }
];

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: 'vac-1',
    refNumber: 'MFS-VAC-01',
    title: 'Licensed Funeral Director & Mortician',
    department: 'Mortuary Care & Family Directing',
    location: 'Apple Valley, MN (Twin Cities Metro)',
    type: 'Full-Time',
    employmentType: 'Full-Time',
    workArrangement: 'On-Site',
    summary: 'Lead dignified funeral services, counsel grieving families through arrangement conferences, and supervise preparation and ceremony execution with highest professional ethics.',
    description: 'Middleton Funeral Services seeks an experienced, compassionate Funeral Director to join our caring team. You will guide families through arrangement conferences, coordinate ceremonial logistics, and oversee mortuary care.',
    requirements: [
      'Active Mortuary Science License (or eligible for reciprocity in Minnesota)',
      'Minimum 2 years of compassionate family directing experience',
      'Valid Driver\'s License with clean driving record',
      'Exceptional interpersonal communication and empathy'
    ],
    deadline: '2026-10-31',
    status: 'Open',
    isUrgent: true,
    applicantsCount: 4
  },
  {
    id: 'vac-2',
    refNumber: 'MFS-VAC-02',
    title: 'Family Care & Pre-Need Planning Advisor',
    department: 'Family Guidance & Advance Planning',
    location: 'Twin Cities Metro, MN (Hybrid Available)',
    type: 'Full-Time',
    employmentType: 'Full-Time',
    workArrangement: 'Hybrid',
    summary: 'Assist community members in recording their final wishes, explaining memorial options, and establishing guaranteed pre-need trust accounts.',
    description: 'Help individuals and couples plan ahead with dignity. In this role, you educate community members on pre-planning benefits, assist with advance directives, and guide choices with patience and warmth.',
    requirements: [
      'Strong consultative communication skills and active listening',
      'Life insurance / pre-need license or willingness to obtain within 90 days',
      'Demonstrated experience in community outreach or consultative advisory'
    ],
    deadline: '2026-11-15',
    status: 'Open',
    applicantsCount: 6
  },
  {
    id: 'vac-3',
    refNumber: 'MFS-VAC-03',
    title: 'Funeral Assistant & Logistics Coordinator',
    department: 'Operations & Ceremony Logistics',
    location: 'Apple Valley, MN',
    type: 'Part-Time',
    employmentType: 'Part-Time',
    workArrangement: 'On-Site',
    summary: 'Support family visitations, chapel services, cemetery procession coordination, and guest reception hospitality with decorum and reverence.',
    description: 'Ensure visitations and services run smoothly and reverently. You will greet guests, manage floral displays, assist with chapel seating, and coordinate funeral coach movements.',
    requirements: [
      'Professional demeanor, dignified dress, and polite demeanor',
      'Ability to stand for extended periods and assist with ceremonial transfers',
      'Punctual, dependable, and flexible schedule for weekday and weekend services'
    ],
    deadline: '2026-10-15',
    status: 'Open',
    applicantsCount: 9
  }
];

class BlogStoreManager {
  private postsKey = 'middleton_blog_posts';
  private categoriesKey = 'middleton_blog_categories';
  private tagsKey = 'middleton_blog_tags';
  private authorsKey = 'middleton_blog_authors';
  private commentsKey = 'middleton_blog_comments';
  private vacanciesKey = 'middleton_blog_vacancies';

  private mediaKey = 'middleton_cms_media';
  private beneficiariesKey = 'middleton_cms_beneficiaries';
  private settingsKey = 'middleton_cms_settings';
  private rolesKey = 'middleton_cms_roles';
  private socialsKey = 'middleton_cms_socials';
  private trackingKey = 'middleton_cms_tracking';

  constructor() {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(this.postsKey)) {
        localStorage.setItem(this.postsKey, JSON.stringify(INITIAL_POSTS));
      }
      if (!localStorage.getItem(this.categoriesKey)) {
        localStorage.setItem(this.categoriesKey, JSON.stringify(INITIAL_CATEGORIES));
      }
      if (!localStorage.getItem(this.authorsKey)) {
        localStorage.setItem(this.authorsKey, JSON.stringify(INITIAL_AUTHORS));
      }
      if (!localStorage.getItem(this.vacanciesKey)) {
        localStorage.setItem(this.vacanciesKey, JSON.stringify(INITIAL_VACANCIES));
      }
      if (!localStorage.getItem(this.mediaKey)) {
        localStorage.setItem(this.mediaKey, JSON.stringify(INITIAL_MEDIA));
      }
      if (!localStorage.getItem(this.beneficiariesKey)) {
        localStorage.setItem(this.beneficiariesKey, JSON.stringify(INITIAL_BENEFICIARIES));
      }
      if (!localStorage.getItem(this.settingsKey)) {
        localStorage.setItem(this.settingsKey, JSON.stringify(INITIAL_SETTINGS));
      }
      if (!localStorage.getItem(this.rolesKey)) {
        localStorage.setItem(this.rolesKey, JSON.stringify(INITIAL_ROLES));
      }
      if (!localStorage.getItem(this.socialsKey)) {
        localStorage.setItem(this.socialsKey, JSON.stringify(INITIAL_SOCIALS));
      }
      if (!localStorage.getItem(this.trackingKey)) {
        localStorage.setItem(this.trackingKey, JSON.stringify(INITIAL_TRACKING));
      }
    }
  }

  getPosts(): BlogPostItem[] {
    try {
      const data = localStorage.getItem(this.postsKey);
      return data ? JSON.parse(data) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  }

  savePosts(posts: BlogPostItem[]) {
    localStorage.setItem(this.postsKey, JSON.stringify(posts));
    window.dispatchEvent(new Event('middleton_cms_posts_updated'));
  }

  getCategories(): BlogCategory[] {
    try {
      const data = localStorage.getItem(this.categoriesKey);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  saveCategories(categories: BlogCategory[]) {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    window.dispatchEvent(new Event('middleton_cms_categories_updated'));
  }

  getAuthors(): BlogAuthor[] {
    try {
      const data = localStorage.getItem(this.authorsKey);
      return data ? JSON.parse(data) : INITIAL_AUTHORS;
    } catch {
      return INITIAL_AUTHORS;
    }
  }

  saveAuthors(authors: BlogAuthor[]) {
    localStorage.setItem(this.authorsKey, JSON.stringify(authors));
    window.dispatchEvent(new Event('middleton_cms_authors_updated'));
  }

  getComments(): BlogComment[] {
    try {
      const data = localStorage.getItem(this.commentsKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveComments(comments: BlogComment[]) {
    localStorage.setItem(this.commentsKey, JSON.stringify(comments));
    window.dispatchEvent(new Event('middleton_cms_comments_updated'));
  }

  getVacancies(): Vacancy[] {
    try {
      const data = localStorage.getItem(this.vacanciesKey);
      return data ? JSON.parse(data) : INITIAL_VACANCIES;
    } catch {
      return INITIAL_VACANCIES;
    }
  }

  saveVacancies(vacancies: Vacancy[]) {
    localStorage.setItem(this.vacanciesKey, JSON.stringify(vacancies));
    window.dispatchEvent(new Event('middleton_cms_vacancies_updated'));
  }

  getMedia(): MediaItem[] {
    try {
      const data = localStorage.getItem(this.mediaKey);
      return data ? JSON.parse(data) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  }

  saveMedia(media: MediaItem[]) {
    localStorage.setItem(this.mediaKey, JSON.stringify(media));
    window.dispatchEvent(new Event('middleton_cms_media_updated'));
  }

  getBeneficiaries(): BeneficiaryRecord[] {
    try {
      const data = localStorage.getItem(this.beneficiariesKey);
      return data ? JSON.parse(data) : INITIAL_BENEFICIARIES;
    } catch {
      return INITIAL_BENEFICIARIES;
    }
  }

  saveBeneficiaries(bens: BeneficiaryRecord[]) {
    localStorage.setItem(this.beneficiariesKey, JSON.stringify(bens));
    window.dispatchEvent(new Event('middleton_cms_beneficiaries_updated'));
  }

  getSettings(): SiteSettings {
    try {
      const data = localStorage.getItem(this.settingsKey);
      return data ? JSON.parse(data) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  saveSettings(settings: SiteSettings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    window.dispatchEvent(new Event('middleton_cms_settings_updated'));
  }

  getRoles(): RoleDefinition[] {
    try {
      const data = localStorage.getItem(this.rolesKey);
      return data ? JSON.parse(data) : INITIAL_ROLES;
    } catch {
      return INITIAL_ROLES;
    }
  }

  saveRoles(roles: RoleDefinition[]) {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
    window.dispatchEvent(new Event('middleton_cms_roles_updated'));
  }

  getSocials(): SocialMediaLink[] {
    try {
      const data = localStorage.getItem(this.socialsKey);
      return data ? JSON.parse(data) : INITIAL_SOCIALS;
    } catch {
      return INITIAL_SOCIALS;
    }
  }

  saveSocials(socials: SocialMediaLink[]) {
    localStorage.setItem(this.socialsKey, JSON.stringify(socials));
    window.dispatchEvent(new Event('middleton_cms_socials_updated'));
  }

  getTracking(): TrackingSettings {
    try {
      const data = localStorage.getItem(this.trackingKey);
      return data ? JSON.parse(data) : INITIAL_TRACKING;
    } catch {
      return INITIAL_TRACKING;
    }
  }

  saveTracking(tracking: TrackingSettings) {
    localStorage.setItem(this.trackingKey, JSON.stringify(tracking));
    window.dispatchEvent(new Event('middleton_cms_tracking_updated'));
  }

  getObituaries(): ObituaryItem[] {
    try {
      const data = localStorage.getItem('middleton_cms_obituaries');
      return data ? JSON.parse(data) : [
        {
          id: 'obit-1',
          name: 'Eleanor Mae Vance (née Lindqvist)',
          sunrise: '1934-08-14',
          sunset: '2026-03-01',
          serviceDate: 'Saturday, March 14, 2026 at 11:00 AM',
          serviceLocation: 'Middleton Historic Chapel, St. Paul, MN',
          biography: 'Devoted mother, retired Minneapolis public school teacher of 38 years, and avid Minnesota botanical gardener. Her grace and kindness touched generations.',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
          status: 'published',
          featured: true
        },
        {
          id: 'obit-2',
          name: 'Robert "Bob" James Sterling',
          sunrise: '1942-02-19',
          sunset: '2026-02-27',
          serviceDate: 'Friday, March 13, 2026 at 2:00 PM',
          serviceLocation: 'Apple Valley Memorial Chapel',
          biography: 'Decorated veteran, master craftsman, and pillar of the Apple Valley civic community. Survived by his beloved wife of 54 years, Martha.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
          status: 'published',
          featured: false
        }
      ];
    } catch {
      return [];
    }
  }

  saveObituaries(obituaries: ObituaryItem[]) {
    localStorage.setItem('middleton_cms_obituaries', JSON.stringify(obituaries));
    window.dispatchEvent(new Event('middleton_cms_obituaries_updated'));
  }
}

export const blogStore = new BlogStoreManager();
