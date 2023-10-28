import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

const Appointments = () => {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });

  useEffect(() => {
    // You should fetch the appointments data from your data source here
    // For demonstration, we'll create a sample array of appointments
    const sampleAppointments = [
      {
        id: '1',
        doctorName: 'Dr. John Doe',
        date: '2023-10-29T10:30:00Z',
        medicalCenter: 'Medical Center A',
      },
      {
        id: '2',
        doctorName: 'Dr. Alice Smith',
        date: '2023-11-15T14:00:00Z',
        medicalCenter: 'Medical Center B',
      },
      {
        id: '3',
        doctorName: 'Dr. Bob Johnson',
        date: '2023-10-15T11:00:00Z',
        medicalCenter: 'Medical Center C',
      },
      {
        id: '4',
        doctorName: 'Dr. Sarah Brown',
        date: '2023-09-28T15:30:00Z',
        medicalCenter: 'Medical Center D',
      },
      {
        id: '5',
        doctorName: 'Dr. David Lee',
        date: '2023-08-20T09:45:00Z',
        medicalCenter: 'Medical Center E',
      },
      // Add more appointments as needed
    ];

    // Filter the appointments into upcoming and past based on the date
    const now = new Date();
    const upcomingAppointments = [];
    const pastAppointments = [];

    sampleAppointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);
      if (appointmentDate >= now) {
        upcomingAppointments.push(appointment);
      } else {
        pastAppointments.push(appointment);
      }
    });

    setAppointments({
      upcoming: upcomingAppointments,
      past: pastAppointments,
    });
  }, []);

  const renderAppointments = (appointmentList) => {
    return appointmentList.map((appointment, index) => (
      <View key={index} style={styles.appointmentContainer}>
        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
        <Text style={styles.appointmentInfo}>
          Date: {new Date(appointment.date).toLocaleDateString()}
        </Text>
        <Text style={styles.appointmentInfo}>
          Time: {new Date(appointment.date).toLocaleTimeString()}
        </Text>
        <Text style={styles.appointmentInfo}>
          Medical Center: {appointment.medicalCenter}
        </Text>
      </View>
    ));
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

        <ScrollView style={styles.upcomingAppointmentsContainer}>
          <Text style={styles.appointmentsHeader}>Upcoming Appointments</Text>
          {renderAppointments(appointments.upcoming)}
        </ScrollView>

        <ScrollView style={styles.pastAppointmentsContainer}>
          <Text style={styles.appointmentsHeader}>Past Appointments</Text>
          {renderAppointments(appointments.past)}
        </ScrollView>
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
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  upcomingAppointmentsContainer: {
    marginBottom: 20,
  },
  pastAppointmentsContainer: {
    marginBottom: 20,
  },
});

export default Appointments;
