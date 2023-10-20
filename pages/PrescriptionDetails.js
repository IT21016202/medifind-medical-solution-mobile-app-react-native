import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'; // Import ImageBackground
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

const PrescriptionDetails = () => {
  const route = useRoute();
  const { date, doctorName, doctorType, doctorMobile, username } = route.params;

  // Define a static prescription list for demonstration
  const prescriptionList = [
    {
      reason: 'Chest pain',
      drugs: [
        { name: 'Cetrizine 5mg', dosage: '1/2 - 7' },
        { name: 'Omex Nasal Spray Vitamin C 10mg', dosage: '1/1-14' },
        { name: 'Panadoxine', dosage: '1/3-7' },
      ],
      doctor: 'Dr. Thilak Marapana',
      speciality: 'Cardiologist',
      advices: "Don't continue to use Panadoxin if you have any allergic reactions",
    },
    // Add more prescriptions as needed
  ];

  return (
    <ImageBackground source={require('../assets/images/profilebackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Prescription</Text>
        </View>
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
        {prescriptionList.map((prescription, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Title>Patient - {username}</Title>
              <Text>Prescription Date: {date}</Text>
              <Paragraph>Reason: {prescription.reason}</Paragraph>
              <Paragraph>Prescribed List:</Paragraph>
              <Divider style={styles.divider} />
              {prescription.drugs.map((drug, drugIndex) => (
                <View key={drugIndex} style={styles.drugRow}>
                  <Text style={styles.drugName}>{`${drugIndex + 1}. ${drug.name}`}</Text>
                  <Text style={styles.dosage}>{drug.dosage}</Text>
                </View>
              ))}
              <Divider style={styles.divider} />
              <Paragraph>Special Advices: {prescription.advices}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <Button onPress={() => {}}>Make PDF</Button>
              <Button onPress={() => {}}>Send To Pharmacy</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top of the screen
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    width: '80%',
    elevation: 4,
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doctorContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 10,
    width: '70%', // Set the width to 70% of the screen width
    marginBottom: 10,
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
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  drugRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  drugName: {
    flex: 1,
  },
  dosage: {
    flexBasis: '30%',
    textAlign: 'right',
  },
});

export default PrescriptionDetails;