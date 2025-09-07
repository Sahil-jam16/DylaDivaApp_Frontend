import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; 
import MainTabs from './MainTabs'; // We only need the main tab navigator here
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      
      {/* After login, the app will navigate to the MainTabs component,
          which contains the entire logged-in experience. */}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen} 
        options={{ headerShown: true, title: 'Your Recommendations' }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;