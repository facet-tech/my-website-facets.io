var onMouseEnterHandle = function (event) {
    event.target.style.border = '1px solid black';
    event.target.style.cursor = "pointer";
};

var onMouseLeaveHandle = function (event) {
    event.target.style.border = "none";
}

var onMouseClickHandle = function (event) {
    console.log('@CLICK', event.target.id);
    event.preventDefault();
    event.stopPropagation();
    if (!event.target.id) return;
    window.selectedDOM = event.target.id;
    window.postMessage(event.target.id, "*");
    // onAddElement();
}

try {
    console.log('RUNNING SCRIPT @LOAD');
    // var iframe = document.getElementById("fixed-container");
    var innerDoc = document;
    innerDoc.querySelectorAll('*').forEach(e => {
        e.addEventListener("mouseenter", onMouseEnterHandle, false);
        e.addEventListener("mouseleave", onMouseLeaveHandle, false);
        e.addEventListener("click", onMouseClickHandle, false);
    });
} catch (e) {
    console.log('@CATCH', e)
}

// $('#fixed-container *').hover(
//     function (e) {
//         $(this).css('border', '1px solid black');
//         $(this).css('cursor', 'pointer');
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//     }, function (e) {
//         $(this).css('border', 'none');
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//     }
// ).click((e) => {
//     console.log('CLICK', e.target.id)
//     e.preventDefault();
//     e.stopPropagation();
//     this.postMessage(e.target.id, "*");
//     if (!e.target.id) return;
//     window.selectedDOM = e.target.id;
// })

// this gets added in facet.ninja
// function receiveMessage(event) {
//     // Do we trust the sender of this message?  (might be
//     // different from what we originally opened, for example).
//     console.log('@receive msg', event);

//     // event.source is popup
//     // event.data is "hi there yourself!  the secret response is: heey!"
// }

// window.addEventListener("message", receiveMessage, false);