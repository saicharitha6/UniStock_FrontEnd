import { Router, Scene, Stack } from "react-native-router-flux";
import Products from "./screens/Products";
import ProductInfo from "./screens/ProductInfo";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import axios from "axios";
import baseURL from "./constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./screens/SignIn";
import Orders from "./components/Orders/Orders";
import PlaceOrder from "./screens/PlaceOrder";
import SignUp from "./screens/SignUp";
import ManageAccounts from "./screens/ManageAccounts";

export default function App() {
  const getCartId = async () => {
    await axios.post(`${baseURL}/store/carts`).then((res) => {
      AsyncStorage.setItem("cart_id", res.data.cart.id);
    });
  };
  const checkCartId = async () => {
    const cartId = await AsyncStorage.getItem("cart_id");

    if (cartId) {
      await axios
        .post(`${baseURL}/store/carts/${cartId}`)
        .then((res) => {
          if (res.data.cart.completed_at) {
            AsyncStorage.removeItem("cart_id");
            getCartId();
          } else {
            AsyncStorage.setItem("cart_id", res.data.cart.id);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          if (error.response.status == 500) {
            AsyncStorage.removeItem("cart_id");
            getCartId();
          }
        });
    }
    if (!cartId) {
      getCartId();
    }
  };

  useEffect(() => {
    checkCartId();
  }, []);

  return (
    <PaperProvider>
      <Router>
        <Stack key="root">
          <Scene key="SignIn" component={SignIn} hideNavBar />
          <Scene key="SignUp" component={SignUp} hideNavBar />
          <Scene key="products" component={Products} hideNavBar />
          <Scene key="ProductInfo" component={ProductInfo} hideNavBar />
          <Scene key="cart" component={Cart} hideNavBar />
          <Scene key="orders" component={Orders} hideNavBar />
          <Scene key="PlaceOrder" component={PlaceOrder} hideNavBar />
          <Scene key="ManageAccounts" component={ManageAccounts} hideNavBar />
          {/* <Scene key="checkout" component={Checkout} hideNavBar /> */}
        </Stack>
      </Router>
    </PaperProvider>
  );
}
