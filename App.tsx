import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './Firebase/FirebaseConfing'

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MedicalCenterRegisterPage from "./pages/MedicalCenterRegisterPage";
import RegistrationSelection from "./pages/RegistrationSelection";
import Dashboard from "./pages/Dashboard";
import UserRegisterPage from "./pages/UserRegisterPage";

const Stack = createNativeStackNavigator();

const App = () =>{

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Dashboard" component={Dashboard}/>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="RegisterSelection" component={RegistrationSelection} />
        <Stack.Screen name="MedicalCenterRegistration" component={MedicalCenterRegisterPage} />
        <Stack.Screen name="UserRegistration" component={UserRegisterPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;