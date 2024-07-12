import React from 'react';

const Seeker = ({ currentTime, duration, onSeek, formatTime }) => (
  <div className="seeker">
  <div className ="display-time">
    <div>{formatTime(currentTime)}</div>
    <div>{formatTime(duration)}</div>
  </div>
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      onChange={(e) => (onSeek(e.target.value))
      }
    />
  </div>
);

export default Seeker;
