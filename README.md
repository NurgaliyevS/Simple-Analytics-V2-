# Next.js Simple Analytics Plugin

A privacy-focused analytics solution for Next.js applications that respects user privacy and bypasses ad-blockers through a built-in proxy.

## Features

- 🔒 Privacy-focused analytics
- 🛡️ Ad-blocker resistant through built-in proxy
- 🚀 Server-side and client-side tracking
- 📊 Automatic event tracking
- 🌓 Dark mode tracking support
- 🔄 Offline event queueing
- 🎯 Custom event tracking

## Quick Start

1. Add the SimpleAnalytics component to your root layout:

```tsx
// app/layout.tsx
import { SimpleAnalytics } from '@/components/SimpleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SimpleAnalytics
          enabled={true}
          ignorePages={['/admin/*', '/account/*']}
          collectEvents={['downloads', 'outbound']}
          downloadExtensions={['pdf', 'csv', 'docx']}
          customSettings={{
            collectDarkMode: true,
          }}
        >
          {children}
        </SimpleAnalytics>
      </body>
    </html>
  );
}
```

2. Track events in client components:

```tsx
'use client';
import { useAnalytics } from '@/hooks/useAnalytics';

export function DownloadButton() {
  const { trackEvent } = useAnalytics({ enabled: true });
  
  return (
    <button onClick={() => trackEvent('download', { fileType: 'pdf' })}>
      Download PDF
    </button>
  );
}
```

3. Track events in server components:

```tsx
import { trackServerEvent } from '@/lib/analytics/server';

export default async function Page() {
  await trackServerEvent({
    name: 'page_view',
    data: { path: '/dashboard' }
  });
  
  return <div>Dashboard</div>;
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable analytics |
| `customDomain` | string | - | Custom domain for Simple Analytics |
| `mode` | 'hash' | - | Use hash-based routing |
| `collectDnt` | boolean | `false` | Collect Do Not Track visits |
| `ignorePages` | string[] | - | Pages to exclude from tracking |
| `autoCollect` | boolean | `true` | Auto-collect page views |
| `collectEvents` | string[] | - | Auto-collect specific events |
| `downloadExtensions` | string[] | `['pdf', 'csv', 'docx']` | File extensions to track |
| `customSettings` | object | - | Custom tracking settings |

## Verifying Installation

1. Check Network Requests:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for requests to `/_sa/latest.js` and `/_sa/noscript.gif`
   - These should succeed even with ad-blockers enabled

2. Test Event Tracking:
   ```javascript
   // In browser console
   window.sa_event('test_event', { test: true });
   ```

3. Verify Server-Side Tracking:
   - Check Network tab for POST requests to `/api/analytics/track`
   - These requests contain server-side events

4. Test Ad-blocker Bypass:
   - Enable an ad-blocker
   - Verify that analytics requests still work through the `/_sa` proxy

## Troubleshooting

1. Events Not Tracking
   - Check if `enabled` is true in configuration
   - Verify the page isn't in `ignorePages`
   - Check browser console for errors

2. Ad-blocker Still Blocking
   - Ensure middleware.ts is properly configured
   - Verify requests go through `/_sa/*` paths
   - Check Network tab for blocked requests

3. Server Events Not Working
   - Check server logs for errors
   - Verify API route is accessible
   - Ensure proper headers are being sent

## Best Practices

1. Client-Side Tracking:
   ```tsx
   const { trackEvent } = useAnalytics({ enabled: true });
   
   // Good: Meaningful event names and data
   trackEvent('signup_complete', { method: 'email' });
   
   // Bad: Generic events without context
   trackEvent('click');
   ```

2. Server-Side Tracking:
   ```tsx
   // Good: Include relevant context
   await trackServerEvent({
     name: 'api_request',
     data: { endpoint: '/users', status: 200 }
   });
   
   // Bad: Missing important details
   await trackServerEvent({ name: 'api_call' });
   ```

## License

MIT License - feel free to use this in your own projects!