export function between(value: number, min: number, max: number): boolean {
  return min <= value && value <= max;
}
