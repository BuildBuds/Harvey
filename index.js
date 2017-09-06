const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Specifies the technology (e.g. ASP.NET, PHP, JBoss) supporting the web application
app.set('x-powered-by', false);

// Information as to what setting trust proxy does https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', true);

// Set the static assets folder to serve to the applications front end
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home')
});

app.listen(3000, () => {
  console.log('Express server is now listening on port 3000');
});
