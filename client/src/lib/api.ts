// API service for communicating with the backend
const API_BASE_URL = 'http://localhost:3000';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  accessToken?: string;
  user?: T;
}

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('accessToken');

// Make API request with proper headers
export const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Normalize headers and safely set values
  const headers = new Headers(options.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Add authorization token if it exists
  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const { headers: _ignored, ...rest } = options as any;
  const response = await fetch(url, {
    ...rest,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
};

// ============ AUTH API ============

export const authApi = {
  register: (email: string, password: string, name: string, age: number) =>
    apiCall('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, age }),
    }),

  login: (email: string, password: string) =>
    apiCall('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// ============ CARS API ============

export const carsApi = {
  getAll: () => apiCall('/cars'),

  getFeatured: () => apiCall('/cars?isFeatured=true'),

  getById: (id: number) => apiCall(`/cars/${id}`),

  search: (pickupDate: string, dropoffDate: string) =>
    apiCall(`/cars/search?pickupDate=${pickupDate}&dropoffDate=${dropoffDate}`),

  create: (carData: any) =>
    apiCall('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    }),

  update: (id: number, carData: any) =>
    apiCall(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    }),

  delete: (id: number) =>
    apiCall(`/cars/${id}`, {
      method: 'DELETE',
    }),
};

// ============ BOOKINGS API ============

export const bookingsApi = {
  getAll: () => apiCall('/bookings'),

  getByUserId: (userId: number) => apiCall(`/bookings/user/${userId}`),

  create: (bookingData: any) =>
    apiCall('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),

  updateStatus: (id: number, status: string) =>
    apiCall(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  delete: (id: number) =>
    apiCall(`/bookings/${id}`, {
      method: 'DELETE',
    }),
};

// ============ USERS API ============

export const usersApi = {
  getAll: () => apiCall('/users'),

  getById: (id: number) => apiCall(`/users/${id}`),
};

// ============ UTILITY FUNCTIONS ============

export const setAuthToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
};

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
