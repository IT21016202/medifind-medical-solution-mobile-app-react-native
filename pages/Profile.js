import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getUserSession} from '../SessionManager/SessionManager';
import {getDatabase, ref, get, set} from 'firebase/database';

const Profile = ({navigation}) => {
  const database = getDatabase();
  const [userData, setUserData] = React.useState({});

  const userType = userData.Type;

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      // Create a reference to the specific document.
      const userRef = ref(database, 'Users/' + userSession.uid);

      // Retrieve data from the specific user's document
      get(userRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            // Data exists in the document
            const data = snapshot.val();
            setUserData(data);
            console.log(data);
          } else {
            console.log('User Data Not Found !');
          }
        })
        .catch(err => {
          console.error('Error retrieving user data:', err);
        });
    };
    checkUserSession();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://www.bootdey.com/image/900x400/FF7F50/000000'}}
        style={styles.coverImage}
      />
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: userData.Image,
          }}
          style={styles.avatar}
        />
        <Text style={[styles.name, styles.textWithShadow]}>
          {userData.Name}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Mobile:</Text>
          <Text style={styles.infoValue}>{userData.Mobile}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>User Type:</Text>
          <Text style={styles.infoValue}>{userData.Type}</Text>
        </View>
        {userType === 'donor' && (
          <View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>{userData.Location}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Blood Type:</Text>
              <Text style={styles.infoValue}>{userData.BloodType}</Text>
            </View>
          </View>
        )}
      </View>
      {userType === 'user' && (
        <View style={styles.buttonContain}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('RequestBlood')}>
            <Text>Add Blood Request</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('UserAddedRequests')}>
            <Text>Previously added Requests</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('AcceptedRequestsPage')}>
            <Text>View Accepted Requests</Text>
          </TouchableOpacity>
        </View>
      )}

      {userType === 'donor' && (
        <View style={styles.buttonContain}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('BloodRequestPage')}>
            <Text>View Blood Request Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('DonorAcceptedRequests')}>
            <Text>View Accepted Requests</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonContainer}>
            <Text>Donor-specific Button 3</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginTop: 16,
  //   color: '#13BC9E',
  // },

  // text: {
  //   marginTop: 25,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#13BC9E',
  // },
  coverImage: {
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  content: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00CED1',
  },

  buttonContain: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
