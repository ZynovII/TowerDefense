'use strict';

function ViewEnemy() {
  let myDom = null;
  let myModel = null;
  this.width;
  let enemyDOM = document.createElement('div');

  this.startPosX = 0;
  this.startPosY = 0;
  this.endOfFieldX = 0;

  this.set = function(model,dom) {
    myDom = dom;
    myModel = model;
    this.width = myDom.offsetHeight / 5;
    this.startPosX = - this.width -1;
    this.startPosY = Math.random() * (myDom.offsetHeight - this.width);
    this.endOfFieldX = myDom.offsetWidth;
  }
  this.update = function() {
    enemyDOM.style.left = myModel.posX + 'px';
  }
  this.render = function() {
    enemyDOM.classList.add('enemy');
    enemyDOM.innerHTML = `
      <svg width="${this.width}" height="${this.width}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <g>
          <text xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_3" y="425" x="468" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#000000"/>
          <ellipse stroke="#000" ry="14.48736" rx="8.61812" id="svg_6" cy="14.99303" cx="14.77712" stroke-opacity="null" fill="#00b200"/>
          <ellipse stroke="#000" ry="4.90342" rx="5.20059" id="svg_7" cy="14.47298" cx="14.47994" stroke-opacity="null" fill="#f70000"/>
          <text stroke="#000" transform="rotate(-104.16669464111328 20.087409973144528,9.422354698181152) matrix(0.13945855017113562,0,0,0.11177258182275994,8.487065545206775,10.969040301491589) " xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_9" y="-5.54688" x="45.83121" stroke-opacity="null" stroke-width="0" fill="#ede500">OMOH</text>
        </g>
      </svg>
    `;
    enemyDOM.style.left = this.startPosX + 'px';
    enemyDOM.style.top = this.startPosY + 'px';
    enemyDOM.style.height = this.width + 'px';
    enemyDOM.style.width = this.width + 'px';
    myDom.appendChild(enemyDOM);
  }
  this.freez = function() {
    enemyDOM.classList.add('enemy-freezed');
  }
  this.normal = function() {
    enemyDOM.classList.remove('enemy-freezed');
  }
  this.die = function() {
    enemyDOM.remove();
  }
}