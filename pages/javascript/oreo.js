$(document).ready(function() {

    var top = $('#top');
    var mid = $('#mid');
    var bottom = $('#bottom');

    var tts = new GoogleTTS('en');


    window.devicePixelRatio = 1;

    window.fbAsyncInit = function() {
        FB.init({
            appId: '251015596070051',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v6.0'
        });
    };

    oreo = [];

    console.log("ready!");
    var oreo_height = 300;
    var oreo_width = 300;
    var oreo_x = (oreo_width - 245) / 2;
    var oreo_y = 10;
    $('#oreo-svg').attr('viewBox', '0 0 ' + oreo_width + ' ' + oreo_height);
    top.attr("transform", 'translate(' + oreo_x + ',' + oreo_y + ')');
    mid.attr('transform', 'translate(' + oreo_x + ',' + oreo_y + ')');
    bottom.attr('transform', 'translate(' + oreo_x + ',' + oreo_y + ')');


    function updateName() {
        var name = "";
        for (x in oreo) {
            var layer = oreo[x];
            if (layer.type == 'cookie' || layer.type == 'bcookie') name += 'O';
            else name += 'RE';
        }
        console.log(name);
        $('.text').text(name);
    }

    function moveOreo() {
        for (x in oreo) {
            var layer = oreo[x];
            var val = "translate(" + layer.x + "," + (layer.y) + ")";
            $(layer.id).attr("transform", val);
        }
    }

    function updateOreo(mode) {
        var add = 0;
        if (oreo.length != 0) {
            if (oreo[oreo.length - 1].type == 'cookie') {
                if (mode == 'cream') add = 40;
                else add = 25;
            } else if (oreo[oreo.length - 1].type == 'bcookie') {
                if (mode == 'cream') add = 10;
                else add = -5;
            } else {
                if (mode == 'cream') add = 15;
                else add = 0;
            }
        }

        for (x in oreo) {
            var layer = oreo[x];
            oreo[x].y += add;

        }
        moveOreo();
        oreo_height += add;
        $('#oreo-svg').attr('viewBox', '0 0 ' + oreo_width + ' ' + oreo_height)
    }

    $('#cookie').click(function() {
        top.attr('visibility', 'hidden');
        mid.attr('visibility', 'hidden');
        bottom.attr('visibility', 'hidden');
        console.log('Add cookie!');
        var elem;
        var type;
        if (oreo.length == 0) {
            elem = bottom.clone();
            type = 'bcookie';
        } else {
            elem = top.clone();
            type = 'cookie';
        }
        elem.attr('visibility', 'visible');
        console.log(oreo.length);
        var newid = "lay-" + (oreo.length + 1);
        console.log(newid);
        elem.attr("id", newid);
        elem.attr("transform", "translate(0,0)");
        $('#oreo').append(elem);
        updateOreo('cookie');
        oreo.push({
            'id': '#' + newid,
            'type': type,
            'x': oreo_x,
            'y': oreo_y,
        });
        updateName();
        moveOreo();
    });

    $('#cream').click(function() {
        top.attr('visibility', 'hidden');
        mid.attr('visibility', 'hidden');
        bottom.attr('visibility', 'hidden');
        console.log('Add cookie!');
        var elem = mid.clone();
        elem.attr('visibility', 'visible');
        console.log(oreo.length);
        var newid = "lay-" + (oreo.length + 1);
        console.log(newid);
        elem.attr("id", newid);
        elem.attr("transform", "translate(0,0)");
        $('#oreo').append(elem);
        updateOreo('cream');
        oreo.push({
            'id': '#' + newid,
            'type': 'cream',
            'x': oreo_x,
            'y': oreo_y,
        });
        updateName();
        moveOreo();
    });

    $('#reset').click(function() {
        top.attr('visibility', 'visible');
        mid.attr('visibility', 'visible');
        bottom.attr('visibility', 'visible');
        for (x in oreo) {
            var layer = oreo[x];
            $(layer.id).remove();
        }
        oreo = [];
        oreo_height = 300;
        oreo_width = 300;

        updateName();
        $('.text').text('OREO');
        updateOreo();

    });


    $('.text').click(function() {

    });

    function debugBase64(base64URL) {
        var win = window.open();
        win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
    }

    function download(canvas, filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'),
            e;

        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL("image/png");

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    $("#update").click(function() {
        console.log(window.devicePixelRatio);
        var btn = $('#btnSave');
        console.log("Click");

        html2canvas($("#my-oreo")[0], {
            backgroundColor: null,
        }).then(function(canvas) {
            // s$(canvas).removeAttr('style');
            console.log(canvas);
            // console.log($('.text').text());
            // download(canvas, $('.text').text());
            // var download_url = canvas.toDataURL("image/png");
            var url = canvas.toDataURL('image/png');
            btn.attr("href", url);
            console.log(url);


            // debugBase64(download_url);
            // $('#img-out').append(canvas);
        });

    });




});