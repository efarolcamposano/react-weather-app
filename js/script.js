

const arrow = document.querySelector('.arrow-icon');
const sidePanel = document.querySelector('.side-panel');
const search = document.querySelector('input');
const searchBox = document.querySelector('.search-box');
const searchForm = document.querySelector('.search-form');

function addClass() {
    if ( window.screen.width <= 940 && window.screen.width >= 768) {
        sidePanel.classList.add("close-panel");
    } else {
        sidePanel.classList.remove("close-panel");
    }
}

arrow.addEventListener('click', () => {
    sidePanel.classList.toggle("close-panel");
});

searchForm.addEventListener('submit', () => {
    searchBox.classList.remove("open");
});

searchBox.addEventListener('click', (e) => {
    searchBox.classList.add("open");
    search.focus();
})

window.addEventListener('click', e => {
    if(searchBox.contains(e.target)) {
        searchBox.classList.add("open");
    } else {
        searchBox.classList.remove("open");
    }
});

window.addEventListener('resize', addClass);
addClass();

