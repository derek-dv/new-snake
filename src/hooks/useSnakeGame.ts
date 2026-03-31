import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction, GameState } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';

const getRandomPoint = (exclude: Point[]): Point => {
  let newPoint: Point;
  while (true) {
    newPoint = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (!exclude.some(p => p.x === newPoint.x && p.y === newPoint.y)) {
      break;
    }
  }
  return newPoint;
};

const generateObstacles = (count: number, exclude: Point[]): Point[] => {
  const obstacles: Point[] = [];
  for (let i = 0; i < count; i++) {
    const newObstacle = getRandomPoint([...exclude, ...obstacles]);
    obstacles.push(newObstacle);
  }
  return obstacles;
};

export const useSnakeGame = () => {
  const initialObstacles = generateObstacles(8, INITIAL_SNAKE);
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: getRandomPoint([...INITIAL_SNAKE, ...initialObstacles]),
    obstacles: initialObstacles,
    direction: INITIAL_DIRECTION,
    isGameOver: false,
    score: 0,
    highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
    level: 1,
  });

  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const resetGame = () => {
    const newObstacles = generateObstacles(8, INITIAL_SNAKE);
    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: getRandomPoint([...INITIAL_SNAKE, ...newObstacles]),
      obstacles: newObstacles,
      direction: INITIAL_DIRECTION,
      isGameOver: false,
      score: 0,
      level: 1,
    }));
    directionRef.current = INITIAL_DIRECTION;
  };

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver) return prev;

      const head = prev.snake[0];
      const newHead = { ...head };

      switch (directionRef.current) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions (walls, self, obstacles)
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prev.snake.some(p => p.x === newHead.x && p.y === newHead.y) ||
        prev.obstacles.some(p => p.x === newHead.x && p.y === newHead.y)
      ) {
        const newHighScore = Math.max(prev.score, prev.highScore);
        localStorage.setItem('snakeHighScore', newHighScore.toString());
        return { ...prev, isGameOver: true, highScore: newHighScore };
      }

      const newSnake = [newHead, ...prev.snake];
      let newFood = prev.food;
      let newScore = prev.score;
      let newLevel = prev.level;
      let newObstacles = prev.obstacles;

      // Check food
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newScore += 10;
        
        // Level up every 50 points
        if (newScore % 50 === 0) {
          newLevel += 1;
          // Add 2 more obstacles on level up
          newObstacles = [...prev.obstacles, ...generateObstacles(2, [...newSnake, prev.food])];
        }
        
        newFood = getRandomPoint([...newSnake, ...newObstacles]);
      } else {
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
        level: newLevel,
        obstacles: newObstacles,
        direction: directionRef.current,
      };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp': if (directionRef.current !== 'DOWN') directionRef.current = 'UP'; break;
        case 'ArrowDown': if (directionRef.current !== 'UP') directionRef.current = 'DOWN'; break;
        case 'ArrowLeft': if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; break;
        case 'ArrowRight': if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Dynamic speed based on level
    const currentSpeed = Math.max(60, GAME_SPEED - (gameState.level - 1) * 15);
    const interval = setInterval(moveSnake, currentSpeed);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [moveSnake, gameState.level]);

  return { gameState, resetGame };
};
