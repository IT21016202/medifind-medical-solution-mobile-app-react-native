import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';


const PrescriptionDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date, doctorName, doctorType, doctorMobile, username } = route.params;

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
  ];

  return (
    <ImageBackground source={require('../assets/images/profilebackground.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
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
          <View style={styles.infoContainer}>
            <View style={styles.transparentContainer}>
              <Title style={styles.subtitle} >Patient - {username}</Title>
            </View>
            <View style={styles.transparentContainer}>
              <Text style={styles.subtitle} >Prescription Date: {date}</Text>
            </View>
            <View style={styles.transparentContainer}>
              <Text style={styles.subtitle} >Reason: {prescriptionList[0].reason}</Text>
            </View>
          </View>
          {prescriptionList.map((prescription, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
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
            </Card>
          ))}
        </View>
        <View style={styles.buttonContainer}>
                <Button onPress={() => {}} style={styles.button} >Make PDF</Button>
                <Button
          onPress={() => {
            // Navigate to the PharmacyScreen when the button is pressed
            navigation.navigate('PharmacyScreen');
          }}
          style={styles.button}
        >
          Send To Pharmacy
        </Button>
              </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
    width: '90%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:10,
    borderRadius: 10,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add horizontal margin for buttons
    elevation: 10,
    padding: 5,
    marginBottom:5,
  },
  infoContainer: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  transparentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  card: {
    elevation: 4,
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  doctorContainer: {
    flexDirection: 'row',
    padding: 10,
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
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  drugName: {
    flex: 1,
    fontWeight: 'bold',
  },
  dosage: {
    flexBasis: '30%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default PrescriptionDetails;
