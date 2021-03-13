import Player from "../factories/Player";
import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";

let ship;
let board;

beforeEach(() => {
  board = Gameboard();
  board.createBoard();
  ship = Ship(1, 3, false);
  board.shipPos(ship, 0, 0);
});

test("computer makes moves on players board", () => {
  let player = Player(2);
  player.computerAttack();
  let row = player.compShot[0];
  let col = player.compShot[1];
  board.receiveAttack(row, col);
  expect(board.board[row][col]).toBe("o");
});

test("if player 1 (user) unable computer attack", () => {
  let player = Player(1);
  expect(player.computerAttack()).toBe(undefined);
});
