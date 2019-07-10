const renderer = new Render

const displayTeam = () => {
    const input = $("#team-input").val()
    $.get(`/teams/${input}`, function(response){
        renderer.render(response)
    })
}
