import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import theme from "../../theme";
import AppBarTab from "./AppBarTab";
import useAuthStorage from "../../hooks/useAuthStorage";
import { ME } from "../../graphql/queries/me";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  tabsContainer: {
    flexDirection: "row",
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const { data } = useQuery(ME);

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

  const isSignedIn = Boolean(data?.me);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        <AppBarTab to="/" label="Repositories" style={styles.tab} />
        {isSignedIn ? (
          <>
            <AppBarTab
              to="/create-review"
              label="Create a review"
              style={styles.tab}
            />
            <AppBarTab to="/my-reviews" label="My reviews" style={styles.tab} />
            <Pressable onPress={handleSignOut} style={styles.tab}>
              <AppBarTab label="Sign out" />
            </Pressable>
          </>
        ) : (
          <>
            <AppBarTab to="/signin" label="Sign in" style={styles.tab} />
            <AppBarTab to="/signup" label="Sign up" style={styles.tab} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
