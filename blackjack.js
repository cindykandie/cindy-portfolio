let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result','div':'#your-box', 'score':0},
   'dealer':{'scoreSpan': '#dealer-blackjack-result','div':'#dealer-box', 'score':0},
   'cards': ['2','3', '4', '5','6', '7','8','9','10','A','J','K','Q'],
   'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'A':[1,11],'J':10,'K':10,'Q':10},
   'wins':0,
   'draws':0,
   'losses':0,
   'isStand':false,
   'turnsOver':false,
}
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

// const hitSound = new Audio('blackjack sounds/swish.m4a')

document.querySelector('#hit-btn').addEventListener('click',blackjackHit)
document.querySelector('#stand-btn').addEventListener('click',dealerLogic)
document.querySelector('#deal-btn').addEventListener('click',blackjackDeal)


function blackjackHit(){
    if(blackjackGame['isStand']===false){
    let card =randomCard()
    showCard(card, YOU)
    updateScore(card,YOU)
    showScore(YOU)
}
}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randomIndex]
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img')
    cardImage.src = `${card}.jpg`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    // hitSound.play()
}
}

function blackjackDeal(){
if(blackjackGame['turnsOver']===true){
    blackjackGame['isStand']=false
let yourImages =document.querySelector('#your-box').querySelectorAll('img')
let dealerImages =document.querySelector('#dealer-box').querySelectorAll('img')

for ( i=0; i<yourImages.length; i++){
    yourImages[i].remove()
}
    for ( i=0; i<dealerImages.length; i++){
        dealerImages[i].remove()
    }

    YOU['score']=0
    DEALER['score']=0

    document.querySelector('#your-blackjack-result').textContent=0
    document.querySelector('#dealer-blackjack-result').textContent=0

    document.querySelector('#your-blackjack-result').style.color='lightblue'
    document.querySelector('#dealer-blackjack-result').style.color='lightblue'

    document.querySelector('#blackjack-result').textContent='Lets play aqain'
    document.querySelector('#blackjack-result').style.color='black'

    blackjackGame['turnsOver']=true
}
}
function updateScore (card, activePlayer){
    if(card==='A'){
      if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
       activePlayer['score']+= blackjackGame['cardsMap'][card][1]
    } else {
        activePlayer['score']+= blackjackGame['cardsMap'][card][0]
    } 

    }else{
    activePlayer['score'] += blackjackGame['cardsMap'][card]
    }
}
function showScore(activePlayer) {
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent= 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color= 'orange'

    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent= activePlayer['score']
}
}
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}


async function dealerLogic(){
    blackjackGame['isStand']= true;
    while(DEALER['score']<16 && blackjackGame['isStand']===true){
    let card=randomCard()
    showCard(card, DEALER)
    updateScore(card,DEALER)
    showScore(DEALER)
    await sleep(800)
    }
        blackjackGame['turnsOver']=true
        let winner = computeWinner()
        showResult(winner)
    }


// compute winner and return winner
//update wins loss draws

function computeWinner(){
    let winner;

if (YOU['score'] <= 21){
//higher than dealer/ dealer busts
if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
    blackjackGame['wins']++
    winner=YOU

}else if(YOU['score']< DEALER['score']){
    blackjackGame['losses']++
    winner=DEALER

}else if(YOU['score'] === DEALER['score']){
    blackjackGame['draws']++
}
//LOWER than dealer/ YOU bust

}else if(YOU['score'] > 21 && DEALER['score']<=21){
    blackjackGame['losses']++
    winner=DEALER
}else if(YOU['score'] > 21 && DEALER['score']>21){
    blackjackGame['draws']++
}
// console.log('winner is', winner)
console.log(blackjackGame)
return winner;
}

    function showResult(winner){
        let message,messageColor;
        if(blackjackGame['turnsOver']===true){
        if(winner=== YOU){
            document.querySelector('#wins').textContent=blackjackGame['wins']
            message ='You won'
            messageColor='green'
        }else if(winner=== DEALER){
            document.querySelector('#losses').textContent=blackjackGame['losses']
            message ='You LOST'
            messageColor='red'
        }else{
            document.querySelector('#draws').textContent=blackjackGame['draws']
            message ='You drew'
            messageColor='blue'
        }
        document.querySelector('#blackjack-result').textContent=message
        document.querySelector('#blackjack-result').style.color=messageColor
    }
    }