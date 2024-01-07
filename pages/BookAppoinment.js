import React, {useState, useEffect} from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';

const BookAppoinment = ({route, navigation}) => {

  const {center}  = route.params;
  console.log(center)

  return (
   <ScrollView>
         <Text>Book Your Medical Appoinment For {center.Name}</Text>

          <Text>Choose Date</Text>
          <Text>Choose Time</Text>
          <Text>Choose Doctor</Text>
          <Text>Choose Reason</Text>
          <Text>Choose Payment Method</Text>

   </ScrollView>
  )
}

export default BookAppoinment