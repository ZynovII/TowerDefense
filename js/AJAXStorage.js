'use strict';

function AJAXStorage(name,blockInterface, unBlockInterface) {
  var self = this;
  var ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
  var updatePassword;
  var stringName = name;

  function storeValue() {
    updatePassword=Math.random();
    blockInterface();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
  }
  function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
      alert(callresult.error);
    else {
      $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'UPDATE', n : stringName, v : JSON.stringify(self.arr), p : updatePassword },
              success : updateReady, error : errorHandler
          }
      );
    }
  }
  function updateReady(callresult) {
    if ( callresult.error!=undefined )
      alert(callresult.error);
    unBlockInterface();
  }
  function restoreValue() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
  }

  function readReady(callresult) {
      if ( callresult.error!=undefined )
          alert(callresult.error);
      else if ( callresult.result!="" ) {
          self.arr=JSON.parse(callresult.result);
      }
  }

  function errorHandler(jqXHR,statusStr,errorStr) {
      alert(statusStr+' '+errorStr);
  }
  self.arr = [];
  self.storage = {};
  
  self.addValue = function(key1,value1,key2,value2){
    self.storage[key1] = value1;
    self.storage[key2] = value2;
    self.arr.push(self.storage);
    storeValue();
  }
  self.refreshValue = function(key1, key2, value){
    let newHash = JSON.parse(JSON.stringify(self.storage));
    newHash[key2] = value;
    for(let i = 0; i < self.arr.length; i++) {
      if(self.arr[i][key1] == self.storage[key1]) {
        self.arr.splice(i, 1, newHash);
      }
    }
    storeValue();
  }
  self.getValue = function(key1, value1) {
    restoreValue();
    if(self.arr.length != 0) {
      for(let i = 0; i < self.arr.length; i++) {
        if(self.arr[i][key1] == value1) {
          self.storage = self.arr[i]
          return self.arr[i][key1];
        }
      }
    }
  };
  self.getArr = function() {
    restoreValue();
    return self.arr;
  }
  restoreValue();
}