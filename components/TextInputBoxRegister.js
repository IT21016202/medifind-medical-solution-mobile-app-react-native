import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const TextInputBoxRegister = (props) =>{
    return(
        <View style={styles.view}>
            <TextInput style={styles.textInput} 
                placeholder={props.placeH} 
                name={props.name} 
                value={props.value} 
                onChangeText={props.onChangeT}>
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'white',
        marginLeft: "8%",
        marginRight: "8%",
        padding: 5,
        marginBottom: 10,
        
    },
})

export default TextInputBoxRegister;