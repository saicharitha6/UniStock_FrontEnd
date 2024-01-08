import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Button from "../Button";
import useInput from "../../hooks/use-Input";
import WelcomeText from "./WelcomeText";
import Input from "../Input";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import baseURL from "../../constants/url";
import ErrMessage from "../ErrorMessage";

const RequestPasswordResetScreen = () => {
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
  
  function endMessage() {
    setErrMessage("");
  }

  function resetAll() {
    emailReset();
  }

  const handleRequestPasswordReset = () => {
    if (!enteredEmail || !emailIsValid) {
      // Handle the case where the email is not entered or is not valid
      setErrMessage("Please enter a valid email address");
      return;
    }
  
    fetch(`${baseURL}/store/customers/password-token`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then(response => {
        if (response.ok) {
          // Request successful, navigate to the verification screen
          return response.json();
        } else if (response.status === 401) {
          throw new Error('User is not authorized. Must log in first');
        } else if (response.status === 404) {
          throw new Error('Email not found');
        } else {
          throw new Error('Failed to request password reset. Please try again.');
        }
      })
      .then(data => {
        // Handle the data if needed
        Actions.ResetPasswordVerification({ email });
      })
      .catch(error => {
        // Handle errors
        endMessage(); // clear error message
        console.error('Error:', error.message);
      });
  };
  

  // const handleSubmit = () => {
  //   setLoading(true); // Set loading to true before making the request

  //   if (emailIsValid) {
  //     authenticationHandler({
  //       email: enteredEmail,
  //     })
  //       .then((res) => {
  //         setLoading(false); // Set loading to false after successful request

  //         if (res.data !== undefined) {
  //           Actions.products();
  //         } else {
  //           setErrMessage("Unexpected response structure");
  //           resetAll();
  //         }
  //       })
  //       .catch((err) => {
  //         setLoading(false); // Set loading to false after failed request

  //         const statusCode = err.response.status;

  //         if (statusCode === 401) {
  //           setLoading(true);
  //           axios.get(`${baseURL}/store/auth/${enteredEmail}`).then((res) => {
  //             setLoading(false);
  //             if (res.data.exists) {
  //               passwordReset();
  //               setErrMessage("Incorrect password");
  //             } else {
  //               resetAll();
  //               setErrMessage("Invalid credentials.");
  //             }
  //           });
  //         } else if (statusCode === 400) {
  //           setErrMessage("Invalid data");
  //           resetAll();
  //         }
  //       });
  //   } else {
  //     setLoading(false); // Set loading to false if validation fails
  //     setErrMessage("Invalid data");
  //     resetAll();
  //   }
  // };

  return (
    <View style={styles.container}>
      <WelcomeText />
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Forget Password!</Text>
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
     
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
  
      <TouchableOpacity style={styles.touchableOpacity} onPress={handleRequestPasswordReset}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Request Password Reset</Text>
        </View>
      </TouchableOpacity>
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
    width: "100%",
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
    padding: 10,
    textAlign: "center",
  },
  touchableOpacity: {
    width: "100%",
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

export default RequestPasswordResetScreen;
