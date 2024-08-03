/*

  Quick Sort!
  
  Name your function quickSort.
  
  Quick sort should grab a pivot from the end and then separate the list (not including the pivot)
  into two lists, smaller than the pivot and larger than the pivot. Call quickSort on both of those
  lists independently. Once those two lists come back sorted, concatenate the "left" (or smaller numbers)
  list, the pivot, and the "right" (or larger numbers) list and return that. The base case is when quickSort
  is called on a list with length less-than-or-equal-to 1. In the base case, just return the array given.

*/

function quickSort(nums) {
  // base case
  if (nums.length <= 1) return nums;

  // choose pivot
  const pivot = nums[nums.length - 1];
  const leftArray = [];
  const rightArray = [];

  // separate the list => -1 to not get into the last item which is pivot
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < pivot) {
      leftArray.push(nums[i]);
    } else {
      rightArray.push(nums[i]);
    }
  }
  // // call quickSort on both sides independently
  // const sortedLeftArray = quickSort(leftArray);
  // const sortedRightArray = quickSort(rightArray);

  // // once sorted, return concatenation of the left, the pivot, and the right
  // return sortedLeftArray.concat(pivot, sortedRightArray);

  // Another way to return list equivilant to👆using spread op
  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}

// unit tests
// do not modify the below code
test('quickSort', function () {
  const input = [10, 8, 2, 1, 6, 3, 9, 4, 7, 5];
  const answer = quickSort(input);

  expect(answer).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
