// SPEECH BUBBLES BEHAVIOUR

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('show')) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target)
        }
    });
}, { rootMargin: '-50%' });

const hiddenMessages = document.querySelectorAll('.bubble');
hiddenMessages.forEach((el) => observer.observe(el));

// STICKY BEHAVIOUR

const charactersContainer = document.getElementById('characters');
// const conversationBackground = document.getElementById('conversation-background');
const speechBubblesContainer = document.getElementById('speech-bubbles');

var altura = speechBubblesContainer.clientHeight + charactersContainer.clientHeight;
charactersContainer.style.height = altura + "px";
// conversationBackground.style.height = altura + "px";