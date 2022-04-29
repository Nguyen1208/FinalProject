import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import About from '../components/serviceDetail/About';

export default function RestaurantInfor({route, navigation}) {
  return (
    <View style={{}}>
      <About route={route} />
    </View>
  );
}
