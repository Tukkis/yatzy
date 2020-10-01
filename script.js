const scoreSheet = document.getElementById('score-sheet');
const rollButton = document.getElementById('roll');
const startButton = document.getElementById('start');
const startSelection = document.getElementById('start-selection');
const dice = [];
let chosenDice = [];
const children = scoreSheet.childNodes;
let players = 2;
let rollsLeft = 0;

for(let i = 1; i <= 5; i++){
    let currentDie = document.getElementById(`die${i}`);
    dice.push(currentDie);
    currentDie.addEventListener('click', () => toggleChosen(currentDie));
}


[].forEach.call(children, function(child,index){
    if(index%2===1){
        for(let i = 0; i < players; i++){
            if(index === 1){
                let nameField = document.createElement('input');
                nameField.setAttribute('id', `${child.id}${i}`);
                nameField.setAttribute('class', child.id);
                nameField.setAttribute('placeholder', 'Player');
                child.appendChild(nameField);
            }  else {
                let button = document.createElement('button');
                button.setAttribute('id', `${child.id}${i}`);
                button.setAttribute('class', child.id);
                button.textContent = 'test';
                child.appendChild(button);
            }
        }
    }
});

function startGame(){
    chosenDice = [];
    dice.forEach(function(die){
        die.classList.add('die', 'first-face');
    })
    rollDice(dice);
    startButton.disabled = true;
    rollButton.disabled = false;
}

function toggleChosen(die){
    if(chosenDice.includes(die)){
        die.style.backgroundColor = "white";
        chosenDice.pop(die);
    } else {
        die.style.backgroundColor = "gray";
        chosenDice.push(die);
    }
}

function rollDie(die){
    let num = Math.ceil(Math.random() * 6);
    console.log(num);
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

function rollDice(diceToRoll){
    if(diceToRoll){
        diceToRoll.forEach(function(die){
            rollDie(die);
        })
        chosenDice = [];
    }
}

function checker(player){
    diceToCheck = dice.map(die => die.dataset.key);
    console.log(diceToCheck);
}

rollButton.addEventListener('click', () => rollDice(chosenDice));
startButton.addEventListener('click' , () => startGame());