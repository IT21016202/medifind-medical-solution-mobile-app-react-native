import React from "react";
import { Button, View, StyleSheet } from "react-native";

const MyButton = (props) =>{
    return(
        <View style={styles.button}>
            <Button color="#13BC9E" title={props.title} onPress={props.onPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
       width: "30%",
       marginRight: "auto",
       marginLeft: "auto",
       textAlign: "center"
    }
})

export default MyButton;