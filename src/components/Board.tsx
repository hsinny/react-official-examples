import Square from "./Square";
import { squaresType, squareType } from "./Game";
import '../styles/components/Board.css';

export default function Board({
  xIsNext,
  squares,
  onPlay,
}: {
  xIsNext: boolean;
  squares: squaresType;
  onPlay: (squares: squaresType) => void;
}) {
  const handleSquareClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSqures = [...squares];
    nextSqures[index] = xIsNext ? 'O' : 'X';
    onPlay(nextSqures);
  }

  const calculateWinner = (boardSquares: squaresType): squareType => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];

      if (boardSquares[a] && boardSquares[a] === boardSquares[b] && boardSquares[b] === boardSquares[c] && boardSquares[c] === boardSquares[a]) {
        return boardSquares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let gameStatus = winner ? `Winner: ${winner}` : `Now player: ${xIsNext ? 'O' : 'X'}`;

  return (
    <section>
      <div className="board-status">{gameStatus}</div>
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
  )
}