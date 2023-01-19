import * as THREE from 'three';

export default class ThreeScene {
    camera: THREE.OrthographicCamera;
    update: number;

    scene: THREE.Scene;

    renderer: THREE.Renderer;
    constructor() {

        this.update = 1;
        // camera
        this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2,  -100000, 100000);
        let camera = this.camera;
        camera.position.set(-502.09, 702.24, 504.78);
        camera.quaternion.setFromEuler(new THREE.Euler(-0.67, -0.65, -0.45));
        camera.scale.set(1, 1, 1);
        camera.zoom = 0.35;
        camera.updateProjectionMatrix();

        // scene
        const scene = new THREE.Scene();
        this.scene = scene;

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

        mesh1.scale.set(1, 0.001, 1);
        mesh2.scale.set(0.001, 1, 1);
        mesh3.scale.set(1, 1, 0.001)

        scene.add(mesh1);
        scene.add(mesh2);
        scene.add(mesh3);

        // renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer = renderer;
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setAnimationLoop(animate);
        document.body.appendChild(renderer.domElement);

        // scene settings
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;

        scene.background = new THREE.Color('#121316');
        renderer.setClearAlpha(0);

        renderer.render(scene, camera);

        window.addEventListener('resize', onWindowResize);
        function onWindowResize() {
            camera.left = window.innerWidth / - 2;
            camera.right = window.innerWidth / 2;
            camera.top = window.innerHeight / 2;
            camera.bottom = window.innerHeight / - 2;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.render(scene, camera);
        }
    }
}