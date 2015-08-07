var f1Grid = require('./.');
var f1 = require('f1');
var f1Dom = require('f1-dom');

var rows = 10;
var columns = 5;
var numTargets = 12;
var cellWidth = 200;
var cellHeight = 200;

var container = getCell();

var targets = Array.apply(null, Array(numTargets))
.map( function() {

  var cell = getCell();

  container.appendChild(cell);

  return cell;
})
.reduce( function(targets, current, i) {

  var row = Math.floor(i / columns);
  var column = i - row * columns;

  targets[ 'cell' + i ] = current;

  return targets;
}, {});

var settings = f1Grid( {
  targets: targets,
  cellWidth: cellWidth,
  cellHeight: cellHeight,
  rows: rows,
  columns: columns,
  animateInAngles: true
});

settings.targets = targets;
settings.parsers = f1Dom;

var ui = f1(settings)
.init('cell0');

container.style.position = 'relative';
container.style.overflow = 'hidden';
document.body.appendChild(container);

window.onmouseup = function() {

  var targetNames = Object.keys(targets);
  var target = targetNames[ Math.round(Math.random() * (targetNames.length - 1))];

  ui.go(target);
};

function getCell() {
  var cell = document.createElement('div');

  var color = Math.floor((Math.random() * 0xFFFFFF)).toString(16);

  cell.style.background = '#' + color;
  cell.style.width = cellWidth + 'px';
  cell.style.height = cellHeight + 'px';

  return cell;
}