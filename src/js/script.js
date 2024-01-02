import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
//renderer.
const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene & the camera 
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

//orbit for dragging mouse & setting camera
const orbit = new OrbitControls(camera, renderer.domElement)
camera.position.set(-10, 30, 30)
orbit.update()

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


//shapes
const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight)
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

const spotLight = new THREE.SpotLight(0xFFFFFF, 100000);
scene.add(spotLight)
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// scene.fog = new THREE.Fog(0xFFFFFF, 0, 200)
scene.fog = new THREE.Fog(0xFFFFFF, 0.01)


//for changing color
const gui = new dat.GUI()
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.03,
    penumbra: 0.5,
    intensity: 50000
};
gui.addColor(options, 'sphereColor').onChange(function (e) {
    sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange(function (e) {
    sphere.material.wireframe = e;
})
gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 100000);


//creating a plane.
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;


const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)


//bounching the sphere

let step = 0;

//function to animate the shape
function animate(time) {
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step))

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;

    spotLightHelper.update()

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate);
