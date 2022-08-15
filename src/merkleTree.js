const { createHash } = require('crypto');
const Node = require('./node');

class MerkleTree{

    constructor(){
        this.currentLeaves = [];
    }

    /**
     * created by taking single nodes from each layer and create the parent node
     * @param {Array} leaves 
     * @returns {Object}
     */
    createTree(leaves) {
    
        if((!leaves && !(leaves instanceof Array)) || leaves.length === 0){
            throw new Error("Leaves can't be empty")
        }
        this.currentLeaves = leaves;
        let node = new Node(this.currentLeaves);
        const maxDepth = 10;
    
        for (var i = 0; i < maxDepth; i++) {
            let newNodes = this.createTreeLevel(this.currentLeaves);
            node.tree.nodes.push(newNodes);
    
            if (newNodes.length === 1) { 
                node.tree.root = newNodes[0];
                return node.tree;
            } else if (newNodes.length === 0) {
                return node.tree;
            } 
            this.currentLeaves = newNodes;
        }
    }

    /**
     * create MerkleTree level and return array
     * @returns {Array}
     */
    createTreeLevel() {
        
        const numLeaves = this.currentLeaves.length;
    
        if (numLeaves < 2){
            return numLeaves === 1 ? [this.hash(this.currentLeaves[0])] : [];
        } 
          
        let treeNodes = [];
        let leaf = "";
        let neighbour = leaf;
    
        for (let i = 0; i < this.currentLeaves.length; i++) {
            let indexIsEvenCheck = i % 2;
            if (indexIsEvenCheck === 0){ 
                leaf = this.currentLeaves[i];
            }else {
                neighbour = this.currentLeaves[i];
                let preHash;
                preHash = (leaf < neighbour)? leaf+neighbour : neighbour+leaf;

                treeNodes.push(this.hash(preHash));
                leaf = neighbour = "";
            }
        }
    
        if (leaf.length >= 1){
            treeNodes.push(this.hash(leaf));
        }
           
        return treeNodes;
    }
    
    /**
     * verify the proof and return array
     * @param {String} leaf 
     * @param {Array} proof 
     * @returns {String}
     */
    verify(leaf,proof){
        if(!leaf || ((!proof && !(proof instanceof Array)) || proof.length === 0)){
            throw new Error("Wrong leaf or proof params!")
        }
        proof.forEach((neighbour) => {
            let preHash;
            preHash = (leaf < neighbour)? leaf+neighbour : neighbour+leaf;
            leaf = this.hash(preHash);
          })
        return leaf;
    }

    
    /**
     * Hashes data and returns a hex string
     * @param {String} data 
     * @returns {string}
     */

    hash(data) {
        if(!data){
            throw new Error("Wrong data param is passed!")
        }
        return createHash("sha256")
			.update(data)
			.digest("hex");
    }

}

module.exports = new MerkleTree();

