const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export const api = {
  signup: (payload: unknown) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload: unknown) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  createEmergency: (payload: unknown) => request('/sos/create', { method: 'POST', body: JSON.stringify(payload) }),
  updateProfile: (payload: unknown) => request('/profile/update', { method: 'POST', body: JSON.stringify(payload) }),
  severityCheck: (payload: unknown) => request('/ai/severity', { method: 'POST', body: JSON.stringify(payload) }),
  hospitalMatch: (payload: unknown) => request('/ai/hospital-match', { method: 'POST', body: JSON.stringify(payload) }),
  fakeCheck: (payload: unknown) => request('/ai/fake-check', { method: 'POST', body: JSON.stringify(payload) }),
  analytics: () => request('/analytics'),
  heatmap: () => request('/heatmap'),
  fleet: () => request('/fleet/live'),
};
