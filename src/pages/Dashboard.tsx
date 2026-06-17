import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Users, Calendar, Image as ImageIcon, BookOpen, Inbox, ShieldAlert,
  LogOut, Plus, Trash2, Edit3, CheckCircle, AlertTriangle, Eye, Check, X, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../data/db';
import { IClass, IInstructor, IEvent, IGalleryItem, IBlog, ITestimonial, IEnquiry } from '../types';

export const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'classes' | 'events' | 'blogs' | 'instructors' | 'gallery' | 'testimonials'>('overview');

  // DB States
  const [classes, setClasses] = useState<IClass[]>([]);
  const [instructors, setInstructors] = useState<IInstructor[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [gallery, setGallery] = useState<IGalleryItem[]>([]);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);

  // Modal control states
  const [modalType, setModalType] = useState<'class' | 'event' | 'blog' | 'instructor' | 'gallery' | 'testimonial' | null>(null);
  const [editId, setEditId] = useState<string | null>(null); // Null means Add Mode, String means Edit Mode

  // General Form States
  // 1. Class Form
  const [classForm, setClassForm] = useState({
    name: '', description: '', style: 'Hip-Hop', ageGroup: 'Teens' as any, level: 'Beginner' as any,
    scheduleStr: '', fees: '', packagesStr: '', trainerId: '', imageUrl: '', isOnline: false,
    liveSessions: '', recordedAccess: '', subscriptionPlan: '', benefitsStr: ''
  });
  // 2. Event Form
  const [eventForm, setEventForm] = useState({
    title: '', category: 'Workshop' as any, date: '', time: '', venue: '', description: '', bannerImage: '', price: '', isActive: true
  });
  // 3. Blog Form
  const [blogForm, setBlogForm] = useState({
    title: '', author: '', category: 'Dance Tips' as any, featuredImage: '', content: '', tagsStr: ''
  });
  // 4. Instructor Form
  const [instructorForm, setInstructorForm] = useState({
    name: '', specialization: '', experience: '', photo: '', instagram: '', facebook: '', youtube: ''
  });
  // 5. Gallery Form
  const [galleryForm, setGalleryForm] = useState({
    title: '', type: 'photo' as any, url: '', category: 'Annual Show' as any, coverImage: ''
  });
  // 6. Testimonial Form
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: 'Student' as any, review: '', rating: 5, avatar: ''
  });

  // Leads Filter
  const [leadsFilter, setLeadsFilter] = useState<'All' | 'contact' | 'trial' | 'enrollment' | 'event'>('All');

  // Load database
  const refreshDb = () => {
    setClasses(db.getClasses());
    setInstructors(db.getInstructors());
    setEvents(db.getEvents());
    setGallery(db.getGallery());
    setBlogs(db.getBlogs());
    setTestimonials(db.getTestimonials());
    setEnquiries(db.getEnquiries());
  };

  useEffect(() => {
    refreshDb();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // --- Deletion Handlers ---
  const handleDeleteClass = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      db.deleteClass(id); refreshDb();
    }
  };
  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      db.deleteEvent(id); refreshDb();
    }
  };
  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      db.deleteBlog(id); refreshDb();
    }
  };
  const handleDeleteInstructor = (id: string) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      db.deleteInstructor(id); refreshDb();
    }
  };
  const handleDeleteGallery = (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      db.deleteGalleryItem(id); refreshDb();
    }
  };
  const handleDeleteTestimonial = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      db.deleteTestimonial(id); refreshDb();
    }
  };
  const handleDeleteEnquiry = (id: string) => {
    if (window.confirm('Are you sure you want to remove this lead/enquiry?')) {
      db.deleteEnquiry(id); refreshDb();
    }
  };

  // --- Leads Status Toggle ---
  const handleToggleLeadsStatus = (id: string, status: 'Pending' | 'Contacted' | 'Resolved') => {
    db.updateEnquiryStatus(id, status);
    refreshDb();
  };

  // --- Modal Open Handlers ---
  // 1. Class
  const openClassModal = (item: IClass | null = null) => {
    if (item) {
      setEditId(item.id);
      setClassForm({
        name: item.name, description: item.description, style: item.style, ageGroup: item.ageGroup, level: item.level,
        scheduleStr: item.schedule.join(', '), fees: item.fees,
        packagesStr: item.packages.map(p => `${p.name}:${p.price}:${p.description}`).join(' | '),
        trainerId: item.trainerId, imageUrl: item.imageUrl, isOnline: item.isOnline,
        liveSessions: item.onlineDetails?.liveSessions || '',
        recordedAccess: item.onlineDetails?.recordedAccess || '',
        subscriptionPlan: item.onlineDetails?.subscriptionPlan || '',
        benefitsStr: item.benefits.join(', ')
      });
    } else {
      setEditId(null);
      setClassForm({
        name: '', description: '', style: 'Hip-Hop', ageGroup: 'Teens', level: 'Beginner',
        scheduleStr: 'Monday 5:00 PM - 6:00 PM, Wednesday 5:00 PM - 6:00 PM', fees: '$75 / month',
        packagesStr: 'Monthly Pass:$75:Access to 2 classes | Drop-in:$15:Single class',
        trainerId: instructors[0]?.id || '', imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80', isOnline: false,
        liveSessions: '', recordedAccess: '', subscriptionPlan: '',
        benefitsStr: 'Master street styles, Learn choreo retention, Group stage performance prep'
      });
    }
    setModalType('class');
  };

  // 2. Event
  const openEventModal = (item: IEvent | null = null) => {
    if (item) {
      setEditId(item.id);
      setEventForm({
        title: item.title, category: item.category, date: item.date, time: item.time, venue: item.venue,
        description: item.description, bannerImage: item.bannerImage, price: item.price, isActive: item.isActive
      });
    } else {
      setEditId(null);
      setEventForm({
        title: '', category: 'Workshop', date: new Date().toISOString().split('T')[0], time: '2:00 PM - 5:00 PM',
        venue: 'Studio Floor A', description: '', bannerImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80', price: 'Free', isActive: true
      });
    }
    setModalType('event');
  };

  // 3. Blog
  const openBlogModal = (item: IBlog | null = null) => {
    if (item) {
      setEditId(item.id);
      setBlogForm({
        title: item.title, author: item.author, category: item.category, featuredImage: item.featuredImage, content: item.content, tagsStr: item.tags.join(', ')
      });
    } else {
      setEditId(null);
      setBlogForm({
        title: '', author: instructors[0]?.name || 'Admin Coach', category: 'Dance Tips', featuredImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80', content: '', tagsStr: 'Choreography, Dance'
      });
    }
    setModalType('blog');
  };

  // 4. Instructor
  const openInstructorModal = (item: IInstructor | null = null) => {
    if (item) {
      setEditId(item.id);
      setInstructorForm({
        name: item.name, specialization: item.specialization, experience: item.experience, photo: item.photo,
        instagram: item.socialLinks.instagram || '', facebook: item.socialLinks.facebook || '', youtube: item.socialLinks.youtube || ''
      });
    } else {
      setEditId(null);
      setInstructorForm({
        name: '', specialization: '', experience: '5+ Years', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        instagram: '', facebook: '', youtube: ''
      });
    }
    setModalType('instructor');
  };

  // 5. Gallery
  const openGalleryModal = (item: IGalleryItem | null = null) => {
    if (item) {
      setEditId(item.id);
      setGalleryForm({
        title: item.title, type: item.type, url: item.url, category: item.category, coverImage: item.coverImage || ''
      });
    } else {
      setEditId(null);
      setGalleryForm({
        title: '', type: 'photo', url: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=1000&q=80', category: 'Annual Show', coverImage: ''
      });
    }
    setModalType('gallery');
  };

  // 6. Testimonial
  const openTestimonialModal = (item: ITestimonial | null = null) => {
    if (item) {
      setEditId(item.id);
      setTestimonialForm({
        name: item.name, role: item.role, review: item.review, rating: item.rating, avatar: item.avatar
      });
    } else {
      setEditId(null);
      setTestimonialForm({
        name: '', role: 'Student', review: '', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      });
    }
    setModalType('testimonial');
  };

  // --- Save / Submit Controllers ---
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalType) return;

    if (modalType === 'class') {
      // Parse schedules
      const schedule = classForm.scheduleStr.split(',').map(s => s.trim()).filter(Boolean);
      // Parse packages (Format: Name:Price:Desc | Name:Price:Desc)
      const packages = classForm.packagesStr.split('|').map(pkg => {
        const parts = pkg.split(':');
        return {
          name: parts[0]?.trim() || 'Package',
          price: parts[1]?.trim() || '$0',
          description: parts[2]?.trim() || ''
        };
      }).filter(p => p.name);

      const trainerName = instructors.find(t => t.id === classForm.trainerId)?.name || 'Guest Coach';
      const benefits = classForm.benefitsStr.split(',').map(b => b.trim()).filter(Boolean);

      const payload = {
        name: classForm.name,
        description: classForm.description,
        style: classForm.style,
        ageGroup: classForm.ageGroup,
        level: classForm.level,
        schedule,
        fees: classForm.fees,
        packages,
        trainerId: classForm.trainerId,
        trainerName,
        benefits,
        imageUrl: classForm.imageUrl,
        isOnline: classForm.isOnline,
        onlineDetails: classForm.isOnline ? {
          liveSessions: classForm.liveSessions,
          recordedAccess: classForm.recordedAccess,
          subscriptionPlan: classForm.subscriptionPlan
        } : undefined
      };

      if (editId) {
        db.updateClass(editId, payload);
      } else {
        db.addClass(payload);
      }
    }

    else if (modalType === 'event') {
      const payload = { ...eventForm };
      if (editId) {
        db.updateEvent(editId, payload);
      } else {
        db.addEvent(payload);
      }
    }

    else if (modalType === 'blog') {
      const tags = blogForm.tagsStr.split(',').map(t => t.trim()).filter(Boolean);
      const payload = {
        title: blogForm.title,
        author: blogForm.author,
        category: blogForm.category,
        featuredImage: blogForm.featuredImage,
        content: blogForm.content,
        tags,
        date: editId ? (blogs.find(b => b.id === editId)?.date || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]
      };

      if (editId) {
        db.updateBlog(editId, payload);
      } else {
        db.addBlog(payload);
      }
    }

    else if (modalType === 'instructor') {
      const payload = {
        name: instructorForm.name,
        specialization: instructorForm.specialization,
        experience: instructorForm.experience,
        photo: instructorForm.photo,
        socialLinks: {
          instagram: instructorForm.instagram || undefined,
          facebook: instructorForm.facebook || undefined,
          youtube: instructorForm.youtube || undefined
        }
      };

      if (editId) {
        db.updateInstructor(editId, payload);
      } else {
        db.addInstructor(payload);
      }
    }

    else if (modalType === 'gallery') {
      const payload = { ...galleryForm };
      if (editId) {
        db.updateGalleryItem(editId, payload);
      } else {
        db.addGalleryItem(payload);
      }
    }

    else if (modalType === 'testimonial') {
      const payload = { ...testimonialForm };
      if (editId) {
        db.updateTestimonial(editId, payload);
      } else {
        db.addTestimonial(payload);
      }
    }

    // Reset and close
    setModalType(null);
    setEditId(null);
    refreshDb();
  };

  // Filter leads
  const filteredLeads = leadsFilter === 'All'
    ? enquiries
    : enquiries.filter(l => l.type === leadsFilter);

  // Tab List Navigation Menu
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart className="w-4 h-4" /> },
    { id: 'leads', label: 'Lead Inbox', icon: <Inbox className="w-4 h-4" />, count: enquiries.filter(e => e.status === 'Pending').length },
    { id: 'classes', label: 'Classes', icon: <Users className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'blogs', label: 'Blogs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'instructors', label: 'Instructors', icon: <Users className="w-4 h-4" /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <ImageIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-zinc-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-brand-purple tracking-widest flex items-center gap-1.5 font-sans">
            <ShieldCheck className="w-4 h-4 text-brand-purple" />
            Control Management Portal
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Studio CMS Dashboard</h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500/30 hover:border-red-500 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 focus:outline-none"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR TABS PANEL */}
        <div className="lg:col-span-3 space-y-2 lg:sticky lg:top-28">
          <div className="glass-panel p-4 rounded-xl border-white/5 space-y-1">
            <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-3 px-3 font-sans">
              Navigation
            </span>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors focus:outline-none ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-pink/20 to-brand-purple/20 text-brand-pink border-l-2 border-brand-pink'
                    : 'hover:bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="px-1.5 py-0.5 bg-brand-pink text-white rounded text-[10px] font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN DISPLAY CONTENT */}
        <div className="lg:col-span-9 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-xl glass-panel border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-zinc-500 font-sans tracking-wider">Leads</span>
                    <span className="text-xl font-bold text-white">{enquiries.length}</span>
                  </div>
                </div>
                <div className="p-6 rounded-xl glass-panel border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-zinc-500 font-sans tracking-wider">Classes</span>
                    <span className="text-xl font-bold text-white">{classes.length}</span>
                  </div>
                </div>
                <div className="p-6 rounded-xl glass-panel border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-zinc-500 font-sans tracking-wider">Events</span>
                    <span className="text-xl font-bold text-white">{events.length}</span>
                  </div>
                </div>
                <div className="p-6 rounded-xl glass-panel border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-zinc-500 font-sans tracking-wider">Blogs</span>
                    <span className="text-xl font-bold text-white">{blogs.length}</span>
                  </div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="glass-panel p-6 rounded-xl border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                    <Inbox className="w-5 h-5 text-brand-pink" />
                    Latest Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-brand-pink hover:text-white font-semibold underline"
                  >
                    View All Leads
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-center py-6 text-zinc-500 text-xs font-sans">No student leads yet. Form submissions will appear here.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-zinc-500 font-bold uppercase tracking-wider font-sans">
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Type</th>
                          <th className="py-3 px-4">Enquiry / Class</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {enquiries.slice(0, 5).map(lead => (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 font-sans">
                            <td className="py-3.5 px-4 text-zinc-500">{lead.date}</td>
                            <td className="py-3.5 px-4 text-white font-bold">{lead.name}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                lead.type === 'trial' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                lead.type === 'enrollment' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                lead.type === 'event' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                              }`}>
                                {lead.type}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 truncate max-w-[150px]">{lead.targetName || 'General Studio Query'}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                lead.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-500' :
                                lead.status === 'Contacted' ? 'bg-blue-500/15 text-blue-500' : 'bg-red-500/15 text-red-500 animate-pulse'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LEAD INBOX */}
          {activeTab === 'leads' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Inbox className="w-5 h-5 text-brand-pink" />
                  Lead Management Inbox
                </h3>
                
                {/* Leads Filter Tabs */}
                <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-950 rounded-lg border border-white/5">
                  {(['All', 'contact', 'trial', 'enrollment', 'event'] as any).map(filter => (
                    <button
                      key={filter}
                      onClick={() => setLeadsFilter(filter)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none ${
                        leadsFilter === filter ? 'bg-brand-pink text-white' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <p className="text-center py-12 text-zinc-500 text-sm font-sans">No student leads found matching this category filter.</p>
              ) : (
                <div className="space-y-6">
                  {filteredLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-5 rounded-xl bg-zinc-950 border border-white/5 hover:border-brand-pink/20 transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{lead.name}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            lead.type === 'trial' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            lead.type === 'enrollment' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            lead.type === 'event' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                            'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                          }`}>
                            {lead.type}
                          </span>
                        </div>
                        <span className="text-zinc-500 text-xs font-sans">{lead.date}</span>
                      </div>

                      {/* Details row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans border-y border-white/5 py-3 text-zinc-400">
                        <div>Email: <strong className="text-white">{lead.email}</strong></div>
                        <div>Phone: <strong className="text-white">{lead.phone}</strong></div>
                        {lead.targetName && (
                          <div className="sm:col-span-2">
                            Enquiry for: <strong className="text-brand-pink">{lead.targetName}</strong> (ID: {lead.targetId})
                          </div>
                        )}
                      </div>

                      {/* Message Content */}
                      <p className="text-zinc-300 text-xs font-sans leading-relaxed whitespace-pre-line p-3 bg-white/5 rounded-lg border border-white/5">
                        {lead.message}
                      </p>

                      {/* Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        {/* Status update buttons */}
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider font-sans">
                          <span className="text-zinc-500 text-xs">Set Status:</span>
                          <button
                            onClick={() => handleToggleLeadsStatus(lead.id, 'Pending')}
                            className={`px-2 py-1 rounded border ${
                              lead.status === 'Pending' ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-transparent border-white/5 text-zinc-500'
                            }`}
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => handleToggleLeadsStatus(lead.id, 'Contacted')}
                            className={`px-2 py-1 rounded border ${
                              lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' : 'bg-transparent border-white/5 text-zinc-500'
                            }`}
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => handleToggleLeadsStatus(lead.id, 'Resolved')}
                            className={`px-2 py-1 rounded border ${
                              lead.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50' : 'bg-transparent border-white/5 text-zinc-500'
                            }`}
                          >
                            Resolved
                          </button>
                        </div>

                        {/* Remove Lead */}
                        <button
                          onClick={() => handleDeleteEnquiry(lead.id)}
                          className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded border border-white/5 hover:border-red-500/30 transition-colors text-zinc-500 focus:outline-none"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLASSES CRUD */}
          {activeTab === 'classes' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-brand-pink" />
                  Dance Classes ({classes.length})
                </h3>
                <button
                  onClick={() => openClassModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Class
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classes.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover border border-white/5 shrink-0" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase font-sans tracking-wide">
                          <span className="text-brand-pink">{item.style}</span>
                          <span className="text-zinc-600">|</span>
                          <span className="text-zinc-400">{item.level}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-zinc-500 text-[10px] block font-sans">Trainer: {item.trainerName}</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5 text-xs font-sans uppercase font-bold tracking-wider">
                        <button onClick={() => openClassModal(item)} className="p-1 hover:text-brand-pink transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteClass(item.id)} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EVENTS CRUD */}
          {activeTab === 'events' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-5 h-5 text-brand-pink" />
                  Studio Events ({events.length})
                </h3>
                <button
                  onClick={() => openEventModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4">
                    <img src={item.bannerImage} alt={item.title} className="w-20 h-20 rounded-lg object-cover border border-white/5 shrink-0" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase font-sans tracking-wide">
                          <span className="text-brand-purple">{item.category}</span>
                          <span className="text-zinc-600">|</span>
                          <span className="text-zinc-400">{item.date}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm line-clamp-1">{item.title}</h4>
                        <span className="text-brand-pink text-[10px] font-bold block mt-1">{item.price}</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5 text-xs font-sans uppercase font-bold tracking-wider">
                        <button onClick={() => openEventModal(item)} className="p-1 hover:text-brand-purple transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteEvent(item.id)} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BLOGS CRUD */}
          {activeTab === 'blogs' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <BookOpen className="w-5 h-5 text-brand-pink" />
                  Articles & Blogs ({blogs.length})
                </h3>
                <button
                  onClick={() => openBlogModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Post
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4">
                    <img src={item.featuredImage} alt={item.title} className="w-20 h-20 rounded-lg object-cover border border-white/5 shrink-0" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase font-sans tracking-wide">
                          <span className="text-brand-cyan">{item.category}</span>
                          <span className="text-zinc-600">|</span>
                          <span className="text-zinc-400">{item.date}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm line-clamp-1">{item.title}</h4>
                        <span className="text-zinc-500 text-[10px] block font-sans">Author: {item.author}</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5 text-xs font-sans uppercase font-bold tracking-wider">
                        <button onClick={() => openBlogModal(item)} className="p-1 hover:text-brand-cyan transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteBlog(item.id)} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INSTRUCTORS CRUD */}
          {activeTab === 'instructors' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Users className="w-5 h-5 text-brand-pink" />
                  Dance Instructors ({instructors.length})
                </h3>
                <button
                  onClick={() => openInstructorModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Coach
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructors.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4">
                    <img src={item.photo} alt={item.name} className="w-20 h-20 rounded-full object-cover border-2 border-brand-pink p-0.5 shrink-0" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="text-white font-bold text-sm">{item.name}</h4>
                        <span className="text-brand-pink text-[10px] font-bold uppercase tracking-wide block font-sans">{item.specialization}</span>
                        <span className="text-zinc-500 text-[10px] block font-sans">Experience: {item.experience}</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5 text-xs font-sans uppercase font-bold tracking-wider">
                        <button onClick={() => openInstructorModal(item)} className="p-1 hover:text-brand-pink transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteInstructor(item.id)} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: GALLERY CRUD */}
          {activeTab === 'gallery' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-5 h-5 text-brand-pink" />
                  Media Gallery Items ({gallery.length})
                </h3>
                <button
                  onClick={() => openGalleryModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Media
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4">
                    <img src={item.type === 'video' ? (item.coverImage || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad') : item.url} alt={item.title} className="w-20 h-20 rounded-lg object-cover border border-white/5 shrink-0" />
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase font-sans tracking-wide">
                          <span className="text-brand-cyan">{item.category}</span>
                          <span className="text-zinc-600">|</span>
                          <span className="text-zinc-400">{item.type}</span>
                        </div>
                        <h4 className="text-white font-bold text-sm line-clamp-1">{item.title}</h4>
                      </div>
                      <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5 text-xs font-sans uppercase font-bold tracking-wider">
                        <button onClick={() => openGalleryModal(item)} className="p-1 hover:text-brand-cyan transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteGallery(item.id)} className="p-1 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: TESTIMONIALS CRUD */}
          {activeTab === 'testimonials' && (
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-5 h-5 text-brand-pink" />
                  Student Reviews ({testimonials.length})
                </h3>
                <button
                  onClick={() => openTestimonialModal()}
                  className="btn-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Review
                </button>
              </div>

              <div className="space-y-4">
                {testimonials.map(item => (
                  <div key={item.id} className="p-4 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 flex gap-4 items-start">
                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/5" />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-bold text-sm">{item.name}</h4>
                          <span className="text-[10px] font-bold text-brand-pink uppercase font-sans tracking-wide">{item.role}</span>
                        </div>
                        <div className="flex gap-2 text-xs uppercase font-bold tracking-wider">
                          <button onClick={() => openTestimonialModal(item)} className="p-1 hover:text-brand-pink transition-colors">
                            <Edit3 className="w-4.5 h-4.5" />
                          </button>
                          <button onClick={() => handleDeleteTestimonial(item.id)} className="p-1 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-xs italic font-sans leading-relaxed mt-2">"{item.review}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- ALL CMS CRUD DIALOG MODALS --- */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalType(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#0f0f13] border border-white/10 p-6 sm:p-8 rounded-2xl z-10 shadow-2xl shadow-black font-sans text-sm text-zinc-300 space-y-4"
            >
              <button onClick={() => setModalType(null)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg transition-colors focus:outline-none">
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] uppercase font-bold text-brand-pink tracking-widest block mb-1">
                CMS Editor
              </span>
              <h3 className="text-xl font-bold text-white mb-6">
                {editId ? 'Modify' : 'Create new'} {modalType.toUpperCase()}
              </h3>

              <form onSubmit={handleSaveForm} className="space-y-4 text-xs sm:text-sm">
                
                {/* 1. CLASS MODAL */}
                {modalType === 'class' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Class Name</label>
                      <input type="text" required value={classForm.name} onChange={e => setClassForm({ ...classForm, name: e.target.value })} placeholder="e.g., Hip-Hop Core Street Grooves" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Style</label>
                      <select value={classForm.style} onChange={e => setClassForm({ ...classForm, style: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 focus:outline-none focus:border-brand-pink">
                        <option value="Hip-Hop">Hip-Hop</option>
                        <option value="Bollywood Dance">Bollywood Dance</option>
                        <option value="Contemporary">Contemporary</option>
                        <option value="Classical Dance">Classical Dance</option>
                        <option value="Freestyle">Freestyle</option>
                        <option value="Kids Dance">Kids Dance</option>
                        <option value="Fitness Dance">Fitness Dance</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Age Group</label>
                        <select value={classForm.ageGroup} onChange={e => setClassForm({ ...classForm, ageGroup: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 focus:outline-none">
                          <option value="Kids">Kids</option>
                          <option value="Teens">Teens</option>
                          <option value="Adults">Adults</option>
                          <option value="All Ages">All Ages</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Level</label>
                        <select value={classForm.level} onChange={e => setClassForm({ ...classForm, level: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 focus:outline-none">
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="All Levels">All Levels</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Schedule (comma separated)</label>
                      <input type="text" required value={classForm.scheduleStr} onChange={e => setClassForm({ ...classForm, scheduleStr: e.target.value })} placeholder="e.g., Monday 5:00 PM - 6:00 PM, Wednesday 5:00 PM - 6:00 PM" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-brand-pink" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Fees</label>
                        <input type="text" required value={classForm.fees} onChange={e => setClassForm({ ...classForm, fees: e.target.value })} placeholder="e.g., $75 / month" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Trainer</label>
                        <select value={classForm.trainerId} onChange={e => setClassForm({ ...classForm, trainerId: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 focus:outline-none">
                          {instructors.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Cover Image URL</label>
                      <input type="text" value={classForm.imageUrl} onChange={e => setClassForm({ ...classForm, imageUrl: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Description</label>
                      <textarea rows={3} required value={classForm.description} onChange={e => setClassForm({ ...classForm, description: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none resize-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Packages Format (Name:Price:Desc | ...)</label>
                      <input type="text" value={classForm.packagesStr} onChange={e => setClassForm({ ...classForm, packagesStr: e.target.value })} placeholder="e.g. Monthly Pass:$75:Access classes | Drop-in:$15:Single session" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Student Benefits (comma separated)</label>
                      <input type="text" value={classForm.benefitsStr} onChange={e => setClassForm({ ...classForm, benefitsStr: e.target.value })} placeholder="e.g. Boost stamina, Master footwork, Gain stage confidence" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none" />
                    </div>
                    <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                      <input type="checkbox" id="online-check" checked={classForm.isOnline} onChange={e => setClassForm({ ...classForm, isOnline: e.target.checked })} />
                      <label htmlFor="online-check" className="text-xs font-bold uppercase text-zinc-400 tracking-wider cursor-pointer">This is an Online/Live Class</label>
                    </div>
                    {classForm.isOnline && (
                      <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg grid grid-cols-1 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10.5px] font-semibold text-zinc-500">Live Sessions Details</label>
                          <input type="text" value={classForm.liveSessions} onChange={e => setClassForm({ ...classForm, liveSessions: e.target.value })} placeholder="e.g. 1 Live zoom session per week" className="w-full px-2.5 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10.5px] font-semibold text-zinc-500">Recorded Library Access</label>
                          <input type="text" value={classForm.recordedAccess} onChange={e => setClassForm({ ...classForm, recordedAccess: e.target.value })} placeholder="e.g. 24/7 Access to 300+ tutorial videos" className="w-full px-2.5 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. EVENT MODAL */}
                {modalType === 'event' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Event Title</label>
                      <input type="text" required value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Category</label>
                        <select value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300">
                          <option value="Workshop">Workshop</option>
                          <option value="Competition">Competition</option>
                          <option value="Dance Show">Dance Show</option>
                          <option value="Masterclass">Masterclass</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Price/Fee</label>
                        <input type="text" required value={eventForm.price} onChange={e => setEventForm({ ...eventForm, price: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Date (YYYY-MM-DD)</label>
                        <input type="text" required value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Time</label>
                        <input type="text" required value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Venue</label>
                      <input type="text" required value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Banner Image URL</label>
                      <input type="text" value={eventForm.bannerImage} onChange={e => setEventForm({ ...eventForm, bannerImage: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Description</label>
                      <textarea rows={3} required value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white resize-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="active-check" checked={eventForm.isActive} onChange={e => setEventForm({ ...eventForm, isActive: e.target.checked })} />
                      <label htmlFor="active-check" className="text-xs font-bold uppercase text-zinc-400 tracking-wider cursor-pointer">Active (Accepting Registrations)</label>
                    </div>
                  </div>
                )}

                {/* 3. BLOG MODAL */}
                {modalType === 'blog' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Post Title</label>
                      <input type="text" required value={blogForm.title} onChange={e => setBlogForm({ ...blogForm, title: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Category</label>
                        <select value={blogForm.category} onChange={e => setBlogForm({ ...blogForm, category: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300">
                          <option value="Dance Tips">Dance Tips</option>
                          <option value="Fitness & Lifestyle">Fitness & Lifestyle</option>
                          <option value="Studio News">Studio News</option>
                          <option value="Event Updates">Event Updates</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Author Name</label>
                        <input type="text" required value={blogForm.author} onChange={e => setBlogForm({ ...blogForm, author: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Featured Image URL</label>
                      <input type="text" value={blogForm.featuredImage} onChange={e => setBlogForm({ ...blogForm, featuredImage: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Tags (comma separated)</label>
                      <input type="text" value={blogForm.tagsStr} onChange={e => setBlogForm({ ...blogForm, tagsStr: e.target.value })} placeholder="Warmup, Safety, Zumba" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Markdown Content</label>
                      <textarea rows={8} required value={blogForm.content} onChange={e => setBlogForm({ ...blogForm, content: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white resize-none font-mono text-xs" />
                    </div>
                  </div>
                )}

                {/* 4. INSTRUCTOR MODAL */}
                {modalType === 'instructor' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Full Name</label>
                      <input type="text" required value={instructorForm.name} onChange={e => setInstructorForm({ ...instructorForm, name: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Experience</label>
                        <input type="text" required value={instructorForm.experience} onChange={e => setInstructorForm({ ...instructorForm, experience: e.target.value })} placeholder="e.g. 8+ Years" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Specialization</label>
                        <input type="text" required value={instructorForm.specialization} onChange={e => setInstructorForm({ ...instructorForm, specialization: e.target.value })} placeholder="e.g. Contemporary, Lyrical" className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Photo URL</label>
                      <input type="text" value={instructorForm.photo} onChange={e => setInstructorForm({ ...instructorForm, photo: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase text-zinc-500">Instagram</label>
                        <input type="text" value={instructorForm.instagram} onChange={e => setInstructorForm({ ...instructorForm, instagram: e.target.value })} placeholder="https://..." className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase text-zinc-500">Facebook</label>
                        <input type="text" value={instructorForm.facebook} onChange={e => setInstructorForm({ ...instructorForm, facebook: e.target.value })} placeholder="https://..." className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase text-zinc-500">YouTube</label>
                        <input type="text" value={instructorForm.youtube} onChange={e => setInstructorForm({ ...instructorForm, youtube: e.target.value })} placeholder="https://..." className="w-full px-2 py-1.5 bg-zinc-900 border border-white/5 rounded-md text-xs text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. GALLERY MODAL */}
                {modalType === 'gallery' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Title</label>
                      <input type="text" required value={galleryForm.title} onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Type</label>
                        <select value={galleryForm.type} onChange={e => setGalleryForm({ ...galleryForm, type: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300">
                          <option value="photo">Photo</option>
                          <option value="video">Video</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Category</label>
                        <select value={galleryForm.category} onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300">
                          <option value="Annual Show">Annual Show</option>
                          <option value="Workshops">Workshops</option>
                          <option value="Competitions">Competitions</option>
                          <option value="Reels">Reels</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Media URL</label>
                      <input type="text" required value={galleryForm.url} onChange={e => setGalleryForm({ ...galleryForm, url: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    {galleryForm.type === 'video' && (
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Cover Image URL (For Video)</label>
                        <input type="text" value={galleryForm.coverImage} onChange={e => setGalleryForm({ ...galleryForm, coverImage: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    )}
                  </div>
                )}

                {/* 6. TESTIMONIAL MODAL */}
                {modalType === 'testimonial' && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Reviewer Name</label>
                      <input type="text" required value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Role</label>
                        <select value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value as any })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300">
                          <option value="Student">Student</option>
                          <option value="Parent">Parent</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Rating (1 to 5)</label>
                        <input type="number" min="1" max="5" required value={testimonialForm.rating} onChange={e => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Avatar Image URL</label>
                      <input type="text" value={testimonialForm.avatar} onChange={e => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider">Review Quote</label>
                      <textarea rows={3} required value={testimonialForm.review} onChange={e => setTestimonialForm({ ...testimonialForm, review: e.target.value })} className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white resize-none" />
                    </div>
                  </div>
                )}

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-white/10 text-white rounded-lg transition-colors font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary py-2 px-5">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
