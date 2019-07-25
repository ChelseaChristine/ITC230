'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let Animal = require("./models/animal");
let animal = require("./lib/animalMethods");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// dyanmic response with the home page showing all the animals in the list
app.get('/', (req, res, next) => {
  animal.getAll().then((allAnimals) => {
    res.render('home', {animals: allAnimals }); 
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
    res.render('delete',{name: req.query.name, result: remove});
  }).catch((err) =>{
    return next(err);
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
 
