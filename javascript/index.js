$("html:not(.loader-container)").hide();


$(document).ready(function() {
    $(".loader-container").hide();
    $("html:not(.loader-container)").show();

    $(".name-container-text").addClass("fade-in");
    $(".btn").addClass("fade-in");

    setTimeout(function() {
        $(".name-container-text").removeClass("fade-in");
    }, 2000);


});

$(".name-container-text").hover(function() {
    var obj = $(this);
    obj.addClass("name-container-text-animation");
    setTimeout(function() {
        obj.removeClass("name-container-text-animation");
    }, 1000);
}, function() {});



$(".btn-down").click(function() {
    var scroll = new SmoothScroll();
    var anchor = document.querySelector('#div3');
    scroll.animateScroll(anchor);

});

$(".btn-up").click(function() {
    var scroll = new SmoothScroll();
    var anchor = document.querySelector('#div1');
    scroll.animateScroll(anchor);

});


// $(".btn-down").hover(function() {
//     var obj = $(this);
//     obj.addClass("btn-down-ani");
//     setTimeout(function() {
//         obj.removeClass("btn-down-ani");
//     }, 1000);

//     var icon = $(".fa-chevron-down");
//     icon.addClass("icon-ani-in");

// }, function() {

//     var icon = $(".fa-chevron-down");
//     icon.removeClass("icon-ani-in");
//     icon.addClass("icon-ani-out");
//     setTimeout(function() {
//         icon.removeClass("icon-ani-out");
//     }, 1000);

// });

$(".name-container, .name-container-group").mousemove(function(event) {
    // var msg = "Handler for .mousemove() called at ";
    // msg += event.pageX + ", " + event.pageY;
    //console.log(msg);
    var obj = $(".btn");
    var off = obj.offset();
    // console.log(pos.left + ' ' + pos.top + ' ' + obj.height());
    $(".btn").removeClass("btn-sha-left-down btn-sha-right-down btn-sha-right-top btn-sha-left-top");
    if (event.pageX >= off.left && event.pageY <= off.top) {
        $(".btn").addClass("btn-sha-left-down");
        // console.log("btn-sha-left-down");
    } else if (event.pageX < off.left && event.pageY <= off.top) {
        $(".btn").addClass("btn-sha-right-down");
        // console.log("btn-sha-right-down");
    } else if (event.pageX >= off.left && event.pageY > off.top) {
        $(".btn").addClass("btn-sha-left-top");
    } else {
        $(".btn").addClass("btn-sha-right-top");
    }
});

$(".btn").hover(function() {
    $(this).removeClass("btn-sha-left-down btn-sha-right-down btn-sha-right-top btn-sha-left-top");
    $(this).addClass("btn-no-sha");
}, function() {
    $(this).removeClass("btn-no-sha");
});


$(".gallery-btn").click(function() {
    window.location.href = "pages/gallery.html"
});



// firebase
const firebaseConfig = {
    apiKey: "AIzaSyAh6_jWRi5sM87CLQG62yFN6HgdG35-iSQ",
    authDomain: "itzmeo-github-io.firebaseapp.com",
    databaseURL: "https://itzmeo-github-io.firebaseio.com",
    projectId: "itzmeo-github-io",
    storageBucket: "itzmeo-github-io.appspot.com",
    messagingSenderId: "670423305836",
    appId: "1:670423305836:web:1ad3ee041a3660765e9249",
    measurementId: "G-8MVVWVBVNR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var perf = firebase.performance();
var check = false;

function add_visitor_count(x) {

    if (!check) {
        database.ref('/stat').update({
            "visitCount": x,
        });
        check = true;
    }
}
var visitor;
database.ref('/stat').once('value').then(function(snapshot) {
    visitor = (snapshot.val().visitCount);
    console.log(visitor);
    add_visitor_count(visitor + 1);
});