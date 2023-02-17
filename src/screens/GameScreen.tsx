import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import { CELL_MARGIN, CELL_SIZE } from '../util/constants';
import { generateFoodPosition, generateGrid } from '../util/generateValues';

const grid = generateGrid();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: CELL_MARGIN,
    backgroundColor: '#444',
  },
  snake: {
    backgroundColor: '#ffffff',
  },
  food: {
    backgroundColor: 'red',
  },
});

export const GameScreen = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [food, setFood] = useState(generateFoodPosition(snake));

  const handlePress = (event: GestureResponderEvent) => {
    console.log(event.nativeEvent);
    const { pageX: screenX, pageY: screenY } = event.nativeEvent;
    const head = snake[0];
    const dx = screenX - (head.x * (CELL_SIZE + CELL_MARGIN));
    const dy = screenY - (head.y * (CELL_SIZE + CELL_MARGIN));
    console.log(screenX, screenY);
    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 'right' : 'left');
    } else {
      setDirection(dy > 0 ? 'down' : 'up');
    }
  };

  const updateSnake = () => {
    const head = snake[0];
    let newHead;
    switch (direction) {
      case 'up':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'down':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'left':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'right':
        newHead = { x: head.x + 1, y: head.y };
        break;
      default:
        newHead = head;
    }
    const newSnake = [newHead, ...snake.slice(0, -1)];
    setSnake(newSnake);

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFoodPosition(newSnake));
      setSnake([...newSnake, snake[snake.length - 1]]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateSnake();
    }, 100);
    return () => clearInterval(interval);
  }, [snake, direction]);

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some((cell) => cell.x === x && cell.y === y);
    const isFood = food.x === x && food.y === y;
    const style = [styles.cell];
    if (isSnake) {
      // @ts-ignore
      style.push(styles.snake);
    }
    if (isFood) {
      // @ts-ignore
      style.push(styles.food);
    }
    return <View key={`${x}-${y}`} style={style} />;
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {grid.map((row, y) => (
          <View key={y} style={styles.row}>
            {row.map((_, x) => renderCell(x, y))}
          </View>
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};