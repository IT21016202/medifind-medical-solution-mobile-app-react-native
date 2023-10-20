import React, {useEffect, useState} from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { getUserSession, clearUserSession } from '../SessionManager/SessionManager';

const UserDashboard = ({navigation}) => {

    function logout() {
        clearUserSession();
        navigation.navigate('Home');
    }
    function navigateToProfile() {
        navigation.navigate('ProfilePage'); // Navigate to the ProfilePage
    }

    return(
        <ScrollView style={styles.view}>
            <Text style={styles.topic}>What Do You Need ?</Text>
            
            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(7).png')}/>
                    <Text style={styles.text}>Find a Doctor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(5).png')}/>
                    <Text style={styles.text}>Appoinments</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(4).png')}/>
                    <Text style={styles.text}>Medical Center</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(6).png')}/>
                    <Text style={styles.text}>Find Medicine</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(3).png')}/>
                    <Text style={styles.text}>Request Blood</Text>
            </TouchableOpacity>

            <Button title='Log Out' onPress={logout}></Button>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    view:{
        padding: 20,
    },

    topic:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#13BC9E',
        marginBottom: 20,
    },

    image:{
       marginLeft: 15,
    },

    text:{
        padding: 30,
        fontSize: 20,
        fontWeight: 'bold',
    },

    button:{
        borderWidth: 1,
        borderColor: '#13BC9E',
        borderRadius: 20,
        padding: 10,
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom: 20,
    }
})


export default UserDashboard;