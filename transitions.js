module.exports = function(settings) {

  var transitions = [];

  for(var column = 0; column < settings.columns; column++) {
    for(var row = 0; row < settings.rows; row++) {    

      if(settings.animateInAngles) {
        addAngles(settings, transitions, row, column);  
      } else {
        addNonAngles(settings, transitions, row, column);
      }
    }
  }

  return transitions;
};

function addNonAngles(settings, transitions, fromRow, fromColumn) {

  var targetNames = Object.keys(settings.targets);
  var numTargets = targetNames.length;
  var fromIdx = fromRow * settings.columns + fromColumn;
  var targetIdx;

  for(var column = 0; column < settings.columns; column++) {
    for(var row = 0; row < settings.rows; row++) {
      if(
          ( column === fromColumn && row !== fromRow ) ||
          ( column !== fromColumn && row === fromRow )
        ) {

        targetIdx = row * settings.columns + column;

        if(targetIdx < numTargets && fromIdx < numTargets) {
          
          transitions.push( {
            from: targetNames[ fromIdx ],
            to: targetNames[ targetIdx ]
          });  
        }
      }
    }
  }
}

function addAngles(settings, transitions, fromRow, fromColumn) {
  var targetNames = Object.keys(settings.targets);
  var numTargets = targetNames.length;
  var fromIdx = fromRow * settings.columns + fromColumn;
  var targetIdx;

  for(var column = 0; column < settings.columns; column++) {
    for(var row = 0; row < settings.rows; row++) {
      if(column !== fromColumn || row !== fromRow) {

        targetIdx = row * settings.columns + column;

        if(targetIdx < numTargets && fromIdx < numTargets) {
          transitions.push( {
            from: targetNames[ fromIdx ],
            to: targetNames[ targetIdx ]
          });  
        }
      }
    }
  } 
}