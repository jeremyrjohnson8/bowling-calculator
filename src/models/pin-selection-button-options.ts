
export class PinSelectionOptions {
  isDisabled: boolean;
  _value: number;
  _label: string;
  constructor(value: number) {
    this._value = value;
    this.setLabel();
  }

  public setLabel(): void {
    switch (this._value) {
      case 0:
        this._label = '0';
        break;
      case 1:
        this._label = `1`;
        break;
      case 2:
        this._label = `2`;
        break;
      case 3:
        this._label = `3`;
        break;
      case 4:
        this._label = `4`;
        break;
      case 5:
        this._label = `5`;
        break;
      case 6:
        this._label = `6`;
        break;
      case 7:
        this._label = `7`;
        break;
      case 8:
        this._label = `8`;
        break;
      case 9:
        this._label = `9`;
        break;
      case 10:
        this._label = `X`;
        break;
      default:
        this._label = `Error`;
        break;
    }
  }
}

