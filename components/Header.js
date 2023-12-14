import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
} from "react-native";
import { widthToDp } from "rn-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import baseURL from "../constants/url";

export default function Header({ title }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    axios.delete(`${baseURL}/store/auth`).then((res) => {
      Actions.SignIn();
    });
    setIsDropdownVisible(false);
  };

  const handleCart = () => {
    Actions.cart();
    setIsDropdownVisible(false);
  };

  const handleOrders = () => {
    // Implement your logic to navigate to orders screen
    console.log("View Orders");
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png",
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.topBar}>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <Feather name="user" size={24} color="black" />
        </TouchableWithoutFeedback>
        <Modal
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsDropdownVisible(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={handleCart}>
              <Text style={styles.dropdownElements}>View Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOrders}>
              <Text style={styles.dropdownElements}>View Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.dropdownElements}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: widthToDp(100),
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  logo: {
    width: 50,
    height: 50,
  },
  topBar: {
    flexDirection: "row",
    position: "absolute",
    top: 10,
    right: 10,
  },
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    // padding: 10,
    // paddingLeft: 0,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownElements: {
    borderBottomWidth: 1, // Add a bottom border
    borderBottomColor: "#DCDCDC",
    padding: 10,
    // paddingLeft: 5,
    textAlign: "center",
  },
});
