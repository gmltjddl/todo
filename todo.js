const taskInput = document.querySelector(".input-div input")
taskBox = document.querySelector(".task-box");
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo() {
  let li ="";
  if(todos){
  todos.forEach((todo, id) => {
    li += ` <li class="task">
              <label class="task-label" for="${id}">
                <input class="chkbox" onclick="updateStatus(this)" type="checkbox" id="${id}">
                <i class="circle"></i>
                <p class="p1">${todo.name}</p>
                <button class="delete">X</button>
              </label>
            </li>`;
  });
}
  taskBox.innerHTML=li;
}
showTodo();

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastChildElement;
    if(selectedTask.checked) {
      taskName.classList.add("checked");
    }else {
      taskName.classList.remove("checked");
    }

}


taskInput.addEventListener("keyup", e => {
  let userTask = taskInput.value.trim();
  if(e.key == "Enter" && userTask) {   
    if(!todos) {
      todos = [];
    }
    taskInput.value="";
    let taskInfo = {name: userTask, status: "Active"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});