const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');
const newTaskInput = document.getElementById('new-task');

// Get tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('todo-list'));
if (storedTasks) {
  for (const task of storedTasks) {
    createTaskItem(task.text, task.completed);
  }
}

// Add task
addBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
      createTaskItem(taskText);
      // Clear the input field after adding the task
      newTaskInput.value = '';
    }
  });
// Create task item
function createTaskItem(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) {
    li.classList.add('completed');
  }

  // Add checkbox, edit button, and delete button
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });
  li.appendChild(checkbox);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    li.classList.toggle('editing');
    const inputField = li.querySelector('input[type="text"]');
    if (inputField.value) {
      // If editing, pre-fill input with current text
      inputField.value = li.textContent.trim();
    }
  });
  li.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
    updateLocalStorage();
  });
  li.appendChild(deleteBtn);

  // Add input field for editing
  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.addEventListener('blur', () => {
    const newTaskText = inputField.value.trim();
    if (newTaskText) {
      // Update task text and local storage
      li.textContent = newTaskText;
      updateLocalStorage();
    }
    li.classList.remove('editing');
  });
  li.appendChild(inputField);

  todoList.appendChild(li);

  // Update local storage
  updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
  const tasks = [];
  for (const li of todoList.childNodes) {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const text = li.textContent.trim();
    tasks.push({ text, completed: checkbox.checked });
  }
  localStorage.setItem('todo-list', JSON.stringify(tasks));
}
