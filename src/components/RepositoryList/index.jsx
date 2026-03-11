import { FlatList, StyleSheet } from "react-native";

import RepositoryItem from "../RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const respositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={respositoryNodes}
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
