import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';


const getRandomAppointmentDates = (count) => {
    
    // Function to generate random appointment dates (mock data)
    const appointmentDates = [];
    for (let i = 0; i < count; i++) {
      const year = Math.floor(Math.random() * 2) + 2022; // Random year (2022 or 2023)
      const month = Math.floor(Math.random() * 12) + 1; // Random month (1-12)
      const day = Math.floor(Math.random() * 30) + 1; // Random day (1-30)
      const hour = Math.floor(Math.random() * 24); // Random hour (0-23)
      const minute = Math.floor(Math.random() * 60); // Random minute (0-59)
      const date = new Date(year, month - 1, day, hour, minute);
      appointmentDates.push(date.toLocaleString());
    }
    return appointmentDates;
  };
  
  const DoctorDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { doctorName, doctorType, doctorMobile, username } = route.params; // Receive user details from route params
  
    const [lastAppointment, setLastAppointment] = useState('2023.10.10 | 5.30 P.M.');
    const [recentAppointments, setRecentAppointments] = useState(getRandomAppointmentDates(6)); // 6 random dates for demonstration
  
    const handleAppointmentClick = (date) => {
        // Navigate to PrescriptionDetails with the selected date
        navigation.navigate('PrescriptionDetails', { date, doctorName, doctorType, doctorMobile, username });
      };

    const updateLastAppointment = () => {
        // Sort the appointment dates to find the closest one
        const sortedDates = [...recentAppointments].sort((a, b) => new Date(a) - new Date(b));
      
        // Set the closest date as the last appointment
        setLastAppointment(sortedDates[0]);
      
        // Sort the remaining dates from closest to oldest
        const sortedRemainingDates = sortedDates.slice(1).sort((a, b) => new Date(a) - new Date(b));
      
        // Set the order for all appointments
        const updatedAppointments = [sortedDates[0], ...sortedRemainingDates];
      
        // Update the state with the ordered dates
        setRecentAppointments(updatedAppointments);
      };

      useEffect(() => {
        updateLastAppointment();
      }, []);
      
  
    const renderAppointmentDates = (dates) => {
        // Sort the dates in ascending order (closest to the last appointment first)
        const sortedDates = dates.sort((a, b) => new Date(a) - new Date(b));
        // Take the first 6 sorted dates, including the last appointment
        const limitedDates = sortedDates.slice(0, 6);
      
        return limitedDates.map((date, index) => (
          <TouchableOpacity key={index} style={styles.appointmentDateContainer} onPress={() => handleAppointmentClick(date)}>
            <Text style={styles.appointmentDateText}>{date}</Text>
          </TouchableOpacity>
        ));
      };

      
  
    return (
      <ImageBackground
        source={require('../assets/images/profilebackground.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.centeringContainer}>
          <Text style={styles.header}>Doctor's History</Text>
          <View style={styles.doctorContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.title}>{doctorName}</Text>
              <Text style={styles.subtitle}>{doctorType}</Text>
              <Text style={styles.subtitle}>★ 4.7</Text>
              <Text style={styles.subtitle}>{doctorMobile}</Text>
            </View>
          </View>
  
          <Text style={styles.header}>Last Appointment</Text>
          <TouchableOpacity onPress={() => handleAppointmentClick(lastAppointment)} style={styles.lastAppointmentContainer}>
            <Text style={styles.date}>{lastAppointment}</Text>
          </TouchableOpacity>
  
          <Text style={styles.header}>All Appointments</Text>
          <ScrollView style={styles.appointmentsContainer}>
            {renderAppointmentDates(recentAppointments)}
          </ScrollView>
  
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() => {
              navigation.navigate('ChatScreen', {
                doctorName, // Pass the doctorName to ChatScreen
                doctorType,
                doctorMobile,
                username,
              });
            }}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appointmentButton} onPress={() => console.log('Make Appointment')}>
            <Text style={styles.buttonText}>Make Appointment</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    centeringContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    date: {
      fontSize: 16,
      marginTop: 5,
    },
    doctorContainer: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: 10,
      borderRadius: 10,
      width: '70%', // Set the width to 70% of the screen width
      marginBottom: 10,
      marginTop: 10,
    },
    lastAppointmentContainer: {
      backgroundColor: 'rgba(255, 255, 255, 1.0)',
      padding: 10,
      borderRadius: 10,
      width: '70%', // Set the width to 70%
      marginBottom: 10,
      marginTop: 10,
      alignItems: 'center', // Center the content horizontally
      justifyContent: 'center',
      elevation: 2,
    },
    doctorImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    doctorDetails: {
      marginLeft: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      marginBottom: 5,
    },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Set to 60% of the screen width
    marginVertical: 10,
    elevation: 5,
  },
  chatButton: {
    backgroundColor: '#13BC9E',
    padding: 10,
    width: '30%', // Set to 30% of the screen width
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 5,
  },
  appointmentButton: {
    backgroundColor: '#13BC9E',
    padding: 10,
    width: '60%', // Set to 60% of the screen width
    borderRadius: 5,
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
    appointmentsContainer: {
      marginTop: 10,
      borderRadius: 10,
      width: '70%', // Set the width to 70%
    },
    appointmentDateContainer: {
      backgroundColor: 'rgba(255, 255, 255, 1.0)',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      alignItems: 'center', // Center the content horizontally
      justifyContent: 'center',
      elevation: 2,
    },
    appointmentDateText: {
      fontSize: 16,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
  
  export default DoctorDetails;