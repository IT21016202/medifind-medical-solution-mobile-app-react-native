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
import MedicalDashboardHeaderIcons from "./pages/MedicalDashboardHeaderIcons";

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
import DonorLocationPicker from "./pages/DonorLocationPicker";
import Chart from "./pages/Chart";
import NearByMedicalCenters from "./pages/NearByMedicalCenters";
import AllMedicalCenters from "./pages/AllMedicalCenters";
import OneMedicalCenter from "./pages/OneMedicalCenter";
import Profile from "./pages/Profile";
import BloodDonationDashboard from "./pages/BloodDonationDashboard";
import UserAddedRequests from "./pages/UserAddedRequests";
import Scheduele from "./pages/Scheduele";
import SplashScreen from "./pages/SplashScreen";
import NearByCentersMapView from "./pages/NearByCentersMapView";
import LocationPicker from "./pages/LocationPicker";
import ProfilePage from "./pages/ProfilePage";
import ContactHistoryPage from "./pages/ContactHistory";
import DoctorHistoryPage from "./pages/DoctorHistory";
import PrescriptionDetails from "./pages/PrescriptionDetails";
import ChatScreen from "./pages/Chat";
import PharmacyScreen from "./pages/PharmacyScreen";
import UserDashboardHeaderIcons from "./pages/UserDashboardHeaderIcons";
import ChatListPage from "./pages/ChatListPage";
import Appointments from "./pages/Appointments";

import MedicineReq from './pages/User Side/MedicineReq';
import AddMedicineReq from './pages/User Side/AddMedicineReq';
import MedicineRequest from './pages/MedicalCenter/MedicineRequest';
import OneMedicineReq from './pages/MedicalCenter/OneMedicineReq';
import AddLocation from './pages/User Side/AddLocation';
import BuyMedicine from './pages/User Side/BuyMedicine';
import OrderConfirm from './pages/User Side/OrderConfirm';



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
        <Stack.Screen name="MedicalCenterDashboard" component={MedicalCenterDashboard} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#13BC9E' },
            headerTintColor: '#fff',
            headerTitle: '',
            headerRight: () => (
              <MedicalDashboardHeaderIcons navigation={navigation} />
            ),
          })}/>
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
        <Stack.Screen name="DonorLocationPicker" component={DonorLocationPicker} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="EditRequest" component={EditRequest} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="DonorMapView" component={DonorMapView} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="DonorAcceptedRequests" component={DonorAcceptedRequests } options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="NearByMedicalCenters" component={NearByMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="AllMedicalCenters" component={AllMedicalCenters} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="OneMedicalCenter" component={OneMedicalCenter} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="MedicalCenterProfile" component={MedicalCenterProfile} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="BloodDonationDashboard" component={BloodDonationDashboard}     options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="UserAddedRequests" component={UserAddedRequests}     options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="Scheduele" component={Scheduele} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="NearByCentersMapView" component={NearByCentersMapView} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
        <Stack.Screen name="LocationPicker" component={LocationPicker} options={{headerStyle:{backgroundColor: '#13BC9E'}, headerTintColor: '#fff', headerTitle: ''}}/>
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

<Stack.Screen
          name="MediRequest"
          component={MedicineReq}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',
            headerTitle: 'Medicine Request',
          }}
        />
        <Stack.Screen
          name="AddMediRequest"
          component={AddMedicineReq}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',

            headerTitle: 'Request Medicine Post',
          }}
        />

        <Stack.Screen
          name="MedicalMediReq"
          component={MedicineRequest}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',

            headerTitle: 'Medicine Requests',
          }}
        />

        <Stack.Screen
          name="AddLocation"
          component={AddLocation}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',

            headerTitle: 'Request Medicine Post',
          }}
        />

        <Stack.Screen
          name="OneMedicineRequest"
          component={OneMedicineReq}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',

            headerTitle: 'Medicine Request',
          }}
        />
        <Stack.Screen
          name="BuyMedicine"
          component={BuyMedicine}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',
            headerTitle: 'Buy Medicine',
          }}
        />

        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirm}
          options={{
            headerStyle: {backgroundColor: '#046352'},
            headerTintColor: '#fff',
            headerTitle: 'Order Confirmation',
          }}
        />

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