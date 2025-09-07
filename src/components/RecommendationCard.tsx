import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import HighlightedText from './HighlightedText'; // --- 1. IMPORT THE NEW COMPONENT ---

// Define the structure of the item prop for TypeScript
interface RecommendationCardProps {
  item: {
    product_name: string;
    reason: string;
    firebaseImageUrl?: string;
    product_image_url: string; // Fallback if firebaseImageUrl is null
    product_url: string;
    type?: 'core' | 'bridge' | 'aspirational'; // Optional type from the prompt
  };
}

const RecommendationCard = ({ item }: RecommendationCardProps) => {
  // Use a placeholder image if no URL is available
  const imageUrl = item.firebaseImageUrl || item.product_image_url || null;

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      <Card.Content style={styles.content}>
        <Text style={styles.name}>{item.product_name}</Text>
        
        {/* --- 2. USE THE HIGHLIGHTEDTEXT COMPONENT FOR THE REASON --- */}
        <HighlightedText text={item.reason} style={styles.reason} />
        
        {item.type && (
          <Chip icon="star" style={styles.chip} textStyle={styles.chipText}>
            {item.type} Match
          </Chip>
        )}
      </Card.Content>
    </Card>
  );
};

export default RecommendationCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 12,
    color: '#333',
  },
  reason: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  chip: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: '#F0E6FF',
  },
  chipText: {
    color: '#4B0082',
    fontWeight: '600',
  }
});