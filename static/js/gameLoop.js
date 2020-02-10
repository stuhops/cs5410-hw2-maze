let gameLoop = elapsedTime => {
  update(elapsedTime);
  render();

  requestAnimationFrame(gameLoop);
}


let update = elapsedTime => {
  time = elapsedTime - lastTime;
  lastTime = elapsedTime;

  for(let i = 0; i < eventArr.length; i++) {
    eventArr[i].time -= time;
    if (eventArr[i].time <= 0) {
      eventArr[i].iterations--;
      eventArr[i].time += Number(eventArr[i].interval);

      toPrint.push(eventArr[i]);

      if(eventArr[i].iterations <= 0) {
        eventArr.splice(i, 1);
        i--;
      }
    }
  }
}


let render = () => {
  let console_div = document.getElementById('console-div');

  while(toPrint.length) {
    p = toPrint.pop();
    console_div.innerHTML += `Event: ${p.name} (${p.iterations} remaining)<br>`;
    console_div.scrollTop = console_div.scrollHeight;
  }
}


let addEvent = () => {
  eventArr.push({
    'name': document.getElementById('name_input').value,
    'interval': document.getElementById('interval_input').value,
    'iterations': document.getElementById('iterations_input').value,
    'time': document.getElementById('interval_input').value,
  });

  document.getElementById('name_input').value='';
  document.getElementById('interval_input').value='';
  document.getElementById('iterations_input').value='';
}


let eventArr = [];
let toPrint = [];

let lastTime = performance.now();

gameLoop();