const Player = (player) => {
  let compShot;
  const computerAttack = () => {
    if (player === 2) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      if (validShot(row, col)) {
        obj.compShot = [row, col];
      } else {
        computerAttack();
      }
    }
  };

  const validShot = (row, col) => {
    if (board.board[row][col] === "o") {
      return false;
    }
    return true;
  };

  const obj = { computerAttack, compShot };

  return obj;
};


export default Player;
