'use strict';

function ModelTowerCell() {
  let myView = null;
  let myModel = null;
  let myLevel = null;
  let myTower = null;

  this.posX = 0;

  this.set = function(view, model, correct) {
    myView = view;
    myModel = model;
    myLevel = myModel.currLevel;
    this.posX = myView.fieldLength * (correct+1)/5;
    myView.render();
  }
  this.rotate = function() {
    myView.rotate();
  }
  this.createTower = function(tower) {
    newTower = new tower.classTower;
    newTower.render();
  }
}