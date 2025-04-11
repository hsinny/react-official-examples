import { useEffect, useState } from "react";
import Square from "./Square";
import '../styles/components/Board.css';

export type squareType = 'O' | 'X' | null;

export default function Board() {
  const [squares, setSquares] = useState<Array<squareType>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinnner] = useState<squareType>(null);

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
      if (squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[a]) {
        setWinnner(squares[a]);
      }
    }
  }

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner !== null) return;
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'O' : 'X';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  useEffect(() => {
    if (winner !== null) return;
    calculateWinner();
  }, [squares])

  return (
    <>
      <div>Winner: {winner}</div>
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
    </>
  )
}