import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import RetailAccountsList from "../components/RetailAccounts/RetailAccountList";
import dummyData from "../data/retailAccounts.json";

const ManageAccounts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RetailAccountsList accountsList={dummyData} />
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

export default ManageAccounts;
