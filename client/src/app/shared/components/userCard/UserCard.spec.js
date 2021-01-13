import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CardDescription, CardHeader, Image } from 'semantic-ui-react';
import UserCard from './UserCard';

configure({ adapter: new Adapter() });

const user = {
  avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',
  name: 'Test name',
  description: 'Test description',
};

describe('UserCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserCard user={user} />);
  });
  it('should render a Card component with name, image and description', () => {
    expect(wrapper.find(CardHeader).prop('content')).toBe(user.name);
    expect(wrapper.find(Image).prop('src')).toBe(user.avatarUrl);
    expect(wrapper.find(CardDescription).prop('content')).toBe(
      user.description
    );
  });
});
