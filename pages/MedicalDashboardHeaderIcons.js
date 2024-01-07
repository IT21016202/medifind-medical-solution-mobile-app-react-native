import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

const MedicalDashboardHeaderIcons = ({navigation}) => (
  <View style={styles.headerIcons}>
    <TouchableOpacity onPress={() => navigation.navigate('MenuScreen')}>
      <Image
        source={require('../assets/images/menu-white.png')}
        style={styles.menuLogo}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('MedicalCenterProfile')}>
      <Image
        source={require('../assets/images/profile.png')}
        style={styles.profileLogo}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
      <Image
        source={require('../assets/images/notification-white.png')}
        style={styles.notificationLogo}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  menuLogo: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  profileLogo: {
    width: 22,
    height: 22,
    marginRight: 15,
  },
  notificationLogo: {
    width: 22,
    height: 22,
  },
});

export default MedicalDashboardHeaderIcons;
