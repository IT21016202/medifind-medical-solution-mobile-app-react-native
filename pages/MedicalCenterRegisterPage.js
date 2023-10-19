import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { saveUserSession } from "../SessionManager/SessionManager";

import MyButton from "../components/MyButton";
import TextInputBox from "../components/TextInputBox";

const MedicalCenterRegisterPage = ({navigation}) =>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pharmacyName, setPharmacyName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [facilities, setFacilities] = useState("");
    const [certificate, setCertificate] = useState(""); // Image URL
    const [image, setImage] = useState(""); // Image URL
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    function register(){
        const auth = getAuth();
        const database = getDatabase();

        //Validate fields
        if(name === "" || pharmacyName === "" || mobileNo === "" || address === "" || city === "" || facilities === "" || description === "" || password === "" || rePassword === ""){
            alert('Please fill all the fields !');
            return;
        }

        // Validate passwords
        if (password.length <= 5){
            alert("Password should be at least 6 characters !");
            return;
        }
        
        if (password !== rePassword) {
            alert('Passwords do not match !');
            return;
        } 

        // Create a new user to authentication
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
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
                Image: image,
                Type: 'medical',
                CreatedAt: new Date(),
                UpdatedAt : new Date()
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

    return(
        <ScrollView style={styles.view} scrollEnabled={true}>
            <Text style={styles.medifind}>MediFind</Text>
            <Text style={styles.registraion}>Medical Center Registration</Text>  

            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Email" name="email" value={email} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Your Name" name="name" value={name} onChangeText={text => setName(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Pharmacy Name" name="pharmacyName" value={pharmacyName} onChangeText={text => setPharmacyName(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Mobile No" name="mobile" value={mobileNo} onChangeText={text => setMobileNo(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Address" name="address" value={address} onChangeText={text => setAddress(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter City" name="city" value={city} onChangeText={text => setCity(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Description" name="description" value={description} onChangeText={text => setDescription(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Facilities" name="facilities" value={facilities} onChangeText={text => setFacilities(text)}></TextInput>
            <Text style={{paddingLeft: '8%'}}>Certificate</Text>

            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Password" name="password" value={password} onChangeText={text => setPassword(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Re-Enter Password" name="re-password" value={rePassword} onChangeText={text => setRePassword(text)}></TextInput>

            <MyButton title="Register" onPress={register}></MyButton>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registered}>Already Registered ? Log In </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    view:{ 
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
        color: '#13BC9E'
    },

    map: {
        height: 400,
        width: 400,
    },
})

export default MedicalCenterRegisterPage;