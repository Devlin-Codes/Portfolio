// VARIABLES:

const intro = document.querySelector('#intro');
const nav = document.querySelector('#nav');
const triggers = document.querySelectorAll('.nav-dropdown');
const dropdownBackground = document.querySelector('.dropdown-background');
const navDropdown = document.querySelectorAll('.nav-dropdown');
const projectsButton = document.querySelector('#nav-projects');

let topOfNav;

// FUNCTIONS

function prevent(e) {
    e.preventDefault();
}

// NAV FUNCTIONS:

function findNav() {
    topOfNav = nav.offsetTop;
};

function fixNav() {
    if (window.scrollY >= topOfNav) {
        //document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
        projectsButton.firstChild.nextElementSibling.textContent = 'About Me';
    } else {
        nav.style.bottom = window.scrollY + 'px';
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
        projectsButton.firstChild.nextElementSibling.textContent = 'Projects';
    };
};

function handleEnter(e) {
    e.preventDefault();
    console.log(this)
    this.classList.add('trigger-enter');
    setTimeout(() => {
        if (this.classList.contains('trigger-enter')) {
            this.classList.add('trigger-enter-active');
        };
    }, 150);
    dropdownBackground.classList.add('open');
    
    const dropdown = this.querySelector('.dropdown');
    console.log(dropdown)
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();
    console.log(dropdownCoords)
    
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left,
    };
    console.log(dropdownBackground)
    console.log(coords)
    dropdownBackground.style.setProperty('width', `${coords.width}px`);
    dropdownBackground.style.setProperty('height', `${coords.height}px`);
    dropdownBackground.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
};

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    dropdownBackground.classList.remove('open');
};

function scroll(e) {
    e.preventDefault();
    if (window.scrollY < topOfNav) {
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
projectsButton.addEventListener('click', scroll);

// TEMPORARY:

block = document.querySelectorAll('.block');

block.forEach(navButton => navButton.addEventListener('click', prevent));