import { NullableString } from '../types/NullableString'

export function undefinedIfNull<T>(obj: T | null): T | undefined {
  return obj === null ? undefined : obj
}

export function emptyStringIfNull<T>(obj: T | null): T | string {
  return obj === null ? '' : obj
}

export function dateOrUndefined(dateString: NullableString): Date | undefined {
  return dateString ? new Date(dateString) : undefined
}
