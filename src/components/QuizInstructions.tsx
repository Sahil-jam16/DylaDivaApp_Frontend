import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuizInstructions = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <Text style={styles.infoText}>Could not load quiz items. Please try again later.</Text>
        </View>
      ) : (
        <View style={styles.instructionsContainer}>
          <View style={styles.instructionRow}>
            <MaterialCommunityIcons name="gesture-swipe-left" size={24} color="#FF4D4F" />
            <Text style={[styles.instructionText, styles.nopeText]}>Swipe Left for NOPE</Text>
          </View>
          <View style={styles.instructionRow}>
            <MaterialCommunityIcons name="heart" size={24} color="#52C41A" />
            <Text style={[styles.instructionText, styles.likeText]}>Swipe Right for LIKE</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default QuizInstructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  nopeText: {
    color: '#FF4D4F', // Red for Nope
  },
  likeText: {
    color: '#52C41A', // Green for Like
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});