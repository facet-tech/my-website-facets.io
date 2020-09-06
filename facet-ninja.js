var all = document.getElementsByTagName("*");
const getFacets = () => {
    fetch(`https://api.facet.ninja/facet/${window.location.hostname}`, {
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        const { facet } = data;
        facet && facet.forEach(f => {
            f.id && f.id.forEach(idx => {
                //var elem = document.querySelector(`#${idx}`);
                //if (elem) elem.style.display = 'none';
                var node = $(idx)[0]
                node.remove();
            })
        })
    });
}
getFacets();

//var node = $("body#fixed-container > div#welcome")[0]
//node.remove();


