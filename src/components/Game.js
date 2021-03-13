import React, {useEffect, useState} from "react";
import "../styles/Game.css";
import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

const Game = () => {
  const playerBoard = Gameboard();
  playerBoard.createBoard();
  const compBoard = Gameboard();
  compBoard.createBoard();
  const [compDisplay, setCompDisplay] = useState(compBoard.board);

  //player board set for test
  const smPlayerBoat = Ship(1, 1, false);
  const mdPlayerBoat = Ship(2, 2, true);
  const lgPlayerBoat = Ship(3, 3, false);
  playerBoard.shipPos(smPlayerBoat, 0, 0);
  playerBoard.shipPos(mdPlayerBoat, 3, 3);
  playerBoard.shipPos(lgPlayerBoat, 7, 7);
  //comp board set for test
  const smCompBoat = Ship(1, 1, false);
  const mdCompBoat = Ship(2, 2, true);
  const lgCompBoat = Ship(3, 3, false);
  compBoard.shipPos(smCompBoat, 0, 0);
  compBoard.shipPos(mdCompBoat, 5, 5);
  compBoard.shipPos(lgCompBoat, 9, 0);
  compBoard.receiveAttack(0, 0);
  compBoard.receiveAttack(1, 1);

  //
  
  // const gameRound = () => {

  // }

  useEffect(() => {
    const handleClick = (e) => {
      let boardTile = e.target.classList.value;
      let clickedCol = parseInt(e.target.dataset.id);
      let clickedRow = parseInt(e.target.parentElement.dataset.id);
      if (boardTile === 'comp-col') {
        compBoard.receiveAttack(clickedRow, clickedCol);
        updateCompBoard();
      }
    };
   
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCompBoard = (clickedCard) => {
    let old = [...compDisplay];
    setCompDisplay(
      old.map((display) => {
        return display;
      })
    );

  };

  return (
    <div className="game">
      <div className="user-board-ctn">
        <h1>Player's Board</h1>
        {playerBoard.board.map((row, i) => (
          <div className="user-row" data-id={i} key={i}>
            {row.map((col, j) => (
              <span data-id={j} className="user-col" key={j}>
                {col.display ? col.display : col}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="comp-board-ctn">
        <h1>Computer's Board</h1>
        {compDisplay.map((row, i) => (
          <div data-id={i} className="comp-row" key={i}>
            {row.map((col, j) => (
              <span data-id={j} className="comp-col" key={j}>
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
