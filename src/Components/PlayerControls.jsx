import React from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

const PlayerControls = ({ isPlaying, onPlayPause, onNext, onPrevious }) => (
  <div className="player-controls">
    <FaBackward onClick={onPrevious} />
    {isPlaying ? <FaPause onClick={onPlayPause} /> : <FaPlay onClick={onPlayPause} />}
    <FaForward onClick={onNext} />
  </div>
);

export default PlayerControls;
