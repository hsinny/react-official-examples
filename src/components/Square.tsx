import { squareType } from "./Board";
import '../styles/components/Square.css';

export default function Square({
  value,
  onSquareClick
}: {
  value: squareType,
  onSquareClick: () => void
}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}