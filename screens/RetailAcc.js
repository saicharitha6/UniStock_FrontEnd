import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import RetailLoginForm from "../components/RetailAccount/RetailAccount";

const RetailAcc = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RetailLoginForm/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

export default RetailAcc;
