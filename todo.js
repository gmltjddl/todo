const taskInput = document.querySelector(".input-div input"),
buttons = document.querySelectorAll(".buttons span"), 
taskBox = document.querySelector(".task-box");
clearAll = document.querySelector(".clear-btn");

let todos = JSON.parse(localStorage.getItem("todo-list"));


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
      document.querySelector("span.active").classList.remove("active");
      btn.classList.add("active");
      showTodo(btn.id);
  });
});


function showTodo(button) {
  let li ="";
  if(todos) {
    todos.forEach((todo, id) => {
    let isCompleted = todo.status == "completed" ? "checked" : "";
    if(button == todo.status || button =="all") {
    li += ` <li class="task">
              <label class="task-label" for="${id}">
                <input class="chkbox" onclick="updateStatus(this)" name="inp" type="checkbox" id="${id}">
                <i class="circle"></i>
                <button class="delete" onclick="deleteTask(${id})">X</button>
                <p class="${isCompleted}">${todo.name}</p>
                
              </label>
            </li>`;
    }
  });
}
  taskBox.innerHTML=li;
}

showTodo("all");

function deleteTask(deleteId) {
  todos.splice(deleteId, 1);   // 숫자 크게주면 숫자만큼지움
  localStorage.setItem("todo-list", JSON.stringify(todos));
  document.querySelector(".button-wrap").style.opacity='1';
  showTodo("all");
}
clearAll.addEventListener("click", () => {
  todos.splice(0, todos.length);   // 숫자 크게주면 숫자만큼지움
  localStorage.setItem("todo-list", JSON.stringify(todos));
  document.querySelector(".button-wrap").style.opacity='0';
  showTodo("all");
});

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
      taskName.classList.add("checked");
      todos[selectedTask.id].status = "completed";
    }else {
      taskName.classList.remove("checked"); 
      todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
}


taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask) {   
    if(!todos) {
      todos = [];
    }
    document.querySelector(".button-wrap").style.opacity='1';
    taskInput.value="";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));

    showTodo("all");
  }
});