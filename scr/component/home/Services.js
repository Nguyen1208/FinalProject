import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export const localServices = [
  {
    name: 'Send Money',
    image_url: 'https://dutchreview.com/wp-content/uploads/money-5059442_1280.jpg',
    discount: '0%'
  },
  {
    name: 'Food',
    image_url: 'https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg',
    discount: '-5%',
  },
  {
    name: 'Airline Ticket',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk3GJBesg-3mlCyZ4Zm7C794adUWH-dN8RRg&usqp=CAU',
    discount: '-5%',
  },
  {
    name: 'Movie Ticket',
    image_url: 'https://media.istockphoto.com/vectors/movie-tickets-vector-cinema-ticket-design-vector-id1177049680?k=20&m=1177049680&s=612x612&w=0&h=u4BEM-N3CGnUv5uKWlUN1hG6AIeLiH59E1ZKbyfv_J0=',
    discount: '-2%',
  },
  {
    name: 'Game Cards',
    image_url: 'https://blog.twitch.tv/assets/uploads/c32f131bfb879ba51f6ad19f82e4f7a9.png',
    discount: '-3%'
  },
  {
    name: 'Spotify',
    image_url: 'https://www.scdn.co/i/_global/open-graph-default.png',
    discount: '-5%'
  },
  {
    name: 'Netflix',
    image_url: 'https://cellphones.com.vn/sforum/wp-content/uploads/2021/06/d80646d0-4429-11eb-9dce-47010f84228e.jpg',
    discount: '-8%',
  },
]

export default function Services({ navigation, ...props }) {
  return (
    <>
      {props.ServiceData.map((service, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("ServiceDetail", {
              name: service.name,
              image: service.image_url,
              discount: service.discount,

            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >

            <ServiceImage image={service.image_url} />
            <ServiceInfo name={service.name} discount={service.discount} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const ServiceImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const ServiceInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>

    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.discount}</Text>
    </View>
  </View>
);