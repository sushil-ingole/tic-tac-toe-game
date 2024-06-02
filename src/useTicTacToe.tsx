import { useState } from "react";
import { STATUS_MESSAGES, BUTTON_TEXTS } from './assets/constants';
import { createOverlay, calculateWinner, calculateWinnerHelper, stopXFromWinning, canComputerWinInNextMove, multiPlayerNextMove } from './useTicTacToeLogic';

export default function useTicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [multiPlayer, setMultiPlayer] = useState<boolean>(true);
    const [multiPlayerFirstMoveDone, setMultiPlayerFirstMoveDone] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(STATUS_MESSAGES.NEXT_PLAYER(BUTTON_TEXTS.PLAYER1));
    const [cssStyle, setCssStyle] = useState<any>(null);
    let winner: string = "";

    function handleClick(i: number) {
        if (squares[i] || calculateWinnerHelper(squares, setCssStyle)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = BUTTON_TEXTS.PLAYER1;
        } else {
            nextSquares[i] = BUTTON_TEXTS.PLAYER2;
        }
        setSquares(nextSquares);
        winner = calculateWinner(nextSquares, !xIsNext, winner, setStatus, setCssStyle, multiPlayerFirstMoveDone);
        if (winner) return;
        setXIsNext(!xIsNext);
        if (multiPlayer) {
            createOverlay(1000);
            setTimeout(() => {
                if (!multiPlayerFirstMoveDone) {
                    multiPlayerNextMove(nextSquares, winner, setXIsNext, setSquares, multiPlayerFirstMoveDone, setMultiPlayerFirstMoveDone);
                } else {
                    if (!canComputerWinInNextMove(nextSquares, winner, setSquares, setXIsNext)) {
                        if (!stopXFromWinning(nextSquares, winner, setSquares, setXIsNext)) {
                            if (multiPlayerFirstMoveDone && nextSquares.every((val: string) => val === null)) {
                                setStatus(STATUS_MESSAGES.DRAW);
                            } else {
                                multiPlayerNextMove(nextSquares, winner, setXIsNext, setSquares, multiPlayerFirstMoveDone, setMultiPlayerFirstMoveDone);
                            }
                        }
                    }
                }
                winner = calculateWinner(nextSquares, xIsNext, winner, setStatus, setCssStyle, multiPlayerFirstMoveDone);
            }, 1000);
        }
    }

    function playSingleOrMultiplayer() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setMultiPlayer(!multiPlayer);
        setStatus(STATUS_MESSAGES.NEXT_PLAYER(BUTTON_TEXTS.PLAYER1));
        setCssStyle("");
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setStatus(STATUS_MESSAGES.NEXT_PLAYER(BUTTON_TEXTS.PLAYER1));
        setCssStyle("");
    }

    return {
        squares,
        multiPlayer,
        status,
        cssStyle,
        handleClick,
        playSingleOrMultiplayer,
        reset
    };
}