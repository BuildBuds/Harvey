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
