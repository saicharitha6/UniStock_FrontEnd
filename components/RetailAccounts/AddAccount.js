import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../Input";

const AddAccount = ({ account, selectAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountsArray, setAccountsArray] = useState([]);

  useEffect(() => {
    // Load accounts from AsyncStorage when the component mounts
    loadAccounts();
    console.log("account", accountsArray);
  }, []);

  const loadAccounts = async () => {
    try {
      const storedAccounts = await AsyncStorage.getItem("accounts");
      if (storedAccounts) {
        setAccountsArray(JSON.parse(storedAccounts));
      }
    } catch (error) {
      console.error("Error loading accounts:", error);
    }
  };

  const saveAccounts = async (newAccounts) => {
    try {
      await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));
    } catch (error) {
      console.error("Error saving accounts:", error);
    }
  };

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
        retailsAccountId: account.id,
        username: username,
        password: password,
      };

      // Update the state with the new account
      setAccountsArray((prevAccounts) => [...prevAccounts, newAccount]);

      // Save the updated accounts to AsyncStorage
      saveAccounts([...accountsArray, newAccount]);

      console.log("Updated Accounts Array:", accountsArray);
      // Perform further actions with the accountsArray
      Alert.alert("Added Account");
      selectAccount();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Add Account</Text>
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
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
});

export default AddAccount;
