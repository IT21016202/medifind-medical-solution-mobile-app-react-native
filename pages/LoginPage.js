import React, { useState } from "react";
import { Image, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { saveUserSession } from "../SessionManager/SessionManager";
import { getDatabase, ref, get } from 'firebase/database';

import MyButton from "../components/MyButton";
import TextInputBox from "../components/TextInputBox";

const LoginPage = ({ navigation }) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login(){
        const auth = getAuth();
        const database = getDatabase();
        

        // Validating password
        if (password.length <= 5){
            alert("Password should be at least 6 characters !");
            return;
        }
    
        // Sign in using firebase authentication
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid);

            // Create a reference to the specific document.
            const userRef = ref(database, 'Users/' + userCredential.user.uid);

            // Retrieve data from the specific user's document
            get(userRef)
            .then((snapshot)=>{
                if(snapshot.exists()){
                    // Data exists in the document
                    const data = snapshot.val();
                    navigation.navigate('Home');
                    // Save user session
                    saveUserSession({ uid: userCredential.user.uid, email: userCredential.user.email, ...data });
                }
                else{
                    console.log('User Data Not Found !');
                }
            })
            .catch((err)=>{
                console.error('Error retrieving user data:', err);
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.error('Sign-in error:', errorCode, errorMessage);
            alert("Invalid email or password !");
        });
    }


    return(
        <ScrollView>
            {/* <ToolBarWithoutIcon/> */}
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.medifind}>MediFind</Text>

            <Text style={styles.loginText}>Please Login Your Account to Continue...</Text>

            <TextInputBox placeH="example@email.com" name="email" value={email} onChangeT={text => setEmail(text)}></TextInputBox>
            <TextInputBox placeH="Password" name="password" value={password} onChangeT={text => setPassword(text)}></TextInputBox>
 
            <MyButton onPress={login} title="Login"/>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterSelection')}>
                <Text style={styles.dont}>Don't have and account ? Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 300,
        marginTop: -30,  
    },

    welcome: {
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 25,
        paddingLeft: '10%',
    },

    medifind:{
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 32,
        paddingLeft: '10%',
        paddingBottom: '5%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },

    loginText:{
        color: '#13BC9E',
        fontSize: 16,
        paddingTop: '12%',
        paddingLeft: '8%',
        paddingRight: '8%',
        top: -20,
        marginLeft: '2%',
        marginRight: '2%'
    },

    dont:{
        fontSize: 16,
        marginTop: '10%',
        marginLeft: '8%',
        fontWeight: 'bold',
        color: '#13BC9E'
    } 

})

export default LoginPage;