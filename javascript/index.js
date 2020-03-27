$(document).ready(function() {
    $(".name-container-text").addClass("fade-in");

    setTimeout(function() {
        $(".name-container-text").removeClass("fade-in");
    }, 2000);

});

$(".name-container-text").hover(function() {
    var obj = $(this);
    obj.addClass("name-container-text-animation");
    setTimeout(function() {
        obj.removeClass("name-container-text-animation");
        console.log("REMOVED");
    }, 1000);
});