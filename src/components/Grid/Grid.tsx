import React from 'react';
import Square from '../Square/Square';
import './grid.scss';
import BoardDefinition from '../../types/BoardDefinition';

function Grid(): React.ReactElement {
  const puzzleDefinition: BoardDefinition = {
    squares: [
      { value: 5 },
      { },
      { value: 3 },
      { },
      { },
      { value: 7 },
      { value: 6 },
      { },
      { },
      { value: 9 },
      { },
      { },
      { value: 1 },
      { },
      { },
      { },
      { value: 2 },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { value: 9 },
      { },
      { value: 4 },
      { },
      { value: 3 },
      { value: 7 },
      { },
      { value: 1 },
      { },
      { },
      { value: 7 },
      { value: 9 },
      { },
      { value: 2 },
      { },
      { value: 1 },
      { },
      { },
      { },
      { },
      { value: 5 },
      { },
      { },
      { value: 6 },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { value: 1 },
      { },
      { },
      { value: 7 },
      { value: 3 },
      { value: 4 },
      { value: 6 },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { },
      { value: 9 },
      { },
      { },
      { value: 5 },
    ]
  };

  function getSquares() {
    const rows: React.ReactElement[] = [];

    for (let i = 0; i < 9; i++) {
      const squares: React.ReactElement[] = [];
      for (let j = 0; j < 9; j++) {
        squares.push(<Square key={`${i}-${j}`} />);
      }
      rows.push(<div className="grid-row" key={i}>{squares}</div>);
    }

    return rows;
  }

  return (
    <div id="grid">
      {getSquares()}
    </div>
  );
}

export default Grid;