import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { widthToDp } from "rn-responsive-screen";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../constants/url";
import axios from "axios";

export default function Header({
  title,
  isHome = false,
  isVisible = true,
  count = 0,
}) {
  return (
    <View style={styles.container}>
      {isHome ? (
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Ionicons
            style={styles.icon}
            name="arrow-back-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}

      {isVisible ? (
        <View style={styles.addToCart}>
          <Text style={styles.cart_count}>{count > 0 ? count : ""}</Text>
          <Feather
            name="shopping-cart"
            size={24}
            color="white"
            onPress={() => Actions.cart()}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: widthToDp(100),
    backgroundColor: "#C37AFF",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // width: widthToDp(100),
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  cart_count: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    height: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },

  addToCart: {
    flexDirection: "row-reverse",
    position: "absolute",
    bottom: 10,
    right: 100,
    width: widthToDp(12),
    height: widthToDp(12),
    alignItems: "center",
    padding: widthToDp(1),
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
