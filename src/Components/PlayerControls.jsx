import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayerControls = ({ isPlaying, onPlayPause, onNext, onPrevious }) => (
  <div className="playbar">
    <div className="playbar-icons"><img src='./group.svg' /></div>
    <div className="player-controls">
      <img src='./previous.svg' onClick={onPrevious} />
      {isPlaying ? <FaPause onClick={onPlayPause} /> : <FaPlay onClick={onPlayPause} />}
      <img src='./next.svg' onClick={onNext} />
    </div>
    <div className="playbar-icons"><img src='./volume.svg' /></div>
  </div>
);

export default PlayerControls;
