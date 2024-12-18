import { SimpleAnalyticsConfig } from './types';
import { PROXY_SCRIPT_PATH, PROXY_NOSCRIPT_PATH } from './constants';

export function getScriptAttributes(config: SimpleAnalyticsConfig): Record<string, string> {
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

export function getScriptUrl(config: SimpleAnalyticsConfig): string {
  if (config.customDomain) {
    return `https://${config.customDomain}/latest.js`;
  }
  return PROXY_SCRIPT_PATH;
}

export function getNoscriptUrl(config: SimpleAnalyticsConfig): string {
  if (config.customDomain) {
    return `https://${config.customDomain}/noscript.gif`;
  }
  return PROXY_NOSCRIPT_PATH;
}