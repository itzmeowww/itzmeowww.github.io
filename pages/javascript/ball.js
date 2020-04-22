function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    var str = absolute + " " + alpha + " " + beta + " " + gamma;

    // $("#show").text(str);
    if (beta != null && gamma != null) {
        if (beta == 0) force.y = 0;
        else if (beta > 0) force.y = 1 / 2;
        else force.y = -1 / 2;

        if (gamma == 0) force.x = 0;
        else if (gamma > 0) force.x = 1 / 2;
        else force.x = -1 / 2;
        text.value = Math.round(beta) + " " + Math.round(gamma);
    } else {
        force.y = 1;
        force.x = Math.random() * 1;
    }
    // console.log(force);
}

if (typeof DeviceMotionEvent.requestPermission === "function") {
    onclick = function () {
        alert("Click!");
        DeviceMotionEvent.requestPermission()
            .then((response) => {
                if (response == "granted") {
                    window.addEventListener(
                        "deviceorientation",
                        handleOrientation,
                        true
                    );
                }
            })
            .catch((e) => {
                alert(e);
            });
    };
    $("body").click(onclick);
} else {
    alert("HI there?");
    console.log("HI");
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
        circle.translation.x + circle.velocity.x >= 0 &&
        circle.translation.x + circle.velocity.x <= two.width
    ) {
        circle.translation.x += circle.velocity.x;
    } else {
        circle.velocity.x *= -0.9;
    }
    if (
        circle.translation.y + circle.velocity.y >= 0 &&
        circle.translation.y + circle.velocity.y <= two.height
    ) {
        circle.translation.y += circle.velocity.y;
    } else {
        circle.velocity.y *= -0.9;
    }
});
