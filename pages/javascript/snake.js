import * as THREE from "./build/three.module.js";

//set up three.js
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100;
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 25;
light.position.x = 0;

scene.add(light);
scene.background = new THREE.Color("white");
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;
const camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera2.position.z = 10;
const color = 0xffffff;
const density = 0.1;
scene.fog = new THREE.FogExp2(color, density);

var size = 2001;
var divisions = size;
var gridHelper = new THREE.GridHelper(size, divisions, 0xfe0000, 0x000000);
// var gridHelper = new THREE.GridHelper(size, divisions, 0xfe0000, 0x000000);
var vector = new THREE.Vector3(0, 1, 0);
gridHelper.geometry.lookAt(vector);

gridHelper.position.y = -501;
gridHelper.position.z = -0.5;
gridHelper.receiveShadow = false;
scene.add(gridHelper);

let pause = false;
let score = 0;
const snake = [];
const foods = [];
let createTail = 0;
const snakeSpeed = {
    bx: 0,
    by: 0,
    x: 0,
    y: 0,
};

const addPlane = function () {
    var geometry = new THREE.PlaneGeometry(
        window.innerWidth,
        window.innerHeight
    );
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    plane.position.z = 0;
    scene.add(plane);
};

const createFood = function (color, x, y) {
    const boxColor = color || 0x00fe00;
    const blockWidth = 0.7;
    const blockHeight = 0.7;
    const blockDepth = 0.7;
    const geometry = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
    const material = new THREE.MeshPhongMaterial({ color: boxColor });
    const Food = new THREE.Mesh(geometry, material);
    if (x == undefined || y == undefined) {
        x = Math.round(Math.random() * 10);
        y = Math.round(Math.random() * 10);
        if (Math.round(Math.random() * 2) == 1) {
            x *= -1;
        }
        if (Math.round(Math.random() * 2) == 1) {
            y *= -1;
        }
    }
    Food.position.x = x;
    Food.position.y = y;
    foods.push(Food);
    scene.add(Food);
};

const createSnakeBlock = function (x, y, sx, sy, color) {
    // console.log("Create Tail at " + x + " " + y + " " + sx + " " + sy);
    const snakeColor = color || 0xfecece;
    const blockWidth = 1;
    const blockHeight = 1;
    const blockDepth = 1;
    const geometry = new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth);
    const material = new THREE.MeshPhongMaterial({ color: snakeColor });
    const snakeBlock = new THREE.Mesh(geometry, material);
    snakeBlock.position.x = x;
    snakeBlock.position.y = y;
    snakeBlock.position.z = 0;
    snakeBlock.castShadow = true;
    snakeBlock.receiveShadow = false;
    snake.push({
        block: snakeBlock,
        speed: {
            x: sx,
            y: sy,
        },
        pos: {
            bx: 0,
            by: 0,
            x: x,
            y: y,
        },
    });

    scene.add(snakeBlock);
};
// addPlane();
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 1;
camera.rotation.x = Math.PI / 2;
camera.rotation.y = 0;
let cameraAngle = 0;
createSnakeBlock(0, 0, 0, 0);

createFood(0xfe0000, 0, 2);
function animate(time) {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    // renderer.render(scene, camera2);
    // b = before, s = speed lol eiei

    if (!pause) {
        if (Math.abs(camera.rotation.y - cameraAngle) < 0.05) {
            if (cameraAngle > Math.PI * 2) {
                cameraAngle -= Math.PI * 2;
            }
            if (cameraAngle < 0) {
                cameraAngle += Math.PI * 2;
            }
            camera.rotation.y = cameraAngle;
        }
        if (camera.rotation.y < cameraAngle) {
            camera.rotation.y += 0.12;
        } else if (camera.rotation.y > cameraAngle) {
            camera.rotation.y -= 0.12;
        }

        let bsx, bsy;
        let valid = false;
        for (let i = 0; i < snake.length; i++) {
            var block = snake[i].block;
            var speed = snake[i].speed;
            var pos = snake[i].pos;

            if (i == 0) {
                camera.position.x = block.position.x;
                camera.position.y = block.position.y;
                if (speed.x != 0 || speed.y != 0) {
                    // console.log(pos.x + " " + pos.y);
                }

                foods.forEach((food) => {
                    if (
                        Math.abs(food.position.x - block.position.x) <= 0.05 &&
                        Math.abs(food.position.y - block.position.y) <= 0.05
                    ) {
                        // console.log(food);
                        foods.splice(foods.indexOf(food), 1);
                        // food.geometry.dispose();
                        // food.material.dispose();
                        scene.remove(food);
                        createTail++;
                        score++;
                        $("#score").text("SCORE : " + score);
                        createFood();
                    }
                });
                // camera.lookAt(pos.x, pos.y, 1);
            }
            if (
                (Math.abs(block.position.x - pos.x) <= 0.01 &&
                    Math.abs(block.position.y - pos.y) <= 0.01 &&
                    i == 0) ||
                valid
            ) {
                valid = true;
                // console.log(i + ": " + speed.x + " " + speed.y);

                if (i == 0) {
                    bsx = speed.x;
                    bsy = speed.y;
                    speed.x = snakeSpeed.x;
                    speed.y = snakeSpeed.y;
                } else {
                    let bbsx = speed.x;
                    let bbsy = speed.y;
                    speed.x = bsx;
                    speed.y = bsy;
                    bsx = bbsx;
                    bsy = bbsy;
                    // console.log("Set to " + speed.x + " " + speed.y);
                }
                if (createTail > 0 && i == snake.length - 1) {
                    createTail--;
                    createSnakeBlock(
                        pos.bx,
                        pos.by,
                        speed.x,
                        speed.y,
                        0xfe0000
                    );
                }
                // console.log("new " + i + ": " + speed.x + " " + speed.y);
                pos.bx = pos.x;
                pos.by = pos.y;
                pos.x = Math.round(block.position.x + speed.x);
                pos.y = Math.round(block.position.y + speed.y);
            } else {
                block.position.x += speed.x / 10;
                block.position.y += speed.y / 10;
            }
        }
    }
}
animate();

//client event
function onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
let speedIdx = 0;
let speeds = [
    {
        x: 0,
        y: 1,
    },
    {
        x: 1,
        y: 0,
    },
    {
        x: 0,
        y: -1,
    },
    {
        x: -1,
        y: 0,
    },
];

function getSpeed(add) {
    speedIdx += add;
    if (speedIdx < 0) speedIdx = 3;
    if (speedIdx > 3) speedIdx = 0;
    snakeSpeed.x = speeds[speedIdx].x;
    snakeSpeed.y = speeds[speedIdx].y;
}
function onKeypress(event) {
    // console.log(event.keyCode);
    if (event.keyCode == 97) {
        cameraAngle += Math.PI / 2;
        // while (cameraAngle > Math.PI * 2) {
        //     cameraAngle -= Math.PI * 2;
        // }
        // snakeSpeed.x = -1;
        // snakeSpeed.y = 0;
        getSpeed(-1);
    } else if (event.keyCode == 100) {
        cameraAngle -= Math.PI / 2;
        getSpeed(1);
        // while (cameraAngle < 0) {
        //     cameraAngle += Math.PI * 2;
        // }
        // snakeSpeed.x = 1;
        // snakeSpeed.y = 0;
    } else if (event.keyCode == 119) {
        getSpeed(0);
        // snakeSpeed.x = 0;
        // snakeSpeed.y = 1;
    } else if (event.keyCode == 115) {
        // snakeSpeed.x = 0;
        // snakeSpeed.y = -1;
    } else if (event.keyCode == 32) {
        pause = !pause;
    } else if (event.keyCode == 113) {
        // createTail++;
        //console.log(createTail);
    }

    if (event.keyCode != 32) {
        if (pause) pause = false;
    }
}
window.addEventListener("resize", onWindowResize);
window.addEventListener("keypress", onKeypress);
var touch = false;
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    touch = true;
}
$(document).ready(function () {
    if (touch) {
        alert("Please gently swipe left and right to control");
    } else alert("W,A,D : control , space : pause\nTHIS IS BETA VERSION ;)");
});

try {
    $(document).on("mobileinit", function () {
        $.mobile.loader.prototype.options.disabled = true;
    });

    $.mobile.loading().hide();
} catch (error) {
    console.log(error);
}

function handleSwipeLeft(event) {
    cameraAngle += Math.PI / 2;
    getSpeed(-1);
}
function handleSwipeRight(event) {
    cameraAngle -= Math.PI / 2;
    getSpeed(1);
}
function handleSwipeUp(event) {
    getSpeed(0);
}
$(window).on("swipeleft", handleSwipeLeft);
$(window).on("swiperight", handleSwipeRight);
// $(window).on("swipeup", handleSwipeUp);
