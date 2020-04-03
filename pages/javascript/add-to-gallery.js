import { strict } from "assert";

firebase.initializeApp(firebaseConfig);
var perf = firebase.performance();

var database = firebase.database();
var storage = firebase.storage();
var storageRef = firebase.storage().ref();
var imagesRef = storageRef.child('gallery');



var upload = function(ref, file, title, caption) {
    console.log('Uploading . . .');
    $(".myform").hide();
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
        $(".myform").show();
        $(".loader-container").hide();
        alert('Completed!');

    }).catch(function(error) {
        user = firebase.auth().currentUser
        alert('Log in as : ' + user.email)
        alert(error.message);
        console.log('Error');
        console.log(error);
        $(".myform").show();
        $(".loader-container").hide();
    });
    console.log(file);
};


$(document).ready(function() {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            $(".myform").show();
            $('.login').hide();
            $('.register').hide();
            return firebase.auth().signInWithEmailAndPassword(email, password);

        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    $(".loader-container").hide();
    $(".myform").hide();
    $('.login').show();
    $('.register').hide();

    $("#my-form").submit(function(e) {
        e.preventDefault();
    });

    $("#login-form").submit(function(e) {
        e.preventDefault();
    });
    $("#register-form").submit(function(e) {
        e.preventDefault();
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
        $("#login-form").hide();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            $('.login').hide();
            $('.register').hide();
            $('myform').show();
            $(".loader-container").hide();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert('Error! ' + errorMessage);
            $(".loader-container").hide();
            // ...
        });
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
            $('.myform').hide();

        }).catch(function(error) {
            alert('error! ' + error);
        });
    });
});