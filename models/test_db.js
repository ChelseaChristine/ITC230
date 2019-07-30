var Animal = require("./animal");

//counts how many are in the list
Animal.countDocuments((err, result) => {
    console.log(result);

});

Animal.find({}, (err,result) => {
    if(err){
        console.log(err)
    }
    else {
        return result;
        console.log(result);
    }

});