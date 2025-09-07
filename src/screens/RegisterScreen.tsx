import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !displayName) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Set display name in Firebase Auth
      await updateProfile(user, { displayName });

      // Save user profile in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        display_name: displayName,
        created_at: serverTimestamp(),
        last_login: serverTimestamp(),
        favorites_count: 0
      });

      console.log('✅ User registered:', user.uid);
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
      console.error('Register Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Create your Dyla Diva account</Text>

      <TextInput
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Sign Up
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={{ color: colors.primary }}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 12,
  },
  footerText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#333',
  },
});
