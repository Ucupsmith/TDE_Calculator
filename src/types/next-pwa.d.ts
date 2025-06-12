declare module 'next-pwa' {
  import { NextConfig } from 'next';
  
  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    scope?: string;
    sw?: string;
    skipWaiting?: boolean;
    customWorkerDir?: string;
    buildExcludes?: Array<string | RegExp>;
    publicExcludes?: Array<string | RegExp>;
    fallbacks?: {
      [key: string]: string;
    };
    runtimeCaching?: Array<{
      urlPattern: string | RegExp;
      handler: string;
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
        networkTimeoutSeconds?: number;
        cacheableResponse?: {
          statuses: number[];
          headers?: { [key: string]: string };
        };
        backgroundSync?: {
          name: string;
          options?: {
            maxRetentionTime: number;
          };
        };
        broadcastUpdate?: {
          channelName: string;
          options?: {
            headersToCheck: string[];
          };
        };
        cacheableResponse?: {
          statuses: number[];
          headers?: { [key: string]: string };
        };
        fetchOptions?: RequestInit;
        matchOptions?: CacheQueryOptions;
        plugins?: any[];
        rangeRequests?: boolean;
      };
    }>;
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
  export = withPWA;
} 