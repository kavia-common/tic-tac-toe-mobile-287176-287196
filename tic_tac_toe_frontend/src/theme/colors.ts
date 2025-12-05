export const colors = {
  primary: '#b50303',
  secondary: '#F59E0B',
  error: '#d10000',
  background: '#0052f5',
  surface: '#FFFFFF',
  text: '#111827',
} as const;

export type ThemeColors = typeof colors;
