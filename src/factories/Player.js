

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
//   const obj = {
//     id,
//     length,
//     vertical,
//     sunkStatus,
//     shipHealth,
//     display,
//     attacked,
//   };
//   return obj;
// };

// const Gameboard = () => {
//   let board = [];
//   let updatedBoard;

//   const createBoard = () => {
//     for (var i = 0; i < 10; i++) {
//       board[i] = [];
//       for (var j = 0; j < 10; j++) {
//         board[i][j] = "";
//       }
//     }
//     return obj.board;
//   };

//   const shipPos = (ship, row, col) => {
//     let updatedBoard = board;
//     if (
//       (ship.vertical && row + ship.length > 10) ||
//       (!ship.vertical && col + ship.length > 10)
//     ) {
//       return false;
//     } else {
//       for (let i = 0; i < ship.length; i++) {
//         if (ship.vertical === true) {
//           board[row + i][col] = ship;
//         } else {
//           board[row][col + i] = ship;
//         }
//       }
//       return updatedBoard;
//     }
//   };

//   const receiveAttack = (row, col) => {
//     let attack = board[row][col];
//     if (attack.display === "x") {
//       attack.display = "o";
//       attack.attacked(true);
//     } else {
//       board[row][col] = "o";
//     }

//     return attack;
//   };

//   const allSunk = () => {
//     let allDestroyed = false;
//     for (let i = 0; i < 10; i++) {
//       let boardRow = board[i];
//       let allShips = boardRow.filter((ship) => ship.shipHealth > 0);
//       let shipsAlive = allShips.length;
//       if (shipsAlive > 0) {
//         allDestroyed = true;
//       }
//     }
//     if (!allDestroyed) {
//       return true;
//     } else {
//       return false;
//     }
//   };
//   const obj = {
//     board,
//     createBoard,
//     updatedBoard,
//     shipPos,
//     receiveAttack,
//     allSunk,
//   };
//   return obj;
// };



const Player = (player) => {
  let computerAttempts = 0; // prevent infinite loop if computer can't make a valid shot. 
  
  const computerAttack = (playerBoard) => {
   computerAttempts = computerAttempts + 1;
    if (player === 2) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      if (validShot(playerBoard,row, col)) {
        playerBoard.receiveAttack(row, col);
      } else if (computerAttempts < 500) {
        computerAttack(playerBoard);
      } else {
        return
      }
    }
  };

  const validShot = (playerBoard, row, col) => {
    if (playerBoard.board[row][col] === "" || playerBoard.board[row][col].ship === "x") {
       return true;
     }else {
     return false;
     }
  };

  const game = () => {
 
  };

  const obj = { computerAttack, game};

  return obj;
};

// const run = Player();
// run.game();

// const test = Ship(1, 1, false);
// const neww = Ship(2, 3, false);

// const board = Gameboard();
// board.createBoard();
// board.shipPos(test, 0, 0);
// board.receiveAttack(0, 0);

// let tests = board.allSunk();

// const player = Player(2);

// let shots = player.computerAttack();
// let shotss = player.computerAttack();


export default Player;
