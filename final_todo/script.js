var todos = [];

var leftDiv = document.getElementById("leftDiv");
var rightDiv = document.getElementById("rightDiv");
var todoContainer = document.getElementById("todoContainer");
var box = document.getElementById("boxId");
var resetBtn = document.getElementById("clearAll");

// apply the event listener
box.addEventListener("keydown", function clickHandler(e) {
  var keyName = e.code; // for identifying which key is press
  var value = box.value;

  if (keyName == "Enter" && value !== "" && value !== " ") {
    e.preventDefault();

    var container = document.createElement("div");
    var taskHeading = document.createElement("h4");
    var subContainer = document.createElement("div");
    var radioButton = document.createElement("input");
    var deleteButton = document.createElement("button");

    radioButton.setAttribute("type", "checkbox");

    radioButton.setAttribute("class", "checkBtn");
    deleteButton.setAttribute("class", "closeBtn");

    deleteButton.innerHTML = "X";

    container.setAttribute("id", "containerId");
    subContainer.setAttribute("id", "subContainerId");

    container.appendChild(taskHeading);
    container.appendChild(subContainer);
    subContainer.appendChild(radioButton);
    subContainer.appendChild(deleteButton);

    taskHeading.innerHTML = value;

    todos.push({todos: value, isChecked: false});
    localStorage.setItem("todos", JSON.stringify(todos));

    todoContainer.appendChild(container);

    box.value = "";
  }
});

//reset button
resetBtn.addEventListener("click", function () {
  window.localStorage.clear();
  window.location.reload();
});

//save the todos in local storage
var storedTodos = localStorage.getItem("todos");
if (storedTodos !== null) {
  todos = JSON.parse(storedTodos);

  todos.forEach(function (value) {
    var container = document.createElement("div");
    var taskHeading = document.createElement("h4");
    var subContainer = document.createElement("div");
    var radioButton = document.createElement("input");
    var deleteButton = document.createElement("button");

    radioButton.setAttribute("type", "checkbox");
    radioButton.setAttribute("class", "checkBtn");
    deleteButton.setAttribute("class", "closeBtn");

    deleteButton.innerHTML = "X";

    if(value.isChecked){
      radioButton.checked = true;
      taskHeading.style.textDecoration = 'line-through'
    }
    else{
      radioButton.checked = false;
      taskHeading.style.textDecoration = 'none'
    }

    container.setAttribute("id", "containerId");
    subContainer.setAttribute("id", "subContainerId");

    container.appendChild(taskHeading);
    container.appendChild(subContainer);
    subContainer.appendChild(radioButton);
    subContainer.appendChild(deleteButton);

    taskHeading.innerHTML = value.todos;

    todoContainer.appendChild(container);
  });
}


// Delete targeted todo
// console.log(todoContainer.children.length)
var storedTodos = localStorage.getItem("todos");
// console.log(storedTodos);
if (storedTodos !== null) {
  todos = JSON.parse(storedTodos);
  
  for (var i = 0; i < todoContainer.children.length; i++) {
    
    var container = todoContainer.children[i];
    // console.log(container)
    var subContainer = container.children[1];
    // console.log(subContainer)
    var deleteBtn = subContainer.children[1];
    // console.log(deleteBtn)

    // add event
    deleteBtn.addEventListener("click", function (e) {
        var parent = e.target.parentNode;
          // console.log(parent)
        var grandParent = parent.parentNode;
          // console.log(grandParent)
        var clickedTodo = grandParent.childNodes[0].innerHTML;
        // console.log(clickedTodo)
        var greatGrandParent = grandParent.parentNode;
        // console.log(greatGrandParent);
        var ind;
        
        todos.forEach(function(task){
          if(task.todos === clickedTodo){
            ind = todos.indexOf(task);
            // console.log(ind);
          }
        })
        console.log(ind)
        todos.splice(ind, 1); //splice the clicked todo
        
        localStorage.setItem("todos", JSON.stringify(todos)); //update the todos array

        greatGrandParent.removeChild(grandParent);
    });
  }
}



// Mark done targeted todo
var storedTodos = localStorage.getItem("todos");
if (storedTodos !== null) {
  todos = JSON.parse(storedTodos);
  
  for (var i = 0; i < todoContainer.children.length; i++) {
    
    var container = todoContainer.children[i];
    // console.log(container)
    var subContainer = container.children[1];
    // console.log(subContainer)
    var markBtn = subContainer.children[0];
    // console.log(markBtn.checked)

    // add event
    markBtn.addEventListener("change", function (e) {
        // console.log(e.target.checked)
        if(e.target.checked == true){
          // console.log('checked', markBtn.checked)
          var parent = e.target.parentNode;
            // console.log(parent)
          var grandParent = parent.parentNode;
          // console.log(grandParent.childNodes[0])
        
          var markedTask = grandParent.childNodes[0];
          markedTask.style.textDecoration = 'line-through'
          // console.log(markedTask)

          var updatedTodos = todos.map(function(task){
            // console.log(task.todos, task.isChecked, markedTask.innerHTML)
            if(task.todos === markedTask.innerHTML){
              task.isChecked = true;
            }
            return task;
          })
          
          localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
        else{
          // console.log('not checked', markBtn.checked)
          var parent = e.target.parentNode;
            // console.log(parent)
          var grandParent = parent.parentNode;
            // console.log(grandParent)

          var markedTask = grandParent.childNodes[0];
          markedTask.style.textDecoration = 'none'
          // console.log(markedTask)

          var updatedTodos = todos.map(function(task){
            if(task.todos === markedTask.innerHTML){
              task.isChecked = false;
            }
            return task;
          })

          localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    });
  }
}
