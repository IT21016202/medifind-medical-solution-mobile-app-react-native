import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import MyButton from "../components/MyButton";

const RegistrationSelection = ({navigation}) => {
    return(
        <View>
            <MyButton title="Medical Center" onPress={() => navigation.navigate('MedicalCenterRegistration')}></MyButton>
            <MyButton title="Blood Done"></MyButton>
            <MyButton title="Patient"></MyButton>
        </View>
    )
}

export default RegistrationSelection;