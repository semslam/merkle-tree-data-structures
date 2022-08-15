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

const Leaf = require('./src/leaf');
const MerkleTree =require('./src/merkleTree');
const Transaction = require('./src/transaction');

async function main() {
    if(process.argv.length < 3){
        throw Error('CLI missing argument!');
    }

    let leaves = [];
    for(let leavesCreated = 0; leavesCreated < process.argv.length; leavesCreated++) {
        leaves.push(new Leaf(Math.trunc(Math.random() * 100)).createLeaf());
    }

    const randomValue = Math.trunc(Math.random() * leaves.length);
    
    leaves = leaves.map(leaf => MerkleTree.hash(leaf.print()));
    
    let tree = MerkleTree.createTree(leaves);
    console.log('Root', tree.root, '\nTree', tree.nodes);

    let proof = Transaction.createProof(tree, randomValue);
    console.log('Leaf Index', randomValue);
    console.log('Proof', proof);

    // Now we verify
    let leaf = MerkleTree.verify(leaves[randomValue],proof);

    console.log(leaf === tree.root);
}


(async () => {
    await main();
})().catch(e => {
    console.log(e.message);
}
);
