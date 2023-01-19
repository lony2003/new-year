import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import ThreeScene from "./threeScene";
import '../css/main.scss'
import '../css/iconfont/iconfont.css'
import THREE = require('three');

gsap.registerPlugin(CustomEase);
CustomEase.create("anim-sfs", "M0,0 C0.598,0 0.4,1 1,1 ");

const scene = new ThreeScene();

global.scene = scene;
global.updateScene = 1;

(function() {

    function startStep1(): void {
        const timeline = gsap.timeline();
        timeline.add(gsap.fromTo(document.querySelector("#cat-container"), {
            opacity: 1,
        }, {
            duration: 0.5,
            opacity: 0,
            ease: "power1.out"
        }))

        timeline.add(gsap.to([document.querySelector(".loading-bg-front-left"), document.querySelector(".loading-bg-front-right")], {
            duration: 0.5,
            translateX: function (index: number): string {
                    return index == 0 ? "-50%" : "50%";
            },
            opacity: 0,
            ease: "anim-sfs"
        }))

        timeline.to(document.querySelector(".loading-bg-back"), {
            duration: 0.5,
            translateY: "100%",
            opacity: 0,
            ease: "anim-sfs"
        }, "<")

        timeline.to(document.querySelector(".loading"), {
            duration: 0.5,
            opacity: 0,
            ease: "anim-sfs"
        }, "<")

        timeline.add(gsap.to(document.querySelector(".loading"), {
            duration: 0,
            display: "none",
        }))

        timeline.to(document.querySelector(".step-1"), {
            duration: 0.5,
            opacity: 1,
            ease: "power1.out"
        });
    }

    function fromStep1To2(): void {
        const timeline = gsap.timeline();
        timeline.add(gsap.to(document.querySelector(".step-1"),{
            duration: 0.5,
            opacity: 0,
            ease: "power1.out"
        }))

        timeline.add(gsap.to(document.querySelector(".step-1"), {
            duration: 0,
            display: "none",
        }))

        timeline.add(gsap.to(scene.camera.position, {
            x: -875.72,
            y: 455.67,
            z: 333.68,
            duration: 0.5,
            ease: "anim-sfs"
        }))

        timeline.add(gsap.to(scene.camera, {
            zoom: 0.8,
            duration: 0.5,
            ease: "anim-sfs"
        }), '<')

        timeline.add(gsap.to(document.querySelector(".step-img-return-container"), {
            duration: 0,
            opacity: 0,
            display: "block",
        }))

        timeline.add(gsap.to(document.querySelector(".step-2"), {
            duration: 0,
            display: "flex",
        }))

        timeline.to([document.querySelector(".step-2"), document.querySelector(".step-img-return-container")], {
            duration: 0.5,
            opacity: 1,
            ease: "power1.out"
        });
    }

    function fromStep2To3(): void {
        const timeline = gsap.timeline();

        timeline.add(gsap.to(document.querySelector(".step-3"), {
            duration: 0,
            display: "flex",
        }))

        timeline.add(gsap.to(document.querySelector(".step-img-return-container"), {
            duration: 0.5,
            opacity: 0,
        }))

        timeline.add(gsap.to([document.querySelector(".step-2"), document.querySelector(".step-3")],{
            duration: 0.8,
            right: 0,
            opacity: function(index: number): number {
                return index == 0 ? 0 : 1;
            },
            ease: "anim-sfs"
        }))

        timeline.add(gsap.to(scene.camera.position, {
            x: -233.23,
            y: 473.58,
            z: 949.23,
            duration: 0.8,
            ease: "anim-sfs"
        }), '<')

        timeline.add(gsap.to(document.querySelector(".step-img-cleaning-container"), {
            duration: 0,
            display: 'block',
            opacity: 0
        }))

        timeline.add(gsap.to(document.querySelector(".step-img-cleaning-container"), {
            duration: 0.5,
            opacity: 1
        }))

        timeline.add(gsap.to([document.querySelector(".step-2"), document.querySelector(".step-img-return-container")], {
            duration: 0,
            display: "none"
        }))
    }
    
    function fromStep3To4(): void {
        const timeline = gsap.timeline();

        timeline.add(gsap.to([document.querySelector(".step-3"), document.querySelector(".step-img-cleaning-container")], {
            duration: 0.3,
            opacity: 0
        }))

        timeline.add(gsap.to(scene.camera.position, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: "anim-sfs"
        }))

        timeline.add(gsap.to(scene.camera, {
            zoom: 3,
            duration: 0.8,
            ease: "anim-sfs"
        }), '<')

        timeline.add(gsap.to(global, {
            updateScene: 0,
            duration: 0,
        }))

        timeline.add(gsap.to(document.querySelector(".step-4"), {
            duration: 0,
            display: 'flex'
        }))

        timeline.add(gsap.to(document.querySelector(".step-4"), {
            duration: 0.6,
            opacity: 1
        }))

        timeline.add(gsap.to(document.querySelector(".step-4"), {
            delay: 0.7,
            duration: 0.6,
            opacity: 0
        }))

        timeline.add(gsap.to(document.querySelector(".step-img-dinner-container"), {
            duration: 0,
            display: 'block',
            opacity: 0
        }))

        timeline.add(gsap.to(document.querySelector(".step-img-dinner-container"), {
            duration: 0.6,
            opacity: 1
        }))
    }
    
    function openInformation(): void {
        const timeline = gsap.timeline();

        timeline.add(gsap.to(document.querySelector(".information-container"), {
            display: 'block',
            opacity: 0,
            duration: 0
        }))

        timeline.add(gsap.to(document.querySelector(".information-container"), {
            duration: 0.2,
            opacity: 1
        }))

        timeline.add(gsap.from(document.querySelector(".information"), {
            duration: 0.3,
            opacity: 0
        }))
        
    }
    
    function closeInformation(): void {
        const timeline = gsap.timeline();

        timeline.add(gsap.to(document.querySelector(".information-container"), {
            opacity: 0,
            duration: 0.2
        }))

        timeline.add(gsap.to(document.querySelector(".information-container"), {
            duration: 0,
            display: 'none'
        }))
    }

    function animate() {
        if (global.updateScene == 1) {
            scene.camera.updateProjectionMatrix();
            scene.renderer.render(scene.scene, scene.camera);
        }
        // controls.update();
        requestAnimationFrame(animate);
    }
    animate();

    global.startStep1 = startStep1;
    global.fromStep1To2 = fromStep1To2;
    global.fromStep2To3 = fromStep2To3;
    global.fromStep3To4 = fromStep3To4;
    global.openInformation = openInformation;
    global.closeInformation = closeInformation;
    
}())
