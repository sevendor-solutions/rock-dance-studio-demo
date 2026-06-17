import { IClass, IInstructor, IEvent, IGalleryItem, IBlog, ITestimonial, IEnquiry } from '../types';
import {
  DEFAULT_CLASSES,
  DEFAULT_INSTRUCTORS,
  DEFAULT_EVENTS,
  DEFAULT_GALLERY,
  DEFAULT_BLOGS,
  DEFAULT_TESTIMONIALS
} from './mockData';

// Helper keys
const KEYS = {
  CLASSES: 'rock_classes',
  INSTRUCTORS: 'rock_instructors',
  EVENTS: 'rock_events',
  GALLERY: 'rock_gallery',
  BLOGS: 'rock_blogs',
  TESTIMONIALS: 'rock_testimonials',
  ENQUIRIES: 'rock_enquiries'
};

// Generic read/write helpers
const readFromStorage = <T>(key: string, defaultVal: T[]): T[] => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error parsing localStorage key "${key}":`, err);
    return defaultVal;
  }
};

const writeToStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  // --- Classes ---
  getClasses: (): IClass[] => readFromStorage<IClass>(KEYS.CLASSES, DEFAULT_CLASSES),
  saveClasses: (data: IClass[]) => writeToStorage(KEYS.CLASSES, data),
  addClass: (item: Omit<IClass, 'id'>): IClass => {
    const list = db.getClasses();
    const newItem = { ...item, id: 'class_' + Math.random().toString(36).substring(2, 9) } as IClass;
    list.push(newItem);
    db.saveClasses(list);
    return newItem;
  },
  updateClass: (id: string, update: Partial<IClass>): IClass | null => {
    const list = db.getClasses();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...update };
    list[idx] = updated;
    db.saveClasses(list);
    return updated;
  },
  deleteClass: (id: string): boolean => {
    const list = db.getClasses();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveClasses(filtered);
    return true;
  },

  // --- Instructors ---
  getInstructors: (): IInstructor[] => readFromStorage<IInstructor>(KEYS.INSTRUCTORS, DEFAULT_INSTRUCTORS),
  saveInstructors: (data: IInstructor[]) => writeToStorage(KEYS.INSTRUCTORS, data),
  addInstructor: (item: Omit<IInstructor, 'id'>): IInstructor => {
    const list = db.getInstructors();
    const newItem = { ...item, id: 'inst_' + Math.random().toString(36).substring(2, 9) } as IInstructor;
    list.push(newItem);
    db.saveInstructors(list);
    return newItem;
  },
  updateInstructor: (id: string, update: Partial<IInstructor>): IInstructor | null => {
    const list = db.getInstructors();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...update };
    list[idx] = updated;
    db.saveInstructors(list);
    return updated;
  },
  deleteInstructor: (id: string): boolean => {
    const list = db.getInstructors();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveInstructors(filtered);
    return true;
  },

  // --- Events ---
  getEvents: (): IEvent[] => readFromStorage<IEvent>(KEYS.EVENTS, DEFAULT_EVENTS),
  saveEvents: (data: IEvent[]) => writeToStorage(KEYS.EVENTS, data),
  addEvent: (item: Omit<IEvent, 'id'>): IEvent => {
    const list = db.getEvents();
    const newItem = { ...item, id: 'event_' + Math.random().toString(36).substring(2, 9) } as IEvent;
    list.push(newItem);
    db.saveEvents(list);
    return newItem;
  },
  updateEvent: (id: string, update: Partial<IEvent>): IEvent | null => {
    const list = db.getEvents();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...update };
    list[idx] = updated;
    db.saveEvents(list);
    return updated;
  },
  deleteEvent: (id: string): boolean => {
    const list = db.getEvents();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveEvents(filtered);
    return true;
  },

  // --- Gallery ---
  getGallery: (): IGalleryItem[] => readFromStorage<IGalleryItem>(KEYS.GALLERY, DEFAULT_GALLERY),
  saveGallery: (data: IGalleryItem[]) => writeToStorage(KEYS.GALLERY, data),
  addGalleryItem: (item: Omit<IGalleryItem, 'id'>): IGalleryItem => {
    const list = db.getGallery();
    const newItem = { ...item, id: 'gal_' + Math.random().toString(36).substring(2, 9) } as IGalleryItem;
    list.push(newItem);
    db.saveGallery(list);
    return newItem;
  },
  updateGalleryItem: (id: string, update: Partial<IGalleryItem>): IGalleryItem | null => {
    const list = db.getGallery();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...update };
    list[idx] = updated;
    db.saveGallery(list);
    return updated;
  },
  deleteGalleryItem: (id: string): boolean => {
    const list = db.getGallery();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveGallery(filtered);
    return true;
  },

  // --- Blogs ---
  getBlogs: (): IBlog[] => readFromStorage<IBlog>(KEYS.BLOGS, DEFAULT_BLOGS),
  saveBlogs: (data: IBlog[]) => writeToStorage(KEYS.BLOGS, data),
  addBlog: (item: Omit<IBlog, 'id' | 'slug' | 'comments'>): IBlog => {
    const list = db.getBlogs();
    const id = 'blog_' + Math.random().toString(36).substring(2, 9);
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newItem = { ...item, id, slug, comments: [] } as IBlog;
    list.push(newItem);
    db.saveBlogs(list);
    return newItem;
  },
  updateBlog: (id: string, update: Partial<IBlog>): IBlog | null => {
    const list = db.getBlogs();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    let newSlug = list[idx].slug;
    if (update.title && update.title !== list[idx].title) {
      newSlug = update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const updated = { ...list[idx], ...update, slug: newSlug };
    list[idx] = updated;
    db.saveBlogs(list);
    return updated;
  },
  deleteBlog: (id: string): boolean => {
    const list = db.getBlogs();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveBlogs(filtered);
    return true;
  },
  addCommentToBlog: (blogId: string, comment: { name: string; email: string; comment: string }): boolean => {
    const list = db.getBlogs();
    const idx = list.findIndex(x => x.id === blogId);
    if (idx === -1) return false;
    const newComment = {
      id: 'c_' + Math.random().toString(36).substring(2, 9),
      ...comment,
      date: new Date().toISOString().split('T')[0]
    };
    list[idx].comments.push(newComment);
    db.saveBlogs(list);
    return true;
  },

  // --- Testimonials ---
  getTestimonials: (): ITestimonial[] => readFromStorage<ITestimonial>(KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS),
  saveTestimonials: (data: ITestimonial[]) => writeToStorage(KEYS.TESTIMONIALS, data),
  addTestimonial: (item: Omit<ITestimonial, 'id'>): ITestimonial => {
    const list = db.getTestimonials();
    const newItem = { ...item, id: 'test_' + Math.random().toString(36).substring(2, 9) } as ITestimonial;
    list.push(newItem);
    db.saveTestimonials(list);
    return newItem;
  },
  updateTestimonial: (id: string, update: Partial<ITestimonial>): ITestimonial | null => {
    const list = db.getTestimonials();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...update };
    list[idx] = updated;
    db.saveTestimonials(list);
    return updated;
  },
  deleteTestimonial: (id: string): boolean => {
    const list = db.getTestimonials();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveTestimonials(filtered);
    return true;
  },

  // --- Enquiries ---
  getEnquiries: (): IEnquiry[] => readFromStorage<IEnquiry>(KEYS.ENQUIRIES, []),
  saveEnquiries: (data: IEnquiry[]) => writeToStorage(KEYS.ENQUIRIES, data),
  addEnquiry: (item: Omit<IEnquiry, 'id' | 'date' | 'status'>): IEnquiry => {
    const list = db.getEnquiries();
    const newItem = {
      ...item,
      id: 'enq_' + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    } as IEnquiry;
    list.unshift(newItem); // New leads appear first
    db.saveEnquiries(list);
    return newItem;
  },
  updateEnquiryStatus: (id: string, status: 'Pending' | 'Contacted' | 'Resolved'): IEnquiry | null => {
    const list = db.getEnquiries();
    const idx = list.findIndex(x => x.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], status };
    list[idx] = updated;
    db.saveEnquiries(list);
    return updated;
  },
  deleteEnquiry: (id: string): boolean => {
    const list = db.getEnquiries();
    const filtered = list.filter(x => x.id !== id);
    if (list.length === filtered.length) return false;
    db.saveEnquiries(filtered);
    return true;
  }
};
