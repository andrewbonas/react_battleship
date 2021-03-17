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
    if (!validPos(ship, row, col)) {
      return false;
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (ship.vertical === true) {
          board[row + i][col] = ship;
        } else {
          board[row][col + i] = ship;
        }
      }
      return updatedBoard;
    }
  };

  const validPos = (ship, row, col) => {
    if (
      (ship.vertical && row + ship.length > 10) ||
      (!ship.vertical && col + ship.length > 10)
    ) {
      return false;
    }
    for (let i = 0; i < 10; i++) {
      if (ship.vertical === true && board[row + i][col] !== "") {
        return false;
      } else if (board[row][col + i] !== "") {
        return false;
      } else {
        return true;
      }
    }
  };

  const receiveAttack = (row, col) => {
    let attack = board[row][col];
    if (attack.ship === "x") {
      attack.attacked(true);
      board[row][col] = "☠";
    } else if (attack === "") {
      board[row][col] = "o";
    } else {
    }
  };

  const allSunk = () => {
    let allDestroyed = false;
    for (let i = 0; i < 10; i++) {
      let boardRow = board[i];
      let allShips = boardRow.filter((ship) => ship.shipHealth > 0);
      let shipsAlive = allShips.length;
      if (shipsAlive > 0) {
        allDestroyed = true;
      }
    }
    if (!allDestroyed) {
      return true;
    } else {
      return false;
    }
  };

  const obj = {
    board,
    createBoard,
    updatedBoard,
    shipPos,
    receiveAttack,
    allSunk,
  };
  return obj;
};

export default Gameboard;
