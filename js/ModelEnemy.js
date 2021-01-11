'use strict';

function ModelEnemy(indexes) {
  let myView = null;
  let myGameModel = null;
  let myType = null;

  this.index = indexes;
  this.posX = 0;
  this.posY = 0;
  this.width;
  this.endPosX;

  this.set = function(view, model) {
    myView = view;
    myGameModel = model;
    this.endPosX = myView.endOfFieldX;
    this.width = myView.width;  
    this.healthPoints = myGameModel.levels[myGameModel.currLevel].unitsHP;
    this.speed = myGameModel.levels[myGameModel.currLevel].unitsSpeed;
  }
  this.updateView = function() {
    if (myView) {
      myView.update();
    }
  }
  this.freez = function() {
    this.speed = 0.25;
    myView.freez();
    setTimeout( () => {
      this.speed = 0.5;
      myView.normal();
    }, 1000);
    this.healthPoints -= 10;
    if(this.healthPoints <= 0) {
      this.die();
    }
  }
  this.superhit = () => {
    this.healthPoints -= 100;
    this.die();
  }
  this.hit = function() {
    this.healthPoints -= 25;
    if(this.healthPoints <= 0) {
      this.die();
    }
  }
  this.die = function() {
    this.isDead = true;
    myView.die();
    myGameModel.killUnit(this.index);
  }
  this.render = function() {
    myView.render();
  }
  this.startPlace = function() {
    this.posX = myView.startPosX;
    this.posY = myView.startPosY;
    myView.update();
  }
  this.run = function() {
    if(this.posX !== this.endPosX){
      this.posX += this.speed;
    }
    if(this.posX >= this.endPosX){
      this.die();
      myGameModel.score -= 50;
      myGameModel.updateView();
    }
    myView.update();
  }
}