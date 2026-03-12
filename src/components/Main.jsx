import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import CreateReview from "./CreateReview";
import MyReviews from "./MyReviews";
import RepositoryList from "./RepositoryList";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import theme from "../theme";

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
