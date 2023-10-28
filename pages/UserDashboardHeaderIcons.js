import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database'; // Import Firebase Realtime Database methods

const UserDashboardHeaderIcons = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  // Function to fetch appointment data
  const fetchAppointmentData = () => {
    const db = getDatabase(); // Get the Firebase database instance
    const appointmentsRef = ref(db, 'Appointments'); // Reference to the 'Appointments' table

    get(appointmentsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setAppointmentData(data);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Function to handle notification button click
  const handleNotificationClick = () => {
    fetchAppointmentData();
    setShowPopup(true);
  };

  useEffect(() => {
    // Optionally, you can fetch appointment data when the component mounts
    // fetchAppointmentData();
  }, []);

  return (
    <View style={styles.headerIcons}>
      <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
        <Image source={require('../assets/images/menu-white.png')} style={styles.menuLogo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
        <Image source={require('../assets/images/profile.png')} style={styles.profileLogo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNotificationClick}>
        <Image source={require('../assets/images/notification-white.png')} style={styles.notificationLogo} />
      </TouchableOpacity>

      <Modal
  visible={showPopup}
  transparent={true}
  animationType="slide"
>
  <View style={styles.popupContainer}>
    <View style={styles.popupContent}>
      <Text style={styles.popupText}>
        {`You have an appointment with ${appointmentData?.doctor}, at ${appointmentData?.date} at ${appointmentData?.center}.`}
      </Text>
      <TouchableOpacity onPress={() => setShowPopup(false)} style={styles.closeBtn}>
        <Text style={styles.closeBtnText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  menuLogo: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  profileLogo: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  notificationLogo: {
    width: 22,
    height: 22,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%', // Adjust the width as needed
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserDashboardHeaderIcons;
