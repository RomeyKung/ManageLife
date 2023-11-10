import * as React from "react";
import { DataTable, IconButton } from "react-native-paper";

const Inventory = () => {
  const [items, setItems] = React.useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);


  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const handleDelete = (key) => {
    const updatedItems = items.filter((item) => item.key !== key);
    setItems(updatedItems);
  };

  const handleEdit = (key) => {
    console.log(`Edit item with key ${key}`);
  };

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{width:100}}>Name</DataTable.Title>
        <DataTable.Title>Calories</DataTable.Title>
        <DataTable.Title>Fat</DataTable.Title>
        <DataTable.Title>Edit</DataTable.Title>
        <DataTable.Title>Delete</DataTable.Title>
      </DataTable.Header>

      {items.map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell >{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.calories}</DataTable.Cell>
          <DataTable.Cell>{item.fat}</DataTable.Cell>
          <DataTable.Cell>
            <IconButton icon="pencil" onPress={() => handleEdit(item.key)} />
          </DataTable.Cell>
          <DataTable.Cell>
            <IconButton icon="delete" onPress={() => handleDelete(item.key)} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Add your add button here */}
      {/* <Button title="Add Item" onPress={() => handleAdd()} /> */}

      {/* <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      /> */}
    </DataTable>
  );
};

export default Inventory;
