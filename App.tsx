import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import './Firebase/FirebaseConfing'

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MedicalCenterRegisterPage from "./pages/MedicalCenterRegisterPage";
import RegistrationSelection from "./pages/RegistrationSelection";
import UserDashboard from "./pages/UserDashboard";
import UserRegisterPage from "./pages/UserRegisterPage";
import MedicalCenterDashboard from "./pages/MedicalCenterDashboard";
import ProfilePage from "./pages/ProfilePage";
import ContactHistoryPage from "./pages/ContactHistory";
import DoctorHistoryPage from "./pages/DoctorHistory";
import PrescriptionDetails from "./pages/PrescriptionDetails";

const Stack = createNativeStackNavigator();

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff' , headerTitle: '', headerRight: () => (<View><TouchableOpacity><Image source={require('./assets/images/menu-white.png')} style={styles.menuLogo}></Image></TouchableOpacity><TouchableOpacity><Image source={require('./assets/images/profile.png')} style={styles.profileLogo}></Image></TouchableOpacity><TouchableOpacity><Image source={require('./assets/images/notification-white.png')} style={styles.notificationLogo}></Image></TouchableOpacity></View>)}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="RegisterSelection" component={RegistrationSelection} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterRegistration" component={MedicalCenterRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="UserRegistration" component={UserRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="ContactHistoryPage" component={ContactHistoryPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="DoctorHistoryPage" component={DoctorHistoryPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="PrescriptionDetails" component={PrescriptionDetails} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterDashboard" component={MedicalCenterDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: '', headerRight: () => (<View><TouchableOpacity><Image source={require('./assets/images/menu-white.png')} style={styles.menuLogo}></Image></TouchableOpacity><TouchableOpacity><Image source={require('./assets/images/profile.png')} style={styles.profileLogo}></Image></TouchableOpacity><TouchableOpacity><Image source={require('./assets/images/notification-white.png')} style={styles.notificationLogo}></Image></TouchableOpacity></View>)}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const gotoProfile = () => {
  
}

const gotoMenu = () => {
  
}

const gotoNotification = () => {
  
}

const styles = StyleSheet.create({
  profileLogo: {
    width: 22,
    height: 22
  },

  menuLogo: {
    top: 24,
    right: 50,
    width: 25,
    height: 25
  },
  
  notificationLogo: {
    bottom: 20,
    right: 100,
    width: 22,
    height: 22
  }
});

export default App;