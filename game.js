// *IIFE function for the board*
// contains 2d array that holds the status for each of the squares 
// contains function that changes the status of a square, takes in symbol
// contains function to reset the board 
// contains function that checks for victory

const board=(()=>{
    let gameBoard=[];
    function _setBoard() {
        for (let i = 0; i < 3; i++) {
            gameBoard[i]=[];
            for (let j = 0; j < 3; j++) {
                gameBoard[i][j] = "0";
            }

        }
    }
    _setBoard();
    function makeMove(x, y, symbol) {
        gameBoard[x][y] = symbol;
    }
    //If square hasn't been used return true otherwise return false
    function squareEmpty(x,y) {
        let status=true;
        if(gameBoard[x][y]!=0)
            {
             status=false;
            }
        return status;
    }
    // check victory by checking each possible victory point 
    function checkVictory(symbol)
    {
        let Hscore=[0,0,0];
        let Vscore=[0,0,0];
        let Dscore=[0,0];
        victory=false;
        console.log("testin");
        //Go through board and check for matches, if matched, then add to appropriate score bin
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(gameBoard[i][j]==symbol)
                {
                    if(i==j)
                    {
                        Dscore[0]++;
                    }
                    if(i+j==2)
                    {
                        Dscore[1]++;
                    }
                    Vscore[j]+=1;
                    Hscore[i]+=1;
                } 
                
            }
            
        }
        //check score bins to see if any have a value of 3, indicating a victory
        for(let i=0;i<3;i++)
        {
            //check Diagonals
            if(i<2){
                
                if(Dscore[i]==3)
                {
                    victory=true;
                    i=3;
                }
            }
            if(Hscore[i]==3||Vscore[i]==3)
            {
                victory=true;
                i=3;
            }
        }
        return victory;

    }
    function resetBoard(){
        _setBoard();
        
    }
    function checkboard(){
        console.log(gameBoard);
    }
    return{
        makeMove,squareEmpty,checkVictory,resetBoard,checkboard


        

    }

})();


//Object Factory for player
//Contains player name.
//Contains symbol for player
//Contains logic to check board to see if square is empty. if it isnt, continues until player chooses empty square
//Contains logic to emphasis that player is on a certain turn
const Player=(name,symbol)=>{
    const fillSquare=(x,y)=>{
        let validMove=false;
        
            if(board.squareEmpty(x,y)==true)
            {
            board.makeMove(x,y,symbol);
            validMove=true;
            }
         return validMove;
    }

    return{name,symbol,fillSquare}
};
//IIFE function for the game 
//track number of moves
//makes 2 players
//gets symbols based on input for the players.
//calls players to make moves, checks for valid moves
//start checking victories after 3 moves
// after 9 moves end game offer to reset board and play again
const Game=(()=>{
    //initialize variables needed in game
    let moves=0;
    const playerOneInput=document.querySelector("#playerOne");
    const playerTwoInput=document.querySelector("#playerTwo");
    const gameBoard=document.querySelector("#board");
    const playerOneSym="X";
    const playerTwoSym="O";
    let onturn=0;
    let playerOne=Player("",playerOneSym);
    let playerTwo=Player("",playerTwoSym);
    const box=document.querySelector(".box");
    function startGame(){
        playerOne.name=playerOneInput.value;
        playerTwo.name=playerTwoInput.value;
        
        

        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++)
            {
                let x=i;
                let y=j;
                let square=document.createElement("div");
                square.className="square";
                square.dataset.x=x;
                square.dataset.y=y;
                square.addEventListener("click",()=>makeMove(x,y,square));
                gameBoard.appendChild(square);
            }
        }
        
    }
    function resultScreen(){
        if(onturn%2==0)
        {
            console.log("WHOOPS");
            box.textContent=playerOne.name+" HAS WON!"; 
        }
        else{
            box.textContent=playerTwo.name+" HAS WON!";
        }
        

    }
    function makeMove(x,y,square){
        let victory=false;
        if(onturn%2==0){
            if(playerOne.fillSquare(x,y)==true){
                
                square.textContent=playerOne.symbol;
                this.moves++;
                if(board.checkVictory(playerOne.symbol))
                {
                    victory=true;
                   
                }
                
            }
        }
        else{
            if(playerTwo.fillSquare(x,y)==true)
            {
               
                square.textContent=playerTwo.symbol;
                this.moves++;
                if(board.checkVictory(playerTwo.symbol))
                {
                    victory=true;
                    

                }

            }
        }
        if(victory==true||this.moves==9){
            resultScreen(victory);
        }
        onturn++;


    }
   
    

    
    return{startGame}
    
    
    

})();
const startGameButton=document.querySelector("#startGame");
startGameButton.addEventListener("click",()=>Game.startGame());



