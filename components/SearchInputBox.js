import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const SearchInputBox = () => {
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={40}
        style={styles.input}
        placeholder="search to find your medicine ..."
        borderColor="#B0A7A7"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1, // Add a border width
    borderColor: 'gray', // Default border color
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 15,
    fontFamily: 'Poppins',
    padding: 8,
    fontSize: 16,
    color: 'gray',
  },
});

export default SearchInputBox;
