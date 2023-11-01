/* eslint-disable @typescript-eslint/no-explicit-any */

// Adapted from
// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyJson = boolean | number | string | null | JsonArray | JsonMap

interface JsonMap {
  [key: string]: AnyJson
}

interface JsonArray extends Array<AnyJson> {}
