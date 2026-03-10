import { View } from 'react-native';

import Text from '../Text';

const Stat = ({ label, value, formatCount, styles }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold" style={styles.statValue}>
        {formatCount(value)}
      </Text>
      <Text color="textSecondary" style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
};

export default Stat;
