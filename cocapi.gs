function processMemberData(d) {
  // update info on all members
  var row = '';
  var curMembers = data.getStatsSheet().getRange('B2:B51').getValues().map(function(f) {return f[0];});
  d.items.forEach(function(m) {
    row = curMembers.indexOf(m.tag) + 2;
    if (row >= 2) {
      var values = [[m.expLevel,m.trophies,m.donations,m.donationsReceived,m.clanRank,m.league.name,m.role]];
      data.getStatsSheet().getRange('D' + row + ':J' + row).setValues(values);
      data.getStatsSheet().getRange('W' + row).setValue('x');
    } else {
      var values = [[m.expLevel,m.trophies,m.donations,m.donationsReceived,m.clanRank,m.league.name,m.role]];
      data.getStatsSheet().getRange('A51').setValue(m.name);
      data.getStatsSheet().getRange('B51').setValue(m.tag);
      data.getStatsSheet().getRange('D51:J51').setValues(values);
      data.getStatsSheet().getRange('W51').setValue('x');
      data.getStatsSheet().getRange('A2:W51').sort({column: 5, ascending: false});
    }
  });
  // Change admin to elder
  for (var j=2;j<=51;j++) {
    if (data.getStatsSheet().getRange('J'+j).getValue() == 'admin') {data.getStatsSheet().getRange('J'+j).setValue('elder');}
  }
  // remove any member on our sheet that wasn't in the pull from the api
    var Avals = data.getStatsSheet().getRange('A2:A51').getValues();
    var lastRow = Avals.filter(String).length + 1;
    for (var i = 2; i <= lastRow; i++) {
      if (data.getStatsSheet().getRange('W' + i).getValue() != 'x') {
        data.getStatsSheet().getRange('A' + i + ':W' + i).clearContent();
      }
    }
    data.getStatsSheet().getRange('W2:W51').clearContent();
  return 'done';
}

function processStoredMemberData() {
  var d = JSON.parse(data.getRawSheet().getRange('B2').getValue());
  processMemberData(d);
}

function processPlayerData(d) {
  var row = '';
  var curMembers = data.getStatsSheet().getRange('B2:B51').getValues().map(function(f) {return f[0];});
  d.forEach(function(m) {
    row = curMembers.indexOf(m.tag) + 2;
    if (row >= 2) {
      if (data.getStatsSheet().getRange('C' + row).getValue() == (m.townHall - 1)) {
        data.getStatsSheet().getRange('C' + row).setValue(m.townHall);
        var payload = {'content': 'Congratulations to <@' + getDiscordId(data.getStatsSheet().getRange('A' + row).getValue()) + '> on upgrading to Town Hall ' + m.townHall + '!'};
        sendToDiscord(chatWebhook,payload);
      }
      data.getStatsSheet().getRange('C' + row).setValue(m.townHall);
      var values = [[m.barbKing,m.archQueen,m.grandWarden,m.warStars,m.attackWins,m.defenseWins,m.bestTrophies,m.builderHallLevel,m.versusTrophies,m.bestVersusTrophies,m.versusBattleWins,m.clanGames]];
      data.getStatsSheet().getRange('K' + row + ':V' + row).setValues(values);
    }
  });
  data.getStatsSheet().getRange('A2:W51').sort(1);
  findNewMember();
  updateElderForm();
}

function processStoredPlayerData() {
  var d = JSON.parse(data.getRawSheet().getRange('B3').getValue());
  processPlayerData(d);
}
