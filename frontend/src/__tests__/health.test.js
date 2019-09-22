import React from 'react';
import { shallow } from 'enzyme';

describe('Health', () => {
  it('Test 1', () => {
    expect(true).toBe(true);
  });

  it('Enzyme', () => {
    const wrapper = shallow(<div><h1>Content</h1></div>);

    expect(wrapper).toMatchSnapshot();
  });
});
