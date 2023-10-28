import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, query, orderByChild, get } from 'firebase/database';

const Appointments = () => {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const navigation = useNavigation();

  useEffect(() => {
    // Initialize your Firebase Realtime Database and reference to 'Appointments' table
    const db = getDatabase();
    const appointmentsRef = ref(db, '/Appointments');

    // Create a query to order appointments by date
    const appointmentsQuery = query(appointmentsRef, orderByChild('date'));

    // Fetch the appointments data
    get(appointmentsQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const appointmentsData = snapshot.val();
          const now = new Date();
          const upcomingAppointments = [];
          const pastAppointments = [];

          // Convert the fetched data into an array of appointments
          const appointmentArray = Object.keys(appointmentsData).map((appointmentId) => ({
            id: appointmentId,
            ...appointmentsData[appointmentId],
          }));

          appointmentArray.forEach((appointment) => {
            const appointmentDate = new Date(appointment.date);
            if (appointmentDate > now) {
              upcomingAppointments.push(appointment);
            } else {
              pastAppointments.push(appointment);
            }
          });

          // Add some hardcoded appointments to the upcoming appointments
          const hardcodedAppointments = [
            {
              id: '1',
              doctor: 'Dr. Smith',
              date: '2023-11-15T10:00:00',
              center: 'Medical Center A',
            },
            {
              id: '2',
              doctor: 'Dr. Johnson',
              date: '2023-11-20T14:30:00',
              center: 'Medical Center B',
            },
          ];

          // Merge the fetched and hardcoded upcoming appointments
          setAppointments({
            upcoming: [...upcomingAppointments, ...hardcodedAppointments],
            past: pastAppointments,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, []);

  const handleAppointmentClick = () => {
    // Navigate to NewAppointment page when an appointment is clicked
    navigation.navigate('NewAppointment');
  };

  const renderAppointments = (appointmentList) => {
    return appointmentList.map((appointment, index) => (
      <TouchableOpacity key={index} style={styles.appointmentContainer} onPress={handleAppointmentClick}>
        <Text style={styles.doctorName}>{appointment.doctor}</Text>
        <Text style={styles.appointmentInfo}>
          Date: {new Date(appointment.date).toLocaleDateString()}
        </Text>
        <Text style={styles.appointmentInfo}>
          Time: {new Date(appointment.date).toLocaleTimeString()}
        </Text>
        <Text style={styles.appointmentInfo}>
          Medical Center: {appointment.center}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleNewAppointmentClick = () => {
    // Navigate to NewAppointment page when the "+" button is clicked
    navigation.navigate('NewAppointment');
  };

  return (
    <ImageBackground
      source={require('../assets/images/profilebackground.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Appointments</Text>
        </View>

        <View style={styles.appointmentsContainer}>
          <ScrollView style={styles.upcomingAppointments}>
            <Text style={styles.appointmentsHeader}>Upcoming Appointments</Text>
            {renderAppointments(appointments.upcoming)}
          </ScrollView>

          <ScrollView style={styles.pastAppointments}>
            <Text style={styles.appointmentsHeader}>Past Appointments</Text>
            {renderAppointments(appointments.past)}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleNewAppointmentClick}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  appointmentsContainer: {
    flex: 1,
  },
  upcomingAppointments: {
    flex: 1,
  },
  pastAppointments: {
    flex: 1,
  },
  appointmentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  appointmentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  appointmentInfo: {
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#13BC9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});

export default Appointments;
