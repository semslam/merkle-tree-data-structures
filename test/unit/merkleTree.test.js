const MerkleTree = require('../../src/merkleTree')
describe('MerkleTree Test', () => {
    describe('Test createTree', () => {
      test('Test createTree with param!', () => {
        const leaves = "3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997";
    
      expect(MerkleTree.createTree(leaves)).toBeTruthy();
      expect(typeof MerkleTree.createTree(leaves)).toEqual('object');
      expect(MerkleTree.createTree(leaves)).toBeTruthy();
      expect(typeof MerkleTree.createTree(leaves)).toEqual('object');

            
    });

      test('Test createTree with wrong param!', () => {
        expect(() => { MerkleTree.createTree()}).toThrowError("Leaves can't be empty");
        expect(() => { MerkleTree.createTree("")}).toThrowError("Leaves can't be empty");
        expect(() => { MerkleTree.createTree([])}).toThrowError("Leaves can't be empty");
        expect(() => { MerkleTree.createTree(undefined)}).toThrowError("Leaves can't be empty");
        expect(() => {MerkleTree.createTree(null)}).toThrowError("Leaves can't be empty");
      });
    })

    describe('Test verify', () => {
      const leaf = "3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997";
        const proof = [
          '198f50501f821b8674a2f2e83e0064a397ab92da7fa4241110c6f65c8ac8f996',
          'cc93a43d5c1675c4a18bbfc2f1594550e3a20ed814c65dec2acec7f12674e183',
          '6901eb919f9a77a482ddd4ad5bb21de9a26db8832e549f04c696319d4826d438'
        ]
      test('Test verify with param!', () => {
        
      expect(MerkleTree.verify(leaf,proof)).toBeTruthy();
      expect(typeof MerkleTree.verify(leaf,proof)).toEqual('string');
            
    });

      test('Test verify with wrong param!', () => {
        expect(() => { MerkleTree.verify()}).toThrowError("Wrong leaf or proof params!");
        expect(() => { MerkleTree.verify("",proof)}).toThrowError("Wrong leaf or proof params!");
        expect(() => { MerkleTree.verify("","")}).toThrowError("Wrong leaf or proof params!");
        expect(() => { MerkleTree.verify(leaf,[])}).toThrowError("Wrong leaf or proof params!");
        expect(() => { MerkleTree.verify([],[])}).toThrowError("Wrong leaf or proof params!");
        expect(() => { MerkleTree.verify(undefined,undefined)}).toThrowError("Wrong leaf or proof params!");
        expect(() => {MerkleTree.verify(null,null)}).toThrowError("Wrong leaf or proof params!");
      });
    })

    describe('Test hash', () => {
      test('Test hash with param!', () => {
        const leaf = "3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997";
    
      expect(MerkleTree.hash(leaf)).toBeTruthy();
      expect(typeof MerkleTree.hash(leaf)).toEqual('string');
    
            
    });

      test('Test hash with wrong param!', () => {
        expect(() => { MerkleTree.hash()}).toThrowError("Wrong data param is passed!");
        expect(() => { MerkleTree.hash("")}).toThrowError("Wrong data param is passed!");
        expect(() => { MerkleTree.hash(undefined)}).toThrowError("Wrong data param is passed!");
        expect(() => {MerkleTree.hash(null)}).toThrowError("Wrong data param is passed!");
      });
    })
   
});