import React from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';

interface QuizCardProps {
  card?: {
    firebaseImageUrl?: string;
    product_image_url: string;
    product_name: string;
  };
}

const { width } = Dimensions.get('window');

const QuizCard = ({ card }: QuizCardProps) => {
  if (!card) {
    return null; // Safety check
  }

  // Prioritize the Firebase URL if it exists, otherwise use the original
  const imageUrl = card.firebaseImageUrl || card.product_image_url;

  return (
    <Card style={styles.card}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="contain" // Ensures the whole image is visible without cropping
      />
      <Card.Content style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{card.product_name}</Text>
      </Card.Content>
    </Card>
  );
};

export default QuizCard;

const styles = StyleSheet.create({
  card: {
    height: width * 1.25,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    // Give the image a fixed proportion of the card height
    width: '100%',
    height: '85%', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    // This content area takes up the remaining space
    flex: 1, 
    // This centers the name vertically in the space below the image
    justifyContent: 'center', 
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
});