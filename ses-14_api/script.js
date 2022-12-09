var request = new XMLHttpRequest();
// hi
function getData(){
    request.open("get", "https://jsonplaceholder.typicode.com/posts");
    request.send();
    
    request.addEventListener('load', function(e){
        var data = JSON.parse(e.target.responseText);
        // console.log(data)
        showPosts (data);
    })
}

function showPosts(data){
    container.innerHTML = "";
    data.forEach(function (post){
        showPost(post);
    })
}

function showPost(post){
    var div = document.createElement('div');

    var title = document.createElement('h3');
    title.innerHTML = post.title;
    div.appendChild(title);

    var body = document.createElement('p');
    body.innerHTML = post.body;
    div.appendChild(body);

    var button = document.createElement('button');
    button.innerHTML = 'comments';
    button.style.cursor = 'pointer';

    button.onclick  = function(){
        getComments(post.id);
    }
    div.appendChild(button);

    var line = document.createElement('hr');
    div.appendChild(line); 

    var container = document.getElementById('container');
    container.appendChild(div);
}

function getComments(postId){
    var request = new XMLHttpRequest();
    request.open('get', `https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    request.send();

    request.addEventListener('load', function(e){
        var commentData = JSON.parse(e.target.responseText);
        // console.log(JSON.parse(e.target.responseText))
        showComments(commentData);
    })
}

function showComments(commentsData){
    var emptyCon = document.getElementById('container')
    emptyCon.innerHTML = '';
    commentsData.forEach(function (comment){
        var comContainer = document.createElement('div');

        var userName = document.createElement('h3');
        userName.innerHTML = comment.name;
        comContainer.appendChild(userName);

        var userEmail = document.createElement('h6');
        userEmail.innerHTML = comment.email;
        comContainer.appendChild(userEmail);

        var comBody = document.createElement('p');
        comBody.innerHTML = comment.body;
        comContainer.appendChild(comBody);

        var container = document.getElementById('container');
        container.appendChild(comContainer);

    })

    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'Back';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.margin = '0 45vw';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.alignItems = 'center';
    closeBtn.addEventListener('click', getData)

    container.appendChild(closeBtn);
}

getData()