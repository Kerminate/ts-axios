import { isDate, isPlainObject, isURLSearchParams } from './util';

interface URLOrigin {
  protocol: string;
  host: string;
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%3A/gi, ':')
    .replace(/%24/i, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/i, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function buildURL(
  url: string,
  paramas?: any,
  paramsSerializer?: (params: any) => string
): string {
  if (!paramas) {
    return url;
  }

  let serializeParams;
  if (paramsSerializer) {
    serializeParams = paramsSerializer(paramas);
  } else if (isURLSearchParams(paramas)) {
    serializeParams = paramas.toString();
  } else {
    const parts: string[] = [];
    Object.keys(paramas).forEach(key => {
      const val = paramas[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }
      let values = [];
      if (Array.isArray(val)) {
        values = val;
        key += '[]';
      } else {
        values = [val];
      }
      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString();
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val);
        }
        parts.push(`${encode(key)}=${encode(val)}`);
      });
    });

    serializeParams = parts.join('&');
  }

  if (serializeParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams;
  }
  return url;
}

export function isAbsoluteURL(url: string): boolean {
  const regExp = /^([a-z][a-z\d\+\-\.]*:)?\/\//i;
  return regExp.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL);
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  );
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { protocol, host } = urlParsingNode;
  return {
    protocol,
    host
  };
}
