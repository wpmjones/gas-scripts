function doPost(e) {
  var params = e.parameters;
  
  // Incoming members data from COC API
  if (JSON.parse(e.postData.contents).type == 'members') {
    var d = JSON.parse(e.postData.contents);
    // store raw data in the sheet
    data.getRawSheet().getRange('B2').setValue(JSON.stringify(d.data));
    data.getRawSheet().getRange('C2').setValue(new Date());
    var ret = processMemberData(d.data);
    if (ret) {
      return ContentService.createTextOutput(ret);
    } else {
      return ContentService.createTextOutput();
    }
  }
  
  // Incoming player data from COC API
  if (JSON.parse(e.postData.contents).type == 'players') {
    var d = JSON.parse(e.postData.contents);
    // store raw data in the sheet
    data.getRawSheet().getRange('B3').setValue(JSON.stringify(d.data));
    data.getRawSheet().getRange('C3').setValue(new Date());
    var ret = processPlayerData(d.data);
    if (ret) {
      return ContentService.createTextOutput(ret);
    } else {
      return ContentService.createTextOutput();
    }
  }
}
