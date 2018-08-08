window.onload = getMLB;

function getMLB() {
    const url = 'https://api.mysportsfeeds.com/v2.0/pull/mlb/current/date/20180805/games.json';
    // let data = "";
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        // data: data,
        headers: {
            "Authorization": "Basic " + btoa("fc43a60e-d321-498f-9331-9ce7c8" + ":" + "MYSPORTSFEEDS")
        },

        success: function (response) {

            for (let i = 0; i < response.games.length; i++) {
                let awayTeam = response.games[i].schedule.awayTeam.abbreviation;
                let homeTeam = response.games[i].schedule.homeTeam.abbreviation;
                let status = response.games[i].schedule.playedStatus;
                let homeTeamScore = response.games[i].score.homeScoreTotal;
                let awayTeamScore = response.games[i].score.awayScoreTotal;

                if ( homeTeamScore > awayTeamScore) {
                    $(".home-team").css("color","grey");
                }
                gameStatus(status, homeTeam, awayTeam, homeTeamScore, awayTeamScore);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}


function gameStatus(status, homeTeam, awayTeam, homeTeamScore, awayTeamScore) {
    if (homeTeamScore && awayTeamScore != null) {
        $(".scores").append("<dl class='w-50 w-25-l ph3 mb2'>" +
            "<dt class='f7 fw8 inning'>" + status + "</dt>" +
            "<dd class='ml0 f5 home-team'>" + homeTeam + " " + homeTeamScore + "</dd>" +
            "<dd class='ml0 f5 away-team'>" + awayTeam + " " + awayTeamScore + "</dd>" + "</dl>");
    }
    else {
        $(".scores").append("<dl class='w-50 w-25-l ph3 mb2'>" +
            "<dt class='f7 fw8 inning'>" + status + "</dt>" +
            "<dd class='ml0 f5 home-team'>" + homeTeam + " " + "0" + "</dd>" +
            "<dd class='ml0 f5 away-team'>" + awayTeam + " " + "0" + "</dd>" + "</dl>");
    }
};

