import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const three = document.querySelector(".threeGeometry");
three.appendChild(renderer.domElement);

/**
 * ジオメトリを作ってみよう。
 **/
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, Math.PI * 2);

// バッファジオメトリ
const bufferGeometry = new THREE.BufferGeometry();

const positionArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
bufferGeometry.setAttribute("position", positionAttribute);

//マテリアル
const normalMaterial = new THREE.MeshNormalMaterial();
// {wireframe: true,}

const basicMaterial = new THREE.MeshBasicMaterial({ wireframe: true });

// メッシュ化
const box = new THREE.Mesh(boxGeometry, normalMaterial);
const sphere = new THREE.Mesh(sphereGeometry, normalMaterial);
sphere.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, normalMaterial);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

const torus = new THREE.Mesh(torusGeometry, normalMaterial);
torus.position.x = -1.5;

const buffer = new THREE.Mesh(bufferGeometry, basicMaterial);

scene.add(box, sphere, plane, torus);
// scene.add(buffer);

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  //オブジェクトの回転
  // sphere.rotation.x = elapsedTime;
  // plane.rotation.x = elapsedTime;
  // octahedron.rotation.x = elapsedTime;
  // torus.rotation.x = elapsedTime;

  // sphere.rotation.y = elapsedTime;
  // plane.rotation.y = elapsedTime;
  // octahedron.rotation.y = elapsedTime;

  // torus.rotation.y = elapsedTime;

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
