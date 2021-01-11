class Bullet {
  enemyElem = null;
  constructor(dom, model) {
    this.bulletDOM = document.createElement('div');
    this.bulletDOM.classList.add('bullet');
    this.myTower = dom;
    this.myModel = model;
    this.width = this.myTower._width / 6.25;
    this.posX = this.myTower.posX - this.width/2 + this.myTower._width/2;
    this.posY = this.myTower.posY - this.width/2 + this.myTower._width/2;
    this.enemyElemAll = this.myModel.units;
    this.pathPass = 0; 
    let findClosestElem = (arr) => {
      let newArr = [];
      for(let elem of arr){
        newArr.push(elem);
        let differenceX = this.myTower.posX - elem.posX;
        let differenceY = this.myTower.posY - elem.posY;
        let sumSqrt = Math.pow(differenceX,2)+Math.pow(differenceY,2);
        elem.distance = Math.sqrt(sumSqrt);
      }
      newArr.sort( (a, b) => a.distance - b.distance )
      return newArr[0];
    }
    this.enemyElem = findClosestElem(this.enemyElemAll);
    if(this.enemyElem) {
      this.enemyElemWidth = this.enemyElem.width;
      this.enemyElemHeight = this.enemyElem.width;
      this.enemyElemPosX = this.enemyElem.posX + this.enemyElemWidth/2;
      this.enemyElemPosY = this.enemyElem.posY + this.enemyElemHeight/2 + this.myModel.enemyArea.offsetTop;
      this.speedX = (this.posX - this.enemyElemPosX - this.enemyElemWidth) / 60;
      this.speedY = (this.posY - this.enemyElemPosY) / 60;
    }
  }
  render() {
    this.bulletDOM.style.width = this.width + 'px';
    this.bulletDOM.style.height = this.width + 'px';
    this.bulletDOM.style.left = this.posX + 'px';
    this.bulletDOM.style.top = this.posY +'px';
    document.body.appendChild(this.bulletDOM);
    return 1;
  }
  destroy() {
    this.myModel.bullets.shift();
    this.bulletDOM.remove();
  }
  fly() {
    this.posX -= this.speedX;
    this.posY -= this.speedY;
    this.bulletDOM.style.left = this.posX + 'px';
    this.bulletDOM.style.top = this.posY +'px';
    this.pathPass+=16;
    if(this.pathPass >= 1000){
      if(!this.enemyElem.isDead) {
        this.enemyElem.hit();
      }
      this.destroy();
      this.pathPass=0;
    }
  }
}

class Freezer {
  enemyElem = null;
  constructor(dom, model) {
    this.bulletDOM = document.createElement('div');
    this.bulletDOM.classList.add('freezer');
    this.myTower = dom;
    this.myModel = model;
    this.width = this.myTower._width / 6.25;
    this.posX = this.myTower.posX - this.width/2 + this.myTower._width/2;
    this.posY = this.myTower.posY - this.width/2 + this.myTower._width/2;
    this.enemyElemAll = this.myModel.units;
    this.pathPass = 0; 
    let findClosestElem = (arr) => {
      let newArr = [];
      for(let elem of arr){
        newArr.push(elem);
        let differenceX = this.myTower.posX - elem.posX;
        let differenceY = this.myTower.posY - elem.posY;
        let sumSqrt = Math.pow(differenceX,2)+Math.pow(differenceY,2);
        elem.distance = Math.sqrt(sumSqrt);
      }
      newArr.sort( (a, b) => a.distance - b.distance )
      return newArr[0];
    }
    this.enemyElem = findClosestElem(this.enemyElemAll);
    if(this.enemyElem) {
      this.enemyElemWidth = this.enemyElem.width;
      this.enemyElemHeight = this.enemyElem.width;
      this.enemyElemPosX = this.enemyElem.posX + this.enemyElemWidth/2;
      this.enemyElemPosY = this.enemyElem.posY + this.enemyElemHeight/2 + this.myModel.enemyArea.offsetTop;
      this.speedX = (this.posX - this.enemyElemPosX - this.enemyElemWidth) / 60;
      this.speedY = (this.posY - this.enemyElemPosY) / 60;
    }
  }
  render() {
    this.bulletDOM.style.width = this.width + 'px';
    this.bulletDOM.style.height = this.width + 'px';
    this.bulletDOM.style.left = this.posX + 'px';
    this.bulletDOM.style.top = this.posY +'px';
    document.body.appendChild(this.bulletDOM);
    return 1;
  }
  destroy() {
    this.bulletDOM.remove();
  }
  fly() {
    if(this.enemyElem) {
      this.posX -= this.speedX;
      this.posY -= this.speedY;
      this.width += 0.1;
      this.bulletDOM.style.width = this.width + 'px';
      this.bulletDOM.style.height = this.width + 'px';
      this.bulletDOM.style.left = this.posX + 'px';
      this.bulletDOM.style.top = this.posY +'px';
      this.pathPass+=16;
      if(this.pathPass >= 1000){
        if(!this.enemyElem.isDead) {
          this.enemyElem.freez();
        }
        this.destroy();
        this.pathPass=0;
      }
    }
  }
}
class Destroyer {
    enemyElem = null;
  constructor(dom, model) {
    this.bulletDOM = document.createElement('div');
    this.bulletDOM.classList.add('super-bullet');
    this.myTower = dom;
    this.myModel = model;
    this.width = this.myTower._width / 6.25;
    this.posX = this.myTower.posX - this.width/2 + this.myTower._width/2;
    this.posY = this.myTower.posY - this.width/2 + this.myTower._width/2;
    this.enemyElemAll = this.myModel.units;
    this.pathPass = 0; 
    let findClosestElem = (arr) => {
      let newArr = [];
      for(let elem of arr){
        newArr.push(elem);
        let differenceX = this.myTower.posX - elem.posX;
        let differenceY = this.myTower.posY - elem.posY;
        let sumSqrt = Math.pow(differenceX,2)+Math.pow(differenceY,2);
        elem.distance = Math.sqrt(sumSqrt);
      }
      newArr.sort( (a, b) => a.distance - b.distance )
      return newArr[0];
    }
    this.enemyElem = findClosestElem(this.enemyElemAll);
    if(this.enemyElem) {
      this.enemyElemWidth = this.enemyElem.width;
      this.enemyElemHeight = this.enemyElem.width;
      this.enemyElemPosX = this.enemyElem.posX + this.enemyElemWidth/2;
      this.enemyElemPosY = this.enemyElem.posY + this.enemyElemHeight/2 + this.myModel.enemyArea.offsetTop;
      this.speedX = (this.posX - this.enemyElemPosX - this.enemyElemWidth) / 60;
      this.speedY = (this.posY - this.enemyElemPosY) / 60;
    }
  }
  render() {
    this.bulletDOM.style.width = this.width + 'px';
    this.bulletDOM.style.height = this.width + 'px';
    this.bulletDOM.style.left = this.posX + 'px';
    this.bulletDOM.style.top = this.posY +'px';
    document.body.appendChild(this.bulletDOM);
    return 1;
  }
  destroy() {
    this.bulletDOM.remove();
  }
  fly() {
    if(this.enemyElem) {
      this.width += 0.3;
      this.bulletDOM.style.width = this.width + 'px';
      this.bulletDOM.style.height = this.width + 'px';
      this.posX -= this.speedX;
      this.posY -= this.speedY;
      this.bulletDOM.style.left = this.posX + 'px';
      this.bulletDOM.style.top = this.posY +'px';
      this.pathPass+=16;
      if(this.pathPass >= 1000){
        if(!this.enemyElem.isDead) {
          this.enemyElem.superhit();
        }
        this.destroy();
        this.pathPass=0;
      }
    }
  }
}