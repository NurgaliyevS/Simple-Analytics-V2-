'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { SimpleAnalyticsProps } from '@/lib/analytics/types';
import { useAnalytics } from '@/hooks/useAnalytics';
import { getScriptAttributes } from '@/lib/analytics/utils';

export function SimpleAnalytics(props: SimpleAnalyticsProps) {
  const { enabled = true, children, ...config } = props;
  const { trackEvent } = useAnalytics(config);

  useEffect(() => {
    // Example of automatic page view tracking
    if (enabled && config.autoCollect) {
      trackEvent('pageview', {
        path: window.location.pathname,
        title: document.title,
      });
    }
  }, [enabled, config.autoCollect, trackEvent]);

  if (!enabled) {
    return <>{children}</>;
  }

  const attributes = getScriptAttributes(config);

  return (
    <>
      <Script
        id="sa-events-queue"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`,
        }}
      />
      <Script
        async
        defer
        src="/_sa/latest.js"
        {...attributes}
      />
      <noscript>
        <img
          src="/_sa/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      {children}
    </>
  );
}