import React, { useEffect } from 'react'
const TopSongs = ({ songs, onSelectSong, setSongs, setFilteredSongs,setQuery }) => {

  //Setting the top tracks and updating the songs array so that only the current tab is iterated
  useEffect(() => {
    const topTracks = songs.filter((song) => song.top_track);
    setSongs(topTracks);
    setFilteredSongs(topTracks)
    setQuery("")
  }, []);

  return (
    <div className="song-list">
      {songs.map((song) => ((<div key={song.id} className="song-item" onClick={() => onSelectSong(song)}>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
        <div className="song-info">
          <h4>{song.name}</h4>
          <p>{song.artist}</p>
        </div>
      </div>))
      )}
    </div>
  )
}

export default TopSongs
