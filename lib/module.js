let animals =[
    {animal: "Cat", name: "Nala", age: "5"},
    {animal: "Cat", name: "Cloud", age: "1"},
    {animal: "Dog", name: "Bandit", age: "4"},
    {animal: "Dog", name: "Mimi", age: "5"},
    {animal: "Cat", name: "Hook", age: "5"}
];

const getAll = () =>
{
    return animals
}

const get = (name) =>{
    return animals.find((animal) => {
        return animal.name == name;
    });

}

const delete1 = (name) =>{
    for(i=0; i<animals.length; i++){
        if (name === animals[i].name){
            console.log(animals[i]);
            animals.splice(i, 1);
            console.log(name + " removed");
        }
    }

}
console.log(animals);
delete1("Nala");
console.log(animals);

module.exports = { getall, get, delete1 }