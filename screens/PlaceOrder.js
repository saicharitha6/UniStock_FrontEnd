import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { heightToDp, width, widthToDp } from "rn-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from '../components/Header';
import Button from "../components/Button";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from '../constants/url';


const PlaceOrder = () => {

  useEffect(() => {
    // Calling the fetchCart function when the component mounts
    setPaymentSession();

  }, []);
  const getCartId = () => {
    axios.post(`${baseURL}/store/carts`).then((res) => {
      AsyncStorage.setItem("cart_id", res.data.cart.id);
    });
  };
  const setPaymentSession = async () =>  {
    const cartId = await AsyncStorage.getItem("cart_id");
    const existing_order_cartIds = await AsyncStorage.getItem("orders_cart_id");
  
    axios({
      method: "post",
      url: `${baseURL}/store/carts/${cartId}/payment-sessions`,
      body: JSON.stringify({provider_id: "manual"}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res)=>{
      axios.post(baseURL + "/store/carts/" + cartId + "/complete").then(async (res)=>{
        let orders_cartIds=[];
        
        if(existing_order_cartIds != null){
          orders_cartIds = JSON.parse(existing_order_cartIds);
        }
        orders_cartIds.push(cartId);
        await AsyncStorage.setItem("orders_cart_id", JSON.stringify(orders_cartIds));
        getCartId();
      }).catch((error) => {
        
          console.error('Error:', error.message);
       
      });
    }).catch((error) => {
     
        console.error('Error:', error.message);
     
    });
  }

  return (
    // SafeAreaView is used to avoid the notch on the phone
    <SafeAreaView style={[styles.container]}>
      {/* SchrollView is used in order to scroll the content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Using the reusable header component */}
        <Header title="Order Successfull" isVisible={false} />
            <View style={styles.messageContainer}>
                <Image
                    source={{
                    uri: "data:image/png;base64,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"
                    }}
                    style={styles.image}
                />
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Thank You!</Text>
                    <Text style={styles.message}>Your order has been placed successfully.</Text>
                </View>

                <View style={styles.buttonContainer}>
                <Button
                    // large={true}
                    onPress={() => Actions.orders()}
                    title={"My Orders"}
                    style={styles.button}
                />
                 <Button
                    // large={true}
                    onPress={() => Actions.products()}
                    title={"Home"}
                    style={styles.button}
                />
                </View>
               
            </View>
        
      </ScrollView>  
      
    </SafeAreaView>
    
  );
};


// Styles....
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
      image: {
        height: 60,
        width:60,
        borderRadius: 7,
        margin:10 ,
      },
      message: {
        fontSize: widthToDp(5),
        fontWeight: "bold",
      },
      messageContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: heightToDp(3),
      },
      button: {
        padding: 8,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: heightToDp(3),
      },
   
  });

export default PlaceOrder;
