import React from 'react';

const Seeker = ({ currentTime, duration, onSeek }) => (
  <div className="seeker">
    <input
      type="range"
      min="0"
      max={duration}
      value={currentTime}
      onChange={(e) => onSeek(e.target.value)}
    />
  </div>
);

export default Seeker;
