import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

export const MusicPlayer: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, audioRef } = useMusicPlayer();

  return (
    <div className="w-full lg:w-80 bg-black border-2 border-neon-magenta p-6 shadow-[0_0_30px_rgba(255,0,255,0.2)] relative overflow-hidden">
      <audio ref={audioRef} src={currentTrack.url} onEnded={nextTrack} />
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-magenta/50 animate-pulse" />
      
      <div className="space-y-6">
        <div className="relative aspect-square bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center overflow-hidden group">
          <motion.div 
            animate={{ 
              scale: isPlaying ? [1, 1.1, 1] : 1,
              rotate: isPlaying ? [0, 5, -5, 0] : 0
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-neon-magenta opacity-40 group-hover:opacity-100 transition-opacity"
          >
            <Music size={80} />
          </motion.div>
          
          {/* Visualizer bars */}
          <div className="absolute bottom-0 left-0 w-full h-12 flex items-end justify-center gap-1 px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 4 
                }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                className="w-full bg-neon-magenta/60"
              />
            ))}
          </div>
        </div>

        <div className="space-y-1 text-center">
          <h3 
            className="text-xl font-black text-neon-cyan uppercase tracking-tighter glitch-text truncate"
            data-text={currentTrack.title}
          >
            {currentTrack.title}
          </h3>
          <p className="text-xs text-neon-magenta/60 font-mono uppercase tracking-[0.2em]">
            {currentTrack.artist}
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={prevTrack}
            className="text-neon-cyan hover:text-neon-magenta transition-colors transform hover:scale-110 active:scale-90"
          >
            <SkipBack size={24} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-none bg-neon-magenta text-black flex items-center justify-center hover:bg-neon-cyan transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)] transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause size={32} fill="currentColor" />
            ) : (
              <Play size={32} className="ml-1" fill="currentColor" />
            )}
          </button>

          <button 
            onClick={nextTrack}
            className="text-neon-cyan hover:text-neon-magenta transition-colors transform hover:scale-110 active:scale-90"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        <div className="pt-4 border-t border-neon-magenta/20">
          <div className="flex justify-between text-[10px] font-mono text-neon-magenta/40 uppercase mb-2">
            <span>SIGNAL_STRENGTH</span>
            <span>98%</span>
          </div>
          <div className="h-1 bg-neon-magenta/10 w-full relative">
            <motion.div 
              animate={{ width: isPlaying ? '100%' : '0%' }}
              transition={{ duration: 180, ease: "linear" }}
              className="absolute top-0 left-0 h-full bg-neon-magenta shadow-[0_0_10px_#ff00ff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
