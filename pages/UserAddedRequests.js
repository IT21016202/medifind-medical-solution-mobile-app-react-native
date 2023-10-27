import React, {useState, useEffect} from 'react';
import {SearchBar, Card, Button as RNEButton} from '@rneui/themed';
import {
  ref,
  getDatabase,
  onValue,
  push,
  set,
  remove,
  get,
} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';
import {getUserSession} from '../SessionManager/SessionManager';
import {
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  View,
  Alert, // Import the Alert component
} from 'react-native';

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

const UserAddedRequests = ({navigation}) => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // Fetch blood requests added by the logged-in user
  const fetchUserAddedBloodRequests = async () => {
    const userSession = await getUserSession();
    setUserSession(userSession);

    // Create a reference to the "bloodRequests" node in the database
    const bloodRequestsRef = ref(database, 'bloodRequests');

    // Create a query to filter requests by the user's UID
    const userRequestsQuery = ref(bloodRequestsRef);
    const requestsArray = [];

    onValue(userRequestsQuery, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Loop through the data to find requests added by the logged-in user
        for (const key in data) {
          const request = data[key];
          if (request.userid === userSession.uid) {
            requestsArray.push(request);
            console.log('User ID', userSession.uid);
            console.log('request', request);
            console.log('request user id', request.userid);
          }
        }

        setBloodRequests(requestsArray);
      } else {
        setBloodRequests([]);
      }
    });
  };

  useEffect(() => {
    fetchUserAddedBloodRequests();
  }, []);

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Previously added Requests</Text>

      {bloodRequests.map((request, index) => {
        return (
          <Card key={index}>
            <View style={styles.cardContent}>
              <Card.Image
                style={{borderRadius: 100, width: 80, height: 80}}
                source={{
                  uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
                }}
              />

              <View style={styles.textContainer}>
                <View>
                  <Text style={styles.text}>
                    {userDetails[request.userid].Name}
                  </Text>
                  <Text style={styles.text2}>{request.location}</Text>
                  <Text style={styles.text2}>{request.description}</Text>
                </View>
              </View>
              <View style={styles.textContainer2}>
                <Card.Image
                  style={{borderRadius: 100, width: 40, height: 40}}
                  source={require('../assets/images/icons/bloodIcon.png')}
                />
                <Text style={styles.text3}>{request.bloodType}</Text>
              </View>
            </View>
          </Card>
        );
      })}
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

export default UserAddedRequests;
