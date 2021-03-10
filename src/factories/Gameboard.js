import { createEvent } from "@testing-library/dom";

const Gameboard = () => {
  let board = [];

const createBoard = () => {
  for(var i=0; i<10; i++){
    board[i] = [];
    for(var j=0; j<10; j++){
      board[i][j]="";
    }
  }
  return obj.board;
}


const obj = {board, createBoard};
return obj;
};



export default Gameboard;