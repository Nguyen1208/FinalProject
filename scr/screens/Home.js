import React, {useState} from "react";
import {View , Text, Image, ScrollView} from 'react-native';
import { Divider } from "react-native-elements/dist/divider/Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabs from "../component/home/BottomTabs";
import Categories from '../component/home/Categories'
import Services, { localServices } from "../component/home/Services";


export default function Home({ navigation }) {
  const [ServiceData, setServiceData] = React.useState(localServices);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <Services ServiceData= {ServiceData} navigation={navigation}/>
        
      </ScrollView>
      <Divider width={1} />
      <BottomTabs/>
     
    </SafeAreaView>
  )
}