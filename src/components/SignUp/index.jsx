import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-native";

import { CREATE_USER } from "../../graphql/mutations/createUser";
import useSignIn from "../../hooks/useSignIn";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
