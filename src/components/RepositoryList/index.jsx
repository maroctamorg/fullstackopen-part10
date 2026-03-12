import { useState } from "react";
import { useNavigate } from "react-router-native";
import { useDebounce } from "use-debounce";

import { PAGINATION_FIRST_DEFAULT } from "../../constants/pagination";
import useRepositories from "../../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderingVariables = {
    latest: { orderBy: "CREATED_AT", orderDirection: "DESC" },
    highest: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    lowest: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  };

  const { repositories, fetchMore } = useRepositories({
    ...orderingVariables[selectedOrder],
    first: PAGINATION_FIRST_DEFAULT,
    searchKeyword: debouncedSearchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={(id) => navigate(`/repositories/${id}`)}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
