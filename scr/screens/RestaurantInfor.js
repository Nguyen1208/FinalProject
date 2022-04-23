import React from "react";
import {View, Text, ScrollView} from 'react-native'
import { Divider } from "react-native-elements/dist/divider/Divider";
import About from '../component/serviceDetail/About';




export default function RestaurantInfor ({route, navigation}) {
    return (
        <ScrollView>
            <About route={route} />
            <Divider width={1.8} style={{ marginVertical: 20}}/>
                    
        </ScrollView>
    )
}