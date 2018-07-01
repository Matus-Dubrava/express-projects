// Just a simple function that generates random integer in a
// provided range.
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

module.exports = {
  getRandom
};
