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
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
const deletListBtn = document.querySelector('[data-delete-list-button]');
/*items*/
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const clearCompletedTasksBtn = document.querySelector('[data-clear-completed-tasks-btn]');

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedTask = selectedList.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
        renderTaskCount(selectedList);
    }
})

clearCompletedTasksBtn.addEventListener('click', e => {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete);
    saveAndRender();
    
})

deletListBtn.addEventListener('click', e=> {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = "null";
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

newTaskForm.addEventListener('submit', e => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    if (taskName == null || taskName == '') return;
    const task = createTask(taskName);
    newTaskInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.tasks.push(task);
    saveAndRender();
});   

function createList(name) {
    return {id: Date.now().toString(), name: name, tasks: []}; //tasks are items
}

function createTask(name) {
    return {id: Date.now().toString(), name: name, complete: false}
}

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function render() {
    clearElement(listsContainer);
    renderList();

    const selectedList = lists.find(list => list.id === selectedListId);
    if(selectedListId == 'null') {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name;
        renderTaskCount(selectedList);
        clearElement(tasksContainer);
        renderTasks(selectedList);
    }
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    })
}

function renderTaskCount(selectedList) {
    const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTaskCount === 1 || incompleteTaskCount === 0 ? 'item' : 'items';
    listCountElement.innerHTML =`<span>${incompleteTaskCount}</span>  ${taskString} left`;
}

function renderList() {
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
        element.removeChild(element.firstChild);
    }
}

render()
