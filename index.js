// A Merkle Tree is a concept often used in Blockchains.
// It is a binary tree where each leaf node represents the hash of some interesting data
// and each internal node is the hash of the concatenated contents of its two children.
// Merkle Trees often record groups of transactions, and the roots are published widely to
// serve as summaries of all recognised transactions on a given date.

// By construction, the tree's root is a hash of all its leaves organised in a specific order.
// Since hash functions are hard to reverse, it is unfeasible to create a tree with a specific
// root if we don't know the inputs to it.
// We can prove a transaction happened before a certain date by showing it was a leaf of Merkle Tree
// that has already been published.
// Merkle Trees provide an efficient way to prove this inclusion in the tree.
// It is enough to show a path of neighbour-nodes from the leaf to the root.
// That is, a list that includes the sibling of the leaf node, then the sibling of its parent and so on
// until the root is reached.

// The code in this file represents a node.js app that demonstrates how to create a tree, a proof of inclusion
// for a random leaf and then verifies that the proof is correct.
// The size of the tree to build is passed as a CLI argument.

// EXERCISE:

// Your goal in this exercise is two-fold:
// 1. Imagine you receive this code in a Github Pull-Request submitted by one of your team mates.
// Write a code review for it with comments as you see fit.
//
// 2. Improve the code if you are able. Ensure it builds and runs.
// 3. Run the test cases you deem necessary to convince yourself the code is working properly.


const { createHash } = require('crypto');
const fs = require('fs');

let currentIndex = 0;

function createLeaf(seed) {
    return { account: 'Account' + seed, token: someMagicalHexValue(seed), balance: seed * 100, print: function() { return `${this.account}-${this.token}:${this.balance}`; }};
}

function createMerkleTree(leaves) {
    let tree = {
        nodes:[leaves],
        root: undefined
    };

    const maxDepth = 10;

    for (var i = 0; i < maxDepth; i++) {
        let newNodes = createMerkleTreeLevel(leaves);

        tree.nodes.push(newNodes);

        if (newNodes.length == 1) {
            tree.root = newNodes[0];
            return tree;
        } else if (newNodes.length == 0) {
            return tree;
        } else {
            leaves = newNodes;
        }
    }
}

async function main() {
    let leaves = [];
    
    for (let leavesCreated = 0; leavesCreated < process.argv[2]; leavesCreated++) {
        let diceRoll = Math.trunc(Math.random() * 100);
        leaves.push(createLeaf(diceRoll));
    }

    // This gets a random value
    let rv = Math.trunc(Math.random() * leaves.length);

    leaves = leaves.map(leaf => hash(leaf.print()));
    let tree = createMerkleTree(leaves);
    console.log('Root', tree.root, '\nTree', tree.nodes);

    let proof = createProof(tree, rv);
    console.log('Leaf Index', rv);
    console.log('Proof', proof);

    // Now we verify
    leaf = leaves[rv];
    for (const neighbour of proof) {
        let preHash;
        if (leaf < neighbour) {
          preHash = leaf+neighbour;
        } else {
          preHash = neighbour+leaf;
        }

        leaf = hash(preHash);
    }
    //Check validity
    console.log(leaf == tree.root);

    function createProof(tree, leafIndex) {

      const resultObj = {
        merklePath: [],
        treeWithoutRoot: ''
      }

      currentIndex = leafIndex;
      resultObj.treeWithoutRoot = remLast(tree.nodes);

        for (const nodesOfLevel of resultObj.treeWithoutRoot) {
            let pairIndex = findIndex(currentIndex);

            if (nodesOfLevel[pairIndex]) {
              resultObj.merklePath.push(nodesOfLevel[pairIndex]);
            } else {
              resultObj.merklePath.push("");
            }
            currentIndex = reduceIndexForNextLevel(pairIndex);
        }

        return resultObj.merklePath;
    }

    function findIndex() {
        if (currentIndex % 2 == 0) return currentIndex + 1;

        else return currentIndex - 1;
    }
}

function createMerkleTreeLevel(leaves) {
    const numLeaves = leaves.length;

    if (numLeaves < 2) {
      return numLeaves == 1 ? [hash(leaves[0])] : [];
    }

    let treeNodes = [];
    let a = "";
    let b = a;

    for (let i = 0; i < leaves.length; i++) {
        let indexIsEvenCheck = i % 2;
        if (indexIsEvenCheck == 0) a = leaves[i];
        else {
            b = leaves[i];
            let preHash;
            if (a < b) {
              preHash = a+b;
            } else {
              preHash = b +a;
            }

            treeNodes.push(hash(preHash));

            a = "";
            b = "";
        }
    }

    if (1 <= a.length) {
        treeNodes.push(hash(a));
    }

    return treeNodes;
}

function reduceIndexForNextLevel(index) {
    return Math.trunc(index / 2);
}

function someMagicalHexValue(seed) {
    const seedQuarter = seed / 4
    let shiftedSeedQuarter = 1 << (seedQuarter)
    const someVal = shiftedSeedQuarter * seed;
    return someVal.toString(16);
}

function remLast(list) {
  let result = [];

  for (i=0; i < list.length-1; i++) {
    result.push(list[i]);
  }

  return result;
}

function checkTreeSize(tree) {
  const MAX_TREE = 1000000;

  if (tree.length > MAX_TREE) {
    console.log('Max tree size reached');
  }

  return null;
}

function hash(a) {
  let hash = createHash('sha256');
  let updatedHash = hash.update(a);
  let updatedHashAsHex = updatedHash.digest('hex');
  return updatedHashAsHex;
}

(async () => {
    await main();
})().catch(e => {
    console.log(e);
    process.exit(0);
}
);
