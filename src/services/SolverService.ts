import BoardDefinition from "../types/BoardDefinition";
import CalcSquare from "../types/CalcSquare";
import SolveStep from "../types/SolveStep";

export default class SolverService {
  static solveSudoku(initialState: BoardDefinition): SolveStep[] {
    // Initially mark every square as changed since the last iteration.
    const changedSinceLastIteration: number[] = initialState.squares.map((s, index) => index);

    return this.solveBoard(initialState, changedSinceLastIteration);
  }

  private static solveBoard(initialBoardState: BoardDefinition, initialChangeSinceLastIteration: number[]): SolveStep[] {
    const solveSteps: SolveStep[] = [];

    // Clone inputs
    let changedSinceLastIteration: number[] = Object.assign([], initialChangeSinceLastIteration);

    const squares: CalcSquare[] = initialBoardState.squares.map((square) => {
      const possibilities: number[] = square.value ? [square.value] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
      return {
        possibilities
      };
    });

    // Keep going until an iteration of the solve results in no squares having changed,
    // which means it's not possible to solve the board without guessing
    while (changedSinceLastIteration.length > 0) {
      const changedInThisIteration: number[] = [];

      // Determine which regions (e.g. rows, columns and boxes) have changed
      const regionsChanged = this.getRegionsChanged(changedSinceLastIteration);
      regionsChanged.forEach((region) => {
        // Consider each square on its own
        for (let i = 0; i < region.length; i++) {
          const readSquareIndex = region[i];
          const readSquare: CalcSquare = squares[readSquareIndex];

          if (readSquare.possibilities.length === 1) {
            solveSteps.push({
              readingSquares: [readSquareIndex]
            });

            for (let j = 0; j < region.length; j++) {
              const writeSquareIndex = region[j];
              const writeSquare: CalcSquare = squares[writeSquareIndex];

              if (i !== j && writeSquare.possibilities.length > 1) {
                solveSteps.push({
                  readingSquares: [readSquareIndex],
                  writingSquare: writeSquareIndex
                });

                for (let k = 0; k < writeSquare.possibilities.length; k++) {
                  const possibility = writeSquare.possibilities[k];
                  if (possibility === readSquare.possibilities[0]) {
                    changedInThisIteration.push(writeSquareIndex);
                    writeSquare.possibilities = writeSquare.possibilities.filter((p) => p !== possibility);
                    solveSteps.push({
                      readingSquares: [readSquareIndex],
                      writingSquare: writeSquareIndex,
                      possibilityRemoved: possibility
                    });
                  }
                }
              }
            }
          }
        }
      });

      changedSinceLastIteration = [...new Set(changedInThisIteration)];
    }

    return solveSteps;
  }

  private static rowForIndex(i: number): number {
    return Math.floor(i / 9.0) + 1;
  }

  private static colForIndex(i: number): number {
    const res = (i % 9) + 1;
    return res;
  }

  private static boxForIndex(index: number): number {
    const row = this.rowForIndex(index);
    const col = this.colForIndex(index);

    if (row <= 3) {
      if (col <= 3) return 1;
      if (col <= 6) return 2;
      return 3;
    }
    if (row <= 6) {
      if (col <= 3) return 4;
      if (col <= 6) return 5;
      return 6;
    }
    if (col <= 3) return 7;
    if (col <= 6) return 8;
    return 9;
  }

  private static getRegionsChanged(squaresChanged: number[]): number[][] {
    // Work out the rows, columns and boxes that have changed since the last iteration
    const rowsChanged: number[] = [];
    const colsChanged: number[] = [];
    const boxesChanged: number[] = [];

    squaresChanged.forEach((index) => {
      rowsChanged.push(this.rowForIndex(index));
      colsChanged.push(this.colForIndex(index));
      boxesChanged.push(this.boxForIndex(index));
    });

    const uniqueRowsChanged = [...new Set(rowsChanged)];
    const uniqueColsChanged = [...new Set(colsChanged)];
    const uniqueBoxesChanged = [...new Set(boxesChanged)];

    const regionsChanged: number[][] = [];

    uniqueRowsChanged.forEach((rowNumber) => {
      const rowStart = (rowNumber - 1) * 9;
      const rowEnd = rowStart + 9;
      const row: number[] = [];
      for (let i = rowStart; i < rowEnd; i++) {
        row.push(i);
      }

      regionsChanged.push(row);
    });

    uniqueColsChanged.forEach((colNumber) => {
      const col: number[] = [];
      for (let i = colNumber; i < 82; i += 9) {
        col.push(i - 1);
      }

      regionsChanged.push(col);
    });

    uniqueBoxesChanged.forEach((boxNumber) => {
      let box: number[] = [];
      switch (boxNumber) {
      case 1:
        box = [0, 1, 2, 9, 10, 11, 18, 19, 20];
        break;
      case 2:
        box = [3, 4, 5, 12, 13, 14, 21, 22, 23];
        break;
      case 3:
        box = [6, 7, 8, 15, 16, 17, 24, 25, 26];
        break;
      case 4:
        box = [27, 28, 29, 36, 37, 38, 45, 46, 47];
        break;
      case 5:
        box = [30, 31, 32, 39, 40, 41, 48, 49, 50];
        break;
      case 6:
        box = [33, 34, 35, 42, 43, 44, 51, 52, 53];
        break;
      case 7:
        box = [54, 55, 56, 63, 64, 65, 72, 73, 74];
        break;
      case 8:
        box = [57, 58, 59, 66, 67, 68, 75, 76, 77];
        break;
      default:
        box = [60, 61, 62, 69, 70, 71, 78, 79, 80];
      }

      regionsChanged.push(box);
    });

    return regionsChanged;
  }
}
