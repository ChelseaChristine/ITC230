var Animal = require("./animal");

//new Animal({animal:"Dog", name: "scruffy", age:"7"});

Animal.countDocuments((err, result) => {
    console.log(result);

});

Animal.find({}, (err,result) => {
    if(err){
        console.log(err)
    }
    else {
         console.log(result);
    }

});