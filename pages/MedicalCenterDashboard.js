import React from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";

const MedicalCenterDashboard = ({navigation}) => {

    return(
        <ScrollView style={styles.view}>
            <Text style={styles.topic}>What Do You Need ?</Text>
            
            <TouchableOpacity style={styles.button}>
                <Image style={styles.image} source={require('../assets/images/icons/icon(3).png')}/>
                <Text style={styles.text}>Medicine Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Image style={styles.image} source={require('../assets/images/icons/icon(1).png')}/>
                <Text style={styles.text}>Orders</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button}>
                <Image style={styles.image} source={require('../assets/images/icons/icon(6).png')}/>
                <Text style={styles.text}>Appoinments</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scheduele')}>
                <Image style={styles.image} source={require('../assets/images/icons/icon(7).png')}/>
                <Text style={styles.text}>Schedules</Text>
            </TouchableOpacity> 

            <Button title='Profile' onPress={() => navigation.navigate('MedicalCenterProfile')}></Button>

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


export default MedicalCenterDashboard;