import { MathHelper } from "./mathHelper";

export default class Vector3 {
  private _values = new Float32Array(3);

  /**
   * Constructor of Vector 3, can be called with
   * @param {number[] | number} [p1] array of number, or number for x value
   * @param {number} [p2] number for y value
   */
  constructor(p1?: number[] | number, p2?: number, p3?: number) {
    if (Array.isArray(p1) && p1.length > 3) {
      this.xyz = p1;
    } else {
      this.xyz = [Number(p1) || 0, Number(p2) || 0, Number(p3) || 0];
    }
  }

  /**
   * Retrieves a new instance of the vector (0, 0, 0)
   * @returns {Vector3} The zero vector
   */
  static get zero(): Vector3 {
    return new Vector3([0, 0, 0]);
  }

  /**
   * Retrieves a new instance of the vector (1, 1, 1)
   * @returns {Vector3} The one vector
   */
  static get one(): Vector3 {
    return new Vector3([1, 1, 1]);
  }

  /**
   * Retrieves a new instance of the vector (0, 1, 0)
   * @returns {Vector3} The up vector
   */
  static get up(): Vector3 {
    return new Vector3([0, 1, 0]);
  }

  /**
   * Retrieves a new instance of the vector (0, -1, 0)
   * @returns {Vector3} The down vector
   */
  static get down(): Vector3 {
    return new Vector3([0, -1, 0]);
  }

  /**
   * Retrieves a new instance of the vector (1, 0, 0)
   * @returns {Vector3} The right vector
   */
  static get right(): Vector3 {
    return new Vector3([1, 0, 0]);
  }

  /**
   * Retrieves a new instance of the vector (0, 1, 0)
   * @returns {Vector3} The left vector
   */
  static get left(): Vector3 {
    return new Vector3([0, 1, 0]);
  }

  /**
   * Retrieves a new instance of the vector (0, 0, 1)
   * @returns {Vector3} The forward vector
   */
  static get forward(): Vector3 {
    return new Vector3([0, 0, 1]);
  }

  /**
   * Retrieves a new instance of the vector (0, 0, -1)
   * @returns {Vector3} The backward vector
   */
  static get backward(): Vector3 {
    return new Vector3([0, 0, -1]);
  }

  /**
   * @returns {number} The x-component of the vectory
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
   * @returns {number} The z-component of the vectory
   */
  get z(): number {
    return this._values[2];
  }

  /**
   * @returns {number[]} An array containing the x-component and y-component of the vector
   */
  get xy(): number[] {
    return [this._values[0], this._values[1]];
  }

  /**
   * @returns {number[]} An array containing the x-component, y-component and z-component of the vector
   */
  get xyz(): number[] {
    return [this._values[0], this._values[1], this._values[2]];
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
   * @param {number} value The new z-component of the vector
   */
  set z(value: number) {
    this._values[2] = value;
  }

  /**
   * @param {number[]} values An array containing the new x-component and y-component of the vector
   */
  set xy(values: number[]) {
    this._values[0] = values[0];
    this._values[1] = values[1];
  }

  /**
   * @param {number[]} values An array containing the new x-component, y-component and z-component of the vector
   */
  set xyz(values: number[]) {
    this._values[0] = values[0];
    this._values[1] = values[1];
    this._values[2] = values[2];
  }

  /**
   * @param {Vector3} vector The first vector for the operation
   * @param {Vector3} vector2 The second vector for the operation
   * @param {Vector3} [dest] the Vector3 destination of the result
   * @returns {Vector3} the result of the cross operation
   */
  static cross(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();

    let x = vector.x;
    let y = vector.y;
    let z = vector.z;

    let x2 = vector2.x;
    let y2 = vector2.y;
    let z2 = vector2.z;

    dest.x = y * z2 - z * y2;
    dest.y = z * x2 - x * z2;
    dest.z = x * y2 - y * x2;

    return dest;
  }

  /**
   * Calculates the dot product of two vectors
   * @param {Vector3} vector Starting position
   * @param {Vector3} vector2 Ending position
   * @returns {number} The dot product of the two vectors
   */
  static dot(vector: Vector3, vector2: Vector3): number {
    let x = vector.x;
    let y = vector.y;
    let z = vector.z;

    let x2 = vector2.x;
    let y2 = vector2.y;
    let z2 = vector2.z;

    return x * x2 + y * y2 + z * z2;
  }

  /**
   * Calculates the distance between two vectors
   * @param {Vector3} vector Starting position
   * @param {Vector3} vector2 Ending position
   * @returns {number} The distance between the two vectors
   */
  static distance(vector: Vector3, vector2: Vector3): number {
    return Math.sqrt(this.squaredDistance(vector, vector2));
  }

  /**
   * Calculates the distance between two vectors squared
   * @param {Vector3} vector Starting position
   * @param {Vector3} vector2 Ending position
   * @returns {number} The distance between the two vectors squared
   */
  static squaredDistance(vector: Vector3, vector2: Vector3): number {
    let x = vector2.x - vector.x;
    let y = vector2.y - vector.y;
    let z = vector2.z - vector.z;
    return x * x + y * y + z * z;
  }

  /**
   * Calculates a normalized vector representing the direction from one vector to another.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} vector Starting position
   * @param {Vector3} vector2 Ending position
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static direction(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();

    let x = vector.x - vector2.x;
    let y = vector.y - vector2.y;
    let z = vector.z - vector2.z;

    let length = Math.sqrt(x * x + y * y + z * z);

    if (length === 0) {
      dest.x = 0;
      dest.y = 0;
      dest.z = 0;

      return dest;
    }

    length = 1 / length;

    dest.x = x * length;
    dest.y = y * length;
    dest.z = z * length;

    return dest;
  }

  /**
   * Performs a linear interpolation over two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} a the minimum value of the lerp
   * @param {Vector3} b the maximum value of the lerp
   * @param {number} t the floating value of the lerp
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static lerp(a: Vector3, b: Vector3, t: number, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    dest.x = a.x + t * (b.x - a.x);
    dest.y = a.y + t * (b.y - a.y);
    dest.z = a.z + t * (b.z - a.z);
    return dest;
  }

  /**
   * Adds two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} vector the vector2 augend
   * @param {Vector3} vector2 the vector2 addend
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static sum(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    dest.x = vector.x + vector2.x;
    dest.y = vector.y + vector2.y;
    dest.z = vector.z + vector2.z;
    return dest;
  }

  /**
   * Subtracts two vectors.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} vector the vector2 minuend
   * @param {Vector3} vector2 the vector2 subtrahend
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static difference(
    vector: Vector3,
    vector2: Vector3,
    dest?: Vector3
  ): Vector3 {
    if (!dest) dest = new Vector3();
    dest.x = vector.x - vector2.x;
    dest.y = vector.y - vector2.y;
    dest.z = vector.z - vector2.z;
    return dest;
  }

  /**
   * Multiplies two vectors piecewise.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} vector the vector2 multiplicand
   * @param {Vector3} vector2 the vector2 multiplier
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static product(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    dest.x = vector.x * vector2.x;
    dest.y = vector.y * vector2.y;
    dest.z = vector.z * vector2.z;
    return dest;
  }

  /**
   * Divides two vectors piecewise.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} vector the vector2 dividend
   * @param {Vector3} vector2 the vector2 divisor
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the result of the operation
   */
  static quotient(vector: Vector3, vector2: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    dest.x = vector.x / vector2.x;
    dest.y = vector.y / vector2.y;
    dest.z = vector.z / vector2.z;
    return dest;
  }

  /**
   * Retrieves the x-component or y-component of the vector.
   * @param {number} index index of the component (0, 1 or 2)
   * @returns {number} the value of the vector component
   */
  at(index: number): number {
    return this._values[index];
  }

  /**
   * Sets both the x- y- and z-components of the vector to 0.
   */
  reset(): void {
    this.xyz = [0, 0, 0];
  }

  /**
   * Copies the x- y- and z-components from one vector to another.
   * If no dest vector is specified, a new vector is instantiated.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the new instance of the vector
   */
  copy(dest?: Vector3): Vector3 {
    if (!dest) dest = new Vector3();
    dest.xyz = this.xyz;
    return dest;
  }

  /**
   * Multiplies both the x- y- and z-components of a vector by -1.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} the vector negated
   */
  negate(dest?: Vector3): Vector3 {
    if (!dest) dest = this;

    dest.x = -this.x;
    dest.y = -this.y;
    dest.z = -this.z;

    return dest;
  }

  /**
   * Checks if two vectors are equal, using a threshold to avoid floating-point precision errors.
   * @param {Vector3} other the vector to compare the equality
   * @param {number} [threshold] the treshold for precision.
   * @returns {boolean} is equal to provided vector
   */
  equals(other: Vector3, threshold = MathHelper.EPSILON): boolean {
    if (Math.abs(this.x - other.x) > threshold) {
      return false;
    }
    if (Math.abs(this.y - other.y) > threshold) {
      return false;
    }
    if (Math.abs(this.z - other.z) > threshold) {
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
    let z = this.z;
    return x * x + y * y + z * z;
  }

  /**
   * Adds two vectors together.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector3} vector The Vector2 to add with.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  add(vector: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.x = this.x + vector.x;
    dest.y = this.y + vector.y;
    dest.z = this.z + vector.z;
    return dest;
  }

  /**
   * Subtracts one vector from another.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector3} vector The Vector2 to substract with.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  subtract(vector: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.x = this.x - vector.x;
    dest.y = this.y - vector.y;
    dest.z = this.z - vector.z;
    return dest;
  }

  /**
   * Multiplies two vectors together piecewise.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector3} vector The Vector2 to multiply with.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  multiply(vector: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.x = this.x * vector.x;
    dest.y = this.y * vector.y;
    dest.z = this.z * vector.z;
    return dest;
  }

  /**
   * Divides two vectors piecewise.
   * @param {Vector3} vector The Vector2 to divide with.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  divide(vector: Vector3, dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.x = this.x / vector.x;
    dest.y = this.y / vector.y;
    dest.z = this.z / vector.z;
    return dest;
  }

  /**
   * Scales a vector by a scalar parameter.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {number} value The scalar to multiply with.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  scale(value: number, dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.x = this.x * value;
    dest.y = this.y * value;
    dest.z = this.z * value;
    return dest;
  }

  /**
   * Normalizes a vector.
   * If no dest vector is specified, the operation is performed in-place.
   * @param {Vector3} [dest] The object onto which to store the result.
   * @returns {Vector3} The modified result parameter.
   */
  normalize(dest?: Vector3): Vector3 {
    if (!dest) dest = this;
    dest.xyz = this.xyz;
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
    dest.z *= length;
    return dest;
  }
}
