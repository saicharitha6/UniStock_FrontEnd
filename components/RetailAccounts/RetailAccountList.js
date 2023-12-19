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

export default function RetailAccountsList({ accountsList }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [addAccount, setAddAccount] = useState(false);

  useEffect(() => {
    console.log(selectedAccount);
  }, [selectedAccount]);

  const handleAccountPress = (account) => {
    // Toggle selection when an account is pressed
    setSelectedAccount((prevSelected) =>
      prevSelected === account ? null : account
    );
  };
  const addAccountHandler = () => {
    setAddAccount(true);
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
            disabled={!isAddAccountEnabled}
            style={styles.addButton}
          />
        </View>
      ) : (
        <Text account={selectedAccount}>Add Account</Text>
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
