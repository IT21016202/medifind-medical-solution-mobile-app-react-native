import React, {useState} from 'react';
import SubmitButton from '../components/SubmitButton';
import {
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  View,
} from 'react-native';

const TemporaryPage = ({navigation}) => {
  return (
    <ScrollView style={styles.view}>
      <SubmitButton
        text="Blood Request Feed"
        onPress={() => navigation.navigate('BloodRequestPage')}
      />
      <SubmitButton
        text="Blood Searcher details"
        onPress={() => navigation.navigate('BloodSearcherDetails')}
      />
      <SubmitButton
        text="Blood Donor List"
        onPress={() => navigation.navigate('BloodDonorList')}
      />
      <SubmitButton
        text="Chart T"
        onPress={() => navigation.navigate('Chart')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },

  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
    marginBottom: 10,
  },

  image: {
    marginLeft: 15,
  },

  text: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  input: {
    marginTop: 20,
    borderColor: '#13BC9E',
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
});

export default TemporaryPage;
