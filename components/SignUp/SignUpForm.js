import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Button from "../Button";
import useInput from "../hook/use-Input";
import { Actions } from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../Input";
import axios from "axios";
import baseURL from "../../constants/url";
import ErrMessage from "../ErrorMessage";

const SignUpForm = () => {
  const [errMessage, setErrMessage] = useState("");
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    validateValueHandler: validateFirstNameHandler,
    focusHandler: firstNameFocusHandler,
    isFocused: firstNameIsFocused,
    reset: firstNameReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 5,
  });

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    validateValueHandler: validateLastNameHandler,
    focusHandler: lastNameFocusHandler,
    isFocused: lastNameIsFocused,
    reset: lastNameReset,
  } = useInput({
    validateValue: (value) => value.trim().length >= 5,
  });

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
    validateValue: (value) =>
      value.trim().length >= 10 &&
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(value),
    // Password-specific validation
  });

  function endMessage() {
    setErrMessage("");
  }
  const authenticationHandler = async (userData) => {
    return axios({
      method: "post",
      url: `${baseURL}/store/customers`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
        // 'Accept':"*/*"
      },
    });
  };

  const handleSubmit = async () => {
    if (
      firstNameIsValid &&
      lastNameIsValid &&
      emailIsValid &&
      passwordIsValid
    ) {
      // Proceed with user registration
      firstNameReset();
      lastNameReset();
      emailReset();
      passwordReset();

      authenticationHandler({
        first_name: enteredFirstName,
        last_name: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      })
        .then((response) => {
          if (response.data !== undefined) {
            Actions.SignIn();
          } else {
            setErrMessage("Unexpected response structure");
          }
        })
        .catch((err) => {
          const statusCode = err.response.status;
          console.log("status", statusCode);
          console.log("status", err.response.data); 
          if (statusCode === 422) {
            setErrMessage("Email Already Exists");
          } else if (statusCode === 400) {
            setErrMessage("Client Error");
          } else if (statusCode === 404) {
            setErrMessage("Not Found error");
          }
        });
    } else {
      setErrMessage("Invalid Data Entered or Fill all Fields");
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.text}>Quick Sign-Up</Text>
      <TouchableOpacity style={styles.customButton}>
        <Image
          source={require("../../assets/googl.png")}
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Sign up with Google</Text>
      </TouchableOpacity>
      <Text style={styles.text1}>Or use your email address</Text>
      <Input
        style={[firstNameIsFocused && !firstNameIsValid && styles.invalid]}
        placeholder="First Name"
        keyboardType="First-name"
        value={enteredFirstName}
        onChangeText={(text) => firstNameChangeHandler(text)}
        onBlur={validateFirstNameHandler}
        onFocus={firstNameFocusHandler}
        secureTextEntry={false}
      />
      <Input
        style={[lastNameIsFocused && !lastNameIsValid && styles.invalid]}
        placeholder="Last Name"
        keyboardType="last-name"
        value={enteredLastName}
        onChangeText={(text) => lastNameChangeHandler(text)}
        onBlur={validateLastNameHandler}
        onFocus={lastNameFocusHandler}
        secureTextEntry={false}
      />
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
      <Text style={styles.text1}>
        Use at least one symbol, one numeric, and ten characters
      </Text>
      <Button
        title="Sign Up for Unistock"
        onPress={handleSubmit}
        style={styles.button}
        textSize={18}
      />
    
       <ErrMessage  style={styles.signUpText} type="authentication" text={errMessage} onEnd={endMessage} />
    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop:0,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  customButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
  text1: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
    alignItems: "center",
    // Add any styles needed for the red blinking effect
  },

  button: {
    width: "70%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:20
  },

  signUpText: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent:'flex-end'
  },
  invalid: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
    marginBottom: 10,
  },
  signUpText: {
    flexDirection: "col",
    marginTop: 40,
  }
});

export default SignUpForm;
