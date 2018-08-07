window.onload = getMLB;

function getMLB() {
    const url = 'https://api.mysportsfeeds.com/v2.0/pull/mlb/current/date/20180807/games.json';

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("fc43a60e-d321-498f-9331-9ce7c8" + ":" + "MYSPORTSFEEDS")
        },

        success: function (response) {
            console.log(response.games[14].schedule);
            $(".inning").html(response.games[14].schedule.playedStatus);
            $(".away-team").html(response.games[14].schedule.awayTeam.abbreviation);
            $(".home-team").html(response.games[14].schedule.homeTeam.abbreviation);
        },
        error: function (error) {
            console.log(error);    
        }
    })
}