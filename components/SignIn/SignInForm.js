import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Button from "../Button";
import useInput from "../../hooks/use-Input";
import WelcomeText from "./WelcomeText";
import Input from "../Input";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import baseURL from "../../constants/url";

const SignInForm = () => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    validateValueHandler: validateEmailHandler,
    focusHandler: emailFocusHandler,
    isFocused: emailIsFocused,
    reset: emailReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 3 && value.includes("@"),
  });
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordIsInvalid,
    valueChangeHandler: passwordChangeHandler,
    validateValueHandler: validatePasswordHandler,
    focusHandler: passwordFocusHandler,
    isFocused: passwordIsFocused,
    reset: passwordReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 8,
  });

  function authenticationHandler(loginData) {
    return axios({
      method: "post",
      url: `${baseURL}/store/auth`,
      data: loginData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const handleSubmit = () => {
    if (emailIsValid && passwordIsValid) {
      console.log("email , password", enteredEmail, enteredPassword);
      emailReset();
      passwordReset();

      authenticationHandler({
        email: enteredEmail,
        password: enteredPassword,
      })
        .then((res) => {
          // Authentication success
          if (res.data !== undefined) {
            // axios.get(`${baseURL}/store/auth`).then((res) => {
            //   console.log("We have authenticated->", res.data);
            // });
            Alert.alert("Login successful");
            console.log("Response ->", res.data);
            Actions.products();
          } else {
            console.log("Unexpected response structure");
          }
        })
        .catch((err) => {
          // Authentication failure
          console.log(
            "Error ->",
            err.response ? err.response.data : err.message
          );
          Alert.alert("Invalid Credentials");
        });
    } else {
      Alert.alert("Invalid Credentials");
    }
  };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <Input
        style={[emailIsFocused && !emailIsValid && styles.invalid]}
        placeholder="Email"
        keyboardType="email-address"
        value={enteredEmail}
        onChangeText={(text) => emailChangeHandler(text)}
        onBlur={validateEmailHandler}
        onFocus={emailFocusHandler}
        secureTextEntry={false}
      />
      <Input
        style={[passwordIsFocused && !passwordIsValid && styles.invalid]}
        placeholder="Password"
        secureTextEntry
        value={enteredPassword}
        onChangeText={(text) => passwordChangeHandler(text)}
        onBlur={validatePasswordHandler}
        onFocus={passwordFocusHandler}
      />
      <View style={styles.forgetPasswordContainer}>
        <Text style={styles.forgetPassword}>Forget password</Text>
      </View>
      <Button title="Login" onPress={handleSubmit} textSize={18} />
      <View style={styles.signUpText}>
        <Text>Don't have an account? </Text>
        <Text style={styles.link}>Sign Up</Text>
      </View>
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
  // input: {
  //   width: "100%",
  //   padding: 10,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   marginBottom: 10,
  // },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    // marginTop: 20,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  forgetPasswordContainer: {
    alignSelf: "flex-end", // Align to the left
  },
  forgetPassword: {
    color: "red",
    textDecorationLine: "underline",
    padding: 10,
  },
  signUpText: {
    flexDirection: "row",
    margin: 40,
  },
  invalid: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 10,
  },
});

export default SignInForm;
