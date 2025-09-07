import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

// --- CHANGE 1: Import the new navigator instead of the single screen ---
import QuizNavigator from './QuizNavigator'; 

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8A2BE2',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee' },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: 'home-outline' | 'list-outline' | 'person-outline' | 'ellipse-outline';

          // Update the route name check for the quiz icon
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'QuizFlow': // Use the new route name here
              iconName = 'list-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      
      {/* --- CHANGE 2: Use the QuizNavigator as the component for the Quiz tab --- */}
      <Tab.Screen 
        name="QuizFlow" // It's good practice to give the navigator route a unique name
        component={QuizNavigator} 
        options={{ 
          title: 'Quiz', // This is the text that will appear on the tab button
        }} 
      />
      {/* ------------------------------------------------------------------------- */}
      
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;