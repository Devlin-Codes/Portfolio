// VARIABLES:

const intro = document.querySelector('#intro');
const nav = document.querySelector('#nav');
const triggers = document.querySelectorAll('.nav-dropdown');
const dropdownBackground = document.querySelector('.dropdown-background');
const projectsButton = document.querySelector('#nav-projects');

let topOfNav;

// FUNCTIONS

// NAV FUNCTIONS:

function handleEnter() {
    this.classList.add('.trigger-enter');
    setTimeout(() => {
        if (this.classList.contains('trigger-enter')) {
            this.classList.add('trigger-enter-active');
        };
    }, 150);
    dropdownBackground.classList.add('open');
    
    const dropdown = this.querySelector('.dropdown');
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
    dropdownBackground.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
};

function handleLeave() {
    this.classList.remove('.trigger-enter', '.trigger-enter-active');
    dropdownBackground.classList.remove('open');
};

function findNav() {
    topOfNav = nav.offsetTop;
    console.log(topOfNav);
};

function fixNav() {
    console.log(topOfNav, window.scrollY)
    if (window.scrollY >= topOfNav) {
        //document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
        projectsButton.textContent = 'About Me';
    } else {
        nav.style.bottom = window.scrollY + 'px';
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
        projectsButton.textContent = 'Projects';
    };
};

function scroll() {
    if (window.scrollY < topOfNav) {
        console.log(topOfNav)
        document.documentElement.scrollTop = topOfNav;
    } else {
        document.documentElement.scrollTop = 0;
    };
};

// EVENTS:

document.addEventListener('DOMContentLoaded', findNav);
window.addEventListener('scroll', fixNav);
triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
projectsButton.addEventListener('click', scroll)