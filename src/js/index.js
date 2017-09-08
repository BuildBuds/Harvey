console.log('pomf');
var orgs;
// TODO Populate pred
var pred = {
  'types': ['Time'],
  'tags': ['Medical'],
  'local': false
};

var httpGet = function(url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
};

(function() {
  var isLocal = function(add) {
    return add.toLowerCase().indexOf('houston') >= 0;
  };

  var out;

  httpGet('https://harvey-api.mybluemix.net/api/0.1/hh', function(data) {
    console.log(data);

    orgs = data['res'];

    var out = orgs.filter(function(org) {
      for (var key in pred) {
        if (key == 'local') { continue; }

        var vals = pred[key];
        for (var i=0; i<vals.length; i++){
          if (org[key].indexOf(vals[i]) < 0) {
            return false;
          }
        }
      }

      if (pred['local']) {
        return isLocal(org.address);
      }

      return true;
    });
  });
})();

// Target the quiz form
var quizForm = document.querySelector('.quiz-form');
var quizResults = document.querySelector('.results');
var main = document.querySelector('.main');
var nav = document.querySelector('nav')

// Listen for submit of quiz form
quizForm.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  // TODO : store the values of the quiz questions
  
  // make the quiz display none
  quizForm.classList.add('hidden');

  // make the results page display
  quizResults.classList.remove('hidden');

  // make the main section take up the whole page
  main.classList.add('full-grid');

  // make the nav appear
  nav.classList.remove('hidden');
}


// Send data to our html

// fetch('./data.json') // change this to the database path once it's live
// .then(function(res){
//   return res.json();
// })
// .then(function(json){
//   var ourJson = json;
//   setContent(ourJson);
// });



function setContent(json) {
// Grab the template script
var theTemplateScript = document.getElementById('address-template').innerHTML;


// Compile the template
var theTemplate = Handlebars.compile(theTemplateScript);

// Define data object
var context = {
  charities: json
};

// Pass our data to the template
var theCompiledHtml = theTemplate(context);

// Add the compiled html to the page
document.querySelector('.content-placeholder').innerHTML = theCompiledHtml;
};