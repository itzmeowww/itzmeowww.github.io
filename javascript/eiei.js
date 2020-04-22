var isMobile = false;
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    isMobile = true;
}
var heart = 1;
var colors = ["snow", "coral"];
var color = colors[Math.floor(Math.random() * colors.length)];
console.log(color);
$(function () {
    var two = new Two({
        fullscreen: true,
        autostart: true,
    }).appendTo(document.body);

    var characters = [];

    var gravity = new Two.Vector(0, 0.1);

    var styles = {
        family: "proxima-nova, sans-serif",
        size: isMobile ? 20 : 50,
        leading: 50,
        weight: 900,
    };

    var currentText = "";

    two.bind("resize", function () {
        directions.translation.set(two.width / 2, two.height / 2);
    }).bind("update", function () {
        date = countUpFromDate("Apr 22, 2019 22:22:00");
        var str =
            date["days"] +
            " " +
            date["hours"] +
            " " +
            date["mins"] +
            " " +
            date["secs"];
        if (currentText != str) {
            add(str);
            currentText = str;
            var myTitle = "";
            if (heart > 5) {
                heart = 1;
            }
            for (var i = 0; i < heart; i++) {
                myTitle += "❤️";
            }
            heart++;
            myTitle += " | ItzMeOwww";
            $("#title").text(myTitle);
        }

        for (var i = 0; i < characters.length; i++) {
            var text = characters[i];
            if (i == characters.length - 1) {
            } else {
                text.translation.addSelf(text.velocity);
                text.velocity.addSelf(gravity);
                if (text.velocity.y > 0 && text.translation.y > two.height) {
                    two.scene.remove(text);
                    characters.splice(i, 1);
                }
            }
        }
    });

    function add(msg) {
        var x = two.width / 2;
        var y = two.height / 2;
        var text = two.makeText(msg, x, y, styles);
        text.size *= 2;
        text.fill = color;

        text.velocity = new Two.Vector();
        text.velocity.x = Math.random() * 2 - 1;
        text.velocity.y = 0;
        characters.push(text);
    }
});

function countUpFromDate(date) {
    date = new Date(date).getTime();
    //console.log(date);
    var now = new Date().getTime();
    //console.log(now);
    var dtime = now - date;

    var days = Math.floor(dtime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((dtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins = Math.floor((dtime % (1000 * 60 * 60)) / (1000 * 60));
    var secs = Math.floor((dtime % (1000 * 60)) / 1000);

    return {
        days: days,
        hours: hours,
        mins: mins,
        secs: secs,
    };
}
