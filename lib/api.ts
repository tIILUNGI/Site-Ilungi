const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const ANALYTICS_COOKIE_NAME = 'ilungi_analytics';
const ANALYTICS_SESSION_NAME = 'ilungi_session';

const getAuthHeaders = () => {
  const adminToken = sessionStorage.getItem('ilungi_admin_token');
  const alumniToken = sessionStorage.getItem('alumni_token');
  const token = adminToken || alumniToken;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response, method: string, path: string) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    console.error(`[API ERROR] ${method} ${path} - Status: ${response.status}`, error);
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`[API SUCCESS] ${method} ${path}`, data);
  return data;
};

export const api = {
  get: async (path: string) => {
    console.log(`[API REQ] GET ${path}`);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(response, 'GET', path);
  },
  post: async (path: string, data: any) => {
    console.log(`[API REQ] POST ${path}`, data);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response, 'POST', path);
  },
  put: async (path: string, data: any) => {
    console.log(`[API REQ] PUT ${path}`, data);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response, 'PUT', path);
  },
  delete: async (path: string) => {
    console.log(`[API REQ] DELETE ${path}`);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(response, 'DELETE', path);
  },
  postFormData: async (path: string, formData: FormData) => {
    console.log(`[API REQ] POST (FormData) ${path}`);
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders()
      },
      body: formData
    });
    return handleResponse(response, 'POST', path);
  }
};

// Generate unique session ID
const generateSessionId = (): string => {
  return 'session_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

// Generate unique visitor ID
const generateVisitorId = (): string => {
  return 'visitor_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

// Get or create visitor ID from localStorage
const getOrCreateVisitorId = (): string => {
  let visitorId = localStorage.getItem(ANALYTICS_COOKIE_NAME);
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem(ANALYTICS_COOKIE_NAME, visitorId);
  }
  return visitorId;
};

// Get or create session ID from sessionStorage
const getOrCreateSessionId = (): string => {
  let sessionId = sessionStorage.getItem(ANALYTICS_SESSION_NAME);
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem(ANALYTICS_SESSION_NAME, sessionId);
  }
  return sessionId;
};

// Get UTM parameters from URL
const getUTMParams = (): { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmTerm?: string; utmContent?: string } => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    utmTerm: urlParams.get('utm_term') || undefined,
    utmContent: urlParams.get('utm_content') || undefined
  };
};

// Track page view or event
const trackAnalyticsEvent = async (
  eventType: string,
  eventCategory?: string,
  eventLabel?: string,
  metadata?: any
) => {
  try {
    const visitorId = getOrCreateVisitorId();
    const sessionId = getOrCreateSessionId();
    const utmParams = getUTMParams();
    
    const eventData = {
      sessionId,
      visitorId,
      eventType,
      eventCategory,
      eventLabel,
      pageUrl: window.location.href,
      pagePath: window.location.pathname,
      pageTitle: document.title,
      referrer: document.referrer,
      isNewVisitor: !sessionStorage.getItem('ilungi_session'),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      ...utmParams,
      metadata
    };

    await fetch(`${API_BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData),
      keepalive: true
    });
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

// Track page view
const trackPageView = () => {
  trackAnalyticsEvent('page_view');
};

// Track custom event (click, form submit, etc.)
const trackCustomEvent = (eventCategory: string, eventLabel: string, metadata?: any) => {
  trackAnalyticsEvent('click', eventCategory, eventLabel, metadata);
};

export const endpoints = {
  auth: {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
    profile: () => api.get('/auth/profile')
  },
  solutions: {
    getAll: () => api.get('/solutions'),
    getOne: (id: string) => api.get(`/solutions/${id}`),
    create: (data: any) => api.post('/solutions', data),
    update: (id: string, data: any) => api.put(`/solutions/${id}`, data),
    delete: (id: string) => api.delete(`/solutions/${id}`)
  },
  services: {
    getAll: () => api.get('/services'),
    getOne: (id: string) => api.get(`/services/${id}`),
    create: (data: any) => api.post('/services', data),
    update: (id: string, data: any) => api.put(`/services/${id}`, data),
    delete: (id: string) => api.delete(`/services/${id}`)
  },
  courses: {
    getAll: () => api.get('/courses'),
    getOne: (id: string) => api.get(`/courses/${id}`),
    create: (data: any) => api.post('/courses', data),
    update: (id: string, data: any) => api.put(`/courses/${id}`, data),
    delete: (id: string) => api.delete(`/courses/${id}`)
  },
  partners: {
    getAll: () => api.get('/partners'),
    getOne: (id: string) => api.get(`/partners/${id}`),
    create: (data: any) => api.post('/partners', data),
    update: (id: string, data: any) => api.put(`/partners/${id}`, data),
    delete: (id: string) => api.delete(`/partners/${id}`)
  },
  blog: {
    getAll: () => api.get('/blog'),
    getOne: (id: string) => api.get(`/blog/${id}`),
    create: (data: any) => api.post('/blog', data),
    update: (id: string, data: any) => api.put(`/blog/${id}`, data),
    delete: (id: string) => api.delete(`/blog/${id}`)
  },
  references: {
    getAll: () => api.get('/client-references'),
    getOne: (id: string) => api.get(`/client-references/${id}`),
    create: (data: any) => api.post('/client-references', data),
    update: (id: string, data: any) => api.put(`/client-references/${id}`, data),
    delete: (id: string) => api.delete(`/client-references/${id}`)
  },
  config: {
    get: () => api.get('/site-config'),
    update: (data: any) => api.put('/site-config', data)
  },
  contact: {
    send: (data: any) => api.post('/contact', data),
    sendSpontaneous: (formData: FormData) => api.postFormData('/contact/spontaneous', formData),
    sendCourse: (data: any) => api.post('/contact/course', data)
  },
  analytics: {
    // Track events
    track: (eventData: any) => api.post('/analytics/track', eventData),
    
    // Get analytics data
    getOverview: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/overview${queryString}`);
    },
    getPageViews: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/pageviews${queryString}`);
    },
    getTopPages: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/top-pages${queryString}`);
    },
    getDevices: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/devices${queryString}`);
    },
    getTrafficSources: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/traffic-sources${queryString}`);
    },
    getActiveUsers: () => api.get('/analytics/active-users'),
    getEvents: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/events${queryString}`);
    },
    getCountries: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/countries${queryString}`);
    },
    getDetailed: (params?: any) => {
      const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
      return api.get(`/analytics/detailed${queryString}`);
    },
    
    // Client-side tracking functions
    trackPageView,
    trackCustomEvent,
    getOrCreateVisitorId,
    getOrCreateSessionId,
    getUTMParams
  }
};

// Export analytics helpers separately for direct use
export { trackPageView, trackCustomEvent, getOrCreateVisitorId, getOrCreateSessionId, getUTMParams };
