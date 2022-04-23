import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from "../screens/Home";
import ServiceDetail from "../screens/ServiceDetail";
import RestaurantInfor from "../screens/RestaurantInfor";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignupScreen";
import FoodsScreen from "../screens/foods/FoodsScreen";
import DrinksScreen from "../screens/foods/DrinksScreen";


export default function RootNavigation() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          
          <Stack.Screen name='SignIn' component={SignInScreen} />
          <Stack.Screen name='SignUp' component={SignUpScreen} />
          <Stack.Screen name='RestaurantInfor' component={RestaurantInfor} />
          <Stack.Screen name='ServiceDetail' component={ServiceDetail} />
          <Stack.Screen name='FoodsScreen' component={FoodsScreen} />
          <Stack.Screen name='DrinksScreen' component={DrinksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}