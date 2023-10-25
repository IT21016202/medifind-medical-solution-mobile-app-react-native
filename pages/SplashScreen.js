import React, {useState} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, Image, StyleSheet} from "react-native";
import ToolBarWithoutIcon from "../components/ToolBarWithoutIcon";
import { getUserSession } from '../SessionManager/SessionManager';

const SplashScreen = ({ navigation }) =>{

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
            else{
                navigation.navigate('Home')
            }
        };
        checkUserSession();
    });

    return(
        <View style={styles.view}>
            <ToolBarWithoutIcon/>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: '60%',
    },

    view:{
        backgroundColor: '#13BC9E',
        height: '100%' 
    }, 

    text:{
        marginTop: '10%',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default SplashScreen;