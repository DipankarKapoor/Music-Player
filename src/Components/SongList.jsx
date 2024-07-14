import React, { useEffect } from 'react';
import { fetchSongs } from "../API";
const SongList = ({ songs, onSelectSong, setSongs }) => {

  useEffect(() => {
    const getSongs = async () => {
      const songs = await fetchSongs();
      setSongs(songs);
    }
    getSongs();
  }, []);

  return (<div className="song-list">
    {songs.map((song) => (
      <div key={song.id} className="song-item" onClick={() => onSelectSong(song)}>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
        <div className="song-info">
          <h4>{song.name}</h4>
          <p>{song.artist}</p>
        </div>
        {/* <span className="song-duration">{songDuration ? songDuration : null}</span> */}
      </div>
    ))}
  </div>);
};

export default SongList;
