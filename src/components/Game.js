import React from "react";
import "../styles/Game.css";
import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

const Game = () => {
  //player board set for test
  const playerBoard = Gameboard();
  playerBoard.createBoard();
  const smPlayerBoat = Ship(1, 1, false);
  const mdPlayerBoat = Ship(1, 2, true);
  const lgPlayerBoat = Ship(1, 3, false);
  playerBoard.shipPos(smPlayerBoat, 0, 0);
  playerBoard.shipPos(mdPlayerBoat, 3, 3);
  playerBoard.shipPos(lgPlayerBoat, 7, 7);
  //comp board set for test
  const compBoard = Gameboard();
  compBoard.createBoard();
  const smCompBoat = Ship(1, 1, false);
  const mdCompBoat = Ship(1, 2, true);
  const lgCompBoat = Ship(1, 3, false);
  compBoard.shipPos(smCompBoat, 0, 0);
  compBoard.shipPos(mdCompBoat, 5, 5);
  compBoard.shipPos(lgCompBoat, 9, 0);

  //

  compBoard.receiveAttack(0, 0);
  return (
    <div className="game">
      <div className="board-ctn">
        <h1>Player's Board</h1>
        {playerBoard.board.map((row, i) => (
          <div className="row" key={i}>
            {row.map((col, j) => (
              <span className="col" key={j}>
                {col.display ? col.display : col}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="board-ctn">
        <h1>Computer's Board</h1>
        {compBoard.board.map((row, i) => (
          <div className="row" key={i}>
            {row.map((col, j) => (
              <span className="col" key={j}>
                {col.display ? col.display : col}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
