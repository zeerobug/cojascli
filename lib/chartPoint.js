/**
 * Defines a chart point by its coordinates, label and options
 * TODO: implement standard Options like color, size
 *
 * @class chartPoint
 */
class chartPoint {
  /**
   *Creates an instance of chartPoint.
   * @param {*} { label, x, y, options = {} }
   * @memberof chartPoint
   */
  constructor({ label, x, y, z = null, options = {} }) {
    if (x == undefined || y == undefined) {
      throw new Error('At least point.x and point.y have to be defined');
    }
    this.label = label;
    this.x = x;
    this.y = y;
    if (z) this.z = z;
    this.value = y;
    this.options = options;
  }
}

module.exports = chartPoint;
