import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, Touchable, TouchableOpacity, Button } from 'react-native';
import { getUserSession } from '../SessionManager/SessionManager';

const NearByMedicalCenters = ({navigation}) => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState([]); // Array of medical centers
    let userData = {};

    useEffect(() => {

        const checkUserSession = async () => {
            const userSession = await getUserSession();
            // setUserData(userSession);
            // console.log('User Data : ', userData);
            userData = userSession;
            console.log(userData)
        };
        checkUserSession();

        // Get all medical centers
        const medicalCentersRef = ref(database, 'Users/')
        get(medicalCentersRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                // Data exists in the document
                const data = snapshot.val();
                const medicalUsers = Object.values(data).filter((user) => user.Type === 'medical' && user.City === userData.City);
                
                if (medicalUsers.length > 0) {
                    // At this point, `medicalUsers` contains the filtered user data
                    setMedicalCenters(medicalUsers);
                }
                else {
                    console.log('No medical users found.');
                }
                //setMedicalCenters(data);  
            }
            else{
                console.log('User Data Not Found !');
            }
        })
        .catch((err)=>{
            console.error('Error retrieving user data:', err);
        })
    }, []);

    // function goToMedicalCenter(id) {
    //     navigation.navigate('OneMedicalCenter', {id: id})
    // }

  return (
    <ScrollView>
        <Text style={styles.title}>Nearby Medical Centers To You</Text>
        {medicalCenters.map((medicalCenter, index) => {
            return (
                <View key={index} style={styles.card}>
                    <Text>{medicalCenter.PharmacyName}</Text>
                    <Text>{'medicalCenter.Address'}</Text>
                    <Text>{medicalCenter.Mobile}</Text>
                    <Text>{'medicalCenter.Email'}</Text>
                    <Text>{'Facilities'}</Text>
                    <Text>City : {medicalCenter.City}</Text>
                    <Button title="View" onPress={()=>navigation.navigate('OneMedicalCenter', {id: medicalCenter.ID})}/>
                </View>
            )
        })}
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('AllMedicalCenters')}>
            <Text style={styles.btntxt}>Show All Centers</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
        color: '#13BC9E',
        marginBottom: 20,
    },

    card:{
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
    },

    btn:{
        backgroundColor: '#13BC9E',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
        alignItems: 'center',
    },

    btntxt:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default NearByMedicalCenters