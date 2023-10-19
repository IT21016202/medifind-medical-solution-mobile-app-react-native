import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';

const OneMedicalCenter = ({route, navigation}) => {

  const { id } = route.params;
  const database = getDatabase();
  const [medicalCenter, setMedicalCenter] = useState(""); // Array of medical centers

  useEffect(() => {
    //Get one medical center by id
    const medicalCenterRef = ref(database, 'Users/' + id)
    get(medicalCenterRef)
    .then((snapshot)=>{
        if(snapshot.exists()){
            // Data exists in the document
            const data = snapshot.val();
            setMedicalCenter(data);
            console.log('One' , data)
        }
        else{
            console.log('User Data Not Found !');
        }
    })
    .catch((err)=>{
        console.error('Error retrieving user data:', err);
    })
  },[]);

  return (
    <ScrollView>
        <Text>{medicalCenter.PharmacyName}</Text>
        <Text>Other data ....</Text>

        <Button title="Book Appointment" />
        <Button title="Place Order" /> 

        <Text>Reviews Section</Text>
    </ScrollView>
  )
}

export default OneMedicalCenter