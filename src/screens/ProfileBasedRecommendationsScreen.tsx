// src/screens/ProfileBasedRecommendationsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RecommendationCard from '../components/RecommendationCard';

const API_URL = 'https://6972df348ddf.ngrok-free.app';
const PRODUCT_TYPES = ['Rings', 'Pendants', 'Earrings', 'Necklaces'];

const ProfileBasedRecommendationsScreen = () => {
  const navigation = useNavigation();
  const [recommendations, setRecommendations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(['Rings', 'Pendants']);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [hasFetched, setHasFetched] = useState(false);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    setRecommendations([]);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;

      if (!uid) throw new Error('User not logged in');

      const response = await axios.get(`${API_URL}/recommendations-from-profile`, {
        params: {
          user_id: uid,
          product_types: selectedTypes.join(','),
        },
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });

      setRecommendations(response.data.recommendations || []);
      setHasFetched(true);
    } catch (err: any) {
      console.error(err);
      setHasFetched(false);
      if (err.response?.status === 404) {
        setError("You haven't taken the quiz yet.");
      } else {
        setError('Something went wrong. Try again later.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleQuizRedirect = () => {
    navigation.navigate('QuizFlow');
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRecommendations();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.heading}>Your Style Recommendations</Text>

      {/* Product Type Toggle Buttons */}
      <View style={styles.buttonGroup}>
        {PRODUCT_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.productTypeButton,
              selectedTypes.includes(type) && styles.activeButton,
            ]}
            onPress={() => toggleType(type)}
          >
            <Text
              style={[
                styles.productTypeText,
                selectedTypes.includes(type) && styles.activeButtonText,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* MAIN Action Button */}
      {!loading && !error && (
        <TouchableOpacity style={styles.fetchButton} onPress={getRecommendations}>
          <Text style={styles.fetchButtonText}>
            {hasFetched ? 'Retry' : 'Get Recommendations'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Spinner */}
      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Fetching looks from your style profile...</Text>
        </View>
      )}

      {/* Error Message */}
      {!!error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          {error.includes('quiz') && (
            <TouchableOpacity style={styles.quizButton} onPress={handleQuizRedirect}>
              <Text style={styles.quizButtonText}>Go to Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Recommendations */}
      {recommendations.map((item, index) => (
        <RecommendationCard key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default ProfileBasedRecommendationsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FAFAFA',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
    color: '#4B0082',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  productTypeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#8A2BE2',
    borderWidth: 1,
    borderRadius: 20,
    margin: 6,
  },
  productTypeText: {
    color: '#8A2BE2',
    fontWeight: '600',
  },
  activeButton: {
    backgroundColor: '#8A2BE2',
  },
  activeButtonText: {
    color: 'white',
  },
  fetchButton: {
    backgroundColor: '#4B0082',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  fetchButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  loadingBox: {
    alignItems: 'center',
    marginVertical: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorBox: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#B00020',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizButton: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  quizButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});
