const Gameboard = () => {
  let board = [];
  let updatedBoard;

  const createBoard = () => {
    for (var i = 0; i < 10; i++) {
      board[i] = [];
      for (var j = 0; j < 10; j++) {
        board[i][j] = "";
      }
    }
    return obj.board;
  };

  const shipPos = (ship, row, col) => {
    let updatedBoard = board;
    if (
      (ship.vertical && row + ship.length > 10) ||
      (!ship.vertical && col + ship.length > 10)
    ) {
      return false;
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (ship.vertical === true) {
          board[row + i][col] = "x";
        } else {
          board[row][col + i] = "x";
        }
      }
      return updatedBoard;
    }
  };
  const obj = { board, createBoard, updatedBoard, shipPos };
  return obj;
};

export default Gameboard;
