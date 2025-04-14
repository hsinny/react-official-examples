import { squareType } from "../components/Game";
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