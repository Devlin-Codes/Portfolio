// VARIABLES:

const intro = document.querySelector('#intro');
const nav = document.querySelector('#nav');
const triggers = document.querySelectorAll('.nav-dropdown');
const dropdownBackground = document.querySelector('.dropdown-background');
const projectsButton = document.querySelector('#nav-projects');

let topOfNav;

// FUNCTIONS

function handleEnter() {
    this.classList.add('.trigger-enter')
    setTimeout(() => this.classList.add('trigger-enter-active'), 150);
    dropdownBackground.classList.add('open');
}

function handleLeave() {
    this.classList.remove('trigger-enter');
    setTimeout(() => this.classList.remove('trigger-enter-active'), 150);
    dropdownBackground.classList.remove('open');

}








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