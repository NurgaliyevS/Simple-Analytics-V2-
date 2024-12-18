export interface SimpleAnalyticsConfig {
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

export interface SimpleAnalyticsProps extends SimpleAnalyticsConfig {
  children?: React.ReactNode;
}