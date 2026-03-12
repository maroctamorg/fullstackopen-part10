import { FlatList, Linking, StyleSheet } from "react-native";
import { useParams } from "react-router-native";

import {
  ON_END_REACHED_THRESHOLD_DEFAULT,
  PAGINATION_FIRST_DEFAULT,
} from "../../constants/pagination";
import useReviews from "../../hooks/useReviews";
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
  const { repository, reviews, fetchMore } = useReviews({
    repositoryId: id,
    first: PAGINATION_FIRST_DEFAULT,
  });

  const reviewNodes = reviews?.edges?.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.user.username} />
      )}
      keyExtractor={({ id: reviewId }) => reviewId}
      ListHeaderComponent={
        repository ? <RepositoryInfo repository={repository} /> : null
      }
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={ON_END_REACHED_THRESHOLD_DEFAULT}
    />
  );
};

export default SingleRepository;
