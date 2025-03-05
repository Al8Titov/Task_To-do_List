import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const debouncedSearch = debounce(() => setSearchQuery(localQuery), 500);
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [localQuery, setSearchQuery]);

  return (
    <div>
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Поиск по делам..."
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
