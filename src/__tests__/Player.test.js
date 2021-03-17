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

test("if player 1 (user) unable computer attack", () => {
  let player = Player(1);
  expect(player.computerAttack()).toBe(undefined);
});
