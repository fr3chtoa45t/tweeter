

const keysMatch = function(obj1, obj2, keys) {
  if ( keys.find(element => obj1[element] !== obj2[element])) {
    return false;
  }

  return true;
};