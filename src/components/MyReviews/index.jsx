import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import { DELETE_REVIEW } from "../../graphql/mutations/deleteReview";
import theme from "../../theme";
import { ME } from "../../graphql/queries/me";
import ReviewItem from "../ReviewItem";
import ItemSeparator from "../RepositoryList/ItemSeparator";
import Text from "../Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  emptyContainer: {
    padding: 16,
    margin: 12,
    borderRadius: 4,
    backgroundColor: theme.colors.repositoryItemBackground,
    alignItems: "center",
  },
  emptyText: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: theme.colors.textContrast,
  },
});

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) || [];

  const emptyState = (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>You have no reviews yet.</Text>
      <Pressable
        onPress={() => navigate("/create-review")}
        style={styles.button}
      >
        <Text fontWeight="bold" style={styles.buttonText}>
          Create your first review
        </Text>
      </Pressable>
    </View>
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
              await refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          title={item.repository.fullName}
          showActions
          onViewRepository={() =>
            navigate(`/repositories/${item.repository.id}`)
          }
          onDeleteReview={() => handleDelete(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      ListEmptyComponent={emptyState}
    />
  );
};

export default MyReviews;
