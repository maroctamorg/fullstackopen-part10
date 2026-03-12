import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORIES } from "../graphql/queries/repositories";
import { endReach } from "../utils/pagination";

const useRepositories = ({ orderBy, orderDirection, first, searchKeyword }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, first, searchKeyword },
  });

  const handleFetchMore = () => {
    endReach({
      loading,
      pageInfo: data?.repositories?.pageInfo,
      fetchMore,
      initialVariables: { orderBy, orderDirection, first, searchKeyword },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
