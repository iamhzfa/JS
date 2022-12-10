//code run on only codeQuotient
var compileBtn = document.getElementById('compileBtn');
var outputConsole = document.getElementById('outputArea');

compileBtn.addEventListener('click', function(){
    var codeText = document.getElementById('codeArea').value;
    var langCode = document.getElementById('language').value;
    // console.log(codeText)
    // console.log(langCode)
    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode")
    var data = {"code":`${codeText}`, "langId":`${langCode}`};
    // console.log(data);
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(data));

    setTimeout(function(){
        var res = JSON.parse(request.responseText);
        console.log(res);
        if('error' in res){
            outputConsole.value = `${res.error}`;
        }
        else{
            showRes(res.codeId);
        }
    }, 5000);
})

function showRes(codeId){
    var resRequest = new XMLHttpRequest();
    resRequest.open("GET", `https://codequotient.com/api/codeResult/${codeId}`)
    resRequest.send();

    resRequest.addEventListener('load', function(e){
        var result = JSON.parse(e.target.responseText);
        console.log(result);
        result = JSON.parse(result.data);
        if(result.output !== ''){
            console.log(result.output)
            outputConsole.innerText = result.output;
        }
        else{
            outputConsole.innerText = result.errors;
        }
    })
}