import { FlatList, Linking, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-native";

import { GET_REPOSITORY } from "../../graphql/queries/repository";
import RepositoryItem from "../RepositoryItem";
import ReviewItem from "../ReviewItem";
import ItemSeparator from "../RepositoryList/ItemSeparator";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem
    item={repository}
    showGitHubButton
    onOpenGitHub={() => Linking.openURL(repository.url)}
  />
);

const SingleRepository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository;
  const reviews = repository?.reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.user.username} />
      )}
      keyExtractor={({ id: reviewId }) => reviewId}
      ListHeaderComponent={
        repository ? <RepositoryInfo repository={repository} /> : null
      }
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
    />
  );
};

export default SingleRepository;
