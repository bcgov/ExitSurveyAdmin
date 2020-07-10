/* eslint-disable @typescript-eslint/no-explicit-any */

// Adapted from
// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyJson = boolean | number | string | null | IJsonArray | IJsonMap
interface IJsonMap ***REMOVED***
  [key: string]: AnyJson
***REMOVED***
interface IJsonArray extends Array<AnyJson> ***REMOVED******REMOVED***
