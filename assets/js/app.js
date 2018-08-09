window.onload = getMLB;

function getMLB() {
  const url =
    "https://api.mysportsfeeds.com/v2.0/pull/mlb/current/date/20180808/games.json";
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    headers: {
      Authorization:
        "Basic " +
        btoa("fc43a60e-d321-498f-9331-9ce7c8" + ":" + "MYSPORTSFEEDS")
    },

    success: function(response) {
      for (let i = 0; i < response.games.length; i++) {
        const awayTeam = response.games[i].schedule.awayTeam.abbreviation;
        const homeTeam = response.games[i].schedule.homeTeam.abbreviation;
        let status = response.games[i].schedule.playedStatus;
        const homeTeamScore = response.games[i].score.homeScoreTotal;
        const awayTeamScore = response.games[i].score.awayScoreTotal;
        const parsedTime = moment(response.games[i].schedule.startTime);
        const scheduledTime = moment(parsedTime).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        );

        if (status === "UNPLAYED") {
          status = scheduledTime;
        };

        scoreStatus(status, homeTeam, awayTeam, homeTeamScore, awayTeamScore);
        inningStatus(status, scheduledTime);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function scoreStatus(status, homeTeam, awayTeam, homeTeamScore, awayTeamScore) {
  if (homeTeamScore && awayTeamScore != null) {
    $(".scores").append(
      "<dl class='w-50 w-25-l ph3 mb2'>" +
        "<dt class='f7 fw8 inning'>" +
        status +
        "</dt>" +
        "<dd class='ml0 f5 home-team'>" +
        homeTeam +
        " " +
        homeTeamScore +
        "</dd>" +
        "<dd class='ml0 f5 away-team'>" +
        awayTeam +
        " " +
        awayTeamScore +
        "</dd>" +
        "</dl>"
    );
  } else {
    $(".scores").append(
      "<dl class='w-50 w-25-l ph3 mb2'>" +
        "<dt class='f7 fw8 inning'>" +
        status +
        "</dt>" +
        "<dd class='ml0 f5 home-team'>" +
        homeTeam +
        " " +
        "0" +
        "</dd>" +
        "<dd class='ml0 f5 away-team'>" +
        awayTeam +
        " " +
        "0" +
        "</dd>" +
        "</dl>"
    );
  }
}

function inningStatus(status, scheduledTime) {
  if (status === "COMPLETED" || status === "COMPLETED_PENDING_REVIEW") {
    $("dt")
      .removeClass("inning")
      .addClass("final");
    $(".final").html("FINAL");
  } else {
    $(".inning").css("color", "blue");
  }
}
