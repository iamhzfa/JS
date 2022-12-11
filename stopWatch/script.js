
var list = document.getElementById("list");
// var ul = document.querySelector("#list");

var time = document.getElementById("time");

var startBtn = document.getElementById("startBtn");
var lapBtn = document.getElementById("lapBtn");

var isStart = false;
var isLap = false;
var count = 0;

var countSec = 0,
  countMnt = 0,
  countHr = 0;

var intervalId = false;
var interval = "00:00:00:00";

startBtn.addEventListener("click", function () {
  if (isStart == true) {
    //turn off
    clearInterval(intervalId);
    startBtn.innerHTML = "Resume";
    startBtn.style.backgroundColor = "rgb(10, 223, 116)";

    isStart = false;
    isLap = false;
    //change the lap button color and text
    lapBtn.innerHTML = "Reset"; 
    lapBtn.style.backgroundColor = "red";
  } else {
    //turn on
    // logic of stopwatch
    intervalId = setInterval(function () {
      count++;
      if (count % 100 == 0) {
        count = 1;
        countSec++;
      }
      if (countSec >= 60) {
        countSec = 0;
        countMnt++;
      }
      if (countMnt >= 60) {
        countMnt = 0;
        countHr++;
      }
      interval = `${countHr > 9 ? countHr : `0${countHr}`}:${
        countMnt > 9 ? countMnt : `0${countMnt}`
      }:${countSec > 9 ? countSec : "0" + countSec}:${
        count > 9 ? count : "0" + count
      }`;

      time.innerHTML = interval;
    }, 10);

    startBtn.innerHTML = "Stop";
    startBtn.style.backgroundColor = "red";
    lapBtn.innerHTML = "Lap";
    lapBtn.style.backgroundColor = "rgb(96, 185, 221)";

    isLap = true;
    isStart = true;
    //---
    //lap functionality

    //---
  }
});

var cnt = 0;

lapBtn.addEventListener("click", function () {
  if(isLap==true && isStart==true){
    cnt++;
    var li = document.createElement('div');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-around';
    li.style.alignItems = 'center';
    li.style.width = '50vw'

    var heading = document.createElement('h4');
    heading.innerHTML = `Lap ${cnt} `;
    var lapTime = document.createElement("h4");
    lapTime.style.color = 'rgba(255, 255, 255, 0.838)'
    lapTime.innerHTML = interval;

    var hr = document.createElement('hr');
    hr.style.borderColor = 'rgba(245, 245, 245, 0.529)'

    list.appendChild(li);
    li.appendChild(heading)
    li.appendChild(lapTime);
    list.appendChild(hr)
  }
  else {
    //Reset functionality    
      isStart = false;
      isLap = false;
      intervalId = false;

      startBtn.innerHTML = 'Start';
      lapBtn.innerHTML = "Lap";
      lapBtn.style.backgroundColor = "rgb(96, 185, 221)";
      list.innerHTML = "";
    
      count = 0;
      countSec = 0;
      countMnt = 0;
      countHr = 0;

      cnt = 0;
    
      interval = "00:00:00:00";
      time.innerHTML = interval;
    //---
  }

});

