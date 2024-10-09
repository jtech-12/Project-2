document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect task data from form
        const taskTitle = document.getElementById('taskTitle').value;
        const taskPriority = document.getElementById('taskPriority').value;
        const taskStatus = document.querySelector('input[name="status"]:checked').value;

        // Create a task object
        const task = {
            title: taskTitle,
            priority: taskPriority,
            status: taskStatus
        };

        // Add task to array
        tasks.push(task);

        // Add task to the DOM
        addTaskToDOM(task, tasks.length - 1);

        // Reset form
        taskForm.reset();
    });

    function addTaskToDOM(task, index) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            <strong>${task.title}</strong> - ${task.priority} - ${task.status}
            <button class="btn btn-danger btn-sm float-right ml-2" onclick="removeTask(${index})">Remove</button>
            <button class="btn btn-success btn-sm float-right" onclick="markComplete(${index})">Mark as Complete</button>
        `;

        taskList.appendChild(li);
    }

    window.removeTask = function(index) {
        // Remove task from array
        tasks.splice(index, 1);

        // Clear the task list and re-render
        taskList.innerHTML = '';
        tasks.forEach((task, i) => addTaskToDOM(task, i));
    };

    window.markComplete = function(index) {
        // Mark task as complete in the array
        tasks[index].status = 'Completed';

        // Update DOM element
        const taskItems = taskList.getElementsByTagName('li');
        taskItems[index].style.textDecoration = 'line-through';
    };
});
