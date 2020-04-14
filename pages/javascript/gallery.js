// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var perf = firebase.performance();

var database = firebase.database();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('gallery');

var touch = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    touch = true;
}

console.log('Touch ' + touch.toString());
$(".return-btn").hide();
$(document).ready(function() {

    $(".my-img").hide();
    $(".title").hide();

    var colors = ['snow', 'grays', 'lightblue', 'azure', ];
    var color = colors[Math.floor(Math.random() * colors.length)];
    console.log(color);
    $('body').css('background-color', color);


    function updateDesc(elem, val) {
        elem.children(".text").children("h3").text(val);
    }

    imagesRef.listAll().then(function(res) {
        res.items.forEach(function(item) {
            var fileName = item.name;
            var img = imagesRef.child(fileName);
            img.getDownloadURL().then(function(url) {
                setTimeout(function() {
                    $(".return-btn").show();
                }, 2000);

                var elem = $(".my-img:last");
                $(".gallery").append(elem.clone());
                var nosuf = fileName.split('.').slice(0, -1).join('.');
                var galleryRef = firebase.database().ref('/gallery/' + nosuf);

                img.getMetadata().then(function(metadata) {
                    // Metadata now contains the metadata for 'images/forest.jpg'
                    console.log('Metadata');
                    console.log(metadata['customMetadata']);
                    updateDesc(elem, metadata['customMetadata']['title']);
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                });



                elem.children(".img-container").children(".img").attr("src", url);
                elem.children(".text").hide();

                $(".loader-container").hide();
                $(".title").show();
                $(".title").addClass("fold");
                if (!touch) {
                    console.log('Add hover');
                    elem.hover(function() {
                        elem.children(".text").show();

                    }, function() {
                        elem.children(".text").hide();
                    });
                }


                elem.click(function() {
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
        console.log("swipe!");
        //window.history.back();
    });


});