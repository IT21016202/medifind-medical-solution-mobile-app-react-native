import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import MyButton from "../components/MyButton";

const RegistrationSelection = ({navigation}) => {
    return(
        <View>
            <MyButton title="Medical Center" onPress={() => navigation.navigate('MedicalCenterRegistration')}></MyButton>
            <MyButton title="Doctor" onPress={() => navigation.navigate('DoctorRegistration')}></MyButton>
            <MyButton title="Patient" onPress={() => navigation.navigate('UserRegistration')}></MyButton>
        </View>
    )
}

export default RegistrationSelection;