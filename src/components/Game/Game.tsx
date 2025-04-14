import { useState } from "react";
import Board from "./Board/Board";
import History from "./History/History";
import './Game.css';

export type squareType = 'O' | 'X' | null;
export type squaresType = Array<squareType>;
export type historyType = Array<squaresType>;

export default function Game() {
  const [history, setHistory] = useState<historyType>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSqures: squaresType) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSqures];
    setHistory(nextHistory);
    setCurrentMove(currentMove + 1)
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <History history={history} jumpTo={jumpTo} />
      </div>
    </div>
  )
}