import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref, set, push, query, orderByChild, equalTo, get } from 'firebase/database'; // Import Firebase Realtime Database functions

const NewAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedMedicalCenter, setSelectedMedicalCenter] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [appointmentReason, setAppointmentReason] = useState('');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  useEffect(() => {
    // Fetch the list of doctors
    const doctorsRef = ref(getDatabase(), '/Users');
    const doctorsQuery = query(doctorsRef, orderByChild('Type'), equalTo('doctor'));
    
    get(doctorsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const doctorsData = snapshot.val();
        const doctorsList = Object.keys(doctorsData).map((doctorId) => ({
          id: doctorId,
          name: doctorsData[doctorId].Name,
        }));
        setDoctors(doctorsList);
      }
    });
    
    // Fetch the list of medical centers
    const centersRef = ref(getDatabase(), '/Users');
    const centersQuery = query(centersRef, orderByChild('Type'), equalTo('medical'));
    
    get(centersQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const centersData = snapshot.val();
        const centersList = Object.keys(centersData).map((centerId) => ({
          id: centerId,
          name: centersData[centerId].PharmacyName,
        }));
        setMedicalCenters(centersList);
      }
    });
  }, []);

  const handleDateChange = (event, selectedDate) => {
    if (event.Type === 'set') {
      setSelectedDate(selectedDate);
    }
    hideDatePicker();
  };

  const handleTimeChange = (event, selectedDate) => {
    if (event.Type === 'set') {
      setSelectedDate(selectedDate);
    }
    hideTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleSaveAppointment = () => {
    const db = getDatabase();
    const appointmentsRef = ref(db, 'Appointments'); // Change 'Appointments' to your desired table name
    const newAppointmentRef = push(appointmentsRef);
    const appointment = {
      id: newAppointmentRef.key,
      reason: appointmentReason,
      center: selectedMedicalCenter,
      doctor: selectedDoctor,
      date: selectedDate.toISOString(),
    };

    // Push the appointment to the database, creating a new child node with auto-generated ID
    set(newAppointmentRef, appointment)
      .then((res) => {
        console.log('New Appointment Created', res);
        // Show the success modal
        setSuccessModalVisible(true);
      })
      .catch((error) => {
        console.error('Error saving appointment:', error);
      });
  };

  const closeSuccessModal = () => {
    // Close the success modal
    setSuccessModalVisible(false);
  };

  const formattedDate = selectedDate.toLocaleDateString();
  const formattedTime = selectedDate.toLocaleTimeString();

  return (
    <ImageBackground
      source={require('../assets/images/profilebackground.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.header}>New Appointment</Text>

        <View style={styles.formItem}>
          <Text style={styles.label}>Select a Date:</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
            <Text style={styles.datePickerButtonText}>
              {formattedDate}
            </Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Select a Time:</Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={showTimePicker}>
            <Text style={styles.datePickerButtonText}>
              {formattedTime}
            </Text>
          </TouchableOpacity>
          {isTimePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Select a Doctor:</Text>
          <Picker
            selectedValue={selectedDoctor}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedDoctor(itemValue)}
          >
            <Picker.Item label="Select a Doctor" value="" />
            {doctors.map((doctor) => (
              <Picker.Item key={doctor.id} label={doctor.name} value={doctor.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Select a Medical Center:</Text>
          <Picker
            selectedValue={selectedMedicalCenter}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSelectedMedicalCenter(itemValue)}
          >
            <Picker.Item label="Select a Medical Center" value="" />
            {medicalCenters.map((center) => (
              <Picker.Item key={center.id} label={center.name} value={center.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Reason for the Appointment:</Text>
          <TextInput
            style={styles.input}
            value={appointmentReason}
            onChangeText={(text) => setAppointmentReason(text)}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAppointment}>
          <Text style={styles.saveButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal isVisible={isSuccessModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Successfully Booked the Appointment</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeSuccessModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#13BC9E',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 10,
  },
  formItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  datePickerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#13BC9E',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default NewAppointment;
