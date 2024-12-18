import { headers } from 'next/headers';
import { AnalyticsEvent, ServerAnalyticsResponse } from './types';
import { SA_SCRIPT_URL, SA_NOSCRIPT_URL } from './constants';

export async function trackServerEvent(event: AnalyticsEvent): Promise<ServerAnalyticsResponse> {
  try {
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';

    const payload = {
      ...event,
      timestamp: event.timestamp || Date.now(),
      userAgent,
      referrer: referer,
    };

    const response = await fetch(SA_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error tracking server event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}