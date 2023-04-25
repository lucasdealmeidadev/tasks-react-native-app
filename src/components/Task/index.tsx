import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ListProps } from '../../../App';
import { FontAwesome } from '@expo/vector-icons';

interface TaskProps {
  data: ListProps;
  deleteItem: (key: string) => void;
}

export default function Task({ data, deleteItem }: TaskProps) {
  function handleDeleteItem() {
    deleteItem(data.key);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDeleteItem}>
        <FontAwesome name='trash' size={20} color="#22272e" />
      </TouchableOpacity>

      <Text>{data.item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(196, 196, 196, 0.20)',
    marginTop: 12,
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row'
  },
  button: {
    marginRight: 15
  }
});