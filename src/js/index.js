console.log('pomf');

// TODO Populate pred
// Assumes that the keys are the same as the data you intend to filter by
// Also assumes that the values are arrays.
// I commented out the call to isLocal for several reasons I can mention later.
var pred = {
  'types': 'Time',
  'tags': 'Medical'
};

(function() {
  let out = orgs.filter((org) => {
    for (var key in pred) {
      if (org[key].indexOf(pred[key]) < 0) {
        return false;
      }
    }

    return true;
    // return isLocal(org.address);
  });
})();
