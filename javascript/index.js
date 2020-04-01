$(document).ready(function() {
    $("html:not(.loader-container)").hide();
    $(".loader-container").hide();
    $("html:not(.loader-container)").show();

    $(".name-container-text").addClass("fade-in");
    $(".btn").addClass("fade-in");

    setTimeout(function() {
        $(".name-container-text").removeClass("fade-in");
    }, 2000);


    // var idList = [null, '#div1', '#div2', '#div3', null];
    // var heightList = [];
    // heightList.push(null);
    // var initial_scroll = $(document).scrollTop();
    // var height_sum = 0;

    // var idNow = 1;

    // for (var i = 1; i < idList.length - 1; i++) {
    //     heightList.push($(idList[i]).height());

    //     height_sum += heightList[i];
    //     if (height_sum <= initial_scroll) {
    //         if (idNow == 1) {
    //             idNow = i;
    //         }
    //     }
    // }

    // var heightBefore = 0;

    // $(document).scroll(function() {
    //     var nowHeight = $(idList[idNow]).height();
    //     if ($(document).scrollTop() - heightBefore >= nowHeight) {
    //         idNow++;
    //         heightBefore += nowHeight;
    //     } else if ($(document).scrollTop() <= heightBefore - nowHeight) {
    //         idNow--;
    //         heightBefore -= nowHeight;
    //     }
    //     //console.log(idList[idNow]);

    //     // console.log($(document).scrollTop() + ' ' + nowHeight + ', ' + heightBefore);
    // });


    $(".name-container-text").hover(function() {
        var obj = $(this);
        obj.addClass("name-container-text-animation");
        setTimeout(function() {
            obj.removeClass("name-container-text-animation");
        }, 1000);
    }, function() {});






    $(".btn-down").click(function() {
        var scroll = new SmoothScroll();
        var anchor = document.querySelector($(this).attr("href"));
        var options = { speed: 1200, easing: 'easeOutCubic' };
        scroll.animateScroll(anchor, null, options);

    });

    $(".btn-up").click(function() {
        var scroll = new SmoothScroll();
        var anchor = document.querySelector($(this).attr("href"));
        var options = { speed: 1200, easing: 'easeOutCubic' };
        scroll.animateScroll(anchor, null, options);
    });

    var scroll2 = new SmoothScroll('a[href*="#"]', {
        speed: 1200,
    });


    // var scroll = new SmoothScroll('[data-scroll]', {
    //     speed: 1300
    // });

    $(".name-container, .name-container-group").mousemove(function(event) {
        // var msg = "Handler for .mousemove() called at ";
        // msg += event.pageX + ", " + event.pageY;
        //console.log(msg);
        var obj = $(".name-container .btn");
        var off = obj.offset();
        // console.log(pos.left + ' ' + pos.top + ' ' + obj.height());
        obj.removeClass("btn-sha-left-down btn-sha-right-down btn-sha-right-top btn-sha-left-top");
        if (event.pageX >= off.left && event.pageY <= off.top) {
            obj.addClass("btn-sha-left-down");
            // console.log("btn-sha-left-down");
        } else if (event.pageX < off.left && event.pageY <= off.top) {
            obj.addClass("btn-sha-right-down");
            // console.log("btn-sha-right-down");
        } else if (event.pageX >= off.left && event.pageY > off.top) {
            obj.addClass("btn-sha-left-top");
        } else {
            obj.addClass("btn-sha-right-top");
        }
    });

    $(".btn").hover(function() {
        $(this).removeClass("btn-sha-left-down btn-sha-right-down btn-sha-right-top btn-sha-left-top");
        $(this).addClass("btn-no-sha");
    }, function() {
        $(this).removeClass("btn-no-sha");
    });


    $(".gallery-btn").click(function() {
        window.location.href = "pages/gallery.html";
    });

    $(".soc-btn").click(function() {
        window.location.href = $(this).attr("href");
    });

});








// firebase
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