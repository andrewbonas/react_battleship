import React, { useEffect, useState, useRef, useReducer } from "react";
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

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const game = useRef(false);

  const [compDisplay, setCompDisplay] = useState(compBoard.board);
  const [playerDisplay, setPlayerDisplay] = useState(playerBoard.board);
  const [playerWin, setPlayerWin] = useState(false);
  const [computerWin, setComputerWin] = useState(false);

  const playerShipYard = () => {
    const playerDestroyer = Ship(1, 2, false);
    const playerSubmarine = Ship(2, 3, true);
    const playerCruiser = Ship(3, 3, false);
    const playerBattleShip = Ship(4, 4, false);
    const playerCarrier = Ship(5, 5, true);
    let playerYard = [
      playerDestroyer,
      playerSubmarine,
      playerCruiser,
      playerBattleShip,
      playerCarrier,
    ];
    playerYard.forEach(placePlayerShips);
  };

  const placePlayerShips = (value) => {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    if (playerBoard.shipPos(value, row, col)) {
      return;
    } else {
      placePlayerShips(value);
    }
  };

  const compShipYard = () => {
    const compDestroyer = Ship(6, 2, true);
    const compSubmarine = Ship(7, 3, true);
    const compCruiser = Ship(8, 3, false);
    const compBattleShip = Ship(9, 4, false);
    const compCarrier = Ship(10, 5, false);
    let compYard = [
      compDestroyer,
      compSubmarine,
      compCruiser,
      compBattleShip,
      compCarrier,
    ];
    compYard.forEach(placeCompShips);
  };

  const placeCompShips = (value) => {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    if (compBoard.shipPos(value, row, col)) {
      return;
    } else {
      placeCompShips(value);
    }
  };

  //load ships on board at start
  playerShipYard();
  compShipYard();

  const shufflePlayerBoard = () => {
    playerBoard.createBoard();
    playerShipYard();
    let shuffled = playerBoard.board;
    setPlayerDisplay(
      shuffled.map((display) => {
        return display;
      })
    );
  };

  const computerTurn = () => {
    setTimeout(function () {
      computer.computerAttack(playerBoard);
      updatePlayerBoardDisplay();
    }, 700);
  };

  const startGame = () => {
    game.current = true;
    forceUpdate();
  };

  const gameRound = (clickedRow, clickedCol) => {
    compBoard.receiveAttack(clickedRow, clickedCol);
    updateCompBoardDisplay();
    if (compBoard.allSunk()) {
      setPlayerWin(true);
    } else if (playerBoard.allSunk()) {
      setComputerWin(true);
    } else {
      computerTurn();
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      let boardTile = e.target.classList.value;
      let boardItem = e.target.innerHTML;
      let clickedCol = parseInt(e.target.dataset.id);
      let clickedRow = parseInt(e.target.parentElement.dataset.id);
      if (
        game.current &&
        boardTile === "comp-col" &&
        boardItem !== "☠" &&
        boardItem !== "o"
      ) {
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

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="game">
      <div className="boards">
        <div className="user-board-ctn">
          <h1>Player's Board</h1>
          {playerDisplay.map((row, i) => (
            <div className="user-row" data-id={i} key={i}>
              {row.map((col, j) => (
                <span
                  data-id={j}
                  id={col.id ? col.id : null}
                  className="user-col"
                  key={j}
                >
                  {col.ship ? col.ship : col}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="buttons">
          {!game.current && (
            <div className="button-ctn">
              <button onClick={startGame}>Start</button>
              <button onClick={shufflePlayerBoard}>Shuffle Ships</button>
            </div>
          )}
          {computerWin && (
            <div className="button-ctn">
              <div className="winner">Computer Wins!</div>
              <button onClick={refreshPage}>Reset</button>
            </div>
          )}
          {playerWin && (
            <div className="button-ctn">
              <div className="winner">User Wins!</div>
              <button onClick={refreshPage}>Reset</button>
            </div>
          )}
        </div>
        <div className="comp-board-ctn">
          <h1>Computer's Board</h1>
          {compDisplay.map((row, i) => (
            <div data-id={i} className="comp-row" key={i}>
              {row.map((col, j) => (
                <span
                  data-id={j}
                  id={col.id ? col.id : null}
                  className="comp-col"
                  key={j}
                >
                  {col.compDisplay ? col.compDisplay : col}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
