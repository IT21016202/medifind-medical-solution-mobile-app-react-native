import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getUserSession} from '../../SessionManager/SessionManager';
import {equalTo, get, getDatabase, query, ref} from 'firebase/database';

const MedicineReqHistory = () => {
  const [data, setData] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      const medicineRequestsRef = ref(database, 'MedicineRequests');

      get(medicineRequestsRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const dataArray = Object.values(data);

          const filteredRequests = dataArray.filter(
            user => user.userID === userSession.uid,
          );

          setData(filteredRequests);
        }
      });
    };
    checkUserSession();
  }, []);

  console.log(data);

  return (
    <ScrollView>
      <View>
        {data &&
          data.map((item, index) => (
            <View style={styles.requests} key={index}>
              <View
                style={{
                  padding: 5,
                }}>
                <Text style={{color: '#046352', fontSize: 25}}>
                  {item.Medicine_Name}
                </Text>

                <Text style={{color: '#046352', fontSize: 20}}>
                  {item.userAge} years old
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center',
                  padding: 5,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{height: 40, width: 40, borderRadius: 30}}
                />

                <Text style={{color: 'black'}}>{item.mobileNumber}</Text>
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: 280,
    margin: 5,
    padding: 5,
  },
  button: {
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom value to position the button as desired
    right: 20, // Adjust the right value to position the button as desired
    backgroundColor: '#046352',
    width: 50,
    height: 50,
    borderRadius: 25, // To make it circular
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    elevation: 5, // A
  },
  plusButtonText: {
    fontSize: 24,
    color: 'white',
    // Button text color
  },

  requests: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    marginLeft: 20,
    width: 350,
    borderRadius: 15,
  },

  selectedButtonText: {
    fontSize: 18,
    color: '#046352',
  },
  unselectedButtonText: {
    fontSize: 18,
    color: 'gray', // Change the font color for unselected buttons
  },
});

export default MedicineReqHistory;
