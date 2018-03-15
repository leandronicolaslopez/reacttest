import React from 'react';
import Indicents from './components/incidents/incidents.jsx';
import {shallow} from 'enzyme';

it('it sums ok', () => {
    const wrapper = shallow(<Indicents/>);
    expect(wrapper.instance().sum(3,3)).toBe(6);
  });
  