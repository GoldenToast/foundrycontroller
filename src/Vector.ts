export class Vector {
  x!: number;
  y!: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getDegree():number{
    return ((Math.atan2(this.x * -1, this.y) * 180) / Math.PI)-180;
  }

  normalize() {
    if (this.isZero()) return;
    let magnitude = this.getMagnitude();
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }

  isZero() {
    return this.getMagnitude() == 0;
  }
}