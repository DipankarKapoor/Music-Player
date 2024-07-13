import React from 'react'

const TopSongs = ({ songs, onSelectSong }) => {
  return (
    <div className="song-list">
    {songs.map((song) => (song.top_track && (
      <div key={song.id} className="song-item"  onClick={() => onSelectSong(song)}>
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
        <div className="song-info">
          <h4>{song.name}</h4>
          <p>{song.artist}</p>
        </div>
        {/* <span className="song-duration">{songDuration ? songDuration : null}</span> */}
      </div>))
      )}
  </div>
  )
}

export default TopSongs
