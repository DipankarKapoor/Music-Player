import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const PlayerControls = ({ isPlaying, onPlayPause, onNext, onPrevious }) => (
  <div className="playbar">
    <div className="playbar-icons"><img src='../public/group.svg' /></div>
    <div className="player-controls">
      <img src='../public/previous.svg' onClick={onPrevious} />
      {isPlaying ? <FaPause onClick={onPlayPause} /> : <FaPlay onClick={onPlayPause} />}
      <img src='../public/next.svg' onClick={onNext} />
    </div>
    <div className="playbar-icons"><img src='../public/volume.svg' /></div>
  </div>
);

export default PlayerControls;
