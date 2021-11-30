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

// open / close nav menu 
const headerMenuIcon = document.querySelector('.menu-btn svg');
const headerMenuDropDown = document.querySelector('.nav-dropdown-menu');
headerMenuIcon.menu = headerMenuDropDown;
headerMenuIcon.addEventListener('click', toggleOpenClose);

// open / close edit menu 
const headerEditIcon = document.querySelector('.pencil-btn svg');
const headerEditDropDown = document.querySelector('.edit-dropdown-menu');
headerEditIcon.menu = headerEditDropDown;
headerEditIcon.addEventListener('click', toggleOpenClose);

// my lists & menu-nav lists
const listsContainer = document.querySelector('[data-lists]');
const listsContainer2 = document.querySelector('[data-lists-dropdown]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListForm2 = document.querySelector('[data-new-list-form-2]');
const newListInput = document.querySelector('[data-new-list-input]');
const newListInput2 = document.querySelector('[data-new-list-input-2]');
const LOCAL_STORAGE_LIST_KEY = 'task.list';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
const LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY = 'task.selectedCategoryId';
const deletListBtns = document.querySelectorAll('[data-delete-list-button]');

//categories
const categoriesContainer = document.querySelector('[data-categories-container]');
const categoryTemplate = document.getElementById('category-template');
const newItemFormTemplate = document.getElementById('new-item-form-template');
const createNewCategoryBtns = document.querySelectorAll('[data-create-new-category-btn]');
const newCategoryFormPopup = document.querySelector('[data-new-category-form-popup]');
const newCategoryForm = document.querySelector('[data-new-category-form]');
const newCategoryInput = document.querySelector('[data-new-category-input]');
const closeCategoryForm = document.querySelector('[data-close-category-form]');
const deleteCategoryBtns = document.querySelectorAll('[data-delete-category-btn]');

//items
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const taskTemplate = document.getElementById('task-template');
const clearCompletedTasksBtns = document.querySelectorAll('[data-clear-completed-tasks-btn]');


let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY);

// getting the selectedListId from target li
listsContainer.addEventListener('click', e => {           
        if(e.target.tagName.toLowerCase() === 'li') {
            selectedListId = e.target.dataset.listId;
            saveAndRenderAll();
        }
});

listsContainer2.addEventListener('click', e => {           
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRenderAll();
        e.currentTarget.parentElement.parentElement.style.display = 'none';
    }
});

// select category or items in the category
categoriesContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input' && e.target.type.toLowerCase() === 'radio'){
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedCategory = selectedList.categories.find(category => category.id === e.target.id);
        selectedCategory.selected = true;
        selectedCategory.content = 'show';
        selectedList.categories.forEach(
            category => {
                if (category !== selectedCategory) {
                    category.selected = false;
                }
            }
        )
        selectedCategoryId = selectedCategory.id 
        saveAndRenderselectedList();                                           
    }
});

categoriesContainer.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.classList.contains('new-task-form')) {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedCategory = selectedList.categories.find(category => category.id === selectedCategoryId);
        const selectedCategoryWrapper = document.querySelector('.selected-category');
        const selectedCategoryTaskContainer = selectedCategoryWrapper.querySelector('ul.items');        
        const newTaskInput = selectedCategoryWrapper.querySelector('[data-new-task-input]');
        
        const taskName = newTaskInput.value;
        if (taskName == null || taskName == '') return;
        const categoryName = selectedCategoryTaskContainer.id;
        const task = createTask(taskName,categoryName);
        newTaskInput.value = null;
        selectedCategory.tasks.push(task);
        //saveAndRenderselectedList();
        const tasksContainer = document.querySelectorAll('.category .items');
        renderTaskCount(selectedList);
        tasksContainer.forEach(taskContainer=> clearElement(taskContainer));
        renderTasks(selectedList); 
    }
}); 

//(the 'input' below is the checkbox ) find selected task
categoriesContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input' && e.target.type.toLowerCase() === 'checkbox') {
        const selectedList = lists.find(list => list.id === selectedListId);
        const categoryArr = selectedList.categories;
        for(let i=0; i<categoryArr.length; i++){
            const taskArr = categoryArr[i].tasks;
            for(let j=0; j<taskArr.length; j++){
                if (taskArr[j].id === e.target.id){
                    const selectedTask = taskArr[j];
                    selectedTask.complete = e.target.checked;
                    save();  
                    renderTaskCount(selectedList);       
                }                    
            }
        }
    }
});

// Show / hide category content
categoriesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('menu-category')) {
        const categoryWrapper = e.target.parentElement.parentElement;      
        const currentRadioBtnId = categoryWrapper.firstElementChild.firstElementChild.id;
        const selectedList = lists.find(list=> list.id === selectedListId);
        selectedList.categories.forEach(category=> {
            if (category.id === currentRadioBtnId) {
                category.content = (category.content === 'show') ? 'hide' : 'show';
                //console.log(category.content);  
                if (category.content === 'hide') {
                    category.selected = false;
                    //console.log(category.selected);
                    // reasign selectedCategoryId 
                    if (selectedCategoryId === currentRadioBtnId) {
                        selectedCategoryId = 'null'; 
                        //console.log(selectedCategoryId);
                    }
                } else if (category.content === 'show' && selectedCategoryId === 'null') {
                    category.selected = true;
                    selectedCategoryId = currentRadioBtnId;
                    //console.log(category.selected);
                }                                                                            
            } 
        });
        saveAndRenderselectedList();
    } 
    else if (e.target.parentNode.classList.contains('menu-category')) {
        const categoryWrapper = e.target.parentElement.parentElement.parentElement;  
        const currentRadioBtnId = categoryWrapper.firstElementChild.firstElementChild.id;
        const selectedList = lists.find(list=> list.id === selectedListId);
        selectedList.categories.forEach(category=> {           
            if (category.id === currentRadioBtnId) {
                category.content = (category.content === 'show') ? 'hide' : 'show';
                //console.log(category.content);  
                if (category.content === 'hide') {
                    category.selected = false;
                    //console.log(category.selected);
                    // reasign selectedCategoryId 
                    if (selectedCategoryId === currentRadioBtnId) {
                        selectedCategoryId = 'null'; 
                        //console.log(selectedCategoryId);
                    }
                } else if (category.content === 'show' && selectedCategoryId === 'null') {
                    category.selected = true;
                    selectedCategoryId = currentRadioBtnId;
                    //console.log(category.selected);
                }                                                                            
            } 
        });   
        saveAndRenderselectedList();
    }
})

//clear completed tasks
clearCompletedTasksBtns.forEach(btn => {
    btn.addEventListener('click', clearCompleted);
    btn.addEventListener('click', hideParent);
});

function clearCompleted() {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.categories.forEach(category => {
        category.tasks = category.tasks.filter(task => !task.complete);              
    })
    saveAndRenderAll();
}
//delete list
deletListBtns.forEach( btn => {
    btn.addEventListener('click', deleteList);
    btn.addEventListener('click', hideParent);
});

function deleteList() {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = "null";
    saveAndRenderAll();
}


function hideParent(e) {
    e.currentTarget.parentElement.parentElement.style.display = 'none';
}

// display create category form
createNewCategoryBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        newCategoryFormPopup.style.display = 'grid';
    });
    btn.addEventListener('click', hideParent);
});

//close create category form
closeCategoryForm.addEventListener('click', ()=> {
newCategoryFormPopup.style.display = 'none';
});

//delete category
deleteCategoryBtns.forEach(btn=> {
    btn.addEventListener('click', () => {
        const selectedList = lists.find(list=> list.id === selectedListId);
        selectedList.categories = selectedList.categories.filter(category=> !category.selected);
        selectedCategoryId = 'null'; 
        saveAndRenderselectedList();
    });
    btn.addEventListener('click', hideParent);
});


// add new list object to lists array 
//then save to localStorage and render UI
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName == '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    selectedCategoryId = 'null';
    saveAndRenderAll();
});    

newListForm2.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput2.value;
    if (listName == null || listName == '') return;
    const list = createList(listName);
    newListInput2.value = null;
    lists.push(list);
    selectedCategoryId= 'null';
    saveAndRenderAll();
});  

// add new category to list
newCategoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const categoryName = newCategoryInput.value;
    if (categoryName == null || categoryName == '') return;        
    const category = createCategory(categoryName);
    newCategoryInput.value = null;
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedCategoryId = category.id
    selectedList.categories.push(category);   
    selectedList.categories.forEach(category => {
        if (category.id !== selectedCategoryId) {
            category.selected = false;
        }
    })
    saveAndRenderselectedList();
    newCategoryFormPopup.style.display = 'none';
})

// create list object
function createList(listName) {
    return {id: Date.now().toString(), name: listName, categories: []}; 
}

function createCategory(categoryName) {
    return {id: Date.now().toString(), name: categoryName, tasks: [], selected: true, content: 'show'};//tasks are items
}

function createTask(taskName, categoryName) {
    return {id: Date.now().toString(), name: taskName, category: categoryName, complete: false};
}

function saveAndRenderAll() {
    save();
    renderAll();
}

function saveAndRenderselectedList(){
    save();
    renderSelectedList();
}

//saving the stringify current lists array and 
//selectedListId got from li to localStorage object
function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
    localStorage.setItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY, selectedCategoryId);
}

// render all DOM elements
function renderAll() {    
    clearElement(listsContainer);  
    clearElement(listsContainer2); 
    renderList();

    renderSelectedList();
}

function renderSelectedList() {
    const selectedList = lists.find(list => list.id === selectedListId);
    if(selectedListId == 'null') {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedList.name; 
        clearElement(categoriesContainer);
        renderCategories(selectedList);      
        const tasksContainer = document.querySelectorAll('.category .items');
        renderTaskCount(selectedList);
        tasksContainer.forEach(taskContainer=> clearElement(taskContainer));
        renderTasks(selectedList); 
    }      
}

function renderCategories(selectedList) {
    selectedList.categories.forEach(category => {
        const categoryElement = document.importNode(categoryTemplate.content, true);
        const radioBtn = categoryElement.querySelector('input[type="radio"]');
        const categoryLabel = categoryElement.querySelector('label');
        const tasksContainer = categoryElement.querySelector('ul.items');
        const categoryMenuIcon = categoryElement.querySelector('.menu-category');
        tasksContainer.classList.add(category.content);
        //console.log(tasksContainer.classList);
        radioBtn.setAttribute('name', 'category');
        radioBtn.id = category.id;
        radioBtn.checked = category.selected;
        categoryLabel.htmlFor = category.id;
        tasksContainer.id = category.name;
        categoryLabel.append(category.name);
        categoryMenuIcon.id = category.name.concat('-menu');
        categoriesContainer.appendChild(categoryElement); 
    })  

    //render hide / show taskContainer 
    const tasksContainers = document.querySelectorAll('ul.items');
    //console.log(tasksContainers);
    tasksContainers.forEach(tasksContainer => {
        //console.log(tasksContainer.classList);
        if (tasksContainer.classList.contains('hide')) {
            tasksContainer.style.display = 'none';
        } 
    });

    //styling selected category wrapper
    if (selectedCategoryId !== 'null') {
        const categoryTitleRadioBtns = document.querySelectorAll('input[type="radio"]');
        categoryTitleRadioBtns.forEach(categoryTitleRadioBtn=> { 
            if(categoryTitleRadioBtn.id === selectedCategoryId) {
                categoryTitleRadioBtn.parentElement.parentElement.classList.add('selected-category');
            }
        }) 
        
        // render newItemForm within selectedCategory
        const selectedCategoryWrapper = document.querySelector('.selected-category');
        const newItemFormElement = document.importNode(newItemFormTemplate.content, true);
        selectedCategoryWrapper.appendChild(newItemFormElement);            
    }  
} 
// create DOM element for each task objects in the selectedList 
// and append elements to tasksContainer
//if I coould add a class for each li.item that match the id of the ul.items it belong
//I can append them to the 
function renderTasks(selectedList) {
    const categoriesArr = selectedList.categories;
    for (let i=0; i<categoriesArr.length; i++) {
        const tasksArr = categoriesArr[i].tasks;
        tasksArr.forEach(task => {
            const taskElement = document.importNode(taskTemplate.content, true);
            const checkbox = taskElement.querySelector('input');
            checkbox.id = task.id;
            checkbox.checked = task.complete;
            const label = taskElement.querySelector('label');
            label.htmlFor = task.id;
            label.append(task.name); 
            const tasksContainers = document.querySelectorAll('.category ul.items');
            for (let j= 0; j<tasksContainers.length; j++) {
                if (task.category === tasksContainers[j].id) {
                    tasksContainers[j].appendChild(taskElement);
                }
            }
        })
    }
}

// create a new array from all the tasks array, then filter out the ones that are imcompleted
//then calculate its length. The number will be the imcomplete task count.
function renderTaskCount(selectedList) {
    const categoriesArr = selectedList.categories;
        let totalTasks = [];
        for (let i = 0; i<categoriesArr.length; i++){
                totalTasks = totalTasks.concat(categoriesArr[i].tasks);
        }
        const incompleteTaskCount = totalTasks.filter(task => !task.complete).length;
        const taskString = incompleteTaskCount === 1 || incompleteTaskCount === 0 ? 'item' : 'items';
        listCountElement.innerHTML =`<span>${incompleteTaskCount}</span>  ${taskString} left`;             

}
// create DOM element for each list objects in the lists array
// and append elements to listsContainer
function renderList() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        const listElement2 = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement2.dataset.listId = list.id;
        listElement.classList.add('desktop-menu-list');
        listElement2.classList.add('menu-nav-list');
        listElement.innerText = list.name;
        listElement2.innerText = list.name;
        if (list.id === selectedListId) {
            listElement.classList.add('desktop-active-list');
            listElement2.classList.add('active-list');
        };
            listsContainer.appendChild(listElement);
            listsContainer2.appendChild(listElement2);
            
        });
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

renderAll()

