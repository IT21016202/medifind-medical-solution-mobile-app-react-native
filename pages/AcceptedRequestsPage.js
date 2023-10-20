import React, {useState, useEffect} from 'react';
import {ref, getDatabase, onValue} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';
import {getUserSession} from '../SessionManager/SessionManager';
import {Text, View} from 'react-native';

const database = getDatabase(app);

const AcceptedRequestsPage = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userSession = await getUserSession();

      // Fetch user profile data
      // Replace 'userProfiles' with the correct path to user profiles in your database
      const userProfileRef = ref(database, `Users/${userSession.uid}`);
      // Fetch the user's profile data
      // You should implement the user profile retrieval logic

      // Fetch accepted requests
      const acceptedRequestsRef = ref(database, 'acceptedRequests');
      onValue(acceptedRequestsRef, snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const acceptedRequestsArray = Object.values(data);

          // Filter the accepted requests to show only those belonging to the current user
          const userAcceptedRequests = acceptedRequestsArray.filter(
            request => request.userid === userSession.uid,
          );

          setAcceptedRequests(userAcceptedRequests);
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
        <View key={index}>
          {/* Display accepted request details */}
          <Text style={{color: 'black'}}>Location: {request.location}</Text>
          <Text style={{color: 'black'}}>Blood Type: {request.bloodType}</Text>
          <Text style={{color: 'black'}}>
            Description: {request.description}
          </Text>
          {/* Display donor's user profile data */}
          <Text style={{color: 'black'}}>Donor Name: {userProfile.Name}</Text>
          <Text style={{color: 'black'}}>
            Donor Contact: {userProfile.Mobile}
          </Text>
          {/* Add more user profile fields as needed */}
        </View>
      ))}
    </View>
  );
};

export default AcceptedRequestsPage;
