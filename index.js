const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Use express
const app = express();

// Specifies the technology (e.g. ASP.NET, PHP, JBoss) supporting the web application
app.set('x-powered-by', false);

// Information as to what setting trust proxy does https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);

// Set the static assets folder to serve to the applications front end
app.use(express.static(path.join(__dirname, 'public')));

// Register handlebars as an engine and specify our default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// Set our view engines file extension to handlebars
app.set('view engine', 'handlebars');

// Cache views in production
app.enable('view cache');

// Home Route
app.get('/', (req, res) => {
  res.render('home')
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Express server is now listening on port 3000');
});
