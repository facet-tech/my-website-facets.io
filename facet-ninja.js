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
    var aa = stack.slice(1);
    return aa.join(' > ');
}
//aHR0cHM6Ly9teXdlYnNpdGUuZmFjZXQubmluamEv
var all = document.getElementsByTagName("*");
var nodesToRemove = new Set([
    "body#fixed-container > div#welcome > h1#welcome",
    "body#fixed-container > div > div"
])
//fetch(`https://api.facet.ninja/facet/${window.btoa(window.location.href)}`,
const callback = async function(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if(nodesToRemove.has(getDomPath(mutation.target))) {
            mutation.target.remove();
        }
    }
};

const targetNode = document.body
const config = { subtree: true, childList: true };
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);