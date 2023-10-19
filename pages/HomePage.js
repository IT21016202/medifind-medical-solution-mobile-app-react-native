import React, {useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ToolBarWithoutIcon from "../components/ToolBarWithoutIcon";
import { getUserSession } from '../SessionManager/SessionManager';

const HomePage = ({ navigation }) =>{

    const [user, setUser] = useState(null);


    useFocusEffect(() => {
        
        const checkUserSession = async () => {
            const userSession = await getUserSession();
            setUser(userSession);
            if (userSession && userSession.Type == 'medical') {
                navigation.navigate('MedicalCenterDashboard')  
            } 
            else if (userSession && userSession.Type == 'user') {   
                navigation.navigate('UserDashboard')    
            }
            else if (userSession && userSession.Type == 'doctor') {
                navigation.navigate('DoctorDashboard')    
            }
            else if (userSession && userSession.Type == 'admin') {
                navigation.navigate('AdminDashboard')    
            }
        };
        checkUserSession();
    });

    return(
        <View style={styles.view}>
            <ToolBarWithoutIcon/>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterSelection')}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
   
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

    button:{
        backgroundColor: 'white',
        width: '50%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    text:{
        color: '#13BC9E',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default HomePage;