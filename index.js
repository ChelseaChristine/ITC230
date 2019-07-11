'use strict'
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let animal = require('./lib/data');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");

// dyanmic response with the home page showing all the animals in the list
app.get('/', (req, res) => {
  res.render('home', {animals: animal.getAll()});
 });

 // send plain text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('this application is for utilizing in my ITC230 class');
 });

//gets an animal name query, then either returns with not found or the results
 app.get('/detail', (req, res) => {
  res.type('text/plain');
  let found = animal.getItem(req.query.name);
  console.log(req.query);
  let result = (found) ? JSON.stringify(found) : JSON.stringify(req.query.name) + "Not found";
  res.send('Searching for ' + JSON.stringify(req.query.name) + "\n" + result);
});
//runs utilizing a submission form and opens a specific details page
app.post('/detail', (req, res) => {
  console.log(req.body); // display parsed form submission
  let found2 = animal.getItem(req.body.name);
  res.render('details', {name: req.body.name, result: found2 });
});

//gets an animal name query, and will remove it if it exists
app.get('/delete', (req, res) => {
  let remove = animal.deleteItem(req.query.name);
  res.render('delete', {name: req.query.name, result: remove });
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
 
