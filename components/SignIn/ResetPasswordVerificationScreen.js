import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from "react-native";
import baseURL from "../../constants/url";
import Input from "../Input";
import WelcomeText from "./WelcomeText";
import { Actions } from "react-native-router-flux";

const ResetPasswordVerificationScreen = () => {
  // const { email } = route.params;
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      // Perform the API request to reset password
      const response = await fetch(
        `${baseURL}/store/customers/password-reset`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: newPassword,
            token,
          }),
        }
      );

      if (response.ok) {
        // Reset password successful
        const responseData = await response.json();
        console.log("Customer ID:", responseData.customer.id);
        Alert.alert("Password Reset", "Password successfully updated.");
        Actions.SignIn();
      } else {
        // Reset password failed
        Alert.alert("Error", "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Reset Password!</Text>
      </View>
      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Enter the token from your email"
        value={token}
        onChangeText={(text) => setToken(text)}
      />
      <Input
        placeholder="Enter your new password"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleResetPassword}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request Password Reset</Text>
        </View>
      </TouchableOpacity>
      {/* <Button title="Reset Password" onPress={handleResetPassword} /> */}
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
    width: "100%",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    // padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});

export default ResetPasswordVerificationScreen;
