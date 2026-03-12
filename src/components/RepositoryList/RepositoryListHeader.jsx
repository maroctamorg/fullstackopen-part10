import { StyleSheet, TextInput, View } from "react-native";

import theme from "../../theme";
import SelectMenu from "../SelectMenu";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  input: {
    backgroundColor: theme.colors.repositoryItemBackground,
    borderWidth: 1,
    borderColor: theme.colors.textInputBorder,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
  },
  dropdownWrapper: {
    alignSelf: "stretch",
  },
  sortButton: {
    borderColor: theme.colors.textInputBorder,
    borderRadius: 4,
  },
  menuContent: {
    backgroundColor: theme.colors.repositoryItemBackground,
  },
});

const orderOptions = [
  { value: "latest", label: "Latest" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  selectedOrder,
  setSelectedOrder,
}) => {
  const canShowSorting = selectedOrder && setSelectedOrder;

  return (
    <View style={styles.container}>
      <TextInput
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        placeholder="Search repositories"
        style={styles.input}
      />
      {canShowSorting ? (
        <View style={styles.dropdownWrapper}>
          <SelectMenu
            labelPrefix="Order by"
            value={selectedOrder}
            options={orderOptions}
            onSelect={setSelectedOrder}
            buttonStyle={styles.sortButton}
            contentStyle={styles.menuContent}
          />
        </View>
      ) : null}
    </View>
  );
};

export default RepositoryListHeader;
