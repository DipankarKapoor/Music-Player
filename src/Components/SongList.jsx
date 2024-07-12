import React from 'react';

const SongList = ({ songs, onSelectSong }) => (
  <div className="song-list">
    {songs.map((song) => (
      <div key={song.id} className="song-item" onClick={() => onSelectSong(song)}>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} />
        <div className="song-info">
          <h4>{song.name}</h4>
          <p>{song.artist}</p>
        </div>
        {/* <span className="song-duration">{song.duration}</span> duration not available*/}
      </div>
    ))}
  </div>
);

export default SongList;
