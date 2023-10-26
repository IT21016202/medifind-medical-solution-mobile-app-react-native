import React, { useState } from "react";
import { Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ImageBackground, Image, View, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { saveUserSession } from "../SessionManager/SessionManager";
import { launchImageLibrary } from 'react-native-image-picker';
import { storage, storageRef } from '../Firebase/FirebaseConfing';

const MedicalCenterRegisterPage = ({route, navigation}) =>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pharmacyName, setPharmacyName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [facilities, setFacilities] = useState("");
    const [certificate, setCertificate] = useState(""); 
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [image, setImage] = useState(""); 
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState('');

    function register(){
        const auth = getAuth();
        const database = getDatabase();

        //Validate null fields
        if(email === "" || name === "" || pharmacyName === "" || mobileNo === "" || address === "" || city === "" || facilities === "" || description === "" || password === "" || rePassword === ""){
            Alert.alert("Invalid Input", "Please fill all the fields !");
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
            Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile number.');
            return;
        }

        // Validate mobile number
        if (mobileNo.length !== 10){
            Alert.alert("Invalid Mobile Number", "Mobile number should be 10 digits long !");
            return;
        }

        // Validate passwords
        if (password.length <= 5){
            Alert.alert("Invalid Password", "Password should be at least 6 characters long !");
            return;
        }
        
        if (password !== rePassword) {
            Alert.alert('Passwords do not match !');
            return;
        } 

        // Create a new user to authentication
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const {latitude, longitude} = route.params;
            const userData = {
                ID: userCredential.user.uid,
                Name: name,
                Mobile: mobileNo,
                PharmacyName: pharmacyName, 
                Address: address,
                City: city,
                facilities: facilities,
                Description: description,
                Certificate: certificate,
                Image: imageUrl,
                Latitude: latitude,
                Longitude: longitude,
                Type: 'medical',
                CreatedAt: JSON.stringify(new Date()),
                UpdatedAt : JSON.stringify(new Date())
            };
            console.log(userData)
        
            //Add user to realtimr DB
            const userRef = ref(database, 'Users/' + userCredential.user.uid);
            set(userRef, userData)
                .then(() => {
                    console.log('User data added to Realtime Database');
                    // Save user session
                    saveUserSession({ uid: userCredential.user.uid, email: userCredential.user.email, ...userData });
                    alert("User Added");
                    navigation.navigate('Home')
                })
                    .catch((error) => {
                    console.error('Error adding user data to Realtime Database:', error);
                });
            
        })
        .catch((error) => {
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
                setImage(res.assets[0].uri);
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

    return(
        <ImageBackground
            source={require('../assets/images/back1.jpg')}
            style={styles.backgroundImage}
        >
        <ScrollView style={styles.view} scrollEnabled={true}>
            <Text style={styles.medifind}>MediFind</Text>
            <Text style={styles.registraion}>Medical Center Registration</Text>  

            <Text style={styles.text}>Your Location</Text>
            <TouchableOpacity style={styles.input} onPress={() => navigation.navigate('LocationPicker')}>
                <Text>Touch here to pick location</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} name="email" placeholder="example@email.com" value={email} onChangeText={text => setEmail(text)}></TextInput>

            <Text style={styles.text}>Owner's Name</Text>
            <TextInput style={styles.input} name="name" value={name} onChangeText={text => setName(text)}></TextInput>

            <Text style={styles.text}>Pharmacy Name</Text>
            <TextInput style={styles.input} name="pharmacyName" value={pharmacyName} onChangeText={text => setPharmacyName(text)}></TextInput>

            <Text style={styles.text}>Mobile No</Text>
            <TextInput style={styles.input} name="mobile" placeholder="07XXXXXXXX" value={mobileNo} onChangeText={text => setMobileNo(text)}></TextInput>

            <Text style={styles.text}>Address</Text>
            <TextInput style={styles.input} name="address" value={address} onChangeText={text => setAddress(text)}></TextInput>

            <Text style={styles.text}>City</Text>
            <TextInput style={styles.input} name="city" value={city} onChangeText={text => setCity(text)}></TextInput>

            <Text style={styles.text}>Facilities</Text>
            <TextInput style={styles.input} name="description" value={description} onChangeText={text => setDescription(text)}></TextInput>

            <Text style={styles.text}>Description</Text>
            <TextInput style={styles.input} name="facilities" value={facilities} onChangeText={text => setFacilities(text)}></TextInput>

            <Text style={styles.text}>Profile Image</Text>
            <TouchableOpacity style={styles.input} onPress={imagePicker}>
                {message ? <Text>{message}</Text> : <Text>Touch here to select</Text>}
            </TouchableOpacity>
            
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} name="password" value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>

            <Text style={styles.text}>Re-Enter Password</Text>
            <TextInput style={styles.input} name="re-password" value={rePassword} secureTextEntry={true} onChangeText={text => setRePassword(text)}></TextInput>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btntext} onPress={register}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registered}>Already Registered ? Log In </Text>
            </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    view:{ 

    },

    text:{
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

    input:{
        fontSize: 16,
        padding: '2%',
        borderBottomWidth: 1,
        borderBottomColor: '#13BC9E',
        marginLeft: '8%',
        marginRight: '8%',
        backgroundColor: 'white',
        opacity: 0.8,
    },

    btn:{
        backgroundColor: '#13BC9E',
        marginLeft: '8%',
        marginRight: '8%',
        marginTop: 25,
        borderRadius: 10,
    },

    btntext:{
        fontSize: 18,
        padding: '4%',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },

    medifind:{
        color: 'white', 
        fontSize: 25, 
        fontWeight: 'bold',
        backgroundColor: '#13BC9E',
        paddingLeft: '8%',
        paddingTop: '5%'
    },

    registraion:{
        color: 'white',
        fontSize: 20,
        backgroundColor: '#13BC9E',
        paddingLeft: '8%',
        paddingBottom: '5%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 10
    },

    registered:{
        fontSize: 16,
        marginTop: '10%',
        marginLeft: '8%',
        fontWeight: 'bold',
        color: 'black',
        marginBottom: '10%',
    },

    backgroundImage:{
        resizeMode: 'cover'
    }
})

export default MedicalCenterRegisterPage;