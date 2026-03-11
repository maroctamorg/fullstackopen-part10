import { useMutation } from "@apollo/client/react";
import { useApolloClient } from "@apollo/client/react";

import useAuthStorage from "./useAuthStorage";
import { AUTHENTICATE } from "../graphql/mutations/authenticate";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password },
      },
    });

    const accessToken = response?.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
