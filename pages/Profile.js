import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getUserSession} from '../SessionManager/SessionManager';
import {getDatabase, ref, get, set} from 'firebase/database';

const Profile = () => {
  const database = getDatabase();
  const [userData, setUserData] = React.useState({});

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      // Create a reference to the specific document.
      const userRef = ref(database, 'Users/' + userSession.uid);

      // Retrieve data from the specific user's document
      get(userRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            // Data exists in the document
            const data = snapshot.val();
            setUserData(data);
            console.log(data);
          } else {
            console.log('User Data Not Found !');
          }
        })
        .catch(err => {
          console.error('Error retrieving user data:', err);
        });
    };
    checkUserSession();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userData.Name && <Text style={styles.text}>Name: {userData.Name}</Text>}
      {userData.Type && <Text style={styles.text}>Name: {userData.Type}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#13BC9E',
  },

  text: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
  },
});

export default Profile;
