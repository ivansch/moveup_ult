const express = require('express');
const http = require('http');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.Server(app);

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// routes
app.use(require('./routes'));

// sockets


// Static files
app.use(express.static(path.join(__dirname, 'public')));

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
// starting the server
var port = process.env.PORT || 1337;
server.listen(port, () => {
  console.log('Server on port', port);
});