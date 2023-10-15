import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { clearUserSession } from '../SessionManager/SessionManager';

const AdminDashboard = ({navigation}) => {

    function logout() {
        clearUserSession();
        navigation.navigate('Home');
    }

    return(
        <ScrollView style={styles.view}>
            <Text style={styles.topic}>What Do You Need ?</Text>
            
            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(7).png')}/>
                    <Text style={styles.text}>Manage Medical Center Registrations</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(5).png')}/>
                    <Text style={styles.text}>Manage Doctor Registrations</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button}>
                    <Image style={styles.image} source={require('../assets/images/icons/icon(4).png')}/>
                    <Text style={styles.text}>Manage Registerd Users</Text>
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


export default AdminDashboard;