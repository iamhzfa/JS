//listen for the submit button to create a question
//append question to the left panel 
//update the local storage
//listen for click on the question and open it on right panel
//listen for the submit response of the question open at the right panel
//display response 

var submitQuestionNode = document.getElementById('submitBtn');
var questionTitleNode = document.getElementById('subject');
var questionDescriptionNode = document.getElementById('question');
var allQuestionsListNode = document.getElementById('dataList');
var createQuestionFormNode = document.getElementById('toggleDisplay')
var questionDetailsContainerNode = document.getElementById('respondQue')
var resolveQuestionContainerNode = document.getElementById('resolveHolder')
var resolveQuestionNode = document.getElementById('resolveQuestionBtn')
var responseContainerNode = document.getElementById('respondAns')
var commentContainerNode = document.getElementById('commentHolder')
var commentatorNameNode = document.getElementById('pickName')
var commentNode = document.getElementById('pickComment')
var submitCommentNode = document.getElementById('commentBtn')

// function which is call when page is open or refresh
function onLoad(){

    var allQuestions = getAllQuestions();

    allQuestions.forEach(function(question){
        addQuestionInPanel(question);
    });
}

// call the function which is responsible for showing the questions
onLoad();


submitQuestionNode.addEventListener('click', onQuestionSubmit); // add event listener on question submit button  

//listen for the submit button to create a question
function onQuestionSubmit(){
    var question = {
        title : questionTitleNode.value,
        description : questionDescriptionNode.value,
        responses : []
    }
    addQuestionInPanel(question);
    saveQuestion(question);
    clearForm();
}

//update the local storage
function saveQuestion(question){
    // get all questions first and push the new question
    // then store again in storage
    var allQuestions = getAllQuestions();

    allQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

//append question to the left panel 
function addQuestionInPanel(question){
    var questionContainerNode = document.createElement('div');
    questionContainerNode.style.margin = '1vh 0';
    questionContainerNode.style.cursor = 'pointer'

    var newQuestionTitleNode = document.createElement('h3');
    newQuestionTitleNode.innerHTML = question.title;
    questionContainerNode.appendChild(newQuestionTitleNode);

    var newQuestionDescriptionNode = document.createElement('p');
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainerNode.appendChild(newQuestionDescriptionNode);

    allQuestionsListNode.appendChild(questionContainerNode);

    //apply event listener on question container
    questionContainerNode.addEventListener('mouseover', function(){
        questionContainerNode.style.backgroundColor = 'gray'
    })
    questionContainerNode.addEventListener('mouseout', function(){
        questionContainerNode.style.backgroundColor = 'rgb(226, 225, 222)'
    })
    questionContainerNode.addEventListener('click', onQuestionClick(question));
    
}

//clear form
function clearForm(){
    questionTitleNode.value = "";
    questionDescriptionNode.value = "";
}

//return all the questions store in local storage
function getAllQuestions(){
    var allQuestions = localStorage.getItem('questions')

    if(allQuestions){
        allQuestions = JSON.parse(allQuestions);
    }
    else{
        allQuestions = []
    }

    return allQuestions;
}

//listen for click on the question and open it on right panel
function onQuestionClick(question){
    return function(){
        //clouser you can access question variable
        // hide question panel
        hideQuestionPanel();
        // show the options which is visible when we clicked on question
        showDetailsOfQuestion(question);
        // show the clicked question
        addQuestionInRight(question);

        // listen the comment button
        submitCommentNode.addEventListener('click', onResponseSubmit(question));
    }
}

//listen for the submit response of the question open at the right panel
function onResponseSubmit(question){
    return function(){
        saveResponse(question);
    }
}

//display response 
function addResponseInPanel(){

}

//hide the details of the add question form
function hideQuestionPanel(){
    createQuestionFormNode.style.display = 'none';   
}

// show the functions of the question on right side
function showDetailsOfQuestion(question){
    questionDetailsContainerNode.style.display = 'block';
    resolveQuestionContainerNode.style.display = 'block';
    responseContainerNode.style.display = 'block';
    commentContainerNode.style.display = 'block';
}

// show the question data
function addQuestionInRight(question){
    // clear the previous question
    questionDetailsContainerNode.innerHTML = '';

    var titleNode = document.createElement('h2');
    titleNode.innerHTML = question.title;

    var descriptionNode = document.createElement('p')
    descriptionNode.innerHTML = question.description;

    questionDetailsContainerNode.appendChild(titleNode)
    questionDetailsContainerNode.appendChild(descriptionNode)
}

// save the response to it's corresponding question in local storage
function saveResponse(clickedQuestion){
    var allQuestions = getAllQuestions();

    var revisedQuestions = allQuestions.map(function(question){
        if(clickedQuestion.title === question.title){

            question.responses.push({
                name :  commentatorNameNode.value,
                description : commentNode.value 
            })
        }

        return question;
    })

    commentatorNameNode.value = '';
    commentNode.value = '';

    localStorage.setItem('questions', JSON.stringify(revisedQuestions));
}