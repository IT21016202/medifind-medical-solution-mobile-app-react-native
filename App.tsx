import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import './Firebase/FirebaseConfing';

//Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MedicalCenterRegisterPage from "./pages/MedicalCenterRegisterPage";
import RegistrationSelection from "./pages/RegistrationSelection";
import UserDashboard from "./pages/UserDashboard";
import UserRegisterPage from "./pages/UserRegisterPage";
import MedicalCenterDashboard from "./pages/MedicalCenterDashboard";
import MedicalCenterProfile from "./pages/MedicalCenterProfile";
import Notification from "./pages/Notification";
import AdminDashboard from "./pages/AdminDashboard";
import NearByMedicalCenters from "./pages/NearByMedicalCenters";
import AllMedicalCenters from "./pages/AllMedicalCenters";
import OneMedicalCenter from "./pages/OneMedicalCenter";
import Scheduele from "./pages/Scheduele";
import SplashScreen from "./pages/SplashScreen";
import NearByCentersMapView from "./pages/NearByCentersMapView";

const Stack = createNativeStackNavigator();

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Home" component={HomePage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff' , headerTitle: ''}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="RegisterSelection" component={RegistrationSelection} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterRegistration" component={MedicalCenterRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="UserRegistration" component={UserRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterDashboard" component={MedicalCenterDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Notification" component={Notification} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="NearByMedicalCenters" component={NearByMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AllMedicalCenters" component={AllMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="OneMedicalCenter" component={OneMedicalCenter} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterProfile" component={MedicalCenterProfile} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Scheduele" component={Scheduele} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="NearByCentersMapView" component={NearByCentersMapView} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

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