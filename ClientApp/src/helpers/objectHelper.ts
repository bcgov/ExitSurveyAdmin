import { NullableString } from '../types/NullableString'
import moment from 'moment'

export function createDateAsUTCFromString(dateString: string): Date {
  return moment.utc(dateString).toDate()
}

export function undefinedIfNull<T>(obj: T | null): T | undefined {
  return obj === null ? undefined : obj
}

export function nullIfUndefined<T>(obj: T | undefined): T | null {
  return obj === undefined ? null : obj
}

export function emptyStringIfNull<T>(obj: T | null): T | string {
  return obj === null ? '' : obj
}

export function dateOrUndefined(dateString: NullableString): Date | undefined {
  return dateString ? createDateAsUTCFromString(dateString) : undefined
}
