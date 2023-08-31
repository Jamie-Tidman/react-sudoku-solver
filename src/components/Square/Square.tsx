import React from 'react';
import './square.scss';

interface SquareProps {
  possibilities: number[];
  setInOpeningLayout: boolean;
  borderBottom: boolean;
  borderRight: boolean;
  beingRead: boolean;
  beingWritten: boolean;
}

function Square({
  beingRead, beingWritten, borderBottom, borderRight, setInOpeningLayout, possibilities 
}: SquareProps): React.ReactElement {
  function valueFoundClassName(): string {
    return setInOpeningLayout ? 'square-inner value-found set-in-opening-layout' : 'square-inner value-found';
  }

  function className(): string {
    let res = 'square';

    if (borderBottom) {
      res += ' border-bottom';
    }
    if (borderRight) {
      res += ' border-right';
    }
    if (beingRead) {
      res += ' reading';
    }
    if (beingWritten) {
      res += ' writing';
    }

    return res;
  }

  return (
    <div className={className()}>
      { possibilities.length === 1 && (
        <div className={valueFoundClassName()}>
          { possibilities[0] }
        </div>
      )}
      { possibilities.length > 1 && (
        <div className="square-inner possibilities">
          { possibilities.map((p) => p) }
        </div>
      )}
    </div>
  );
}

export default Square;