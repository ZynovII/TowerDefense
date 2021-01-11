class ControllerGame {
  layout = document.createElement('div');
  loginMenu = document.createElement('div');
  logInForm = document.createElement('form');
  titleForm = document.createElement('h1');
  inputUserName = document.createElement('input');
  loginBtn = document.createElement('button');
  menuBtn;
  saveBtn = document.createElement('div');
  startBtn = document.createElement('div');
  gameMenu = document.createElement('div');
  showRecordsBtn = document.createElement('div');
  recordsTable = document.createElement('div');
  recordsTableHead = document.createElement('div');
  recordsTableTitle = document.createElement('div');
  recordsTableBackBtn = document.createElement('div');
  

  cbBlockInterface = (arr)=> {
    console.log('blocked')
  }
  cbUnBlockInterface = ()=> {
    console.log('unblocked')
  }
  ajaxStorageObj = new AJAXStorage('FD2_TOWER_DEFENSE_ZYNOV_II', this.cbBlockInterface, this.cbUnBlockInterface);

  toGame = ()=> {
    this.startBtn.style.transform = 'scale(0.95)';
    setTimeout( () => this.startBtn.style.transform = null, 100);
    let elemHeight = this.layout.lastChild.offsetHeight;
    this.layout.lastChild.style.marginTop = '-'+ elemHeight +'px';
    setTimeout( ()=> {
      this.layout.remove();
      setTimeout(this.myModel.start, 500);
    }, 1000);
    document.addEventListener('keydown', this.escapeKeyOut);
  }
  escapeKeyOut = (EO)=> {
    if(EO.keyCode == 27) {
      document.removeEventListener('keydown', this.escapeKeyOut);
      this.openMenu();
    }
  }
  escapeKeyTo = (EO)=> {
    if(EO.keyCode == 27) {
      document.removeEventListener('keydown', this.escapeKeyTo);
      this.toGame();
    }
  }
  openMenu = ()=> {
    this.recordsTableHead.remove();
    this.recordsTable.remove();
    this.menuBtn.style.transform = 'scale(0.95)';
    setTimeout( () => this.menuBtn.style.transform = null, 100);
    this.myModel.pause();
    this.gameMenu.appendChild(this.titleForm);
    this.gameMenu.appendChild(this.startBtn);
    this.gameMenu.appendChild(this.showRecordsBtn);
    this.gameMenu.appendChild(this.saveBtn);
    this.layout.appendChild(this.gameMenu);
    this.myDOM.appendChild(this.layout);
    this.gameMenu.style.marginTop = '80px';
    document.addEventListener('keydown', this.escapeKeyTo);
  }
  showRecordsTable = ()=> {
    let dataArr = this.ajaxStorageObj.getArr();
    dataArr.sort((a, b) => a.score - b.score);
    for(let el of this.gameMenu.children){
      el.remove();
    }
    if(dataArr.length !== this.recordsTable.children.length) {
      for(let dataEl of dataArr) {
        let row = document.createElement('div');
        let nameDiv = document.createElement('div');
        let scoreDiv = document.createElement('div');
        nameDiv.innerHTML = dataEl.name;
        scoreDiv.innerHTML = dataEl.score;
        row.classList.add('table-row');
        nameDiv.classList.add('table-cell');
        scoreDiv.classList.add('table-cell');
        row.appendChild(nameDiv);
        row.appendChild(scoreDiv);
        this.recordsTable.appendChild(row);
      }
    }
    this.recordsTableHead.appendChild(this.recordsTableTitle);
    this.recordsTableHead.appendChild(this.recordsTableBackBtn);
    this.gameMenu.appendChild(this.recordsTableHead);
    this.gameMenu.appendChild(this.recordsTable);
    console.log(window.location.hash)
  }
  submit = ()=> {
    let form = document.forms.loginForm;
    let input = form.nickname;
    let name = input.value;
    let score = this.myModel.score;
    if(name == ''){
      input.classList.add('invalid');
      event.preventDefault();
      return;
    } else if( this.ajaxStorageObj.getValue('name', name) ) {
      input.classList.remove('invalid');
      this.toGame();
    } else {
      input.classList.remove('invalid');
      this.ajaxStorageObj.addValue('name', name,'score', score);
      this.toGame();
    }
    event.preventDefault();
  }
  saveResults = () => {
    let score = this.myModel.score;
    this.ajaxStorageObj.refreshValue('name', 'score', score);
  }

  constructor(){
    this.layout.classList.add('layout');
    this.loginMenu.classList.add('login-menu');
    this.gameMenu.classList.add('login-menu');
    this.logInForm.classList.add('login-form');
    this.titleForm.classList.add('form-title');
    this.inputUserName.classList.add('user-name-input');
    this.loginBtn.classList.add('btn-submit');
    this.startBtn.classList.add('start-button');
    this.showRecordsBtn.classList.add('start-button');
    this.saveBtn.classList.add('start-button');
    this.recordsTable.classList.add('record-table');
    this.recordsTableHead.classList.add('record-table-head');
    this.recordsTableTitle.classList.add('record-title');
    this.recordsTableBackBtn.classList.add('back-button');

    this.recordsTableBackBtn.innerHTML = '&#8617;';this.recordsTableTitle.innerHTML = 'records';
    this.startBtn.innerHTML = 'resume';
    this.showRecordsBtn.innerHTML = 'records';
    this.saveBtn.innerHTML = 'save result';
    this.startBtn.setAttribute('onmousedown', 'return false');
    this.showRecordsBtn.setAttribute('onmousedown', 'return false');
    this.saveBtn.setAttribute('onmousedown', 'return false');
    this.logInForm.setAttribute('name', 'loginForm');
    this.inputUserName.setAttribute('name', 'nickname');
    this.titleForm.innerHTML = 'Tower Defense';
    this.inputUserName.setAttribute('placeholder', 'Nickname');
    this.loginBtn.innerHTML = 'Login and start';

    this.logInForm.appendChild(this.inputUserName);
    this.logInForm.appendChild(this.loginBtn);
    this.loginMenu.appendChild(this.titleForm);
    this.loginMenu.appendChild(this.logInForm);
    this.layout.appendChild(this.loginMenu);
  }

  set(model) {
    this.myModel = model;
    this.myDOM = this.myModel.field;
    this.myDOM.appendChild(this.layout);
    this.score = this.myModel.score;
    this.menuBtn = document.getElementById('menu');
    this.menuBtn.addEventListener('click', this.openMenu);
    this.loginBtn.addEventListener('click', this.submit);
    this.startBtn.addEventListener('click', this.toGame);
    this.showRecordsBtn.addEventListener('click', this.showRecordsTable);
    this.saveBtn.addEventListener('click', this.saveResults);
  }
}