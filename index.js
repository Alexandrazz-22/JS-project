const addTaskInput = document.querySelector("#addTaskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.getElementById("taskList");
const doneTaskList = document.getElementById("doneTaskList");
const searchInput = document.getElementById("search-input");

addButton.disabled = true;

addTaskInput.addEventListener("keyup", buttonState);

function buttonState() {
    if (document.querySelector("#addTaskInput").value === "") {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
}

addButton.addEventListener("click", addTask);

function addTask() {
    const taskName = document.getElementById("addTaskInput").value;

    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.innerHTML = `
    <div class="taskName">
      <input type="checkbox" class="checkbox leftElement">
      ${taskName}
    </div>
  `;

    taskList.insertBefore(newTask, addTask.nextSibling);

    addCheckboxEventListener(newTask);

    document.getElementById("addTaskInput").value = "";
}

function addCheckboxEventListener(task) {
    const checkbox = task.querySelector(".checkbox");

    checkbox.removeEventListener("change", handleCheckboxChange);
    checkbox.addEventListener("change", handleCheckboxChange);
}

function handleCheckboxChange(event) {
    const task = event.target.closest(".task");

    if (event.target.checked) {
        doneTaskList.appendChild(task);
        if (taskList.contains(task)) {
            taskList.removeChild(task);
        }
    } else {
        taskList.appendChild(task);
        if (doneTaskList.contains(task)) {
            doneTaskList.removeChild(task);
        }
    }

    addCheckboxEventListener(task);
}

const tasks = document.querySelectorAll('.task');
tasks.forEach(task => {
    const checkbox = task.querySelector('.checkbox');
    addCheckboxEventListener(task);
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            checkbox.checked = false;
            handleCheckboxChange({ target: checkbox });
        }
    });
});

function searchTasks() {
    const searchText = searchInput.value.toLowerCase();

    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        const taskName = task.querySelector("span").textContent.toLowerCase();

        if (taskName.includes(searchText)) {
            task.classList.remove("hidden");
        } else {
            task.classList.add("hidden");
        }
    });
}

searchInput.addEventListener("input", searchTasks);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function () {
    const taskElements = document.querySelectorAll(".task:not(#addTask)");
    for (let i = 0; i < taskElements.length; i++) {
        taskElements[i].remove();
    }
});

// // Load stored task list data if available
// const storedData = localStorage.getItem("taskList");
// if (storedData) {
//     const taskList = document.getElementById("taskList");
//     taskList.innerHTML = storedData;
// }

// // Load stored fulfilled task list data if available
// const storedDoneData = localStorage.getItem("doneTaskList");
// if (storedDoneData) {
//     const doneTaskList = document.getElementById("doneTaskList");
//     doneTaskList.innerHTML = storedDoneData;
// }

// // Save task list data to localStorage
// const saveData = function() {
//     const taskList = document.getElementById("taskList");
//     localStorage.setItem("taskList", taskList.innerHTML);
// };

// // Save fulfilled task list data to localStorage
// const saveDoneData = function() {
//     const doneTaskList = document.getElementById("doneTaskList");
//     localStorage.setItem("doneTaskList", doneTaskList.innerHTML);
// };

// // Add event listener to save task list data whenever it is changed
// document.addEventListener("DOMContentLoaded", function() {
//     const taskList = document.getElementById("taskList");
//     taskList.addEventListener("change", saveData);

//     const doneTaskList = document.getElementById("doneTaskList");
//     doneTaskList.addEventListener("change", saveDoneData);
// });

