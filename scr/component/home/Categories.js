import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const items = [
  {
    image: require("../../assets/images/sent.png"),
    text: "Send Money",
  },
  {
    image: require("../../assets/images/topup.png"),
    text: "Top Up",
  },
  {
    image: require("../../assets/images/loan.png"),
    text: "Loan",
  },
  {
    image: require("../../assets/images/shopping.png"),
    text: "Shopping",
  },
  {
    image: require("../../assets/images/saving.png"),
    text: "Saving",
  },
];

export default function Categories() {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
            <Image
              source={item.image}
              style={{
                width: 50,
                height: 40,
                resizeMode: "contain",
              }}
            />
            <Text style={{ fontSize: 13, fontWeight: "900" }}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}