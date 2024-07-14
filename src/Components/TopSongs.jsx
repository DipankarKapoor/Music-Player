import React,{useEffect} from 'react'

const TopSongs = ({ songs, onSelectSong,setSongs }) => {

  //Setting the top tracks and updating the songs array so that only the current tab is iterated
  useEffect(() => {
    const topTracks = songs.filter((song) => song.top_track);
    setSongs(topTracks);
  }, []);
  
  return (
    <div className="song-list">
    {songs.map((song) => ((<div key={song.id} className="song-item"  onClick={() => onSelectSong(song)}>
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
