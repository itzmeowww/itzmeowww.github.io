firebase.initializeApp(firebaseConfig);
var perf = firebase.performance();

var database = firebase.database();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('gallery');

var listed_img = [];

function listImgs() {
    imagesRef.listAll().then(function(res) {
        res.items.forEach(function(itemRef) {
            if (itemRef.name in listed_img) {

            } else {
                listed_img.push(itemRef.name);
                itemRef.getDownloadURL().then(function(url) {
                    var ele = $(".img-list:last").clone();
                    console.log(ele);
                    $('.list-of-image').append(ele);
                    itemRef.getMetadata().then(function(metadata) {
                        $('.loader-container').hide();
                        console.log(metadata);
                        ele.show();
                        ele.children(".img").attr("src", url);
                        ele.children(".title-inp").val(metadata['customMetadata']['title']);
                        ele.children(".update-metadata-btn").click(function() {
                            var newMetadata = {
                                customMetadata: {
                                    'title': ele.children(".title-inp").val(),
                                }

                                // 'caption': '',
                            }
                            console.log(newMetadata);
                            itemRef.updateMetadata(newMetadata).then(function() {
                                console.log(itemRef.name);
                                alert('Successfully Update');
                                // itemRef.getMetadata().then(function(metadata) {
                                //     ele.children(".title-inp").val(metadata['customMetadata']['title']);
                                // });
                            }).catch(function(err) {
                                alert('Cannot Update');
                                console.log(err);
                            });


                        });
                        // Metadata now contains the metadata for 'images/forest.jpg'
                    }).catch(function(error) {
                        console.log(error);
                    });

                }).catch(function(err) {
                    console.log(err);
                });
            }

        });
    });
}


var upload = function(ref, file, title, caption) {
    console.log('Uploading . . .');
    $(".img-form").hide();
    $(".loader-container").show();
    var date = new Date().valueOf();
    var dates = Date().valueOf().split(" ");
    console.log(dates);
    var metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
            'title': title,
            'caption': caption,
            'date': Date().valueOf(),
        }
    };
    var path = file.name + ' ' + dates[0] + ' ' + dates[1] + '' + dates[2] + ' ' + dates[3] + ' ' + dates[4];
    console.log(path);
    var thisRef = ref.child(path);

    thisRef.put(file, metadata).then(function(snapshot) {
        console.log('Uploaded a blob or file! to ' + thisRef);
        $(".img-form").show();
        $(".loader-container").hide();
        alert('Completed!');
        listImgs();

    }).catch(function(error) {
        user = firebase.auth().currentUser;
        alert('Log in as : ' + user.email);
        alert(error.message);
        console.log('Error');
        console.log(error);
        $(".img-form").show();
        $(".loader-container").hide();
    });
    console.log(file);
};

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        $('.login').hide();
        $('.register').hide();
        $('.img-form').show();

        listImgs();
        console.log('Logged in');
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert('Error! ' + errorMessage);
        $(".loader-container").hide();
        $(".login").show();
        // ...
    });
}

$(document).ready(function() {
    $('.img-list').hide();
    console.log(firebase.auth().currentUser);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);




    $(".loader-container").hide();
    $(".img-form").hide();
    $('.login').show();
    $('.register').hide();
    $('.myform').hide();

    //For DEBUG
    // $('.login').hide();
    // $('.register').hide();
    // $('.img-form').show();
    // $(".loader-container").hide();
    // listImgs();

    $("#my-form").submit(function(e) {
        e.preventDefault();
    });

    $("#login-form").submit(function(e) {
        e.preventDefault();
    });
    $("#register-form").submit(function(e) {
        e.preventDefault();
    });


    $('.close-upload').click(function() {
        $('.myform').slideUp();
    });
    $('.add-img').click(function() {
        $('.myform').slideDown();
    });

    $(document).on('submit', '#my-form', function() {
        var title = $('#title').val();
        var caption = $('#cap').val();
        var file = $('#file').prop('files')[0];
        if (title == "") {
            alert('Please enter the title');
        } else if (file == null) {
            alert('Please select the file');
        } else {
            console.log(title + ' ' + caption + ' ' + file.name);

            upload(imagesRef, file, title, caption);
        }
        return false;
    });

    $(document).on('submit', '#register-form', function() {
        var email = $('#remail').val();
        var password = $('#rpassword').val();
        $(".loader-container").show();
        $("#register-form").hide();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            $('.login').show();
            $('.register').hide();
            $('#lemail').val(email);
            $('#lpassword').val(password);
            $(".loader-container").hide();
            $("#register-form").show();

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert('Error! ' + errorMessage);
            $(".loader-container").hide();
            $("#register-form").show();
            // ...
        });
    });

    $(document).on('submit', '#login-form', function() {
        var email = $('#lemail').val();
        var password = $('#lpassword').val();
        $(".loader-container").show();
        $(".login").hide();
        signIn(email, password);
    });


    $('#tosignup').click(function() {
        console.log('click');
        $('#remail').val($('#lemail').val());
        $('#rpassword').val($('#lpassword').val());
        $('.login').hide();
        $('.register').show();
    });
    $('#tosignin').click(function() {
        $('#lemail').val($('#remail').val());
        $('#lpassword').val($('#rpassword').val());
        $('.login').show();
        $('.register').hide();
    });

    $('.signout').click(function() {
        firebase.auth().signOut().then(function() {
            alert('sign out!');
            $('.login').show();
            $('.register').hide();
            $('.img-form').hide();

        }).catch(function(error) {
            alert('error! ' + error);
        });
    });
});