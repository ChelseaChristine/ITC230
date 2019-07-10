let animals =[
    {animal: "Cat", name: "nala", age: "5"},
    {animal: "Cat", name: "cloud", age: "1"},
    {animal: "Dog", name: "bandit", age: "4"},
    {animal: "Dog", name: "mimi", age: "5"},
    {animal: "Cat", name: "hook", age: "5"}
];

const getAll = () =>
{
    return animals
}

const getItem = (name) =>{
    return animals.find((animal) => {
        return animal.name == name;
    });

}

const deleteItem = (name) =>{
    for(let i=0; i<animals.length; i++){
        if (name === animals[i].name){
            console.log(animals);
            animals.splice(i, 1);
            console.log(name + " removed");
        }
    }
    console.log(animals);

}

module.exports = {getAll, getItem, deleteItem }