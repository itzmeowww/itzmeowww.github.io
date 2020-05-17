function randColor() {
    var colors = ["snow", "#FF8000"];
    var borderColors = {
        snow: "black",
        "#FF8000": "orangered",
    };
    var color = colors[Math.floor(Math.random() * colors.length)];
    var colorPack = {
        color: color,
        borderColor: borderColors[color],
    };
    return colorPack;
}

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    var str = absolute + " " + alpha + " " + beta + " " + gamma;
    var f = 1 / 10;
    // $("#show").text(str);
    if (beta != null && gamma != null) {
        if (Math.round(beta) == 0) force.y = 0;
        else if (beta > 0) force.y = f;
        else force.y = -f;

        if (Math.round(gamma) == 0) force.x = 0;
        else if (gamma > 0) force.x = f;
        else force.x = -f;
        text.value = Math.round(beta) + " " + Math.round(gamma);
    } else {
        force.y = 1;
        force.x = 0;
    }
    // console.log(force);
}

if (typeof DeviceMotionEvent.requestPermission === "function") {
    alert("Gently tap anywhere on screen to give permission :)");
    onclick = function () {
        DeviceMotionEvent.requestPermission()
            .then((response) => {
                if (response == "granted") {
                    window.addEventListener(
                        "deviceorientation",
                        handleOrientation,
                        true
                    );
                    $("body").click(function () {});
                }
            })
            .catch((e) => {
                alert(e);
            });
    };
    $("body").click(onclick);
} else {
    window.addEventListener("deviceorientation", handleOrientation, true); // non iOS 13+
}

var isMobile = false;
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    isMobile = true;
}

var two = new Two({
    fullscreen: true,
    autostart: true,
}).appendTo(document.body);
var force = new Two.Vector();

var circle = two.makeCircle(72, 100, 50);
var radius = circle._radius;

circle.velocity = new Two.Vector(0, 0);
circle.fill = "#FF8000";
circle.stroke = "orangered"; // Accepts all valid css color
circle.linewidth = 5;
circle.translation.set(two.width / 2, two.height / 2);

var styles = {
    family: "proxima-nova, sans-serif",
    size: isMobile ? 20 : 50,
    leading: 50,
    weight: 900,
};

var text = two.makeText("Hi!", two.width / 2, two.height / 2, styles);
two.bind("resize", function () {
    circle.translation.set(two.width / 2, two.height / 2);
    text.translation.set(two.width / 2, two.height / 2);
}).bind("update", function () {
    circle.velocity.addSelf(force);
    // console.log(circle.velocity);
    if (
        circle.translation.x - radius + circle.velocity.x >= 0 &&
        circle.translation.x + radius + circle.velocity.x <= two.width
    ) {
        circle.translation.x += circle.velocity.x;
    } else {
        // console.log(circle.velocity.x);
        if (Math.abs(circle.velocity.x) > 1) {
            var colorPack = randColor();
            circle.fill = colorPack["color"];
            circle.stroke = colorPack["borderColor"];
        }

        circle.velocity.x *= -0.9;
    }
    if (
        circle.translation.y - radius + circle.velocity.y >= 0 &&
        circle.translation.y + radius + circle.velocity.y <= two.height
    ) {
        circle.translation.y += circle.velocity.y;
    } else {
        // console.log(circle.velocity.y);
        if (Math.abs(circle.velocity.y) > 1) {
            var colorPack = randColor();
            circle.fill = colorPack["color"];
            circle.stroke = colorPack["borderColor"];
        }

        circle.velocity.y *= -0.9;
    }
});
