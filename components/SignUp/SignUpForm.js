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
import Input from "../Input";
import axios from "axios";
import baseURL from "../../constants/url";

const SignUpForm = () => {
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

  const authenticationHandler = async (userData) => {
    try {
      const response = await axios.post(`${baseURL}/store/customers`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      if (firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
        console.log(
          "firstName, lastName, email , password",
          enteredFirstName,
          enteredLastName,
          enteredEmail,
          enteredPassword
        );

        firstNameReset();
        lastNameReset();
        emailReset();
        passwordReset();

        const response = await authenticationHandler({
          firstName: enteredFirstName,
          lastName: enteredLastName,
          email: enteredEmail,
          password: enteredPassword,
        });

        Alert.alert("Successfully Signed Up");
        console.log("Response ->", response);
        // Navigate or perform other actions as needed
      } else {
        Alert.alert("Invalid Data Entered or Fill all Fields");
      }
    } catch (error) {
      console.error("Error ->", error.response ? error.response.data : error.message);
      Alert.alert("Invalid Data Entered or Fill all Fields");
    }
  };


    // if (
    //   firstNameIsValid &&
    //   lastNameIsValid &&
    //   emailIsValid &&
    //   passwordIsValid
    // ) {
    //   console.log(
    //     "firstName, lastName, email , password",
    //     enteredFirstName,
    //     enteredLastName,
    //     enteredEmail,
    //     enteredPassword
    //   );
    //   emailReset();
    //   passwordReset();
    //   lastNameReset();
    //   firstNameReset();
    //   Alert.alert("Successfully Signed Up");
    // } else {
    //   Alert.alert("Invalid Data Entered or Fill all Fields");
    // }


  return (
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
        style={[
          // styles.input,
          // (passwordIsFocused || passwordIsValid) && styles.input,
          passwordIsFocused && !passwordIsValid && styles.invalid,
        ]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 20,
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
  // input: {
  //   width: "100%",
  //   padding: 10,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   marginBottom: 10,
  // },
  button: {
    width: "70%",
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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

export default SignUpForm;
