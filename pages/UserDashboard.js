import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {
  getUserSession,
  clearUserSession,
} from '../SessionManager/SessionManager';

const UserDashboard = ({navigation}) => {
  const [user, setUser] = useState(null);

  useFocusEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();
      setUser(userSession);
    };
    checkUserSession();
  });

  function logout() {
    clearUserSession();
    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>What Do You Need ?</Text>

      <TouchableOpacity style={styles.button}>
        <Image
          style={styles.image}
          source={require('../assets/images/icons/icon(7).png')}
        />
        <Text style={styles.text}>Find a Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image
          style={styles.image}
          source={require('../assets/images/icons/icon(5).png')}
        />
        <Text style={styles.text}>Appoinments</Text>
      </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NearByMedicalCenters')}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(4).png')}/>
                    <Text style={styles.text}>Medical Centers</Text>
            </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image
          style={styles.image}
          source={require('../assets/images/icons/icon(6).png')}
        />
        <Text style={styles.text}>Find Medicine</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BloodDonationDashboard')}>
        <Image
          style={styles.image}
          source={require('../assets/images/icons/icon(3).png')}
        />
        <Text style={styles.text}>Blood Donation</Text>
      </TouchableOpacity>

            <Button title='Log Out' onPress={logout}></Button>
            <Text></Text>
            <Text></Text>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  view: {
    padding: 20,
  },

  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
    marginBottom: 20,
  },

  image: {
    marginLeft: 15,
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

export default UserDashboard;
