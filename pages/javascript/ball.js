var two = new Two({
    type: Two.Types["canvas"],
    fullscreen: true,
    autostart: true,
}).appendTo(document.body);
var force = new Two.Vector();
var circle = two.makeCircle(72, 100, 50);
circle.fill = "#FF8000";
circle.stroke = "orangered"; // Accepts all valid css color
circle.linewidth = 5;
circle.translation.set(two.width / 2, two.height / 2);
two.bind("resize", function () {
    circle.translation.set(two.width / 2, two.height / 2);
}).bind("update", function () {
    if (
        circle.translation.x + force.x >= 0 &&
        circle.translation.x + force.x <= two.width
    ) {
        circle.translation.x += force.x;
    }
    if (
        circle.translation.y + force.y >= 0 &&
        circle.translation.y + force.y <= two.height
    ) {
        circle.translation.y += force.y;
    }
});

window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    var str = absolute + " " + alpha + " " + beta + " " + gamma;
    if (beta == 0) force.y = 0;
    else if (beta > 0) force.y = 1;
    else force.y = -1;

    if (gamma == 0) force.x = 0;
    else if (gamma > 0) force.x = 1;
    else force.x = -1;
    // $("#show").text(str);
    console.log(force);
}
