import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';

const MedicalCenterDashboard = ({route, navigation}) => {
  const mediReq = () => {
    navigation.navigate('MedicalMediReq');
  };

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>What Do You Need ?</Text>

      <TouchableOpacity  onPress={mediReq}>
        <Image
        style={styles.image}
          source={require('../assets/images/MedicineRequest1.png')}
        />

      </TouchableOpacity>

      <TouchableOpacity >
        <Image style={styles.image} source={require('../assets/images/Orders1.png')} />
      </TouchableOpacity>

      <TouchableOpacity >
        <Image style={styles.image} source={require('../assets/images/Appoinments1.png')} />
      </TouchableOpacity>

      <TouchableOpacity  onPress={() => navigation.navigate('Scheduele')}>
        <Image style={styles.image} source={require('../assets/images/Schedueles1.png')} />
      </TouchableOpacity>

      {/* <Button
        title="Profile"
        onPress={() => navigation.navigate('MedicalCenterProfile')}></Button> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
    backgroundColor: 'white',
  },

  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
    marginBottom: 20,
  },

  image: {
    marginLeft: 15,
    width: 330,
    height: 140,
    marginBottom: 25,
  },

  text: {
    padding: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  button: {
    borderWidth: 1,
    borderColor: '#13BC9E',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
});

export default MedicalCenterDashboard;
