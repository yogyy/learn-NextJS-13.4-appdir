'use client';

import { DialogButton } from '@/components/client/dialog-btn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import axios from 'axios';
import * as React from 'react';

interface Kabupaten {
  code: string;
  province: string;
  regency: string;
  type: string;
}

const SearchKab = () => {
  const [query, setQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Kabupaten[]>([]);
  const debouncedValue = useDebounce<string>(query, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchMovies = React.useCallback(async (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    if (query.length >= 3) {
      const { data: response } = await axios.get(`/api/kabupaten?name=${query}`);
      setSearchResults(response.data);
    } else {
      setSearchResults([]);
    }
  }, []);

  React.useEffect(() => {
    if (debouncedValue) {
      searchMovies(debouncedValue);
    }
  }, [debouncedValue, searchMovies]);

  return (
    <div className="flex flex-col w-[900px] space-x-3 mx-auto">
      <div className="flex justify-center">
        <Input
          className="w-1/2 focus-visible:ring-offset-sky-500"
          value={query}
          onChange={handleInputChange}
          placeholder="search kabupaten..."
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {searchResults.map(result => (
          <DialogButton
            key={result.province + result.code}
            action={false}
            desc={<pre>{JSON.stringify(result, null, 2)}</pre>}
            cancel="cancel"
            title="Details:"
          >
            {result.regency}
          </DialogButton>
        ))}
      </div>
    </div>
  );
};

export { SearchKab };
