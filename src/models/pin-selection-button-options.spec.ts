import { PinSelectionOptions } from './pin-selection-button-options';
import { async } from '@angular/core/testing';

describe('PinSelectionOptions', () => {

  let pinSelectionOption: PinSelectionOptions;
  beforeEach(async(() => {

    pinSelectionOption = new PinSelectionOptions(1);
  }));


  it('Pin option should be defined and value you should be set to passed in value', async(() => {

    expect(pinSelectionOption).toBeDefined();
    expect(pinSelectionOption._value).toBe(1);

  }));
});
