import React, {useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getDatabase, ref, set, push} from 'firebase/database';
import MapView, {Marker} from 'react-native-maps';

const AddLocation = ({route, navigation}) => {
  const {medicineName, imageUrl, patientAge, userID, userName} = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message: 'Cool Photo App needs access to your location ' + '',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => Alert.alert('Error', error.message),
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  const database = getDatabase();

  const handleSubmit = async () => {
    const databasePath = 'MedicineRequests';

    // Generate a new unique key for the item using the push method
    const newKey = push(ref(database, databasePath));

    console.log(newKey.key);

    var currentDate = new Date();

    console.log(currentDate);

    const reqData = {
      userame: userName,
      userID: userID,
      Medicine_Name: medicineName,
      userAge: patientAge,
      location: currentLocation,
      image: imageUrl,
      mobileNumber: mobileNumber,
      requestID: newKey.key,
      CreatedAt: currentDate,
    };

    set(newKey, reqData)
      .then(() => {
        console.log('data added to Realtime Database');

        Alert.alert('Request Submited Successfuly');

        navigation.navigate('MediRequest');
      })
      .catch(error => {
        console.error('Error adding  data to Realtime Database:', error);
      });
  };

  console.log(medicineName, imageUrl, patientAge, userID, userName);
  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.topHeader}>Get current location</Text>
      </View>

      <View style={styles.mapContainer}>
        {currentLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude, // Set an initial location
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your are in here "
              />
            }
          </MapView>
        )}

        {!currentLocation && (
          <View style={styles.mapStyle}>
            <TouchableOpacity onPress={permission} style={styles.mapBtn}>
              <Image
                source={require('../../assets/images/icons/location.png')}
                style={{height: 55, width: 55}}
              />
              <Text style={styles.mapText}>Click here Get Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.inputView}>
        <Text style={{fontSize: 20, color: '#046352', marginTop: 20}}>
          Enter Mobile Number{' '}
        </Text>
        <TextInput
          style={styles.txtInput}
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}></TextInput>

        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
          <Text style={{color: 'white', fontSize: 18, textAlign: 'center'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: '#046352',
    height: 50,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },

  inputView: {
    alignItems: 'center',
  },

  submit: {
    backgroundColor: '#046352',
    padding: 15,
    width: 200,
    borderRadius: 10,
    margin: 20,
    marginTop: 80,
  },
  mapView: {
    width: 300,
    height: 300,
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

  topHeader: {
    color: 'white',
    fontSize: 18,
  },
  mapStyle: {
    marginTop: 30,
    margin: 20,
    alignItems: 'center',
  },
  mapText: {
    color: '#046352',
    fontSize: 16,
  },
  mapBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    height: 300, // Adjust the height as needed
    width: '95%',
    margin: 10, // Takes the full width of the parent container
  },
  map: {
    flex: 1, // Take up all available space within the mapContainer
  },
});

export default AddLocation;
