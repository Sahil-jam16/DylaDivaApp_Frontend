import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import RecommendationCard from '../components/RecommendationCard';

const ResultsScreen = ({ route }) => {
  // The 'recommendations' array is passed from the QuizScreen
  const { recommendations } = route.params;

  return (
    <FlatList
      style={styles.container}
      data={recommendations}
      keyExtractor={(item) => item.product_url}
      renderItem={({ item }) => <RecommendationCard item={item} />}
      ListHeaderComponent={() => (
        <View>
          <Text style={styles.title}>Aura's Picks For You</Text>
          <Text style={styles.subtitle}>Based on your quiz, here are a few pieces we think you'll love.</Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.subtitle}>Could not generate recommendations at this time.</Text>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  listContent: {
    paddingBottom: 20, // Add padding at the bottom of the list
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,
    marginHorizontal: 20,
  }
});