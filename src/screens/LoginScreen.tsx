import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; // ✅ Import your Firebase auth
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in as:', user.uid);

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],  
    });
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
       <Image source={require('../../assets/icon.png')} style={styles.logo} /> 
      <Text style={styles.title}>Welcome to Dyla Diva</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
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
        onPress={handleLogin}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
      >
        Log In
      </Button>

     <TouchableOpacity onPress={() => navigation.navigate('Register')}>
    <Text style={styles.footerText}>
        Don't have an account? <Text style={{ color: colors.primary }}>Sign up</Text>
    </Text>
    </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2C2C2C',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#8A2BE2',
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
});

export default LoginScreen;

