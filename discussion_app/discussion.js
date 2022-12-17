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

var questionSearchNode = document.getElementById('questionSearch');
var upvote = document.getElementById('upvote');
var downvote = document.getElementById('downvote');

var newQuestionFormBtn = document.getElementById('newQuestionForm');

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
        responses : [],
        upvotes: 0,
        downvotes: 0
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
    questionContainerNode.setAttribute('id', question.title);
    questionContainerNode.style.margin = '1vh 0';
    questionContainerNode.style.cursor = 'pointer'

    var newQuestionTitleNode = document.createElement('h3');
    newQuestionTitleNode.innerHTML = question.title;
    questionContainerNode.appendChild(newQuestionTitleNode);

    var newQuestionDescriptionNode = document.createElement('p');
    newQuestionDescriptionNode.innerHTML = question.description;
    questionContainerNode.appendChild(newQuestionDescriptionNode);

    var upvoteTextNode = document.createElement('h5');
    upvoteTextNode.innerHTML = 'upvotes = '+ question.upvotes;
    questionContainerNode.appendChild(upvoteTextNode);

    var downvoteTextNode = document.createElement('h5');
    downvoteTextNode.innerHTML = 'downvotes = '+ question.downvotes;
    questionContainerNode.appendChild(downvoteTextNode);

    allQuestionsListNode.appendChild(questionContainerNode);

    //apply event listener on question container
    questionContainerNode.addEventListener('mouseover', function(){
        questionContainerNode.style.backgroundColor = 'gray'
    })
    questionContainerNode.addEventListener('mouseout', function(){
        questionContainerNode.style.backgroundColor = 'rgb(226, 225, 222)'
    })
    questionContainerNode.onclick = onQuestionClick(question);
    
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
        // clear question details
        clearQuestionDetailes();
        // clear response details
        clearResponsesDetailes();
        // show the clicked question
        addQuestionInRight(question);
        // show previouse responses
        question.responses.forEach(function(response){
            addResponseInPanel(response);
        });

        // listen the comment button
        submitCommentNode.onclick = onResponseSubmit(question);
        // add event listener run again n again while we clicked the question button
        // so we can't use add event listener here
        // but we use modified add event listener like
        // submitCommentNode.addEventListener('click', onResponseSubmit(question), { once: true })

        //on upvote click
        upvote.onclick = upvoteQuestion(question);
        //on downvote click
        downvote.onclick = downvoteQuestion(question);
    }
}

//listen for the submit response of the question open at the right panel
function onResponseSubmit(question){
    return function(){
        var response = {
            name :  commentatorNameNode.value,
            description : commentNode.value 
        }

        saveResponse(question, response);
        addResponseInPanel(response);
    }
}

// hide the details of the add question form
function hideQuestionPanel(){
    createQuestionFormNode.style.display = 'none';  
} 
// show the details of the question form
function showQuestionPanel(){
    createQuestionFormNode.style.display = 'block';   
}

// show the functions of the question on right side
function showDetailsOfQuestion(question){
    questionDetailsContainerNode.style.display = 'block';
    resolveQuestionContainerNode.style.display = 'block';
    responseContainerNode.style.display = 'block';
    commentContainerNode.style.display = 'block';
}
// hide the functions of the question on right side
function hideDetailsOfQuestion(question){
    questionDetailsContainerNode.style.display = 'none';
    resolveQuestionContainerNode.style.display = 'none';
    responseContainerNode.style.display = 'none';
    commentContainerNode.style.display = 'none';
}

// show the question data
function addQuestionInRight(question){

    var titleNode = document.createElement('h2');
    titleNode.innerHTML = question.title;

    var descriptionNode = document.createElement('p')
    descriptionNode.innerHTML = question.description;

    questionDetailsContainerNode.appendChild(titleNode)
    questionDetailsContainerNode.appendChild(descriptionNode)
}

// save the response to it's corresponding question in local storage
function saveResponse(clickedQuestion, response){
    var allQuestions = getAllQuestions();

    var revisedQuestions = allQuestions.map(function(question){
        if(clickedQuestion.title === question.title){

            question.responses.push(response)
        }

        return question;
    })

    commentatorNameNode.value = '';
    commentNode.value = '';

    localStorage.setItem('questions', JSON.stringify(revisedQuestions));
}

//display response 
function addResponseInPanel(response){
    var userNameNode = document.createElement('h3');
    userNameNode.innerHTML = response.name;

    var userCommentNode = document.createElement('p');
    userCommentNode.innerHTML = response.description;

    var container = document.createElement('div')
    
    container.appendChild(userNameNode)
    container.appendChild(userCommentNode)

    responseContainerNode.appendChild(container)
}

// clear the previous question
function clearQuestionDetailes(){
    questionDetailsContainerNode.innerHTML = '';
}
// clear the previous responses
function clearResponsesDetailes(){
    responseContainerNode.innerHTML = '';
} 

// search bar
questionSearchNode.addEventListener('keyup', function(e){
    // show filtered results
    filterResult(e.target.value);
})

// filter for searching
function filterResult(query){

    var allQuestions = getAllQuestions();
    if(query){ // if any value exist in search box then function search particular value present in our question or not
        // clear all question
        clearQuestionsPanel();

        showfilteredResult(allQuestions, query)
    }
    else{ // if query box is empty then show all questions
        clearQuestionsPanel()
        allQuestions.forEach(function(question){
            
            addQuestionInPanel(question);
        })
    }

}

// show filtered results
function showfilteredResult(allQuestions, query){
    var filteredQuestions = allQuestions.filter(function(question){
        if(question.title.includes(query)){
            return true;
        }
    })
    // same working 
    // allQuestions.forEach(function(question){
    //     if(question.title.includes(query)){
    //         addQuestionInPanel(question);
    //     }
    // })
    if(filteredQuestions.length){
        filteredQuestions.forEach(function(question){
            addQuestionInPanel(question);
        })
    }
    else{
        printNoMatchFound()
    }
}

// cleared question panel after every search
function clearQuestionsPanel(){
    allQuestionsListNode.innerHTML = '';
}

// print no match found
function printNoMatchFound(){
    var title = document.createElement('h1');
    title.innerHTML = 'No Match Found';

    allQuestionsListNode.appendChild(title);
}

// upvotes question function
function upvoteQuestion(question){
    return function(){
        question.upvotes++;
        updateQuestion(question);
        updateQuestionUI(question);
    }
}

// downvotes question functions
function downvoteQuestion(question){
    return function(){
        question.downvotes++;
        updateQuestion(question);
        updateQuestionUI(question);
    }
}

// update question
function updateQuestion(updatedQuestion){
    var allQuestions = getAllQuestions();

    var revisedQuestions = allQuestions.map(function(question){
        if(updatedQuestion.title === question.title){

            return updatedQuestion;
        }

        return question;
    })

    localStorage.setItem('questions', JSON.stringify(revisedQuestions));
}

function updateQuestionUI(question){

    // get question container from DOM
    var questionContainerNode = document.getElementById(question.title)

    // console.log(questionContainerNode.childNodes)
    questionContainerNode.childNodes[2].innerHTML = 'upvotes = '+ question.upvotes;
    questionContainerNode.childNodes[3].innerHTML = 'downvotes = '+ question.downvotes;
    
}

newQuestionFormBtn.addEventListener('click', openQuestionForm); // add event listener on new question form btn

// OPEN QUESTION FORM
function openQuestionForm(){
    hideDetailsOfQuestion();
    showQuestionPanel();
}

resolveQuestionNode.addEventListener('click', resolveQuestionHandler); // add event listener on resolve question button  

function resolveQuestionHandler(){
    var allQuestions = getAllQuestions();

    var resolveQuestion = questionDetailsContainerNode.childNodes[0].innerHTML;

    // console.log(questionDetailsContainerNode.childNodes[0].innerHTML)
    // console.log(e.target.parentNode);

    var ind;

    allQuestions.forEach(function(question){
        if(question.title === resolveQuestion){
            ind = allQuestions.indexOf(question); // for finding the index of the question in local sotrage
            // console.log(question)
            // console.log(allQuestionsListNode.children.length)
            allQuestionsListNode.removeChild(  allQuestionsListNode.children[ind] ) // remove the question from GUI of the left panel
        }
    })

    allQuestions.splice(ind, 1);

    localStorage.setItem("questions", JSON.stringify(allQuestions)); //update the todos array
    // Question is resolved

    // now open the question form 
    openQuestionForm();
    
}