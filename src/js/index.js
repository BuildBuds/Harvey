// Full list of orgs
var orgs;
var quizForm = document.querySelector('.quiz-form');
var quizResults = document.querySelector('.results');
var main = document.querySelector('.main');
var nav = document.querySelector('nav');

<<<<<<< HEAD
=======
var httpGet = function(url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
};
>>>>>>> ce5240d02897c27688829794e91a3ff81cb730c2

// Handles form submission
var submitHandler = function(e) {
  e.preventDefault();

  var showRelevantOrgs = function() {
    var getQuizParams = function() {
      // Thanks for the code
      // https://stackoverflow.com/questions/8563240/how-to-get-all-checked-checkboxes
      var getCheckedBoxes = function(cbs) {
        var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<cbs.length; i++) {
           // And stick the checked ones onto an array...
           if (cbs[i].checked) {
              checkboxesChecked.push(cbs[i]);
           }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      };

      var q1cbs = document.querySelectorAll('.q1 input');
      var q2cbs = document.querySelectorAll('.q2 input');

      var q1Params = getCheckedBoxes(q1cbs);
      var q2Params = getCheckedBoxes(q2cbs);

      var types = [];
      var tags = [];

      for (var i=0; i<q1Params.length; i++) { tags.push(q1Params[i].value); }
      for (var i=0; i<q2Params.length; i++) { types.push(q2Params[i].value); }


      return {
        'types': types,
        'tags': tags,
        'local': false
      };
    };

    // TODO Populate pred
    var pred = getQuizParams();

    var out = orgs.filter(function(org) {
      // If the values in the predicate ARE NOT in org, remove it
      var isLocal = function(add) {
        return add.toLowerCase().indexOf('houston') >= 0;
      };

      var found = false;
      for (var type in pred['types']) {
        if (org['types'].indexOf(type) < 0) {
          found = true;
        }
      }

      if (found == false) { return false; }

      if (pred['tags'].indexOf(org['tags'][0]) < 0) {
        return false;
      }

      if (pred['local']) {
        return isLocal(org.address);
      }

      return true;
    });
<<<<<<< HEAD

    return out;
  };

  var relevantOrgs = showRelevantOrgs();
  console.log(relevantOrgs);
=======
  });
})();

// Target the quiz form
var quizForm = document.querySelector('.quiz-form');
var quizResults = document.querySelector('.results');
var main = document.querySelector('.main');
var nav = document.querySelector('nav')

// Listen for submit of quiz form
quizForm.addEventListener('submit', submitHandler);
>>>>>>> ce5240d02897c27688829794e91a3ff81cb730c2

  // make the quiz display none
  quizForm.classList.add('hidden');

  // make the results page display
  quizResults.classList.remove('hidden');

  // make the main section take up the whole page
  main.classList.add('full-grid');

  // make the nav appear
  nav.classList.remove('hidden');

};

var setContent = function(json) {
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


(function() {
  var apiCallback = function(data) {
    var parsed = JSON.parse(data);
    orgs = parsed.res;
  };

  httpGet('https://harvey-api.mybluemix.net/api/0.1/hh', function(d) { apiCallback(d); });
})();
