import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8A2BE2',      // Vibrant Purple (Primary)
    accent: '#FFA500',       // Bright Orange
    secondary: '#20C997',    // Teal Green
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#2C2C2C',         // Charcoal Gray
    placeholder: '#B0B0B0',
    disabled: '#D3D3D3',
    error: '#FF5252',
  },
  fonts: {
    regular: {
      fontFamily: 'Montserrat_400Regular',
    },
    medium: {
      fontFamily: 'Montserrat_700Bold',
    },
    light: {
      fontFamily: 'Montserrat_400Regular',
    },
    thin: {
      fontFamily: 'Montserrat_400Regular',
    },
  },
};
