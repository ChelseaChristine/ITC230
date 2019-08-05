var Animal = require("../models/animal");

//gets a record of all animals
const getAll = () =>{
    return Animal.find({}, (err,result) => {
        if(err){
            console.log(err)
        }
        else {
            return result;
        }

    });
}

//get the record of a single animal

const getItem = (animal) =>{
    return Animal.findOne({'name': animal},(err,animal) => {
        if (err) {
            return next(err);
        }
        else{
            return animal;
        }
    });

}

const deleteItem = (animalName) =>{
    let deleted = false;
    return Animal.findOneAndRemove({'name': animalName},(err,deleted)=>{
        if(err){
            return {deleted};
        }
        else{
            deleted = true;
            return {deleted};
        }
    });

}

const addItem = (animalNew) =>{
    let added = false;
    let animal = new Animal({animal: animalNew.animal, name:animalNew.name,age: animalNew.age});
    let item = getItem(animalNew.name);
    console.log(animal);
        if(item != animal){
            animal.save((err,added)=>{
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                console.log("Animal saved");
                added=true;
                return {added};
                }
            })
        }
        else{
            return {added};
        }

}

module.exports = {getAll, getItem, deleteItem, addItem }



