
import './app/index.js';

function merge(left, right,compiler) {
  let result = []
  let leftIndex = 0
  let rightIndex = 0
  let leftLength = left.length
  let rightLength = right.length
  while (leftIndex < leftLength && rightIndex < rightLength) {
    if (compiler(left[leftIndex], right[rightIndex])) {
      result.push(left[leftIndex])
      leftIndex++
    } else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
function mergeSort(arr, compiler=defaultCompiler) {
  if (arr.length <= 1) {
    return arr
  }
  let middleIndex = Math.floor(arr.length / 2)
  return merge(
    mergeSort(arr.slice(0, middleIndex),compiler),
    mergeSort(arr.slice(middleIndex, arr.length),compiler),
    compiler
  )
}
function defaultCompiler(a, b) {
  if (a < b) {
    return true
  }
  return false
}
let result = mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 0],(a,b)=>{
  return a>b
})
console.log(...result)
