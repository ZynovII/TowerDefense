'use strict';

function ViewTowerCell() {
  let myModel = null;
  let myDOM = null;
  let towerCell = document.createElement('div');
  
  this.cellHeight;
  this.fieldLength = null;

  this.set = function(model, dom) {
    myModel = model;
    myDOM = dom;
    this.cellHeight = myDOM.offsetHeight;
    this.fieldLength = myDOM.offsetWidth;
  }
  this.rotate = function() {
    towerCell.style.transform = 'rotate(-180deg)';
    towerCell.classList.add('tower-cell-up')
  }
  this.render = function() {
    towerCell.classList.add('tower-cell');
    towerCell.style.width = myDOM.offsetHeight + 'px';
    towerCell.style.height = myDOM.offsetHeight + 'px';
    towerCell.style.left = myModel.posX + 'px';
    myDOM.appendChild(towerCell);
  }
}