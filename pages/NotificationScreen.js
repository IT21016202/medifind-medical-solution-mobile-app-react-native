import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';

const YourCurrentScreen = ({ navigation }) => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Initialize Firebase and create a reference to the database
    const db = getDatabase();
    const appointmentsRef = ref(db, 'Appointments');

    // Fetch the newest appointment entry from the Appointments table
    get(appointmentsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const appointment = snapshot.val();
          setAppointmentData(appointment);
          // Automatically show the notification popup when data is fetched
          setShowNotification(true);
        } else {
          console.log('No appointments found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching appointment data:', error);
      });
  }, []);

  const clearNotification = () => {
    setShowNotification(false);
  };

  return (
    <View style={styles.container}>
      <Text>Your current screen content goes here.</Text>
      <TouchableOpacity onPress={() => setShowNotification(true)} style={styles.notificationButton}>
        <Text>Show Notification</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={showNotification}>
        <View style={styles.popupContainer}>
          <View style={styles.notification}>
            <Text style={styles.notificationText}>
              You have an appointment with {appointmentData?.doctor}, at {appointmentData?.date} at {appointmentData?.center}.
            </Text>
            <Button title="Clear" onPress={clearNotification} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notification: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default YourCurrentScreen;
