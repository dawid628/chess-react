import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject()

// start gry przy renderowaniu komponentu
export function initGame() {
    chess.board()
    updateGame()
}

// restart stanu gry
export function resetGame() {
    chess.reset()
    updateGame()
}

// funkcja filtrująca ruch (czy dotarł do końca planszy?)
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

// ruch figury
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

// odświezenie szachownicy
const updateGame = pendingPromotion => {
    const isGameOver = chess.game_over()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : null
    }

    gameSubject.next(newGame)
}

// powód końca gry
const getGameResult = () => {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - ${winner} - WON`
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

// cofanie ruchu
export function undoMove() {
    chess.undo();
    updateGame()
}

// zapisanie gry
export function saveGame() {
    localStorage.setItem('savedGame', chess.fen())
}

// wczytanie gry
export function loadGame() {
    const savedGame = localStorage.getItem('savedGame')
    if (savedGame) {
        chess.load(savedGame)
    }
    updateGame()
}