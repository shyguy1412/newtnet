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

export function cookie(cookie: Cookie) {
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