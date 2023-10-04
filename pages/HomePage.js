import React, {useEffect} from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import ToolBarWithoutIcon from "../components/ToolBarWithoutIcon";
import { getUserSession } from '../SessionManager/SessionManager';

import MyButton from "../components/MyButton";

const HomePage = ({ navigation }) =>{

    useEffect(() => {
        const checkUserSession = async () => {
            const userSession = await getUserSession();
            if (userSession) {
                console.log('logged in', userSession)
                navigation.navigate('Dashboard')
            } else {
                console.log('not logged in')   
            }
        };
        checkUserSession();
    }, []);

    return(
        <View style={styles.view}>
            <ToolBarWithoutIcon/>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <MyButton title="Login" onPress={() => navigation.navigate('Login')}/>
            <Text></Text>
            <MyButton title="Register" onPress={() => navigation.navigate('RegisterSelection')}/>

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