import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

export function initGame() {
    const savedGame = localStorage.getItem('savedGame')
    
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}

export function resetGame() {
    chess.reset()
    updateGame()
}

export function handleMove(from, to) {
    // czy dany ruch ma promocje?
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    console.table(promotions)
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }
        updateGame(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue()

    move(from, to)
}


export function move(from, to, promotion) {
    let tempMove = { from, to }
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)

    if (legalMove) {
        updateGame()
    }
}

const updateGame = pendingPromotion => {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    localStorage.setItem('savedGame', chess.fen())

    gameSubject.next(newGame)
}

const getGameResult = () => {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - ${winner} WON`
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPEATED MOVE 3 TIMES'
        } else if (chess.insufficient_material()) {
            reason = "NOT ENOUGH MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}

