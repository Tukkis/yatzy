// Init variables and get HTML elements

const scoreSheet = document.getElementById('score-sheet');
const rollButton = document.getElementById('roll');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const startSelection = document.getElementById('start-selection');
const dice = [];
let chosenDice = [];
let tableArr = [];
let sheetArr = [];
const children = scoreSheet.childNodes;
let players = 2;
let player = 0;
let rollsLeft = 0;

//Push die elements into dice array
for(let i = 1; i <= 5; i++){
    let currentDie = document.getElementById(`die${i}`);
    dice.push(currentDie);
    //Give dice event listeners to toggle chosen status
    currentDie.addEventListener('click', () => toggleChosen(currentDie));
}

//Generate scoresheet
function generateTable(){
    for(let i = 0; i < players; i++){
        tableArr.push([]);
        sheetArr.push([]);
        for(let j = 0; j < 15; j++){
            tableArr[i].push('-');
        }
    }
    //Loop through scoresheet from top to bottom 
    [].forEach.call(children, function(child,index){
        //Skip text elements
        if(index%2===1){
            for(let i = 0; i < players; i++){
                //If in the top row create name field
                if(index === 1){
                    let nameField = document.createElement('input');
                    nameField.setAttribute('id', `${child.id}${i}`);
                    nameField.setAttribute('class', child.id);
                    nameField.setAttribute('placeholder', 'Player');
                    child.appendChild(nameField);
                }  else {
                    //else create field for the result corresponding to current row
                    let button = document.createElement('button');
                    button.setAttribute('id', `${child.id}${i}`);
                    button.setAttribute('class', child.id);
                    button.textContent = '-';
                    button.disabled = true;
                    child.appendChild(button);
                    button.addEventListener('click', () => chooseField(button))
                    sheetArr[i].push(button);
                }
            }
        }
    });
    //Remove midsum, bonus and sum from scoresheet array
    for(let i = 0; i < players; i++){
        sheetArr[i].splice(6,2);
        sheetArr[i].pop();
    }
}

//Init table
function startGame(){
    generateTable();
    chosenDice = [];
    rollsLeft = 3;
    dice.forEach(function(die){
        die.classList.add('die', 'first-face');
    })
    rollDice(dice);
    rollButton.disabled = false;
    startSelection.style.display = "none";
}

//Func to toggle dice on click
function toggleChosen(die){
    if(chosenDice.includes(die)){
        die.style.backgroundColor = "white";
        chosenDice.pop(die);
    } else {
        die.style.backgroundColor = "gray";
        chosenDice.push(die);
    }
}

//Rolls die and modifies elements correspondingly
function rollDie(die){
    let num = Math.ceil(Math.random() * 6);
    switch (num) {
        case 1:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<span class="dot"></span>`;
            die.setAttribute('data-key', '1');
            die.classList.add('first-face');
            break;

        case 2:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<span class="dot"> </span>
                            <span class="dot"> </span>`;
            die.setAttribute('data-key', '2');
            die.classList.add('second-face');
            break;

        case 3:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>`;
            die.setAttribute('data-key', '3');
            die.classList.add('third-face');
            break;

        case 4:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                            <div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>`;
            die.setAttribute('data-key', '4');
            die.classList.add('fourth-face');
            break;

        case 5:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                            
                            <div class="column">
                                <span class="dot"></span>
                            </div>
                            
                            <div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>`;
            die.setAttribute('data-key', '5');
            die.classList.add('fifth-face');
            break;

        case 6:
            die.classList.remove(die.classList[1]);
            die.innerHTML = `<div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>
                            <div class="column">
                                <span class="dot"></span>
                                <span class="dot"></span>
                                <span class="dot"></span>
                            </div>`;
            die.setAttribute('data-key', '6');
            die.classList.add('sixth-face');
            break;
        default:
            break;
    }
    die.style.backgroundColor = "white";
}

//Roll dice and decrement rolls left
function rollDice(diceToRoll){
    if(diceToRoll){
        diceToRoll.forEach(function(die){
            rollDie(die);
        })
        chosenDice = [];
        rollsLeft--;
    }
    //If player is out of rolls calculate scoresheet
    if(rollsLeft <= 0){
        checker(player);
    }
}

//Func that calculates all possible scores for the player to choose
function checker(player){
    let diceToCheck = dice.reduce((diceArr, die) => {
        diceArr[die.dataset.key-1]++;
        return diceArr;
    }, [0, 0, 0, 0, 0, 0]);
    let copyArr = tableArr[player].map(node => node);
    let sum = (diceToCheck[5]*6)+(diceToCheck[4]*5)+(diceToCheck[3]*4)+(diceToCheck[2]*3)+(diceToCheck[1]*2)+(diceToCheck[0]);
    let pairs = diceToCheck.reduce((a,b)=>{return b === 2 ? a + 1 : a}, 0)
    let straight = diceToCheck.reduce((a,b,i)=> {return b === 1 && i < 5 ? a + 1 : b === 1 ? a + 2 : a},0);
    copyArr[0] = diceToCheck[0];
    copyArr[1] = diceToCheck[1]*2;
    copyArr[2] = diceToCheck[2]*3;
    copyArr[3] = diceToCheck[3]*4;
    copyArr[4] = diceToCheck[4]*5;
    copyArr[5] = diceToCheck[5]*6;
    copyArr[6] = diceToCheck.reduce((a,b,i) => {
        return b === 2 ? a = b * (i + 1) : a;
    }, 0);
    copyArr[7] = diceToCheck.reduce((a,b,i) => {
        return b === 2 && pairs === 2 ?  a + b * (i + 1) : a;
    },0);
    copyArr[8] = diceToCheck.indexOf(3) >= 0 ? (diceToCheck.indexOf(3) + 1) * 3 : 0;
    copyArr[9] = diceToCheck.indexOf(4) >= 0 ? (diceToCheck.indexOf(4) + 1) * 3 : 0;
    copyArr[10] = straight === 5 ? 15 : 0;
    copyArr[11] = straight === 6 && diceToCheck[0] === 0 ? 20 : 0; 
    copyArr[12] = diceToCheck.indexOf(3) >= 0 && diceToCheck.indexOf(2) >= 0 ? diceToCheck.reduce((a,b,i) => {return a + b * (i + 1)},0) : 0;
    copyArr[13] = sum;
    copyArr[14] = diceToCheck.indexOf(5) >= 0 ? 50 : 0;
    
    sheetArr[player].forEach(function(btn,i){
        btn.disabled = false;
        btn.innerHTML=`${copyArr[i]}`;
    })
    rollButton.disabled = true;
    stopButton.disabled = true;
}

//Function that runs when player chooses to score a field
function chooseField(buttonPressed){
    //Get index of button pressed
    let iOf = sheetArr[player].reduce((a,b,i) => {return b.id === buttonPressed.id ? a = i : a},-1)
    //Lock the chosen field
    if ((!buttonPressed.classList.contains('locked') && rollsLeft === 0) && iOf > -1){
        buttonPressed.classList.add('locked');
        tableArr[player][iOf] = buttonPressed.innerHTML;
        sheetArr[player].forEach(function(btn,i){
            btn.innerHTML=`${tableArr[player][i]}`;
        })
        //Update intersum, bonus and sum
        let interSum = tableArr[player].slice(0,6).reduce((a,b) => {return b === '-' ? a : a + Number(b)},0);
        document.getElementById(`inter-sum${player}`).innerHTML = interSum;
        document.getElementById(`bonus${player}`).innerHTML = interSum >= 63 ? 50 : 0;
        document.getElementById(`sum${player}`).innerHTML = tableArr[player].reduce((a,b) => {return b === '-' ? a : a + Number(b)},0);
        //Move to next player 
        player === players - 1 ? player = 0 : player++;
        rollButton.disabled=false;
        stopButton.disabled=false;
        rollsLeft = 3;
        rollDice(dice);
    }
}

//Add event listeners to static buttons
rollButton.addEventListener('click', () => rollDice(chosenDice));
startButton.addEventListener('click' , () => startGame());
stopButton.addEventListener('click', function(){rollsLeft = 0; checker(player);})
document.getElementById('players-one').addEventListener('click', () => players = 1);
document.getElementById('players-two').addEventListener('click', () => players = 2);
document.getElementById('players-three').addEventListener('click', () => players = 3);
document.getElementById('players-four').addEventListener('click', () => players = 4);

