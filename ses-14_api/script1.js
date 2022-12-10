var request = new XMLHttpRequest();
// hi
function getData(){
    request.open("get", "https://jsonplaceholder.typicode.com/photos");
    request.send();
    
    request.addEventListener('load', function(e){
        var data = JSON.parse(e.target.responseText);
        console.log(data)
        getPosts(data);
    })
}

function getPosts(data){
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

    var thumb = document.createElement('img');
    thumb.src = post.thumbnailUrl;
    div.appendChild(thumb);

    var button = document.createElement('button');
    button.innerHTML = 'View';
    button.style.cursor = 'pointer';

    button.onclick  = function(){
        getEachPost(post.url);
    }
    div.appendChild(button);

    var line = document.createElement('hr');
    div.appendChild(line); 

    var container = document.getElementById('container');
    container.appendChild(div);
}

function getEachPost(postUrl){
    showEachPost(postUrl);
}

function showEachPost(imgUrl){
    var emptyCon = document.getElementById('container')
    emptyCon.innerHTML = '';
    console.log({"Sab shi hai": imgUrl})
    var img = document.createElement('img');
    img.src = imgUrl;
    emptyCon.appendChild(img);

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