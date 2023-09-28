import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const ToolBar = (props) =>{
    return(
        <View>
            <Text style={styles.bar}>{props.title}</Text>
            <Image style={styles.menu} source={require('../assets/images/menu-white.png')}/>
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
    },

    menu: {
        width: 30,
        height: 30,
        top: -39,
        left: 10
    }
})

export default ToolBar;

