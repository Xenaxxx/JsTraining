var token;  // lifetime of token?


window.onload = onload();

function onload(){
  var buttonLogin = document.getElementById('buttonLogin');
  buttonLogin.addEventListener('click', function() {
      var username1 = document.getElementById('username').value;
      var password1 = document.getElementById('password').value;
      login(username1, password1);
  });
}


function login(username, password){
    $.post("/api/login",
    {
        user_id:username,
        password:password
    },
        function(data){
          if(data.code == 200){
            token = data.token
            getData(token)
          }
          else{
            alert(data.message)
          }
    },"json");
}


function getData(token){
  var teams = {};
  var groups = {};
  $.post("/wizas/a/biz/user_bizs",
  {
    api_version:6,
    token:token
  },
    function(teamData){
      if(teamData.return_code == 200){
        teams = teamData.result;
        $.get("/wizas/a/groups",
          {
            api_version:6,
            token:token
          },
            function(groupData){
              if(groupData.return_code == 200){
                groups = groupData.group_list;
                teams = formatData(teams, groups);
                addTeamDOM(teams);
              }
          });
      }
    });
}


function formatData(teams,groups){
  _.each(teams, function (team) {
    team.groups = _.filter(groups, function (group) {
      return group.bizGuid == team.biz_guid;
    });
  });
  teams = _.filter(teams, function(team){
    return team.groups.length != 0;
  });
  return teams;
}


function addTeamDOM(teams){
  $("#loginForm").hide();
  $("#teamlist").css("display", "block");

  _.each(teams, function(team) {
    console.log(team.groups.kbName);
    var bDiv = $("<div><div>");
    var bName = $("<h3></h3>").text('+ '+ team.biz_name);
    bDiv.append(bName);
    $("#teamlist").append(bDiv);
    _.each(team.groups, function(group){
      var gName = $("<ul></ul>");
      var gNameList = $("<li></li>").text(group.kbName);
      gName.append(gNameList);
      bDiv.append(gName);
    });
  });
}
