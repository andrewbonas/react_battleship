import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";


test("new board returns 10x10 board", () => {
    let board = Gameboard();
    board.createBoard();
  expect(board.board.length).toBe(10);
});

test("new board returns blank string spots", () => {
  let board = Gameboard();
  board.createBoard();
expect(board.board[0][0]).toBe("");
});

test("new ships take up 1 spot per length on board", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 2, false);
  board.shipPos(ship, 0, 0);
expect(board.board[0][0]).toBe(ship);
expect(board.board[0][1]).toBe(ship);
expect(board.board[0][2]).toBe("");
});

test("ships placed vertically on board when vertical true", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 2, true);
  board.shipPos(ship, 0, 0) ;
expect(board.board[0][0]).toBe(ship);
expect(board.board[1][0]).toBe(ship);
expect(board.board[0][1]).toBe("");
});

test("ship cannot be off the board", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 2, true);
  board.shipPos(ship, 9, 9) ;
expect(board.board[9][9]).toBe("");
});

test("attack returns ship health -1 when ship is hit", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 3, false);
  board.shipPos(ship, 0, 0) ;
  board.receiveAttack(0,1);
expect(ship.shipHealth).toBe(2);
});

test("attack does not effect ship health when attack missed", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 3, false);
  board.shipPos(ship, 0, 0) ;
  board.receiveAttack(0,4);
expect(ship.shipHealth).toBe(3);
});

test("when all ships are sunk gameboard all sunk returns true", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 2, false);
  board.shipPos(ship, 0, 0) ;
  board.receiveAttack(0,0);
  board.receiveAttack(0,1);
expect(board.allSunk).toBeTruthy();
});



