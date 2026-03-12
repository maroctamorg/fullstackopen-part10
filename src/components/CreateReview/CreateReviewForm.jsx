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
  reviewInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string().optional(),
});

const SignInError = ({ error }) =>
  error ? <Text style={styles.errorText}>{error}</Text> : null;

const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
        style={[
          styles.input,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        placeholder="Repository owner's GitHub username"
        autoCapitalize="none"
      />
      <SignInError
        error={formik.touched.ownerName && formik.errors.ownerName}
      />
      <TextInput
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
        style={[
          styles.input,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        placeholder="Repository name"
        autoCapitalize="none"
      />
      <SignInError
        error={formik.touched.repositoryName && formik.errors.repositoryName}
      />
      <TextInput
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        keyboardType="numeric"
      />
      <SignInError error={formik.touched.rating && formik.errors.rating} />
      <TextInput
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        onBlur={formik.handleBlur("text")}
        style={[styles.input, styles.reviewInput]}
        placeholder="Review"
        multiline
      />
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" style={styles.submitButtonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewForm;
