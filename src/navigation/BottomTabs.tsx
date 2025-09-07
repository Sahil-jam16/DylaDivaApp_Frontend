import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8A2BE2',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
