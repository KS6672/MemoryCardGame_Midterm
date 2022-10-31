/*
This is a memory game. The aim of this game is to unmask all the cards by sequentially clicking on a pair of cards that match each other. Every sequential match will increase your streak.

Tip: Rather than trying to unmask all pairs at random times, Try to get unmask cards, remember their position in the grid and increase your streak to get the longest possible streak of 6 (since there are six pairs of cards).

*/



let longestStreak = 0;      // counting the streak to display at the end of the game
let streak = 0 ;            // counting the ongoing streak

var s;                      // Scribble to make the grid
let sect = 4;               // Number of Sections to divide the canvas
let ncol = 3;               // number of columns to display cards
let nrow = 4;               // Number of rows to display cards

let numCards = 6;           // Total number of pairs of cards to be matched
let c1, c2, c3, c4, c5, c6; // name of the images to be loaded
var cards = [];             // Array to store all images in image format
var cardName = [];          // Array to store name of each card in 'cards' array
let orderOfCards =[];       // Array to store images in random order
let nameOfCards  =[];       // Array to store name of the each image in the 'orderOfImages' array
var cardMatched = [];       // Array to mark the card as matched when the match is found
let totalMatches = 0;       // Stop the game when total matches reach the total number of pairs

let clicks = 0;             //when a card is flipped this  will increment, maximum value is 2


//Preload the mask of each image (cover) and all images
function preload(){
  cover = loadImage('./card_cover.webp')
 
  for (let i = 0; i<numCards; i++){
    cards[i] = loadImage("c"+int(i+1)+".jpg")
    cardName[i]="c"+int(i+1);
    cards[i+numCards] = loadImage("c"+int(i+1)+".jpg")
    cardName[i+numCards]="c"+int(i+1);
  }
  print(cardName);
}


function setup() {
  createCanvas(400, 500);
  s = new Scribble();
  
  // Button to reset the board
  // buttonRestart = createButton('Restart');
  // buttonRestart.position(width/2-30, height+10);
}


function draw() {
  background(255);
  
  placeCards();
  
  maskCards();
    
  //The following were to check if the calculations for displaying the images were correct or not prior to using 'i' and 'j' in the loop prior to this
   // image(cj, (2.5+0.25)*width/sect,0.25*height/sect, width/8,height/8)
   // image(cj, (0.5+0.25)*width/sect,(2+0.25)*height/sect, width/8,height/8)
   // image(cover, (1+0.5+0.25)*width/sect,(0+0.25)*height/sect, width/8,height/8);
  
  noLoop();
}

//Place the cards at random position
function placeCards(){
  
  for(i=0; i<ncol; i++){
    orderOfCards[i] = [] ;
    nameOfCards[i]  = [] ;
    cardMatched[i]  = [] ;
    for (j=0; j<nrow; j++){
      //Get the x and y coordinates to place the cards
      var xcoord = (i+1)*(width/sect) ;
      var ycoord = (j+0.5)*(height/sect) ;
      // console.log(xcoord, ycoord);
      //Create gridlines on the canvas
      s.scribbleRect(xcoord,ycoord,width/sect,height/sect); 
      //Select a random card from the cards array
      let pos = int(random(cards.length))
      // console.log(pos)
      //Display the above chosen random card
      image(cards[pos], xcoord-(0.25*width/sect), ycoord-(0.25*height/sect), width/8,height/8)
      //Place the cards in an array in the order they were placed. This will be used during unmasking the card
      orderOfCards[i][j] = cards[pos];
      //Store the names of the cards in the orderOfImages array
      nameOfCards[i][j]  = cardName[pos];
      //Mark each card as unmatched, mark them as 1 when matched
      cardMatched[i][j]  = 0;
      
      //Drop the randomly chosen card from the cards array and cardNames array to ensure it does not get picked up again
      cards.splice(pos,1)
      cardName.splice(pos,1)
      // console.log("OrderOfCards:",orderOfCards)
      
      // console.log("The length later is ", orderOfCards.length)
      // image(orderOfCards[0], xcoord-(0.25*width/sect), ycoord-(0.25*height/sect), width/8,height/8)
    }
  }
  console.log("OrderOfCards:",orderOfCards)
  console.log("NameOfCards:",nameOfCards)
}

//Mask the cards for the game
function maskCards(){
  for(i=0; i<ncol; i++){
    for (j=0; j<nrow; j++){
      var xcoord = (i+1)*(width/sect) ;
      var ycoord = (j+0.5)*(height/sect) ;
      image(cover, xcoord-(0.25*width/sect), ycoord-(0.25*height/sect), width/8,height/8);
    }
  }
}

// The following will hold the position of the two last flipped cards
let prevFLipCol1 ;
let prevFLipRow1 ;
let prevPosX1;
let prevPosY1;
let cardFlipped1;

let prevFLipCol2 ;
let prevFLipRow2 ;
let prevPosX2;
let prevPosY2;
let cardFlipped2;
// end of holding previous positions;

//Do the following on every Mouse Click
function mouseClicked(){
  // console.log("Clicks before loop",clicks);
  //Increment number of clicks by 1
  clicks = clicks + 1;
  
  //Fetching the x and y coordinate of the mouse click
  let mouseClickPosX = mouseX;
  let mouseClickPosY = mouseY;
  // console.log(mouseClickPosX,mouseClickPosY)
  
  //Declaring the col and the row where the mouse has been clicked
  let col;
  let row;
   
  //Fetchng the grid of the mouse click
  //Column 1
  if(mouseClickPosX >= ((1-0.5)*(width/sect)) && (mouseClickPosX < (1+0.5)*(width/sect))){
    col = 0;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }
  //Column 2
  else if(mouseClickPosX >= ((2-0.5)*(width/sect)) && (mouseClickPosX < (2+0.5)*(width/sect))){
    col = 1;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }  
  //Column 3
  else if(mouseClickPosX >= ((3-0.5)*(width/sect)) && (mouseClickPosX < (3+0.5)*(width/sect))){
    col = 2;
    if(mouseClickPosY < (1)*(height/sect)){
      row = 0;
    }
    else if(mouseClickPosY < (2)*(height/sect)){
      row = 1;
    }
    else if(mouseClickPosY < (3)*(height/sect)){
      row = 2;
    }
    else if(mouseClickPosY < (4)*(height/sect)){
      row = 3;
    }
  }
  
  //If the mouse was clicked beyond the grids, print the following to the console
  else{
    console.log('Not here')
  }
  
  //Variables to store the current card flipped position 
  let flipPosX ;
  let flipPosY ;
  
  //Do the following for the first click of the mouse
  if(clicks === 1){
    flipPosX = (col+1)*(width/sect);        // Get the x position of the mouse click
    flipPosY = (row+0.5)*(height/sect) ;    // Get the y position of the mouse click
    showCard(col, row,flipPosX, flipPosY);  // Display the card in the above position on clicking the grid
    prevFlipCol1 = col;                     // Store the current grid index in column
    prevFlipRow1 = row;                     // Store the current grid index in row
    prevPosX1 = flipPosX;                   // Store the current x coordinate in col
    prevPosY1 = flipPosY;                   // Store the current y coordinate in row
    print("Position1:")                     // Print the first clicked position
    print(prevFlipCol1, prevFlipRow1)       // Print the first clicked column and row
    cardFlipped1 = nameOfCards[prevFlipCol1][prevFlipRow1]; // Store the name of the card that has just been flipped
    print(cardFlipped1);                    // Print the name of the card that has just been flipped
  }
  //Do the following for the second click of the mouse
  else if(clicks === 2){
    flipPosX = (col+1)*(width/sect);
    flipPosY = (row+0.5)*(height/sect) ;
    showCard(col, row,flipPosX, flipPosY);
    prevFlipCol2 = col;
    prevFlipRow2 = row;
    prevPosX2 = flipPosX;
    prevPosY2 = flipPosY;
    print("Position2:")
    print(prevFlipCol2, prevFlipRow2)
    cardFlipped2 = nameOfCards[prevFlipCol2][prevFlipRow2];
    print(cardFlipped2);
    if(cardMatched[col][row] === 0){
      if(cardFlipped1 === cardFlipped2) {
         if(((prevFlipCol1 === prevFlipCol2) && (prevFlipRow1 === prevFlipRow2))){
          // text("Can't match a card with itself! Try Again!!", width/2-30, height/2-30, 50);
          print("Can't match a card with itself! Try Again!!");
          streak = 0;    //Resetting the streak parameter to 0
         }
        else if((prevFlipCol1 !== prevFlipCol2) || (prevFlipRow1 !== prevFlipRow2)){
          cardMatched[prevFlipCol1][prevFlipRow1] = 1;
          cardMatched[prevFlipCol2][prevFlipRow2] = 1;
          // text("There's a card match! Awesome!", width/2-30, height/2-30, 50);
          print("There's a card match! Awesome!");
          totalMatches = totalMatches + 1;  // this is to ensure that all matches are completed
          streak = streak + 1;              // increment the streak by 1
          //check if there is a longer streak than the previous streak
          if(streak >= longestStreak){
            longestStreak = streak;         // set longestStreak to the higher value of streak and longestStreak
          }
          //The following runs after all the cards are matched
          if(totalMatches === numCards){
            noStroke();
            fill(0,0,0, 220);
            rect(width/2-50, height/2-50, width/4, height/4-15);
            fill('white');
            textSize(16);
            textAlign(CENTER);
            text("That's a streak of "+ longestStreak + "! Awesome!", width/2-30, height/2-40, 70);
            //This is the end of the game
          }//end of totalMatches === numCards
        }//end of actual card matched scenario
      }//end of card matched scenario
      else {
        // text("Try Again!", width/2-30, height/2-30, 50);
        //Reset streak to 0, since there's is a mismatch
        streak = 0;
        print("Try Again!")
        // text(`${round(millis()/1000)} seconds have gone by!`, 20, height/2);
      }// end of card no match scenario
    }// end of card flipped and checked scenario
  }//end of actions after second click
  //For every third click, mask the unmatched cards and reset clicks to zero
  else if(clicks>2) {
    //mask the card only if there have not matched i.e. their cardMatched marker is 0
    if(cardMatched[prevFlipCol1][prevFlipRow1] !== 1 ){
      maskFlippedCard(prevFlipCol1, prevFlipRow1, prevPosX1, prevPosY1);
    }//end of mask card1
    //mask the card only if there have not matched i.e. their cardMatched marker is 0
    if(cardMatched[prevFlipCol2][prevFlipRow2] !== 1){
      maskFlippedCard(prevFlipCol2, prevFlipRow2, prevPosX2, prevPosY2);
    }//end of mask card2
    //reset clicks to 0, since more than two unmatched cards cannot be faced up at one point
    clicks = 0;
  }//end of clicks =3
}//end of function mouseClicked()


//Display the card when clicked on it
function showCard(col, row, x, y){
  image(orderOfCards[col][row], x-(0.25*width/sect), y-(0.25*height/sect), width/8,height/8);
}

//Mask the card when unmatched
function maskFlippedCard(col, row, x, y){
  image(cover, x-(0.25*width/sect), y-(0.25*height/sect), width/8,height/8);
}