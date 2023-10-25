import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {getUserSession} from '../../SessionManager/SessionManager';
import {useFocusEffect} from '@react-navigation/native';
import SearchInputBox from '../../components/SearchInputBox';
import {equalTo, get, getDatabase, query, ref} from 'firebase/database';

const MedicineReq = ({navigation}) => {
  const [data, setData] = useState([]);
  const [lenght, setLenght] = useState('');

  const database = getDatabase();

  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      const medicineRequestsRef = ref(database, 'AccpectedMedicineRequests');

      get(medicineRequestsRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          const dataArray = Object.values(data);

          const filteredRequests = dataArray.filter(
            user => user.PatientUserID === userSession.uid,
          );

          setData(filteredRequests);
          setLenght(data.length);
        }
      });
    };
    checkUserSession();
  }, []);

  const [isMedicineRequestsSelected, setMedicineRequestsSelected] =
    useState(true);

  const handleMedicineRequestsPress = () => {
    setMedicineRequestsSelected(true);
  };

  const handleMedicineRequestHistoryPress = () => {
    setMedicineRequestsSelected(false);
  };

  const PressAdd = () => {
    navigation.navigate('AddMediRequest');
  };

  return (
    <View style={styles.container}>
      {/* <SearchInputBox /> */}

      <ScrollView horizontal contentContainerStyle={{padding: 10}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={([styles.button], {margin: 5})}
            onPress={handleMedicineRequestsPress}>
            <Text
              style={
                isMedicineRequestsSelected
                  ? styles.selectedButtonText
                  : styles.unselectedButtonText
              }>
              Accepted Medicine Requests
            </Text>

            {data &&
              data.map((item, index) => (
                <View style={styles.requests} key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 5,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#046352', fontSize: 25}}>
                      {item.Medicine_Name}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BuyMedicine', {
                          id: item.requestID,
                          pharmacyID: item.pharmacyID,
                        })
                      }>
                      <Text
                        style={{
                          color: 'white',
                          padding: 8,
                          width: 50,
                          borderRadius: 10,
                          backgroundColor: '#046352',
                        }}>
                        View
                      </Text>
                    </TouchableOpacity>
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
                      source={require('../../assets/images/icons/user.jpg')}
                      style={{height: 40, width: 40, borderRadius: 30}}
                    />

                    <Text style={{color: 'black'}}>{item.pharmacyName}</Text>
                  </View>
                </View>
              ))}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleMedicineRequestHistoryPress}>
            <Text
              style={
                isMedicineRequestsSelected
                  ? styles.unselectedButtonText
                  : styles.selectedButtonText
              }>
              Medicine Request History
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.plusButton} onPress={PressAdd}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
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
    position: 'absolute', // Position the button absolutely
    bottom: 20, // Adjust as needed
    right: 20, // Adjust as needed
    width: 60,
    height: 60,
    backgroundColor: '#046352', // Button background color
    borderRadius: 30, // Half of width and height to make it round
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: {
    fontSize: 24,
    color: 'white', // Button text color
  },

  requests: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    padding: 10,
    width: 250,
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

export default MedicineReq;
