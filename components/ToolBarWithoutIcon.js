import React from "react";
import { Text, View, StyleSheet } from "react-native";

const ToolBarWithoutIcon = () =>{
    return(
        <View>
            <Text style={styles.bar}></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: '#13BC9E',
        color: '#fff',
        padding: 10,    
        fontSize: 20,
        textAlign: "center",
        fontWeight: 'bold'
    }
})

export default ToolBarWithoutIcon;

