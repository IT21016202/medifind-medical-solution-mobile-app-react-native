import React from 'react';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const SubmitButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Custom button styles
  button: {
    marginTop: 30,
    width: '40%',
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
});

export default SubmitButton;
