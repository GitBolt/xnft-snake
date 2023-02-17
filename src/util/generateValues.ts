import { BOARD_SIZE } from "./constants";

interface Cell {
  x: number;
  y: number;
}

export const generateFoodPosition = (snake: Cell[]): Cell => {
  let foodPosition: Cell | null = null;
  while (foodPosition === null || snake.some(cell => cell.x === foodPosition!.x && cell.y === foodPosition!.y)) {
    foodPosition = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  }
  return foodPosition;
};


export const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    grid.push(new Array(BOARD_SIZE).fill(0));
  }
  return grid;
};
