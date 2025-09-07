import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const API_URL = 'https://6972df348ddf.ngrok-free.app';

const HomeScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(`${API_URL}/inventory?per_page=50`, { // Fetch more items
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInventory().finally(() => setRefreshing(false));
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#8A2BE2"/>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={inventory}
      keyExtractor={(item) => item.product_url}
      renderItem={({ item }) => <ProductCard product={item} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={() => (
        <View style={styles.header}>
            <Text style={styles.title}>Discover Our Collection</Text>
            <Text style={styles.subtitle}>Tap any item to see more details</Text>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  listContent: {
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
      padding: 20,
  },
  title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
  },
  subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 8,
  }
});