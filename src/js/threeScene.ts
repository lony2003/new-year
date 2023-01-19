import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class ThreeScene {
    camera: THREE.OrthographicCamera;
    constructor(query: string) {
        // camera
        this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  -100000, 100000);
        let camera = this.camera;
        camera.position.set(-502.09, 702.24, 504.78);
        camera.quaternion.setFromEuler(new THREE.Euler(-0.67, -0.65, -0.45));

        // scene
        const scene = new THREE.Scene();

        // sceneItem
        const pointLight = new THREE.PointLight();
        pointLight.position.set(-135, 143.300, 142.220)

        scene.add( pointLight );

        const material = new THREE.MeshPhongMaterial({color: 0xcf3636});

        const box1 = new THREE.BoxGeometry(320, 1, 320);
        const box2 = new THREE.BoxGeometry(1, 320, 320);
        const box3 = new THREE.BoxGeometry(320, 320, 1);

        const mesh1 = new THREE.Mesh(box1, material);
        const mesh2 = new THREE.Mesh(box2, material);
        const mesh3 = new THREE.Mesh(box3, material);

        mesh1.position.set(0, -160, 0);
        mesh2.position.set(160, 0, 0);
        mesh3.position.set(0, 0, -160);

        scene.add(mesh1);
        scene.add(mesh2);
        scene.add(mesh3);

        // renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(animate);
        document.body.appendChild(renderer.domElement);

        // scene settings
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        scene.background = new THREE.Color('#121316');
        renderer.setClearAlpha(0);

        // orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.125;

        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            camera.left = window.innerWidth / - 2;
            camera.right = window.innerWidth / 2;
            camera.top = window.innerHeight / 2;
            camera.bottom = window.innerHeight / - 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate(time) {
            controls.update();
            renderer.render(scene, camera);
        }
    }
}