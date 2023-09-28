import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const TextInputBox = (props) =>{
    return(
        <View style={styles.view}>
            <TextInput style={styles.textInput} placeholder={props.placeH}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: '#13BC9E',
        marginLeft: "8%",
        marginRight: "8%",
        padding: 5,
        marginBottom: 10
    },

    textInput: {
        color: '#a6a6a6',
    }
})

export default TextInputBox;