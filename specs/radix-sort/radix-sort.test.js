/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions

  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
// 1244 => return 4
function getDigit(number, place) {
  const digit = Math.floor(number / Math.pow(10, place)) % 10;
  // console.log(digit)
  return digit;
}
function getLongestNumber(arr) {
  let longest = 0;
  for (let i = 0; i < arr.length; i++) {
    const currentLength = arr[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }
  return longest;
}
function radixSort(array) {
  // find longest number
  const maxDigitCount = getLongestNumber(array);
  // create how many buckets u need
  // console.log(maxDigitCount)
  // an array of 10 arrays  [0 : 9] buckets
  // const buckets = new Array(10).fill([]);
  const buckets = new Array(10).fill().map(() => []);
  // for loop for how many iterations u need to do based on max digit
  for (let k = 0; k < maxDigitCount; k++) {
    // put the numbers in buckets based on digit in array[k]
    while (array.length) {
      const popCurrentItem = array.shift();
      const digit = getDigit(popCurrentItem, k);
      // - enqueue the numbers into their buckets
      buckets[digit].push(popCurrentItem);
    }
    // console.log(buckets);

    // for loop for each bucket
    for (let j = 0; j < 10; j++) {
      // dequeue all items out of the bucket
      while (buckets[j].length) {
        // taking the sorted numbers from buckets and pushing them onto the array again
        array.push(buckets[j].shift());
      }
    }
  }
  return array;
}
// const ans = radixSort([1009, 224, 124, 90, 58, 99]);
// console.log(ans);

// unit tests
// do not modify the below code
describe('radix sort', function () {
  it('should sort correctly', () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it('should sort 99 random numbers correctly', () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
