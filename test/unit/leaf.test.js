const Leaf = require('../../src/leaf')

describe('Leaf Test', () => {
      
    test('Test Leaf class createLeaf with param!', () => {
      expect(new Leaf(Math.trunc(Math.random() * 100)).createLeaf()).toBeTruthy();

      const random = Math.trunc(Math.random() * 100);
      const leaf = new Leaf(random).createLeaf();

      expect(leaf.account).toEqual(`Account${random}`)
      expect(leaf.balance).toBe(random * 100)
      expect(typeof leaf.token).toEqual('string')
      expect(typeof leaf.print()).toEqual('string')
      expect(new Leaf(1).createLeaf()).toBeTruthy();
             
    });

    test('Test class Leaf createLeaf with wrong param!', () => {
        
        expect(() => {new Leaf(-36).createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf(0).createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf().createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf(undefined).createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf({}).createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf([]).createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf("").createLeaf()}).toThrowError("The seed must be a positive number");
        expect(() => {new Leaf(null).createLeaf()}).toThrowError("The seed must be a positive number");
         
    
      });
})