/**
 * @private
 * @examples
 * isInteger(5)     // => true
 * isInteger(5.0)   // => true
 * isInteger(-5)    // => true
 * isInteger(3.14)  // => false
 * isInteger('foo') // => false
 * isInteger(NaN)   // => false
 */
function isInteger(x) {
  return x === Math.floor(x);
}