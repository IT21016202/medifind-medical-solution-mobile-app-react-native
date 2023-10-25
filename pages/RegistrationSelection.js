import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import MyButton from "../components/MyButton";

const RegistrationSelection = ({navigation}) => {
    return(
        <ImageBackground
            source={require('../assets/images/selection-back.jpg')}
            style={styles.backgroundImage}
        >
        <View style={styles.view}>
            <Text style={styles.title}>Select your registration type</Text>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('MedicalCenterRegistration')}>
                <Text style={styles.text}>Medical Center</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('UserRegistration')}>
                <Text style={styles.text}>Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Blood Doner</Text>
            </TouchableOpacity>


            {/* // <MyButton title="Medical Center" ></MyButton>
            // <MyButton title="Doctor" onPress={() => navigation.navigate('DoctorRegistration')}></MyButton>
            // <MyButton title="Patient" onPress={() => navigation.navigate('UserRegistration')}></MyButton>
            // <MyButton title="Blood Doner" onPress={() => navigation.navigate('UserRegistration')}></MyButton> */}
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    view:{
       height:'100%' 
    },

    title:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#13BC9E',
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 25,
    },

    text:{
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        marginLeft: 20,
        marginTop: 25,
    },

    btn:{

    },

    backgroundImage:{
        resizeMode: 'cover'
    }
})

export default RegistrationSelection;