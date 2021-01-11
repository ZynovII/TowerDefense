class Tower {
  self = this;
  myView = null;

  constructor(){
    this.iterator = 0;
  }
  set(view, model) {
    this.myView = view;
    this.myModel = model;
    this.myView.render();
  }
  reactOnEnemy() {
    this.iterator+=16;
    this.enemyElemAll = this.myModel.units;
    let findClosestElem = (arr) => {
      let newArr = [];
      for(let elem of arr){
        newArr.push(elem);
        let differenceX = this.myView.posX - elem.posX;
        let differenceY = this.myView.posY - elem.posY;
        let sumSqrt = Math.pow(differenceX,2)+Math.pow(differenceY,2);
        elem.distance = Math.sqrt(sumSqrt);
      }
      newArr.sort( (a, b) => a.distance - b.distance )
      return newArr[0];
    }
    let enemyElem = findClosestElem(this.enemyElemAll);
    if(enemyElem){
      let enemyElemPosX = enemyElem.posX + enemyElem.width/2;
      let enemyElemPosY = enemyElem.posY + enemyElem.width/2 + this.myModel.enemyArea.offsetHeight;
      this.angleTower = -Math.atan((this.myView.posX - enemyElemPosX) / (this.myView.posY - enemyElemPosY)) * 180 / Math.PI;
    }
    this.myView.update();
    if(this.iterator >= 1100 && this.myModel.units.length !== 0) {
      this.myModel.bullets.push(this.fire());
      this.iterator = 0;
    }
  }
}

class ModelGreenTower extends Tower {
  fire() {
    this.bulletObj = new Bullet(this.myView, this.myModel);
    this.bulletObj.render();
    return this.bulletObj;
  }
}
class ModelBlueTower extends Tower {
  fire() {
    this.freezerObj = new Freezer(this.myView, this.myModel);
    this.freezerObj.render();
    return this.freezerObj;
  }
}
class ModelWhiteTower extends Tower {
  fire() {
    this.destroyerObj = new Destroyer(this.myView, this.myModel);
    this.destroyerObj.render();
    return this.destroyerObj;
  }
}
