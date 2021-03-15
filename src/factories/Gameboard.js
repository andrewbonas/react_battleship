// const Ship = (id, length, vertical) => {
//   let shipHealth = length;
//   let sunkStatus = false;
//   let display = "x";


//   const sunk = () => {
//     return (obj.sunkStatus = true);
//   };

//   const damage = (x) => {
//     let updatedHealth = (obj.shipHealth -= x);
//     if (updatedHealth <= 0) {
//       sunk();
//     }
//   };

//   const attacked = (hit) => {
//     if (hit === true) {
//       damage(1);
//       return true;
//     }
//   };
//   const obj = { id, length, vertical, sunkStatus, shipHealth, display, attacked };
//   return obj;
// };


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
          board[row + i][col] = ship;
        } else {
          board[row][col + i] = ship;
        }
      }
      return updatedBoard;
    }
  };

  const receiveAttack = (row, col) => {
    let attack = board[row][col];
    console.log(attack);
    if (attack.ship === "x") {
      console.log('hit');
      attack.attacked(true);
      board[row][col] = "☠";
    } else if(attack === "") {
      console.log('miss');
      board[row][col] = "o";
    } else {
      console.log('invalid');
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

// const test = Ship(1,1, false);
// const neww = Ship(2,3, false);


// const board = Gameboard();
// board.createBoard();
// board.shipPos(test, 0, 0);
// board.receiveAttack(0, 0);

// let tests = board.allSunk();


export default Gameboard;
