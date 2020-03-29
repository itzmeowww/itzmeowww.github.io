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
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('gallery');



$(".my-img").hide();
$(".title").hide();


function updateDesc(elem, val) {
    elem.children(".text").children("h3").text(val);
}

imagesRef.listAll().then(function(res) {
    res.items.forEach(function(item) {
        var fileName = item.name;
        var img = imagesRef.child(fileName);
        img.getDownloadURL().then(function(url) {
            var elem = $(".my-img:last");
            $(".gallery").append(elem.clone());
            var nosuf = fileName.split('.').slice(0, -1).join('.');
            var galleryRef = firebase.database().ref('/gallery/' + nosuf);
            galleryRef.on('value', function(snapshot) {
                updateDesc(elem, snapshot.val().description);
            });

            elem.children(".img-container").children(".img").attr("src", url);
            elem.children(".text").hide();

            $(".loader-container").hide();
            $(".title").show();
            $(".title").addClass("fold");
            elem.hover(function() {
                elem.children(".text").show();

            }, function() {
                elem.children(".text").hide();
            });

            var textclick = 0;
            elem.children(".text").click(function() {
                console.log('click');
                elem.children(".text").slideToggle();
            });

            elem.show();
        }).catch(function(error) {
            console.log('Error!!');
            console.log(error)
        });
    });
}).catch(function(error) {
    console.log('Error');
    console.log(error);
});




$("html").on("swiperight", function() {
    window.history.back();
});