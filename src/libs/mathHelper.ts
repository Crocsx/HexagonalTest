export class MathHelper {
  static EPSILON = 0.00001;
  static RANDOM = Math.random;
  static degree = Math.PI / 180;
  static radians = 180 / Math.PI;
  static Log10E = 0.4342945;
  static Log2E = 1.442695;
  static PI = Math.PI;
  static PiOver2 = Math.PI / 2.0;
  static PiOver4 = Math.PI / 4.0;
  static TwoPi = Math.PI * 2.0;

  /**
   * Convert Degree to Radian
   * @param {number} degrees Angle in Degrees
   * @returns {number} Angle in Radians
   */
  static toRadian(degrees: number): number {
    return degrees * MathHelper.degree;
  }

  /**
   * Convert Radian to Degree
   * @param {number} radians Angle in Radians
   * @returns {number} Angle in Degrees
   */
  static toDegree(radians: number): number {
    return radians * MathHelper.radians;
  }

  /**
   * Clamp a value beetween a [min, max] interval
   * @param {number} min The minimum value of clamp
   * @param {number} max The maximum value of clamp
   * @param {number} value the value to clamp
   * @returns {number} the value clamped within the limits
   */
  static clamp(min: number, max: number, value: number): number {
    value = value > max ? max : value;
    value = value < min ? min : value;
    return value;
  }

  /**
   * lerp a value beetween a [min, max] interval
   * @param {number} min The minimum value of lerp
   * @param {number} max The maximum value of lerp
   * @param {number} value the floating value of the lerp
   * @returns {number} the lerped value
   */
  static lerp(min: number, max: number, amount: number): number {
    return min + (max - min) * amount;
  }

  /**
   * get the distance beetween 2 numbers
   * @param {number} value1 The minimum value of clamp
   * @param {number} value1 The second vector for the operation
   * @returns {number} the distance beetween the 2 values
   */
  static distance(value1: number, value2: number): number {
    return Math.abs(value1 - value2);
  }

  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance (an absolute tolerance is used for values less  than or equal to
   * 1.0, and a relative tolerance is used for larger values)
   * @param {number} a The first number to test
   * @param {number} b The second number to test
   * @param {number} tolerance The tolerance to test for
   * @returns {boolean} True if the numbers are approximately equal, false otherwise
   */
  static equals(a: number, b: number, tolerance = MathHelper.EPSILON): boolean {
    return (
      Math.abs(a - b) <= tolerance * Math.max(1.0, Math.abs(a), Math.abs(b))
    );
  }
}
