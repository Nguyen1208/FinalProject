import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const localRestaurants = [
  {
    name: 'Ha Noi Food',
    image_url:
      'https://backyardtravel.com/wp-content/uploads/2017/01/Vietnam-Food-Pho-Vietnamese-rice-noodles.jpg',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: 'Hue Food',
    image_url:
      'https://trivietphat.net/wp-content/uploads/2021/08/bun-bo-1.jpg',
    categories: ['Cafe', 'Bar'],
    price: '$$',
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: 'Indian Food',
    image_url:
      'https://www.thespruceeats.com/thmb/I_M3fmEbCeNceaPrOP5_xNZ2xko=/3160x2107/filters:fill(auto,1)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg',
    categories: ['Indian', 'Bar'],
    price: '$$',
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItem({navigation, ...props}) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{marginBottom: 30}}
          onPress={() =>
            navigation.navigate('RestaurantInfor', {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.reviews,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }>
          <View style={{marginTop: 10, padding: 15, backgroundColor: 'white'}}>
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = props => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{width: '100%', height: 180}}
    />
    <TouchableOpacity style={{position: 'absolute', right: 20, top: 20}}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = props => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}>
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 15}}>{props.name}</Text>
      <Text style={{fontSize: 13, color: 'gray'}}>15-20 * min</Text>
    </View>
    <View
      style={{
        backgroundColor: 'orange',
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      }}>
      <Text>{props.rating}</Text>
    </View>
  </View>
);
