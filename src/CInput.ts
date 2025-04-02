export class CInput {

  get buttons(): GamepadButton[] {
    return this._buttons;
  }

  set buttons(buttons: GamepadButton[]) {
    this._buttons = buttons;
  }

  get axes():number[] {
    const modAxes:number[] = []
    modAxes.push(...this.computeCoordinates(this._axes[0], this._axes[1]));
    modAxes.push(...this.computeCoordinates(this._axes[2], this._axes[3]));
    return modAxes
  }

  set axes(axes:number[]) {
    this._axes = axes;
  }

  private _axes: number[];
  private _buttons: GamepadButton[];


  private _deadzone:number;
  private _sensitivity:number;
  private _saturation: number;
  private _range: number;

  constructor(deadzone:number = .01, sensitivity:number = 0, saturation:number = 0, range:number = 1) {

    this._deadzone = deadzone;
    this._sensitivity = sensitivity;
    this._saturation = saturation;
    this._range = range;
    this._axes = [];
    this._buttons = [];
  }

  private computeCoordinates(x:number, y:number): number[] {
    // Convert to polar coordinates.
    const r = Math.clamp(Math.sqrt((x * x) + (y * y)), 0, 1);  // Radius;
    const a = Math.atan2(y, x);  // Angle (in radians);

    // Apply modifiers.
    const value = this.computeModifiers(r);
    // Convert to cartesian coordinates.
    x = value * Math.cos(a);
    y = value * Math.sin(a);

    // Set calculated values to property values;
    return [x, y];
  }

  private computeModifiers(value:number) {
    // Apply dead-zone and saturation.
    if (this._deadzone > 0 || this._saturation < 1) {
      const edgeSpace = (1 - this._saturation) + this._deadzone;
      if (edgeSpace < 1){
        const multiplier = 1 / (1 - edgeSpace);
        value = (value - this._deadzone) * multiplier;
        value = Math.clamp(value, 0, 1);
      }else{
        value = Math.round(value);
      }
    }

    // Apply sensitivity.
    if (this._sensitivity != 0) {
      value = value + ((value - Math.sin(value * (Math.PI / 2))) * (this._sensitivity * 2));
      value = Math.clamp(value, 0, 1);
    }

    // Apply range.
    if (this._range < 1) {
      value = value * this._range;
    }

    // Return calculated value.
    return Math.clamp(value, 0, 1);
  }
}