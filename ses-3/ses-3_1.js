function fun(){
    console.log("Hi this is Huzefa");
    return 1;
  }
  
  var a = ['hello', 'world'];
  
  iterator(a, callback);
  
  function callback(data, index){
    console.log(`Value is : ${data} at index : ${index}`)
  }
  
  function iterator(array, callback){
    for(var i=0; i<array.length; i++){
      callback(array[i], i);
    }
  }
  