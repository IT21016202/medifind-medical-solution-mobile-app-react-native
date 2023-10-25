import React, {useState, useEffect} from 'react';
import {ref, getDatabase, onValue, get} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';
import {getUserSession} from '../SessionManager/SessionManager';
import {Text, View} from 'react-native';

const database = getDatabase(app);

const DonorAcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [userDetails, setuserDetails] = useState({});

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
            request => request.donorid === userSession.uid,
          );

          setAcceptedRequests(userAcceptedRequests);

          // Fetch donor details for each accepted request
          const promises = userAcceptedRequests.map(async request => {
            const userId = request.userid;
            const userProfileRef = ref(database, `Users/${userId}`);
            const snapshot = await get(userProfileRef);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              // Store donor details in an object with the donor's ID as the key
              setuserDetails(prevDetails => ({
                ...prevDetails,
                [userId]: userData,
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
        <View key={index} style={{marginTop: 30}}>
          {/* Display accepted request details */}
          <Text style={{color: 'black'}}>Location: {request.location}</Text>
          <Text style={{color: 'black'}}>Blood Type: {request.bloodType}</Text>
          <Text style={{color: 'black'}}>
            Description: {request.description}
          </Text>
          {userDetails[request.userid] && (
            <View>
              <Text style={{color: 'black'}}>
                user Name: {userDetails[request.userid].Name}
              </Text>
              <Text style={{color: 'black'}}>
                user Contact: {userDetails[request.userid].Mobile}
              </Text>
              {/* Add more donor details as needed */}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default DonorAcceptedRequests;
