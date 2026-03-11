import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";
import { SetContextLink } from "@apollo/client/link/context";

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: Constants.expoConfig.extra.apolloUri,
  });

  const authLink = new SetContextLink(async ({ headers }, _) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
