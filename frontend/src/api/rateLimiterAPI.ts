import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export type RateLimitMethod = 'token' | 'leaky' | 'fixed' | 'sliding';

export interface ApiResponse {
  message: string;
  allowed: boolean;
  timestamp?: string;
}

export const rateLimiterAPI = {
  checkRateLimit: async (method: RateLimitMethod): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data/${method}`);
      return {
        message: typeof response.data === 'string' ? response.data : response.data.message,
        allowed: response.status === 200,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      // Handle rate-limited case (429)
      if (error.response?.status === 429) {
        return {
          message: typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data?.message || '❌ Too many requests',
          allowed: false,
          timestamp: new Date().toISOString(),
        };
      }

      // Handle any other backend or network issue gracefully
      return {
        message: '⚠️ Could not reach backend (check CORS or URL)',
        allowed: false,
        timestamp: new Date().toISOString(),
      };
    }
  },

  checkMultipleRequests: async (method: RateLimitMethod, count: number) => {
    const results = {
      allowed: 0,
      blocked: 0,
      responses: [] as ApiResponse[],
    };

    for (let i = 0; i < count; i++) {
      const response = await rateLimiterAPI.checkRateLimit(method);
      results.responses.push(response);

      if (response.allowed) {
        results.allowed++;
      } else {
        results.blocked++;
      }
    }

    return results;
  },
};
