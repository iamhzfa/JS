
var todos = [];

function init(){
    var leftDiv = document.createElement("div"); // create div in our html file
    var rightDiv = document.createElement("div"); // create div in our html file
    document.body.appendChild(leftDiv); //append the child {parent :- body and child :- leftDiv}
    document.body.appendChild(rightDiv); //append the child {parent :- body and child :- rightDiv}

    // 1 way :- good practice to set attributes 
    rightDiv.setAttribute("id","rightDiv"); // give id to our right div
    // 2 way :- bad practice to set attributes
    // rightDiv.id("rightDiv");

    leftDiv.setAttribute("id", "leftDiv"); // give id to our left div

    //left div
    var heading = document.createElement("h1") // create h1 heading tag
    heading.innerHTML = "TODO-APP" //set inner html of h1 tag
    heading.style.textAlign = "center" //apply css
    var subHeading = document.createElement("h3") // create h1 heading tag
    subHeading.innerHTML = "Add your daily task and notes"; //set inner html of h1 tag
    subHeading.style.textAlign = "center" //apply css
    
    leftDiv.appendChild(heading) // append the child to leftDiv
    leftDiv.appendChild(subHeading) // append the child to leftDiv


    // right div
    var box = document.createElement('textarea') // create textArea input tag
    box.setAttribute("placeholder", "Enter the text"); // placeholder
    box.setAttribute('id', 'boxId'); // set the id attribute


    rightDiv.appendChild(box); // append the textArea in right div


    // reset button
    var resetBtn = document.createElement('button') // create button element
    resetBtn.innerHTML = 'Reset'; // set the html
    resetBtn.setAttribute('id', 'clearAll'); // set id attribute
    rightDiv.appendChild(resetBtn); // append the child


    //event listener
    var element = document.getElementById("clearAll"); // get the reset button id
    element.addEventListener('click', function(){ // apply the event listener
        // e.preventDefault();
        window.localStorage.clear(); // clear the local storage
        window.location.reload(); // reload the page
    })
    
    
    

    //event listener
    box.addEventListener('keydown', clickHandler); // apply the event listener on text area when user press enter button
}

function clickHandler(event){
    var keyName = event.code;
    var textBox = document.getElementById('boxId');
    var value = textBox.value;


    if(keyName === "Enter" && value !== ""){
        event.preventDefault();
        console.log("aa gya isme")
        var container = document.createElement("div");
        var taskHeading = document.createElement('h4');
        var subContainer = document.createElement("div");
        var radioButton = document.createElement('input');
        var deleteButton = document.createElement('button');

        radioButton.setAttribute('type', 'checkbox');
        radioButton.setAttribute('class', 'checkBtn');
        deleteButton.setAttribute('class', 'closeBtn');

        deleteButton.innerHTML = "X";

        container.setAttribute('id', 'containerId');

        container.appendChild(taskHeading);
        container.appendChild(subContainer);
        subContainer.appendChild(radioButton);
        subContainer.appendChild(deleteButton);


        taskHeading.innerHTML = value;

        todos.push(value);
        localStorage.setItem('todos', JSON.stringify(todos));

        var leftDiv = document.getElementById('leftDiv');
        leftDiv.appendChild(container);

        textBox.value = "";


    }
}

init();

var storedTodos = localStorage.getItem('todos');

if(storedTodos !== null){
    todos = JSON.parse(storedTodos);
}

todos.forEach( function(value){
    var container = document.createElement("div");
        var taskHeading = document.createElement('h4');
        var subContainer = document.createElement("div");
        var radioButton = document.createElement('input');
        var deleteButton = document.createElement('button');

        radioButton.setAttribute('type', 'checkbox');
        radioButton.setAttribute('class', 'checkBtn');
        deleteButton.setAttribute('class', 'closeBtn');

        deleteButton.innerHTML = "X";

        container.setAttribute('id', 'containerId');

        container.appendChild(taskHeading);
        container.appendChild(subContainer);
        subContainer.appendChild(radioButton);
        subContainer.appendChild(deleteButton);

        taskHeading.innerHTML = value;


        var leftDiv = document.getElementById('leftDiv');
        leftDiv.appendChild(container);
});