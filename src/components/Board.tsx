import { useEffect, useState } from "react";
import Square from "./Square";
import '../styles/components/Board.css';

export type squareType = 'O' | 'X' | null;
type squaresType = Array<squareType>;

export default function Board() {
  const [squares, setSquares] = useState<squaresType>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<squareType>(null);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [history, setHistory] = useState<Array<squaresType>>([squares]);

  const calculateWinner = () => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[a] && squares[a] !== null) {
        setWinner(squares[a]);
        break;
      } else {
        setWinner(null);
      }
    }
  }

  const addMoveHistory = (newHistory: squaresType) => {
    const nowHistory = [...history];
    const savedHistory = nowHistory.slice(0, currentMove + 1);
    setHistory([...savedHistory, newHistory]);
  }

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner !== null) return;
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'O' : 'X';
    setSquares(newSquares);
    setCurrentMove(currentMove + 1);
    setXIsNext(!xIsNext);
    addMoveHistory(newSquares);
  }

  const jumpToMove = (index: number) => {
    if (index === currentMove) return;
    setSquares(history[index]);
    setCurrentMove(index);
    setXIsNext(!((currentMove % 2) === 0));
  }

  useEffect(() => {
    calculateWinner();
  }, [squares])

  return (
    <div className="game">
      <section>
        {winner === null && (<div>Now Player: {xIsNext ? 'O' : 'X'}</div>)}
        {winner !== null && (<div>Winner: {winner}</div>)}
        <div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
          </div>
        </div>
      </section>
      <section>
        <div>Game History</div>
        <ul className="history-list">
          {history.map((_, index) =>
            <li key={index}>
              <button onClick={() => jumpToMove(index)}>{index === 0 ? `Go to game start` : `Go to move ${index}`}</button>
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}