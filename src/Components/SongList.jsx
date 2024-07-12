import React from 'react';

const SongList = ({ songs, onSelectSong, songDuration }) => (
  <div className="song-list">
    {songs.map((song) => (
      <div key={song.id} className="song-item" onClick={() => onSelectSong(song)}>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
        <div className="song-info">
          <h4>{song.name}</h4>
          <p>{song.artist}</p>
          {/* Handle color change for selected song property song.accent */}
        </div>
        {/* <span className="song-duration">{songDuration ? songDuration : null}</span> */}
      </div>
    ))}
  </div>
);

export default SongList;
