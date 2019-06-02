import { isDate, isPlainObject } from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%3A/ig, ':')
    .replace(/%24/i, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/i, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']');
}

export function buildURL(url: string, paramas?: any): string {
  if (!paramas) {
    return url;
  }

  const parts: string[] = [];
  Object.keys(paramas).forEach(key => {
    const val = paramas[key]
    if (val === null || typeof val === 'undefined') {
      return;
    }
    let values = [];
    if (Array.isArray(val)) {
      values = val;
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString();
      } else {
        if (isPlainObject(val)) {
          val = JSON.stringify(val);
        }
        parts.push(`${encode(key)}=${encode(val)}`);
      }
    })
  })

  let serializeParams = parts.join('&');
  if (serializeParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams;
  }
  return url;
}
