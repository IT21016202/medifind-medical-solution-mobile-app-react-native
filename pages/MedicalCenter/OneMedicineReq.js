import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {get, getDatabase, set, ref, push} from 'firebase/database';
import Geolocation from '@react-native-community/geolocation';
import {getUserSession} from '../../SessionManager/SessionManager';
import {useFocusEffect} from '@react-navigation/native';

const OneMedicineReq = ({route, navigation}) => {
  const {id} = route.params;
  const [currentLocation, setCurrentLocation] = useState([]);
  const [price, setPrice] = useState('');
  const [data, setData] = useState('');

  const [pharmacyID, setPharmacyID] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacyNo, setPharmacyNo] = useState('');
  const [pharmacyImage, setPharmacyImage] = useState('');

  const database = getDatabase();

  useFocusEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      setPharmacyName(userSession.PharmacyName);
      setPharmacyID(userSession.uid);
      setPharmacyNo(userSession.Mobile);
      setPharmacyImage(userSession.Image);

      const latitude = userSession.Latitude;
      const longtude = userSession.Longitude;
      setCurrentLocation({latitude, longtude});
    };
    checkUserSession();
  });

  useEffect(() => {
    //Get one medical center by id
    const database = getDatabase();
    const medicineReq = ref(database, 'MedicineRequests/' + id);
    get(medicineReq)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(data);
          console.log('One', data);

          //getCurrentLocation();
        } else {
          console.log('Data Not Found !');
        }
      })
      .catch(err => {
        console.error('Error retrieving user data:', err);
      });
  }, []);

  // const getCurrentLocation = async () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setCurrentLocation({latitude, longitude});
  //     },
  //     error => Alert.alert('Error', error.message),
  //     {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  const handleSubmit = async () => {
    const databasePath = 'AccpectedMedicineRequests';

    // Generate a new unique key for the item using the push method
    const newKey = push(ref(database, databasePath));

    //await getCurrentLocation();

    if (price === '' || price === null || isNaN(price)) {
      Alert.alert('Please Enter a Valid Price for Medicine');
    } else {
      const reqData = {
        PatientUserName: data.userame,
        PatientUserID: data.userID,
        Medicine_Name: data.Medicine_Name,
        pharmacyID: pharmacyID,
        pharmacyName: pharmacyName,
        pharmacyNo: pharmacyNo,
        pharmacyImage: pharmacyImage,
        location: currentLocation,
        medicinePrice: price,
        requestID: newKey.key,
      };

      set(newKey, reqData)
        .then(() => {
          console.log('data added to Realtime Database');

          Alert.alert('Request Submited Successfuly');

          navigation.navigate('MedicalMediReq');
        })
        .catch(error => {
          console.error('Error adding  data to Realtime Database:', error);
        });
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#046352'}}>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 30,
          margin: 15,
          height: 750,
          borderRadius: 30,
          padding: 10,
        }}>
        {data && (
          <>
            <Text style={styles.text}>Precerption</Text>
            {data.image ? (
              <Image
                source={{uri: data.image}}
                style={{height: 300, width: 300, margin: 10}}
              />
            ) : (
              // Render a placeholder or alternative content when data.image doesn't exist
              <Text>No Image Available</Text>
            )}
            <View style={styles.row}>
              <Text style={styles.text}>Customer Name</Text>
              <Text style={[styles.text, {fontSize: 20}]}>{data.userame}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>Medicine Name</Text>
              <Text style={[styles.text, {fontSize: 20}]}>
                {data.Medicine_Name}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>Patient Age</Text>
              <Text style={[styles.text, {fontSize: 20}]}>
                {data.userAge} years old
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.text}>Location</Text>
              <Text style={[styles.text, {fontSize: 20}]}>
                {data.location?.latitude} {data.location?.longitude}
              </Text>
            </View>

            <Text style={styles.text}>Enter price for this medicine</Text>
            <TextInput
              style={styles.txtInput}
              value={price}
              onChangeText={text => setPrice(text)}></TextInput>

            <View style={styles.row}>
              <TouchableOpacity style={[{backgroundColor: 'red'}, styles.btn]}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 19}}>
                  Reject
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{backgroundColor: '#046352'}, styles.btn]}
                onPress={handleSubmit}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 19}}>
                  Accepct
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtInput: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: 'green',
    fontSize: 16,
    margin: 10,
  },
  txtInput: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    margin: 5,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 10,
    width: 350,

    borderColor: '#046352',
  },

  btn: {
    margin: 20,
    padding: 10,
    width: 120,
    height: 50,
    borderRadius: 10,
  },
});

export default OneMedicineReq;
