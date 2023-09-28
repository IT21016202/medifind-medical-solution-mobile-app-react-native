import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ToolBar from "../components/ToolBar";
import TextInputBoxRegister from "../components/TextInputBox";
import MyButton from "../components/MyButton";

const RegisterPage = () =>{
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