import React, {useState, useEffect} from 'react';
import {ref, getDatabase, onValue, get} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';
import {getUserSession} from '../SessionManager/SessionManager';
import {Text, View} from 'react-native';

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
    <View >
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
          {donorDetails[request.donorid] && (
            <View>
              <Text style={{color: 'black'}}>
                Donor Name: {donorDetails[request.donorid].Name}
              </Text>
              <Text style={{color: 'black'}}>
                Donor Contact: {donorDetails[request.donorid].Mobile}
              </Text>
              {/* Add more donor details as needed */}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default AcceptedRequestsPage;
