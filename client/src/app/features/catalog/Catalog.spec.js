import React from 'react';
import { shallow } from 'enzyme';
import Catalog from './Catalog';

describe('Catalog', () => {
  it('should render UsersList component', () => {
    const wrapper = shallow(<Catalog />);

    expect(wrapper.find('UsersList').length).toEqual(1);
  });
});
