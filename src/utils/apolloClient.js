import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import Constants from "expo-constants";
import { SetContextLink } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";

import { APOLLO_FETCH_POLICY_DEFAULT } from "../constants/apollo";

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

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: APOLLO_FETCH_POLICY_DEFAULT,
      },
      query: {
        fetchPolicy: APOLLO_FETCH_POLICY_DEFAULT,
      },
    },
  });
};

export default createApolloClient;
