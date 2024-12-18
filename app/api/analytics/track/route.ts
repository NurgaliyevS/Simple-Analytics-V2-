import { NextRequest, NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/analytics/server';
import { AnalyticsEvent } from '@/lib/analytics/types';

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();
    const result = await trackServerEvent(event);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to track event' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}