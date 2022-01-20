//buttons and menu icons
const bottomTabIcon = document.querySelector('.edit-tab svg');
const editBtnWrapper = document.querySelector('.edit-btns-wrapper');
const headerMenuIcon = document.querySelector('.menu-btn svg');
const headerMenuDropDown = document.querySelector('.nav-dropdown-menu');
const headerEditIcon = document.querySelector('.pencil-btn svg');
const headerEditDropDown = document.querySelector('.edit-dropdown-menu');
const navMenuContainer = document.querySelector('[data-nav-menu-container]');
bottomTabIcon.menu = editBtnWrapper;
headerMenuIcon.menu = headerMenuDropDown;
headerEditIcon.menu = headerEditDropDown;

const languageSwitch = document.querySelector('.lang');
const languageOptions = document.querySelector('.lang-options');
languageSwitch.menu = languageOptions;

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
const LOCAL_STORAGE_DELETE_OPTION_KEY = 'task.delete';

//initial & languages
const initialDisplay = document.querySelector('.initial');
const initialBtns = initialDisplay.querySelectorAll('.dash-box');

const deleteListBtns = document.querySelectorAll('[data-delete-list-button]');
const deleteConfirmationWrapper = document.querySelector('.delete-confirmation-wrapper');
const deletConfirmationMessage = document.querySelector('.confirmation-message');
const confirmDeleteName = document.querySelector('[data-confirm-name]');
const deleteBtnWithOptions = document.querySelector('[data-delete-option]');
const cancelDeleteBtn = document.querySelector('[data-cancel-delete]');

//categories
const listInitialWrapper = document.querySelector('.list-initial-wrapper');
const uncategorizedBtn = document.querySelector('.uncategorized-btn');

const categoriesContainer = document.querySelector('[data-categories-container]');
const categoryTemplate = document.getElementById('category-template');
const newItemFormTemplate = document.getElementById('new-item-form-template');
const createNewCategoryBtns = document.querySelectorAll('[data-create-new-category-btn]');
const newCategoryFormPopup = document.querySelector('[data-new-category-form-popup]');
const newCategoryForms = document.querySelectorAll('[data-new-category-form]');
const closeCategoryForm = document.querySelector('[data-close-category-form]');
const deleteCategoryBtns = document.querySelectorAll('[data-delete-category-btn]');

//items
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const mainContent = document.querySelector('.main-content-wrapper');
const listWrapper = document.querySelector('.list-wrapper');
const currentListWrapper = document.querySelector('.current-list-wrapper');
const listTitleDiv = document.querySelector('.list-title');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]');
const tasksLeft = document.querySelector('[data-tasks-left]');
const taskTemplate = document.getElementById('task-template');
const clearCompletedTasksBtns = document.querySelectorAll('[data-clear-completed-tasks-btn]');

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let selectedCategoryId = localStorage.getItem(LOCAL_STORAGE_SELECTED_CATEGORY_ID_KEY);
let deleteOption = localStorage.getItem(LOCAL_STORAGE_DELETE_OPTION_KEY);

const editBottomTabBtns = document.querySelectorAll('.edit-btn');
editBottomTabBtns.forEach(btn => btn.menu = editBtnWrapper);
const headerEditBtns = document.querySelectorAll('.menu-edit-btn');
headerEditBtns.forEach(btn => btn.menu = headerEditDropDown);

//open / close language menu
languageSwitch.addEventListener('click', toggleOpenClose);

// open add category at the bottom for mobil 
bottomTabIcon.addEventListener('click', toggleOpenClose, false);
bottomTabIcon.addEventListener('click', rotateBtn, false);

// open / close nav menu 
headerMenuIcon.addEventListener('click', ()=> {
    headerEditDropDown.style.display = 'none';
    editBtnWrapper.style.display = 'none';
})
headerMenuIcon.addEventListener('click', toggleOpenClose);

// open / close edit menu 
headerEditIcon.addEventListener('click', () => {
    headerMenuDropDown.style.display = 'none';
})
headerEditIcon.addEventListener('click', toggleOpenClose);

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

//language translations
const languages = {
    enUS : {
        language: 'Englisn',
        initialCreateNew: 'Create a new list',
        initialSelectList: 'or select an existing list',
        myLists: 'My Lists',
        left: 'left',
        listInputPlaceHolder: 'enter new list',
        uncategorized: 'Uncategorized List',
        categoryInputPlaceHolder: 'enter new category',
        create: 'Create',
        deletePrompt: 'Are you sure you want to delete ',
        cancle: 'Cancel',
        delete: 'Delete',
        deleteList: 'Delete current list',
        clearTasks: 'Clear completed tasks',
        createCategory: 'Create new category',
        deleteCategory: 'Delete current category',
        taskInputPlaceHolder: 'enter new task',
        or: 'or',
        uncategorizedName: 'uncategorized'
    },
    zhTW: {
        language: '繁體中文',
        initialCreateNew: '創建新清單',
        initialSelectList: '或選擇現有清單',
        myLists: '我的清單 :',
        left: '個剩餘',
        listInputPlaceHolder: '輸入新清單',
        uncategorized: '未分類清單',
        categoryInputPlaceHolder: '輸入新類別',
        create: '創建',
        deletePrompt: '你確定要刪除 ',
        cancle: '取消',
        delete: '刪除',
        deleteList: '刪除此清單',
        clearTasks: '清除已完成的項目',
        createCategory: '創建新類別',
        deleteCategory: '刪除當前類別',
        taskInputPlaceHolder: '輸入新項目',
        or: '或者',
        uncategorizedName: '未分類'
    },
    zhCN: {
        language: '简体中文',
        initialCreateNew: '创建新清单',
        initialSelectList: '或选择现有清单',
        myLists: '我的清单 :',
        left: '个剩余',
        listInputPlaceHolder: '输入新清单',
        uncategorized: '未分类清单',
        categoryInputPlaceHolder: '输入新类别',
        create: '创建',
        deletePrompt: '你确定要删除 ',
        cancle: '取消',
        delete: '刪除',
        deleteList: '删除此清单',
        clearTasks: '清除已完成的项目',
        createCategory: '创建新类别',
        deleteCategory: '删除当前类别',
        taskInputPlaceHolder: '输入新条目',
        or: '或者',
        uncategorizedName: '未分类'
    },
    es: {
        language: 'Español',
        initialCreateNew: 'Crear una nueva lista',
        initialSelectList: 'o seleccione una lista existente',
        myLists: 'Mis Listas :',
        left: 'quedan ',
        listInputPlaceHolder: 'ingresar nueva lista',
        uncategorized: 'Lista sin categorizar',
        categoryInputPlaceHolder: 'entrar en nueva categoría',
        create: 'Crear',
        deletePrompt: '¿Estás segura de que quieres eliminar ',
        cancle: 'Cancelar',
        delete: 'Borrar',
        deleteList: 'Eliminar lista actual',
        clearTasks: 'Borrar elementos completados',
        createCategory: 'Crear nueva categoría',
        deleteCategory: 'Eliminar categoría actual',
        taskInputPlaceHolder: 'ingresar nueva tarea',
        or: 'o',
        uncategorizedName: 'sin categorizar'
    }
}

function changeLanguage(lang) {
    const langText = languageSwitch.querySelector('div');
    const initialNewList = initialDisplay.querySelector('[data-initial-new-list]');
    const initialExistingList = initialDisplay.querySelector('[data-initial-existing-list]');
    const myListsText = document.querySelectorAll('[data-my-lists]');
    const newCategoryInputs = document.querySelectorAll('[data-new-category-input]');
    const createBtns = document.querySelectorAll('[data-create-btns]');
    const confirmDelete = document.querySelector('.confirmation-message');
    const or = document.querySelector('.or');
    const spanishLeft = document.querySelector('[data-spanish-left]');

    langText.innerText = lang.language;
    initialNewList.textContent = lang.initialCreateNew;
    initialExistingList.textContent = lang.initialSelectList;
    myListsText.forEach(myList => myList.textContent = lang.myLists);
    if (lang === languages.es) {
        tasksLeft.textContent = '';
        spanishLeft.textContent = lang.left;
    } else {
        spanishLeft.textContent = '';
        tasksLeft.textContent = lang.left;  
    }
    uncategorizedBtn.textContent = lang.uncategorized;
    or.textContent = lang.or;
    newListInput.placeholder = lang.listInputPlaceHolder;
    newListInput2.placeholder = lang.listInputPlaceHolder;
    newCategoryInputs.forEach(input => input.placeholder = lang.categoryInputPlaceHolder);
    createBtns.forEach(btn => btn.textContent = lang.create);
    confirmDelete.textContent = lang.deletePrompt;
    cancelDeleteBtn.textContent = lang.cancle;
    deleteBtnWithOptions.textContent = lang.delete;
    deleteListBtns.forEach(btn => btn.textContent = lang.deleteList);
    clearCompletedTasksBtns.forEach(btn => btn.textContent = lang.clearTasks);
    createNewCategoryBtns.forEach(btn => btn.textContent = lang.createCategory);
    deleteCategoryBtns.forEach(btn => btn.textContent = lang.deleteCategory);
}

// disable delete buttons when no list or category is selected
enabelOrDisabelDeleteList();
enableOrDisableDeleteCategory();

function enabelOrDisabelDeleteList() {
    if (!selectedListId || selectedListId == 'null') {
        deleteListBtns.forEach(btn => btn.disabled = true);
    } else {
        deleteListBtns.forEach(btn => btn.disabled = false);
    }    
}

function enableOrDisableDeleteCategory() {
    if (!selectedCategoryId || selectedCategoryId == 'null') {
        deleteCategoryBtns.forEach(btn => btn.disabled = true);
    } else if (categoriesContainer.children[0] && categoriesContainer.children[0].classList.contains('uncategorized-only')) {
        deleteCategoryBtns.forEach(btn => btn.disabled = true);
    } else {
        deleteCategoryBtns.forEach(btn => btn.disabled = false);
    }    
}

//when refreshed language don't change
if(window.location.hash === '#en-US') {
    const us = languages.enUS;
    changeLanguage(us);
} else if(window.location.hash === '#zh-TW') {
    const tw = languages.zhTW;
    changeLanguage(tw);
} else if(window.location.hash === '#zh-CN') {
    const cn =languages.zhCN;
    changeLanguage(cn);
} else if(window.location.hash === '#es') {
    const es = languages.es;
    changeLanguage(es);
} 

//change language
languageOptions.addEventListener('click', e => {
    if(e.target.hash === '#en-US') {
        const us = languages.enUS;
        changeLanguage(us);
        if (selectedCategoryId && selectedCategoryId !== 'null') {
            const newTaskInput = document.querySelector('[data-new-task-input]');
            newTaskInput.placeholder = us.taskInputPlaceHolder;
        }
        if (categoriesContainer.children.length > 1) {
            for (let i = 0; i < categoriesContainer.children.length; i++) {
                if (categoriesContainer.children[i].children[1].id === 'uncategorized') {
                    categoriesContainer.children[i].children[0].children[1].innerText = us.uncategorizedName;
                } 
            }
        }
    } else if(e.target.hash === '#zh-TW') {
        const tw = languages.zhTW;
        changeLanguage(tw);
        if (selectedCategoryId && selectedCategoryId !== 'null') {
            const newTaskInput = document.querySelector('[data-new-task-input]');
            newTaskInput.placeholder = tw.taskInputPlaceHolder;
        }
        if (categoriesContainer.children.length > 1) {
            for (let i = 0; i < categoriesContainer.children.length; i++) {
                if (categoriesContainer.children[i].children[1].id === 'uncategorized') {
                    categoriesContainer.children[i].children[0].children[1].innerText = tw.uncategorizedName;
                } 
            }
        }
    } else if(e.target.hash === '#zh-CN') {
        const cn =languages.zhCN;
        changeLanguage(cn);
        if (selectedCategoryId && selectedCategoryId !== 'null') {
            const newTaskInput = document.querySelector('[data-new-task-input]');
            newTaskInput.placeholder = cn.taskInputPlaceHolder;
        }
        if (categoriesContainer.children.length > 1) {
            for (let i = 0; i < categoriesContainer.children.length; i++) {
                if (categoriesContainer.children[i].children[1].id === 'uncategorized') {
                    categoriesContainer.children[i].children[0].children[1].innerText = cn.uncategorizedName;
                } 
            }
        }
    } else if(e.target.hash === '#es') {
        const es = languages.es;
        changeLanguage(es);
        if (selectedCategoryId && selectedCategoryId !== 'null') {
            const newTaskInput = document.querySelector('[data-new-task-input]');
            newTaskInput.placeholder = es.taskInputPlaceHolder;
        }
        if (categoriesContainer.children.length > 1) {
            for (let i = 0; i < categoriesContainer.children.length; i++) {
                if (categoriesContainer.children[i].children[1].id === 'uncategorized') {
                    categoriesContainer.children[i].children[0].children[1].innerText = es.uncategorizedName;
                } 
            }
        }
    } 
    languageOptions.style.display = 'none';           
})


function saveDeleteOption() {
    localStorage.setItem(LOCAL_STORAGE_DELETE_OPTION_KEY, deleteOption);
}

window.addEventListener('resize', () => {
    if(!selectedListId || selectedListId == 'null') {
        listDisplayContainer.style.display = 'none';
        initialDisplay.style.zIndex = '7';
        if(window.innerWidth < 1024){
            mainContent.classList.remove('main-grid');
            listWrapper.classList.remove('max-width'); 
            initialDisplay.style.display = 'block';  
        } else {
          initialDisplay.style.display = 'none'; 
          mainContent.classList.add('main-grid');
          listWrapper.classList.add('max-width');   
        }
    } else {
        renderSelectedList();
    }
});

//click initial buttons opens the nav menu
initialBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
       headerMenuDropDown.style.display = 'block'; 
    });
})


// getting the selectedListId from target li
listsContainer.addEventListener('click', e => {           
        if(e.target.tagName.toLowerCase() === 'li') {
            selectedListId = e.target.dataset.listId;
            selectedCategoryId = null;
            const selectedList = lists.find(list => list.id === selectedListId);
            selectedList.categories.forEach(category => category.selected = false);
            saveAndRenderAll();
            scrollToTop();
            enabelOrDisabelDeleteList();
            enableOrDisableDeleteCategory();
        }
});

listsContainer2.addEventListener('click', e => {           
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        selectedCategoryId = null;
        const selectedList = lists.find(list => list.id === selectedListId);
        selectedList.categories.forEach(category => category.selected = false);
        saveAndRenderAll();
        scrollToTop();
        e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none';
        enabelOrDisabelDeleteList();
        enableOrDisableDeleteCategory();
    }
});

function scrollToTop() {
    const currentListWrapper = document.querySelector('.current-list-wrapper');
    currentListWrapper.scrollTo(0, 0);
}

// list initial displayed options
uncategorizedBtn.addEventListener('click', ()=> {
    const categoryName = 'uncategorized';
    const category = createCategory(categoryName);
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedCategoryId = category.id
    selectedList.categories.push(category);   
    selectedList.categories.forEach(category => {
        if (category.id !== selectedCategoryId) {
            category.selected = false;
        }
    })
    saveAndRenderselectedList();
})

// select category 
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
        scrollPage(); 
        enableOrDisableDeleteCategory();                                        
    }
});

function scrollPage() {
    if (selectedCategoryId && selectedCategoryId !== 'null') {
        const selectedListTitle = document.querySelector('.list-title');
        const selectedCategory = document.querySelector('.selected-category');
        const listTitleBottom = selectedListTitle.getBoundingClientRect().bottom;
        const selectedCategoryTop = selectedCategory.getBoundingClientRect().top;
        const scrollDistance = Math.floor(listTitleBottom - selectedCategoryTop) ;
        if (scrollDistance > 0) {
            const currentListWrapper = document.querySelector('.current-list-wrapper');
            currentListWrapper.scrollBy(0, -scrollDistance);
        }
    }
}

categoriesContainer.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.classList.contains('new-task-form')) {
        const selectedList = lists.find(list => list.id === selectedListId);
        const selectedCategory = selectedList.categories.find(category => category.id === selectedCategoryId);
        const selectedCategoryWrapper = document.querySelector('.selected-category');
        const selectedCategoryTaskContainer = selectedCategoryWrapper.querySelector('ul.items');        
        const newTaskInput = selectedCategoryWrapper.querySelector('[data-new-task-input]');
        
        const taskName = newTaskInput.value;
        if (taskName == null || taskName == ' ') {
            newTaskInput.value = null;
            return
        };
        const categoryName = selectedCategoryTaskContainer.id;
        const task = createTask(taskName,categoryName);
        newTaskInput.value = null;
        selectedCategory.tasks.push(task);
        save();
        const tasksContainer = document.querySelectorAll('.category .items');
        renderTaskCount(selectedList);
        tasksContainer.forEach(taskContainer=> clearElement(taskContainer));
        renderTasks(selectedList); 
        //scrolling the new-item-form into view as the heigt of the list grow.
        const windowHeight = window.innerHeight;
        const availableHeight = windowHeight - 56;
        const taskFormBottom = e.target.getBoundingClientRect().bottom;
        if ((availableHeight - taskFormBottom) < 0) {
            const newItemForm = document.querySelector('.new-task-form');
            newItemForm.scrollIntoView(false);
        }
    }
}); 

//select task (item)
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
                if (category.content === 'hide') {
                    category.selected = false;    
                    // reasign selectedCategoryId 
                    if (selectedCategoryId === currentRadioBtnId) {
                        selectedCategoryId = null; 
                        enableOrDisableDeleteCategory();
                    }
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
                if (category.content === 'hide') {
                    category.selected = false;
                    // reasign selectedCategoryId 
                    if (selectedCategoryId === currentRadioBtnId) {
                        selectedCategoryId = null;
                        enableOrDisableDeleteCategory(); 
                    }
                }                                                                         
            } 
        });   
        saveAndRenderselectedList();
    }
});

//clear completed tasks
clearCompletedTasksBtns.forEach(btn => {
    btn.addEventListener('click', clearCompleted);
    /* btn.addEventListener('click', hideParent); */
});

function clearCompleted() {
    const selectedList = lists.find(list => list.id === selectedListId);
    selectedList.categories.forEach(category => {
        category.tasks = category.tasks.filter(task => !task.complete);              
    })
    saveAndRenderAll();
}

//delet list functions
deleteListBtns.forEach(btn => {
    btn.addEventListener('click', e => {
                deleteOption = 'selected-list';
                saveDeleteOption();
                const selecetedListName = lists.find(list=> list.id === selectedListId).name;
                openDeleteConfirmation();
                confirmDeleteName.innerText = selecetedListName;
                deleteBtnWithOptions.dataset.deleteOption = deleteOption;                        
    })
});

cancelDeleteBtn.addEventListener('click', resetDeleteConfirmationData);

deleteBtnWithOptions.addEventListener('click', e => {
    if (e.target.dataset.deleteOption === 'selected-list') {
        deleteList();
        resetDeleteConfirmationData();
    }
})

function resetDeleteConfirmationData() {
    deleteOption = '';
    saveDeleteOption();
    confirmDeleteName.innerText = '';
    deleteBtnWithOptions.dataset.deleteOption = '';
    closeDeleteConfirmation();    
}

function openDeleteConfirmation() {
    deleteConfirmationWrapper.style.display = 'grid';
}

function closeDeleteConfirmation() {
    deleteConfirmationWrapper.style.display = 'none';
}

function deleteList() {
    lists = lists.filter(list => list.id !== selectedListId);
    selectedListId = null;
    selectedCategoryId = null;
    saveAndRenderAll();
    enabelOrDisabelDeleteList();
    enableOrDisableDeleteCategory();
}


function hideParent(e) {
    e.currentTarget.parentElement.parentElement.parentElement.style.display = 'none';
}

// display create category form
createNewCategoryBtns.forEach(btn => {
    btn.addEventListener('click', ()=> {
        newCategoryFormPopup.style.display = 'grid';
    });
    /* btn.addEventListener('click', hideParent); */
});

//close create category form
closeCategoryForm.addEventListener('click', ()=> {
newCategoryFormPopup.style.display = 'none';
});

//delete category functions
deleteCategoryBtns.forEach(btn => {
    btn.addEventListener('click', e => {
                deleteOption = 'selected-Category';
                saveDeleteOption();
                const selecetedCategory = document.querySelector('.selected-category'); 
                openDeleteConfirmation();
                confirmDeleteName.innerText = selecetedCategory.children[0].children[1].innerText;
                deleteBtnWithOptions.dataset.deleteOption = deleteOption;                         
    })        
});

deleteBtnWithOptions.addEventListener('click', e => {
    if (e.target.dataset.deleteOption === 'selected-Category') {
        const selectedList = lists.find(list=> list.id === selectedListId);
        selectedList.categories = selectedList.categories.filter(category=> !category.selected);
        selectedCategoryId = null; 
        saveAndRenderselectedList();
        resetDeleteConfirmationData(); 
        enableOrDisableDeleteCategory();     
    }
})

editBottomTabBtns.forEach(btn => {
    btn.addEventListener('click', hideParent);
    btn.addEventListener('click', rotateBtn);
});

headerEditBtns.forEach(btn => btn.addEventListener('click', hideParent));

// add new list object to lists array 
//then save to localStorage and render UI
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName == ' ') {
        newListInput.value = null;
        return;
    }
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    selectedListId = list.id;
    selectedCategoryId = null;
    saveAndRenderAll();
    listsContainer.lastChild.scrollIntoView();
    menuAnimation();
    enabelOrDisabelDeleteList();
});    

newListForm2.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput2.value;
    if (listName == null || listName == ' ') {
        newListInput2.value = null;
        return;
    }
    const list = createList(listName);
    newListInput2.value = null;
    lists.push(list);
    selectedListId = list.id;
    selectedCategoryId= null;
    saveAndRenderAll();
    menuAnimation();
    enabelOrDisabelDeleteList();
});  

function menuAnimation() {
    const menuStyle = navMenuContainer.style;
    if (menuStyle.transform === 'scaleX(1)' || menuStyle.transform === '') {
        setTimeout(()=> {
        menuStyle.transform = 'scaleX(0)';       
        }, 500);
        setTimeout(() => {
            headerMenuDropDown.style.display = 'none'; 
            menuStyle.transform = 'scaleX(1)';  
        }, 700);
    } 
}

// add new category to list
newCategoryForms.forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const newCategoryInput = form.querySelector('[data-new-category-input]');
        const categoryName = newCategoryInput.value;
        if (!categoryName || categoryName === ' ') {
            newCategoryInput.value = null;
            return; 
        }        
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
        // scroll newly created category into view
        const windowHeight = window.innerHeight;
        const availableHeight = windowHeight - 56;
        const newItemForm = document.querySelector('.new-task-form');
        const taskFormBottom = newItemForm.getBoundingClientRect().bottom;
        if ((availableHeight - taskFormBottom) < 0) {
            newItemForm.scrollIntoView(false);
        }

        //close pop up form
        newCategoryFormPopup.style.display = 'none';
        enableOrDisableDeleteCategory();
    })
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
    if(!selectedListId || selectedListId == 'null') {
        listDisplayContainer.style.display = 'none';
        listInitialWrapper.style.display = 'none';
        initialDisplay.style.zIndex = '7';
        if(window.innerWidth < 1024){
            mainContent.classList.remove('main-grid');
            listWrapper.classList.remove('max-width'); 
            initialDisplay.style.display = 'block';  
        } else {
                mainContent.classList.add('main-grid');
                listWrapper.classList.add('max-width'); 
                listWrapper.classList.remove('list-grid');  
        }
    } else {
        const selectedList = lists.find(list => list.id === selectedListId);
        initialDisplay.style.display = 'none';
        initialDisplay.style.zIndex = '';
        mainContent.classList.remove('main-grid');
        listWrapper.classList.remove('max-width'); 
        if (window.innerWidth >= 1024) {
            listWrapper.classList.add('list-grid'); 
        }
        listDisplayContainer.style.display = '';
        listTitleDiv.style.display = 'flex';
        listTitleElement.innerText = selectedList.name; 
        const listTitleHeight = listTitleDiv.getBoundingClientRect().height;
        categoriesContainer.style.top = `${listTitleHeight}px`;
        clearElement(categoriesContainer);
        renderCategories(selectedList);  
        if (categoriesContainer.innerHTML === '') {
            listInitialWrapper.style.top = `${listTitleHeight}px`;
            listInitialWrapper.style.display = 'block';            
        } else {
            listInitialWrapper.style.display = 'none';
        }
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
        tasksContainer.classList.add(category.content);
        radioBtn.setAttribute('name', 'category');
        radioBtn.id = category.id;
        radioBtn.checked = category.selected;
        categoryLabel.htmlFor = category.id;
        tasksContainer.id = category.name.replaceAll(' ', '-');
        categoryLabel.append(category.name);
        //hide uncategorized title
        if (tasksContainer.id === 'uncategorized') {
            const categoryTitle = categoryElement.querySelector('.category-title');
            categoryTitle.style.display = 'none';
        }        
        categoriesContainer.appendChild(categoryElement); 
    })  

    //render hide / show taskContainer 
    const tasksContainers = document.querySelectorAll('ul.items');
    tasksContainers.forEach(tasksContainer => {
        if (tasksContainer.classList.contains('hide')) {
            tasksContainer.style.display = 'none';
        } 
    });

    //uncategorized list or list with uncategorized category
    if (categoriesContainer.children.length === 1) { 
        const onlyCategory = categoriesContainer.children[0];
        const itemsContainerId = onlyCategory.children[1].id;
        if(itemsContainerId === 'uncategorized') {
            selectedCategoryId = categoriesContainer.children[0].children[0].children[0].id;
            onlyCategory.classList.add('uncategorized-only');                     
        }           
    }   
    else if (categoriesContainer.children.length > 1) {       
        for (let i = 0; i < categoriesContainer.children.length; i++) {
            if (categoriesContainer.children[i].children[1].id === 'uncategorized') {
                categoriesContainer.children[i].children[0].style.display = 'flex';
                if(window.location.hash === '#en-US') {
                    const us = languages.enUS;
                    categoriesContainer.children[i].children[0].children[1].innerText = us.uncategorizedName;
                } else if(window.location.hash === '#zh-TW') {
                    const tw = languages.zhTW;
                    categoriesContainer.children[i].children[0].children[1].innerText = tw .uncategorizedName;
                } else if(window.location.hash === '#zh-CN') {
                    const cn =languages.zhCN;
                    categoriesContainer.children[i].children[0].children[1].innerText = cn.uncategorizedName;
                } else if(window.location.hash === '#es') {
                    const es = languages.es;
                    categoriesContainer.children[i].children[0].children[1].innerText = es.uncategorizedName;
                } 
            }
        }
    } 

    //styling selected category wrapper
    if (selectedCategoryId && selectedCategoryId !== 'null') {
        const categoryTitleRadioBtns = document.querySelectorAll('input[type="radio"]');
        categoryTitleRadioBtns.forEach(categoryTitleRadioBtn=> { 
            if(categoryTitleRadioBtn.id === selectedCategoryId) {
                const categoryDiv = categoryTitleRadioBtn.parentElement.parentElement;
                categoryDiv.classList.add('selected-category');        
            }
        }) 
        
        // render newItemForm within selectedCategory
        const selectedCategoryWrapper = document.querySelector('.selected-category');
        const newItemFormElement = document.importNode(newItemFormTemplate.content, true);
        selectedCategoryWrapper.appendChild(newItemFormElement);  
        getPlaceholderLang();
    }  
} 

function getPlaceholderLang() {
    const newTaskInput = document.querySelector('[data-new-task-input]');
    if(window.location.hash === '#en-US') {
        const us = languages.enUS;
        newTaskInput.placeholder = us.taskInputPlaceHolder;
    } else if(window.location.hash === '#zh-TW') {
        const tw = languages.zhTW;
        newTaskInput.placeholder = tw.taskInputPlaceHolder;
    } else if(window.location.hash === '#zh-CN') {
        const cn =languages.zhCN;
        newTaskInput.placeholder = cn.taskInputPlaceHolder;
    } else if(window.location.hash === '#es') {
        const es = languages.es;
        newTaskInput.placeholder = es.taskInputPlaceHolder;
    }      
};

// render tasks
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
            label.append(task.name);                      // items are tasks vvv
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
    listCountElement.innerText =`${incompleteTaskCount} `;             
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

