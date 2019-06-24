import { mount } from 'enzyme';
import React from 'react';
import Camera from './camera';

describe('Camera', () => {
  it('Turning a Todo item into Done', () => {
    let imgBase64 = undefined;
    const handlePhotograph = (base64) => {
      imgBase64 = base64;
      console.log(base64)
    };

    const camera = mount(<Camera onPhotograph={handlePhotograph} />);
    const button = camera.find('button').at(0);

    button.simulate('click');

    expect(typeof imgBase64 === 'string').toEqual(true);
  })
});
