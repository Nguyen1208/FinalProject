import React from 'react';
import {View, Text, Image, ScrollView, SafeAreaView} from 'react-native';
import Categories from '../components/home/Categories';
import Services, {localServices} from '../components/home/Services';

export default function Home({navigation}) {
  const [ServiceData, setServiceData] = React.useState(localServices);
  return (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <Services ServiceData={ServiceData} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
