// DEFINING UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOADING ALL EVENT LISTENERS
loadEventListener();

// LOADING ALL EVENT LISTENERS
function loadEventListener() {
	// DOM LOAD EVENT
	document.addEventListener('DOMContentLoaded', getTasks);
	// ADD TASK EVENT
	form.addEventListener('submit', addTask);
	// REMOVE TASK EVENT
	taskList.addEventListener('click', removeTask);
	// CLEAR TASKS
	clearBtn.addEventListener('click', clearTasks);
	// FILTER TASKS EVENT
	filter.addEventListener('keyup', filterTasks);
}

// STORE TASKS
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		// WONT WORK WITHOUT JSON.PARSE
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	// ADD TO ARRAY
	tasks.push(task);
	// SET BACK TO LOCAL STORAGE
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// GET TASKS FROM LOCAL STORAGE FUNCTION
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function (task) {
		// CREATE li ELEMENT
		const li = document.createElement('li');
		// ADD CLASS
		li.className = 'collection-item';
		// CREATE TEXT NODE AND APPEND TO li
		li.appendChild(document.createTextNode(task));
		// CREATE NEW LINK ELEMENT
		const link = document.createElement('a');
		// ADD CLASS
		link.className = 'delete-item secondary-content';
		// ADD ICON HTML
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// APPEND LINK TO LI
		li.appendChild(link);
		// APPEND TO UL
		taskList.appendChild(li);
	});
}

// ADD TASK
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task.');
	}

	// CREATE li ELEMENT
	const li = document.createElement('li');
	// ADD CLASS
	li.className = 'collection-item';
	// CREATE TEXT NODE AND APPEND TO li
	li.appendChild(document.createTextNode(taskInput.value));
	// CREATE NEW LINK ELEMENT
	const link = document.createElement('a');
	// ADD CLASS
	link.className = 'delete-item secondary-content';
	// ADD ICON HTML
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// APPEND LINK TO LI
	li.appendChild(link);
	// APPEND TO UL
	taskList.appendChild(li);

	// STORE IN LOCAL STORAGE
	storeTaskInLocalStorage(taskInput.value);

	// CLEAR INPUT
	taskInput.value = '';

	e.preventDefault();
}

// REMOVE TASK
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure')) {
			e.target.parentElement.parentElement.remove();
		}

		// REMOVE TASK FROM LOCAL STORAGE
		removeTaskFromLocalStorage(e.target.parentElement.parentElement);
	}
}

// CLEAR TASKS
function clearTasks() {
	// taskList.innerHTML='';

	// FASTER
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// CLEAR FROM LOCAL STORAGE
	clearTasksFromLocalStorage();
}

// FILTER TASKS
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

// REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage() {
	localStorage.clear();
}
