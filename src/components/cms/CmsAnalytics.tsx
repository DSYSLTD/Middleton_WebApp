import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, Users, Eye, FileText, Target, 
  Search, Calendar, Download, RefreshCw, ShieldCheck, CheckCircle2, 
  Globe, Clock, Share2, Layers, Award, Sliders, Mail, 
  ArrowUpRight, ArrowUp, Activity, Server, FileSpreadsheet,
  Compass, LogOut, TrendingDown, Check, X, FilterX, UserCheck, 
  BarChart2, Lock
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import { BlogPostItem, blogStore } from '../../lib/blogStore';

export type AnalyticsSubmodule = 
  | 'dashboard'
  | 'traffic'
  | 'conversions'
  | 'seo'
  | 'audience'
  | 'engagement'
  | 'reports';

export type DateFilterPreset = 
  | 'Today'
  | '7 Days'
  | '30 Days'
  | 'Quarterly'
  | 'Half year'
  | 'Year';

interface Props {
  onShowToast?: (msg: string) => void;
}

export default function CmsAnalytics({ onShowToast = (msg) => console.log(msg) }: Props) {
  // Submodule & timeframe state
  const [activeSubmodule, setActiveSubmodule] = useState<AnalyticsSubmodule>('dashboard');
  const [dateFilter, setDateFilter] = useState<DateFilterPreset>('30 Days');
  const [chartTimeframe, setChartTimeframe] = useState<'7D' | '30D' | 'Quarterly' | 'Half Year' | 'Annually'>('30D');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('All');

  // Real-time Live Engine States
  const [liveVisitors, setLiveVisitors] = useState<number>(64);
  const [liveConversionsCount, setLiveConversionsCount] = useState<number>(128);
  const [serverLatency, setServerLatency] = useState<number>(18);
  const [lastLivePing, setLastLivePing] = useState<string>('');

  // Modals & Report Configuration
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [reportType, setReportType] = useState<'Executive' | 'Editorial' | 'SEO' | 'Marketing'>('Executive');
  const [reportRecipientEmail, setReportRecipientEmail] = useState<string>('management@middleton.co.uk');

  // Store posts
  const [storedPosts, setStoredPosts] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    setStoredPosts(blogStore.getPosts());
    const refresh = () => setStoredPosts(blogStore.getPosts());
    window.addEventListener('neema_cms_posts_updated', refresh);
    return () => window.removeEventListener('neema_cms_posts_updated', refresh);
  }, []);

  const handleTimeframeChange = (tf: '7D' | '30D' | 'Quarterly' | 'Half Year' | 'Annually') => {
    setChartTimeframe(tf);
    switch (tf) {
      case '7D': setDateFilter('7 Days'); break;
      case '30D': setDateFilter('30 Days'); break;
      case 'Quarterly': setDateFilter('Quarterly'); break;
      case 'Half Year': setDateFilter('Half year'); break;
      case 'Annually': setDateFilter('Year'); break;
    }
  };

  // Date Range scaling multiplier
  const dateRangeMultiplier = useMemo(() => {
    switch (dateFilter) {
      case 'Today': return 0.08;
      case '7 Days': return 0.28;
      case '30 Days': return 1.0;
      case 'Quarterly': return 2.85;
      case 'Half year': return 5.5;
      case 'Year': return 10.8;
      default: return 1.0;
    }
  }, [dateFilter]);

  const dynamicVisitors = Math.round(48290 * dateRangeMultiplier);
  const dynamicPageViews = Math.round(142800 * dateRangeMultiplier);
  const dynamicConversions = Math.round(1240 * dateRangeMultiplier);

  // Real-time activity feeds
  const [liveLeadFeed, setLiveLeadFeed] = useState([
    { id: 'ld-101', name: 'Patrick M. (London)', form: 'Pre-Planning Consultation Form', startingPage: 'Blog Post (Guide to Pre-Planning)', time: 'Just now', pixel: 'Meta Pixel (Lead)', leadType: 'Pre-Need Funeral Planning' },
    { id: 'ld-102', name: 'Eunice W. (Surrey)', form: 'Contact Us Inquiry Form', startingPage: 'About Us Page', time: '14s ago', pixel: 'GA4 (form_submit)', leadType: 'Memorial Service Inquiry' },
    { id: 'ld-103', name: 'John K. (Kent)', form: 'Grief Support Group Registration', startingPage: 'Home Page', time: '42s ago', pixel: 'GA4 (sign_up)', leadType: 'Bereavement Support Intake' },
    { id: 'ld-104', name: 'Agnes C. (Essex)', form: 'Custom Floral Tribute Order', startingPage: 'Floral Gallery Page', time: '2m ago', pixel: 'Meta Pixel', leadType: 'Sympathy Tribute Order' }
  ]);

  // Real-time ticker effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveVisitors(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(42, prev + delta);
      });
      
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setServerLatency(15 + Math.floor(Math.random() * 8));
      setLastLivePing(timeStr);

      if (Math.random() > 0.6) {
        setLiveConversionsCount(prev => prev + 1);
        const randomNames = ['David K. (Richmond)', 'Grace M. (Kensington)', 'Samuel O. (Chelsea)', 'Mercy A. (Westminster)', 'Brian N. (Bromley)'];
        const randomForms = ['Pre-Planning Consultation Form', 'Memorial Service Inquiry Form', 'Grief Support Intake Form', 'Custom Floral Tribute Order'];
        const randomPages = ['Blog Post (Memorial Guidance)', 'Home Page', 'Cremation Services Page', 'About Us Page'];
        const randomPixels = ['Meta Pixel (Lead)', 'GA4 (generate_lead)', 'TikTok Pixel (SubmitForm)', 'LinkedIn Insight Tag'];
        
        const newLead = {
          id: `ld-${Date.now()}`,
          name: randomNames[Math.floor(Math.random() * randomNames.length)],
          form: randomForms[Math.floor(Math.random() * randomForms.length)],
          startingPage: randomPages[Math.floor(Math.random() * randomPages.length)],
          time: 'Just now',
          pixel: randomPixels[Math.floor(Math.random() * randomPixels.length)],
          leadType: 'Qualified Site Conversion'
        };
        setLiveLeadFeed(prev => [newLead, ...prev.slice(0, 5)]);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Form Submissions Dataset
  const formSubmissionsData = useMemo(() => [
    {
      formId: 'preplanning_form',
      formName: 'Pre-Planning & Heritage Protection Form',
      category: 'Family Peace of Mind & Pre-Need Plans',
      completions: Math.round(1240 * dateRangeMultiplier),
      visitorsEncountered: Math.round(25800 * dateRangeMultiplier),
      conversionRate: 4.8,
      startToFinishCompletionRate: 68.4,
      primaryPixel: 'Meta Pixel (Lead) + GA4 (generate_lead)',
      leadType: 'Qualified Pre-Planning Family Lead',
      status: 'High Intent Lead'
    },
    {
      formId: 'contact_us_form',
      formName: 'Immediate Assistance & Inquiry Form',
      category: 'Direct Bereavement Consultation',
      completions: Math.round(815 * dateRangeMultiplier),
      visitorsEncountered: Math.round(9940 * dateRangeMultiplier),
      conversionRate: 8.2,
      startToFinishCompletionRate: 74.2,
      primaryPixel: 'GA4 (form_submit) + TikTok Pixel (SubmitForm)',
      leadType: 'Advisory Consultation Inquiry',
      status: 'Active Inquiry'
    },
    {
      formId: 'newsletter_signup_form',
      formName: 'Grief Care Digest & Newsletter Signup Form',
      category: 'Community Support & Family Nurturing',
      completions: Math.round(1650 * dateRangeMultiplier),
      visitorsEncountered: Math.round(11380 * dateRangeMultiplier),
      conversionRate: 14.5,
      startToFinishCompletionRate: 88.5,
      primaryPixel: 'GA4 (sign_up) + Meta Pixel (CompleteRegistration)',
      leadType: 'Subscriber Lead',
      status: 'Nurture Stream'
    },
    {
      formId: 'floral_tribute_form',
      formName: 'Custom Memorial Floral & Keepsake Order Form',
      category: 'Floral Tributes & Casket Arrangements',
      completions: Math.round(410 * dateRangeMultiplier),
      visitorsEncountered: Math.round(4360 * dateRangeMultiplier),
      conversionRate: 9.4,
      startToFinishCompletionRate: 71.0,
      primaryPixel: 'Meta Pixel + GA4 (form_submit)',
      leadType: 'Floral Tribute Order Intake',
      status: 'Verified Intake'
    },
    {
      formId: 'career_portal_form',
      formName: 'Funeral Director & Care Staff Portal Form',
      category: 'Talent Acquisition & Care Team Applicants',
      completions: Math.round(185 * dateRangeMultiplier),
      visitorsEncountered: Math.round(3030 * dateRangeMultiplier),
      conversionRate: 6.1,
      startToFinishCompletionRate: 62.5,
      primaryPixel: 'LinkedIn Insight Tag + GA4',
      leadType: 'Applicant Resume Candidate',
      status: 'HR Review'
    }
  ], [dateRangeMultiplier]);

  // Page Conversion Dataset
  const pageConversionData = useMemo(() => [
    {
      startingPageCategory: 'Memorial Journal & Guidance Articles',
      startingVisitors: Math.round(24500 * dateRangeMultiplier),
      clickThroughToFormOrContact: Math.round(3038 * dateRangeMultiplier),
      conversionRate: 12.4,
      destinationForm: 'Pre-Planning / Contact Us Page',
      funnelPerformance: 'High Content Nurture Path'
    },
    {
      startingPageCategory: 'Home Page',
      startingVisitors: Math.round(18200 * dateRangeMultiplier),
      clickThroughToFormOrContact: Math.round(4022 * dateRangeMultiplier),
      conversionRate: 22.1,
      destinationForm: 'Hero Lead Form / Contact Us',
      funnelPerformance: 'Top Direct Funnel Entry'
    },
    {
      startingPageCategory: 'About Us & Heritage Page',
      startingVisitors: Math.round(6400 * dateRangeMultiplier),
      clickThroughToFormOrContact: Math.round(1190 * dateRangeMultiplier),
      conversionRate: 18.6,
      destinationForm: 'Advisory Contact Us Form',
      funnelPerformance: 'Trust & Credibility Funnel'
    },
    {
      startingPageCategory: 'Burials, Cremation & Memorial Services',
      startingVisitors: Math.round(9800 * dateRangeMultiplier),
      clickThroughToFormOrContact: Math.round(3087 * dateRangeMultiplier),
      conversionRate: 31.5,
      destinationForm: 'Direct Service Booking Form',
      funnelPerformance: 'Highest Intent Funnel Stage'
    }
  ], [dateRangeMultiplier]);

  // Conversion Funnel Steps Breakdown
  const conversionFunnelSteps = useMemo(() => [
    { stepName: '1. Total Site Visitors', count: Math.round(48290 * dateRangeMultiplier), pct: '100%', dropOffPct: '0%' },
    { stepName: '2. Content Engagement (20s+)', count: Math.round(23275 * dateRangeMultiplier), pct: '48.2%', dropOffPct: '51.8%' },
    { stepName: '3. Clicked to Form / Contact Page', count: Math.round(11300 * dateRangeMultiplier), pct: '23.4%', dropOffPct: '51.5%' },
    { stepName: '4. Form Fields Started', count: Math.round(6180 * dateRangeMultiplier), pct: '12.8%', dropOffPct: '45.3%' },
    { stepName: '5. Qualified Form Submission / Lead Generated', count: Math.round(2728 * dateRangeMultiplier), pct: '5.65%', dropOffPct: '55.9%' }
  ], [dateRangeMultiplier]);

  // Traffic Trend Charts Data
  const trafficOverviewData = useMemo(() => {
    switch (chartTimeframe) {
      case '7D':
        return [
          { date: 'Mon', pageviews: Math.round(1200 * dateRangeMultiplier), direct: Math.round(400 * dateRangeMultiplier), organic: Math.round(450 * dateRangeMultiplier), referral: Math.round(150 * dateRangeMultiplier), bounceRate: 28.2 },
          { date: 'Tue', pageviews: Math.round(1550 * dateRangeMultiplier), direct: Math.round(480 * dateRangeMultiplier), organic: Math.round(590 * dateRangeMultiplier), referral: Math.round(180 * dateRangeMultiplier), bounceRate: 27.6 },
          { date: 'Wed', pageviews: Math.round(1400 * dateRangeMultiplier), direct: Math.round(440 * dateRangeMultiplier), organic: Math.round(520 * dateRangeMultiplier), referral: Math.round(160 * dateRangeMultiplier), bounceRate: 26.4 },
          { date: 'Thu', pageviews: Math.round(1800 * dateRangeMultiplier), direct: Math.round(570 * dateRangeMultiplier), organic: Math.round(710 * dateRangeMultiplier), referral: Math.round(220 * dateRangeMultiplier), bounceRate: 25.1 },
          { date: 'Fri', pageviews: Math.round(2100 * dateRangeMultiplier), direct: Math.round(660 * dateRangeMultiplier), organic: Math.round(860 * dateRangeMultiplier), referral: Math.round(260 * dateRangeMultiplier), bounceRate: 24.8 },
          { date: 'Sat', pageviews: Math.round(2450 * dateRangeMultiplier), direct: Math.round(780 * dateRangeMultiplier), organic: Math.round(1020 * dateRangeMultiplier), referral: Math.round(310 * dateRangeMultiplier), bounceRate: 23.5 },
          { date: 'Sun', pageviews: Math.round(2800 * dateRangeMultiplier), direct: Math.round(890 * dateRangeMultiplier), organic: Math.round(1180 * dateRangeMultiplier), referral: Math.round(360 * dateRangeMultiplier), bounceRate: 22.4 }
        ];
      case 'Quarterly':
        return [
          { date: 'Q1 (Jan-Mar)', pageviews: Math.round(14200 * dateRangeMultiplier), direct: Math.round(4500 * dateRangeMultiplier), organic: Math.round(5200 * dateRangeMultiplier), referral: Math.round(1800 * dateRangeMultiplier), bounceRate: 31.2 },
          { date: 'Q2 (Apr-Jun)', pageviews: Math.round(18500 * dateRangeMultiplier), direct: Math.round(5800 * dateRangeMultiplier), organic: Math.round(7100 * dateRangeMultiplier), referral: Math.round(2300 * dateRangeMultiplier), bounceRate: 27.8 },
          { date: 'Q3 (Jul-Sep)', pageviews: Math.round(24800 * dateRangeMultiplier), direct: Math.round(7600 * dateRangeMultiplier), organic: Math.round(9800 * dateRangeMultiplier), referral: Math.round(3200 * dateRangeMultiplier), bounceRate: 24.4 },
          { date: 'Q4 (Oct-Dec)', pageviews: Math.round(31200 * dateRangeMultiplier), direct: Math.round(9800 * dateRangeMultiplier), organic: Math.round(12500 * dateRangeMultiplier), referral: Math.round(4100 * dateRangeMultiplier), bounceRate: 21.1 }
        ];
      default: // 30D
        return [
          { date: 'Day 01-05', pageviews: Math.round(2400 * dateRangeMultiplier), direct: Math.round(800 * dateRangeMultiplier), organic: Math.round(900 * dateRangeMultiplier), referral: Math.round(300 * dateRangeMultiplier), bounceRate: 29.1 },
          { date: 'Day 06-10', pageviews: Math.round(3100 * dateRangeMultiplier), direct: Math.round(950 * dateRangeMultiplier), organic: Math.round(1200 * dateRangeMultiplier), referral: Math.round(400 * dateRangeMultiplier), bounceRate: 27.5 },
          { date: 'Day 11-15', pageviews: Math.round(2800 * dateRangeMultiplier), direct: Math.round(900 * dateRangeMultiplier), organic: Math.round(1050 * dateRangeMultiplier), referral: Math.round(350 * dateRangeMultiplier), bounceRate: 28.0 },
          { date: 'Day 16-20', pageviews: Math.round(4200 * dateRangeMultiplier), direct: Math.round(1200 * dateRangeMultiplier), organic: Math.round(1700 * dateRangeMultiplier), referral: Math.round(600 * dateRangeMultiplier), bounceRate: 25.8 },
          { date: 'Day 21-25', pageviews: Math.round(3900 * dateRangeMultiplier), direct: Math.round(1100 * dateRangeMultiplier), organic: Math.round(1500 * dateRangeMultiplier), referral: Math.round(550 * dateRangeMultiplier), bounceRate: 24.2 },
          { date: 'Day 26-30', pageviews: Math.round(6100 * dateRangeMultiplier), direct: Math.round(1600 * dateRangeMultiplier), organic: Math.round(2600 * dateRangeMultiplier), referral: Math.round(980 * dateRangeMultiplier), bounceRate: 22.2 }
        ];
    }
  }, [chartTimeframe, dateRangeMultiplier]);

  // Traffic Sources Breakdown
  const trafficSourcesData = [
    { name: 'Organic Search (Google & Bing)', value: 52, color: '#411548' },
    { name: 'Direct Family Visits', value: 24, color: '#C5A059' },
    { name: 'Social Media & Memorial Shares', value: 14, color: '#7E22CE' },
    { name: 'Referral & Partner Hospices', value: 6, color: '#059669' },
    { name: 'Bereavement Digest Email', value: 4, color: '#D97706' }
  ];

  // Articles Performance Dataset
  const articlePerformanceList = useMemo(() => {
    return [
      {
        id: 'art-1',
        title: 'Complete Guide to Funeral Pre-Planning and Heritage Protection',
        author: 'Eleanor Vance',
        category: 'Pre-Planning Guidance',
        views: 18450,
        avgReadTime: '4m 12s',
        score: 96
      },
      {
        id: 'art-2',
        title: 'Navigating the First 48 Hours: Practical Steps After Bereavement',
        author: 'Arthur Pendelton',
        category: 'Bereavement Support',
        views: 12800,
        avgReadTime: '3m 45s',
        score: 89
      },
      {
        id: 'art-3',
        title: 'Traditional Burial vs Woodland Eco-Burial: A Gentle Comparison',
        author: 'Dr. Clara Sterling',
        category: 'Funeral Options',
        views: 8900,
        avgReadTime: '5m 05s',
        score: 84
      },
      {
        id: 'art-4',
        title: 'Crafting a Meaningful Eulogy: Honoring Your Loved One’s Legacy',
        author: 'Eleanor Vance',
        category: 'Memorial Tributes',
        views: 6400,
        avgReadTime: '2m 50s',
        score: 72
      }
    ];
  }, []);

  // Keyword Rankings
  const keywordRankings = [
    { keyword: 'funeral directors near me', position: 1, searches: 4800, ctr: '28.4%', impressions: 16800 },
    { keyword: 'pre paid funeral plans guide', position: 2, searches: 12500, ctr: '19.2%', impressions: 38200 },
    { keyword: 'woodland eco burial cost', position: 1, searches: 8900, ctr: '24.1%', impressions: 24100 },
    { keyword: 'Middleton funeral services reviews', position: 1, searches: 3400, ctr: '42.8%', impressions: 7200 },
    { keyword: 'memorial service planning checklist', position: 3, searches: 2100, ctr: '12.5%', impressions: 9400 },
    { keyword: 'bereavement support groups UK', position: 4, searches: 5600, ctr: '8.7%', impressions: 18900 }
  ];

  const filteredArticles = useMemo(() => {
    return articlePerformanceList.filter(art => {
      const matchAuthor = selectedAuthor === 'All' || art.author === selectedAuthor;
      const matchQuery = !searchQuery || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchAuthor && matchQuery;
    });
  }, [articlePerformanceList, selectedAuthor, searchQuery]);

  // Export functions (CSV, Excel, PDF)
  const exportToCSV = () => {
    const headers = ['Article Title', 'Author', 'Category', 'Views', 'Avg Read Time', 'Quality Score'];
    const rows = filteredArticles.map(a => [
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.author}"`,
      `"${a.category}"`,
      a.views,
      `"${a.avgReadTime}"`,
      a.score
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Middleton_Analytics_${activeSubmodule}_${dateFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('CSV Exported Successfully!');
  };

  const exportToExcel = () => {
    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="utf-8"/></head>
      <body>
        <table>
          <thead>
            <tr style="background:#411548;color:#ffffff;font-weight:bold;">
              <th>Article Title</th><th>Author</th><th>Category</th><th>Views</th><th>Avg Read Time</th><th>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            ${filteredArticles.map(a => `
              <tr>
                <td>${a.title}</td><td>${a.author}</td><td>${a.category}</td><td>${a.views}</td><td>${a.avgReadTime}</td><td>${a.score}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body></html>
    `;
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Middleton_Analytics_${activeSubmodule}_${dateFilter}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Excel Sheet Exported Successfully!');
  };

  const exportToPDF = () => {
    window.print();
    onShowToast('PDF Print Dialog Opened!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP MODULE HEADER BAR WITH SUBMODULE TABS */}
      <div className="bg-gradient-to-r from-[#411548] via-[#2f0d34] to-[#411548] p-6 md:p-8 rounded-2xl border border-[#C5A059]/30 text-white shadow-lg space-y-4">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-[#C5A059] shrink-0" /> Analytics Module
          </h2>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-red-600/30 text-red-200 border border-red-500/40 rounded-full text-xs font-black flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span>{liveVisitors} Live Online</span>
            </div>
            <span className="px-3 py-1 bg-[#C5A059] text-[#411548] text-[10px] font-black uppercase tracking-widest rounded-full">
              Enterprise Suite
            </span>
          </div>
        </div>

        {/* Description Text */}
        <p className="text-xs md:text-sm text-gray-200 font-medium max-w-4xl leading-relaxed">
          Comprehensive real-time tracking of website performance, audience demographics, SEO health, and content performance.
        </p>

        {/* CTA buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08b43] text-[#411548] text-xs font-black uppercase rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" /> Generate Report
            </button>
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer border border-white/20 shadow-xs"
            >
              <Download className="w-4 h-4 text-[#C5A059]" /> Data Export
            </button>
          </div>
        </div>

        {/* SUBMODULE NAVIGATION TABS */}
        <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/10 flex-wrap sm:flex-nowrap">
          {[
            { id: 'dashboard', label: 'Overview', icon: Layers },
            { id: 'traffic', label: 'Traffic', icon: TrendingUp },
            { id: 'conversions', label: 'Conversions', icon: Target },
            { id: 'seo', label: 'SEO', icon: BarChart2 },
            { id: 'audience', label: 'Audience', icon: Users },
            { id: 'engagement', label: 'Engagement', icon: Share2 },
            { id: 'reports', label: 'Reports', icon: FileSpreadsheet }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubmodule === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubmodule(tab.id as AnalyticsSubmodule)}
                className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-1 min-w-0 text-center ${
                  isActive 
                    ? 'bg-[#C5A059] text-[#411548] shadow-md scale-[1.01]' 
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#411548]' : 'text-[#C5A059]'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GLOBAL CONTROLS, SEARCH & FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs font-bold">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search article, author, category, campaign, keyword..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-[#411548] focus:border-[#411548]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Preset Date Range Buttons */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {(['Today', '7 Days', '30 Days', 'Quarterly', 'Half year', 'Year'] as const).map(preset => (
              <button
                key={preset}
                onClick={() => setDateFilter(preset)}
                className={`px-3 py-1 rounded-lg text-[11px] transition-all cursor-pointer whitespace-nowrap font-black ${
                  dateFilter === preset ? 'bg-[#411548] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {searchQuery !== '' && (
            <button
              onClick={() => {
                setSelectedAuthor('All');
                setSearchQuery('');
                onShowToast('Filters reset to default');
              }}
              className="px-2.5 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear active search"
            >
              <FilterX className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. SUBMODULE CONTENT RENDER SWITCH */}

      {/* SUBMODULE 1: EXECUTIVE DASHBOARD */}
      {activeSubmodule === 'dashboard' && (
        <div className="space-y-6">
          {/* Executive Overview Banner */}
          <div className="bg-gradient-to-r from-[#411548] via-[#330e39] to-[#250829] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border border-[#C5A059]/30">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-2xl font-black tracking-tight">
                  Digital Performance Overview
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  Overall digital engagement is up <span className="text-[#C5A059] font-bold">+22.4%</span> this month, driven primarily by pre-planning guides and memorial tributes. Core Web Vitals score is <span className="text-emerald-400 font-bold">98/100</span> with 0 security or crawl issues detected.
                </p>
              </div>

              {/* Status Dial / Health Score */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <div className="text-3xl font-black text-[#C5A059]">96 / 100</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/80 mt-0.5">Website Health Index</div>
                </div>
                <div className="h-10 w-px bg-white/20" />
                <div className="space-y-1 text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> SEO: Excellent
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <Clock className="w-4 h-4" /> Speed: 1.2s LCP
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 KPI METRIC CARDS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Visitors', value: dynamicVisitors.toLocaleString(), change: '+18.4%', icon: Users },
              { label: 'Total Page Views', value: dynamicPageViews.toLocaleString(), change: '+24.6%', icon: Eye },
              { label: 'Organic Search', value: Math.round(dynamicVisitors * 0.642).toLocaleString(), change: '+18.2%', icon: Search },
              { label: 'Social Media', value: Math.round(dynamicVisitors * 0.218).toLocaleString(), change: '+12.5%', icon: Share2 }
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-2xs space-y-2 hover:border-[#411548] transition-all">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400">
                    <span className="truncate">{kpi.label}</span>
                    <Icon className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                  </div>
                  <div className="text-lg sm:text-xl font-black text-[#411548]">{kpi.value}</div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TRAFFIC GROWTH AREA CHART */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C5A059]" /> Traffic Growth &amp; Organic Visitors Trend
              </h3>
              
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
                {(['7D', '30D', 'Quarterly', 'Half Year', 'Annually'] as const).map(tf => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => handleTimeframeChange(tf)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                      chartTimeframe === tf 
                        ? 'bg-[#411548] text-[#C5A059] shadow-xs' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficOverviewData}>
                  <defs>
                    <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#411548" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#411548" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C5A059" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBounce" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="direct" name="Direct Visits" stroke="#411548" fillOpacity={1} fill="url(#colorDirect)" strokeWidth={3} />
                  <Area type="monotone" dataKey="organic" name="Organic Search Traffic" stroke="#C5A059" fillOpacity={1} fill="url(#colorOrganic)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="bounceRate" name="Bounce Rate (%)" stroke="#dc2626" fillOpacity={1} fill="url(#colorBounce)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TOP ARTICLES PERFORMANCE TABLE */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C5A059]" /> Top Content Performance
              </h3>
              <span className="text-xs font-bold text-[#411548]">
                {articlePerformanceList.length} Memorial Articles
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-black uppercase text-[10px]">
                    <th className="pb-3">Article Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-center">Views</th>
                    <th className="pb-3 text-center">Read Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredArticles.slice(0, 4).map(art => (
                    <tr key={art.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 pr-2 font-bold text-gray-900 max-w-[260px] truncate">
                        {art.title}
                      </td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-[#411548]/10 text-[#411548] font-extrabold rounded-md text-[10px]">
                          {art.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-gray-800">
                        {art.views.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-gray-600">
                        {art.avgReadTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 3: CONVERSIONS & FUNNEL ANALYTICS */}
      {activeSubmodule === 'conversions' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Banner & Real-time Pixel Status */}
          <div className="bg-gradient-to-r from-[#411548] via-[#320d36] to-[#250829] p-6 rounded-3xl text-white shadow-xl border border-[#C5A059]/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[#C5A059] font-extrabold text-xs uppercase tracking-widest">
                  <Target className="w-4 h-4 animate-pulse" /> Conversion Engine &amp; Lead Funnel Telemetry
                </div>
                <h3 className="text-2xl font-black tracking-tight mt-1">
                  Website Conversions &amp; Family Inquiries
                </h3>
                <p className="text-xs text-white/80 font-medium mt-1">
                  Real-time form submissions, consultation inquiries, and page-to-form click-through funnel tracking.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 bg-white/10 p-3 rounded-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-xs font-bold text-white/70 uppercase">Total Form Leads</div>
                  <div className="text-2xl font-black text-[#C5A059]">{dynamicConversions.toLocaleString()}</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-xs font-bold text-white/70 uppercase">Live Conversions</div>
                  <div className="text-2xl font-black text-emerald-400 animate-pulse">{liveConversionsCount}</div>
                </div>
              </div>
            </div>

            {/* Pixel Signal Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span className="text-white/70 uppercase text-[10px]">Active Tracking Pixel Telemetry:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Meta Pixel (Lead Event)
                </span>
                <span className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> GA4 (generate_lead)
                </span>
                <span className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> TikTok Pixel (SubmitForm)
                </span>
                <span className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> LinkedIn Insight Tag
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: FORM SUBMISSION ANALYTICS */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-[#411548] text-[#C5A059] rounded-xl shrink-0 mt-0.5">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs uppercase text-[#411548]">
                  Form Submission Objective
                </h4>
                <p className="text-xs text-emerald-900 font-bold leading-relaxed">
                  Measure whether website traffic is actively turning into pre-planning consultations, immediate bereavement assistance requests, and memorial tribute orders.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-black text-[#411548] uppercase flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C5A059]" /> Form Submission &amp; Family Inquiries Breakdown
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  Percentage of website visitors completing each specific form and total qualified consultations generated directly from website content.
                </p>
              </div>
            </div>

            {/* Form Performance Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formSubmissionsData.map((f) => (
                <div key={f.formId} className="p-5 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-4 flex flex-col justify-between hover:border-[#411548]/40 transition-all shadow-2xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-md uppercase">
                        {f.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 font-mono">
                        {f.primaryPixel}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-gray-900 leading-snug">{f.formName}</h4>
                    <p className="text-[11px] font-medium text-gray-500">{f.category}</p>

                    <div className="pt-2 border-t border-gray-200/80 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-bold">Visitor Conversion %:</span>
                        <span className="text-base font-black text-[#411548] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          {f.conversionRate}%
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-gray-600">
                        <span>Leads Generated:</span>
                        <strong className="text-gray-900 font-black text-sm">{f.completions.toLocaleString()} leads</strong>
                      </div>

                      <div className="flex justify-between items-center text-gray-500 text-[11px]">
                        <span>Start-to-Finish Completion:</span>
                        <strong className="text-emerald-700 font-bold">{f.startToFinishCompletionRate}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#411548] h-full rounded-full" style={{ width: `${f.conversionRate * 5}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-medium border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-black uppercase text-[10px]">
                    <th className="p-3">Specific Form Name</th>
                    <th className="p-3">Business Objective Category</th>
                    <th className="p-3 text-center">Visitor Conversion Rate %</th>
                    <th className="p-3 text-center">Leads Generated</th>
                    <th className="p-3 text-center">Completion Rate</th>
                    <th className="p-3 text-right">Pixel Attribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {formSubmissionsData.map((f) => (
                    <tr key={f.formId} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-extrabold text-gray-900">{f.formName}</td>
                      <td className="p-3 text-gray-600 font-medium">{f.category}</td>
                      <td className="p-3 text-center font-black">
                        <span className="px-2.5 py-1 bg-[#411548] text-[#C5A059] rounded-lg text-xs">
                          {f.conversionRate}%
                        </span>
                      </td>
                      <td className="p-3 text-center font-black text-emerald-800">{f.completions.toLocaleString()} leads</td>
                      <td className="p-3 text-center font-bold text-gray-700">{f.startToFinishCompletionRate}%</td>
                      <td className="p-3 text-right font-mono text-[10px] text-gray-500">{f.primaryPixel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 2: PAGE CONVERSION ANALYTICS */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-[#C5A059] text-[#411548] rounded-xl shrink-0 mt-0.5">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-xs uppercase text-[#411548]">
                  Page Conversion Objective
                </h4>
                <p className="text-xs text-amber-950 font-bold leading-relaxed">
                  Measure the performance of the funnel or inquiry capture path by tracking users who start on memorial guides, home page, about us, or services pages and click through to a pre-planning form or contact page.
                </p>
              </div>
            </div>

            {/* Starting Page Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pageConversionData.map((p) => (
                <div key={p.startingPageCategory} className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-[#411548] bg-amber-100 px-2 py-0.5 rounded-md">
                      {p.funnelPerformance}
                    </span>
                    <h4 className="font-black text-sm text-gray-900 leading-snug">{p.startingPageCategory}</h4>
                    
                    <div className="text-2xl font-black text-[#411548] pt-1">
                      {p.conversionRate}% <span className="text-xs font-bold text-gray-500">Page Conv Rate</span>
                    </div>

                    <div className="space-y-1 text-xs font-medium text-gray-600 pt-2 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span>Starting Traffic:</span>
                        <strong className="text-gray-900">{p.startingVisitors.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Click-Throughs:</span>
                        <strong className="text-emerald-700 font-bold">{p.clickThroughToFormOrContact.toLocaleString()} users</strong>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C5A059] h-full rounded-full" style={{ width: `${p.conversionRate * 2.8}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Funnel Step Breakdown */}
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-black text-sm uppercase text-[#C5A059] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" /> Full Lead Capture Funnel Efficiency
                </h4>
                <span className="text-xs font-mono text-emerald-400">Overall Lead Yield: 5.65%</span>
              </div>

              <div className="space-y-3">
                {conversionFunnelSteps.map((step, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-200">{step.stepName}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-mono">{step.count.toLocaleString()} users ({step.pct})</span>
                        {idx > 0 && <span className="text-red-400 text-[10px]">Drop-off: {step.dropOffPct}</span>}
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${idx === 4 ? 'bg-emerald-400' : 'bg-[#C5A059]'}`} 
                        style={{ width: step.pct }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Incoming Lead Stream Feed */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h4 className="font-black text-xs uppercase text-[#411548] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600 animate-pulse" /> Live Real-Time Form Submission Stream
                </h4>
                <span className="text-[10px] font-mono text-gray-500">Updated in Real-Time</span>
              </div>

              <div className="space-y-2">
                {liveLeadFeed.map((lead) => (
                  <div key={lead.id} className="p-3 bg-white rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-ping" />
                      <div>
                        <strong className="text-gray-900 font-black">{lead.name}</strong> submitted <span className="text-[#411548] font-bold">{lead.form}</span>
                        <div className="text-[11px] text-gray-500">Started on: <span className="italic">{lead.startingPage}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md font-mono">
                        {lead.pixel}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{lead.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 2: TRAFFIC ANALYTICS */}
      {activeSubmodule === 'traffic' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#411548] uppercase flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#C5A059]" /> Traffic &amp; Acquisition Channels
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  Analyze visitors across organic search, direct family visits, social media, referral, and email newsletter channels.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#411548]" /> Export CSV
                </button>
              </div>
            </div>

            {/* Acquisition Channel Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {trafficSourcesData.map((src) => (
                <div key={src.name} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-800">{src.name}</span>
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: src.color }} />
                  </div>
                  <div className="text-2xl font-black text-[#411548]">{src.value}%</div>
                  <div className="text-[10px] font-bold text-gray-500">
                    {Math.round(48290 * (src.value / 100)).toLocaleString()} estimated visits
                  </div>
                </div>
              ))}
            </div>

            {/* Traffic Sources Bar Chart */}
            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficOverviewData}>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  <Legend />
                  <Bar dataKey="organic" name="Organic Search" fill="#411548" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="direct" name="Direct Traffic" fill="#C5A059" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="referral" name="Referral & Social" fill="#7E22CE" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 4: SEO ANALYTICS */}
      {activeSubmodule === 'seo' && (
        <div className="space-y-6">
          {/* Core Web Vitals Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Largest Contentful Paint (LCP)</span>
              <div className="text-2xl font-black text-emerald-700">1.2s <span className="text-xs text-gray-400 font-bold">(Good)</span></div>
              <p className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">Passes Google CWV</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">First Input Delay (FID)</span>
              <div className="text-2xl font-black text-emerald-700">12ms <span className="text-xs text-gray-400 font-bold">(Instant)</span></div>
              <p className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">Optimal React Performance</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Cumulative Layout Shift (CLS)</span>
              <div className="text-2xl font-black text-emerald-700">0.02 <span className="text-xs text-gray-400 font-bold">(Stable)</span></div>
              <p className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">Zero visual jumping</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Indexed Pages &amp; Schema</span>
              <div className="text-2xl font-black text-[#411548]">100% Valid</div>
              <p className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">JSON-LD Microdata active</p>
            </div>
          </div>

          {/* Keyword Rankings Table */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2 border-b border-gray-100 pb-3">
              <Target className="w-4 h-4 text-[#C5A059]" /> Organic Keyword Rankings &amp; Search Visibility
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-black uppercase text-[10px]">
                    <th className="pb-3">Search Keyword</th>
                    <th className="pb-3 text-center">SERP Position</th>
                    <th className="pb-3 text-center">Monthly Searches</th>
                    <th className="pb-3 text-center">CTR %</th>
                    <th className="pb-3 text-right">Impressions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {keywordRankings.map((kw, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 font-extrabold text-gray-900">{kw.keyword}</td>
                      <td className="py-3 text-center font-black">
                        <span className="px-2.5 py-1 bg-[#411548] text-[#C5A059] rounded-lg text-xs">
                          #{kw.position}
                        </span>
                      </td>
                      <td className="py-3 text-center font-bold text-gray-700">{kw.searches.toLocaleString()}</td>
                      <td className="py-3 text-center font-bold text-emerald-700">{kw.ctr}</td>
                      <td className="py-3 text-right font-bold text-gray-900">{kw.impressions.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 5: AUDIENCE ANALYTICS */}
      {activeSubmodule === 'audience' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header Banner & Live Audience Counter */}
          <div className="bg-gradient-to-r from-[#411548] via-[#320d36] to-[#250829] p-6 rounded-3xl text-white shadow-xl border border-[#C5A059]/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[#C5A059] font-extrabold text-xs uppercase tracking-widest">
                  <Users className="w-4 h-4 animate-pulse" /> Live Audience Intelligence &amp; Visitor Behavior
                </div>
                <h3 className="text-2xl font-black tracking-tight mt-1">
                  Audience Time, Front Door Landing Pages &amp; Fresh Visitor Ratio
                </h3>
                <p className="text-xs text-white/80 font-medium mt-1">
                  Active time per page, top entry landing pages, and real-time active audience monitoring across regions.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 bg-white/10 p-3.5 rounded-2xl border border-white/20">
                <div className="text-center">
                  <div className="text-xs font-bold text-white/70 uppercase">Live Online Now</div>
                  <div className="text-3xl font-black text-emerald-400 animate-pulse">{liveVisitors}</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-xs font-bold text-white/70 uppercase">Active Pixels</div>
                  <div className="text-2xl font-black text-[#C5A059]">4 Live</div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Time Per Page Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059]" /> Average Active Time Per Page
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  <strong>Objective:</strong> Determine how impactful website content, design and layout are on visitor attention and comfort during delicate planning moments.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black rounded-lg self-start md:self-auto">
                Avg Site Dwell: 3m 48s
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase font-black text-[10px] bg-gray-50">
                    <th className="p-3">Page Name / Content Route</th>
                    <th className="p-3">Page Category</th>
                    <th className="p-3">Avg Active Time</th>
                    <th className="p-3">Layout Impact Score</th>
                    <th className="p-3">Design &amp; Content Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { page: '/pre-planning', category: 'Pre-Planning', time: '4m 32s', score: '9.4/10', note: 'High engagement. Families digest step-by-step guidance calmly.' },
                    { page: '/services/cremation', category: 'Services Page', time: '3m 50s', score: '9.1/10', note: 'Strong layout. High conversion flow to consultation booking.' },
                    { page: '/about-us', category: 'About Us', time: '2m 15s', score: '8.2/10', note: 'Good trust building. Clear heritage and values presentation.' },
                    { page: '/', category: 'Home Page', time: '1m 48s', score: '8.8/10', note: 'Fast navigation. Clear 24/7 care hotline button.' },
                    { page: '/blog/eulogy-writing-guide', category: 'Memorial Journal', time: '3m 12s', score: '8.7/10', note: 'Informative copy. Frequent bookmarking and sharing.' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80">
                      <td className="p-3 font-mono font-bold text-gray-900">{row.page}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-bold">{row.category}</span></td>
                      <td className="p-3 font-black text-[#411548]">{row.time}</td>
                      <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-extrabold rounded-md text-[10px]">{row.score}</span></td>
                      <td className="p-3 text-gray-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Landing Pages Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C5A059]" /> Top Landing Pages (Website Front Doors)
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  <strong>Objective:</strong> Show which page and memorial articles act as the website front door to allow targeted consultation optimization.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Home Page Landing', path: '/', entrances: Math.round(18200 * dateRangeMultiplier), share: '37.7%', opt: 'A/B Test Hero Consultation CTA' },
                { name: 'Pre-Planning Guide', path: '/pre-planning', entrances: Math.round(14500 * dateRangeMultiplier), share: '30.0%', opt: 'Inject Instant Appointment Scheduler' },
                { name: 'Services Directory', path: '/services', entrances: Math.round(9800 * dateRangeMultiplier), share: '20.3%', opt: 'Add Transparent Price Comparison' },
                { name: 'About Middleton Heritage', path: '/about-us', entrances: Math.round(5790 * dateRangeMultiplier), share: '12.0%', opt: 'Highlight Family Care Testimonials' }
              ].map((lp, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-gray-400">#0{i+1} Landing Page</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">{lp.share} Share</span>
                  </div>
                  <h4 className="font-extrabold text-xs text-gray-900">{lp.name}</h4>
                  <div className="font-mono text-[11px] text-[#411548] font-bold">{lp.path}</div>
                  <div className="text-lg font-black text-gray-900">{lp.entrances.toLocaleString()} <span className="text-xs font-normal text-gray-500">views</span></div>
                  <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-600">
                    <strong className="text-gray-800">Recommendation:</strong> {lp.opt}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visitors: Fresh vs Returning Audience Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2 border-b border-gray-100 pb-3">
              <UserCheck className="w-4 h-4 text-[#C5A059]" /> Visitor Acquisition &amp; Loyalty Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/60 rounded-2xl border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#411548] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#411548]" /> Fresh First-Time Visitors
                  </span>
                  <span className="px-2.5 py-1 bg-[#411548] text-white text-xs font-black rounded-lg">58% Share</span>
                </div>
                <div className="text-3xl font-black text-[#411548]">
                  {Math.round(28008 * dateRangeMultiplier).toLocaleString()} <span className="text-xs font-semibold text-gray-600">New Visitors</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Attracted via organic search engine queries (SEO/AEO bereavement keywords), memorial tributes, and partner healthcare referrals.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-amber-700" /> Loyal Returning Families
                  </span>
                  <span className="px-2.5 py-1 bg-amber-900 text-white text-xs font-black rounded-lg">42% Share</span>
                </div>
                <div className="text-3xl font-black text-amber-950">
                  {Math.round(20282 * dateRangeMultiplier).toLocaleString()} <span className="text-xs font-semibold text-amber-800">Returning Readers</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                  High community trust. Families returning directly via saved links, obituary tributes, and grief care newsletters.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 6: ENGAGEMENT ANALYTICS */}
      {activeSubmodule === 'engagement' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-gradient-to-r from-[#411548] via-[#320d36] to-[#250829] p-6 rounded-3xl text-white shadow-xl border border-[#C5A059]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#C5A059] font-extrabold text-xs uppercase tracking-widest">
              <Activity className="w-4 h-4" /> Audience Dwell, Page Depth &amp; Exit Mitigation
            </div>
            <h3 className="text-2xl font-black tracking-tight">
              Engagement Metrics: Exit Pages, Pages Per Session &amp; Bounce Rate
            </h3>
            <p className="text-xs text-white/80 font-medium">
              Measure user interaction quality, pinpoint final exit pages to add next-step links, and monitor bounce rate across channels.
            </p>
          </div>

          {/* Top KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Bounce Rate</span>
              <div className="text-3xl font-black text-[#411548]">28.4%</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Optimal &lt; 35% Target</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Pages Per Session</span>
              <div className="text-3xl font-black text-[#411548]">3.42</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">High Content Quality</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Total Social Shares</span>
              <div className="text-3xl font-black text-[#411548]">{Math.round(1840 * dateRangeMultiplier).toLocaleString()}</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">WhatsApp & Email Top Channels</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-gray-400">Avg Dwell Time</span>
              <div className="text-3xl font-black text-[#C5A059]">3m 48s</div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">High Family Trust</span>
            </div>
          </div>

          {/* Top Exit Pages Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-red-600" /> Top Exit Pages (Final Pages Viewed)
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  <strong>Objective:</strong> Show the final pages people look at before leaving your website entirely so as to define a clear next step or internal link to keep visitors on site.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase font-black text-[10px] bg-gray-50">
                    <th className="p-3">Exit Page Route</th>
                    <th className="p-3">Total Exit Volume</th>
                    <th className="p-3">Exit Rate %</th>
                    <th className="p-3">Recommended Next Step / Proposed Internal Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { page: '/services/burials', exits: Math.round(3120 * dateRangeMultiplier), rate: '28.4%', action: 'Add "Speak to a Funeral Director" 24/7 hotline button at page bottom.' },
                    { page: '/pre-planning', exits: Math.round(2450 * dateRangeMultiplier), rate: '22.1%', action: 'Embed internal link to "Download Free Pre-Planning Guide PDF".' },
                    { page: '/contact', exits: Math.round(1890 * dateRangeMultiplier), rate: '18.5%', action: 'Add quick FAQ widget + instant callback request form.' },
                    { page: '/about-us', exits: Math.round(1240 * dateRangeMultiplier), rate: '14.2%', action: 'Add internal link to "Explore Our Ceremonial Chapel & Facilities".' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80">
                      <td className="p-3 font-mono font-bold text-gray-900">{row.page}</td>
                      <td className="p-3 font-black text-gray-900">{row.exits.toLocaleString()}</td>
                      <td className="p-3 font-bold text-red-700">{row.rate}</td>
                      <td className="p-3 font-bold text-emerald-800 bg-emerald-50/60 rounded-md">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pages Per Session Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C5A059]" /> Pages Per Session &amp; Content Navigation Depth
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  <strong>Objective:</strong> Show the average number of pages a user clicks through before leaving to evaluate guidance depth.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-lg">
                Avg: 3.42 Pages / Session
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { depth: '1 Single Page', pct: 28, label: 'Single page bounce sessions' },
                { depth: '2 - 3 Pages', pct: 44, label: 'Standard exploration sessions' },
                { depth: '4 - 6 Pages', pct: 20, label: 'High intent research sessions' },
                { depth: '7+ Pages', pct: 8, label: 'Deep pre-planning applicants' }
              ].map((d, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-400">{d.depth}</span>
                  <div className="text-2xl font-black text-[#411548]">{d.pct}% <span className="text-xs font-medium text-gray-500">of sessions</span></div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#411548] rounded-full" style={{ width: `${d.pct}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBMODULE 7: REPORTS BUILDER */}
      {activeSubmodule === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-[#411548] uppercase flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-[#C5A059]" /> Executive Report Generator &amp; Automated Delivery
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  Generate instant PDF executive summaries or schedule automated weekly analytics digests for board &amp; director teams.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportToPDF}
                  className="px-4 py-2 bg-[#411548] hover:bg-[#2b0830] text-white text-xs font-black uppercase rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#C5A059]" /> Download PDF Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                <h4 className="font-extrabold text-sm text-[#411548]">Report Configuration</h4>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as any)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800"
                  >
                    <option value="Executive">Management Briefing</option>
                    <option value="Editorial">Editorial &amp; Content Performance Report</option>
                    <option value="SEO">Technical SEO &amp; SERP Audit</option>
                    <option value="Marketing">Marketing Campaigns &amp; ROI Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={reportRecipientEmail}
                    onChange={(e) => setReportRecipientEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-800"
                  />
                </div>

                <button
                  onClick={() => onShowToast(`Report scheduled for ${reportRecipientEmail}`)}
                  className="w-full py-2.5 bg-[#411548] text-white font-black rounded-xl cursor-pointer hover:bg-[#2e0933] transition-colors"
                >
                  Schedule Automated Delivery
                </button>
              </div>

              <div className="p-5 bg-[#411548]/5 rounded-2xl border border-[#411548]/20 space-y-3">
                <h4 className="font-extrabold text-sm text-[#411548]">Included Metrics Preview</h4>
                <ul className="space-y-2 text-xs font-bold text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Total Website Visitors &amp; Growth Trends</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Geographical Traffic Breakdown</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Memorial Article Performance &amp; Read Time</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pre-Planning Consultation Lead Conversions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <Download className="w-4 h-4 text-[#C5A059]" /> Export Analytics Dataset
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <button
                onClick={() => { exportToCSV(); setShowExportModal(false); }}
                className="w-full p-3 bg-gray-50 hover:bg-purple-50 rounded-xl text-left border border-gray-200 text-gray-800 flex items-center justify-between cursor-pointer"
              >
                <span>Comma-Separated Values (.csv)</span>
                <Download className="w-4 h-4 text-[#411548]" />
              </button>

              <button
                onClick={() => { exportToExcel(); setShowExportModal(false); }}
                className="w-full p-3 bg-gray-50 hover:bg-purple-50 rounded-xl text-left border border-gray-200 text-gray-800 flex items-center justify-between cursor-pointer"
              >
                <span>Microsoft Excel (.xls / .xlsx)</span>
                <FileSpreadsheet className="w-4 h-4 text-[#411548]" />
              </button>

              <button
                onClick={() => { exportToPDF(); setShowExportModal(false); }}
                className="w-full p-3 bg-gray-50 hover:bg-purple-50 rounded-xl text-left border border-gray-200 text-gray-800 flex items-center justify-between cursor-pointer"
              >
                <span>Executive PDF Printable Report (.pdf)</span>
                <FileText className="w-4 h-4 text-[#411548]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-sm text-[#411548] uppercase flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#C5A059]" /> Generate Executive Report
              </h3>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-600 font-medium leading-relaxed">
              Generate and download a branded PDF summary for executive directors and board members.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  exportToPDF();
                  setShowReportModal(false);
                }}
                className="px-5 py-2 bg-[#411548] text-white rounded-xl text-xs font-black uppercase cursor-pointer hover:bg-[#2b0830] shadow-md"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
