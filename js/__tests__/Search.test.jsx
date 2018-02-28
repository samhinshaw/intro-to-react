import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Search from '../Search';

test('Search renders correctly', () => {
  // const component = renderer.create(<Search />);
  // const tree = component.toJSON();
  const component = shallow(<Search />);
  expect(component).toMatchSnapshot();
});
