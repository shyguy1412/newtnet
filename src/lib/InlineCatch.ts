export function inlineCatch<T extends ((...args: any[]) => any)>(func: T): ReturnType<T> | null {
  try {
    const value: ReturnType<T> = func();
    return value;
  } catch (_) {
    return null;
  }
}

export async function asyncInlineCatch<T extends ((...args: any[]) => Promise<any>)>(func: T): Promise<ReturnType<T> | null> {
  return await inlineCatch(func);
}