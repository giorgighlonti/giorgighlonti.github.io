////Import the THREE.js library
//import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//// To allow for the camera to move around the scene
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//// To allow for importing the .gltf file
//import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
//
////Create a Three.JS Scene
//const scene = new THREE.Scene();
////create a new camera with positions and angles
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//
////Keep track of the mouse position, so we can make the eye move
//let mouseX = window.innerWidth / 2;
//let mouseY = window.innerHeight / 2;
//
////Keep the 3D object on a global variable so we can access it later
//let object;
//
////OrbitControls allow the camera to move around the scene
//let controls;
//
////Set which object to render
//let objToRender = 'knife';
//
////Instantiate a loader for the .gltf file
//const loader = new GLTFLoader();
//
////Load the file
//loader.load(
//    `./models/${objToRender}/Knife.glb`,
//    function (gltf) {
//
//        console.log("Model loaded:", gltf);
//
//        object = gltf.scene;
//
//        scene.add(object);
//
//    },
//    function(xhr){
//
//        console.log(
//          (xhr.loaded / xhr.total * 100) + "% loaded"
//        );
//
//    },
//    function(error){
//
//        console.error("Loading error:", error);
//
//    }
//);
//
////Instantiate a new renderer and set its size
//const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
//renderer.setSize(window.innerWidth, window.innerHeight);
//
////Add the renderer to the DOM
//document.getElementById("container3D").appendChild(renderer.domElement);
//
////Set how far the camera will be from the 3D model
//camera.position.z = objToRender === "knife" ? 25 : 500;
//
////Add lights to the scene, so we can actually see the 3D model
//const topLight = new THREE.DirectionalLight(0xffffff, 10000); // (color, intensity)
//topLight.position.set(0, 0, 0) //top-left-ish
//topLight.castShadow = true;
//scene.add(topLight);
//
//const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "knife" ? 5 : 1);
//scene.add(ambientLight);
//
////This adds controls to the camera, so we can rotate / zoom it with the mouse
////if (objToRender === "dino") {
////  controls = new OrbitControls(camera, renderer.domElement);
////}
//
////Render the scene
//function animate() {
//  requestAnimationFrame(animate);
//  //Here we could add some code to update the scene, adding some automatic movement
//
//  //Make the eye move
//  if (object && objToRender === "knife") {
//    //I've played with the constants here until it looked good 
//    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
//    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
//  }
//  renderer.render(scene, camera);
//}
//
////Add a listener to the window, so we can resize the window and the camera
//window.addEventListener("resize", function () {
//  camera.aspect = window.innerWidth / window.innerHeight;
//  camera.updateProjectionMatrix();
//  renderer.setSize(window.innerWidth, window.innerHeight);
//});
//
////add mouse position listener, so we can make the eye move
//document.onmousemove = (e) => {
//  mouseX = e.clientX;
//  mouseY = e.clientY;
//}
//
////Start the 3D rendering
//animate();

// ============================================
// IMPORTS
// ============================================

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


// ============================================
// SCENE
// ============================================

const scene = new THREE.Scene();


// ============================================
// CAMERA
// ============================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 5);
camera.lookAt(0,0,0);


// ============================================
// RENDERER
// ============================================

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

renderer.outputEncoding = THREE.sRGBEncoding;


document
    .getElementById("container3D")
    .appendChild(renderer.domElement);


// ============================================
// LIGHTS
// ============================================

const mainLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

mainLight.position.set(5,5,5);

scene.add(mainLight);



const fillLight = new THREE.DirectionalLight(
    0xffffff,
    1.5
);

fillLight.position.set(-5,2,3);

scene.add(fillLight);



const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);


// ============================================
// LOAD MODEL
// ============================================

const loader = new GLTFLoader();

let object;


loader.load(

    "./assets/projects/3d/models/knife/Knife.glb",

    function(gltf){

        console.log("MODEL LOADED");

        object = gltf.scene;

        scene.add(object);



        // ------------------------------
        // FIXED POSITION
        // ------------------------------

        object.position.set(
            0,
            -0.3,
            0
        );


        // ------------------------------
        // FIXED ROTATION
        // ------------------------------

        object.rotation.set(
            THREE.MathUtils.degToRad(-10),
            THREE.MathUtils.degToRad(35),
            0
        );


        // ------------------------------
        // SCALE
        // ------------------------------

        object.scale.set(
            1.2,
            1.2,
            1.2
        );



        // Shadows/material improvements

        object.traverse((child)=>{

            if(child.isMesh){

                child.castShadow = true;
                child.receiveShadow = true;

            }

        });


    },


    function(xhr){

        console.log(
            (xhr.loaded / xhr.total * 100)
            + "% loaded"
        );

    },


    function(error){

        console.error(
            "GLB ERROR:",
            error
        );

    }

);



// ============================================
// MOUSE MOVEMENT
// ============================================

let mouseX = 0;
let mouseY = 0;


// Target rotation values
let targetRotationX = 0;
let targetRotationY = 0;


window.addEventListener(
    "mousemove",
    (event)=>{


        // Normalize mouse position
        mouseX =
        (event.clientX / window.innerWidth) - 0.5;


        mouseY =
        (event.clientY / window.innerHeight) - 0.5;



        // VERY SMALL MOVEMENT

        targetRotationY =
            mouseX * 0.15;


        targetRotationX =
            mouseY * 0.08;


    }
);



// ============================================
// ANIMATION
// ============================================

function animate(){

    requestAnimationFrame(animate);



    if(object){


        // Smooth rotation

        object.rotation.y +=
            (
                targetRotationY -
                object.rotation.y -
                THREE.MathUtils.degToRad(35)
            ) * 0.03;



        object.rotation.x +=
            (
                targetRotationX -
                object.rotation.x -
                THREE.MathUtils.degToRad(-10)
            ) * 0.03;



    }



    renderer.render(
        scene,
        camera
    );

}


animate();



// ============================================
// RESPONSIVE
// ============================================

window.addEventListener(
    "resize",
    ()=>{


        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


    }
);