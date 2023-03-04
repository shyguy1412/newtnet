interface Cookie {
  key: string,
  value: string,
  expires?: Date,
  httpOnly?: boolean,
  secure?: boolean,
  path?: string,
  sameSite?: 'Strict' | 'None' | 'Lax',
  prefix?: '__Host-' | '__Secure-',
  domain?: string
}

export function createCookieHeader(cookie: Cookie) {
  return `\
${cookie.key}=${cookie.value};\
${cookie.expires ? `Expires=${cookie.expires};` : ''}\
${cookie.httpOnly ? 'HttpOnly;' : ''}\
${cookie.secure ? 'Secure;' : ''}\
${cookie.path ? `Path=${cookie.path};` : ''}\
${cookie.sameSite ? `SameSite=${cookie.sameSite};` : ''}\
${cookie.prefix ? `Prefix=${cookie.prefix};` : ''}\
${cookie.domain ? `Domain=${cookie.domain};` : ''}\
  `
}

export function readCookie(name: string) {
  const cookie = document.cookie.match(new RegExp(`${name}=(.*);?`));
  if (!cookie) return;
  try {
    return JSON.parse(cookie[1]);
  } catch (_) {
    return cookie[1];
  }
}