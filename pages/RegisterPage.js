import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import ToolBar from "../components/ToolBar";
import TextInputBoxRegister from "../components/TextInputBox";
import MyButton from "../components/MyButton";

const RegisterPage = () =>{

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pharmacyName, setPharmacyName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    // const [certificate, setCertificate] = useState("");
    // const [location, setLocation] = useState("");
    
    useEffect(() => {
        var firebaseConfig = {
            apiKey: "AIzaSyA7U0nYAIxzqsnf4zsjcICspP5VLOuR_t8",
            authDomain: "medifind-ad39c.firebaseapp.com",
            databaseURL: "https://medifind-ad39c.firebaseio.com",
            projectId: "medifind-ad39c",
            storageBucket: "medifind-ad39c.appspot.com",
            messagingSenderId: "261385207351",
            appId: "1:261385207351:android:15bb11ff9fcd7c09d849b2",
        };
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        //console.log(db);
    }, []);

    function register(){
        const auth = getAuth();

        const Email = email;
        const Name = name;
        const PharmacyName = pharmacyName;
        const Mobile = mobileNo;
        const Password = password;
        const RePassword = rePassword;

        // Validate passwords
        if (Password !== RePassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Create a new user
        createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            // User registration successful
            const user = userCredential.user;
            // You can perform any additional actions here, such as updating user profiles or navigating to another screen
            console.log('User registered:', user);
        })
        .catch((error) => {
            // Handle registration errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
            // You can display an error message to the user or handle the error as needed
        });
       
    }

    return(
        <View style={styles.view}>
            {/* <ToolBar title="Register Page"/> */}
            <Text style={styles.medifind}>MediFind</Text>
            <Text style={styles.registraion}>Medical Center Registration</Text>  

            <TextInput placeholder="Enter Email" name="email" value={email} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput placeholder="Enter Your Name" name="name" value={name} onChangeText={text => setName(text)}></TextInput>
            <TextInput placeholder="Enter Pharmacy Name" name="pharmacyName" value={pharmacyName} onChangeText={text => setPharmacyName(text)}></TextInput>
            <TextInput placeholder="Enter Mobile No" name="mobile" value={mobileNo} onChangeText={text => setMobileNo(text)}></TextInput>
            <Text style={{paddingLeft: '8%'}}>File Upload Box</Text>
            <Text style={{paddingLeft: '8%'}}>Location Picker</Text>
            <TextInput placeholder="Enter Password" name="password" value={password} onChangeText={text => setPassword(text)}></TextInput>
            <TextInput placeholder="Re-Enter Password" name="re-password" value={rePassword} onChangeText={text => setRePassword(text)}></TextInput>

            <MyButton title="Register" onPress={register}></MyButton>

            <Text style={styles.registered}>Already Registered ? Log in </Text>
        </View>
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
    }
})

export default RegisterPage;