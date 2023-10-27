import React from "react";
import { NavigationContainer, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View, StyleSheet, Button, Text } from "react-native";
import './Firebase/FirebaseConfing'

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

//Blood Pages
import RequestBlood from "./pages/RequestBlood";
import TemporaryPage from "./pages/TemporaryPage";
import BloodRequestPage from "./pages/BloodRequestFeed";
import BloodSearcherDetails from "./pages/BloodSearcherDetails";
import BloodDonorRegistration from "./pages/BloodDonorRegistration";
import BloodDonorList from "./pages/BloodDonorList";
import AcceptedRequestsPage from "./pages/AcceptedRequestsPage";
import EditRequest from "./pages/EditRequestScreen";
import DonorMapView from "./pages/DonorMapView";
import DonorAcceptedRequests from "./pages/DonorAcceptedRequests";
import Chart from "./pages/Chart";
import NearByMedicalCenters from "./pages/NearByMedicalCenters";
import AllMedicalCenters from "./pages/AllMedicalCenters";
import OneMedicalCenter from "./pages/OneMedicalCenter";
import Profile from "./pages/Profile";
import BloodDonationDashboard from "./pages/BloodDonationDashboard";

const Stack = createNativeStackNavigator();

const App = () =>{


  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff' , headerTitle: ''}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="RegisterSelection" component={RegistrationSelection} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterRegistration" component={MedicalCenterRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="UserRegistration" component={UserRegisterPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterDashboard" component={MedicalCenterDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Notification" component={Notification} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="RequestBlood" component={RequestBlood} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="TemporaryPage" component={TemporaryPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodRequestPage" component={BloodRequestPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Chart" component={Chart} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodSearcherDetails" component={BloodSearcherDetails} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodDonorRegistration" component={BloodDonorRegistration} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodDonorList" component={BloodDonorList} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AcceptedRequestsPage" component={AcceptedRequestsPage} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="EditRequest" component={EditRequest} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="DonorMapView" component={DonorMapView} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="DonorAcceptedRequests" component={DonorAcceptedRequests } options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="NearByMedicalCenters" component={NearByMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AllMedicalCenters" component={AllMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="OneMedicalCenter" component={OneMedicalCenter} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterProfile" component={MedicalCenterProfile} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodDonationDashboard" component={BloodDonationDashboard}     options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
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