import React, {useState} from 'react';
import {SearchBar, Card} from '@rneui/themed';
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

const BloodRequestPage = ({navigation}) => {
  const [search, setSearch] = useState('');

  const updateSearch = text => {
    setSearch(text);
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Blood Request Feed</Text>

      <View style={styles.SearchViewContainer}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          round
          searchIcon
        />
      </View>

      <Card>
        <View style={styles.cardContent}>
          <Card.Image
            style={{borderRadius: 100, width: 80, height: 80}}
            source={{
              uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Jhon Snow</Text>
            <Text style={styles.text2}>Galle</Text>
            <Text style={styles.text2}>Rating : 4.5</Text>
          </View>
          <View style={styles.textContainer2}>
            <Card.Image
              style={{borderRadius: 100, width: 40, height: 40}}
              source={require('../assets/images/icons/bloodIcon.png')}
            />
            <Text style={styles.text3}>A +</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.declinebutton]} >
            <Text style={styles.declinebuttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.acceptbutton]} >
            <Text style={styles.declinebuttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </Card>
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

  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  text3: {
    marginLeft: 10,
    fontSize: 15,
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

  SearchViewContainer: {
    marginTop: 20,
    borderRadius: 10,
    // Add other styles here if needed
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    marginLeft: 10, // Add margin as needed
  },

  textContainer2: {
    marginLeft: 20, // Add margin as needed
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Add margin as needed
  },

  declinebutton: {
    marginTop: 20,
    width: '40%',
    backgroundColor: '#F21B1B',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  declinebuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  acceptbutton: {
    marginTop: 20,
    width: '40%',
    backgroundColor: '#13BC9E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});

export default BloodRequestPage;
