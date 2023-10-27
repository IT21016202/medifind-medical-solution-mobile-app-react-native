import React, {useState, useEffect} from 'react';
import {SearchBar, Card} from '@rneui/themed';
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

const BloodDonorList = ({navigation}) => {
  const database = getDatabase();
  const [donorList, setDonorList] = useState([]);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('list'); // Add view mode state

  const updateSearch = text => {
    setSearch(text);
  };

  useEffect(() => {
    // Create a reference to the "Users" node in the database
    const usersRef = ref(database, 'Users');

    // Create a query to filter users by the "Type" field with the value "donor"
    const donorQuery = query(usersRef, orderByChild('Type'), equalTo('donor'));

    get(donorQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          // Convert the snapshot to an array of donors
          const donorArray = [];
          snapshot.forEach(childSnapshot => {
            const donorData = childSnapshot.val();
            donorArray.push(donorData);
          });
          setDonorList(donorArray);
        } else {
          console.log('No donors found');
        }
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
      });
  }, []);

  // Function to navigate to the map view
  const navigateToMapView = () => {
    navigation.navigate('DonorMapView');
  };

  const filteredDonorList = donorList.filter((donor) => {
    const searchQuery = search.toLowerCase();
    const donorName = donor.Name ? donor.Name.toLowerCase() : '';
    const bloodType = donor.BloodType ? donor.BloodType.toLowerCase() : '';
    const location = donor.Location ? donor.Location.toLowerCase() : '';
  
    return (
      donorName.includes(searchQuery) ||
      bloodType.includes(searchQuery) ||
      location.includes(searchQuery)
    );
  });
  

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Blood Donor List</Text>

      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round
        searchIcon
      />

      {/* Styled button to navigate to the map view */}
      <TouchableOpacity style={styles.button} onPress={navigateToMapView}>
        <Text style={styles.buttonText}>View on Map</Text>
      </TouchableOpacity>

      {filteredDonorList.map((donor, index) => (
        <Card key={index}>
          <View style={styles.cardContent}>
            <Card.Image
              style={{borderRadius: 100, width: 80, height: 80}}
              source={{
                uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
              }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>{donor.Name}</Text>
              <Text style={styles.text2}>{donor.Location}</Text>
              <Text style={styles.text2}>{donor.LastDonatedDate}</Text>
            </View>
            <View style={styles.textContainer2}>
              <Card.Image
                style={{borderRadius: 100, width: 40, height: 40}}
                source={require('../assets/images/icons/bloodIcon.png')}
              />
              <Text style={styles.text3}>Blood Type: {donor.BloodType}</Text>
            </View>
          </View>
        </Card>
      ))}
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

  button: {
    backgroundColor: '#13BC9E',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BloodDonorList;
