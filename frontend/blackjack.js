// Constants & Vars:
const url = 'https://js2601githubio-production.up.railway.app:8080/api'
var dealer1;
var dealer2;
var player1;
var player2;
var playercards;
var dealercards;
var dealertext;
var playertext;
var credittext;
var originalState;
var betInput;
var credits;
var playedTheseGamesBefore = 0;
var canHit = 0;
let betValue;
var gameStarted;
var deck = ["AC","KC","QC","JC","10C","9C","8C","7C","6C","5C","4C","3C","2C","AD","KD","QD","JD","10D","9D","8D","7D","6D","5D","4D","3D",
    "2D","AS","KS","QS","JS","10S","9S","8S","7S","6S","5S","4S","3S","2S","AH","KH","QH","JH","10H","9H","8H","7H","6H","5H","4H","3H","2H"];
var player = [];
var dealer = [];
const values = new Map();


async function fetchBalance() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No JWT found');
      return;
    }

    try {
      const res = await fetch('https://js2601githubio-production.up.railway.app/api', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Credits:', credits);
        return parseFloat(data.balance);
      } else {
        console.error('API error:', data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
}

async function updateBalance(amount) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        console.error('No JWT found');
        return;
    }

    try {
        const res = await fetch(`https://js2601githubio-production.up.railway.app/api/setbal/${amount}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        const data = await res.json();
        if (res.ok) {
        console.log(`Balance updated to ${amount}`, data);
        } else {
        console.error('Update failed:', data);
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }
}



async function populateMap() {
    for (card of deck) {
        if (card[0] == 'A') {
            values.set(card,11);
        }
        else if (card[0] ==='K' || card[0] === 'Q' || card[0] === 'J' || (card.substring(0,2) === "10")) {
            values.set(card,10);
        }
        else {
            values.set(card, Number(card[0]));
        }
    }
}

async function drawCard() {
    let index = Math.floor(Math.random() * deck.length);
    return deck[index];
}

async function makeHands() {
    for (let i = 0; i<2;i++){
        let card = await drawCard();
        player.push(card);
        deck.splice(deck.indexOf(card),1);
    }
    for (let i = 0; i<2;i++){
        let card = await drawCard();
        dealer.push(card);
        deck.splice(deck.indexOf(card),1);
    }
    console.log("deck:");
    console.log(deck);
}

async function showPlayerHand() {
    // console.log(player);
    player1.src = `assets/${player[0]}.png`
    player2.src = `assets/${player[1]}.png`
    let handvalue = await getHandValue(player);
    playertext.innerHTML = "You Have: " + handvalue;
}

async function showDealerCard(card) {
        if (card == 0) {
            dealer1.src = `assets/${dealer[0]}.png`;
        }
        else if (card == 1) {
            dealer2.src = `assets/${dealer[1]}.png`;
        }
        let total = 0;
        if (card == 0) {
           total = values.get(dealer[0]);
        }
        else {
            total = await getHandValue(dealer);
        }
        dealertext.innerHTML = "Dealer Showing: " + total;
}

async function getHandValue(hand) {
    let total = 0;
    let containsAce = 0;
    for (card of hand) {
        total += values.get(card);
        if (values.get(card) == 11) {
            containsAce = 1;
        }
    }
    if (total > 21 && containsAce) {
        total -= 10;
    }
    return total;
}

async function updateCredits() {
    credits = await fetchBalance(credits);
    credittext.innerHTML = "Current Credits: " + credits;
}

async function playerHit() {
    if (canHit) {
            var card = await drawCard();
            player.push(card);
            deck.splice(deck.indexOf(card),1);       
            var node = playercards.lastElementChild
            var clone = node.cloneNode(true);
            clone.src = `assets/${card}.png`;
            let nodeLeft = window.getComputedStyle(node).left;
            let nodeTop = window.getComputedStyle(node).top;
            clone.style.left = (parseFloat(nodeLeft) + 17.75) + "px";
            clone.style.top = (parseFloat(nodeTop) + 12.5) + "px";
            playercards.appendChild(clone);
            await showPlayerHand();
            checkBust(player);
    }
}

async function dealerHit() {
        var card = await drawCard();
        dealer.push(card);
        deck.splice(deck.indexOf(card),1);    
        var node = dealercards.lastElementChild
        var clone = node.cloneNode(true);
        clone.src = `assets/${card}.png`;
        let nodeLeft = window.getComputedStyle(node).left;
        let nodeTop = window.getComputedStyle(node).top;
        clone.style.left = (parseFloat(nodeLeft) + 10) + "px";
        clone.style.top = (parseFloat(nodeTop) + 12.5) + "px";
        dealercards.appendChild(clone);
        await showDealerCard(2);
        await checkBust(dealer);
}

async function checkBust(hand) {
    let value = await getHandValue(hand);
    if (Number(value) > 21 && hand == player) {
        canHit = 0;
        credits = Number(credits) - Number(betValue);
        await delay(1000);
        document.body = originalState;
        main();
    }
    else if (Number(value) > 21 && hand == dealer) {
        credits = Number(credits) + Number(betValue);
        console.log(credits);
        await delay(1000);
        document.body = originalState;
        main();
    }
}

async function playerStand() {
    canHit = 0;
    await showDealerCard(1);
    while (await getHandValue(dealer) < 17) {
        await delay(1000);
        await dealerHit();
        console.log(await getHandValue(dealer))
    }
    let playerValue = await getHandValue(player);
    let dealerValue = await getHandValue(dealer);

    if (playerValue > dealerValue) {
        credits = Number(credits) + Number(betValue);
        await delay(1000);
        document.body = originalState;
        main();
    }
    else if (playerValue < dealerValue) {
        credits = Number(credits) - Number(betValue);
        await delay(1000);
        document.body = originalState;
        main();
    }
    else {
        await delay(1000);
        document.body = originalState;
        main();
    }
}


async function resetDeck() {
    deck = deck.concat(player);
    deck = deck.concat(dealer);
    player = [];
    dealer = [];
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    originalState = document.body.cloneNode(true);
    console.log(originalState);
    betValue = 0;
    gameStarted = 0;
    dealer1 = document.getElementById("dealer1");
    dealer2 = document.getElementById("dealer2");
    player1 = document.getElementById("player1");
    player2 = document.getElementById("player2");
    playercards = document.getElementById("playercards");
    dealercards = document.getElementById("dealercards");
    dealertext = document.getElementById("dealerhand");
    playertext = document.getElementById("playerhand");
    credittext = document.getElementById("credits");
    betInput = document.getElementById("blackjackBetInput");
    updateCredits();
}

async function gameStart() {
    if (betInput.value != 0 && betInput.value <= credits && betInput.value >=0 && !gameStarted) {
        betValue = betInput.value;
        console.log("betValue "+betValue)
        gameStarted = 1;
        await resetDeck();
        await populateMap();
        await makeHands();
        await showPlayerHand();
        await showDealerCard(0);
        if (await getHandValue(player) == 21) {
            credits = Number(credits) + 1.5*Number(betValue);
            await delay(1000);
            document.body = originalState;
            await updateBalance(credits);
            main();
        }
        else if (await getHandValue(dealer) == 21) {
            showDealerCard(1);
            credits = Number(credits) - Number(betValue);
            await delay(1000);
            document.body = originalState;
            await updateBalance(credits);
            main();
        }
        canHit = 1;
    }
}

