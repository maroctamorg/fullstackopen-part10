import { Image, StyleSheet, View } from 'react-native';

import theme from '../../theme';
import Text from '../Text';
import Stat from './Stat';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 6,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: theme.colors.textContrast,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return String(count);
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.details}>
          <Text fontSize="subheading" fontWeight="bold" style={styles.fullName}>
            {item.fullName}
          </Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={item.stargazersCount} formatCount={formatCount} styles={styles} />
        <Stat label="Forks" value={item.forksCount} formatCount={formatCount} styles={styles} />
        <Stat label="Reviews" value={item.reviewCount} formatCount={formatCount} styles={styles} />
        <Stat label="Rating" value={item.ratingAverage} formatCount={formatCount} styles={styles} />
      </View>
    </View>
  );
};

export default RepositoryItem;
