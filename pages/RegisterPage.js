import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import "firebase/auth";

import ToolBar from "../components/ToolBar";
import TextInputBoxRegister from "../components/TextInputBox";
import MyButton from "../components/MyButton";

const RegisterPage = () =>{

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

    return(
        <View style={styles.view}>
            {/* <ToolBar title="Register Page"/> */}
            <Text style={styles.medifind}>MediFind</Text>
            <Text style={styles.registraion}>Medical Center Registration</Text>  

            <TextInputBoxRegister placeH="Enter Email"/>
            <TextInputBoxRegister placeH="Enter Name"/>
            <TextInputBoxRegister placeH="Enter Pharmacy Name"/>
            <TextInputBoxRegister placeH="Enter Mobile Number"/>
            <TextInputBoxRegister placeH="Enter Password"/>
            <TextInputBoxRegister placeH="Re-Enter Password"/>

            <Text style={{paddingLeft: '8%'}}>File Upload Box</Text>
            <Text style={{paddingLeft: '8%'}}>Location Picker</Text>

            <MyButton title="Register"></MyButton>

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