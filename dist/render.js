class Render {
    render(myTeamPlayers){
        $("#team-display").empty()
        const source = $("#rooster-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({myTeamPlayers})
        $("#team-display").append(newHTML)
    }
}
