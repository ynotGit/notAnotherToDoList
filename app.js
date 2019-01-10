// Define UI Variables
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

//Load All Event Listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove Task Event
    taskList.addEventListener('click', removeTask);
    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li Element
        const li = document.createElement('li');

        //Add Class
        li.className = 'collection-item';

        //Create Text Node + Append to li
        li.appendChild(document.createTextNode(task));

        //Create New link Element
        const link = document.createElement('a');

        //Add class
        link.className = 'delete-item secondary-content';

        //Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';

        //Append link To li
        li.appendChild(link);

        //Append li To ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //Create li Element
    const li = document.createElement('li');

    //Add Class
    li.className = 'collection-item';

    //Create Text Node + Append to li
    li.appendChild(document.createTextNode(taskInput.value));

    //Create New link Element
    const link = document.createElement('a');

    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append link To li
    li.appendChild(link);

    //Append li To ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Do you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    task.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            task.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}