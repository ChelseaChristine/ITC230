const expect = require("chai").expect;
const animal = require("../lib/data");

describe("Animal module", () =>{

    it("returns with the requested animal", function() {
        let result = animal.getItem("nala");
        expect(result).to.deep.equal({animal: "Cat", name: "nala", age: "5"});
    });

    it("fails w/ invalid animal", () =>{
        let result = animal.getItem("kyo");
        expect(result).to.be.undefined;
    });

    it("adds a new animal to the list", () =>{
        let result = animal.addItem({animal: "Dog", name: "scruffy", age: "7"});
        expect(result).to.deep.equal({ added: true, total: 6});
    });

    it("fails w/ duplicate animal", () =>{
        let result = animal.addItem({animal: "Cat", name: "nala", age: "5"});
        expect(result).to.deep.equal({added: false, total: 6});
    });

    it("Deletes a single animal", () =>{
        let result = animal.deleteItem("nala");
        expect(result).to.deep.equal({removed: true, total: 5});
    });

    it("fails w/ animal that does not exist on the list", () =>{
        let result = animal.deleteItem("kyo");
        expect(result).to.deep.equal({removed: false, total: 5});
    });

});