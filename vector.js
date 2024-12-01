"use strict"

class Vector {
  constructor (x,y) {

    if (x != null && y != null)
    {
      this.x = x
      this.y = y
    }

    else {
      this.x = 0
      this.y = 0
    }
  }

  add(v) {
    this.x += v.x
    this.y += v.y

    return this
  }

  substract(v) {
    this.x -= v.x
    this.y -= v.y

    return this
  }

  multiply(value) {
    this.x *= value
    this.y *= value

    return this
  }

  divide(value) {
    this.x = this.x / value
    this.y = this.y / value

    return this
  }

  normalize() {
    const len = this.getMagnitude();

    if (len !== 0) this.multiply(1 / len);

    return this;
  }

  randomizeDirection() {
    this.x = Math.random() * 2 - 1
    this.y = Math.random() * 2 - 1

    this.magnitude = this.getMagnitude()
  }

  limitMagnitude(limit) {

    let mag = this.getMagnitude();
    if(mag > limit * limit ){
      this.divide(Math.sqrt(mag))
      this.multiply(limit)
    }
    return this
  }

  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  setMagnitude(newMagnitude) {
    return this.normalize().multiply(newMagnitude);
  }

}
