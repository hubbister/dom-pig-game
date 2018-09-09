/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (gamePlaying) {

// 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

// 2. Display the results
    var diceDOM = document.querySelector('.dice');
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' +  dice + '.png';
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' +  dice1 + '.png';
/*
    // se ha fatto due 6 di fila perde TUTTO
        if (lastroll === 6 && lastroll === dice) {
            scores[activePlayer] = 0;
            roundScore = 0;
            changeActive();
        }*/
    // 3. update the round score if the rolled number is not a 1
        if (dice1 === 1 || dice === 1){
            console.log(dice1, dice);
        //next player
            changeActive();
        }
    
        else {
        //    lastroll = dice;
        //add score
            roundScore += dice + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } 
    }


});


document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
// Add current score to global score
        scores[activePlayer] += roundScore;
// Update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
// Check if player won the game
        winScore = document.querySelector('#inputValue').value;
        
        if (scores[activePlayer] >= winScore) {
            winner();
        } else {

            //next player
            changeActive();
        }   

    };
        
});



function winner() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');            
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    gamePlaying = false;   
};

function changeActive() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    roundScore = 0;
    //lastroll = 0;
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    //lastroll = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // css
    //remove always (if not it will add multiple)
    document.querySelector('.player-0-panel').classList.remove('active');    
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    
}



