import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import baseURL from "../constants/url";
import CartItem from "../components/CartItem";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { width, widthToDp } from "rn-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [cart_id, setCartId] = useState(null);

  const fetchCart = async () => {
    // Get the cart id from the device storage
    const cartId = await AsyncStorage.getItem("cart_id");
    setCartId(cartId);
    // Fetch the products from the cart API using the cart id
    axios.get(`${baseURL}/store/carts/${cartId}`).then(({ data }) => {
      // Set the cart state to the products in the cart
      setCart(data.cart);
    });
  };

 

  const onChangeCart = (data) => {
    setCart(data.cart);
  };

  useEffect(() => {
    // Calling the fetchCart function when the component mounts
    fetchCart();
    //setPaymentSession();
  }, []);
  return (
    // SafeAreaView is used to avoid the notch on the phone
    <SafeAreaView style={[styles.container]}>
      {/* SchrollView is used in order to scroll the content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Using the reusable header component */}
        <Header title="My Cart" isVisible={false} />

        {/* Mapping the products into the Cart component */}
        {cart?.items?.map((product) => (
          <CartItem
            item={product}
            cartId={cart_id}
            onChangeCart={onChangeCart}
          />
        ))}
      </ScrollView>
      {/* Creating a seperate view to show the total amount and checkout button */}
      <View>
        <View style={styles.row}>
          <Text style={styles.cartTotalText}>Items</Text>

          {/* Showing Cart Total */}
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            {/* Dividing the total by 100 because Medusa doesn't store numbers in decimal */}
            ₹{cart?.total / 100}
          </Text>
        </View>
        <View style={styles.row}>
          {/* Showing the discount (if any) */}
          <Text style={styles.cartTotalText}>Discount</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            - ₹{cart?.discount_total / 100}
          </Text>
        </View>
        <View style={[styles.row, styles.total]}>
          <Text style={styles.cartTotalText}>Total</Text>
          <Text
            style={[
              styles.cartTotalText,
              {
                color: "#4C4C4C",
              },
            ]}
          >
            {/* Calculating the total */}₹
            {cart?.total / 100 - cart?.discount_total / 100}
          </Text>
        </View>
        <View>
          {/* A button to navigate to PlaceOrder screen */}
          <Button
            large={true}
            onPress={() => Actions.PlaceOrder()}
            title={cart?.items?.length > 0 ? "Place Order" : "Empty Cart"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles....
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: widthToDp(90),
    marginTop: 10,
  },
  total: {
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: "#E5E5E5",
    marginBottom: 10,
  },
  cartTotalText: {
    fontSize: widthToDp(4.5),
    color: "#989899",
  },
});
