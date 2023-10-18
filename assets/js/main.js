const taskInput = document.querySelector('#task');
const btnSubmit = document.querySelector('#addTask');
const taskList = document.querySelector('#taskList');
const removeAll = document.querySelector('#tasksRemoved');


btnSubmit.addEventListener('click', addTask);


function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText == '') {
        alert('Enter your task for the near future');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'deleteBtn';


    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

document.addEventListener( 'keyup', event => {
  if( event.code === 'Enter' ) addTask();
});

removeAll.addEventListener('click', function() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
});