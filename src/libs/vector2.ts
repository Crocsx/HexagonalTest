import { MathHelper } from "./mathHelper";
import { Vector3 } from "./common";

export default class Vector2 {
  private _values = new Float32Array(2);

  /**
   * Constructor of Vector 2, can be called with
   * @param {number[] | number} [p1] array of number, or number for x value
   * @param {number} [p2] number for y value
   */
  constructor(p1?: number[] | number, p2?: number) {
    if (Array.isArray(p1) && p1.length > 2) {
      this.xy = p1;
    } else {
      this.xy = [Number(p1) || 0, Number(p2) || 0];
    }
  }

  /**
   * Retrieves a new instance of the vector (0, 0)
   * @returns {Vector2} The zero vector
   */
  static get zero(): Vector2 {
    return new Vector2([0, 0]);
  }

  /**
   * @returns {number} The x-component of the vector
   */
  get x(): number {
    return this._values[0];
  }

  /**
   * @returns {number} The y-component of the vectory
   */
  get y(): number {
    return this._values[1];
  }

  /**
   * @returns {number[]} An array containing the x-component and y-component of the vector
   */
  get xy(): number[] {
    return [this._values[0], this._values[1]];
  }

  /**
   * @param {number} value The new x-component of the vector
   */
  set x(value: number) {
    this._values[0] = value;
  }

  /**
   * @param {number} value The new y-component of the vector
   */
  set y(value: number) {
    this._values[1] = value;
  }

  /**
   * @param {number[]} values An array containing the new x-component and y-component of the vector
   */
  set xy(values: number[]) {
    this._values[0] = values[0];
    this._values[1] = values[1];
  }

  /**
   * @param {Vector2} vector The first vector for the operation
   * @param {Vector2} vector2 The second vector for the operation
   * @param {Vector3} [dest] the Vector3 destination of the result
   * @returns {Vector3} the result of the cross operation
   */
  static cross(vector: Vector2, vector2: Vector2, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    let x = vector.x;
    let y = vector.y;
    let x2 = vector2.x;
    let y2 = vector2.y;
    let z = x * y2 - y * x2;
    dest.xyz = [0, 0, z];
    return dest;
  }

  /**
   * Calculates the dot product of two vectors
   * @param {Vector2} vector Starting position
   * @param {Vector2} vector2 Ending position
   * @returns {number} The dot product of the two vectors
   */
  static dot(vector: Vector2, vector2: Vector2): number {
    return vector.x * vector2.x + vector.y * vector2.y;
  }

  /**
   * Calculates the distance between two vectors
   * @param {Vector2} vector Starting position
   * @param {Vector2} vector2 Ending position
   * @returns {number} The distance between the two vectors
   */
  static distance(vector: Vector2, vector2: Vector2): number {
    return Math.sqrt(this.squaredDistance(vector, vector2));
  }

  /**
   * Calculates the distance between two vectors squared
   * @param {Vector2} vector Starting position
   * @param {Vector2} vector2 Ending position
   * @returns {number} The distance between the two vectors squared
   */
  static squaredDistance(vector: Vector2, vector2: Vector2) {
    let x = vector2.x - vector.x;
    let y = vector2.y - vector.y;
    return x * x + y * y;
  }

  /**
   * Calculates a normalized vector representing the direction from one vector to another.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} vector Starting position
   * @param {Vector2} vector2 Ending position
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static direction(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();
    let x = vector.x - vector2.x;
    let y = vector.y - vector2.y;
    let length = Math.sqrt(x * x + y * y);
    if (length === 0) {
      dest.reset();
      return dest;
    }
    length = 1.0 / length;
    dest.x = x * length;
    dest.y = y * length;
    return dest;
  }

  /**
   * Performs a linear interpolation over two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} a the minimum value of the lerp
   * @param {Vector2} b the maximum value of the lerp
   * @param {number} t the floating value of the lerp
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static lerp(a: Vector2, b: Vector2, t: number, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();
    dest.x = a.x + t * (b.x - a.x);
    dest.y = a.y + t * (b.y - a.y);
    return dest;
  }

  /**
   * Adds two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} vector the vector2 augend
   * @param {Vector2} vector2 the vector2 addend
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static sum(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();
    dest.x = vector.x + vector2.x;
    dest.y = vector.y + vector2.y;
    return dest;
  }

  /**
   * Subtracts two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} vector the vector2 minuend
   * @param {Vector2} vector2 the vector2 subtrahend
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static difference(
    vector: Vector2,
    vector2: Vector2,
    dest?: Vector2
  ): Vector2 {
    if (!dest) dest = new Vector2();

    dest.x = vector.x - vector2.x;
    dest.y = vector.y - vector2.y;

    return dest;
  }

  /**
   * Multiplies two vectors piecewise.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} vector the vector2 multiplicand
   * @param {Vector2} vector2 the vector2 multiplier
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static product(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();

    dest.x = vector.x * vector2.x;
    dest.y = vector.y * vector2.y;

    return dest;
  }

  /**
   * Divides two vectors piecewise.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} vector the vector2 dividend
   * @param {Vector2} vector2 the vector2 divisor
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the result of the operation
   */
  static quotient(vector: Vector2, vector2: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();

    dest.x = vector.x / vector2.x;
    dest.y = vector.y / vector2.y;

    return dest;
  }

  /**
   * Retrieves the x-component or y-component of the vector.
   * @param {number} index index of the component (0 or 1)
   * @returns {number} the value of the vector component
   */
  at(index: number): number {
    return this._values[index];
  }

  /**
   * Sets both the x- and y-components of the vector to 0.
   */
  reset(): void {
    this.x = 0;
    this.y = 0;
  }

  /**
   * Copies the x- and y-components from one vector to another.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the new instance of the vector
   */
  copy(dest?: Vector2): Vector2 {
    if (!dest) dest = new Vector2();
    dest.xy = this.xy;
    return dest;
  }

  /**
   * Multiplies both the x- and y-components of a vector by -1.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} the vector negated
   */
  negate(dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = -this.x;
    dest.y = -this.y;
    return dest;
  }

  /**
   * Checks if two vectors are equal, using a threshold to avoid floating-point precision errors.
   * @param {Vector2} other the vector to compare the equality
   * @param {number} [threshold] the treshold for precision.
   * @returns {boolean} is equal to provided vector
   */
  equals(other: Vector2, threshold = MathHelper.EPSILON): boolean {
    if (Math.abs(this.x - other.x) > threshold) {
      return false;
    }
    if (Math.abs(this.y - other.y) > threshold) {
      return false;
    }
    return true;
  }

  /**
   * Returns the distance from the vector to the origin.
   * @returns {number} the length of the vector
   */
  length(): number {
    return Math.sqrt(this.squaredLength());
  }

  /**
   * Returns the distance from the vector to the origin, squared.
   * @returns {number} the distance from the origin squared
   */
  squaredLength(): number {
    let x = this.x;
    let y = this.y;
    return x * x + y * y;
  }

  /**
   * Adds two vectors together.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector2} vector The Vector2 to add with.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  add(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = this.x + vector.x;
    dest.y = this.y + vector.y;
    return dest;
  }

  /**
   * Subtracts one vector from another.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector2} vector The Vector2 to substract with.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  subtract(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = this.x - vector.x;
    dest.y = this.y - vector.y;
    return dest;
  }

  /**
   * Multiplies two vectors together piecewise.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector2} vector The Vector2 to multiply with.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  multiply(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = this.x * vector.x;
    dest.y = this.y * vector.y;
    return dest;
  }

  /**
   * Divides two vectors piecewise.
   * @param {Vector2} vector The Vector2 to divide with.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  divide(vector: Vector2, dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = this.x / vector.x;
    dest.y = this.y / vector.y;
    return dest;
  }

  /**
   * Scales a vector by a scalar parameter.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {number} value The scalar to multiply with.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  scale(value: number, dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.x = this.x * value;
    dest.y = this.y * value;
    return dest;
  }

  /**
   * Normalizes a vector.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector2} [dest] The object onto which to store the result.
   * @returns {Vector2} The modified result parameter.
   */
  normalize(dest?: Vector2): Vector2 {
    if (!dest) dest = this;
    dest.xy = this.xy;
    let length = dest.length();
    if (length === 1) {
      return dest;
    }
    if (length === 0) {
      dest.reset();
      return dest;
    }
    length = 1.0 / length;
    dest.x *= length;
    dest.y *= length;
    return dest;
  }

  /**
   * Format Vector2 to string "(x,y)""
   * @returns {string} the vector in string format
   */
  toString(): string {
    return "(" + this.x + ", " + this.y + ")";
  }
}
