var getStateName = require('./getStateName');
var getTargetName = require('./getTargetName');

module.exports = function(settings) {
  var states = {};
  var targetNames = Object.keys(settings.targets);
  var numTargets = targetNames.length;
  var targetIdx;

  for(var column = 0; column < settings.columns; column++) {
    for(var row = 0; row < settings.rows; row++) {  
      targetIdx = row * settings.columns + column;

      if(targetIdx < numTargets) {
        states[ targetNames[ targetIdx ] ] = getState(settings, row, column);  
      }
    }
  }

  return states;
};

function getState(settings, r, c) {
  var state = {};
  var cellWidth = settings.cellWidth;
  var cellHeight = settings.cellHeight;
  var offX = c * cellWidth;
  var offY = r * cellHeight;
  var targetNames = Object.keys(settings.targets);
  var numTargets = targetNames.length;
  var targetIdx;

  for(var column = 0; column < settings.columns; column++) {
    for(var row = 0; row < settings.rows; row++) {    

      targetIdx = row * settings.columns + column;

      if(targetIdx < numTargets) {
        state[ targetNames[ targetIdx ] ] = {
          position: [ 
            column * cellWidth - offX, 
            row * cellHeight - offY,
            0
          ]
        };
      }
    }
  }

  return state;
}