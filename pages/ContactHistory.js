import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';

const ContactHistoryPage = () => {
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [recentPharmacies, setRecentPharmacies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Initialize Firebase and create a reference to the database
    const db = getDatabase();

    // Create a reference to the "Users" node in the database
    const usersRef = ref(db, 'Users');

    // Fetch all user data
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = [];
          snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            users.push(user);
          });
          // Set all users in the state
          setAllUsers(users);
          // Filter recent doctors and pharmacies
          const recentDoctorUsers = users.filter((user) => user.Type === 'medical');
          setRecentDoctors(recentDoctorUsers.slice(0, 3));
          const recentPharmacyUsers = users.filter((user) => user.Type === 'donor');
          setRecentPharmacies(recentPharmacyUsers.slice(0, 3));
        } else {
          console.log('No users found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Function to filter users by Name based on the search text
  const filteredRecentDoctors = recentDoctors.filter((doctor) =>
    doctor.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredRecentPharmacies = recentPharmacies.filter((pharmacy) =>
    pharmacy.Name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUserItemClick = (user) => {
    // Navigate to the DoctorDetails screen and pass user details as route params
    navigation.navigate('DoctorHistoryPage', {
      doctorName: user.Name,
      doctorType: user.Type,
      doctorMobile: user.Mobile,
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/profilebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={[
              styles.searchBar,
              searchText ? styles.searchBarWithText : null,
            ]}
            placeholder="Search by Name"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DoctorHistoryPage', {
      doctorName: recentDoctors[0].Name,
      doctorType: recentDoctors[0].Type,
      doctorMobile: recentDoctors[0].Mobile,
    })}>
              <View style={[styles.userListContainer, styles.transparentBackground, styles.mostRecentContainer]}>
                <Text style={[styles.sectionHeader, styles.sectionHeaderMargin]}>Most Recent</Text>
                {recentDoctors.length > 0 ? (
                  <View style={styles.mostRecentContent}>
                    <Image
                      source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                      style={styles.mostRecentImage}
                    />
                    <View style={styles.mostRecentInfo}>
                      <Text style={styles.doctorName}>{recentDoctors[0].Name}</Text>
                      <Text style={styles.doctorPhone}>{recentDoctors[0].Mobile}</Text>
                      <Text style={styles.doctorType}>{recentDoctors[0].Type}</Text>
                    </View>
                  </View>
                ) : (
                  <Text>No recent doctors</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={[styles.userListContainer, styles.transparentBackground]}>
              <Text style={[styles.sectionHeader, styles.sectionHeaderMargin]}>Recent Doctors</Text>
              <ScrollView horizontal>
                {filteredRecentDoctors.map((doctor, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('DoctorHistoryPage', {
                    doctorName: doctor.Name,
                    doctorType: doctor.Type,
                    doctorMobile: doctor.Mobile,
                  })}>
                    <View style={styles.doctorItem}>
                      <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={styles.doctorImage}
                      />
                      <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{doctor.Name}</Text>
                        <Text style={styles.doctorPhone}>{doctor.Mobile}</Text>
                        <Text style={styles.doctorType}>{doctor.Type}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={[styles.userListContainer, styles.transparentBackground, styles.smallerContainer]}>
              <Text style={[styles.sectionHeader, styles.sectionHeaderMargin]}>Recent Pharmacies</Text>
              <ScrollView horizontal>
                {filteredRecentPharmacies.map((pharmacy, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('DoctorHistoryPage', {
                    doctorName: pharmacy.Name,
                    doctorType: pharmacy.Type,
                    doctorMobile: pharmacy.Mobile,
                  })}>
                    <View style={styles.doctorItem}>
                      <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={styles.doctorImage}
                      />
                      <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{pharmacy.Name}</Text>
                        <Text style={styles.doctorPhone}>{pharmacy.Mobile}</Text>
                        <Text style={styles.doctorType}>{pharmacy.Type}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  userListContainer: {
    flex: 0.00,
    borderRadius: 15,
    backgroundColor: 'rgba(19, 188, 158, 0.7)',
    padding: 10,
    marginBottom: 10,
  },
  transparentBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  doctorItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  doctorInfo: {
    marginTop: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  doctorPhone: {
    fontSize: 16,
    color: '#8e939b',
  },
  doctorType: {
    fontSize: 16,
    color: '#8e939b',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  mostRecentContainer: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  mostRecentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mostRecentImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  mostRecentInfo: {
    flex: 1,
  },
  sectionHeaderMargin: {
    marginBottom: 5,
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
  },
  searchBarWithText: {
    top: 0, 
  },
  smallerContainer: {
    flex: 0.0,
  },
  middleContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    marginBottom: 10,
  },
});

export default ContactHistoryPage;
