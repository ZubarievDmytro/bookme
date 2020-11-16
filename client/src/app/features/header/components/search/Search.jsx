import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Search as SemanticSearch } from 'semantic-ui-react';

const Search = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [valueState, setValue] = useState('');

  const history = useHistory();

  const handleResultSelect = (e, { result }) => {
    history.push(`/users/${result.id}`);
    setIsLoading(false);
    setResults([]);
    setValue('');
  };

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true);
    setValue(value);

    setTimeout(() => {
      const { users } = props;
      if (value.length < 1 || !users) {
        setIsLoading(false);
        setResults([]);
        setValue('');
        return;
      }

      const source = [...users].map((user) => {
        return {
          title: user.name,
          description: user.description,
          id: user.id,
          key: user.id,
        };
      });

      const re = new RegExp(_.escapeRegExp(valueState), 'i');
      const isMatch = (result) => re.test(result.title);

      setIsLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  const onFocus = () => {
    const { users, fetchUsers } = props;
    if (!users.length) fetchUsers();
  };

  return (
    <SemanticSearch
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      onFocus={onFocus}
      results={results}
      value={valueState}
    />
  );
};

export default Search;
