import { AnalyticsConfig } from './types';

export function getScriptAttributes(config: AnalyticsConfig): Record<string, string> {
  const attributes: Record<string, string> = {};

  if (config.mode) {
    attributes['data-mode'] = config.mode;
  }

  if (config.collectDnt) {
    attributes['data-collect-dnt'] = 'true';
  }

  if (config.ignorePages?.length) {
    attributes['data-ignore-pages'] = config.ignorePages.join(',');
  }

  if (config.autoCollect === false) {
    attributes['data-auto-collect'] = 'false';
  }

  if (config.onloadCallback) {
    attributes['data-onload'] = config.onloadCallback;
  }

  if (config.hostname) {
    attributes['data-hostname'] = config.hostname;
  }

  if (config.saGlobal) {
    attributes['data-sa-global'] = config.saGlobal;
  }

  if (config.collectEvents?.length) {
    attributes['data-collect'] = config.collectEvents.join(',');
  }

  if (config.downloadExtensions?.length) {
    attributes['data-extensions'] = config.downloadExtensions.join(',');
  }

  if (config.useTitle) {
    attributes['data-use-title'] = 'true';
  }

  if (config.fullUrls) {
    attributes['data-full-urls'] = 'true';
  }

  if (config.customSettings) {
    Object.entries(config.customSettings).forEach(([key, value]) => {
      attributes[`data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = String(value);
    });
  }

  return attributes;
}

export function isValidEvent(name: string): boolean {
  return typeof name === 'string' && name.length > 0;
}

export function sanitizeEventData(data: Record<string, any>): Record<string, any> {
  return Object.entries(data).reduce((acc, [key, value]) => {
    // Remove undefined, null, and function values
    if (value != null && typeof value !== 'function') {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}