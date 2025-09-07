// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
