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
import ChatScreen from "./pages/Chat";
import PharmacyScreen from "./pages/PharmacyScreen";
import UserDashboardHeaderIcons from "./pages/UserDashboardHeaderIcons";
import ChatListPage from "./pages/ChatListPage";
import Appointments from "./pages/Appointments";

const Stack = createNativeStackNavigator();

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{/*...*/}} />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}
        />        
        <Stack.Screen name="Login" component={LoginPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="RegisterSelection" component={RegistrationSelection} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="MedicalCenterRegistration" component={MedicalCenterRegisterPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="UserRegistration" component={UserRegisterPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="ProfilePage" component={ProfilePage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="ContactHistoryPage" component={ContactHistoryPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="DoctorHistoryPage" component={DoctorHistoryPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="PrescriptionDetails" component={PrescriptionDetails} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="MedicalCenterDashboard" component={MedicalCenterDashboard} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="PharmacyScreen" component={PharmacyScreen} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
        <Stack.Screen name="ChatListPage" component={ChatListPage} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
          <Stack.Screen name="Appointments" component={Appointments} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <UserDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>

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