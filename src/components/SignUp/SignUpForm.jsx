import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";

import theme from "../../theme";
import Text from "../Text";

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
  inputError: {
    borderColor: theme.colors.error,
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
  errorText: {
    color: theme.colors.error,
    marginBottom: 8,
  },
});

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be between 5 and 30 characters")
    .max(30, "Username must be between 5 and 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be between 5 and 50 characters")
    .max(50, "Password must be between 5 and 50 characters"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password confirmation must match password",
    )
    .required("Password confirmation is required"),
});

const FieldError = ({ error }) =>
  error ? <Text style={styles.errorText}>{error}</Text> : null;

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        autoCapitalize="none"
      />
      <FieldError error={formik.touched.username && formik.errors.username} />
      <TextInput
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
      />
      <FieldError error={formik.touched.password && formik.errors.password} />
      <TextInput
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        placeholder="Password confirmation"
        secureTextEntry
      />
      <FieldError
        error={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitButtonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
