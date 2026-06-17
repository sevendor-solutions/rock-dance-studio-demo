export interface IUser {
  id: string;
  username: string;
  role: 'admin';
}

export interface IClass {
  id: string;
  name: string;
  description: string;
  style: string;
  ageGroup: 'Kids' | 'Teens' | 'Adults' | 'All Ages';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  schedule: string[];
  fees: string;
  packages: { name: string; price: string; description: string }[];
  trainerId: string;
  trainerName: string;
  demoVideo?: string;
  benefits: string[];
  imageUrl: string;
  isOnline: boolean;
  onlineDetails?: {
    liveSessions: string;
    recordedAccess: string;
    subscriptionPlan: string;
  };
}

export interface IInstructor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  photo: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export interface IEvent {
  id: string;
  title: string;
  category: 'Workshop' | 'Competition' | 'Dance Show' | 'Masterclass';
  date: string;
  time: string;
  venue: string;
  description: string;
  bannerImage: string;
  price: string;
  isActive: boolean;
}

export interface IGalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  category: 'Annual Show' | 'Workshops' | 'Competitions' | 'Reels';
  coverImage?: string;
}

export interface IComment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
}

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  category: 'Dance Tips' | 'Fitness & Lifestyle' | 'Studio News' | 'Event Updates';
  featuredImage: string;
  tags: string[];
  comments: IComment[];
}

export interface ITestimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent';
  review: string;
  rating: number;
  avatar: string;
}

export interface IEnquiry {
  id: string;
  type: 'contact' | 'trial' | 'enrollment' | 'event';
  name: string;
  email: string;
  phone: string;
  message: string;
  targetId?: string;
  targetName?: string;
  date: string;
  status: 'Pending' | 'Contacted' | 'Resolved';
}
