
export function mapValue(value: number, oldLow: number, oldHigh: number, newLow: number, newHigh: number): number {
  return (value - oldLow) * (newHigh - newLow) / (oldHigh - oldLow) + newLow;
}
