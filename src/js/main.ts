import gsap from 'gsap';
import { CustomEase } from 'gsap/all';
import ThreeScene from "./threeScene";
import '../css/main.scss'
import '../css/iconfont/iconfont.css'
import './iconfont'

gsap.registerPlugin(CustomEase);
CustomEase.create("anim-sfs", "M0,0 C0.598,0 0.4,1 1,1 ");

const scene = new ThreeScene('sbc');

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

        timeline.add(gsap.to(document.querySelector(".step-2"), {
            duration: 0,
            display: "flex",
        }))

        timeline.to(document.querySelector(".step-2"), {
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

        timeline.add(gsap.to([document.querySelector(".step-2"), document.querySelector(".step-3")],{
            duration: 0.8,
            right: 0,
            opacity: function(index: number): number {
                return index == 0 ? 0 : 1;
            },
            ease: "anim-sfs"
        }))

        timeline.add(gsap.to(document.querySelector(".step-2"), {
            duration: 0,
            display: "none"
        }))
    }
    
    function fromStep3To4(): void {
        const timeline = gsap.timeline();

        timeline.add(gsap.to(document.querySelector(".step-3"), {
            duration: 0.3,
            opacity: 0
        }))

        timeline.add(gsap.to(document.querySelector(".step-4"), {
            duration: 0,
            display: 'flex'
        }))

        timeline.add(gsap.to(document.querySelector(".step-4"), {
            duration: 0.3,
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
    
    function blockPosition(step: number): void {
    
    }

    global.startStep1 = startStep1;
    global.fromStep1To2 = fromStep1To2;
    global.fromStep2To3 = fromStep2To3;
    global.fromStep3To4 = fromStep3To4;
    global.openInformation = openInformation;
    global.closeInformation = closeInformation;
    global.blockPosition = blockPosition;
    
}())
