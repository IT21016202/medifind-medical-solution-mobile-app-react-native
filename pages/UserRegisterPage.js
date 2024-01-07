import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Image,
} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {saveUserSession} from '../SessionManager/SessionManager';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage, storageRef} from '../Firebase/FirebaseConfing';
import {uploadBytesResumable, getDownloadURL} from 'firebase/storage';

const UserRegisterPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [address, setAddress] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [selectedDate, setSelectedDate] = useState({});

  const [image, setImages] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  function register() {
    const auth = getAuth();
    const database = getDatabase();

    //Validate null values
    if (
      email === '' ||
      name === '' ||
      mobileNo === '' ||
      address === '' ||
      birthYear === '' ||
      gender === '' ||
      weight === '' ||
      height === '' ||
      city === '' ||
      password === '' ||
      rePassword === ''
    ) {
      Alert.alert('Invalid Input', 'Please fill all the fields !');
      return;
    }

    // Regular expression for a basic email validation
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!email.match(emailPattern)) {
      // If the email doesn't match the pattern, show an alert or handle the error
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    //regular expression for a basic mobile number validation
    const mobilePattern = /^[0-9]{10}$/;

    if (!mobileNo.match(mobilePattern)) {
      // If the mobile number doesn't match the pattern, show an alert or handle the error
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid mobile number.',
      );
      return;
    }

    // Validate mobile number
    if (mobileNo.length !== 10) {
      Alert.alert(
        'Invalid Mobile Number',
        'Mobile number should be 10 digits long !',
      );
      return;
    }

    // Validate birth year
    if (birthYear.length !== 4) {
      Alert.alert('Invalid Birth Year', 'Birth year should be 4 digits long !');
      return;
    }

    // Validate weight
    if (weight.length > 3) {
      Alert.alert('Invalid Weight', 'Weight should be less than 1000kg !');
      return;
    }

    // Validate height
    if (height.length > 3) {
      Alert.alert('Invalid Height', 'Height should be less than 1000cm !');
      return;
    }

    // Validate passwords
    if (password.length <= 5) {
      Alert.alert(
        'Invalid Input',
        'Password should be more than 5 characters !',
      );
      return;
    }

    if (password !== rePassword) {
      Alert.alert('Invalid Input', 'Passwords are not matching !');
      return;
    }

    // Create a new user to authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userData = {
          ID: userCredential.user.uid,
          Name: name,
          Mobile: mobileNo,
          Address: address,
          BirthYear: birthYear,
          Gender: gender,
          Weight: weight,
          Height: height,
          City: city,
          Image: imageUrl, // Save the image
          Type: 'user',
          CreatedAt: JSON.stringify(new Date()),
          UpdatedAt: JSON.stringify(new Date()),
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
            Alert.alert(
              'Registration Successful',
              'You have successfully registered !',
            );
            navigation.navigate('UserDashboard');
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
    <ImageBackground
      source={require('../assets/images/back1.jpg')}
      style={styles.backgroundImage}>
      <ScrollView>
        <Text style={styles.medifind}>MediFind</Text>
        <Text style={styles.registraion}>User Registration</Text>

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          name="email"
          value={email}
          onChangeText={text => setEmail(text)}></TextInput>

        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          name="name"
          value={name}
          onChangeText={text => setName(text)}></TextInput>

        <Text style={styles.text}>Mobile No</Text>
        <TextInput
          style={styles.input}
          placeholder="07XXXXXXXX"
          name="mobile"
          value={mobileNo}
          onChangeText={text => setMobileNo(text)}></TextInput>

        <Text style={styles.text}>Birth Year</Text>
        <TextInput
          style={styles.input}
          name="age"
          value={birthYear}
          onChangeText={text => setBirthYear(text)}></TextInput>

        <Text style={styles.text}>Gender</Text>
        <Picker
          style={styles.input}
          selectedValue={gender}
          onValueChange={text => setGender(text)}>
          <Picker.Item label="Select Gender" value="" enabled={false} />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        <Text style={styles.text}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Weight in kg"
          name="weight"
          value={weight}
          onChangeText={text => setWeight(text)}></TextInput>

        <Text style={styles.text}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Height in cm"
          name="height"
          value={height}
          onChangeText={text => setHeight(text)}></TextInput>

        <Text style={styles.text}>Address</Text>
        <TextInput
          style={styles.input}
          name="address"
          value={address}
          onChangeText={text => setAddress(text)}></TextInput>

        <Text style={styles.text}>City</Text>
        <TextInput
          style={styles.input}
          name="city"
          value={city}
          onChangeText={text => setCity(text)}></TextInput>

        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          name="password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}></TextInput>

        <Text style={styles.text}>Re-Enter Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-Enter Password"
          name="re-password"
          secureTextEntry={true}
          value={rePassword}
          onChangeText={text => setRePassword(text)}></TextInput>

        <Text style={styles.headerTwo}>Profile Picture</Text>

        <TouchableOpacity onPress={imagePicker}>
          <Image
            source={require('../assets/images/icons/bloodIcon.png')}
            style={{height: 25, width: 25}}
          />
          {message ? <Text>{message}</Text> : <Text>Select From Gallery</Text>}
          {/* <Text>Select From Gallery</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={register}>
          <Text style={styles.btntext}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registered}>Already Registered ? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
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
    color: 'black',
    marginBottom: '10%',
  },

  backgroundImage: {
    resizeMode: 'cover',
    height: '100%',
  },

  text: {
    fontSize: 15,
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 25,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '2%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    opacity: 0.8,
  },

  input: {
    fontSize: 16,
    padding: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#13BC9E',
    marginLeft: '8%',
    marginRight: '8%',
    backgroundColor: 'white',
    opacity: 0.8,
  },

  btn: {
    backgroundColor: '#13BC9E',
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 25,
    borderRadius: 10,
  },

  btntext: {
    fontSize: 18,
    padding: '4%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserRegisterPage;
