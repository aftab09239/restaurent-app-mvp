import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {lightColors, darkColors} from '../theme/colors';
const ThemeContext = createContext(null);
export function ThemeProvider({children}) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = useCallback(() => setIsDark(v => !v), []);
  const value = useMemo(() => ({isDark, toggleTheme, colors: isDark ? darkColors : lightColors}), [isDark, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
}
