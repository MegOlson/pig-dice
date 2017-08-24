//Business Logic
var diceRead;
function gameDisplay(p1, p2){
	$(".dice").text(diceRead);
	$(".player1Current").text(p1.turnScore);
	$(".player2Current").text(p2.turnScore);
	$(".player1Total").text(p1.totalScore);
	$(".player2Total").text(p2.totalScore);
}
function winningMsg(currentplayer){
		var message = currentplayer + "You win!!"
		$("#winningMsg").text(message);
}
function Player(playerId){
	this.playerId = playerId;
	this.turnScore = 0;
	this.totalScore = 0;
	this.addTurnScoretoTotalScore = function(){
		 this.totalScore += this.turnScore;
		 return this.totalScore;
	}

}
function Game(player1 ,player2,currentPlayer){
	var winningScore = 10;
	this.player1 = player1;
	this.player2 = player2;
	this.currentPlayer = currentPlayer;
	this.changeTurn = function(){
		if (currentPlayer == player1) {
			currentPlayer = player2;
            } else {
                currentPlayer = player1;
            }
	}
	this.rollDice = function(){
		 diceRead = Math.floor(6 * Math.random()) + 1;
		if(diceRead == 1){
			currentPlayer.turnScore = 0;
			this.changeTurn();
		}else{
			currentPlayer.turnScore += diceRead;
		}
		var currentTotalScore = currentPlayer.totalScore + currentPlayer.turnScore;
		if(currentTotalScore >= winningScore){
			winningMsg(currentPlayer.playerId);
		}
	}
	this.pass = function(){
		currentPlayer.addTurnScoretoTotalScore();
		currentPlayer.turnScore = 0;
		this.changeTurn();
	}
}


//User Interface Logic
$(document).ready(function(){
	var Player1  = new Player("Player1");
	var Player2 = new Player("Player2");
	var game = new Game(Player1,Player2,Player1);
	$("#roll").click(function(e){
		e.preventDefault();
		game.rollDice();
		gameDisplay(Player1, Player2);
		});

		$("#pass").click(function(e){
			e.preventDefault();
			game.pass();
			gameDisplay(Player1, Player2);
			});

	});
