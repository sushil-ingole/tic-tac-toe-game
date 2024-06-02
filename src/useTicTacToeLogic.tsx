import { winAllCSSConfig } from './assets/constants';
import { STATUS_MESSAGES, BUTTON_TEXTS } from './assets/constants';

export const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export function generateRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
}

export function createOverlay(duration: number) {
    const overlay = document.createElement('overlay');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    overlay.style.zIndex = '1';
    overlay.style.cursor = 'not-allowed';

    document.body.appendChild(overlay);

    setTimeout(() => {
        document.body.removeChild(overlay);
    }, duration);
}

export function setWinRectangle(winIndexes: string, setCssStyle: Function) {
    setCssStyle(winAllCSSConfig.get(winIndexes) ?? null);
}

export function calculateWinner(allSquares: string[], xIsNextVal: boolean, winner: string, setStatus: Function, setCssStyle: Function, multiPlayerFirstMoveDone: boolean) {
    winner = calculateWinnerHelper(allSquares, setCssStyle);
    if (winner) {
        setStatus(STATUS_MESSAGES.WINNER(winner));
    } else if (allSquares.every((val: string) => val !== null) && multiPlayerFirstMoveDone) {
        setStatus(STATUS_MESSAGES.DRAW);
    } else {
        setStatus(STATUS_MESSAGES.NEXT_PLAYER(xIsNextVal ? BUTTON_TEXTS.PLAYER1 : BUTTON_TEXTS.PLAYER2));
    }
    return winner;
}

export function calculateWinnerHelper(squares: string[], setCssStyle: Function) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const winIndexes = `${a}${b}${c}`;
            setWinRectangle(winIndexes, setCssStyle);
            return squares[a];
        }
    }
    return "";
}

export function stopXFromWinning(nextSquares: string[], winner: string, setSquares: Function, setXIsNext: Function): boolean {
    if (winner) return false;
    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        let xCount = 0;
        let nullCount = 0;
        let nullIndex = -1;
        row.forEach((rowVal) => {
            if (nextSquares[rowVal] === BUTTON_TEXTS.PLAYER1) {
                ++xCount;
            }
            if (nextSquares[rowVal] === null) {
                ++nullCount;
                nullIndex = rowVal;
            }
        });
        if (xCount === 2 && nullCount === 1 && nullIndex !== -1 && nextSquares[nullIndex] === null) {
            nextSquares[nullIndex] = BUTTON_TEXTS.PLAYER2;
            setSquares(nextSquares);
            setXIsNext(true);
            return true;
        }
    };
    return false;
}

export function canComputerWinInNextMove(currSquare: string[], winner: string, setSquares: Function, setXIsNext: Function): boolean {
    if (winner) return false;
    for (let i = 0; i < lines.length; i++) {
        const row = lines[i];
        let totalOsCount = 0;
        let totalNullCount = 0;
        row.forEach((rowVal: number) => {
            if (currSquare[rowVal] === BUTTON_TEXTS.PLAYER2) {
                ++totalOsCount;
            }
        });
        let nullFoundIndex = -1;
        row.forEach((rowVal: number) => {
            if (currSquare[rowVal] === null) {
                ++totalNullCount;
                if (nullFoundIndex === -1) {
                    nullFoundIndex = rowVal;
                }
            }
        });
        if (totalNullCount === 1 && totalOsCount === 2 && currSquare[nullFoundIndex] === null) {
            currSquare[nullFoundIndex] = BUTTON_TEXTS.PLAYER2;
            setSquares(currSquare);
            setXIsNext(true);
            return true;
        }
    };
    return false;
}

export function multiPlayerNextMove(currSquare: string[], winner: string, setXIsNext: Function, setSquares: Function, multiPlayerFirstMoveDone: boolean, setMultiPlayerFirstMoveDone: Function) {
    if (winner || currSquare.every((val: string) => val !== null)) return;
    const nextSquares = currSquare.slice();
    const i = nextSquares.findIndex((val: string) => val === BUTTON_TEXTS.PLAYER1);
    let randomI = generateRandomIndex(9);
    while (randomI === i || nextSquares[randomI] !== null) {
        randomI = generateRandomIndex(9);
    }
    if (nextSquares[randomI] === BUTTON_TEXTS.PLAYER1) return;
    nextSquares[randomI] = BUTTON_TEXTS.PLAYER2;
    setXIsNext(true);
    setSquares(nextSquares);
    if (!multiPlayerFirstMoveDone) setMultiPlayerFirstMoveDone(true);
}