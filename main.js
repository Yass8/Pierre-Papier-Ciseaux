const blocOrdi = document.querySelector('.ordi');
const blocPlayer = document.querySelectorAll('.game-choice-bloc');
const blocResult = document.getElementById('result');

blocPlayer.forEach(element => {
    
    element.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();

        blocPlayer.forEach(el => {
            const cardChild = el.querySelector('img');
            if (cardChild) {
                cardChild.style.border = 'none';
            }
        });
        //element.querySelector('card').style.border = '1px solid green';
        const cardChild = element.querySelector('img');
        if (cardChild) {
            cardChild.style.border = '1px solid green';
        }
        const choice = element.dataset.choice;
        console.log(choice);
        jouer(choice)
        
    })
});


img = "";

function jouer(playerChoice) {
    
    result(compare(playerChoice,camputerChoice()));
}

function camputerChoice(){
    const choices = ["pierre","papier","ciseaux"];
    const imagesUrl = {
        "pierre" : "./images/rock.png",
        "papier" : "./images/paper.png",
        "ciseaux" : "./images/scissors.png"
    }
    let ramdom = Math.floor(Math.random()*3);
    let choix = choices[ramdom];

    img = imagesUrl[choix];
    console.log("url : " + img);
    blocOrdi.innerHTML = "";
    blocOrdi.innerHTML = `
        <div class="card">
            <img src="./images/${choix}.png"  class="card-img-top" alt="${choix}">
        </div>
        <p class="text-center">${choix}</p>
    `;
    return choix;
}

function compare(choice1, choice2) {
    // Cas où le joueur gagne
    if (choice1 === "pierre" && choice2 === "ciseaux") {
        return "Vous avez choisi Pierre. L'ordinateur a choisi Ciseaux. Pierre écrase les Ciseaux, vous avez gagné !";
    } else if (choice1 === "ciseaux" && choice2 === "papier") {
        return "Vous avez choisi Ciseaux. L'ordinateur a choisi Papier. Les Ciseaux coupent le Papier, vous avez gagné !";
    } else if (choice1 === "papier" && choice2 === "pierre") {
        return "Vous avez choisi Papier. L'ordinateur a choisi Pierre. Le Papier enveloppe la Pierre, vous avez gagné !";
    }

    // Cas où l'ordinateur gagne
    if (choice2 === "pierre" && choice1 === "ciseaux") {
        return "Vous avez choisi Ciseaux. L'ordinateur a choisi Pierre. La Pierre écrase les Ciseaux, vous avez perdu.";
    } else if (choice2 === "ciseaux" && choice1 === "papier") {
        return "Vous avez choisi Papier. L'ordinateur a choisi Ciseaux. Les Ciseaux coupent le Papier, vous avez perdu.";
    } else if (choice2 === "papier" && choice1 === "pierre") {
        return "Vous avez choisi Pierre. L'ordinateur a choisi Papier. Le Papier enveloppe la Pierre, vous avez perdu.";
    }

    // Cas d'égalité
    if (choice1 === choice2) {
        return `Vous avez choisi ${choice1}. L'ordinateur a choisi ${choice2} aussi. C'est une égalité !`;
    }
}

function result(result) {
    blocResult.innerHTML = '';
    const para = document.createElement('p');
    para.innerText = result
    blocResult.appendChild(para)
}