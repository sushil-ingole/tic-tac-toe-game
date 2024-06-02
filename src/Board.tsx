import React from 'react';
import './Board.css';
import Square from './Square';
import useTicTacToe from './useTicTacToe';
import { STATUS_MESSAGES, BUTTON_TEXTS, GAME_TITLE } from './assets/constants';

export default function Board() {
  const { squares,
    multiPlayer,
    status,
    cssStyle,
    handleClick,
    playSingleOrMultiplayer,
    reset
  } = useTicTacToe();

  return (
    <div className="outer-container">
      <div className="container">
        <div className="status">{GAME_TITLE}</div>
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
          <button className="btn-lg border-neon" onClick={playSingleOrMultiplayer}>{multiPlayer ? BUTTON_TEXTS.PLAY_WITH_HUMAN : BUTTON_TEXTS.PLAY_WITH_BOT}</button>
          <button className={`btn-lg border-neon restart-btn ${(status === STATUS_MESSAGES.DRAW || status.includes("Winner")) ? "play-again" : ""}`} onClick={reset}>{BUTTON_TEXTS.RESTART}</button>
        </div>
      </div>
    </div>
  );
}