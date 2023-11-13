import * as React from "react";
import {
  DataTable,
  IconButton,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import axios from "axios";
import { getAuth } from "firebase/auth";
const Inventory = () => {
  const user = FIREBASE_AUTH.currentUser.uid;
  const [items, setItems] = React.useState([]);
  const auth = getAuth()
  const ip = "192.168.1.130"
  const [toggleModal, setToggleModal] = React.useState(false);
  const [modalItem, setModalItem] = React.useState({});
  const [addState, setAddState] = React.useState(false);

  const handleDelete = async (item) => {
    const response = await axios.delete(
      `http://${ip}:8082/inventory-service/inventory`,
      {
        data: {
          _id: item._id,
          userId: item.userId,
          itemName: item.itemName,
          amount: item.amount,
          expired: item.expired,
          itemId: item.itemId
        },
      }
    )
    getItems()
  };
  React.useEffect(() => {
    getItems()

  }, [])

  const getItems = async () => {
    try {
      const response = await axios.get(
        `http://${ip}:8082/inventory-service/inventory/${auth.currentUser.uid}`)
      setItems(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (item) => {

    setModalItem({ ...item, delete: false });
    setToggleModal(true);
  };

  const handleAdd = () => {
    setToggleModal(true);
  };

  const handleSave = async (modalItem) => {
    console.log(modalItem)
    // const item = axios.put("");
    if (addState == true) {
      const requestData = {
        userId: auth.currentUser.uid,
        itemName: modalItem.itemName,
        amount: modalItem.amount,
        expired: modalItem.expired
      };

      try {
        const response = await axios.post(
          `http://${ip}:8082/inventory-service/inventory`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        setAddState(false)
        getItems();

      } catch (error) {
        console.error(error);
      }
    } else {
      const requestData = {
        _id: modalItem._id,
        userId: modalItem.userId,
        itemName: modalItem.itemName,
        amount: modalItem.amount,
        expired: modalItem.expired,
        itemId: modalItem.itemId
      };
      const response = await axios.put(
        `http://${ip}:8082/inventory-service/inventory`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      setAddState(false)
      getItems();
    }
    setModalItem({})
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
              <View style={{flexDirection:'row'}}> 
                <IconButton icon="pencil" onPress={() => handleEdit(item)} />
                <IconButton icon="delete" onPress={() => handleDelete(item)} />
              </View>             
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        {/* Add your add button here */}
        <TouchableOpacity
          onPress={() => { handleAdd(), setAddState(true), setModalItem({}) }}
          style={{
            backgroundColor: '#3498db',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            alignItems: 'center',
            margin:50
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>New Item</Text>
        </TouchableOpacity>

        <Portal>
          <Modal
            visible={toggleModal}
            onDismiss={() => { setToggleModal(false), setModalItem({}), setAddState(false) }}
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
