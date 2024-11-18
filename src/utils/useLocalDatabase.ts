import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@app_data';

const useLocalDatabase = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data initially
  useEffect(() => {
    const loadItems = async () => {
      try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY);
        const data = existingData ? JSON.parse(existingData) : [];
        setItems(data);
      } catch (error) {
        console.error('Error loading items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Add an item
  const addItem = async (item: any) => {
    try {
      const updatedItems = [...items, item];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
      console.log('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Update an item by id
  const updateItem = async (id: string, updatedItem: any) => {
    try {
      const updatedItems = items
        ?.flat()
        .map(item => (item.id === id ? {...item, ...updatedItem} : item));

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Delete an item by id
  const deleteItem = async (id: string) => {
    try {
      const updatedItems = items?.flat().filter(item => item.id !== id);

      console.log(updatedItems, 'skdysdyf');

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
      setItems(updatedItems);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Refresh items manually
  const refreshItems = async () => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : [];
      setItems(data);
      console.log('Items refreshed');
    } catch (error) {
      console.error('Error refreshing items:', error);
    }
  };

  return {items, loading, addItem, updateItem, deleteItem, refreshItems};
};

export default useLocalDatabase;
