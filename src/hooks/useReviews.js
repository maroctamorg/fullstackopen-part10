import { useQuery } from "@apollo/client/react";

import { GET_REPOSITORY } from "../graphql/queries/repository";
import { endReach } from "../utils/pagination";

const useReviews = ({ repositoryId, first }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { id: repositoryId, first },
  });

  const repository = data?.repository;

  const handleFetchMore = () => {
    endReach({
      loading,
      pageInfo: repository?.reviews?.pageInfo,
      fetchMore,
      initialVariables: {
        id: repositoryId,
        first,
      },
    });
  };

  return {
    repository,
    reviews: repository?.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
