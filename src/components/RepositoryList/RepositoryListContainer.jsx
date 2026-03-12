import { FlatList, StyleSheet } from "react-native";

import RepositoryItem from "../RepositoryItem";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryListContainer;
