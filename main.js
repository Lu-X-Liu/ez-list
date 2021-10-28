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
const headerMenuIcon = document.querySelector('.menu-btn svg');
const headerMenuDropDown = document.querySelector('.nav-dropdown-menu');
headerMenuIcon.menu = headerMenuDropDown;
headerMenuIcon.addEventListener('click', toggleOpenClose);

/* open / close edit menu */
const headerEditIcon = document.querySelector('.pencil-btn svg');
const headerEditDropDown = document.querySelector('.edit-dropdown-menu');
headerEditIcon.menu = headerEditDropDown;
headerEditIcon.addEventListener('click', toggleOpenClose);

/* my lists */
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const LOCAL_STORAGE_LIST_KEY = 'task.list';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedLisId';
const deletListBtn = document.querySelector('[data-delete-list-button]');

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

deletListBtn.addEventListener('click', e=> {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
})

newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName == '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    saveAndRender();
});     

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: []};
}

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render(){
    clearElement (listsContainer);
    lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('desktop-menu-list');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
        listElement.classList.add('desktop-active-list')
    };
    listsContainer.appendChild(listElement);
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render();