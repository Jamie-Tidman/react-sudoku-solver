interface BoardSquare {
  value?: number;
}

interface BoardDefinition {
  squares: BoardSquare[];
}

export default BoardDefinition;