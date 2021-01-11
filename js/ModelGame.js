'use strict';

function ModelGame() {
  let self = this;
  let myView = null;
  let myController = null;
  let timer;
  let unitsViews = [];
  let activeUnits = [];
  let timePass = 0; //safe timer fo new units
  this.levels = [
    {units: 10, cells: 5, unitsSpeed: 0.35, unitsHP: 85, frequency: 120},
    {units: 15, cells: 6, unitsSpeed: 0.5, unitsHP: 100, frequency: 120},
    {units: 20, cells: 6, unitsSpeed: 1, unitsHP: 120, frequency: 60},
    {units: 25, cells: 7, unitsSpeed: 1, unitsHP: 150, frequency: 60},
    {units: 32, cells: 7, unitsSpeed: 1, unitsHP: 200, frequency: 60}
  ];
  this.towers = [];
  this.bullets = [];
  this.score = 100;
  this.field = null;
  this.currLevel = 0;
  this.wallUp = null;
  this.wallDown = null;
  this.enemyArea = null;
  this.units = [];
  this.unitsNumber;

  function startGame() {
    self.moveEnemies();
    for(let i = 0; i < self.towers.length; i++) {
      self.towers[i].reactOnEnemy();
    }
    for(let i = 0; i < self.bullets.length; i++) {
      self.bullets[i].fly();
    }
    if(self.units.length <= 0){
      startNewLevel();
    }
  }
  function startNewLevel() {
    self.currLevel++;
    if(self.currLevel >= self.levels.length) {
      self.pause();
      return;
    }
    myView.update();
    enemyStarter();
    cellsPlacer();
    setTimeout(self.start, 1000);
  }
  function enemyStarter() {
    self.enemyArea = myView.battleArea;
    self.unitsNumber = self.levels[self.currLevel].units;
    //add enemies numbers of currLevel
    for(let i = 0; i < self.unitsNumber; i++) {
      let enemyModelObj = new ModelEnemy(i);
      let enemyViewObj = new ViewEnemy();
      enemyViewObj.set(enemyModelObj, self.enemyArea);
      enemyModelObj.set(enemyViewObj, self);
      self.units.push(enemyModelObj);
      unitsViews.push(enemyViewObj);
    }
    for(let i = 0; i < self.units.length; i++) {
      self.units[i].render();
      self.units[i].startPlace();
    }
  }
  function cellsPlacer() {
    self.wallUp = myView.wallUp;
    self.wallDown = myView.wallDown;
    self.field = myView.field;
    for(let i = 0; i < Math.floor(self.levels[self.currLevel].cells / 2); i++) {
      let cellModelObj = new ModelTowerCell();
      let cellViewObj = new ViewTowerCell();
      cellViewObj.set(cellModelObj, self.wallUp);
      cellModelObj.set(cellViewObj, self, i);
      cellModelObj.rotate();
    }
    for(let i = 0; i < Math.ceil(self.levels[self.currLevel].cells / 2); i++) {
      let cellModelObj = new ModelTowerCell();
      let cellViewObj = new ViewTowerCell();
      cellViewObj.set(cellModelObj, self.wallDown);
      cellModelObj.set(cellViewObj, self, i);
    }
  }
  function notEnaught() {
    myView.scoreDOM.style.color = 'red';
    setTimeout( () => myView.scoreDOM.style.color = 'white', 1000)
  }

  this.set = function(view, controller) {
    myView = view;
    myController = controller;
    myView.render();
    enemyStarter();
    cellsPlacer();
    myView.blueTower.addEventListener('pointerdown', dragStart);
    myView.greenTower.addEventListener('pointerdown', dragStart);
    myView.whiteTower.addEventListener('pointerdown', dragStart);
    myView.greenTower.ondragstart = function() {
      return false;
    };
    myView.blueTower.ondragstart = function() {
      return false;
    };
    myView.whiteTower.ondragstart = function() {
      return false;
    };
  }

  this.moveEnemies = function() {
    function addActiveUnits() {
      activeUnits.push(1);
    }
    timePass++;
    if(timePass % self.levels[self.currLevel].frequency === 0) {
      if(self.units.length !== 0 && self.units.length !== activeUnits.length) {
        addActiveUnits();
      }
      timePass=0;
    }
    for(let i = 0; i < activeUnits.length; i++) {
      self.units[i].run();
    }
  }
  this.killUnit = function(obj) {
    let killedIndex;
    for(let i=0; i<self.units.length; i++) {
      if(self.units[i].index === obj) killedIndex = i;
    }
    self.units.splice(killedIndex, 1);
    unitsViews.splice(killedIndex, 1);
    activeUnits.pop();
    this.score += 25;
    myView.update();
  }
  this.start = function() {
    if(!timer) {
      timer = setInterval(startGame, 16);
    }
  }
  this.pause = function() {
    clearInterval(timer);
    timer = null;
  }
  this.updateView = function() {
    if (myView) {
      myView.update();
    }
  };

  function dragStart(EO) {
    EO = EO || window.event;
    var selfy = this;
    if ( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ){
      var touchInfo=EO.targetTouches[0];
    }
    var newDragElem = document.createElement('div');
    switch(selfy) {
      case myView.greenTower:
        if(self.score >= 100) {
          newDragElem.innerHTML = `
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
              <g>
                <ellipse stroke="#000" ry="20" rx="20" id="svg_1" cy="25" cx="25" stroke-width="1.5" fill="#30ff30"/>
                <ellipse stroke="#000" ry="14" rx="14" id="svg_2" cy="25" cx="25" stroke-opacity="null" stroke-width="1.5" fill="#00ff00"/>
                <rect id="svg_4" height="25" width="8" y="0" x="21" stroke-width="1.5" stroke="#0f0f00" fill="#006000"/>
              </g>
            </svg>
          `; 
          break;
        }
        notEnaught();
        return;

      case myView.blueTower:
        if(self.score >= 200) {
          newDragElem.innerHTML = `
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
              <g>
                <ellipse stroke="#000" ry="20" rx="20" id="svg_1" cy="25" cx="25" stroke-width="1.5" fill="#0000ff"/>
                <ellipse stroke="#000" ry="14" rx="14" id="svg_2" cy="25" cx="25" stroke-opacity="null" stroke-width="1.5" fill="#0000ff"/>
                <rect id="svg_4" height="25" width="8" y="0" x="21" stroke-width="1.5" stroke="#0f0f00" fill="#000060"/>
              </g>
            </svg>
          `;
          break;
        }
        notEnaught();
        return;
        
      case myView.whiteTower:
        if(self.score >= 500) {
          newDragElem.innerHTML = `
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
              <g>
                <ellipse stroke="#000" ry="20" rx="20" id="svg_1" cy="25" cx="25" stroke-width="1.5" fill="#ff0000"/>
                <ellipse stroke="#000" ry="14" rx="14" id="svg_2" cy="25" cx="25" stroke-opacity="null" stroke-width="1.5" fill="#ffffff"/>
                <rect id="svg_4" height="25" width="8" y="0" x="21" stroke-width="1.5" stroke="#0f0f00" fill="#a00000"/>
              </g>
            </svg>
          `;
          break;
        }
        notEnaught();
        return;
          
    }
    newDragElem.style.position = 'absolute';
    newDragElem.style.cursor = 'grabbing';
    self.field.appendChild(newDragElem);
    if ( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ){
      let touchShiftX=touchInfo.pageX-newDragElem.offsetLeft;
      let touchShiftY=touchInfo.pageY-newDragElem.offsetTop;
    }
    let shiftX = newDragElem.offsetWidth/2;
    let shiftY = newDragElem.offsetHeight/2;
    moveAt(EO.pageX, EO.pageY);

    function moveAt(pageX, pageY) {
      newDragElem.style.left = pageX - (touchInfo? touchShiftX : shiftX) + 'px';
      newDragElem.style.top = pageY - (touchInfo? touchShiftY : shiftY) + 'px';
    };
    self.field.addEventListener('pointermove', dragMove);

    function dragMove(EO) {
      if ( ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch ) {
        moveAt(touchInfo.pageX, touchInfo.pageY);
      } else {
        moveAt(EO.pageX, EO.pageY);
      }
    }

    newDragElem.addEventListener('pointerup', dragEnd);
    
    function dragEnd(EO) {
      newDragElem.hidden = true;
      let elemBelow = document.elementFromPoint(EO.clientX, EO.clientY);
      newDragElem.hidden = false;
      if (!elemBelow) return;
      self.field.removeEventListener('pointermove', dragMove);
      newDragElem.remove();
      if(elemBelow.closest('.tower-cell') && !elemBelow.length && !elemBelow.closest('svg')) {
        switch(selfy) {
        case myView.greenTower: 
          let greenTowerModelObj = new ModelGreenTower();
          let greenTowerViewObj = new ViewGreenTower();
          greenTowerViewObj.set(greenTowerModelObj, elemBelow);
          greenTowerModelObj.set(greenTowerViewObj, self);
          self.towers.push(greenTowerModelObj);
          self.score -= 100;
          myView.update();
          break;
        case myView.blueTower:
          let blueTowerModelObj = new ModelBlueTower();
          let blueTowerViewObj = new ViewBlueTower();
          blueTowerViewObj.set(blueTowerModelObj, elemBelow);
          blueTowerModelObj.set(blueTowerViewObj, self);
          self.towers.push(blueTowerModelObj);
          self.score -= 200;
          myView.update();
          break;
        case myView.whiteTower: 
          let whiteTowerModelObj = new ModelWhiteTower();
          let whiteTowerViewObj = new ViewWhiteTower();
          whiteTowerViewObj.set(whiteTowerModelObj, elemBelow);
          whiteTowerModelObj.set(whiteTowerViewObj, self);
          self.towers.push(whiteTowerModelObj);
          self.score -= 500;
          myView.update();
          break;
      }
      }
      selfy.removeEventListener('pointerup', dragEnd);
    }
  }
}
