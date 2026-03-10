import { StyleSheet, View } from 'react-native';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
  content: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.content}>
        <RepositoryList />
      </View>
    </View>
  );
};

export default Main;