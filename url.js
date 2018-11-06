module.exports = {
     getUrl: function() {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
        var cururl=tabs[0].url;
   }

);
}
}
