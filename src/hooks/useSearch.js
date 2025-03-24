import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

export const useSearch = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = useCallback(
		debounce((query) => {
			setSearchQuery(query);
		}, 500),
		[],
	);

	return { searchQuery, handleSearch };
};
