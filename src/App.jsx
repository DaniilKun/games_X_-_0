import React, { useState } from 'react';
import './App.css';

function App() {
  const SYMBOL_X = 'X';
  const SYMBOL_O = 'O';

  const computeWinner = (cells) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return [a, b, c];
      }
    }
  };
  const initialCellsState = [null, null, null, null, null, null, null, null, null]

  const [items, setItems] = useState(initialCellsState);
  const [currentSymbol, setCurrentSymbol] = useState(SYMBOL_O);
  const [winnerSequence, setWinnerSequence] = useState();
  const [noOneWin, setNoOneWin] = React.useState(false);

  const restartGame = () => {
    setItems(initialCellsState)
    setCurrentSymbol(SYMBOL_O)
    setWinnerSequence(undefined)
    setNoOneWin(false)
  }

  const handleCellClick = (index) => {
    if (items[index] || winnerSequence) {
      return;
    }
    const copyItems = items.slice();
    copyItems[index] = currentSymbol;
    const winner = computeWinner(copyItems);
    setItems(copyItems);
    setCurrentSymbol(currentSymbol === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner);
    if (!winner) {
      if (copyItems.every((cell) => Boolean(cell))) {
        setNoOneWin(true)
      }
    }
  };

  const getCurrentStyle = (symbol) => {
    if (symbol === SYMBOL_X) return 'symbol symbol--x';
    if (symbol === SYMBOL_O) return 'symbol symbol--o';
  };

  const styleSpan = (currentSymbol) => (
    <span className={getCurrentStyle(currentSymbol)}>{currentSymbol}</span>
  );

  const winnerSymbol = winnerSequence ? items[winnerSequence[0]] : undefined

  return (
    <>
      <div className="game">
        <div className="game-info">
        {noOneWin
              ?
              'Ничья'
              :
              <>
                {winnerSequence ? 'Победитель: ' : 'Ход: '} {styleSpan(winnerSymbol ?? currentSymbol)}
              </>
            }
        </div>

        <button className={'cell'}
                  onClick={restartGame}>Сброс</button>
        <div className="game-field">
          {items.map((item, index) => {
            const isWinner = winnerSequence?.includes(index);
            return (
              <button
                key={index}
                className={`cell ${isWinner ? 'cell--win' : ''}`}
                onClick={() => handleCellClick(index)}>
                {item ? styleSpan(item) : null}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
