import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, pointLight;

window.addEventListener("load", init);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const three = document.querySelector(".three");

  three.appendChild(renderer.domElement);

  //　テクスチャの追加
  const texture = new THREE.TextureLoader().load("./images/earth.jpg");

  // ジオメトリ
  const sphereGeometry = new THREE.SphereGeometry(100, 64, 32);

  // マテリアル
  const sphereMaterial = new THREE.MeshPhysicalMaterial({ map: texture });

  // メッシュ化
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

  scene.add(sphereMesh);

  // 平行光源を追加
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源の追加
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);

  // ポイント光源が光らないので下記を追加するか、インスタンス作成時の第二引数の値を10000に引き上げる
  pointLight.decay = 1;
  pointLight.power = 100;
  scene.add(pointLight);

  // ポイント光源を特定する
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

// ブラウザのリサイズに対応させる
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// ポイント光源の移動
const animate = () => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
