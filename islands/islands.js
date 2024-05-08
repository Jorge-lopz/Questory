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

const hiddenMessages = document.querySelectorAll('.bubble');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('show')) {
            entry.target.classList.add('show');
        }
    });
}, { rootMargin: '-45%' });

hiddenMessages.forEach((el) => observer.observe(el));



// Obtener el contenedor de origen y destino
const contenedorOrigen = document.getElementById('characters');
const contenedorDestino = document.getElementById('speech-bubbles');

contenedorDestino.style.backgroundColor = '#FFFFFF';


