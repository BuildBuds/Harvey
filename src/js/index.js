console.log('pomf');

// TODO Populate pred
// Assumes that the keys are the same as the data you intend to filter by
// Also assumes that the values are arrays.
// I commented out the call to isLocal for several reasons I can mention later.
var pred = {
  'types': ['Time'],
  'tags': ['Medical'],
  'local': false
};

/*

(function() {
  var isLocal = function(add) {
    return add.toLowerCase().indexOf('houston') >= 0;
  };

  var out = orgs.filter((org) => {
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
})();

*/


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