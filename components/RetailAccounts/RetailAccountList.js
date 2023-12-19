import { useState, useEffect } from "react";
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Header";
import ManageAccounts from "../../screens/ManageAccounts";
import { widthToDp } from "rn-responsive-screen";
import AddAccount from "./AddAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RetailAccountsList({ accountsList }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [addAccount, setAddAccount] = useState(false);
  const [accountsArray, setAccountsArray] = useState([]);
  const [disabledAdd, setDisableAdd] = useState(false);

  useEffect(() => {
    console.log(selectedAccount);
    loadAccounts();
    setDisableAdd(areAllIdsPresent());
  }, [selectedAccount, addAccount]);

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

  const resetAccounts = async () => {
    try {
      await AsyncStorage.clear();
      setAccountsArray([]); // Clear the state as well
      console.log("Accounts data reset");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  // const isAddAccountEnabled = selectedAccount !== null && areAllIdsPresent();

  const areAllIdsPresent = () => {
    const accountListIds = accountsList.map((account) => account.id);
    const accountsArrayIds = accountsArray.map(
      (account) => account.retailsAccountId
    );

    // Check if all ids from accountList are present in accountsArray
    return accountListIds.every((id) => accountsArrayIds.includes(id));
  };

  const handleAccountPress = (account) => {
    // Toggle selection when an account is pressed
    setSelectedAccount((prevSelected) =>
      prevSelected === account ? null : account
    );
  };
  const addAccountHandler = () => {
    setAddAccount(true);
  };
  const selectAccountHandler = () => {
    setAddAccount(false);
  };

  const isAddAccountEnabled = selectedAccount !== null;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Accounts" />
      {!addAccount ? (
        <View style={styles.accounts}>
          <Text style={styles.mainTitle}>Manage Accounts</Text>
          {accountsList.map((account, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => handleAccountPress(account)}
              underlayColor="#DDDDDD"
              style={[
                styles.accountItem,
                selectedAccount === account && styles.selectedItem,
              ]}
            >
              <View>
                <Text>{account.username}</Text>
              </View>
            </TouchableHighlight>
          ))}
          <Button
            title="Add Account"
            onPress={addAccountHandler}
            disabled={disabledAdd || !isAddAccountEnabled}
            style={styles.addButton}
          />
          <View style={styles.addButton}>
            <Button title="reset" onPress={resetAccounts} />
          </View>
        </View>
      ) : (
        <AddAccount
          account={selectedAccount}
          selectAccount={selectAccountHandler}
        >
          Add Account
        </AddAccount>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  accounts: {
    // width: "90%",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  accountItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  selectedItem: {
    backgroundColor: "#EFEFEF", // Add a background color for selected items
  },
  addButton: {
    marginTop: 10,
  },
});
