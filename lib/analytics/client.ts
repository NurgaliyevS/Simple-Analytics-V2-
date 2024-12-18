'use client';

import { AnalyticsEvent, AnalyticsConfig } from './types';

export class Analytics {
  private static instance: Analytics;
  private config: AnalyticsConfig;
  private queue: AnalyticsEvent[] = [];
  private isInitialized = false;

  private constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  static getInstance(config: AnalyticsConfig): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics(config);
    }
    return Analytics.instance;
  }

  async track(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      url: window.location.href,
    };

    // Try client-side tracking first
    if (window.sa_event) {
      window.sa_event(event.name, event.data);
      return;
    }

    // Fallback to server-side tracking
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullEvent),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error tracking event:', error);
      this.queue.push(fullEvent);
    }
  }

  // Process queued events when client-side tracking becomes available
  processQueue(): void {
    if (!window.sa_event) return;

    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        window.sa_event(event.name, event.data);
      }
    }
  }
}