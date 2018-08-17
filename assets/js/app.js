window.onload = getMLB;

function getMLB() {
  const url =
    "https://api.mysportsfeeds.com/v2.0/pull/mlb/current/date/201808011/games.json";
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    headers: {
      Authorization:
        "Basic " +
        btoa("fc43a60e-d321-498f-9331-9ce7c8" + ":" + "MYSPORTSFEEDS")
    },

    success: function (response) {
      for (let i = 0; i < response.games.length; i++) {
        const awayTeam = response.games[i].schedule.awayTeam.abbreviation;
        const homeTeam = response.games[i].schedule.homeTeam.abbreviation;
        let status = response.games[i].schedule.playedStatus;
        var homeTeamScore = response.games[i].score.homeScoreTotal;
        var awayTeamScore = response.games[i].score.awayScoreTotal;
        var currentInning = response.games[i].score.currentInning;
        const currentInningHalf = response.games[i].score.currentInningHalf;
        const parsedTime = moment(response.games[i].schedule.startTime);
        const scheduledTime = moment(parsedTime).format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        );

        if (status === "UNPLAYED") {
          status = scheduledTime;
        };

        // if (currentInning > 3) {
        //   currentInning = currentInning + "th";
        // }

        // if (currentInning === 2) {
        //   currentInning = currentInning + "nd";
        // }

        scoreStatus(status, currentInning, currentInningHalf, homeTeam, awayTeam, homeTeamScore, awayTeamScore);
        inningStatus(status, scheduledTime);
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}

function scoreStatus(status, currentInning, currentInningHalf, homeTeam, awayTeam, homeTeamScore, awayTeamScore) {
  if (homeTeamScore && awayTeamScore != null) {
    $(".scores").append(
      "<dl class='w-50 w-25-l ph3 mb2'>" +
      "<dt class='f7 fw8 inning'>" +
      status + " " + currentInningHalf + " " + currentInning +
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
    $(".inning").css({
      "color": "blue",
      "font-style": "italic"
    });
  }
};