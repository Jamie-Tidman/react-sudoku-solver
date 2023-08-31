import React from 'react';
import Square from '../Square/Square';
import './grid.scss';
import puzzleDefinition from '../../Constants';
import SolveStep from '../../types/SolveStep';
import SolverService from '../../services/SolverService';

interface CalcSquare {
  possibilities: number[];
  setInOpeningLayout: boolean;
  beingRead: boolean;
  beingWritten: boolean;
  gridNumber: number;
}



function Grid(): React.ReactElement {
  const [squares, setSquares] = React.useState<CalcSquare[]>([]);
  const [solveHistory, setSolveHistory] = React.useState<SolveStep[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);
  let historyIndexN = 0;

  function rowForIndex(i: number): number {
    return Math.floor(i / 9.0) + 1;
  }

  function colForIndex(i: number): number {
    const res = (i % 9) + 1;
    return res;
  }

  function solveTick(): void {
    // eslint-disable-next-line no-useless-return
    if (historyIndexN >= solveHistory.length) return;

    setSquares((prev) => {
      const newSquares: CalcSquare[] = structuredClone(prev);

      newSquares.forEach((s) => {
        // eslint-disable-next-line no-param-reassign
        s.beingRead = false;
        // eslint-disable-next-line no-param-reassign
        s.beingWritten = false;
      });

      const currentStep: SolveStep = solveHistory[historyIndexN];
      const readSquares = currentStep.readingSquares;
      readSquares.forEach((s) => {
        newSquares[s].beingRead = true;
      });

      if (currentStep.writingSquare) {
        const writingSquare = newSquares[currentStep.writingSquare];
        writingSquare.beingWritten = true;
        if (currentStep.possibilityRemoved) {
          writingSquare.possibilities = writingSquare.possibilities.filter((p) => p !== currentStep.possibilityRemoved);
        }
      }

      return newSquares;
    });

    setHistoryIndex((prev) => prev + 1);
    historyIndexN += 1;
  }

  React.useEffect(() => {
    const initialChangedSquares: number[] = [];

    const newSquares = puzzleDefinition.squares.map((s, i) => {
      const possibilities: number[] = s.value ? [s.value] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const setInOpeningLayout: boolean = !!s.value;

      if (setInOpeningLayout) {
        initialChangedSquares.push(i);
      }

      return {
        possibilities,
        setInOpeningLayout,
        beingRead: false,
        beingWritten: false,
        gridNumber: i
      };
    });

    const solveSquares = puzzleDefinition.squares.map((s, i) => {
      const possibilities: number[] = s.value ? [s.value] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const setInOpeningLayout: boolean = !!s.value;

      if (setInOpeningLayout) {
        initialChangedSquares.push(i);
      }

      return {
        possibilities,
        setInOpeningLayout,
        beingRead: false,
        beingWritten: false,
        gridNumber: i
      };
    });

    setSolveHistory(SolverService)
    setSquares(newSquares);

    const intervalId = setInterval(() => {
      solveTick();
    }, 100); 
  }, []);

  function getSquares() {
    if (squares.length === 0) return null;

    const res: React.ReactElement[] = [];

    for (let i = 0; i < 81; i++) {
      const row = rowForIndex(i);
      const col = colForIndex(i);

      const square = squares[i];
      const borderBottom = row === 3 || row === 6;
      const borderRight = col === 3 || col === 6;

      res.push(
        <Square
          beingRead={square.beingRead}
          beingWritten={square.beingWritten}
          borderBottom={borderBottom}
          borderRight={borderRight}
          possibilities={square.possibilities}
          setInOpeningLayout={square.setInOpeningLayout}
          key={i}
        />
      );
    }

    return res;
  }

  return (
    <div id="grid">
      {getSquares()}
    </div>
  );
}

export default Grid;