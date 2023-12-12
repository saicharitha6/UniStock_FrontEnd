import { ScrollView, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { widthToDp } from "rn-responsive-screen";
import axios from "axios";
import Header from "../components/Header";
import { Actions } from "react-native-router-flux";
import baseURL from "../constants/url";
import { Feather } from "@expo/vector-icons";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  function fetchProducts() {
    axios.get(`${baseURL}/store/products`).then((res) => {
      if (res.data.products.length > 0) setProducts(res.data.products);
    });
  }

  function searchFilterFunction(text) {
    let searchQuery = {
      "q" : text
     };
     setSearch(text);
    axios({
      method: 'post',
      url: `${baseURL}/store/products/search`,
      data: searchQuery, 
      headers: {
      'Content-Type': 'application/json'
      }, 
    }).then((res) => {
      setProducts(res.data.hits);
    }); 
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <View style={styles.container}>
      <Header title="Medusa's Store" />
      <View
        style={styles.searchBar}
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          onChangeText={(text) => searchFilterFunction(text)}
        />
      </View>
      <ScrollView>
        <View style={styles.products}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => Actions.ProductInfo({ productId: product.id })}
            >
              <ProductCard product={product} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addToCart}>
        <Feather
          name="shopping-cart"
          size={24}
          color="white"
          onPress={() => Actions.cart()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  products: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: widthToDp(100),
    paddingHorizontal: widthToDp(4),
    justifyContent: "space-between",
  },
  addToCart: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: "#C37AFF",
    width: widthToDp(12),
    height: widthToDp(12),
    borderRadius: widthToDp(10),
    alignItems: "center",
    padding: widthToDp(2),
    justifyContent: "center",
  },
  searchBar:{
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    shadowColor: "#000",
    borderRadius: 10,
    marginBottom: "4px",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 5,
    padding: 10,
    backgroundColor: "#fff",
  }
});
