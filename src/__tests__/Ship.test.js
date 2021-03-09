import Ship from "../factories/Ship";
let testShip;
beforeEach(() => {
  testShip =  Ship(1, 4, false);
});

test('true hit returns hit true', () => {
  expect(testShip.attacked(true)).toBeTruthy();
});

test('damage to fulll ship length returns sunk', () => {
    let ship =  Ship(1, 1, false);
    ship.attacked(true)
  expect(ship.sunkStatus).toBe(true);
});

test('damage to partial ship length returns sunk false', () => {
  let ship =  Ship(1, 3, false);
  ship.attacked(true)
expect(ship.sunkStatus).toBe(false);
});



