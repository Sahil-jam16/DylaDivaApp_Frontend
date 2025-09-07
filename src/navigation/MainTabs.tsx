import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import QuizNavigator from './QuizNavigator';
import ProfileBasedRecommendationsScreen from '../screens/ProfileBasedRecommendationsScreen';

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
          let iconName: 'home-outline' | 'list-outline' | 'person-outline' | 'sparkles-outline' | 'ellipse-outline';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'QuizFlow':
              iconName = 'list-outline';
              break;
            case 'ProfileRecommendations':
              iconName = 'sparkles-outline';
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
      <Tab.Screen name="QuizFlow" component={QuizNavigator} options={{ title: 'Quiz' }} />
      <Tab.Screen name="ProfileRecommendations" component={ProfileBasedRecommendationsScreen} options={{ title: 'Your Style' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
