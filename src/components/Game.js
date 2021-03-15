import React, { useEffect, useState } from "react";
import "../styles/Game.css";
import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";
import Player from "../factories/Player";

const Game = () => {
  const playerBoard = Gameboard();
  playerBoard.createBoard();
  const compBoard = Gameboard();
  compBoard.createBoard();
  const computer = Player(2);
  const [compDisplay, setCompDisplay] = useState(compBoard.board);
  const [playerDisplay, setPlayerDisplay] = useState(playerBoard.board);
  const [playerWin, setPlayerWin] = useState(false);
  const [computerWin, setComputerWin] = useState(false);


  const [playerTurn, setPlayerTurn] = useState(false);

  //player board set for test
  const smPlayerBoat = Ship(1, 1, false);
  const mdPlayerBoat = Ship(2, 2, true);
  const lgPlayerBoat = Ship(3, 3, false);
  playerBoard.shipPos(smPlayerBoat, 0, 0);
  playerBoard.shipPos(mdPlayerBoat, 3, 3);
  playerBoard.shipPos(lgPlayerBoat, 7, 7);
  //comp board set for test
  const smCompBoat = Ship("ship1", 1, false);
  const mdCompBoat = Ship(2, 2, true);
  const lgCompBoat = Ship(3, 3, false);
  compBoard.shipPos(smCompBoat, 0, 0);
  compBoard.shipPos(mdCompBoat, 5, 5);
  compBoard.shipPos(lgCompBoat, 9, 0);

  //
  const computerTurn = () => {
    setTimeout(function () {
      computer.computerAttack(playerBoard);
      updatePlayerBoardDisplay();
    }, 700);
  };

  const gameRound = (clickedRow, clickedCol) => {
    compBoard.receiveAttack(clickedRow, clickedCol);
    updateCompBoardDisplay();
    if(compBoard.allSunk()) {
      setPlayerWin(true);
    } else if (playerBoard.allSunk()) {
      setComputerWin(true);
    } else {
      computerTurn();
    };

  };

  useEffect(() => {
    const handleClick = (e) => {
      console.log(e);
      console.log(e.target.id);

      let boardTile = e.target.classList.value;
      let boardItem = e.target.innerHTML;
      let clickedCol = parseInt(e.target.dataset.id);
      let clickedRow = parseInt(e.target.parentElement.dataset.id);
      if (boardTile === "comp-col" && boardItem !== "☠" && boardItem !== "o") {
        gameRound(clickedRow, clickedCol);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCompBoardDisplay = () => {
    let old = [...compDisplay];
    setCompDisplay(
      old.map((display) => {
        return display;
      })
    );
  };

  const updatePlayerBoardDisplay = () => {
    let old = [...playerDisplay];
    setPlayerDisplay(
      old.map((display) => {
        return display;
      })
    );
  };

  function refreshPage(){ 
    window.location.reload(); 
}
  return (
    <div className="game">
      <div className="user-board-ctn">
        <h1>Player's Board</h1>
        {playerDisplay.map((row, i) => (
          <div className="user-row" data-id={i} key={i}>
            {row.map((col, j) => (
              <span data-id={j} id={col.id ? col.id : null} className="user-col" key={j}>
                {col.ship ? col.ship : col}
              </span>
            ))}
          </div>
        ))}
      </div>
      {computerWin && (
        <div>
        <div>Computer Wins!</div>
        <button onClick={ refreshPage }>Reset</button>
        </div>
      )}
      {playerWin && (
        <div>
        <div>User Wins!</div>
        <button onClick={ refreshPage }>Reset</button>
        </div>
      )}

      <div className="comp-board-ctn">
        <h1>Computer's Board</h1>
        {compDisplay.map((row, i) => (
          <div data-id={i} className="comp-row" key={i}>
            {row.map((col, j) => (
              <span data-id={j} id={col.id ? col.id : null}  className="comp-col" key={j}>
                {col.compDisplay ? col.compDisplay : col}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
