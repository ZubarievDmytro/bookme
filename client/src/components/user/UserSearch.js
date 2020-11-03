import React from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import history from '../../history';

const initialState = { isLoading: false, results: [], value: '' };

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleResultSelect = (e, { result }) => {
    history.push(`/users/${result.id}`);
    this.setState(initialState);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      const { value: stateValue } = this.state;
      const { users } = this.props;
      if (stateValue.length < 1 || !users) {
        return this.setState(initialState);
      }

      const source = [...users].map((user) => {
        return {
          title: user.name,
          description: user.description,
          id: user.id,
          key: user.id,
        };
      });

      const re = new RegExp(_.escapeRegExp(stateValue), 'i');
      const isMatch = (result) => re.test(result.title);

      return this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 300);
  };

  onFocus = () => {
    const { users, fetchUsers } = this.props;
    if (!users.length) fetchUsers();
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        onFocus={this.onFocus}
        results={results}
        value={value}
      />
    );
  }
}

export default UserSearch;
