import './GamePage.css';
import { useState } from 'react';

// Default function：計算優勝狀態
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = ({ square, handleClick }) => (
  <button className="square" onClick={handleClick}>
    {square}
  </button>
);

const Board = ({ squares, handleClick }) => {
  const renderSquare = (index) => {
    return (
      <Square square={squares[index]} handleClick={() => handleClick(index)} />
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () => {
  // 基本九宮格陣列
  const initSquares = Array(9).fill(null);

  // 歷史紀錄：初始第0局即為基本九宮格陣列
  const [history, setHistory] = useState([[...initSquares]]);

  console.log('history: ', history);

  // 遊戲盤數累加
  const [stepNumber, setStepNumber] = useState(0);

  // 初始player1為Ｏ：xIsNext = false
  const [xIsNext, setNext] = useState(false);

  // 目前局面
  const currentSquare = history[stepNumber];
  console.log('currentSquare: ', currentSquare);

  // 下一步局面：延續目前局面
  let squares = [...currentSquare];

  const HandleClick = (index) => {
    console.log('HandleClick index: ', index);
    // 若點擊格內已有圖案，則取消執行
    if (squares[index]) return;

    // 決定圖案
    squares[index] = xIsNext ? 'Ｘ' : 'Ｏ';
    // 切換玩家
    setNext(!xIsNext);
    // 遞增遊戲盤數
    setStepNumber(stepNumber + 1);

    // 先取得歷史紀錄：slice()，透過stepNumber得知當前盤數
    // 更新歷史紀錄：concat()，每次點擊後，都在歷史紀錄的最後段併入下一步局面
    setHistory(history.slice(0, stepNumber + 1).concat([squares]));
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${xIsNext ? 'Ｏ' : 'Ｘ'}` : `Next player: ${xIsNext ? 'Ｘ' : 'Ｏ'}`

  const jumpTo = (index) => {
    console.log('jumpTo: ', index);
    setStepNumber(index);
    setNext(index % 2 === 0 ? false : true); // 偶數盤為X
    return;
  }

  const Todo = history.map((step, index) => {
    const stepText = index < 1 ? 'Go to game start' : `Go to move #${index}`;

    return (
      <li key={index}>
        <button className={index === stepNumber ? 'current_step' : ''}
          onClick={() => jumpTo(index)}>
          {stepText}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquare} handleClick={HandleClick} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{Todo}</ol>
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <div className="GamePage">
      <h1>Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}