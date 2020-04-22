// Code adapted from https://stackoverflow.com/a/22886730

export default interface IJSONSerializableFactory<T, U> {
  deserialize(input: U): T
}
