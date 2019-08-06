'use strict'
let express = require("express");
let bodyParser = require("body-parser");
let Animal = require("./models/animal");
let animal = require("./lib/animalMethods");

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions
app.use(bodyParser.json());

app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err)
})
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// dyanmic response with the home page showing all the animals in the list
app.get('/', (req, res, next) => {
  animal.getAll().then((allAnimals) => {
    res.render('homeReact', {animals: JSON.stringify(allAnimals) }); 
  }).catch((err) =>{
    return next(err);
  });
 });

 // send plain text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('this application is for utilizing in my ITC230 class');
 });

//gets an animal name query, then either returns with not found or the results
 app.get('/detail', (req, res, next) => {
  res.type('text/plain');
  animal.getItem(req.query.name).then((found) =>{
    res.render('details',{name: req.query.name, result: found});
  }).catch((err) =>{
    return next(err);
  });
});
//runs utilizing a submission form and opens a specific details page
app.post('/detail', (req, res, next) => {
  animal.getItem(req.body.name).then((found2) =>{
    res.render('details',{name: req.body.name, result: found2});
  }).catch((err) =>{
    return next(err);
  });
});

//gets an animal name query, and will remove it if it exists
app.get('/delete', (req, res, next) => {
  animal.deleteItem(req.query.name).then((remove) =>{ 
    Animal.count((err, total) => {
        res.type('text/html');
        let removed = remove !=0
        console.log(removed);
        res.render('delete', {name: req.query.name, deleted: removed, total: total } );    
    });
  }).catch((err) =>{
    return next(err);
  });
 });



//API's

app.get('/api/v1/animals', (req, res, next) => {
  animal.getAll().then((found) =>{
    res.json(found);
  }).catch((err) =>{
    return next(err);
  });
});

//runs utilizing a submission form and opens a specific details page
app.get('/api/v1/animal/:name', (req, res, next) => {
  animal.getItem(req.params.name).then((found) =>{
    res.json(found);
  }).catch((err) =>{
    return next(err);
  });
});
 

//gets an animal name query, and will remove it if it exists
app.get('/api/v1/book/delete/:name', (req, res, next) => {
  animal.deleteItem(req.params.name).then((remove) =>{ 
    Animal.count((err, total) => {
        let removed = remove !=0
        console.log(removed);
        res.json({"deleted": total});
    });
  }).catch((err) =>{
    return next(err);
  });
 });

 app.post('/api/v1/add/', (req, res, next) => { 
// insert new document    
    let newAnimal = {animal: req.body.animal, name: req.body.name, age: req.body.age };
    let add = animal.addItem(newAnimal);
      console.log(add);
      Animal.count((err, total) => {
          let added = add !=0
          console.log(total);
          res.json({"added": total});
      });
});
 

 // define 404 handler
app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

 app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });
 
