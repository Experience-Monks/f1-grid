var states = require('./states');
var transitions = require('./transitions');

module.exports = function(settings) {

  return {
    
    states: states(settings),
    transitions: transitions(settings)
  };
};