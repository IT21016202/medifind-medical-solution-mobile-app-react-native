import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Button, FlatList, TextInput } from 'react-native';
import TextInputBox from '../components/TextInputBox';

const AllMedicalCenters = ({navigation}) => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState([]); // Array of medical centers
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Get all medical centers
        const medicalCentersRef = ref(database, 'Users/')
        get(medicalCentersRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                // Data exists in the document
                const data = snapshot.val();
                const medicalUsers = Object.values(data).filter((user) => user.Type === 'medical');
                if (medicalUsers.length > 0) {
                    // At this point, `medicalUsers` contains the filtered user data
                    setMedicalCenters(medicalUsers);
                }
                else {
                    console.log('No medical users found.');
                }
            }
            else{
                console.log('User Data Not Found !');
            }
        })
        .catch((err)=>{
            console.error('Error retrieving user data:', err);
        })
    }, []);


    // Filter the medical centers based on the search text
    const filteredMedicalCenters = medicalCenters.filter((center) =>
        center.Name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <ScrollView>
            <Text style={styles.title}>All Medical Centers</Text>

            <TextInput placeholder="Search" onChangeText={(text) => setSearchText(text)} value={searchText}/>

            {filteredMedicalCenters.map((medicalCenter, index) => {
                return (
                    <View key={index} style={styles.card} >
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
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    btn: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    btntxt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default AllMedicalCenters