export function copy<T>(metadata: T): T {
  return structuredClone(metadata)
}
