import React, { useState } from "react";
import { View, Text,StyleSheet, TextInput, Button, Alert } from "react-native";
import useInput from "../../hooks/use-Input";
import Input from "../Input";

const RetailAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const existingAccounts = [
    { id: "1", username: "john_doe", password: "password123" },
    { id: "2", username: "jane_doe", password: "securepassword" },
    // Add more existing accounts as needed
  ];

  const validateForm = () => {
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Validation Error", "Username and password are required.");
      return false;
    }
    return true;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      const newAccount = {
        id: Math.random().toString(),
        username: username,
        password: password,
      };

      const accountsArray = [...existingAccounts, newAccount];

      console.log("Updated Accounts Array:", accountsArray);
      // Perform further actions with the accountsArray
      Alert.alert("Added Account");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Username:</Text> */}
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Retail Account</Text>
      </View>
      <Input
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Enter your username"
      />
     
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Add Account" onPress={handleSignIn} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 80,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

});

export default RetailAccount;