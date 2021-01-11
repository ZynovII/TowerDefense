class ViewTower {
  myModel = null;
  myDOM = null;
  _svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  _bodyTowerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  _headTowerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
  _canonTowerSVG = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  _width;
  constructor() {
  }
  set(model, dom) {
    this.myModel = model;
    this.myDOM = dom;
    this._width = this.myDOM.clientWidth;
    this.posX = this.myDOM.offsetLeft + this.myDOM.clientLeft;
    this.posY = this.myDOM.offsetTop + this.myDOM.clientTop;
  }
  update() {
    this._svg.style.transform = 'rotate(' + this.myModel.angleTower + 'deg)' ;
  }
  renderAll() {
    this._svg.setAttribute('width', this._width);
    this._svg.setAttribute('height', this._width);
    this._bodyTowerSVG.setAttribute('ry', Math.round(this._width / 2 * 0.8));
    this._bodyTowerSVG.setAttribute('rx', Math.round(this._width / 2 * 0.8));
    this._bodyTowerSVG.setAttribute('cx', this._width /2);
    this._bodyTowerSVG.setAttribute('cy', this._width /2);
    this._bodyTowerSVG.setAttribute('stroke', '#000');
    this._headTowerSVG.setAttribute('rx', Math.round(this._width / 2 * 0.56));
    this._headTowerSVG.setAttribute('ry', Math.round(this._width / 2 * 0.56));
    this._headTowerSVG.setAttribute('cy', this._width / 2);
    this._headTowerSVG.setAttribute('cx', this._width / 2);
    this._headTowerSVG.setAttribute('stroke', '#000');
    this._canonTowerSVG.setAttribute('height', this._width /2);
    this._canonTowerSVG.setAttribute('width', Math.round(this._width / 6.25));
    this._canonTowerSVG.setAttribute('y', '0');
    this._canonTowerSVG.setAttribute('x', Math.round(this._width / 2.38));
    this._canonTowerSVG.setAttribute('stroke', '#000');
    this._svg.appendChild(this._bodyTowerSVG);
    this._svg.appendChild(this._headTowerSVG);
    this._svg.appendChild(this._canonTowerSVG);
    this.myDOM.appendChild(this._svg);
  }
}

class ViewGreenTower extends ViewTower {
  render() {
    this._bodyTowerSVG.setAttribute('fill', '#00ff00');
    this._headTowerSVG.setAttribute('fill', '#00ff00');
    this._canonTowerSVG.setAttribute('fill', '#006000');
    super.renderAll();
  }
}
class ViewBlueTower extends ViewTower {
  render() {
    this._bodyTowerSVG.setAttribute('fill', '#0000ff');
    this._headTowerSVG.setAttribute('fill', '#0000ff');
    this._canonTowerSVG.setAttribute('fill', '#000060');
    super.renderAll();
  }
}
class ViewWhiteTower extends ViewTower {
  render() {
    this._bodyTowerSVG.setAttribute('fill', '#ff0000');
    this._headTowerSVG.setAttribute('fill', '#ffffff');
    this._canonTowerSVG.setAttribute('fill', '#a00000');
    super.renderAll();
  }
}