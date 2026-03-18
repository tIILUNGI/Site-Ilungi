const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const adminToken = sessionStorage.getItem('ilungi_admin_token');
  const alumniToken = sessionStorage.getItem('alumni_token');
  const token = adminToken || alumniToken;
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

export const api = {
  get: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(response);
  },
  post: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  put: async (path: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },
  delete: async (path: string) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    return handleResponse(response);
  }
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
    send: (data: any) => api.post('/contact', data)
  }
};
