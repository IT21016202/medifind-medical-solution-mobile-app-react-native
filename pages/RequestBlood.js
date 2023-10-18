import React, {useState} from 'react';
import BloodButton from '../components/BloodButton';
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

const RequestBlood = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState('A+');

  const handleButtonPress = text => {
    setSelectedButton(text);
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Hello Emily ,</Text>
      <Text style={styles.topic}>Looking for Blood?</Text>

      <Text style={styles.text}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        placeholderTextColor="#A9A9A9"
        name="location"
        value=""></TextInput>

      <Text style={styles.text}>Select Blood Type</Text>

      <View style={styles.buttonRow}>
        <BloodButton
          text="A+"
          selected={selectedButton === 'A+'}
          onPress={() => handleButtonPress('A+')}
        />
        <BloodButton
          text="A-"
          selected={selectedButton === 'A-'}
          onPress={() => handleButtonPress('A-')}
        />
        <BloodButton
          text="B+"
          selected={selectedButton === 'B+'}
          onPress={() => handleButtonPress('B+')}
        />
        <BloodButton
          text="B-"
          selected={selectedButton === 'B-'}
          onPress={() => handleButtonPress('B-')}
        />
      </View>

      <View style={styles.buttonRow}>
        <BloodButton
          text="AB+"
          selected={selectedButton === 'AB+'}
          onPress={() => handleButtonPress('AB+')}
        />
        <BloodButton
          text="AB-"
          selected={selectedButton === 'AB-'}
          onPress={() => handleButtonPress('AB-')}
        />
        <BloodButton
          text="O+"
          selected={selectedButton === 'O+'}
          onPress={() => handleButtonPress('O+')}
        />
        <BloodButton
          text="O-"
          selected={selectedButton === 'O-'}
          onPress={() => handleButtonPress('O-')}
        />
      </View>

      <View style={styles.container}>
        <SubmitButton text="Submit" />
        <SubmitButton
          text="All other UI's"
          onPress={() => navigation.navigate('TemporaryPage')}
        />
      </View>
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

export default RequestBlood;
