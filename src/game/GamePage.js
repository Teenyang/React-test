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

const Square = ({ square, handleClick, hasWinner }) => (
  <button className="square" onClick={handleClick} disabled={hasWinner && !square}>
    {square}
  </button>
);

const Board = ({ squares, handleClick, hasWinner }) => {
  const rowNumber = 3;
  const rows = Array(rowNumber).fill(null).map((row, index) => index); // [0, 1, 2]
  return (
    <div>
      {rows.map((row) => (
        <div className="board-row" key={`row${row}`}>
          {rows.map((column) => (
            <Square
              key={`column${row * rowNumber + column}`}
              square={squares[row * rowNumber + column]}
              handleClick={() => handleClick(row * rowNumber + column)} hasWinner={hasWinner}
            />)
          )}
        </div>
      )
      )}
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

  const currentPlayer = (xIsNext) => xIsNext ? 'Ｏ' : 'Ｘ';
  const nextPlayer = (xIsNext) => xIsNext ? 'Ｘ' : 'Ｏ';

  const HandleClick = (index) => {
    console.log('HandleClick index: ', index);
    // 若點擊格內已有圖案，則取消執行
    if (squares[index]) return;

    // 決定圖案
    squares[index] = nextPlayer(xIsNext);
    // 切換玩家
    setNext(!xIsNext);
    // 遞增遊戲盤數
    setStepNumber(stepNumber + 1);

    // 先取得歷史紀錄：slice()，透過stepNumber得知當前盤數
    // 更新歷史紀錄：concat()，每次點擊後，都在歷史紀錄的最後段併入下一步局面
    setHistory(history.slice(0, stepNumber + 1).concat([squares]));
  }

  const winner = calculateWinner(squares);
  const gameEnd = currentSquare.every(square => square);
  const status = winner ?
    `Winner: ${currentPlayer(xIsNext)}` :
    (gameEnd ? 'The game ends in a tie!' : `Next player: ${nextPlayer(xIsNext)}`);

  const jumpTo = (index) => {
    console.log('jumpTo: ', index);
    setStepNumber(index);
    setNext(index % 2 === 0 ? false : true); // 偶數盤為X
    return;
  }

  const Todo = history.map((step, move) => {
    const stepText = move < 1 ? 'Go to game start' : `Go to move #${move}`;

    return (
      <li key={move}>
        <button className={move === stepNumber ? 'current_step' : ''}
          onClick={() => jumpTo(move)}>
          {stepText}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquare} handleClick={HandleClick} hasWinner={winner} />
      </div>
      <div className="game-info">
        <h2>{status}</h2>
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