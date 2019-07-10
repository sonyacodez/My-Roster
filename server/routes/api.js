const express = require('express')
const router = express.Router()
const request = require('request')

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

router.get('/teams/:teamName', (req,res) => {
    const teamName = req.params.teamName
    const teamToIDsArray = Object.keys(teamToIDs)
    if(teamToIDsArray.some(t => t === teamName)){
        request.get('http://data.nba.net/10s/prod/v1/2018/players.json#', (err, response, body) => {
            const roster = JSON.parse(response.body || "{}").league.standard
            const allActiveTeamPlayers = roster.filter(p => p.teamId === teamToIDs[teamName] && p.isActive)
            const myTeamPlayers = allActiveTeamPlayers.map(a => {
                return {
                    firstName: a.firstName,
                    lastName: a.lastName,
                    jersey: a.jersey,
                    pos: a.pos
                }
            })
            res.send(myTeamPlayers)
        })
    }
    else{
        res.send("We're sorry, but it appears this team does not exist on our roster.")
    }
})

module.exports = router