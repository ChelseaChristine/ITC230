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

const getItem = (animalName) =>{
    return Animal.findOne({'name': animalName},(err,animal) => {
        if (err) {
            return next(err);
        }
        else{
            
            return animal.toObject();
        }
    });

}

const deleteItem = (animalName) =>{
    let deleted = false;
    return Animal.findOneAndRemove({'name': animalName},(err,deleted)=>{
        if(err){
            console.log("Animal not Deleted");
            return {deleted};
        }
        else{
            console.log("Animal Deleted");
            deleted = true;
            return {deleted};
        }
    });

}

const addItem = (animalNew) =>{
    let added = false;
    let animal = new Animal({animal: animalNew.animal, name:animalNew.name,age: animalNew.age});
    let item = getItem(animalNew.name);
    console.log(item);
    console.log(item.name);
    console.log(animal);
        if(item.name != animal.name){
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
            animal.update({name: name}, {animal: animalNew.animal, name:animalNew.name, age: animalNew.age}, {upsert: true}, (err,updated) =>{
                if(err){
                    console.log(err);
                    return next(err);
                }
                else{
                    console.log("Animal Updated");
                }

            })
            return {added};
        }

}

module.exports = {getAll, getItem, deleteItem, addItem }



