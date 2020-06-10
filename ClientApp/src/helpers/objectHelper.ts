import { NullableString } from '../types/NullableString'

// Dates coming over the wire are UTC, but by default this is not understood
// when creating dates.From https://stackoverflow.com/a/14006555.
export function createDateAsUTCFromString(dateString: string): Date {
  const date = new Date(dateString)
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  )
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
