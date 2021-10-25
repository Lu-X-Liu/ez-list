// open add category at the bottom for mobil 

const bottomTabIcon = document.querySelector('.edit-tab svg');
const editBtnWrapper = document.querySelector('.edit-btns-wrapper');

bottomTabIcon.addEventListener('click', toggleOpenClose, false);
bottomTabIcon.addEventListener('click', rotateBtn, false);
bottomTabIcon.menu = editBtnWrapper;

function toggleOpenClose(evt) {
    const contentDisplay = evt.currentTarget.menu.style;
    if (contentDisplay.display === 'none' || contentDisplay.display === '') {
        contentDisplay.display = 'block';
    } else {
        contentDisplay.display = 'none';
    }     
}

function rotateBtn(evt) {
    const contentDisplay = evt.currentTarget.menu.style;
    if (contentDisplay.display === 'block') {
        bottomTabIcon.style.transform = 'rotate(90deg) translateX(-5px)';
    } else {
        bottomTabIcon.style.transform = 'rotate(-90deg) translateX(5px)';
    }    
}

/* open / close nav menu */
const headerMenuIcon = document.querySelector('.nav-btn svg');
const headerMenuDropDown = document.querySelector('.nav-dropdown-menu');
headerMenuIcon.menu = headerMenuDropDown;
headerMenuIcon.addEventListener('click', toggleOpenClose);


/* add new item */
