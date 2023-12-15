import { useState } from "react";

// Define the validation function type
const validateValue = (value) => typeof value === "string";

// Define the hook props interface
const useInputProps = {
  validateValue: validateValue,
};

// Define the hook result interface
const useInputResult = {
  value: "",
  isValid: false,
  isTouched: false,
  hasError: false,
  valueChangeHandler: (text) => {},
  validateValueHandler: () => {},
  focusHandler: () => {},
  isFocused: false,
  reset: () => {},
};

// Implement the useInput hook
const useInput = ({ validateValue }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const valueIsValid = validateValue(enteredValue);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (text) => {
    setEnteredValue(text);
    setIsTouched(true);
  };

  const validateValueHandler = () => {
    setIsTouched(true);
    setIsFocused(false);
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    isTouched: isTouched,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    validateValueHandler: validateValueHandler,
    focusHandler: focusHandler,
    isFocused: isFocused,
    reset: reset,
  };
};

export default useInput;
