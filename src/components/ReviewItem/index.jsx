import { Pressable, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import theme from "../../theme";
import Text from "../Text";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  date: {
    marginTop: 4,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  actionText: {
    color: theme.colors.textContrast,
  },
});

const formatDate = (createdAt) => {
  return format(new Date(createdAt), "d.M.yyyy");
};

const ReviewItem = ({
  review,
  title,
  showActions,
  onViewRepository,
  onDeleteReview,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold">{title}</Text>
        <Text color="textSecondary" style={styles.date}>
          {formatDate(review.createdAt)}
        </Text>
        {review.text ? <Text>{review.text}</Text> : null}
        {showActions ? (
          <View style={styles.actionsRow}>
            <Pressable onPress={onViewRepository} style={styles.actionButton}>
              <Text fontWeight="bold" style={styles.actionText}>
                View repository
              </Text>
            </Pressable>
            <Pressable
              onPress={onDeleteReview}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <Text fontWeight="bold" style={styles.actionText}>
                Delete review
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ReviewItem;
