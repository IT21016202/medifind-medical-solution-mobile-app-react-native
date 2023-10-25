import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native";
import { getUserSession, clearUserSession } from '../SessionManager/SessionManager';

const UserDashboard = ({navigation}) => {

    const [user, setUser] = useState('');

    useFocusEffect(() => {
        const checkUserSession = async () => {
            const userSession = await getUserSession();
            setUser(userSession);
        };
        checkUserSession();
    });


    function logout() {
        clearUserSession();
        navigation.navigate('Home');
    }

    return(
        <ScrollView style={styles.view}>
            <Text style={styles.topic}>Hello {user.Name}, Whats you find ...</Text>
    
            <TouchableOpacity>
                <Image style={styles.image} source={require('../assets/images/FindADoctor.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image style={styles.image} source={require('../assets/images/Appoinments.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('NearByMedicalCenters')}>
                <Image style={styles.image} source={require('../assets/images/MedicalCenters.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Image style={styles.image} source={require('../assets/images/FindMedicine.png')}/>
            </TouchableOpacity>

            <TouchableOpacity>
                    <Image style={styles.image} source={require('../assets/images/RequestBlood.png')}/>
            </TouchableOpacity>

            <Button title='Log Out' onPress={logout}></Button>
            <Text></Text>
            <Text></Text>
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
        color: 'black',
        marginBottom: 20,
    },

    image:{
       marginLeft: 15,
       width: 330,
       height: 140,
       marginBottom: 25,
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