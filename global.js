// HEADER

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const hamburgerButton = document.getElementById('hamburguer-button');
    const hamburgerMenu = document.getElementById('menu');
    let lastScrollTop = 0; // Keep track of the last scroll position

    window.addEventListener('scroll', () => {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > 35) {
            // Scroll Down
            header.classList.add('hidden');
            hamburgerButton.classList.add('visible');
        } else if (currentScroll < lastScrollTop && currentScroll < 35) {
            // Scroll Up
            header.classList.remove('hidden');
            hamburgerButton.classList.remove('visible');
            hamburgerMenu.style.display = "none"
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });
});

// BURGUER MENU

var elemento = document.getElementById('hamburguer-button');
const divTransparente = document.getElementById("divtransparente");

// Agregar un event listener al elemento para el evento focus
elemento.addEventListener('click', function (event) {
    const menu = document.getElementById("menu");

    if (!menu.classList.contains("visible")) {
        menu.classList.add("visible");
        divTransparente.classList.add("visible");
    }
    else {
        menu.classList.remove("visible")
        divTransparente.classList.remove("visible");
    };

});

//Agregar un event listener al elemento para el evento blur
divTransparente.addEventListener('click', function (event) {
    menu.classList.remove("visible");
    divTransparente.classList.remove("visible");
});



// FOOTER

const mapIcon = document.getElementById('map-icon') || document.getElementById('play-icon');
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