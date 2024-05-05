import { useState } from "react";

const useSearch = (data) => {
  const [searchQuery, setSearchQuery] = useState("");

  const setSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter((item) =>
    item.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { filteredData, setSearch };
};

export default useSearch;
