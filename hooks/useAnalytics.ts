'use client';

import { useEffect, useCallback } from 'react';
import { Analytics } from '@/lib/analytics/client';
import { AnalyticsConfig, AnalyticsEvent } from '@/lib/analytics/types';

export function useAnalytics(config: AnalyticsConfig) {
  const analytics = Analytics.getInstance(config);

  const trackEvent = useCallback(
    async (name: string, data?: Record<string, any>) => {
      const event: Omit<AnalyticsEvent, 'timestamp'> = {
        name,
        data,
      };
      await analytics.track(event);
    },
    [analytics]
  );

  useEffect(() => {
    // Process any queued events when the script loads
    const interval = setInterval(() => {
      if (window.sa_event) {
        analytics.processQueue();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [analytics]);

  return { trackEvent };
}