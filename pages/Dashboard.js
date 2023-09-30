import React, {useEffect} from 'react'
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { getUserSession, clearUserSession } from '../SessionManager';
import MyButton from '../components/MyButton';

const Dashboard = ({navigation}) => {

    useEffect(() => {
        const checkUserSession = async () => {
            const userSession = await getUserSession();
            if (userSession) {
            console.log(userSession)
            } else {
            console.log('not logged in')
            navigation.navigate('Login')
            }
        };

        checkUserSession();
    }, []);

    return(
        <View>
            <Text>Dashboard</Text>
            <MyButton title="Log Out" onPress={logout}></MyButton>
        </View>
    )
}

function logout(){
    clearUserSession();
}

export default Dashboard;