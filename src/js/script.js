import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'

// setting up the renderer who renders our animations
const renderer = new THREE.WebGLRenderer()

// setting up the size of the canvas

renderer.setSize(window.innerWidth, innerHeight)


//appeding it to our body   
document.body.appendChild(renderer.domElement)

// creating a new scene which contains our objects
const scene = new THREE.Scene

// creating the camera instance it accepts diff parameters,
// which are the field of view, aspect ratio, near and far clips
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000
)


// basically the orbit module is the one responsible of making the mouse control the scene
// and changing the camera direction by the mouse
// to set it we should always create an instance of the orbit class 
// and then give it the camera ofc which is the one we will control and the renderer which is an instance of the webgl class

const orbit = new OrbitControls(camera,renderer.domElement)

// here we are adding the axis helper which are the lines that show the coordinates for us so we see visualize them, 
// the param inside it is the size of the axis

const axesHelper = new THREE.AxesHelper(5)

// here we are adding them to our scene which is our canva

scene.add(axesHelper)

orbit.update()


// WE CAN USE THIS INSTEAD basically this method set the position of the camera (x,y,z)
camera.position.set(-10,30,30)

const boxGeometry = new THREE.BoxGeometry() //Skeleton
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00}) //material
const box =  new THREE.Mesh(boxGeometry, boxMaterial) //covering skeleton with material
// creating shapes is built in three phases
// Skeleton, material, covering gemoetry with material

scene.add(box)


// basically animation is a sequence of actions that are occuring each frame
// so here we are adding a function of animation called animation that increments the x and y by 0.01 in each frame and rerending it by that matter of time 


const planeGeometry = new THREE.PlaneGeometry(30,30) // we can specify the grid squares by changing the second parameters
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFF, side: THREE.DoubleSide})
const plan =  new THREE.Mesh(planeGeometry, planeMaterial)

const gridHelper = new THREE.GridHelper(30)
plan.rotation.x = -0.5 * Math.PI 

scene.add(gridHelper) // a helper that gives use the surface 
scene.add(plan)

const sphereGeo = new THREE.SphereGeometry(5,50,50)
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000FF})
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial)

sphere.position.set(1,10,10)

scene.add(sphere)
const gui = new dat.GUI() // creating the instance of the GUI which is an interface that helps us navigate multiple option, like colors, speed, ...
const options = {
    sphereColor : '#ffea00',
    speed : 0.01
} // objects holds data needed by the gui


let step = 0

gui.add(options, 'speed', 0, 0.1) // adding an interface in the GUI, we give the object we parsing data from, name of the gui , min speed, max speed
const animation = ()=>{
    box.rotation.x += 0.01
    box.rotation.y += 0.01
    step += options.speed 
    // making the webgl render our scene and camera in the browser
    sphere.position.y = 10 * Math.abs(Math.sin(step))
    renderer.render(scene,camera)
}

gui.addColor(options, 'sphereColor').onChange((e)=>sphere.material.color.set(e))

renderer.setAnimationLoop(animation)



// lights, they are three types of lights, ambient light do one that comes undirectly like the light from the sun that comes from the window
// diretional light : that covers all the surface
// spotlight : that covers a specific spot