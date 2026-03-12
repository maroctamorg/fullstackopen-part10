export const endReach = ({
  loading,
  pageInfo,
  fetchMore,
  initialVariables,
}) => {
  console.log("endReach", { loading, pageInfo, initialVariables });

  const canFetchMore = !loading && pageInfo?.hasNextPage;

  if (!canFetchMore) {
    return;
  }

  fetchMore({
    variables: {
      ...initialVariables,
      after: pageInfo.endCursor,
    },
  });
};
