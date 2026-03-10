import { ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

const AppBarTab = ({ to, label }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text fontWeight="bold" style={{ color: theme.colors.textContrast }}>
        {label}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
        <AppBarTab to="/" label="Repositories" />
        <AppBarTab to="/signin" label="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;