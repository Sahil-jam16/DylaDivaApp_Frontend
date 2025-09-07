import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HighlightedTextProps {
  text: string;
  style?: object;
}

const HighlightedText = ({ text, style }: HighlightedTextProps) => {
  if (!text) return null;

  // This regular expression splits the string by single quotes, but keeps them in the array
  const parts = text.split(/(')/g);

  let isBold = false;
  return (
    <Text style={style}>
      {parts.map((part, index) => {
        // When we see a quote, we toggle the bold style for the next part
        if (part === "'") {
          isBold = !isBold;
          return null; // We don't render the quote character itself
        }
        // Apply the bold style if we are "inside" a pair of quotes
        return (
          <Text key={index} style={isBold ? styles.boldText : {}}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
});

export default HighlightedText;