/* globals Promise */

export function undefinedIfNull<T>(obj: T | null): T | undefined {
  return obj === null ? undefined : obj
}

export function nullIfUndefined<T>(obj: T | undefined): T | null {
  return obj === undefined ? null : obj
}

export function emptyStringIfNull<T>(obj: T | null): T | string {
  return obj === null ? '' : obj
}

export const timeout = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
