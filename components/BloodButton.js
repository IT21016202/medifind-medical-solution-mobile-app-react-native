import React from 'react';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const BloodButton = ({ text, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.button, selected ? styles.selected : styles.unselected]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Custom button styles
  button: {
    marginTop: 30,
    width: '20%',
    backgroundColor: '#13BC9E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  selected: {
    backgroundColor: '#13BC9E', // Selected button color
  },
  unselected: {
    backgroundColor: 'gray', // Unselected button color
  },
});

export default BloodButton;
