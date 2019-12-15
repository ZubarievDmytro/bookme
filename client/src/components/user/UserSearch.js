import React from 'react';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import history from '../../history';
const initialState = { isLoading: false, results: [], value: '' };

class UserSearch extends React.Component {
    state = initialState;

    handleResultSelect = (e, { result }) => {
        history.push(`/users/${result.id}`);
        this.setState(initialState);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
        if (this.state.value.length < 1 || !this.props.users) return this.setState(initialState);

        let source = [...this.props.users].map(user => {
            return {
                title: user.title,
                description: user.description,
                id: user.id
            }
        });
    
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = (result) => re.test(result.title);

        this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
        })
        }, 300)
    }

    render (){
        const { isLoading, value, results } = this.state
        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={results}
                value={value}
                {...this.props}
          />
        )
    }
}

export default UserSearch;