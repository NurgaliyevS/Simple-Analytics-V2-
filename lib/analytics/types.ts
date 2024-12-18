export interface AnalyticsEvent {
  name: string;
  data?: Record<string, any>;
  timestamp?: number;
  url?: string;
  referrer?: string;
  userAgent?: string;
}

export interface AnalyticsConfig {
  enabled?: boolean;
  customDomain?: string;
  mode?: 'hash';
  collectDnt?: boolean;
  ignorePages?: string[];
  autoCollect?: boolean;
  onloadCallback?: string;
  hostname?: string;
  saGlobal?: string;
  collectEvents?: ('outbound' | 'emails' | 'downloads')[];
  downloadExtensions?: string[];
  useTitle?: boolean;
  fullUrls?: boolean;
  customSettings?: Record<string, any>;
}

export interface ServerAnalyticsResponse {
  success: boolean;
  error?: string;
}