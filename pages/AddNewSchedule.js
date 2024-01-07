import React, {useState, useEffect} from 'react'
import { Button, ScrollView, Text, TextInput } from 'react-native'

const AddNewSchedule = () => {

    const [doctor, setDoctor] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [specialNote, setSpecialNote] = useState("");

    useEffect(() => {

    }, [])

  return (
    <ScrollView>
        <Text>Add New Doctor Scheduele Here</Text>

        <Text>Doctor</Text>
        <TextInput></TextInput>

        <Text>Day</Text>
        <TextInput></TextInput>

        <Text>Start Time</Text>
        <TextInput></TextInput>

        <Text>End Time</Text>
        <TextInput></TextInput>

        <Text>Special Note</Text>
        <TextInput></TextInput>

        <Button title="Add New Scheduele"/>


    </ScrollView>
  )
}

export default AddNewSchedule