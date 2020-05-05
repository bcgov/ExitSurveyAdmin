/* eslint-disable @typescript-eslint/no-explicit-any */

// This is a type used to suppress errors about using explicit anys, in those
// cases where we really do want to use an explicit any: especially with
// react-table, but also in other places where using strict Typescript types
// would be overly onerous.
export type FixTypeLater = any
