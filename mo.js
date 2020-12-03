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
    var res = stack.slice(1).join(' > '); // removes the html element
    return res.replace(/\s+/g, '');
}

var data = new Map();
data.set('/Users/mkotsollaris/projects/my-website-facets.io/about.html',
    new Set([
        "body>section:eq(2)>div>div:eq(1)>div:eq(0)>a",
        "body>div:eq(0)>div:eq(2)>div>div>h1",
        "body>div:eq(2)>div>div:eq(1)>div:eq(0)>div>img"
    ]));

var facetedNodes = new Set();

const callback = async function (mutationsList, observer) {
    try {
        if ((typeof disableHideFacetNinja === 'undefined' || disableHideFacetNinja === null || disableHideFacetNinja === false) && data.has(window.location.pathname)) {
            let nodesToRemove = data.get(window.location.pathname) || new Map();
            for (let mutation of mutationsList) {
                let domPath = getDomPath(mutation.target);
                if (nodesToRemove.has(domPath) && !facetedNodes.has(domPath)) {
                    facetedNodes.add(domPath);
                    mutation.target.style.display = "none"
                    mutation.target.style.setProperty("display", "none", "important");
                    continue;
                }
                // TODO avoid iterating over subtrees that are not included
                const childDoms = mutation && mutation.target && mutation.target.children;
                for(child of childDoms) {
                    
                    const childDomPath = getDomPath(child);
                    if (nodesToRemove.has(childDomPath) && !facetedNodes.has(childDomPath)) {
                        facetedNodes.add(childDomPath);
                        child.style.display = "none"
                        child.style.setProperty("display", "none", "important");
                        continue;
                    }
                }
            }
        }
    } catch (e) {
        console.log('[ERROR]', e);
    }

};

const targetNode = document
const config = { subtree: true, childList: true, attributes: true};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);