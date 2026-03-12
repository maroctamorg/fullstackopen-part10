import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

import RepositoryItem from "../RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListContainer = ({
  repositories,
  onRepositoryPress,
  searchKeyword,
  setSearchKeyword,
  selectedOrder,
  setSelectedOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const listHeader = (
    <RepositoryListHeader
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={listHeader}
    />
  );
};

export default RepositoryListContainer;
