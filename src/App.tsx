import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neon-cyan font-retro selection:bg-neon-magenta selection:text-black overflow-hidden relative">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-12">
        <header className="text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative inline-block"
          >
            <h1 
              className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic glitch-text"
              data-text="SNAKE_OS"
            >
              SNAKE_OS
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neon-magenta font-mono text-sm uppercase tracking-[0.5em] animate-pulse"
          >
            [ SYSTEM_STATUS: OPERATIONAL ]
          </motion.p>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-auto order-2 lg:order-1"
          >
            <MusicPlayer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="relative p-1 bg-neon-magenta/20 border-2 border-neon-magenta shadow-[0_0_20px_rgba(255,0,255,0.3)]">
              <SnakeGame />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden xl:block w-72 p-6 bg-black border-2 border-neon-cyan/30 order-3 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/50 animate-pulse" />
            <h4 className="text-xs font-mono text-neon-magenta uppercase tracking-widest mb-4 underline">TERMINAL_LOGS</h4>
            <ul className="space-y-4 text-xs font-mono">
              <li className="flex gap-3">
                <span className="text-neon-cyan">{'>'}</span>
                <span>CONSUME_DATA_NODES [PINK] TO ENLARGE_PROCESS.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan">{'>'}</span>
                <span>AVOID_COLLISION: WALLS | OBSTACLES | SELF.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-neon-cyan">{'>'}</span>
                <span>SYNC_AUDIO_STREAM_FOR_OPTIMAL_PERFORMANCE.</span>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-neon-cyan/20 text-[10px] opacity-50">
              SECURE_CONNECTION_ESTABLISHED...
            </div>
          </motion.div>
        </div>

        <footer className="mt-auto pt-12 text-neon-cyan/30 text-[10px] font-mono uppercase tracking-[0.3em]">
          :: NEON_SNAKE_SUBSYSTEM_v2.6.0 :: [ AIS_BUILD_ACTIVE ]
        </footer>
      </main>
    </div>
  );
}
