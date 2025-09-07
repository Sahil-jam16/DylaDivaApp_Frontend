// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View, ActivityIndicator, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomeScreen = () => {
  const [inventory, setInventory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await axios.get('https://6972df348ddf.ngrok-free.app/inventory', {
        headers: {
          // This custom header tells ngrok to bypass the warning page
          'ngrok-skip-browser-warning': 'true'
        }
      });
      // console.log('Inventory data:', response.data);
      setInventory(response.data);
    } catch (error) {
    console.error('Error fetching inventory:', {
      message: error.message,
      code: error.code,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });
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
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {inventory.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
