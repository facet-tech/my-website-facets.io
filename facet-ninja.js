var all = document.getElementsByTagName("*");
const getFacets = () => {
    fetch('https://api.facet.ninja/facet/mene-prod', {
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        const { facet } = data;
        facet && facet.forEach(f => {
            f.id && f.id.forEach(idx => {
                var elem = document.querySelector(`#${idx}`);
                elem.style.display = 'none';
            })
        })
    });
}
getFacets();