import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QuizSetupScreen from '../screens/QuizSetupScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen'; // Also add the results screen here

const QuizStack = createNativeStackNavigator();

const QuizNavigator = () => {
  return (
    <QuizStack.Navigator initialRouteName="QuizSetup">
      <QuizStack.Screen 
        name="QuizSetup" 
        component={QuizSetupScreen} 
        options={{ title: 'Select Your Style' }}
      />
      <QuizStack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ title: 'Style Quiz' }}
      />
      <QuizStack.Screen 
        name="Results" 
        component={ResultsScreen} 
        options={{ title: 'Your Recommendations' }}
      />
    </QuizStack.Navigator>
  );
};

export default QuizNavigator;