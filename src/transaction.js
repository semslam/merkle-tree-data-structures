class Transaction{
    
    constructor(){
         this.currentIndex = 0;
    }
    /**
     * create a proof and return array
     * @param {Object} tree 
     * @param {Number} leafIndex 
     * @returns {Array}
     */
    createProof(tree, leafIndex) {
      if(isNaN(leafIndex) || ((!tree && !(typeof tree === 'object')) || Object.keys(tree).length === 0)){
          throw new Error("Wrong tree or leafIndex params is passed!")
      }
        const resultObj = {
          merklePath: [],
          treeWithoutRoot: []
        }
  
        this.currentIndex = leafIndex;
        resultObj.treeWithoutRoot = this.retrieveLastNodes(tree.nodes);

        resultObj.treeWithoutRoot.forEach((nodesOfLevel)=>{
            let pairIndex = this.findIndex();
            resultObj.merklePath.push((nodesOfLevel[pairIndex])? nodesOfLevel[pairIndex]:"");
            
            this.currentIndex = this.reduceIndexForNextLevel(pairIndex);
        })

          return resultObj.merklePath;
      }
    /**
     * reduce the index for next level and return a number
     * @param {number} index 
     * @returns {number}
     */
    reduceIndexForNextLevel(index) {
        return Math.trunc(index / 2);
    }

    /**
     * retrieve the last nodes and return array
     * @param {Array} nodeList 
     * @returns {Array}
     */
     retrieveLastNodes(nodeList) { // give a proper naming confession
      let result = [];
      for (let i=0; i < nodeList.length-1; i++) {
        result.push(nodeList[i]);
      }
      return result;
    }
    
    /**
     * find the index and return a number
     * @returns {number}
     */
    findIndex() {
      return (this.currentIndex % 2 === 0)? 
      this.currentIndex + 1 : this.currentIndex - 1;
       
    }

}
module.exports = new Transaction();