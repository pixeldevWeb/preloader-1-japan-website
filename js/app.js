(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                lockPaddingElements.forEach((lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                }));
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }));
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    gsap.from("h2 div", 1.5, {
        yPercent: 100,
        ease: "power4.inOut",
        stagger: {
            amount: .5
        }
    });
    gsap.to("h2", 1.5, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.inOut",
        stagger: {
            amount: .5
        }
    }, 0);
    document.addEventListener("DOMContentLoaded", (function() {
        let overlay = document.querySelector(".overlay");
        overlay.addEventListener("click", (function() {
            gsap.to("h2 div", 1.5, {
                yPercent: -100,
                ease: "power4.inOut",
                stagger: {
                    amount: .5
                }
            });
            gsap.to("h2", 1.5, {
                clipPath: "polygon(0 85%, 100% 85%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
                stagger: {
                    amount: .5
                }
            }, 0);
            gsap.to(".overlay", 2, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "power4.inOut"
            });
            gsap.to(".loader__img", 2, {
                clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
                ease: "power4.inOut",
                stagger: {
                    amount: 1.5
                }
            });
            gsap.to(".loader", 2, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "power4.inOut",
                delay: 2
            });
        }));
    }));
    gsap.registerPlugin(ScrollTrigger);
    const sections = document.querySelectorAll(".block");
    sections.forEach((section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
            snap: {
                snapTo: 1,
                duration: .5,
                delay: .1,
                ease: "power1.inOut"
            }
        });
    }));
    window["FLS"] = true;
    menuInit();
})();