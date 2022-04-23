import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import { Divider } from "react-native-elements/dist/divider/Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../component/serviceDetail/SearchBar";
import RestaurantItem, { localRestaurants, } from "../component/serviceDetail/RestaurantItem";

const YELP_API_KEY = 
'ypjjQycOCUwSJA68f_jAxJdwY9wJHVFJJkduE7Fgo9kRHFXH2QV4LzfzfUbQZvxcydv-XDdCRrAKbO0H0CnWmFDXQIVvFlNrc6YTa6pGeUqXwv08UiVBYVmbndlYYnYx';

export default function ServiceDetail({navigation}) {
    const [restaurantData, setRestaurantData] = React.useState(localRestaurants);
    
    const getRestaurantsFromYelp = () => {
        const yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=California'
    

    const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
        },
    };

    return fetch(yelpUrl, apiOptions)
        .then((res) => res.json())
        .then((json) => setRestaurantData(json.businesses));
};
    useEffect(() => {
        getRestaurantsFromYelp();
    }, []);
    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <SearchBar />
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <RestaurantItem 
                restaurantData={restaurantData}
                navigation={navigation}/>
                
            </ScrollView>
        </SafeAreaView>
    );
}