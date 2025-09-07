// src/screens/QuizSetupScreen.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';

const JEWELRY_CATEGORIES = ["Rings", "Pendants", "Earrings", "Necklaces"];

const QuizSetupScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const startQuiz = () => {
    navigation.navigate('Quiz', {
      selectedCategories: selectedCategories,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>What are you looking for?</Text>
        <Text style={styles.subtitle}>Select one or more categories to begin.</Text>
      </View>
      
      <View style={styles.categoryContainer}>
        {JEWELRY_CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category);
          return (
            <TouchableOpacity 
              key={category} 
              style={[styles.categoryButton, isSelected && styles.selectedButton]} 
              onPress={() => toggleCategory(category)}
            >
              <Text style={[styles.categoryText, isSelected && styles.selectedText]}>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      <Button 
        mode="contained"
        onPress={startQuiz}
        disabled={selectedCategories.length === 0}
        style={styles.startButton}
        labelStyle={styles.startButtonText}
      >
        Start Quiz
      </Button>
    </View>
  );
};

export default QuizSetupScreen;

// --- STYLES UPDATED FOR CENTERING ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'space-around', // This will space out the items vertically
  },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  categoryButton: { paddingHorizontal: 20, paddingVertical: 12, margin: 8, borderRadius: 20, backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd' },
  selectedButton: { backgroundColor: '#8A2BE2', borderColor: '#8A2BE2' }, // Using a purple from your branding
  categoryText: { fontSize: 16, color: '#333' },
  selectedText: { color: '#fff' },
  startButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 30, backgroundColor: '#8A2BE2' },
  startButtonText: { fontSize: 18, fontWeight: '600' },
});