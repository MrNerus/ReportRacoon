export type TextDecoration = 'normal' | 'italic' | 'strikethrough' | 'overline' | 'underline';
export type ColumnWidth = { type: 'fit' | 'fixed' | 'percentage' | 'space-available'; value?: number };

export type NumberFormat = {
  type: 'number' | 'currency' | 'percent';
  decimals?: number;
  currencySymbol?: string;
  useGrouping?: boolean; // 1,000 vs 1000
};

export type DateFormat = {
  type: 'date' | 'datetime' | 'time';
  pattern: string; // e.g. 'yyyy-MM-dd', 'dd/MM/yyyy HH:mm'
};