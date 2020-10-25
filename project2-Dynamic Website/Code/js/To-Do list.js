/* menue bar function*/
function toggleSidebar(ref) {
  document.getElementById("sidebar").classList.toggle("active");
}
//Change backround btn
function darkBG() {
  document.body.style.backgroundImage = "url('images/black4k.jpg')";
  $(".pagecontainer").css("background-color", "#4d0f00");
  $("#sidebar").css("background-color", "#6e1500");
  $("footer").css("background-color", "#4d0f00");
  $("#welcomemsg").css("color", "white");
  $("#newtasklabel").css("color", "white");
}
function lightBG() {
  document.body.style.backgroundImage = "url('images/whiteBG.jpg')";
  $(".pagecontainer").css("background-color", "#225378");
  $("#sidebar").css("background-color", "#2d709f");
  $("footer").css("background-color", "#225378");
}

//Define used vars
const form = document.querySelector("#taskForm");
const taskList = document.querySelector(".taskList");
const clearBtn = document.querySelector("#clearButton");
const taskInput = document.querySelector("#task");

//Loading events before thier function
loadMyEvents();
function loadMyEvents() {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
}

//Event1 Add a task

function addTask() {
  if (taskInput.value === "") {
    alert("Add a task");
    return; ///////////BEST DISCOVORY-----> how to stop func on empty input///////////
  }

  let li = document.createElement("li");
  li.className = "w-100 text-break list-group-item ";
  li.appendChild(document.createTextNode(taskInput.value));
  let link = document.createElement("a");
  link.className = "delete-item secondary-content float-right";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";
}

//Event2 Remove a task
function removeTask(e) {
  if (e.target.className == "fa fa-remove") {
    if (confirm("Delete this item?")) {
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Event3 Clear Tasks
function clearTasks() {
  if (confirm("Delete all items?")) {
    taskList.innerHTML = "";
  }
  //add clear effect to loacal storage
  localStorage.clear();
}

//Making the app use local storage

// Get Tasks from Local
function getTasks() {
  //Check if local storage is empty
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "w-100 text-break list-group-item ";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content float-right";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Store Task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
