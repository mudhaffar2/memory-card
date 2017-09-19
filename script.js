
////////////// code

var cardBoard = document.querySelector('#cardBoard');
var matches = document.querySelector('#matches');
var clickCounter = 0;
var matchCounter = 0;
var renderedPics;
var firstCard;
var secondCard;
var imgArray = [
  'img/monsters-01.png',
  'img/monsters-02.png',
  'img/monsters-03.png',
  'img/monsters-04.png',
  'img/monsters-05.png',
  'img/monsters-06.png',
  'img/monsters-07.png',
  'img/monsters-08.png',
  'img/monsters-09.png',
  'img/monsters-10.png',
  'img/monsters-11.png',
  'img/monsters-12.png',
  'img/monsters-13.png',
  'img/monsters-14.png',
  'img/monsters-15.png',
  'img/monsters-16.png'
  ];
var foundArray = [];
var cardsArray = createBoard(4,5);
randomPics(cardsArray);
cardsArray.forEach(function(cardRow) {
  cardRow.forEach(function(card) {
    card.addEventListener('click', divClicked); 
  });
});

//////////////// functions

function createBoard (rows,cols) {
  var boardArray = [];
  for (i=0; i<rows; i++) {
    boardArray[i] = [];
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('rowDiv');
    for (j=0; j<cols; j++) {
      var colDiv = document.createElement('div');
      colDiv.classList.add('colDiv');
      var flipDiv = document.createElement('div');
      flipDiv.classList.add('flipDiv');
      var divImg = document.createElement('div');
      divImg.classList.add('divImg');
      var frontImg = document.createElement('img');
      divImg.appendChild(frontImg);
      flipDiv.appendChild(divImg);
      var divBack = document.createElement('div');
      divBack.classList.add('divBack');
      var backImg = document.createElement('img');
      backImg.src = 'img/logo-bw.png';
      divBack.appendChild(backImg);
      flipDiv.appendChild(divBack);
      colDiv.appendChild(flipDiv);
      boardArray[i].push(colDiv);
      rowDiv.appendChild(colDiv);
    }
    cardBoard.appendChild(rowDiv);
  }
  return boardArray;
}

function randomPics(matrix) {
  var rows = matrix.length;
  var cols = matrix[0].length;
  renderedPics = rows*cols/2;
  var colDivs = document.querySelectorAll('.colDiv');
  colDivs.forEach(function(e) {
    e.style.width = 100/(cols+1)+'%';
    e.style.height = e.scrollWidth+'px';
  });
  for (var i=0; i<renderedPics; i++) {
    for (var j=0; j<2; j++) {
      setPic(i,rows,cols,matrix);
    }
  }
}

function setPic(i,rows,cols,matrix) {
  var y = Math.floor(Math.random()*(rows));
  var x = Math.floor(Math.random()*(cols));
  var src = matrix[y][x].childNodes[0].childNodes[0].childNodes[0];
  if (src.src=='') {
    src.setAttribute('src',imgArray[i]);
    return;
  } else {
    setPic(i,rows,cols,matrix);
  }
}

function divClicked() {
  var clickedPic = this.childNodes[0].childNodes[0].childNodes[0];
  if (foundArray.includes(clickedPic.src)) {
    return;
  } else if (clickCounter == 0) {
    this.classList.toggle('flip');
    clickCounter = 1;
    firstCard = clickedPic;
  } else if (clickCounter == 1) {
    if (this.classList.contains('flip')) {
      this.classList.toggle('flip');
      clickCounter = 0;
      firstCard ='';
    } else {
      this.classList.toggle('flip');
      clickCounter = 2;
      secondCard = clickedPic;
      setTimeout(function check() {
        if (firstCard.src == secondCard.src) {
          var winMessage = '';
          matchCounter++;
          clickCounter = 0;
          foundArray.push(firstCard.src);
          if (foundArray.length == renderedPics) {
            winMessage = ' You win!!!';
          }
          matches.childNodes[1].textContent = matchCounter + winMessage;
        } else {
          clickCounter = 0;
          firstCard.parentNode.parentNode.parentNode.classList.toggle('flip');
          secondCard.parentNode.parentNode.parentNode.classList.toggle('flip');
        }
      }, 1000);
    }
  }
  
}







