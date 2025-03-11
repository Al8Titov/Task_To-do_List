import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setSearchQuery(query), 500),
    [setSearchQuery] 
  );

  useEffect(() => {
    debouncedSetSearchQuery(localQuery);
    return () => debouncedSetSearchQuery.cancel();
  }, [localQuery, debouncedSetSearchQuery]);

  const handleChange = (e) => {
    setLocalQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={localQuery}
        onChange={handleChange}
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
