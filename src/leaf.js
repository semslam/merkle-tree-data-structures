class Leaf{

    constructor(seed=0){
        this.seed = seed
    }
    /**
     * create a leaf and return leaf object
     * @returns {Object}
     */
    createLeaf() {
        if(!this.seed || isNaN(this.seed) || this.seed < 1)
            throw new Error('The seed must be a positive number');
            
        return { 
            account: `Account${this.seed}`,     
            token: this.someMagicalHexValue(), 
            balance: this.seed * 100, 
            print: function() { 
                return `${this.account}-${this.token}:${this.balance}`; 
            }};
    }

    /**
     * process magical hex value and return a string
     * @returns {string}
     */
    someMagicalHexValue() {
        const shiftedSeedQuarter = 1 << (this.seed / 4)
        const someVal = shiftedSeedQuarter * this.seed;
        return someVal.toString(16);
    }
}
module.exports = Leaf;