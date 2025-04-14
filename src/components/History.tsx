import { historyType } from "./Game";
import '../styles/components/History.css';

export default function History({
  history,
  jumpTo,
}: {
  history: historyType;
  jumpTo: (nextMove: number) => void;
}) {
  const Moves = history.map((_, index) => {
    let buttonTxt = '';
    if (index > 0) {
      buttonTxt = `Go to Move #${index}`;
    } else {
      buttonTxt = 'Go to game start';
    }
    console.log('history, index', index)

    return <li key={index}><button onClick={() => jumpTo(index)}>{buttonTxt}</button></li>
  })

  return (
    <section className="history">
      <div>Game History</div>
      <ol className="history-list">{Moves}</ol>
    </section>
  )
}