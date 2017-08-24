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
		var message = currentplayer + " you are the winner!!"
		$(".well").toggle();
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
	var winningScore = 15;
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
			$("#rollZero").toggle();
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
	this.reset = function(){
		diceRead = 0;
		player1.turnScore = 0;
		player2.turnScore = 0;
		player1.totalScore = 0;
		player2.totalScore = 0;
		if (currentPlayer === player2) {
			this.changeTurn();
		} 

		// currentPlayer.totalScore = 0;
		$(".well").hide();
	}
}


//User Interface Logic
$(document).ready(function(){
	$("#play").click(function(e){
		e.preventDefault();
		var player1Name =  $("input#name1").val();
	 	var player2Name =  $("input#name2").val();
		$(".player1").text(player1Name);
		$(".player2").text(player2Name);
		$(".name").hide();
		$("#scoreBoard").toggle();
		var Player1  = new Player(player1Name);
		var Player2 = new Player(player2Name);
		var game = new Game(Player1,Player2,Player1);

		$("#roll").click(function(e){
			e.preventDefault();
			$("#rollZero").hide();
			game.rollDice();
			gameDisplay(Player1, Player2);
		});
			$("#pass").click(function(e){
				e.preventDefault();
				game.pass();
				gameDisplay(Player1, Player2);
			});
			$("#reset").click(function(){
				game.reset();
				gameDisplay(Player1, Player2);
			});
		});
	});
