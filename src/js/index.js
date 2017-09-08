// Full list of orgs
var orgs;
var quizForm = document.querySelector('.quiz-form');
var quizResults = document.querySelector('.results');
var main = document.querySelector('.main');
var nav = document.querySelector('nav');

var httpGet = function(url, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
};
function setDetails(org) {
  document.querySelector('.selection-title').textContent = org.name;
  document.querySelector('.grade').textContent = org.overall;
  document.querySelector('.percent').textContent = org.program_percentage + '%';
  document.querySelector('.selection-link').setAttribute('target', '_blank');
  document.querySelector('.selection-link').setAttribute('href', org.url);
}

var setContent = function(orgs) {
  setDetails(orgs[0]);
  var ul = document.querySelector('.results-list');
  orgs.forEach(function(org, i) {
    var li = document.createElement('li');
    li.classList.add('results-item');
    var button = document.createElement('button');
    button.classList.add('results-item-button');
    button.textContent = org.name;

    button.addEventListener('click', function() {
      setDetails(org);
    })
    button.addEventListener('focus', function() {
      setDetails(org);
    })

    li.appendChild(button);
    ul.appendChild(li);
  })
};


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

    console.log(out);
    return out;
  };

  var relevantOrgs = showRelevantOrgs();
  setContent(relevantOrgs);

  // make the quiz display none
  quizForm.classList.add('hidden');

  // make the results page display
  quizResults.classList.remove('hidden');

  // make the main section take up the whole page
  main.classList.add('full-grid');

  // make the nav appear
  nav.classList.remove('hidden');
};


quizForm.addEventListener('submit', submitHandler);


(function() {
  var apiCallback = function(data) {
    var parsed = JSON.parse(data);
    orgs = parsed.res;
    console.log('orgs', orgs)
  };

  httpGet('https://harvey-api.mybluemix.net/api/0.1/hh', function(d) { apiCallback(d); });
})();
