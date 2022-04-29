import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';

import Home from '../screens/Home';
import Cart from '../screens/Cart';
import User from '../screens/User';
import RestaurantInfor from '../screens/RestaurantInfor';
import ServiceDetail from '../screens/ServiceDetail';
import FoodsScreen from '../screens/foods/FoodsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignupScreen';



const firebaseConfig = {
  apiKey: 'AIzaSyADZ8tkvH1vGzyu25BQ_iE1E50HT5xbEZ4',
  authDomain: 'finalproject-134bd.firebaseapp.com',
  projectId: 'finalproject-134bd',
  storageBucket: 'finalproject-134bd.appspot.com',
  messagingSenderId: '506771759335',
  appId: '1:506771759335:web:9137863054e6d246094242',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default function Main() {

  const MainStack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  return (
    <MainStack.Navigator initialRouteName="SignIn">
      <MainStack.Screen name="MainTabs" component={NavigationBottom} />
      <MainStack.Screen name="SignIn" component={SignInScreen} />
      <MainStack.Screen name="SignUp" component={SignUpScreen} />
      <MainStack.Screen name="Cart" component={Cart} />
      <MainStack.Screen name="User" component={User} />
      <MainStack.Screen name="ServiceDetail" component={ServiceDetail} />
      <MainStack.Screen name="RestaurantInfor" component={RestaurantInfor} />
      <MainStack.Screen name="FoodsScreen" component={FoodsScreen} />
    </MainStack.Navigator>
  );
}

const NavigationBottom = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'home'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'cart-arrow-down'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name={'user'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
