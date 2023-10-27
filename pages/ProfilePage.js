import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native'; // Import ImageBackground

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can get the user ID
        const userId = user.uid;

        // Now, fetch user data using the user ID
        const db = getDatabase();
        const userRef = ref(db, `Users/${userId}`);

        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setUserData(data);
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        // User is signed out.
        console.log('No user is signed in.');
      }
    });
  }, []);

  return (
    <ImageBackground source={require('../assets/images/profilebackground.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{userData?.Name || 'Loading...'}</Text>
          <Text style={styles.profileSubtitle}>
            {userData ? userData.Mobile : 'Loading...'}
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>
              Height: {userData?.Height || 'Height not available'}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailText}>
              Weight: {userData?.Weight || 'Weight not available'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Appointments')}>
            <Text style={styles.buttonText}>All Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactHistoryPage', {username: userData?.Name || 'Loading...',})}>
            <Text style={styles.buttonText}>Contact History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatListPage')}>
            <Text style={styles.buttonText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Background image with 0.5 opacity
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#888888',
  },
  detailsSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  detailText: {
    fontSize: 18,
    color: '#333333',
  },
  buttonsSection: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(19, 188, 158, 0.7)', // #13BC9E with 70% opacity
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  buttonText: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default ProfilePage;
