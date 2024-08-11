/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  // code goes here
  constructor() {
    this.root = null;
  }
  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.root.add(value);
    }
  }
  toObject() {
    return this.root;
  }
}

class Node {
  // code also goes here
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
  add(value) {
    // decide to go left or right

    // find the suitable place to add the new node
    // make sure you update heights

    if (value < this.value) {
      // go left
      if (this.left === null) {
        this.left = new Node(value);
      } else {
        this.left.add(value);
      }
      // update height
      if (!this.right || this.right.height < this.left.height) {
        // Update the height of parent
        this.height = this.left.height + 1;
      }
    } else {
      // go right
      if (this.right === null) {
        this.right = new Node(value);
      } else {
        this.right.add(value);
      }
      // update height
      if (!this.left || this.left.height < this.right.height) {
        // Update the height of parent
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }
  balance() {
    // on every node, ask is this node out of balance? by check on height > 1
    // if not out of balance, do nothing
    // if it is out of balance, do I need to do single or double rotate
    // if single, just call rotate on self
    // if double, call rotate on child then on self
    const rightHeight = this.right ? this.right.height : 0;
    const leftHeight = this.left ? this.left.height : 0;

    if (leftHeight > rightHeight + 1) {
      // out of balance from left
      // check if we need to do a double rotation (Left-Right heavy)
      const leftRightHeight = this.left.right ? this.left.right.height : 0;
      // (Left-Left)
      const leftLeftHeight = this.left.left ? this.left.left.height : 0;

      // make a double rotation
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR(); // rotate the child to left(from the right to left)
      }
      this.rotateLL(); // after it has a left left so rotate on the parent node itself(right rotate)
    } else if (rightHeight > leftHeight + 1) {
      // out of balance from right
      // variable for check it is a double rotation? (Right-Left heavy)
      const rightLeftHeight = this.right.left ? this.right.left.height : 0;
      // (Right-Right)
      const rightRightHeight = this.right.right ? this.right.right.height : 0;

      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL(); // rotate from left to right
      }
      // then rotate the parent from right to left
      this.rotateRR();
    }
  }
  // call it, if the right child is heavy `if BF bigger than -1`
  // here Brian means by rotateRR => rotate from right to left
  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;

    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  // call it, if the left child is heavy `if BF bigger than 1`
  // here Brian means by rotateLL => rotate from left to right
  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;

    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }
  updateInNewLocation() {
    // calculate the new height
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left.height + 1;
    } else {
      this.height = this.right.height + 1;
    }
  }
}

// unit tests
// do not modify the below code
describe('AVL Tree', function () {
  test('creates a correct tree', () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
