var inputBox = document.getElementById('text');
var todoContainer = document.getElementById('todoContainer')
var saveTodo = document.getElementById('saveTodo')

var todo1 = document.getElementById('todo1');
var todo2 = document.getElementById('todo2');
var todo3 = document.getElementById('todo3');

var selectedTodo = null; //initially we didn't select or edit any todo so it's value is null

// console.log(todoContainer.children)
// we don't use forEach in this because it is a HTML collection
// DELETE
for (var i = 0; i < todoContainer.children.length; i++) {
    var list = todoContainer.children[i]; // store the li list
    var deleteBtn = list.children[2]; // delete button
    deleteBtn.addEventListener('click', function(event){
        var parent = event.target.parentNode; // get the parent of child
        var grandParent = parent.parentNode; // get the grand parent of child through parent
        
        grandParent.removeChild(parent); // remove the parent through grandparent
    })
    
}
// EDIT
for(var i=0; i<todoContainer.children.length; i++){
    var list = todoContainer.children[i];
    // console.log(list);
    
    var editButton = list.children[1];
    // console.log(editButton);

    editButton.addEventListener('click', function(event){
        var parent = event.target.parentNode;
        // console.log(parent)

        selectedTodo = parent.children[0]; // store the todo which is choose for editing

        inputBox.value = parent.children[0].innerHTML;
        // console.log(parent.children[0].innerHTML) 
    })
}
// SAVE
saveTodo.addEventListener('click', function(event){
    event.preventDefault();
    // console.log(inputBox.value);
    try {
    selectedTodo.innerHTML = inputBox.value; // change the value of edit todo
    selectedTodo = null;

    } catch (error) {
        console.log(error)
    }
})