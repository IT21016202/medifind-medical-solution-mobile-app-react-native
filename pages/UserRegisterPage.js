import React, {useState} from "react";
import {ScrollView, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { saveUserSession } from "../SessionManager/SessionManager";

import MyButton from "../components/MyButton";

const UserRegisterPage = ({navigation}) =>{
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    function register(){
        const auth = getAuth();
        const database = getDatabase();

        // Validate passwords
        if (password.length <= 5){
            alert("Password should be at least 6 characters !");
            return;
        }
        
        if (password !== rePassword) {
            alert('Passwords do not match !');
            return;
        }

        // Create a new user to authentication
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userData = {
                Name: name,
                Mobile: mobileNo,
                Type: 'user',
                CreatedAt: new Date(),
                UpdatedAt : new Date()
            };
        
            //Add user to realtimr DB
            const userRef = ref(database, 'Users/' + userCredential.user.uid);
            set(userRef, userData)
                .then(() => {
                console.log('User data added to Realtime Database');
                saveUserSession({ uid: userCredential.user.uid, email: userCredential.user.email, ...userData });
                alert("User Added");
                navigation.navigate('Dashboard')
                })
                .catch((error) => {
                console.error('Error adding user data to Realtime Database:', error);
                });
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Registration error:', errorCode, errorMessage);
        });
       
    }

    return( 
        <ScrollView>
            <Text style={styles.medifind}>MediFind</Text>
            <Text style={styles.registraion}>User Registration</Text> 

            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Email" name="email" value={email} onChangeText={text => setEmail(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Your Name" name="name" value={name} onChangeText={text => setName(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Mobile No" name="mobile" value={mobileNo} onChangeText={text => setMobileNo(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Enter Password" name="password" value={password} onChangeText={text => setPassword(text)}></TextInput>
            <TextInput style={{paddingLeft: '8%'}} placeholder="Re-Enter Password" name="re-password" value={rePassword} onChangeText={text => setRePassword(text)}></TextInput>

            <MyButton title="Register" onPress={register}></MyButton>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registered}>Already Registered ? Log in</Text> 
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    medifind:{
        color: 'white', 
        fontSize: 25, 
        fontWeight: 'bold',
        backgroundColor: '#13BC9E',
        paddingLeft: '8%',
        paddingTop: '5%'
    },

    registraion:{
        color: 'white',
        fontSize: 20,
        backgroundColor: '#13BC9E',
        paddingLeft: '8%',
        paddingBottom: '5%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        marginBottom: 10
    },

    registered:{
        fontSize: 16,
        marginTop: '10%',
        marginLeft: '8%',
        fontWeight: 'bold',
        color: '#13BC9E'
    }
})

export default UserRegisterPage;                            