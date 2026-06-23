export const isPreviewMode = () =>
  import.meta.env.DEV && import.meta.env.VITE_DEV_PREVIEW === 'true';

export const MOCK_INTERESTS = [
  { id: 1, name: 'Aerobics', interest_type: 'Individual Sports' },
  { id: 2, name: 'Ballet', interest_type: 'Individual Sports' },
  { id: 3, name: 'Calisthenics', interest_type: 'Individual Sports' },
  { id: 4, name: 'Dance', interest_type: 'Individual Sports' },
  { id: 5, name: 'Gymnastics', interest_type: 'Individual Sports' },
  { id: 6, name: 'Hiking', interest_type: 'Individual Sports' },
  { id: 7, name: 'Obstacle Racing', interest_type: 'Individual Sports' },
  { id: 8, name: 'Pilates', interest_type: 'Individual Sports' },
  { id: 9, name: 'Running', interest_type: 'Individual Sports' },
  { id: 10, name: 'Walking', interest_type: 'Individual Sports' },
  { id: 11, name: 'Yoga', interest_type: 'Individual Sports' },
  { id: 12, name: 'Basketball', interest_type: 'Ball Sports' },
  { id: 13, name: 'Soccer', interest_type: 'Ball Sports' },
  { id: 14, name: 'Cycling', interest_type: 'Wheel Sports' },
  { id: 15, name: 'Boxing', interest_type: 'Combat Sports' },
  { id: 16, name: 'Weight Training', interest_type: 'Resistance Training' },
  { id: 17, name: 'Skiing', interest_type: 'Winter Sports' },
  { id: 18, name: 'Swimming', interest_type: 'Water Sports' },
];

export const MOCK_PILLARS = [
  { id: 1, pillar_title: 'Physical Wellbeing', description: 'Energy, movement, sleep, and routine care', is_active: 1 },
  { id: 2, pillar_title: 'Mental Wellbeing', description: 'Clarity, focus, and mindfulness', is_active: 1 },
  { id: 3, pillar_title: 'Emotional Wellbeing', description: 'Resilience, self-awareness, and stress regulation', is_active: 1 },
  { id: 4, pillar_title: 'Social Wellbeing', description: 'Relationships and meaningful connection', is_active: 1 },
  { id: 5, pillar_title: 'Intellectual Wellbeing', description: 'Growth, creativity, and learning', is_active: 1 },
  { id: 6, pillar_title: 'Occupational Wellbeing', description: 'Purpose, performance, and work-life balance', is_active: 1 },
  { id: 7, pillar_title: 'Spiritual Wellbeing', description: 'Values, meaning, and inner alignment', is_active: 1 },
  { id: 8, pillar_title: 'Environmental Wellbeing', description: 'Healthy, safe, and productive surroundings', is_active: 1 },
  { id: 9, pillar_title: 'Purpose & Contribution', description: 'Giving back and living with meaning', is_active: 1 },
  { id: 10, pillar_title: 'Longevity', description: 'A sustainable, healthy lifestyle for the long term', is_active: 1 },
  { id: 11, pillar_title: 'Nutritional Wellbeing', description: 'Fuelling your body and brain with intention', is_active: 1 },
  { id: 12, pillar_title: 'Financial Wellbeing', description: 'Security, budgeting, and long-term stability', is_active: 1 },
];

export const MOCK_PREVIEW_STATE = {
  companyId: 12,
  companyName: 'Woliba',
  email: 'shivanishendkar@company.com',
  fname: 'Shivani',
  lname: 'Shendkar',
  otpToken: 'preview-mock-token',
  password: 'Shivani@Woliba',
  birthday: new Date(2007, 0, 6).toISOString(),
  phoneNumber: '9876543210',
  workAnniversary: '',
  acceptedTerms: true,
  selectedInterests: [1, 3, 7],
  selectedPillars: [],
  registeredUser: {
    fname: 'Shivani',
    lname: 'Shendkar',
    email: 'shivanishendkar@company.com',
  },
  authToken: 'preview-auth-token',
  loading: false,
  error: null,
};

export const PREVIEW_PAGES = [
  { label: '1. Company', path: '/' },
  { label: '2. User Details', path: '/user-details' },
  { label: '3. OTP', path: '/verify-otp' },
  { label: '4. Credentials', path: '/login-credentials' },
  { label: '5. Interests', path: '/wellness-interests' },
  { label: '6. Pillars', path: '/wellbeing-pillars' },
  { label: '7. Loading', path: '/registration-loading' },
  { label: '8. Welcome', path: '/welcome' },
];
