function getDomPath(el) {
    var stack = [];
    while (el.parentNode != null) {
        var sibCount = 0;
        var sibIndex = 0;
        for (var i = 0; i < el.parentNode.childNodes.length; i++) {
            var sib = el.parentNode.childNodes[i];
            if (sib.nodeName == el.nodeName) {
                if (sib === el) {
                    sibIndex = sibCount;
                }
                sibCount++;
            }
        }
        if (el.hasAttribute('id') && el.id != '') {
            stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
        } else if (sibCount > 1) {
            stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
        } else {
            stack.unshift(el.nodeName.toLowerCase());
        }
        el = el.parentNode;
    }
    var aa = stack.slice(1); // removes the html element
    return aa.join(' > ');
}
//aHR0cHM6Ly9teXdlYnNpdGUuZmFjZXQubmluamEv
var all = document.getElementsByTagName("*");
const getFacets = () => {
    fetch(`https://api.facet.ninja/facet/${window.btoa(window.location.href)}`, {
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

/*
const targetNode = document

// Options for the observer (which mutations to observe)
const config = { childList: true };


// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {

       //if (mutation.type === 'childList') {
       //     console.log('A child node has been added or removed.');
       // }

        var mutatedNode = mutation.addedNodes[0]
       // console.log(mutatedNode.nodeType)
        if(mutatedNode.nodeType == "3") {
            //mutatedNode.parentNode.removeChild(mutatedNode)
            console.log(domElementPath(mutatedNode))
        }
        //else if (mutation.type === 'attributes') {
        //    console.log('The ' + mutation.attributeName + ' attribute was modified.');
        //}
    }
};


// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
//observer.disconnect();

//var node = $("body#fixed-container > div#welcome")[0]
//node.remove();


*/