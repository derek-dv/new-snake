import React from 'react';
import { motion } from 'motion/react';
import { useSnakeGame } from '../hooks/useSnakeGame';
import { GRID_SIZE } from '../constants';

export const SnakeGame: React.FC = () => {
  const { gameState, resetGame } = useSnakeGame();
  const { snake, food, obstacles, isGameOver, score, highScore, level } = gameState;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-black border-2 border-neon-cyan shadow-[0_0_30px_rgba(0,255,255,0.2)]">
      <div className="flex justify-between w-full px-2 mb-2 gap-4">
        <div className="flex-1 border border-neon-cyan/50 bg-black p-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-cyan/30 animate-pulse" />
          <span className="text-[10px] text-neon-cyan/60 uppercase absolute top-1 left-1">DATA_POINTS</span>
          <span className="text-2xl font-bold text-neon-cyan block mt-2">{score}</span>
        </div>
        
        <div className="flex-1 border border-neon-magenta/50 bg-black p-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-magenta/30 animate-pulse" />
          <span className="text-[10px] text-neon-magenta/60 uppercase absolute top-1 left-1">ITERATION</span>
          <span className="text-2xl font-bold text-neon-magenta block mt-2">{level}</span>
        </div>

        <div className="flex-1 border border-neon-cyan/50 bg-black p-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-cyan/30 animate-pulse" />
          <span className="text-[10px] text-neon-cyan/60 uppercase absolute top-1 left-1">MAX_RECORD</span>
          <span className="text-2xl font-bold text-neon-cyan block mt-2">{highScore}</span>
        </div>
      </div>

      <div 
        className="relative bg-black border-4 border-neon-cyan/40 shadow-[inset_0_0_20px_rgba(0,255,255,0.2)]"
        style={{ 
          width: 'min(80vw, 400px)', 
          height: 'min(80vw, 400px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none opacity-10">
           {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
             <div key={i} className="border-[0.5px] border-neon-cyan/20" />
           ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${i}`}
            initial={false}
            animate={{ x: 0, y: 0 }}
            className={`${i === 0 ? 'bg-neon-cyan shadow-[0_0_10px_#00ffff]' : 'bg-neon-cyan/60'}`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}

        {/* Obstacles */}
        {obstacles.map((obstacle, i) => (
          <div
            key={`obstacle-${i}`}
            className="bg-neon-magenta/40 border border-neon-magenta shadow-[0_0_5px_#ff00ff]"
            style={{
              gridColumnStart: obstacle.x + 1,
              gridRowStart: obstacle.y + 1,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="bg-neon-magenta shadow-[0_0_15px_#ff00ff]"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
          }}
        />

        {/* Game Over Overlay */}
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-6 z-10 border-4 border-neon-magenta animate-pulse"
          >
            <h2 
              className="text-5xl font-black text-neon-magenta uppercase glitch-text"
              data-text="CORE_FAILURE"
            >
              CORE_FAILURE
            </h2>
            <button 
              onClick={resetGame}
              className="px-10 py-3 bg-neon-cyan text-black font-black hover:bg-neon-magenta hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.5)] uppercase tracking-widest"
            >
              REBOOT_SYSTEM
            </button>
          </motion.div>
        )}
      </div>

      <div className="text-neon-cyan/40 text-[10px] uppercase tracking-[0.3em] animate-pulse">
        :: INPUT_REQUIRED: ARROW_KEYS ::
      </div>
    </div>
  );
};
