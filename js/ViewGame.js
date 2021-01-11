'use strikt';

function ViewGame() {
  let myModel = null;

  const field = document.createElement('div');
  const fieldUp = document.createElement('div');
  const upperWall = document.createElement('div');
  const fieldMiddle = document.createElement('div');
  const lowerWall = document.createElement('div');
  const fieldDown = document.createElement('div');

  const _greenTower = document.createElement('img');
  const _blueTower = document.createElement('img');
  const _whiteTower = document.createElement('img');
  const greenTowerCard = document.createElement('div');
  const blueTowerCard = document.createElement('div');
  const whiteTowerCard = document.createElement('div');

  const currLvlDOM = document.createElement('div');
  const menuBtn = document.createElement('div');
  this.scoreDOM = document.createElement('div');
  const towerMenu = document.createElement('div');

  this.field = field;
  this.battleArea = fieldMiddle;
  this.wallUp = upperWall;
  this.wallDown = lowerWall;
  this.greenTower = _greenTower;
  this.blueTower = _blueTower;
  this.whiteTower = _whiteTower;

  this.set = function(model) {
    myModel = model;
  }
  this.render = function() {
    this.scoreDOM.classList.add('score');
    currLvlDOM.classList.add('level');
    menuBtn.classList.add('start-button');
    towerMenu.classList.add('tower-menu');
    field.classList.add('field');
    fieldUp.classList.add('fieldUp');
    upperWall.classList.add('wall');
    fieldMiddle.classList.add('fieldMiddle');
    lowerWall.classList.add('wall');
    fieldDown.classList.add('fieldDown');

    menuBtn.setAttribute('id', 'menu');
    _greenTower.setAttribute('src', 'img/green_canon.svg');
    _blueTower.setAttribute('src', 'img/blue_canon.svg');
    _whiteTower.setAttribute('src', 'img/peremen_canon.svg');
    greenTowerCard.innerHTML = '100$';
    blueTowerCard.innerHTML = '200$';
    whiteTowerCard.innerHTML = '500$';

    fieldUp.appendChild(menuBtn);
    fieldUp.appendChild(currLvlDOM);
    fieldUp.appendChild(this.scoreDOM);
    blueTowerCard.appendChild(_blueTower);
    whiteTowerCard.appendChild(_whiteTower);
    greenTowerCard.appendChild(_greenTower);
    towerMenu.appendChild(greenTowerCard);
    towerMenu.appendChild(blueTowerCard);
    towerMenu.appendChild(whiteTowerCard);
    fieldDown.appendChild(towerMenu);
    field.appendChild(fieldUp);
    field.appendChild(upperWall);
    field.appendChild(fieldMiddle);
    field.appendChild(lowerWall);
    field.appendChild(fieldDown);
    document.body.appendChild(field);
    
    currLvlDOM.innerHTML = 'level ' + (myModel.currLevel+1);
    this.scoreDOM.innerHTML = myModel.score;
    menuBtn.innerHTML = 'menu';
  }
  this.update = function() {
    currLvlDOM.innerHTML = 'level ' + (myModel.currLevel+1);
    this.scoreDOM.innerHTML = myModel.score;
  }
}