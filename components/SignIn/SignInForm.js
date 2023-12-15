import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Button from "../Button";
import useInput from "../../hooks/use-Input";
import WelcomeText from "./WelcomeText";
import Input from "../Input";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import baseURL from "../../constants/url";
import ErrMessage from "../ErrorMessage";

const SignInForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
  function endMessage() {
    setErrMessage("");
  }

  const handleSubmit = () => {
    setLoading(true); // Set loading to true before making the request

    if (emailIsValid && passwordIsValid) {
      authenticationHandler({
        email: enteredEmail,
        password: enteredPassword,
      })
        .then((res) => {
          setLoading(false); // Set loading to false after successful request

          if (res.data !== undefined) {
            Actions.products();
          } else {
            setErrMessage("Unexpected response structure");
            emailReset();
            passwordReset();
          }
        })
        .catch((err) => {
          setLoading(false); // Set loading to false after failed request

          const statusCode = err.response.status;
          console.log("status", statusCode);
          console.log("status", err.response.data);

          if (statusCode === 401) {
            axios.get(`${baseURL}/store/auth/${enteredEmail}`).then((res) => {
              console.log("Email->", res.data.exists);
              if (res.data.exists) {
                passwordReset();
                setErrMessage("Incorrect password");
              } else {
                emailReset();
                passwordReset();
                setErrMessage("Invalid credentials.");
              }
            });
          } else if (statusCode === 400) {
            setErrMessage("Invalid data");
            emailReset();
            passwordReset();
          }
        });
    } else {
      setLoading(false); // Set loading to false if validation fails
      setErrMessage("Invalid data");
      emailReset();
      passwordReset();
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
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <View style={styles.forgetPasswordContainer}>
        <Text style={styles.forgetPassword}>Forget password</Text>
      </View>
      <Button
        title="Login"
        onPress={handleSubmit}
        textSize={18}
        style={styles.button}
      />
      <View style={styles.signUpText}>
        <Text>Don't have an account? </Text>
        <Text style={styles.link} onPress={() => Actions.SignUp()}>
          Sign Up
        </Text>
      </View>
      <ErrMessage type="authentication" text={errMessage} onEnd={endMessage} />
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
