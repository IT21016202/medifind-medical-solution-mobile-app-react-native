import React, {useState} from 'react';
import BloodButton from '../components/BloodButton';
import SubmitButton from '../components/SubmitButton';
import {app} from '../Firebase/FirebaseConfing.js';
import {getDatabase, ref, set} from 'firebase/database';
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

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

const RequestBlood = ({navigation}) => {
  const [selectedButton, setSelectedButton] = useState('A+');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleButtonPress = text => {
    setSelectedButton(text);
  };

  const handleDataSubmission = () => {
    // Create a new reference under 'bloodRequests'
    const newRequestRef = ref(database, 'bloodRequests');

    // Set the data to be inserted
    const requestData = {
      location,
      bloodType: selectedButton,
      description,
    };

    // Use the 'set' function to insert the data
    set(newRequestRef, requestData)
      .then(() => {
        console.log('Data inserted successfully');
        // Clear the input fields or do other actions as needed
        setLocation('');
        setDescription('');
        setSelectedButton('A+'); // Reset blood type selection
        alert('Data added to the Realtime Database');
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
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
        value={location}
        onChangeText={text => setLocation(text)}></TextInput>

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

      <Text style={styles.text}>Description</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter description"
        placeholderTextColor="#A9A9A9"
        name="description"
        value={description}
        onChangeText={text => setDescription(text)}></TextInput>

      <View style={styles.buttonContainer}>
        <SubmitButton text="Submit" onPress={handleDataSubmission} />
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

  // container: {
  //   flex: 1,
  //   justifyContent: 'center', // Center vertically
  //   alignItems: 'center', // Center horizontally
  // },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Add margin as needed
  },
});

export default RequestBlood;
