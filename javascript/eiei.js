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

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 100;
camera.position.x = 20;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var light = new THREE.PointLight(0xffffff, 1, 5000);
var mouse = new THREE.Vector2();

light.position.set(0, 0, 30);
scene.add(light);

var myText = undefined;

var loader = new THREE.FontLoader();
var myFont = undefined;
loader.load(
    "pages/font/Montserrat Black_Regular.json",
    function (font) {
        // do something with the font
        myText = new createText("HI", font);
        myFont = font;
        scene.add(myText);
    },

    // onProgress callback
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },

    // onError callback
    function (err) {
        console.log("An error happened");
    }
);

function createText(text, font) {
    var geometry = new THREE.TextGeometry(text.toString(), {
        font: font,
        size: 5,
        height: 0.5,
        curveSegments: 12,
    });
    var material = new THREE.MeshLambertMaterial({ color: 0xff7f50 });
    textMesh = new THREE.Mesh(geometry, material);
    textMesh.rotation.x = 0;
    textMesh.rotation.y = 0;
    // console.log(textMesh);
    return textMesh;
}
var num = 0;

var animate = function () {
    requestAnimationFrame(animate);

    num += 1;
    if (myFont != undefined && myText != undefined && num >= 60) {
        num = 0;
        var roX = myText.rotation.x;
        myText.geometry.dispose();
        myText.material.dispose();
        scene.remove(myText);
        date = countUpFromDate("Apr 22, 2019 22:22:00");
        var str =
            date["days"] +
            " " +
            date["hours"] +
            " " +
            date["mins"] +
            " " +
            date["secs"];
        myText = new createText(str, myFont);
        scene.add(myText);
    }
    // text.rotation.x += 0.01;

    renderer.render(scene, camera);
};

animate();

var onMouseMove = function (event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    light.position.x = mouse.x * 100 + 80;
    light.position.y = mouse.y * 100;
    // console.log(mouse.x + " " + mouse.y);
};

window.addEventListener("mousemove", onMouseMove);
