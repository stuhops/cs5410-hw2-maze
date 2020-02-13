function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
            moveCharActions(character);
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
            moveCharActions(character);
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
            moveCharActions(character);
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
            moveCharActions(character);
        }
    }
}


function moveCharActions(character) {
    character.location.breadcrumb = true;
    updateList[0].val -= 5;

    if(character.location == finishImg.location) {
        gameOver();
    }
}


function gameOver() {
    manageHighScores(Number(document.getElementById('my-score').innerHTML));

    document.getElementById('my-prev-score').innerHTML = document.getElementById('my-score').innerHTML;
    document.getElementById('prev-timer').innerHTML = document.getElementById('timer').innerHTML;

    document.getElementById('my-score').innerHTML = '1000';
    document.getElementById('timer').innerHTML = '0';

    manageHighScores(Number(document.getElementById('my-score').innerHTML));

    navigate('game-over');
}


function manageHighScores(newScore) {
  if(newScore && newScore < 1000) {
    for(let i = 0; i < highScores.length; i++) {
      if(highScores[i] === 'Unclaimed' || newScore > highScores[i]) {
        highScores.splice(i, 0, newScore);
        highScores.pop();
        window.localStorage.setItem('maze-high-scores', JSON.stringify(highScores));
        break;
      }
    }
  }
  for(let i = 0; i < highScores.length; i++) {
    for(let j = 0; j < document.getElementsByName(`high-score-${i+1}`).length; j++) {
        document.getElementsByName(`high-score-${i+1}`)[j].innerHTML = highScores[i];
    }
  }
}


function playMaze(row, col) {
    ROW = row;
    COL = col;

    initialize();
    navigate('game-play');
}
