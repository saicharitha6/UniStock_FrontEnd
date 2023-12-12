import React from "react";
import { View, Text } from "react-native";
import SignInForm from "../components/SignIn/SignInForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const SignIn = () => {
  //   const handleSubmit = ({ email, password, onReset }) => {
  //     // Handle sign in logic with email and password
  //     console.log("email , password", email, password);
  //     onReset;
  //   };

  return (
    <SafeAreaView style={styles.container}>
      <SignInForm />
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

export default SignIn;
