// VARIABLES:

const intro = document.querySelector('#intro');
const myName = document.querySelector('#my-name');
const nav = document.querySelector('#nav');
const triggers = document.querySelectorAll('.nav-dropdown');
const dropdownBackground = document.querySelector('.dropdown-background');
const navDropdown = document.querySelectorAll('.nav-dropdown');
const projectsButton = document.querySelector('#nav-projects');
const projects = document.querySelector('#projects');

let topOfNav;

// FUNCTIONS

function prevent(e) {
    e.preventDefault();
}

// NAV FUNCTIONS:

function findNav() {
    intro.style.height = window.innerHeight - nav.offsetHeight + 'px';
    projects.style.height = window.innerHeight - nav.offsetHeight + 'px';
    const projectList = document.querySelectorAll('.project');
    projectList.forEach(project => project.style.setProperty('height', '100%'));
    projectList.forEach(project => project.style.setProperty('width', '100%'));
    console.log(intro.style.height)
};

function fixNav() {
    //topOfNav = nav.offsetTop;
    if (window.scrollY >= window.innerHeight / 2) {
        //document.body.style.paddingTop = nav.offsetHeight + 'px';
        //document.body.classList.add('fixed-nav');
        projectsButton.firstChild.nextElementSibling.textContent = 'About Me';
    } else {
        //nav.style.bottom = window.scrollY + 'px';
        //document.body.style.paddingTop = 0;
        //document.body.classList.remove('fixed-nav');
        projectsButton.firstChild.nextElementSibling.textContent = 'Projects';
    };
};

function handleEnter(e) {
    e.preventDefault();
    this.classList.add('trigger-enter');
    setTimeout(() => {
        if (this.classList.contains('trigger-enter')) {
            this.classList.add('trigger-enter-active');
        };
    }, 150);
    dropdownBackground.classList.add('open');
    
    const dropdown = this.querySelector('.dropdown');
    const arrow = document.querySelector('#dropdown-arrow');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();
    
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left,
    };

    dropdownBackground.style.setProperty('width', `${coords.width}px`);
    dropdownBackground.style.setProperty('height', `${coords.height}px`);

    if (window.scrollY > window.innerHeight / 4) { // If window is scrolled down
        dropdownBackground.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
        dropdown.style.transform = 'translateY(165%)';
        arrow.style.transform = 'translateY(-50%) rotate(45deg)';
        arrow.style.borderTop = '1px solid white';
        arrow.style.borderRight = '0px solid white';
        arrow.style.borderBottom = '0px solid white';
        arrow.style.borderLeft = '1px solid white';
    } else { // If window is scrolled to top
        dropdownBackground.style.setProperty('transform', `translate(${coords.left}px, -${coords.top}px)`);
        dropdown.style.transform = 'translateY(-125%)';
        arrow.style.transform = 'translateY(250%) rotate(45deg)';
        arrow.style.borderTop = '0px solid white';
        arrow.style.borderRight = '1px solid white';
        arrow.style.borderBottom = '1px solid white';
        arrow.style.borderLeft = '0px solid white';
    };
};

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    dropdownBackground.classList.remove('open');
};

function scroll(e) {
    e.preventDefault();
    if (window.scrollY < window.innerHeight / 2) {
        document.documentElement.scrollTop = topOfNav;
    } else {
        document.documentElement.scrollTop = 0;
    };
};

// CAROUSEL:

const track = document.querySelector('#carousel-track');
const slides = Array.from(track.children);
const leftArrow = document.querySelector('#left-arrow'); // prevButton
const rightArrow = document.querySelector('#right-arrow'); // nextButton
const bubblesContainer = document.querySelector('#bubbles-container'); // dotsNav
const bubbles = Array.from(bubblesContainer.children); // dots

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to each other
const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateBubbles = (currentBubble, targetBubble) => {
    currentBubble.classList.remove('current-slide');
    targetBubble.classList.add('current-slide');
};

const hideShowArrows = (slides, leftArrow, rightArrow, targetIndex) => {
    if (targetIndex === 0) {
        leftArrow.classList.add('is-hidden');
        rightArrow.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        leftArrow.classList.remove('is-hidden');
        rightArrow.classList.add('is-hidden');
    } else {
        leftArrow.classList.remove('is-hidden');
        rightArrow.classList.remove('is-hidden');
    };
};

const updateLinks = (slideIndex) => {
    const projectSource = document.querySelector('#project-source');
    const projectTitle = document.querySelector('#project-title');
    const projectDemo = document.querySelector('#project-demo');
    switch (true) {
        case (slideIndex === 0):
            projectSource.href = "https://github.com/Devlin-Codes/Sketch-Paint";
            projectDemo.href = "https://devlin-codes.github.io/Sketch-Paint/";
            projectTitle.textContent = "Sketch Paint";
            break;
        case (slideIndex === 1):
            projectSource.href = "https://github.com/Devlin-Codes/Calculator";
            projectDemo.href = "https://devlin-codes.github.io/Calculator/";
            projectTitle.textContent = "Calculator";
            break;
        case (slideIndex === 2):
            projectSource.href = "https://github.com/Devlin-Codes/Rock-Paper-Scissors";
            projectDemo.href = "https://devlin-codes.github.io/Rock-Paper-Scissors/";
            projectTitle.textContent = "Rock Paper Scissors";
            break;
        case (slideIndex === 3):
            projectSource.href = "https://github.com/Devlin-Codes/Google-Homepage";
            projectDemo.href = "https://devlin-codes.github.io/Google-Homepage/";
            projectTitle.textContent = "Google Recreation";
            break;
        case (slideIndex === 4):
            projectSource.href = "https://github.com/Devlin-Codes/Tribute-Page-Project";
            projectDemo.href = "https://devlin-codes.github.io/Tribute-Page-Project/";
            projectTitle.textContent = "Tribute Replica";
    };
};

// When I click left, move slides to the left

leftArrow.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentBubble = bubblesContainer.querySelector('.current-slide');
    const prevBubble = currentBubble.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateBubbles(currentBubble, prevBubble);
    hideShowArrows(slides, leftArrow, rightArrow, prevIndex);
    updateLinks(prevIndex);
});

// When I click right, move slides to the right

rightArrow.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentBubble = bubblesContainer.querySelector('.current-slide');
    const nextBubble = currentBubble.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateBubbles(currentBubble, nextBubble);
    hideShowArrows(slides, leftArrow, rightArrow, nextIndex);
    updateLinks(nextIndex);
});

// When I click a carousel bubble, move to that slide

bubblesContainer.addEventListener('click', e => {
    const targetBubble = e.target.closest('button');

    if (!targetBubble) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentBubble = bubblesContainer.querySelector('.current-slide');
    const targetIndex = bubbles.findIndex(bubble => bubble === targetBubble);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateBubbles(currentBubble, targetBubble);
    hideShowArrows(slides, leftArrow, rightArrow, targetIndex);
    updateLinks(targetIndex);
});

function autoplay() {
    //autoplayToggle = 1;
    while (autoplayToggle) {
        setTimeout(() => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            if (!nextSlide) {
                const targetSlide = slides[0];
                moveToSlide(track, currentSlide, targetSlide);
            } else {
                moveToSlide(track, currentSlide, nextSlide);
            };
        }, 3000);
    };
};
    
// EVENTS:
document.addEventListener('DOMContentLoaded', autoplay);

document.addEventListener('DOMContentLoaded', findNav);
window.addEventListener('scroll', fixNav);
//myName.addEventListener('click', aboutMe);
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
projectsButton.addEventListener('click', scroll);

// TEMPORARY:

let shit;

function aboutMe() {
    intro.classList.toggle('about-active');
}

block = document.querySelectorAll('.block');

block.forEach(navButton => navButton.addEventListener('click', prevent));

// ADD RESIZE EVENT FOR OTHER FUNCTION RESIZING
// CHECK ON AUTOPLAY FUNCTION

// WHEN WINDOW CHANGES SIZE RELOAD DOM CONTENT

window.addEventListener('resize', findNav);