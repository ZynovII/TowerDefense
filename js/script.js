'use strict';
const block = 50;

var gameModelObj = new ModelGame();
var gameViewObj = new ViewGame();
var gameControllerObj = new ControllerGame();

gameViewObj.set(gameModelObj);
gameModelObj.set(gameViewObj, gameControllerObj);
gameControllerObj.set(gameModelObj);
