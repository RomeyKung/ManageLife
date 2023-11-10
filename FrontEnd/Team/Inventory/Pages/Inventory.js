import * as React from "react";
import {
  DataTable,
  IconButton,
  Modal,
  Portal,
  Button,
  TextInput,
} from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import axios from "axios";

const Inventory = () => {
  const user = FIREBASE_AUTH.currentUser.uid;
  const [items, setItems] = React.useState([
    {
      _id: "1", //from mongo
      itemId: "1", //use this id to find the item in mongo
      itemName: "Chicken meat",
      amount: "35 kg",
      expired: "16 May 2023",
    },
  ]);

  //modal
  const [toggleModal, setToggleModal] = React.useState(false);
  const [modalItem, setModalItem] = React.useState({});
  const handleDelete = (item) => {
    console.log("delete");
    setModalItem({ ...item, delete: true });
    setToggleModal(true);
  };

  const handleEdit = (item) => {
    console.log("edit");
    setModalItem({ ...item, delete: false });
    setToggleModal(true);
  };

  const handleAdd = () => {
    // const itemId = axios.post("");
    // const item = axios.get(""); //get item from mongo
  };

  const handleSave = (modalItem) => {
    // const item = axios.put("");
    console.log("send");
    setToggleModal(false);
  };
  const handleDeleteDB = (modalItem) => {
    // const item = axios.put("");
    console.log("send");
    setToggleModal(false);
  };

  //////////modal
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.nameHeaderStyle}>Name</DataTable.Title>
          <DataTable.Title style={styles.headerStyle}>amount</DataTable.Title>
          <DataTable.Title style={styles.headerStyle}>exp</DataTable.Title>
          <DataTable.Title style={styles.headerStyle}>Action</DataTable.Title>
        </DataTable.Header>
        {items.map((item) => (
          // console.log(item)
          <DataTable.Row key={item.itemId}>
            <DataTable.Cell style={styles.nameStyle}>
              {item.itemName}
            </DataTable.Cell>
            <DataTable.Cell style={styles.center}>{item.amount}</DataTable.Cell>
            <DataTable.Cell style={styles.center}>
              {item.expired}
            </DataTable.Cell>
            <DataTable.Cell style={[styles.center]}>
              <IconButton icon="pencil" onPress={() => handleEdit(item)} />
              <IconButton icon="delete" onPress={() => handleDelete(item)} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        {/* Add your add button here */}
        <Button title="Add Item" onPress={() => handleAdd()} />
        <Portal>
          <Modal
            visible={toggleModal}
            onDismiss={() => setToggleModal(false)}
            contentContainerStyle={containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
            <TextInput
              label="Name"
              value={modalItem.itemName}
              onChangeText={(text) =>
                setModalItem({ ...modalItem, itemName: text })
              }
            />
            <TextInput
              label="Amount"
              value={modalItem.amount}
              onChangeText={(text) =>
                setModalItem({ ...modalItem, amount: text })
              }
            />
            <TextInput
              label="Expired"
              value={modalItem.expired}
              onChangeText={(text) =>
                setModalItem({ ...modalItem, expired: text })
              }
            />
            <View style={{ height: 50, flexDirection: "row" }}>
              {!modalItem.delete ? (
                <Button title="Save" onPress={() => handleSave(modalItem)}>
                  Save
                </Button>
              ) : (
                <Button
                  title="Delete"
                  onPress={() => handleDeleteDB(modalItem)}
                >
                  Delete
                </Button>
              )}
              <Button title="Cancel" onPress={() => setToggleModal(false)}>
                Cancel
              </Button>
            </View>
          </Modal>
        </Portal>
      </DataTable>
    </View>
  );
};

export default Inventory;

styles = StyleSheet.create({
  headerStyle: {
    flex: 2,
    borderColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameHeaderStyle: {
    flex: 2,
    borderColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
