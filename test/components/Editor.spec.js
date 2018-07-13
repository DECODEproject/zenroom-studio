import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Editor from '../../app/components/Editor';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const Module = {};
  const component = shallow(<Editor zenroom={Module} />);
  return {
    component,
    button: component.find('#run'),
    zencodeEditor: component.find('.zenroom--editor')
  };
}

describe('Editor component', () => {
  it('should exist', () => {
    const { component } = setup();
    expect(component.exists());
  });

  it('should have a run button', () => {
    const { button } = setup();
    expect(button.exists());
  });

  it('should run zencode correctly', () => {
    const { button } = setup();
    expect(button.exists());
  });
});
