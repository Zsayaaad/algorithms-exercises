// const breadthFirstTraverse = (queue, array) => {
//   // fill code in here
//   if (!queue.length) return array;
//   const currNode = queue.shift();
//   array.push(currNode.value);
//   if (currNode.left) queue.push(currNode.left);
//   if (currNode.right) queue.push(currNode.right);
//   return breadthFirstTraverse(queue, array);
// };

// recursion is not the best, doing it with looping is optimal in terms of performance
const breadthFirstTraverse = (queue, array) => {
  while (queue.length) {
    const currNode = queue.shift();
    array.push(currNode.value);
    if (currNode.left) queue.push(currNode.left);
    if (currNode.right) queue.push(currNode.right);
  }
  return array;
};

// unit tests
// do not modify the below code
describe('breadth-first tree traversal', function () {
  const answer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  const tree = {
    value: 'A',
    left: {
      value: 'B',
      left: {
        value: 'D',
        left: {
          value: 'G',
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 'E',
        left: null,
        right: {
          value: 'H',
          left: {
            value: 'K',
            left: null,
            right: null,
          },
        },
      },
    },
    right: {
      value: 'C',
      left: {
        value: 'F',
        left: {
          value: 'I',
          left: null,
          right: null,
        },
        right: {
          value: 'J',
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  test('breadthFirstTraverse', () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
  });
});
