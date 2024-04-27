// HEADER

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    let lastScrollTop = 0; // Keep track of the last scroll position

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > 35) {
            // Scroll Down
            header.classList.add('hidden');
        } else if (currentScroll < lastScrollTop && currentScroll < 35) {
            // Scroll Up
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
});

// HERO LOADER

// document.getElementById('3d').addEventListener('load', loadedSpline)
setTimeout(() => { // TODO -> Replace this setTimeout with the actual 3D loading detection above
    loadedSpline()
}, 3000)

function loadedSpline() {

    const loaderText = document.getElementById('loader-state');
    const targetText = "Ready!";
    let currentIndex = loaderText.innerText.length;
    let removing = true; // Start by removing characters

    function updateText() {

        document.getElementById('loader-gif').style.animation = 'hide 0.8s ease-in forwards';
        document.querySelector('.loader').style.paddingLeft = '1.1rem';
        loaderText.style.marginLeft = '-2rem';

        if (removing) {
            currentIndex--;
            loaderText.innerText = loaderText.innerText.slice(0, currentIndex);
            setTimeout(updateText, 100); // Faster character removal speed
            if (currentIndex <= 0) {
                removing = false; // Switch to adding characters once all are removed
            }
        } else {
            loaderText.innerText = targetText.slice(0, currentIndex);
            currentIndex++;
            setTimeout(updateText, 200); // Slower character addition speed
            if (currentIndex > targetText.length) { //Extra actions when finished text animation
                return;
            }
        }
    }

    updateText();
}

// FOOTER

const mapIcon = document.getElementById('map-icon');
const maxPulseDistance = mapIcon.width * 2.2;

document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {

    const rect = mapIcon.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const distanceToCenter = Math.sqrt((mouseX - (rect.width / 2)) ** 2 + (mouseY - (rect.height / 2)) ** 2);

    if (distanceToCenter < maxPulseDistance) {
        mapIcon.style.animationIterationCount = 'infinite';
        if (!mapIcon.classList.contains('map-icon-animation')) {
            mapIcon.classList.add('map-icon-animation');
        }
    } else {
        mapIcon.style.animationIterationCount = '1';
        mapIcon.addEventListener('animationend', function handler() {
            mapIcon.classList.remove('map-icon-animation');

            // Remove the event listener to clean up
            mapIcon.removeEventListener('animationend', handler);
        });
    }
}