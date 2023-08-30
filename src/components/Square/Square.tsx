import React from 'react';
import './square.scss';

interface SquareProps {
  possibilities: number[];
}

function Square({ possibilities }: SquareProps): React.ReactElement {
  return (
    <div className="square">
      s
    </div>
  );
}

export default Square;