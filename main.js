// Sélection des éléments DOM
const blocOrdi = document.querySelector('.ordi');
const blocPlayer = document.querySelectorAll('.game-choice-bloc');
const blocResult = document.getElementById('result');

// Ajout d'un écouteur d'événements à chaque bloc joueur
blocPlayer.forEach(element => {
    element.addEventListener('click', handlePlayerChoice);
});

// Gestion du clic du joueur
function handlePlayerChoice(event) {
    event.preventDefault();
    event.stopPropagation();

    resetBorders();
    highlightSelectedChoice(event.currentTarget);

    const playerChoice = event.currentTarget.dataset.choice;
    console.log(playerChoice);

    jouer(playerChoice);
}

// Réinitialise les bordures des cartes
function resetBorders() {
    blocPlayer.forEach(el => {
        const cardChild = el.querySelector('img');
        if (cardChild) {
            cardChild.style.border = 'none';
        }
    });
}

// Met en évidence le choix sélectionné
function highlightSelectedChoice(element) {
    const cardChild = element.querySelector('img');
    if (cardChild) {
        cardChild.style.border = '1px solid green';
    }
}

// Logique principale du jeu
function jouer(playerChoice) {
    const computerChoice = getComputerChoice();
    const gameResult = compareChoices(playerChoice, computerChoice);
    displayResult(gameResult);
}

// Génère le choix aléatoire de l'ordinateur
function getComputerChoice() {
    const choices = ["pierre", "papier", "ciseaux"];
    const imagesUrl = {
        "pierre": "./images/pierre.png",
        "papier": "./images/papier.png",
        "ciseaux": "./images/ciseaux.png"
    };

    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];

    console.log("URL : " + imagesUrl[computerChoice]);
    updateComputerDisplay(computerChoice, imagesUrl[computerChoice]);

    return computerChoice;
}

// Met à jour l'affichage du choix de l'ordinateur
function updateComputerDisplay(choice, imageUrl) {
    blocOrdi.innerHTML = `
        <div class="card">
            <img src="${imageUrl}" class="card-img-top" alt="${choice}">
        </div>
        <p class="text-center">${choice}</p>
    `;
}

// Compare les choix du joueur et de l'ordinateur pour déterminer le résultat
function compareChoices(playerChoice, computerChoice) {
    const winConditions = {
        "pierre": "ciseaux",
        "ciseaux": "papier",
        "papier": "pierre"
    };

    if (playerChoice === computerChoice) {
        return `Vous avez choisi ${playerChoice}. L'ordinateur a choisi ${computerChoice} aussi. C'est une égalité !`;
    }

    if (winConditions[playerChoice] === computerChoice) {
        return `Vous avez choisi ${playerChoice}. L'ordinateur a choisi ${computerChoice}. Vous avez gagné !`;
    }

    return `Vous avez choisi ${playerChoice}. L'ordinateur a choisi ${computerChoice}. Vous avez perdu.`;
}

// Affiche le résultat du jeu
function displayResult(resultText) {
    blocResult.innerHTML = '';
    const resultParagraph = document.createElement('p');
    resultParagraph.innerText = resultText;
    blocResult.appendChild(resultParagraph);
}
