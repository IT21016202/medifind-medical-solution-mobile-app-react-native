import React, {useEffect} from 'react'
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { getUserSession, clearUserSession } from '../SessionManager/SessionManager';
import MyButton from '../components/MyButton';

const Dashboard = ({navigation}) => {

    function logout(){
        clearUserSession();
        navigation.navigate('Home')
    }

    return(
        <View>
            <Text>Dashboard</Text>
            <MyButton title="Log Out" onPress={logout}></MyButton>
        </View>
    )
}


export default Dashboard;