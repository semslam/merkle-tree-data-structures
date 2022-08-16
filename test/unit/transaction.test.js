const Transaction = require('../../src/transaction')
describe('Transaction Test', () => {
      const tree = {
        nodes: [
          [
            '2e0d437552a308bd0c2fa6469fcf1f1a2eb02c918ac352a04cffc2950db97b7d',
            '8119ba23656d93318b0a471f7dd394edd7ecc3ed792d1e0e927cc84337561081',
            '3f6c86a280edc5e5f63bba96f947b5655d51219baed2bd28999b2429a4cf2997',
            '6aa4e95a1c62892138f7bb2c4b8ef022b9ccbf5534e5f158330c942f138d3a8a',
            '198f50501f821b8674a2f2e83e0064a397ab92da7fa4241110c6f65c8ac8f996',
            '6d5931a131b394bed79c6f63ba2bdbe2397dcfc82b8a0c2104da5afc06fb9dd6',
            'ff7bd89b4d5f99f4b9be87d19a7e683a2b8899cd8a3da0c10c882ff06e56b18c'
          ],
          [
            '46871bfc64cefcc61c0c82a71df9a2f52cc309bcd6be6a83f7c6c55324bfc323',
            'd286c4a070fddd76b11024ab8324b19aadc37636dabb44c6dc62178092528fef',
            '8bb8fbf78af218fbad88207c4ef7f9ac75954aeddd6d79c5a47a51a71979427c',
            'f23d0b30b569a3a10362523c76160b23f9a5a0ca814875279fdf200391b5d9af'
          ],
          [
            '02c94bef981c397d3f1a449d93a36f3685d9f597422a5026303d6a26bbcab5a1',
            'da6ecab15b69c70c831484773ec5965f25ebe52191c743ea52e9fa4d2849a75a'
          ],
          [
            '9298b0c2b25b71f7173d42044f1df076e875b57bffddddb3a9ea4987a5c2d26f'
          ]
        ],
        root: '9298b0c2b25b71f7173d42044f1df076e875b57bffddddb3a9ea4987a5c2d26f'
      }
      const leafIndex = 1;
    test('Test Transaction class createProof with param!', () => {
      expect(Transaction.createProof(tree,leafIndex)).toBeTruthy();
      expect(Transaction.createProof(tree,0)).toBeTruthy();
      expect(Transaction.createProof(tree,leafIndex)).toEqual(expect.arrayContaining([expect.any(String)]));
      expect(Transaction.createProof(tree,leafIndex)).not.toBe(null)
      expect(Transaction.createProof(tree,leafIndex)).not.toBe('string')
      expect(Transaction.createProof(tree,leafIndex)).not.toBe(undefined)
      expect(Transaction.createProof(tree,leafIndex)).not.toBe('number')
    
             
    });

    test('Test Transaction class createProof with wrong param!', () => {
        
        expect(() => { Transaction.createProof()}).toThrowError("Wrong tree or leafIndex params is passed!");
        expect(() => { Transaction.createProof(tree,undefined)}).toThrowError("Wrong tree or leafIndex params is passed!");
        expect(() => { Transaction.createProof("","")}).toThrowError("Wrong tree or leafIndex params is passed!");
        expect(() => { Transaction.createProof([],[])}).toThrowError("Wrong tree or leafIndex params is passed!");
        expect(() => { Transaction.createProof(undefined,undefined)}).toThrowError("Wrong tree or leafIndex params is passed!");
        expect(() => { Transaction.createProof([],0)}).toThrowError("Wrong tree or leafIndex params is passed!");
         
    
      });
})