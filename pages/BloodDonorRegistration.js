import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {saveUserSession} from '../SessionManager/SessionManager';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage, storageRef} from '../Firebase/FirebaseConfing';
import {uploadBytesResumable, getDownloadURL} from 'firebase/storage';

// import DatePicker from 'react-native-datepicker'; // Import the date picker component
//import DatePicker from '@react-native-datetimepicker/datetimepicker'; // Import the date picker component

import MyButton from '../components/MyButton';

const BloodDonorRegistration = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [bloodType, setBloodType] = useState('A+'); // Default value
  const [location, setLocation] = useState('');
  const [lastDonatedDate, setLastDonatedDate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [image, setImages] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  function register() {
    const auth = getAuth();
    const database = getDatabase();

    // Validate passwords
    if (password.length <= 5) {
      alert('Password should be at least 6 characters !');
      return;
    }

    if (password !== rePassword) {
      alert('Passwords do not match !');
      return;
    }

    // Create a new user to authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const {longitude, latitude} = route.params;
        const userData = {
          Name: name,
          Mobile: mobileNo,
          BloodType: bloodType, // Save the selected blood type
          Location: location, // Save the selected location
          LastDonatedDate: lastDonatedDate, // Save the last donated date
          Latitude: latitude,
          Longitude: longitude,
          Image: imageUrl, // Save the image
          Type: 'donor',
          CreatedAt: new Date(),
          UpdatedAt: new Date(),
        };

        //Add user to realtimr DB
        const userRef = ref(database, 'Users/' + userCredential.user.uid);
        set(userRef, userData)
          .then(() => {
            console.log('User data added to Realtime Database');
            saveUserSession({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              ...userData,
            });
            alert('User Added');
            navigation.navigate('Login');
          })
          .catch(error => {
            console.error(
              'Error adding user data to Realtime Database:',
              error,
            );
          });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration error:', errorCode, errorMessage);
      });
  }

  const imagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    })
      .then(res => {
        if (!res.didCancel) {
          setImages(res.assets[0].uri);
          handleUpload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpload = async () => {
    try {
      const response = await fetch(image);

      if (!response.ok) {
        setMessage('Something went wrong');
        throw new Error('Network request failed');
      } else {
        const blob = await response.blob();

        const segments = image.split('/');

        const fileName = segments[segments.length - 1];

        const reference = storageRef(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(reference, blob);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.error('Error during upload:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setImageUrl(downloadURL);
              setMessage('Upload completed');
            });
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.medifind}>MediFind</Text>
      <Text style={styles.registraion}>Donor Registration</Text>

      <Text style={styles.text}>Your Location</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate('DonorLocationPicker')}>
        <Text>Touch here to pick location</Text>
      </TouchableOpacity>

      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Email"
        placeholderTextColor="gray"
        name="email"
        value={email}
        onChangeText={text => setEmail(text)}></TextInput>
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Your Name"
        placeholderTextColor="gray"
        name="name"
        value={name}
        onChangeText={text => setName(text)}></TextInput>
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Mobile No"
        placeholderTextColor="gray"
        name="mobile"
        value={mobileNo}
        onChangeText={text => setMobileNo(text)}></TextInput>
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Password"
        placeholderTextColor="gray"
        name="password"
        value={password}
        onChangeText={text => setPassword(text)}></TextInput>
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Re-Enter Password"
        placeholderTextColor="gray"
        name="re-password"
        value={rePassword}
        onChangeText={text => setRePassword(text)}></TextInput>

      {/* <Picker
        style={{paddingLeft: '8%', color: 'gray'}}
        selectedValue={bloodType}
        onValueChange={(itemValue, itemIndex) => setBloodType(itemValue)}>
        {bloodTypes.map((type, index) => (
          <Picker.Item key={index} label={type} value={type} />
        ))}
      </Picker> */}

      <View style={{paddingLeft: '8%'}}>
        <Text style={{color: 'gray', marginBottom: 5}}>Blood Type</Text>
        <Picker
          style={{color: 'gray'}}
          selectedValue={bloodType}
          onValueChange={(itemValue, itemIndex) => setBloodType(itemValue)}>
          {bloodTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Location"
        placeholderTextColor="gray"
        name="location"
        value={location}
        onChangeText={text => setLocation(text)}></TextInput>

      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Last Donated Date"
        placeholderTextColor="gray"
        name="lastDonatedDate"
        value={lastDonatedDate}
        onChangeText={text => setLastDonatedDate(text)}></TextInput>

      {/* <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Latitude"
        placeholderTextColor="gray"
        name="latitude"
        value={latitude.toString()} // Convert the number back to a string for input
        onChangeText={text => setLatitude(parseFloat(text))} // Parse the input as a float
      />

      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholder="Enter Longitude"
        placeholderTextColor="gray"
        name="longitude"
        value={longitude.toString()} // Convert the number back to a string for input
        onChangeText={text => setLongitude(parseFloat(text))} // Parse the input as a float
      /> */}

      <Text style={styles.headerTwo}>Profile Picture</Text>

      <TouchableOpacity onPress={imagePicker}>
        <Image
          source={require('../assets/images/icons/bloodIcon.png')}
          style={{height: 25, width: 25}}
        />
        {message ? <Text>{message}</Text> : <Text>Select From Gallery</Text>}
        {/* <Text>Select From Gallery</Text> */}
      </TouchableOpacity>

      <MyButton title="Register" onPress={register}></MyButton>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registered}>Already Registered ? Log in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  medifind: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    backgroundColor: '#13BC9E',
    paddingLeft: '8%',
    paddingTop: '5%',
  },

  registraion: {
    color: 'white',
    fontSize: 20,
    backgroundColor: '#13BC9E',
    paddingLeft: '8%',
    paddingBottom: '5%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },

  registered: {
    fontSize: 16,
    marginTop: '10%',
    marginLeft: '8%',
    fontWeight: 'bold',
    color: '#13BC9E',
  },
});

export default BloodDonorRegistration;
