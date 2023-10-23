import React, {useEffect, useRef, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { getUserSession } from '../SessionManager/SessionManager';
import { getDatabase, ref, get, set, update, remove } from 'firebase/database';
import { getAuth, deleteUser} from 'firebase/auth';
import { clearUserSession } from '../SessionManager/SessionManager';


const MedicalCenterProfile = ({navigation}) => {
    const database = getDatabase();
    const auth = getAuth();

    const [userData, setUserData] = useState({});
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pharmacyName, setPharmacyName] = useState('');
    const [address, setAddress] = useState('');
    const [facilities, setFacilities] = useState('');
    const [description, setDescription] = useState('');
    //const [image, setImage] = useState('');
    const [city, setCity] = useState('');

    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            const userSession = await getUserSession();
    
            // Create a reference to the specific document
            const userRef = ref(database, 'Users/' + userSession.uid);
    
            // Retrieve data from the specific documen
            get(userRef)
            .then((snapshot)=>{
                if(snapshot.exists()){
                    // Data exists in the document
                    const data = snapshot.val();
                    setUserData(data);

                    setId(data.ID);
                    setName(data.Name);
                    setMobile(data.Mobile);
                    setPharmacyName(data.PharmacyName);
                    setAddress(data.Address);
                    setCity(data.City);
                    setFacilities(data.facilities);
                    setDescription(data.Description);
                    //setImage(data.Image);
                }
                else{
                    console.log('User Data Not Found !');
                }
            })
            .catch((err)=>{
                console.error('Error retrieving user data:', err);
            })
            
        };
        checkUserSession();
        setUpdated(false);
    }, [updated]);
   
    const updateProfile = () => {
        
        // Create a reference to the specific document
        const userRef = ref(database, 'Users/' + userData.ID);

        const data = {
            ID: id,
            Name: name,
            Mobile: mobile,
            PharmacyName: pharmacyName,
            Address: address,
            City: city,
            facilities: facilities,
            Description: description,
        };

        console.log(data);

        // Update the document
        update(userRef, data)
        .then(()=>{
            console.log('User Profile Updated !');
            alert('Profile Updated !');
            setUpdated(true);
        })
        .catch((err)=>{
            console.error('Error updating user profile:', err);
        });
    };


    function logout() {
        clearUserSession();
        navigation.navigate('Home');
    }

  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medical Center Profile</Text>
            <Text>IMAGE</Text>
            {/* <TextInput style={styles.input} placeholder="ID" value={id} onChange={text => setId(text)} editable={false}/> */}
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={text => setName(text)}/>
            <TextInput style={styles.input} placeholder="Mobile" value={mobile} onChangeText={text => setMobile(text)}/>
            <TextInput style={styles.input} placeholder="Pharmacy Name" value={pharmacyName} onChangeText={text => setPharmacyName(text)}/>
            <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={text => setAddress(text)}/>
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={text => setCity(text)}/>
            <TextInput style={styles.input} placeholder="Facilities" value={facilities} onChangeText={text => setFacilities(text)}/>
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={text => setDescription(text)}/>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnSave} onPress={() => updateProfile()}>
                    <Text style={styles.btnText}>Save Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnDelete} onPress={() => deleteProfile()}>
                    <Text style={styles.btnText}>Delete Profile</Text>
                </TouchableOpacity>  
            </View>

            <TouchableOpacity style={styles.btnLogout} onPress={logout}>
                    <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }, 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#13BC9E',
        borderRadius: 6,
        padding: 10,
        width: '80%',
        marginBottom: 15,
    },

    buttonContainer:{
        marginTop: 20,
        flexDirection: 'row', // Arrange items in a row
        justifyContent: 'space-between', // Arrange items
    },

    btnSave: {
        backgroundColor: '#13BC9E',
        padding: 10,
        borderRadius: 8,
        width: '35%',
        alignItems: 'center',
    },

    btnDelete: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        width: '35%',
        alignItems: 'center',
        marginLeft: 40,
    },

    btnLogout: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 15,
    },

    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MedicalCenterProfile;
