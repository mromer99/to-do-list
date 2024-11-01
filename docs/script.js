const apiUrl = 'http://localhost:3000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    let tasks = await response.json();

    // Sort tasks: incomplete tasks first - oldest first, then completed tasks (oldest first)
    tasks.sort((a, b) => {
        if (a.completed === b.completed) {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return a.completed - b.completed;
    });
    renderTasks(tasks);
}


async function addTask(description) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
    });
    fetchTasks();
}

async function completeTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'PATCH' });
    fetchTasks(); 
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

async function saveEditTask(id, newDescription) {
    await fetch(`${apiUrl}/${id}/edit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescription })
    });
    fetchTasks();
}

function editTask(id, currentDescription) {
    const taskItem = document.getElementById(`task-${id}`);

    taskItem.innerHTML = `
        <input type="text" value="${currentDescription}" id="edit-input-${id}" class="edit-input">
        <button onclick="confirmEdit(${id})" class="icon-button save-button"><i class="fas fa-save"></i> Save</button>
        <button onclick="cancelEdit(${id}, '${currentDescription.replace(/'/g, "\\'")}')" class="icon-button cancel-button"><i class="fas fa-times"></i> Cancel</button>
    `;

    document.getElementById(`edit-input-${id}`).focus();
}


function confirmEdit(id) {
    const editInput = document.getElementById(`edit-input-${id}`);
    const newDescription = editInput.value.trim();
    if (newDescription) {
        saveEditTask(id, newDescription);
    }
}

function cancelEdit(id, originalDescription) {
    const taskItem = document.getElementById(`task-${id}`);
    taskItem.innerHTML = renderTaskHTML(id, originalDescription, false);
}

function renderTaskHTML(id, description, completed) {
    return `
        <span class="task-text ${completed ? 'completed' : ''}">${description}</span>
        <div>
            ${!completed ? `<button onclick="completeTask(${id})" class="icon-button"><i class="fas fa-check"></i></button>` : ''}
            <button onclick="editTask(${id}, '${description}')" class="icon-button"><i class="fas fa-edit"></i></button>
            <button onclick="deleteTask(${id})" class="icon-button"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
}
// Rendering the entire list of tasks
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.id = `task-${task.id}`;
        taskItem.innerHTML = renderTaskHTML(task.id, task.description, task.completed);
        taskList.appendChild(taskItem);
    });
}

document.getElementById('taskForm').addEventListener('submit', event => {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim()) {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
});

fetchTasks();
