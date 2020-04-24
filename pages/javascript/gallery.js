// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var perf = firebase.performance();

var database = firebase.database();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child("gallery");

var touch = false;
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    touch = true;
}
imgSrc = {};
imgMeta = {};
// console.log("Touch " + touch.toString());
var myId = 0;
var currentId = 0;

function showFullImg(id) {
    $(".fullImgContainer").hide();
    $(".fullImgView").hide();
    currentId = id;
    if (currentId <= 0) currentId = myId;
    if (currentId > myId) currentId = 1;
    id = currentId;
    console.log(id);
    $(".fullImgView").show();
    $(".fullImgLoader").show();
    $(".fullImgView")
        .children(".fullImgContainer")
        .children(".fullImg")
        .attr("src", imgSrc[id]);

    $(".fullImgTitle").text(imgMeta[id]["title"]);

    $(".fullImg").on("load", function () {
        $(".fullImgContainer").show();
        $(".fullImgLoader").hide();
    });

    $(".fullImgView").click(function () {
        $(".fullImgContainer").hide();
        $(".fullImgView").hide();
        currentId = -1;
    });
}

function AddTwo() {
    var elem = document.getElementsByClassName("fullImgLoader")[0];
    var two = new Two({
        width: window.innerWidth,
        height: 0.8 * window.innerHeight,
    }).appendTo(elem);

    var circle = two.makeCircle(two.width / 2, two.height / 2, 25);
    circle.fill = "#FF8000";
    circle.stroke = "#FF8000";

    var t1 = new TWEEN.Tween(circle.translation)
        .to(
            {
                x: two.width / 2 + 100,
            },
            1000
        )

        .onUpdate(function (t) {
            circle.translation.copy(circle.translation);
        })
        .onComplete(function () {
            circle.translation.x = two.width / 2 - 100;
            t1.start();
        })
        .start();

    two.bind("update", function () {
        TWEEN.update();
    }).play();
}

$(".return-btn").hide();
var myId = 0;

function handleKeydown(event) {
    console.log(event.keyCode);

    if (event.keyCode == 37 || event.keyCode == 38) {
        if (currentId != -1) {
            event.preventDefault();
            showFullImg(currentId - 1);
        }
    } else if (event.keyCode == 39 || event.keyCode == 40) {
        if (currentId != -1) {
            event.preventDefault();
            showFullImg(currentId + 1);
        }
    }
}
function handleSwipeLeft(event) {
    if (currentId != -1) {
        event.preventDefault();
        showFullImg(currentId - 1);
    }
}
function handleSwipeRight(event) {
    if (currentId != -1) {
        event.preventDefault();
        showFullImg(currentId + 1);
    }
}
$(document).ready(function () {
    AddTwo();
    $("body").keydown(handleKeydown);

    $(".my-img").hide();
    $(".title").hide();
    $(".fullImgView").hide();

    $(".fullImgView").on("swipeleft", handleSwipeLeft);
    $(".fullImgView").on("swiperight", handleSwipeRight);

    $(".fullImgLoader").hide();
    var colors = ["snow", "grays", "lightblue", "azure"];
    var color = colors[Math.floor(Math.random() * colors.length)];
    // console.log(color);
    $("body").css("background-color", color);

    function updateDesc(elem, val) {
        elem.children(".text").children("h3").text(val);
    }

    imagesRef
        .listAll()
        .then(function (res) {
            res.items.forEach(function (item) {
                var fileName = item.name;
                var img = imagesRef.child(fileName);

                img.getDownloadURL()
                    .then(function (url) {
                        setTimeout(function () {
                            $(".return-btn").show();
                        }, 2000);
                        myId++;
                        let nowId = myId;
                        var elem = $(".my-img:last");
                        elem.click(function () {});
                        $(".gallery").append(elem.clone());
                        var nosuf = fileName.split(".").slice(0, -1).join(".");

                        var galleryRef = firebase
                            .database()
                            .ref("/gallery/" + nosuf);

                        img.getMetadata()
                            .then(function (metadata) {
                                // Metadata now contains the metadata for 'images/forest.jpg'
                                imgMeta[nowId] = metadata["customMetadata"];
                                updateDesc(
                                    elem,
                                    metadata["customMetadata"]["title"]
                                );

                                elem.prop("id", nowId);
                                imgSrc[nowId] = url;
                                console.log(
                                    nowId + " " + imgMeta[nowId]["title"]
                                );

                                elem.children(".img-container")
                                    .children(".img")
                                    .attr("src", url);
                                elem.children(".text").hide();

                                $(".loader-container").hide();
                                $(".title").show();
                                $(".title").addClass("fold");

                                if (!touch) {
                                    console.log("Add hover");
                                    elem.hover(
                                        function () {
                                            elem.children(".text").show();
                                        },
                                        function () {
                                            elem.children(".text").hide();
                                        }
                                    );
                                }

                                elem.click(function () {
                                    console.log("click");
                                    showFullImg(nowId);
                                    // elem.children(".text").slideToggle();
                                });

                                elem.show();
                            })
                            .catch(function (error) {
                                // Uh-oh, an error occurred!
                            });
                    })
                    .catch(function (error) {
                        console.log("Error!!");
                        console.log(error);
                    });
            });
        })
        .catch(function (error) {
            console.log("Error");
            console.log(error);
        });
});
