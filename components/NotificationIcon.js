import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const NotificationIcon = ({ navigation }) => {

    function goToNotification() {
        navigation.navigate('Notification');
    }

    return (
        <View>
            <TouchableOpacity style={styles.botton} onPress={goToNotification}>
                {/* <Image source={require('../assets/images/icons/notification-white.png')} styles={styles.icon}/> */}
                <Text>Notification</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    icon:{
        width: 30,
        height: 30,
    },
});

export default NotificationIcon;
