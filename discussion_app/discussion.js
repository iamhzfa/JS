//listen for the submit button to create a question
//append question to the left panel 
//update the local storage
//listen for click on the question and open it on right panel
//listen for the submit response of the question open at the right panel
//display response 

var submitQuestionNode = document.getElementById('submitBtn');

submitQuestionNode.addEventListener('click', onQuestionSubmit);

function onQuestionSubmit(){
    addQuestionInPanel();
    saveQuestion();
}

//update the local storage
function saveQuestion(){
    
}

//append question to the left panel 
function addQuestionInPanel(){
    
}

//listen for click on the question and open it on right panel
function onQuestionClick(){
    
}

//listen for the submit response of the question open at the right panel
function onResponseSubmit(){
    
}

//display response 
function addResponseInPanel(){

}
