import React from "react";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import ToolBarWithoutIcon from "../components/ToolBarWithoutIcon";

import MyButton from "../components/MyButton";

const HomePage = ({ navigation }) =>{
    return(
        <View style={styles.view}>
            <ToolBarWithoutIcon/>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <MyButton title="Login" onPress={() => navigation.navigate('Login')}/>
            <Text></Text>
            <MyButton title="Register" onPress={() => navigation.navigate('Register')}/>

            <Text style={styles.text}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 300, 
        marginBottom: 50
    },

    view:{
        backgroundColor: '#13BC9E',
        height: '100%' 
    }, 
})

export default HomePage;