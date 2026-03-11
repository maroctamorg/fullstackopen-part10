import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

import Text from "./Text";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.repositoryItemBackground,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textInputBorder,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonText: {
    color: theme.colors.textContrast,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitButtonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
