import React, { useState } from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';

// Helper function to safely parse the stringified detail fields
const parseDetails = (detailsString) => {
    if (!detailsString || typeof detailsString !== 'string' || detailsString === '{}' || detailsString === '[]') {
        return null;
    }
    try {
        // Replace single quotes with double quotes for valid JSON
        const validJsonString = detailsString.replace(/'/g, '"');
        return JSON.parse(validJsonString);
    } catch (e) {
        console.error("Failed to parse details string:", e);
        return null;
    }
};

const ProductCard = ({ product }: { product: any }) => {
    // State to manage if the card is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);

    // Parse the details when the component renders
    const metalDetails = parseDetails(product.metal_details);
    const diamondDetails = parseDetails(product.diamond_details);

    return (
        <Card style={styles.card} onPress={() => setIsExpanded(!isExpanded)}>
            <Card.Cover 
                source={{ uri: product.firebaseImageUrl || product.product_image_url }} 
                style={styles.image} 
            />
            <Card.Content style={styles.content}>
                <Text style={styles.name}>{product.product_name}</Text>
                <Text style={styles.price}>₹ {product.price.toLocaleString('en-IN')}</Text>
                
                {/* --- EXPANDABLE SECTION --- */}
                {isExpanded && (
                    <View style={styles.detailsContainer}>
                        <Divider style={styles.divider} />
                        <Text style={styles.description}>{product.short_description}</Text>
                        
                        {/* Display Metal Details if they exist */}
                        {metalDetails && (
                           <Text style={styles.detailText}>
                               <Text style={styles.detailTitle}>Metal: </Text>
                               {metalDetails.Type || ''} ({metalDetails['Weight   The final invoice amount will be adjusted in case of variation in weight.'] || ''})
                           </Text>
                        )}
                        
                        {/* Display Diamond Details if they exist */}
                        {diamondDetails && diamondDetails.length > 0 && (
                            <View>
                                <Text style={styles.detailTitle}>Diamonds:</Text>
                                {diamondDetails.map((detail, index) => (
                                    <Text key={index} style={styles.detailText}>
                                        - {detail.count} {detail.shape} ({detail.weight})
                                    </Text>
                                ))}
                            </View>
                        )}

                        {/* Link to the product page */}
                        <Text style={styles.link} onPress={() => Linking.openURL(product.product_url)}>
                            View on Website
                        </Text>
                    </View>
                )}
                {/* --- END OF EXPANDABLE SECTION --- */}

            </Card.Content>
        </Card>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 12,
        backgroundColor: '#FFF',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#FAFAFA'
    },
    content: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C2C2C',
    },
    price: {
        fontSize: 14,
        color: '#8A2BE2', // Your brand's purple
        marginTop: 4,
        marginBottom: 8,
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        marginBottom: 12,
    },
    detailsContainer: {
        marginTop: 10,
    },
    divider: {
        marginVertical: 12,
    },
    detailTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },
    detailText: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    link: {
        fontSize: 14,
        color: '#007AFF', // Standard link color
        marginTop: 16,
        textDecorationLine: 'underline',
    },
});