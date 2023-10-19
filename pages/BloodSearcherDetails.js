import React, {useState} from 'react';
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

const BloodSearcherDetails = ({navigation}) => {
  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Request Details</Text>
      <Image
        style={{borderRadius: 100, width: 80, height: 80}}
        source={{
          uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
        }}
      />
      <Text style={styles.topic}>Name</Text>
      <Text style={styles.topic}>Blood Type</Text>
      <Text style={styles.topic}>Location</Text>
      <Text style={styles.topic}>Description</Text>
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

  //   image: {
  //     marginLeft: 15,
  //   },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
  },
});

export default BloodSearcherDetails;
