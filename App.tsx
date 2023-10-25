import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import './Firebase/FirebaseConfing';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MedicalCenterRegisterPage from './pages/MedicalCenterRegisterPage';
import RegistrationSelection from './pages/RegistrationSelection';
import UserDashboard from './pages/UserDashboard';
import UserRegisterPage from './pages/UserRegisterPage';
import MedicalCenterDashboard from './pages/MedicalCenterDashboard';
import MedicineReq from './pages/User Side/MedicineReq';
import AddMedicineReq from './pages/User Side/AddMedicineReq';
import MedicineRequest from './pages/MedicalCenter/MedicineRequest';
import OneMedicineReq from './pages/MedicalCenter/OneMedicineReq';
import AddLocation from './pages/User Side/AddLocation';
import BuyMedicine from './pages/User Side/BuyMedicine';
import OrderConfirm from './pages/User Side/OrderConfirm';

const Stack = createNativeStackNavigator();

const App = () => {
  const styles = StyleSheet.create({
    headerTitleContainer: {
      marginLeft: 40,
      // Add the desired margin to the left
    },
    headerTitle: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '600',
      fontFamily: 'Cochin',
    },
  });

  const CustomHeaderTitle = () => {
    return (
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Requests Medicines</Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="RegisterSelection"
          component={RegistrationSelection}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MedicalCenterRegistration"
          component={MedicalCenterRegisterPage}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="UserRegistration"
          component={UserRegisterPage}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MedicalCenterDashboard"
          component={MedicalCenterDashboard}
          options={{
            headerStyle: {backgroundColor: '#13BC9E'},
            headerTintColor: '#fff',
            headerTitle: '',
          }}
        />
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
};

const gotoProfile = () => {};

const gotoMenu = () => {};

const gotoNotification = () => {};

const styles = StyleSheet.create({
  profileLogo: {
    width: 22,
    height: 22,
  },

  menuLogo: {
    top: 24,
    right: 50,
    width: 25,
    height: 25,
  },

  notificationLogo: {
    bottom: 20,
    right: 100,
    width: 22,
    height: 22,
  },
});

export default App;
