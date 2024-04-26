// LOGO 

document.getElementById('logo').addEventListener('click', function () {
    this.style.animation = 'none';
    if (!this.children[0].classList.contains('rotating')) {
        this.children[0].classList.add('rotating');
    }
    setTimeout(() => { this.style.animation = 'rotate360 0.8s cubic-bezier(.62,.31,.39,.98) forwards' }, 0);
    setTimeout(() => { this.children[0].classList.remove('rotating') }, 400);

});

// HERO



//FOOTER

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