// src/theme/theme.ts
import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { fontConfig } from './fontConfig';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6A0DAD',     // Vibrant purple
    secondary: '#FF6B00',   // Bright orange
    tertiary: '#00BFA6',    // Teal green
    background: '#FFFFFF',
    text: '#333333',
  },
  fonts: configureFonts({ config: fontConfig }),
};
