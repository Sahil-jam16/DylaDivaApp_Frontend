import React, { useEffect, useCallback, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme/themeFile';

SplashScreen.preventAutoHideAsync(); // Keep splash visible until fonts are ready

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Still show splash
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
