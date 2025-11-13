// Constants for resume analysis

// Action verbs for resume bullet points
export const ACTION_VERBS = [
  'achieved', 'implemented', 'developed', 'designed', 'led', 'managed', 'created',
  'built', 'launched', 'improved', 'increased', 'reduced', 'optimized', 'streamlined',
  'coordinated', 'facilitated', 'established', 'delivered', 'executed', 'spearheaded',
  'directed', 'conducted', 'generated', 'analyzed', 'resolved', 'collaborated',
  'mentored', 'trained', 'automated', 'migrated', 'integrated', 'architected',
  'initiated', 'pioneered', 'transformed', 'enhanced', 'maintained', 'supervised',
  'administered', 'planned', 'organized', 'negotiated', 'presented', 'demonstrated',
  'evaluated', 'reviewed', 'audited', 'researched', 'investigated', 'documented',
  'compiled', 'tested', 'debugged', 'deployed', 'configured', 'upgraded',
  'standardized', 'consolidated', 'eliminated', 'reorganized', 'restructured',
  'accelerated', 'expanded', 'modernized', 'revitalized', 'simplified'
];

// Impact words that show results and achievements
export const IMPACT_WORDS = [
  'increased', 'decreased', 'reduced', 'improved', 'enhanced', 'optimized',
  'accelerated', 'boosted', 'maximized', 'minimized', 'saved', 'generated',
  'achieved', 'exceeded', 'delivered', 'transformed', 'pioneered', 'innovated',
  'streamlined', 'eliminated', 'scaled', 'doubled', 'tripled', 'quadrupled',
  'strengthened', 'amplified', 'expedited', 'surpassed', 'outperformed'
];

// Resume templates available
export const RESUME_TEMPLATES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMALIST: 'minimalist'
};

// Resume section names
export const RESUME_SECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects'
};

// Default empty resume structure
export const DEFAULT_RESUME = {
  id: '',
  userId: '',
  title: 'Untitled Resume',
  targetRole: '',
  template: RESUME_TEMPLATES.MODERN,
  createdAt: '',
  updatedAt: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
};

// Validation constraints
export const VALIDATION_RULES = {
  NAME: { min: 2, max: 50 },
  TEXT_SHORT: { min: 1, max: 100 },
  TEXT_MEDIUM: { min: 1, max: 300 },
  TEXT_LONG: { min: 1, max: 500 },
  SUMMARY: { min: 0, max: 500 },
  BULLET_POINT: { min: 1, max: 300 },
  MAX_BULLETS_PER_JOB: 10,
  MAX_BULLETS_PER_PROJECT: 8,
  MAX_ACHIEVEMENTS: 5,
  MAX_TECHNOLOGIES: 15
};

// Analytics thresholds
export const ANALYTICS_THRESHOLDS = {
  WORD_COUNT: {
    MIN: 300,
    IDEAL_MIN: 400,
    IDEAL_MAX: 600,
    MAX: 800
  },
  BULLETS: {
    MIN: 15,
    IDEAL_MIN: 18,
    IDEAL_MAX: 25,
    PER_JOB_IDEAL: 3
  },
  ACTION_VERB_PERCENTAGE: {
    LOW: 60,
    MEDIUM: 85,
    HIGH: 100
  },
  QUANTIFIABLE_PERCENTAGE: {
    LOW: 30,
    MEDIUM: 60,
    HIGH: 100
  },
  IMPACT_WORDS_PER_BULLET: {
    LOW: 0.3,
    IDEAL: 0.5,
    HIGH: 1
  }
};

// Color coding for metrics
export const METRIC_COLORS = {
  RED: '#EF4444',
  YELLOW: '#F59E0B',
  GREEN: '#10B981',
  BLUE: '#3B82F6'
};

// Date format patterns
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  MONTH_YEAR: 'YYYY-MM',
  DISPLAY: 'MMM YYYY'
};

// localStorage keys
export const STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'currentUser',
  AUTH_TOKEN: 'authToken',
  RESUMES: 'resumes'
};

// AI feature rate limit (milliseconds between calls)
export const AI_RATE_LIMIT = 2000;

// Auto-save delay (milliseconds)
export const AUTO_SAVE_DELAY = 3000;

// Error messages
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already registered',
    SESSION_EXPIRED: 'Your session has expired. Please log in again',
    UNAUTHORIZED: 'You must be logged in to access this page'
  },
  RESUME: {
    NOT_FOUND: 'Resume not found',
    SAVE_FAILED: 'Failed to save resume. Please try again',
    DELETE_FAILED: 'Failed to delete resume. Please try again',
    LOAD_FAILED: 'Failed to load resume. Please try again'
  },
  AI: {
    FAILED: 'AI service temporarily unavailable. Please try again',
    RATE_LIMIT: 'Please wait a moment before making another request',
    INVALID_RESPONSE: 'Unexpected response from AI service',
    NO_TARGET_ROLE: 'Please set a target role first'
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_DATE: 'Please enter a valid date',
    DATE_RANGE: 'End date must be after start date'
  },
  PDF: {
    EXPORT_FAILED: 'Failed to generate PDF. Please try again',
    BROWSER_UNSUPPORTED: 'Your browser may not support PDF export. Try Chrome or Firefox'
  }
};

// Success messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTERED: 'Account created successfully!',
    LOGGED_IN: 'Welcome back!',
    LOGGED_OUT: 'You have been logged out'
  },
  RESUME: {
    SAVED: 'Resume saved successfully',
    CREATED: 'New resume created',
    DELETED: 'Resume deleted',
    DUPLICATED: 'Resume duplicated successfully'
  },
  PDF: {
    EXPORTED: 'PDF downloaded successfully!'
  }
};