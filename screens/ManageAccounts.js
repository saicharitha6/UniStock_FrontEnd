import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import RetailAccountsList from "../components/RetailAccounts/RetailAccountList";
const dummyData = [
  {
    id: "ret_34j345-345nj-345nj34-nj34",
    username: "WonderSoft Acc",
    customer_id: "cus_123e4567-e89b-12d3-a456-426614174001",
  },
  {
    id: "ret_78h823-83248n-8h237-98347-9838",
    username: "RailySoft Acc",
    customer_id: "cus_123e4567-e89b-12d3-a456-426614174001",
  },
];

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
