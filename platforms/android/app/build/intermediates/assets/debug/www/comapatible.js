var storage = window.localStorage;
var chrome = {
  storage: {
    local: {
      get: function(e, cb){
        var e1 = e.map(d=>{
          return catcher(function(){
            return JSON.parse(storage.getItem(d));
          });
        })
        var e2 = {};
        e1.forEach((v, n)=>{
          e2[e[n]] = v;
        })
        cb(e2);
      },
      set: function(e){
        console.log('updated');
        storage.setItem(Object.keys(e)[0], JSON.stringify(e[Object.keys(e)[0]]));
      }
    }
  },
  runtime: {
    sendMessage: function(data, cb) {
      cb = cb?cb:function(){};
      chrome.runtime.sendMessageListeners.forEach(fn=>{fn(data, 'compatible', cb)});
    },
    sendMessageListeners: []
  },
  extension: {
    onMessage: {
      addListener: function(fn){
        chrome.runtime.sendMessageListeners.push(fn);
      }
    }
  }
}
