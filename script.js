var TicTacToe = {
    //initialize basic variables
    init: function(){
        this.symbols = ["X", "O"];
        this.squares = Array.from(document.querySelectorAll(".square"));
        this.turnIndicator = document.querySelector(".turnIndicator");
        this.button = document.querySelector(".newGame");
        this.board = document.querySelector(".board");
        // square positions in which you can get 3-in-a-row
        this.winningSets = [
            // horizontal sets
            [0,1,2], [3,4,5], [6,7,8],
            // vertical sets
            [0,3,6], [1,4,7], [2,5,8],
            // diagonal sets
            [0,4,8], [2,4,6]
        ];
        // add click event listeners to squares and button
        this.addEventListeners();
        // reset the game
        this.newGame();
    },
    // add click event listeners to squares and button
    addEventListeners: function(){
        var ttt = this;
         // for each square, add a click listener which will call "play()"
        this.squares.forEach(function(x){
            x.addEventListener("click", function(){
                ttt.play(this);
            },false )
        })
        //making button responsive 
        this.button.addEventListener("click", function() {
            ttt.newGame();
        }, false);
    },

    //reset
    newGame: function(){
        this.activePlayer = 0;
        //turns gameover off
        this.gameOver = false;
        //remove x and o from all fields
        this.squares.forEach(function (x) {
            x.classList.remove(TicTacToe.symbols[0]);
            x.classList.remove(TicTacToe.symbols[1]);
        })
        //remove gameover class
        this.board.classList.remove("gameOver");
        //set the x's turn
        this.setTurnIndicator();
    },
    //shows who turn is now
    setTurnIndicator: function() {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn."
    },
    play:function(el){
        if (!this.gameOver && el.classList.length == 1) {
            el.classList.add(this.symbols[this.activePlayer]);
            //check if you won
            if (this.checkWin()) {
                //shows the winner
                this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
                //ends game by gameover
                this.endGame();
            }
            //check if there's a draw
            else if (this.checkDraw()) {
            this.turnIndicator.innerText = "It's a draw!";
            //ends game
            this.endGame();
            }
            else {
                //changing the turn (0-1) index
                this.activePlayer = 1 - this.activePlayer;
                this.setTurnIndicator();
            }
        }
    },
    //checking win
    checkWin: function() {
        var ttt = this;
        //checks any of winning sets is true
        // if it is returns true, otherwise returns false
        return this.winningSets.some(function (x) {
            return x.every(function(i) {
                return Array.from(ttt.squares[i].classList).indexOf(ttt.symbols[ttt.activePlayer]) > -1;
            })
        })
    },
    //checks draw
    checkDraw: function() {
        //returns true if every square have more than 1 class
        //(became marked as x or o)
        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },
    //ends game
    endGame: function() {
        this.gameOver = true;
        this.board.classList.add("gameOver");
    }
}
//call the function init from the beginning of the script
TicTacToe.init();