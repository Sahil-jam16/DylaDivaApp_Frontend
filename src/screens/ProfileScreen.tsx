// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { auth } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleLogout = async () => {
    await auth.signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile</Text>
      <Text style={styles.info}>Name: {user?.displayName || 'N/A'}</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>

      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#4B0082',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#8A2BE2',
  },
});
