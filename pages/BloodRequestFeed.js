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

const BloodRequestPage = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [bloodRequests, setBloodRequests] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const updateSearch = text => {
    setSearch(text);
  };

  // Set up a listener for 'bloodRequests' data
  const bloodRequestsRef = ref(database, 'bloodRequests');

  const fetchBloodRequests = async () => {
    const userSession = await getUserSession();
    setUserSession(userSession);
    const bloodRequestsRef = ref(database, 'bloodRequests');
    onValue(bloodRequestsRef, async snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const requestsArray = Object.values(data);
        setBloodRequests(requestsArray);

        // Fetch donor details for each accepted request
        const promises = requestsArray.map(async request => {
          const userId = request.userid;
          const userProfileRef = ref(database, `Users/${userId}`);
          const snapshot = await get(userProfileRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            // Store donor details in an object with the donor's ID as the key
            setUserDetails(prevDetails => ({
              ...prevDetails,
              [userId]: userData,
            }));
          }
        });

        // Wait for all promises to complete
        await Promise.all(promises);
      } else {
        setBloodRequests([]);
      }
    });
  };

  useEffect(() => {
    fetchBloodRequests();
  }, []);

  const acceptRequest = async request => {
    // Save the accepted request to the database
    const acceptedRequestsRef = ref(database, 'AcceptedRequests');

    const userSession = await getUserSession();

    // Push the accepted request as a new entry
    const newAcceptedRequestRef = push(acceptedRequestsRef);

    const acceptedRequest = {
      donorid: userSession.uid,
      location: request.location,
      bloodType: request.bloodType,
      description: request.description,
      userid: request.userid,
      // Include other properties from the request
    };

    set(newAcceptedRequestRef, acceptedRequest)
      .then(() => {
        // Success message
        console.log('Request accepted and saved to AcceptedRequests');

        // Show the confirmation message using Alert
        Alert.alert('Success', 'Request successfully accepted');
      })
      .catch(error => {
        // Handle the error
        console.error('Error accepting request:', error);
      });
  };

  const declineRequest = request => {
    // Implement the logic for declining a request
    console.log('Request declined');
  };

  const editRequest = request => {
    // Implement the logic to edit the request
    console.log('Edit request:', request);
    navigation.navigate('EditRequest', {request: request});
    // You can navigate to an edit screen and pass the request details for editing
    // For example, navigate to an edit screen with the request data
    // navigation.navigate('EditRequest', { request });
  };

  const deleteRequest = request => {
    const bloodRequestRef = ref(database, `bloodRequests/${request.id}`);
    remove(bloodRequestRef)
      .then(() => {
        console.log('Request deleted');
        Alert.alert('Success', 'Request successfully deleted');
        fetchBloodRequests(); // Refresh the blood requests after deleting
      })
      .catch(error => {
        console.error('Error deleting request:', error);
      });
  };

  // Filter bloodRequests based on the search input
  const filteredBloodRequests = bloodRequests.filter(request => {
    // You can include multiple properties in the filter condition
    const locationMatch = request.location
      .toLowerCase()
      .includes(search.toLowerCase());
    const bloodTypeMatch = request.bloodType
      .toLowerCase()
      .includes(search.toLowerCase());
    // Add more properties here if needed

    // Return true if any property contains the search input
    return locationMatch || bloodTypeMatch; // Add more conditions as needed
  });

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

      {filteredBloodRequests.map((request, index) => {
        // Now you can access the data correctly
        console.log('Request:', request); // Log the request object
        console.log('Location:', request?.location); // Log location
        console.log('Blood Type:', request?.bloodType); // Log blood type
        console.log('Request ID:', index);

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
                {userDetails[request.userid] && (
                  <View>
                    <Text style={styles.text}>
                      {userDetails[request.userid].Name}
                    </Text>
                    <Text style={styles.text2}>{request.location}</Text>
                    <Text style={styles.text2}>{request.description}</Text>
                  </View>
                )}
              </View>
              <View style={styles.textContainer2}>
                <Card.Image
                  style={{borderRadius: 100, width: 40, height: 40}}
                  source={require('../assets/images/icons/bloodIcon.png')}
                />
                <Text style={styles.text3}>{request.bloodType}</Text>
              </View>
            </View>
            {userSession && userSession.Type === 'donor' && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.declinebutton}
                  onPress={() => declineRequest(request)}>
                  <Text style={styles.declinebuttonText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptbutton}
                  onPress={() => acceptRequest(request)}>
                  <Text style={styles.declinebuttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Add Edit and Delete buttons */}
            {userSession && userSession.uid === request.userid && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.declinebutton}
                  onPress={() => editRequest(request)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.acceptbutton}
                  onPress={() => deleteRequest(request)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
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

export default BloodRequestPage;
