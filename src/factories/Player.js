const Player = (player) => {
  let computerAttempts = 0; // prevent infinite loop if computer can't make a valid shot.

  const computerAttack = (playerBoard) => {
    computerAttempts = computerAttempts + 1;
    if (player === 2) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      if (validShot(playerBoard, row, col)) {
        playerBoard.receiveAttack(row, col);
      } else if (computerAttempts < 500) {
        computerAttack(playerBoard);
      } else {
        return;
      }
    }
  };

  const validShot = (playerBoard, row, col) => {
    if (
      playerBoard.board[row][col] === "" ||
      playerBoard.board[row][col].ship === "x"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const obj = { computerAttack};

  return obj;
};

export default Player;
