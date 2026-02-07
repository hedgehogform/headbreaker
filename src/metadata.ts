export function copy<T>(metadata: T): T {
  return JSON.parse(JSON.stringify(metadata));
}
