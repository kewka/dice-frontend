export function isUintString(value: string): boolean {
  return /^\d+$/.test(value);
}
