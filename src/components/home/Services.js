import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export const localServices = [
  
  {
    name: 'Food',
    image_url: 'https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg',
    discount: '-5%',
  },
  {
    name: 'Drink',
    image_url: 'https://www.hocvienamthuc.com/wp-content/uploads/2018/07/soft-drink-hta.jpg',
    discount: '-5%',
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