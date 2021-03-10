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
  let pos = board.board[0][0];
  board.shipPos(ship, pos) ;
expect(board.board[0][0]).toBe("x");
expect(board.board[0][1]).toBe("x");
expect(board.board[0][2]).toBe("");
});

test("ships placed vertically on board when vertical true", () => {
  let board = Gameboard();
  board.createBoard();
  let ship = Ship(1, 2, true);
  let pos = board.board[0][0];
  board.shipPos(ship, pos) ;
expect(board[0][0]).toBe("x");
expect(board[1][0]).toBe("x");
expect(board[0][1]).toBe("");
});

