import { Chess } from 'chess.js';
import { BehaviorSubject } from 'rxjs'


const chess = new Chess()
let promotion = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'


export const gameSubject = new BehaviorSubject()

// ruch figury
export function move(from, to, promotion) {
    let tempMove = {from, to}
    if(promotion) {
        tempMove.promotion = promotion
    }

    try {
        // czy ruch jest mozliwy?
        const legalMove = chess.move(tempMove)
        // wykonaj ruch
        if(legalMove){
           updateGame() 
        }
    } catch (e) {
        console.log('Wrong move')
    }
}

// aktualizacja szachownicy
const updateGame = (pendingPromotion) => {
  const newGame = {
    board: chess.board(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}

// start gry
export function initGame() {
  updateGame()
}
 

export function handleMove(from, to) {
    // czy ma promocje
    const promotions = chess.moves({verbose: true}).filter(m => m.promotion)
    console.table(promotions)
    if(promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }
        updateGame(pendingPromotion)
    }
    const {pendingPromotion} = gameSubject.getValue()
    // if(!pendingPromotion) {
    //     move(from, to)
    // }
    move(from, to)
}