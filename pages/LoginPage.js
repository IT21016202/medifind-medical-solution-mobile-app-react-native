import React, { useState } from "react";
import { Image, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native";
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
        
        // Validating null values
        if (email == "" || password == ""){
            Alert.alert("Invalid Input", "Please fill all the fields !");
            return;
        }

        // Regular expression for a basic email validation
        const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    
        if (!email.match(emailPattern)) {
            // If the email doesn't match the pattern, show an alert or handle the error
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Validating password
        if (password.length <= 5){
            Alert.alert("Invalid Password", "Password should be at least 6 characters long !");
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
                    navigation.navigate('SplashScreen');
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
            Alert.alert("Invalid Credentials", "Please check your email and password !");
        });
    }


    return(
        <ScrollView>
            {/* <ToolBarWithoutIcon/> */}
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>

            <Text style={styles.welcome}>Hello there</Text>
            <Text style={styles.medifind}>Welcome back</Text> 

            <Text style={styles.loginText}>Let's log you in...</Text>

            <TextInput style={styles.input} placeholder="Enter Email" name="email" value={email} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput style={styles.input} placeholder="Password" name="password" value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>

             {/* <TextInputBox placeH="example@email.com" name="email" value={email} onChangeT={text => setEmail(text)}></TextInputBox>
             <TextInputBox placeH="Password" name="password" value={password} onChangeT={text => setPassword(text)}></TextInputBox> */}
 
            <TouchableOpacity style={styles.btn} onPress={login}>
                <Text style={styles.btntext}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterSelection')}>
                <Text style={styles.dont}>New User ? Sign Up</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    logo:{
        width: '100%',
        height: 250,
    },

    welcome: {
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 25,
        paddingLeft: '10%',
        fontWeight: 'bold',
    },

    medifind:{
        backgroundColor: '#13BC9E',
        color: 'white',
        fontSize: 28,
        paddingLeft: '10%',
        paddingBottom: '5%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        fontWeight: 'bold',
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

    input:{
        fontSize: 16,
        paddingLeft: '4%',
        paddingTop: '3%',
        paddingBottom: '3%',
        marginLeft: '8%',
        marginRight: '8%',
        marginBottom: '4%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#13BC9E',
    },

    btn:{
        backgroundColor: '#13BC9E',
        borderRadius: 20,
        padding: 8,
        marginTop: '2%',
        marginLeft: '8%',
        marginRight: '8%',
    },

    btntext:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    dont:{
        fontSize: 16,
        marginTop: '10%',
        marginLeft: '8%',
        fontWeight: 'bold',
        color: 'black'
    } 

})

export default LoginPage;