import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Input from "../Input";
import WelcomeText from "./WelcomeText";
import axios from "axios";
import baseURL from "../../constants/url";
import { Actions } from "react-native-router-flux";

const ResetPasswordVerificationScreen = ({ route }) => {
  const { email, token } = route.params;
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = () => {
    axios
      .post(
        `${baseURL}/store/customers/password-reset`,
        {
          email,
          password: newPassword,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Reset password successful
          const responseData = response.data;
          console.log("Customer ID:", responseData.customer.id);
          Alert.alert("Password Reset", "Password successfully updated.");
          Actions.SignIn();
        } else {
          // Handle specific error codes
          if (response.status === 401) {
            throw new Error("User is not authorized. Must log in first");
          } else if (response.status === 404) {
            throw new Error("Not Found Error");
          } else if (response.status === 422) {
            throw new Error("Invalid Request Error");
          } else {
            throw new Error("Failed to reset password. Please try again.");
          }
        }
      })
      .catch((error) => {
        // Handle other errors
        console.error("Error:", error.message);
        Alert.alert("Error", "Failed to reset password. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Reset Password!</Text>
      </View>
      <Input
        placeholder="Enter your new password"
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleResetPassword}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  touchableOpacity: {
    width: "100%",
  },
});

export default ResetPasswordVerificationScreen;