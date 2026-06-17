import { IClass, IInstructor, IEvent, IGalleryItem, IBlog, ITestimonial } from '../types';

export const DEFAULT_CLASSES: IClass[] = [
  {
    id: 'hip-hop-core',
    name: 'Hip-Hop Street Grooves',
    description: 'Learn the fundamentals of hip-hop including popping, locking, breaking, and modern commercial choreography. Perfect for building rhythm, coordination, and confidence.',
    style: 'Hip-Hop',
    ageGroup: 'Teens',
    level: 'Beginner',
    schedule: ['Monday 5:00 PM - 6:00 PM', 'Wednesday 5:00 PM - 6:00 PM'],
    fees: '$75 / month',
    packages: [
      { name: 'Monthly Pass', price: '$75', description: 'Access to 2 classes per week' },
      { name: 'Drop-in Class', price: '$15', description: 'Single class access' },
      { name: 'Quarterly Package', price: '$200', description: '3 months full access (Save $25)' }
    ],
    trainerId: 'alex-reed',
    trainerName: 'Alex Reed',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    benefits: [
      'Improve physical strength and stamina',
      'Learn musicality and lock-in on beats',
      'Gain self-expression and performance styling',
      'High-energy, supportive group environment'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'bollywood-magic',
    name: 'Bollywood Beats & Masala',
    description: 'An energetic blend of modern Indian film dance styles including folk, hip-hop, and classical fusion. High-energy beats, expressive movements, and pure theatrical fun!',
    style: 'Bollywood Dance',
    ageGroup: 'All Ages',
    level: 'All Levels',
    schedule: ['Tuesday 6:30 PM - 7:30 PM', 'Thursday 6:30 PM - 7:30 PM'],
    fees: '$80 / month',
    packages: [
      { name: 'Monthly Pass', price: '$80', description: 'Access to 2 classes per week' },
      { name: 'Quarterly Package', price: '$220', description: '3 months of Bollywood fun' }
    ],
    trainerId: 'priya-sharma',
    trainerName: 'Priya Sharma',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'Full-body cardiovascular workout',
      'Learn facial expressions (Abhinaya) and storytelling',
      'Master intricate footwork and hand mudras',
      'Perfect for festive performance readiness'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'contemporary-flow',
    name: 'Contemporary Grace & Flow',
    description: 'Explore the beauty of contemporary dance. This class merges elements of classical ballet, modern dance, and floor work, focusing on fluid expression, breath, and release techniques.',
    style: 'Contemporary',
    ageGroup: 'Adults',
    level: 'Intermediate',
    schedule: ['Monday 7:00 PM - 8:30 PM', 'Friday 6:00 PM - 7:30 PM'],
    fees: '$90 / month',
    packages: [
      { name: 'Monthly Pass', price: '$90', description: 'Access to 2 intensive sessions per week' },
      { name: 'Single Workshop', price: '$20', description: 'Single 90-minute class access' }
    ],
    trainerId: 'elena-rostova',
    trainerName: 'Elena Rostova',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'Enhance core strength, flexibility, and balance',
      'Develop emotional storytelling through fluid motion',
      'Master floorwork and weight-shifting dynamics',
      'Learn custom, expressive dance combos'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'classical-foundation',
    name: 'Classical Kathak & Bharatanatyam',
    description: 'Immerse yourself in the traditional grace of Indian classical dance. Learn intricate footwork, graceful hand movements (Mudras), rhythmic patterns (Taal), and narrative expressions.',
    style: 'Classical Dance',
    ageGroup: 'Kids',
    level: 'Beginner',
    schedule: ['Saturday 10:00 AM - 11:30 AM', 'Sunday 10:00 AM - 11:30 AM'],
    fees: '$85 / month',
    packages: [
      { name: 'Standard Monthly', price: '$85', description: '2 sessions per week (Weekend Batch)' },
      { name: 'One-on-One Custom', price: '$150', description: '1 private session + group classes' }
    ],
    trainerId: 'priya-sharma',
    trainerName: 'Priya Sharma',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'Learn rich cultural history and dance heritage',
      'Improves posture, balance, and spatial awareness',
      'Trains mental discipline and rhythm coordination',
      'Official performance certification pathway'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'freestyle-jam',
    name: 'Freestyle Expression & Jam',
    description: 'Break free from rigid structures. This class focuses on improvisation, freestyle cyphers, and discovering your unique movement signature through various musical genres.',
    style: 'Freestyle',
    ageGroup: 'All Ages',
    level: 'Advanced',
    schedule: ['Wednesday 7:30 PM - 9:00 PM'],
    fees: '$60 / month',
    packages: [
      { name: 'Monthly Freestyle', price: '$60', description: '1 class per week plus open session access' },
      { name: 'Drop-in Jam', price: '$12', description: 'Access to one freestyle class' }
    ],
    trainerId: 'marcus-chen',
    trainerName: 'Marcus Chen',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'Build rapid improvisation and adaptation skills',
      'Conquer performance anxiety and stage fright',
      'Gain versatility across multiple musical styles',
      'Engage in weekly supportive cyphers and battles'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'kids-dance-camp',
    name: 'Little Stars Dance Camp',
    description: 'A fun-filled introduction to creative movement, coordination, and basic dance elements for younger children. We combine storytelling, music games, and basic dance steps.',
    style: 'Kids Dance',
    ageGroup: 'Kids',
    level: 'Beginner',
    schedule: ['Saturday 11:30 AM - 12:30 PM', 'Sunday 11:30 AM - 12:30 PM'],
    fees: '$70 / month',
    packages: [
      { name: 'Monthly Kid Pass', price: '$70', description: '2 weekend classes per week' }
    ],
    trainerId: 'elena-rostova',
    trainerName: 'Elena Rostova',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'Develop active listening and teamwork skills',
      'Boosts motor skills and rhythm retention',
      'Fosters creative imagination and self-confidence',
      'Fun, play-centered exercise'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'fitness-zumba',
    name: 'Zumba Fit & Glow',
    description: 'Ditch the workout, join the party! A high-energy, Latin-inspired dance fitness class that burns calories, tones your body, and lifts your mood. No dance experience required.',
    style: 'Fitness Dance',
    ageGroup: 'Adults',
    level: 'All Levels',
    schedule: ['Monday 7:00 AM - 8:00 AM', 'Wednesday 7:00 AM - 8:00 AM', 'Friday 7:00 AM - 8:00 AM'],
    fees: '$65 / month',
    packages: [
      { name: 'Unlimited Monthly', price: '$65', description: '3 morning classes per week' },
      { name: '10-Class Punch Card', price: '$90', description: 'Valid for 3 months' }
    ],
    trainerId: 'marcus-chen',
    trainerName: 'Marcus Chen',
    demoVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    benefits: [
      'High-calorie burn (up to 600 kcal per class)',
      'Full body toning through rhythmic core movements',
      'Boosts stamina, cardiovascular health, and agility',
      'Releases stress and floods you with endorphins'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'online-hiphop-pro',
    name: 'Online Advanced Hip-Hop Masterclass',
    description: 'Learn urban street styles from the comfort of your home. Includes weekly live streams, lifetime access to high-definition tutorial videos, and personalized feedback.',
    style: 'Hip-Hop',
    ageGroup: 'Teens',
    level: 'Advanced',
    schedule: ['Saturday 4:00 PM - 5:30 PM (Live Stream)'],
    fees: '$40 / month',
    packages: [
      { name: 'Digital Monthly', price: '$40', description: 'All live and recorded access' },
      { name: 'Annual Pass', price: '$350', description: 'Save $130' }
    ],
    trainerId: 'alex-reed',
    trainerName: 'Alex Reed',
    benefits: [
      'Practice anytime, anywhere with lifetime access to portal recordings',
      'Interactive chat and live choreographer correction feedback',
      'Downloadable slow-motion breakdown files'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    isOnline: true,
    onlineDetails: {
      liveSessions: '1 Live Interactive Session per week via Zoom',
      recordedAccess: '24/7 Access to Rock Video Library (300+ videos)',
      subscriptionPlan: 'Monthly Auto-Renewal (Cancel anytime)'
    }
  }
];

export const DEFAULT_INSTRUCTORS: IInstructor[] = [
  {
    id: 'alex-reed',
    name: 'Alex Reed',
    specialization: 'Hip-Hop, Popping & Urban Choreography',
    experience: '10+ Years',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      instagram: 'https://instagram.com/alexreed',
      youtube: 'https://youtube.com/alexreeddance'
    }
  },
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    specialization: 'Classical Kathak, Bharatnatyam & Bollywood Fusion',
    experience: '12+ Years',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      instagram: 'https://instagram.com/priyasharmadance',
      facebook: 'https://facebook.com/priyasharma'
    }
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    specialization: 'Contemporary, Modern Ballet & Lyrical',
    experience: '8+ Years',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      instagram: 'https://instagram.com/elenarostova',
      youtube: 'https://youtube.com/elenaflow'
    }
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    specialization: 'Freestyle Jamming, Breaking & Zumba Fitness',
    experience: '7+ Years',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      instagram: 'https://instagram.com/marcuschenfit',
      facebook: 'https://facebook.com/marcuschen'
    }
  }
];

export const DEFAULT_EVENTS: IEvent[] = [
  {
    id: 'event-annual-2026',
    title: 'Rock Showcase 2026: Ignite!',
    category: 'Dance Show',
    date: '2026-08-15',
    time: '6:00 PM',
    venue: 'Royal City Theater, Downtown',
    description: 'Our annual flagship dance production showcasing the raw passion and hard work of all our student batches. Witness spectacular choreographies, light displays, and special performances from international choreographers.',
    bannerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    price: '$25 (Standard Ticket)',
    isActive: true
  },
  {
    id: 'event-workshop-summer',
    title: 'Urban Hip-Hop Masterclass with Guest Star',
    category: 'Workshop',
    date: '2026-07-10',
    time: '2:00 PM - 5:00 PM',
    venue: 'Rock Dance Studio Main Floor',
    description: 'An exclusive 3-hour intensive session with a renowned global street dancer. Learn advanced musicality, routine retention, and the business of commercial choreography.',
    bannerImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    price: '$50 per registrant',
    isActive: true
  },
  {
    id: 'event-comp-clash',
    title: 'National Street Dance Battle Clash',
    category: 'Competition',
    date: '2026-09-05',
    time: '11:00 AM onwards',
    venue: 'Metro Sports Arena',
    description: 'Represent Rock Dance Studio or enter as a solo contestant! Category battles include 1v1 Breaking, 2v2 All-styles, and crew choreography showcase. Huge cash prizes, medals, and national recognition up for grabs.',
    bannerImage: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1200&q=80',
    price: '$15 entry fee / Free for audience',
    isActive: true
  },
  {
    id: 'event-masterclass-contemporary',
    title: 'Lyrical Contemporary & Floorwork Intensive',
    category: 'Masterclass',
    date: '2026-07-25',
    time: '4:00 PM - 7:00 PM',
    venue: 'Rock Dance Studio Floor B',
    description: 'Deep dive into floorwork transitions, fluid release techniques, and lyrical expressiveness. Curated for intermediate to advanced dancers looking to perfect their emotional storytelling.',
    bannerImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80',
    price: '$35 registration',
    isActive: true
  }
];

export const DEFAULT_GALLERY: IGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Annual Day Hip-Hop Crew',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    category: 'Annual Show'
  },
  {
    id: 'gal-2',
    title: 'Bollywood Masterclass Vibrancy',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?auto=format&fit=crop&w=1000&q=80',
    category: 'Workshops'
  },
  {
    id: 'gal-3',
    title: 'Elena Flow Contemporary Solos',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=80',
    category: 'Annual Show'
  },
  {
    id: 'gal-4',
    title: 'First Prize Winner Trophy - Street Battle 2025',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1000&q=80',
    category: 'Competitions'
  },
  {
    id: 'gal-v1',
    title: 'Studio Showcase Performance 2025',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-dancers-performing-on-stage-with-lights-32431-large.mp4',
    category: 'Annual Show',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-v2',
    title: 'Hip-Hop Studio Freestyle Routine',
    type: 'video',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-freestyle-in-a-studio-34352-large.mp4',
    category: 'Reels',
    coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gal-5',
    title: 'Kathak Rhythms Group Formation',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80',
    category: 'Annual Show'
  },
  {
    id: 'gal-6',
    title: 'Zumba Morning Glow Energy Session',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    category: 'Workshops'
  }
];

export const DEFAULT_BLOGS: IBlog[] = [
  {
    id: 'blog-prev-injuries',
    title: '5 Crucial Warm-Up Tips to Prevent Dance Injuries',
    slug: 'prevent-dance-injuries-warmup-tips',
    content: `Warm-up is not just a routine; it is a critical physiological and psychological preparation phase before pushing your body to achieve grace and strength. As professional dancers, we know that jumping straight into intense choreographies is the primary cause of muscle strains, ligament sprains, and chronic fatigue.

### Why Warming Up is Non-Negotiable
1. **Increases Blood Flow:** Getting your heart rate up dilates blood vessels, ensuring oxygen-rich blood reaches active skeletal muscles.
2. **Improves Joint Lubrication:** Dynamic stretches stimulate the production of synovial fluid, reducing friction in joints like knees, ankles, and spine.
3. **Prepares the Nervous System:** Neuromuscular pathways wake up, leading to better balance, posture, and coordination.

### 5-Step Warmup Routine
1. **Light Cardio (5 mins):** Jumping jacks, dynamic skipping, or jogging in place.
2. **Joint Circles:** Head rolls, shoulder rotations, hip openers, and ankle circles.
3. **Dynamic Stretches:** Hamstring sweeps, lunges, and side reaches. Avoid long-held static stretches before dancing, as they can actually decrease power output.
4. **Core Activation:** Planks and bird-dogs. A stable core is the anchor of every clean turn and jump.
5. **Rhythm Prep:** Aligning your breathing with the bpm of the music.

Stay safe, warm up properly, and let your passion shine without the setback of injury!`,
    author: 'Elena Rostova',
    date: '2026-06-10',
    category: 'Dance Tips',
    featuredImage: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
    tags: ['Safety', 'Contemporary', 'Warmup', 'Fitness'],
    comments: [
      { id: 'c1', name: 'John Doe', email: 'john@example.com', comment: 'Super helpful! I used to skip warmups and always had sore knees. Tried this routine and felt way better.', date: '2026-06-11' }
    ]
  },
  {
    id: 'blog-zumba-health',
    title: 'Why Zumba is the Ultimate Full-Body Cardio Workout',
    slug: 'zumba-ultimate-full-body-workout',
    content: `If you dread traditional running treadmills or lifting heavy weights, Zumba is your ticket to fitness heaven. It blends high-energy Latin music with simple, effective aerobic routines to create an environment where exercise doesn't feel like a chore.

### The Science of Zumba Fitness
* **Interval Training:** Zumba routines alternate between fast tempos and slower recovery periods, which is proven to optimize calorie burn and build cardiovascular stamina.
* **Muscular Toning:** The choreo includes squats, lunges, and core twist variations that target glutes, legs, arms, and abs.
* **Mental Reset:** The upbeat atmosphere floods your brain with feel-good endorphins, making it a powerful stress-reliever.

Join us every Monday, Wednesday, and Friday morning at Rock Dance Studio to dance, sweat, and glow together!`,
    author: 'Marcus Chen',
    date: '2026-06-05',
    category: 'Fitness & Lifestyle',
    featuredImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    tags: ['Zumba', 'Fitness', 'Cardio', 'Health'],
    comments: []
  },
  {
    id: 'blog-kathak-history',
    title: 'Demystifying Kathak: The Art of Storytelling',
    slug: 'demystifying-kathak-art-storytelling',
    content: `Kathak is one of the eight major forms of Indian classical dance. Originating from ancient northern India, the word Kathak is derived from the Sanskrit word 'Katha' which means story, and 'Kathakar' which means storyteller.

### The Three Pillars of Kathak
1. **Nritta (Pure Dance):** Focuses on technical execution. This includes fast footwork (*tatkar*), swift turns (*chakkar*), and rhythmic patterns played on the bells (*ghungroo*).
2. **Nritya (Expressive Dance):** Mimes and gestures used to communicate tales of mythology, romance, and life.
3. **Natya (Drama):** The theatrical play element where the dancer assumes different characters.

Kathak is more than just graceful postures; it is a spiritual conversation with rhythm. Starting young helps children develop focus, posture, and deep connection to classical music.`,
    author: 'Priya Sharma',
    date: '2026-05-28',
    category: 'Studio News',
    featuredImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    tags: ['Kathak', 'Classical', 'Culture', 'Storytelling'],
    comments: []
  },
  {
    id: 'blog-join-rock-dance',
    title: 'Rock Showcase 2026: Ignite! Registrations Now Open',
    slug: 'rock-showcase-2026-ignite-open',
    content: `It's that time of the year again! The stage is calling, the spot lights are ready, and the music is cranking. We are absolutely thrilled to announce registrations are now open for our annual flagship showcase: **Rock Showcase 2026: Ignite!**

### What to Expect:
* 12 custom choreographies designed by our team of elite trainers.
* High-production stage setup at the Royal City Theater.
* Video recordings, professional photoshoot, and participation certificates for all dancers.
* Special finale performance.

Batch practice schedules begin July 1st. Speak with your instructor or register in the Events page of our website today. Let's ignite the stage together!`,
    author: 'Alex Reed',
    date: '2026-06-15',
    category: 'Event Updates',
    featuredImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    tags: ['Showcase', 'Studio', 'Stage Performance', 'Events'],
    comments: []
  }
];

export const DEFAULT_TESTIMONIALS: ITestimonial[] = [
  {
    id: 'test-1',
    name: 'Samantha Collins',
    role: 'Student',
    review: 'Rock Dance Studio completely changed my perspective on dancing! The trainers are supportive, and the hip-hop classes are high energy. I feel so much more confident performing now.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    name: 'David Miller',
    role: 'Parent',
    review: 'My 8-year-old daughter joined the Little Stars Dance Camp and she absolutely loves it. The environment is extremely positive, safe, and fun. Highly recommend for any parents looking for dance classes!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Rohan Malhotra',
    role: 'Student',
    review: 'Priya ma\'am is incredible! The detail she puts into teaching Kathak is amazing. The fusion workshops are also super fun and keep me physically active.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-4',
    name: 'Sarah Thompson',
    role: 'Student',
    review: 'I do the Zumba Fit classes in the mornings and it has done wonders for my stamina and mental wellness. Marcus is full of energy and keeps us motivated throughout the session!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];
