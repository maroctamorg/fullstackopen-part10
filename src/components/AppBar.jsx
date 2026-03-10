import { Pressable, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

const AppBarTab = ({ label }) => {
  return (
    <Pressable style={styles.tab}>
      <Text fontWeight="bold" style={{ color: theme.colors.textContrast }}>
        {label}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" />
    </View>
  );
};

export default AppBar;