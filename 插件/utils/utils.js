/**
 * 数组完全展开
 * @param {*} arr 
 */
function myFlat(arr) {
  while (arr.some(t => Array.isArray(t))) {
   	arr = ([]).concat.apply([], arr)
  }
  return arr
}
var arrTest1 = [1, [2, 3, [4]], 5, 6, [7, 8], [[9, [10, 11], 12], 13], 14];  
console.log(myFlat(arrTest1)) // Expected Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]