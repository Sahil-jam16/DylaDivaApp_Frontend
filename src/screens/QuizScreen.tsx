import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import QuizCard from '../components/QuizCard';

// IMPORTANT: Replace this with your live ngrok URL
const API_URL = 'https://6972df348ddf.ngrok-free.app';

// This component needs the 'navigation' prop to move to the results screen
const QuizScreen = ({ route, navigation }) => { 
  const selectedCategories = route.params?.selectedCategories || [];

  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecommending, setIsRecommending] = useState(false); // State for post-quiz loading
  
  // These states will store the FULL product objects fetched from the API
  const [likedItems, setLikedItems] = useState([]);
  const [dislikedItems, setDislikedItems] = useState([]);
  
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      let url = `${API_URL}/quiz-items?count=15`; // Quiz of 15 items
      if (selectedCategories.length > 0) {
        url += `&product_types=${selectedCategories.join(',')}`;
      }
      try {
        const response = await axios.get(url, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        setQuizItems(response.data);
      } catch (error) {
        console.error('Error fetching quiz items:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizData();
  }, [selectedCategories]);

  const handleSwipe = (cardIndex, action) => {
    const item = quizItems[cardIndex];
    if (action === 'like') {
      setLikedItems(prev => [...prev, item]);
    } else {
      setDislikedItems(prev => [...prev, item]);
    }
  };

  // --- THIS FUNCTION IS NOW FULLY IMPLEMENTED ---
  const handleSwipedAll = async () => {
    setIsRecommending(true); // Start the loading transition
    console.log('Quiz finished! Preparing data for recommendations...');

    // 1. Format the collected data to match the Pydantic model
    const formatItem = (item) => ({
      product_name: item.product_name,
      occasion: item.occasion || [],
      designStyle: item.designStyle || [],
      stoneType: item.stoneType || [],
      metalType: item.metalType || [],
    });

    const payload = {
      user_id: "test-user-123", // In a real app, this would come from Firebase Auth
      liked_items: likedItems.map(formatItem),
      disliked_items: dislikedItems.map(formatItem),
    };

    try {
      // 2. Call the recommendations endpoint with the formatted payload
      console.log('Sending payload to API...');
      
      console.log('payload:', JSON.stringify(payload, null, 2)); // Pretty-print the payload for easier debugging

      const response = await axios.post(`${API_URL}/recommendations`, payload, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
      });
      
      // 3. Navigate to the Results screen with the AI's recommendations
      console.log('Recommendations received! Navigating to results...');
      navigation.navigate('Results', { 
        recommendations: response.data.recommendations 
      });

    } catch (error) {
      console.error('Error fetching recommendations:', error.response?.data || error.message);
      alert('Sorry, we could not generate recommendations at this time.');
    } finally {
      setIsRecommending(false); // Stop the loading transition
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8A2BE2" />
        <Text style={styles.loadingText}>Loading Your Style Quiz...</Text>
      </View>
    );
  }
  
  // This is the new loading screen for the transition between Quiz and Results
  if (isRecommending) {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color="#8A2BE2" />
            <Text style={styles.loadingText}>Aura is curating your collection...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      {quizItems.length > 0 ? (
        <>
          <Swiper
            ref={swiperRef}
            cards={quizItems}
            renderCard={(card) => <QuizCard card={card} />}
            onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, 'dislike')}
            onSwipedRight={(cardIndex) => handleSwipe(cardIndex, 'like')}
            onSwipedAll={handleSwipedAll}
            stackSize={3}
            stackSeparation={-25}
            cardVerticalMargin={20}
            backgroundColor={'#f0eefc'}
            animateCardOpacity
            verticalSwipe={false}
            overlayLabels={{
                left: { title: 'NOPE', style: { label: styles.overlayLabelText, wrapper: { ...styles.overlayWrapper, backgroundColor: 'rgba(229, 86, 109, 0.7)' }}},
                right: { title: 'LIKE', style: { label: styles.overlayLabelText, wrapper: { ...styles.overlayWrapper, backgroundColor: 'rgba(76, 204, 147, 0.7)' }}}
            }}
          />
          <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>Swipe Left for NOPE or Right for LIKE</Text>
          </View>
        </>
      ) : (
        <View style={styles.loader}>
            <Text style={styles.infoText}>Could not load quiz items. Please try again later.</Text>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0eefc' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  infoText: { marginTop: 10, fontSize: 16, color: '#555', textAlign: 'center' },
  loadingText: { marginTop: 20, fontSize: 16, fontWeight: '600', color: '#555' },
  overlayWrapper: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
  overlayLabelText: { fontSize: 48, fontWeight: 'bold', color: 'white', borderWidth: 3, borderColor: 'rgba(255, 255, 255, 0.8)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, overflow: 'hidden' },
  instructionsContainer: { position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' },
  instructionsText: { fontSize: 16, fontWeight: '600', color: '#666', backgroundColor: 'rgba(255, 255, 255, 0.7)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 15, overflow: 'hidden' }
});