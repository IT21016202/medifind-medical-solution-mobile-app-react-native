import React, {useState, useEffect} from 'react';
import {ref, getDatabase, onValue, get} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';
import {getUserSession} from '../SessionManager/SessionManager';
import {Text, View, StyleSheet} from 'react-native';
import {SearchBar, Card} from '@rneui/themed';

const database = getDatabase(app);

const AcceptedRequestsPage = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [donorDetails, setDonorDetails] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userSession = await getUserSession();

  //     // Fetch user profile data
  //     // Replace 'userProfiles' with the correct path to user profiles in your database
  //     const userProfileRef = ref(database, `Users/${userSession.uid}`);
  //     // Fetch the user's profile data
  //     // You should implement the user profile retrieval logic

  //     // Fetch accepted requests
  //     const acceptedRequestsRef = ref(database, 'AcceptedRequests');
  //     onValue(acceptedRequestsRef, snapshot => {
  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         const acceptedRequestsArray = Object.values(data);

  //         // Filter the accepted requests to show only those belonging to the current user
  //         const userAcceptedRequests = acceptedRequestsArray.filter(
  //           request => request.userid === userSession.uid,
  //         );

  //         setAcceptedRequests(userAcceptedRequests);
  //       } else {
  //         setAcceptedRequests([]);
  //       }
  //     });
  //   };

  //   fetchData();

  //   return () => {
  //     // Unsubscribe from the listener
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userSession = await getUserSession();
      const acceptedRequestsRef = ref(database, 'AcceptedRequests');

      onValue(acceptedRequestsRef, async snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const acceptedRequestsArray = Object.values(data);

          // Filter the accepted requests to show only those belonging to the current user
          const userAcceptedRequests = acceptedRequestsArray.filter(
            request => request.userid === userSession.uid,
          );

          setAcceptedRequests(userAcceptedRequests);

          // Fetch donor details for each accepted request
          const promises = userAcceptedRequests.map(async request => {
            const donorId = request.donorid;
            const userProfileRef = ref(database, `Users/${donorId}`);
            const snapshot = await get(userProfileRef);
            if (snapshot.exists()) {
              const donorData = snapshot.val();
              // Store donor details in an object with the donor's ID as the key
              setDonorDetails(prevDetails => ({
                ...prevDetails,
                [donorId]: donorData,
              }));
            }
          });

          // Wait for all promises to complete
          await Promise.all(promises);
        } else {
          setAcceptedRequests([]);
        }
      });
    };

    fetchData();

    return () => {
      // Unsubscribe from the listener
    };
  }, []);

  return (
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
        Your Accepted Requests
      </Text>
      {acceptedRequests.map((request, index) => (
        // <View key={index} style={{marginTop: 30}}>
        //   {/* Display accepted request details */}
        //   <Text style={{color: 'black'}}>Location: {request.location}</Text>
        //   <Text style={{color: 'black'}}>Blood Type: {request.bloodType}</Text>
        //   <Text style={{color: 'black'}}>
        //     Description: {request.description}
        //   </Text>
        //   {donorDetails[request.donorid] && (
        //     <View>
        //       <Text style={{color: 'black'}}>
        //         Donor Name: {donorDetails[request.donorid].Name}
        //       </Text>
        //       <Text style={{color: 'black'}}>
        //         Donor Contact: {donorDetails[request.donorid].Mobile}
        //       </Text>
        //       {/* Add more donor details as needed */}
        //     </View>
        //   )}
        // </View>

        <Card key={index}>
          {donorDetails[request.donorid] && (
            <View style={styles.cardContent}>
              <Card.Image
                style={{borderRadius: 100, width: 80, height: 80}}
                source={{
                  uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
                }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Donor Name : {donorDetails[request.donorid].Name}</Text>
                <Text style={styles.text2}>Location : {request.location}</Text>
                <Text style={styles.text2}>{request.description}</Text>
                <Text style={styles.text2}>Donor Contact: {donorDetails[request.donorid].Mobile}</Text>
              </View>

              <View style={styles.textContainer2}>
                <Card.Image
                  style={{borderRadius: 100, width: 40, height: 40}}
                  source={require('../assets/images/icons/bloodIcon.png')}
                />
                <Text style={styles.text3}>
                  Blood Type: {request.bloodType}
                </Text>
                <Text style={styles.text3}>
                  {request.bloodType}
                </Text>
              </View>
            </View>
          )}
        </Card>
      ))}
    </View>
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

export default AcceptedRequestsPage;
