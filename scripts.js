const nav = document.querySelector('#nav');
const intro = document.querySelector('#intro');

let topOfNav;
function findNav() {
    topOfNav = nav.offsetTop;
    console.log(topOfNav);
};

function fixNav() {
    console.log(topOfNav, window.scrollY)
    if (window.scrollY >= topOfNav) {
        //document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        nav.style.bottom = window.scrollY + 'px';
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    };
};

document.addEventListener('DOMContentLoaded', findNav);
window.addEventListener('scroll', fixNav);