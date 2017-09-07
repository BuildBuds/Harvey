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
