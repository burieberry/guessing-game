// Game constructor function and methods:

var Game = function() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
};

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
};

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
};

Game.prototype.playersGuessSubmission = function(num) {
  if (num < 1 || num >= 100 || typeof num !== 'number')
    throw 'That is an invalid guess.';
  else {
    this.playersGuess = num;
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function() {
  var resetMessage = 'Click the Reset button to play again.',
      winMessage = 'You Win!',
      loseMessage = 'You Lose.';

  if (this.playersGuess === this.winningNumber) {
    $('#title').text(winMessage);
    $('#subtitle').text(resetMessage);
    return winMessage;
  }

  else if (this.pastGuesses.includes(this.playersGuess)) {
    $('#title').text('Guess again!');
    return 'You have already guessed that number.';
  }

  else {
    this.pastGuesses.push(this.playersGuess);
    var diff = this.difference();

    if (this.pastGuesses.length < 5) {
      if (diff < 10) return 'You\'re burning up!';
      else if (diff < 25) return 'You\'re lukewarm.';
      else if (diff < 50) return 'You\'re a bit chilly.';
      else return 'You\'re ice cold!';
    }
    else {
      $('#title').text(loseMessage);
      $('#subtitle').text(resetMessage);
      return loseMessage + ' The number was ' + this.winningNumber + '.';
    }
  }
};

Game.prototype.provideHint = function() {
  var hintArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  console.log(hintArr);
  return shuffle(hintArr);
}


// other functions:

function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(arr) {
  var m = arr.length,
      t,
      i;

  while(m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}

function newGame() {
  return new Game();
}

function submitGuess(game) {
  game.playersGuess = $('#player-input').val();
  $('#player-input').val('');
  var guessResult = game.playersGuessSubmission(parseInt(game.playersGuess, 10));
  console.log(guessResult);
}

// jQuery code
$(document).ready(function() {
  // load new game
  var guessingGame = newGame();

  $('#submit').click(function() {
    submitGuess(guessingGame);
  });

  $(document).keypress(function(e) {
    if (e.which == 13) {
      submitGuess(guessingGame);
    }
  });
});
