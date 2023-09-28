import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ToolBarWithoutIcon from "../components/ToolBarWithoutIcon";
import MyButton from "../components/MyButton";
import TextInputBox from "../components/TextInputBox";

const LoginPage = () =>{
    return(
        <View>
            {/* <ToolBarWithoutIcon/> */}
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.medifind}>MediFind</Text>

            <Text style={styles.loginText}>Please Login Your Account to Continue...</Text>

            <TextInputBox placeH="example@email.com"/>
            <TextInputBox placeH="Password"/>
 
            <MyButton onPress={login} title="Login"/>

            <Text style={styles.dont}>Don't have and account Sign Up</Text>
        </View>
    );
}

function login(){
    alert("Login");
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 300,
        marginTop: -30,  
    },

    welcome: {
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 25,
        paddingLeft: '10%',
    },

    medifind:{
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 32,
        paddingLeft: '10%',
        paddingBottom: '5%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },

    loginText:{
        color: '#13BC9E',
        fontSize: 16,
        paddingTop: '12%',
        paddingLeft: '8%',
        paddingRight: '8%',
        top: -20,
        marginLeft: '2%',
        marginRight: '2%'
    },

    dont:{
        fontSize: 16,
        marginTop: '10%',
        marginLeft: '8%',
        fontWeight: 'bold',
        color: '#13BC9E'
    }

})

export default LoginPage;