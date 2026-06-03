export const CONVERSIONS: Record<string, number> = {
  kg: 1000,   // 1 kg = 1000 g
  g: 1,
  L: 1000,    // 1 L = 1000 mL
  mL: 1,
  unit: 1,
};

export const BASE_UNITS = {
  weight: 'g',
  volume: 'mL',
  count: 'unit',
};

export type Dimension = 'weight' | 'volume' | 'count';

export function convertToItemBaseUnit(qty: number, unit: string): number {
  const factor = CONVERSIONS[unit] || 1;
  return qty * factor;
}

export function convertFromBaseUnit(qty: number, targetUnit: string): number {
  const factor = CONVERSIONS[targetUnit] || 1;
  return qty / factor;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(amount);
}
