import React, { useState } from 'react';
import './App.css';
import Square from './Square';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [multiPlayer, setMultiPlayer] = useState<boolean>(true);
  const [multiPlayerFirstMoveDone, setMultiPlayerFirstMoveDone] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Next player : X");
  const [winBoxIndexes, setWinBoxIndexes] = useState<string>("");
  const [cssStyle, setCssStyle] = useState<any>(null);
  let winner: string = "";
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winAllCSSConfig: Map<string, { gridRow: string, top: string, height: string }> = new Map(
    [
      ["012", {
        gridRow: "1",
        top: "5%",
        height: "7vh"
      }],
      ["345", {
        gridRow: "2",
        top: "7%",
        height: "7vh"
      }],
      ["678", {
        gridRow: "3",
        top: "16%",
        height: "7vh"
      }],

      ["036", {
        gridRow: "1",
        gridColumn: "1",
        left: "5%",
        top: "0%",
        height: "30vh",
        width: "7vh"
      }],
      ["147", {
        gridRow: "1",
        gridColumn: "2",
        left: "7%",
        top: "0%",
        height: "30vh",
        width: "7vh"
      }],
      ["258", {
        gridRow: "1",
        gridColumn: "3",
        left: "16%",
        top: "0%",
        height: "30vh",
        width: "7vh"
      }],
      ["048", {
        gridRow: "1",
        top: "38%",
        left: "-14%",
        height: "7vh",
        width: "129%",
        rotate: "45deg"
      }],
      ["246", {
        gridRow: "1",
        top: "38%",
        right: "-18.5%",
        height: "7vh",
        width: "129%",
        rotate: "135deg"
      }]
    ]);

  function calculateWinner(allSquares: string[], xIsNextVal: boolean) {
    winner = calculateWinnerHelper(allSquares);
    if (winner) {
      setStatus("Winner : " + winner);
    } else if (allSquares.every((val: string) => val !== null) && multiPlayerFirstMoveDone) {
      setStatus("Draw");
    } else {
      setStatus("Next player : " + (xIsNextVal ? "X" : "O"));
    }
  }

  function setWinRec(winIndexes: string) {
    console.log(winAllCSSConfig.get(winIndexes));
    setCssStyle(winAllCSSConfig.get(winIndexes) ?? null);
  }

  function calculateWinnerHelper(squares: string[]) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(a, b, c);
        setWinBoxIndexes(`${a}${b}${c}`);
        const winIndexes = `${a}${b}${c}`;
        setWinRec(winIndexes);
        return squares[a];
      }
    }
    return "";
  }

  function genRandomNum() {
    return Math.floor(Math.random() * 9);
  }

  function stopXFromWinning(nextSquares: string[]): boolean {
    if (winner) return false;
    for (let i = 0; i < lines.length; i++) {
      const row = lines[i];
      let xCount = 0;
      let nullCount = 0;
      let nullIndex = -1;
      row.forEach((rowVal) => {
        if (nextSquares[rowVal] === "X") {
          ++xCount;
        }
        if (nextSquares[rowVal] === null) {
          ++nullCount;
          nullIndex = rowVal;
        }
      });
      if (xCount === 2 && nullCount === 1 && nullIndex !== -1 && nextSquares[nullIndex] === null) {
        nextSquares[nullIndex] = "O";
        setSquares(nextSquares);
        setXIsNext(true);
        return true;
      }
    };
    return false;
  }

  function canComputerWinInNextMove(currSquare: string[]): boolean {
    if (winner) return false;
    for (let i = 0; i < lines.length; i++) {
      const row = lines[i];
      let totalOsCount = 0;
      let totalNullCount = 0;
      row.forEach((rowVal: number) => {
        if (currSquare[rowVal] === 'O') {
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
        currSquare[nullFoundIndex] = 'O';
        setSquares(currSquare);
        setXIsNext(true);
        return true;
      }
    };
    return false;
  }

  function multiPlayerNextMove(currSquare: string[]) {
    if (winner || currSquare.every((val: string) => val !== null)) return;
    const nextSquares = currSquare.slice();
    const i = nextSquares.findIndex((val: string) => val === 'X');
    let randomI = genRandomNum();
    while (randomI === i || nextSquares[randomI] !== null) {
      randomI = genRandomNum();
    }
    if (nextSquares[randomI] === "X") return;
    nextSquares[randomI] = "O";
    setXIsNext(true);
    setSquares(nextSquares);
    if (!multiPlayerFirstMoveDone) setMultiPlayerFirstMoveDone(true);
  }

  function createOverlay(duration: number) {
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

  function handleClick(i: number) {
    if (squares[i] || calculateWinnerHelper(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    calculateWinner(nextSquares, !xIsNext);
    if (winner) return;
    setXIsNext(!xIsNext);
    if (multiPlayer) {
      createOverlay(1000);
      setTimeout(() => {
        if (!multiPlayerFirstMoveDone) {
          multiPlayerNextMove(nextSquares);
        } else {
          if (!canComputerWinInNextMove(nextSquares)) {
            if (!stopXFromWinning(nextSquares)) {
              if (multiPlayerFirstMoveDone && nextSquares.every((val: string) => val === null)) {
                setStatus("Draw");
              } else {
                multiPlayerNextMove(nextSquares);
              }
            }
          }
        }
        calculateWinner(nextSquares, xIsNext);
      }, 1000);
    }
  }

  function playSingleOrMultiplayer() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMultiPlayer(!multiPlayer);
    setStatus("Next player : X");
    setCssStyle("");
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Next player : X");
    setCssStyle("");
  }

  return (
    <div className="outer-container">
      <div className="container">
        <div className="status">Tic Tac Toe</div>
        <div className="board-row">
          <Square value={squares[0]} index={0} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} index={1} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} index={2} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} index={3} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} index={4} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} index={5} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} index={6} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} index={7} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} index={8} onSquareClick={() => handleClick(8)} />
          {cssStyle && <div className="rectangle" style={cssStyle as React.CSSProperties}></div>}
        </div>
        <div className="result"> {status} </div>
        <div id="multi" className='buttons-grp'>
          <button className="btn-lg border-neon" onClick={playSingleOrMultiplayer}>{multiPlayer ? 'Play with Human' : 'Play with Bot'}</button>
          <button className={`btn-lg border-neon restart-btn ${(status === "Draw" || status.includes("Winner")) ? "play-again" : ""}`} onClick={reset}>Restart</button>
        </div>
      </div>
    </div>
  );
}