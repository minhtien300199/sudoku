var DIFFICULTY = {
  easy: 62,
  medium: 53,
  hard: 44,
  'very-hard': 35,
  insane: 26,
  inhuman: 17,
};

var flagger = 0;
var renderLevelSelect = function () {
  var temp=document.querySelector('#selector');
  var indexNum=temp.selectedIndex;
  var selection=temp.options[indexNum].text;
  if (indexNum!== flagger && indexNum!=0) {
      flagger=indexNum;
    if (indexNum===1)
    {
      level=DIFFICULTY.easy;
      matrixGenerator();
    }
    else if (indexNum===2)
    {
      level=DIFFICULTY.medium;
      matrixGenerator();
    }
    else if (indexNum===3)
    {
      level=DIFFICULTY.hard;
      matrixGenerator();
    }
    else if (indexNum===4)
    {
      level=DIFFICULTY["very-hard"];
      matrixGenerator();
    }
    else if (indexNum===5)
    {
      level=DIFFICULTY.insane;
      matrixGenerator();
    }
    else if (indexNum===6)
    {
      level=DIFFICULTY.inhuman;
      matrixGenerator();
    }
  }
};