/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  // code goes here
  // put the base case
  if (nums.length <= 1) return nums;

  //  get the mid of the array and the right and left sides
  const middleIndex = Math.floor(nums.length / 2);
  const leftArray = nums.slice(0, middleIndex);
  const rightArray = nums.slice(middleIndex);

  // recursion over each side
  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);

  // get sorted array of both sides
  return merge(sortedLeft, sortedRight);
};

const merge = (leftArray, rightArray) => {
  const results = [];
  while (leftArray.length && rightArray.length) {
    if (leftArray[0] < rightArray[0]) {
      results.push(leftArray.shift());
    } else {
      results.push(rightArray.shift());
    }
  }
  // if one of both sides are empty, concat the other array to it
  return results.concat(leftArray, rightArray);
};

// unit tests
// do not modify the below code
test('merge sort', function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
