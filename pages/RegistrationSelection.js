import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MyButton from '../components/MyButton';

const RegistrationSelection = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/leaf-art.jpg')}
      style={styles.backgroundImage}>
      <ScrollView style={styles.view}>
        <Text style={styles.title}>Select your Registration Type</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('MedicalCenterRegistration')}>
          <Image
            style={styles.card}
            source={require('../assets/images/MedicalCenter1.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={styles.card}
            source={require('../assets/images/Doctor.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UserRegistration')}>
          <Image
            style={styles.card}
            source={require('../assets/images/Patient.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('BloodDonorRegistration')}>
          <Image
            style={styles.card}
            source={require('../assets/images/BloodDoner.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    marginTop: 25,
    textAlign: 'center',
  },

  card: {
    width: 350,
    height: 130,
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },

  backgroundImage: {
    resizeMode: 'cover',
  },
});

export default RegistrationSelection;
