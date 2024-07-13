import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { fetchSongs } from "./API";
// import Header from './Components/Header';
import SongList from "./Components/SongList";
import TopSongs from "./Components/TopSongs";
import PlayerControls from "./Components/PlayerControls";
import Tabs from './Components/Tabs';
import Seeker from "./Components/Seeker";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  // const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());
  //audioRef.current = new Audio(); The ref persists between renders and doesn't change when other state changes cause a re-render

  const adaptiveStyle = {
    backgroundColor: '#000000',
    backgroundImage: currentSong ? `linear-gradient(108.18deg, ${currentSong.accent} 2.46%, rgba(0, 0, 0, 0.6) 99.84%)` : 'none'
  };

  //currentSong is a song object which contains song details

  //Runs on mount
  useEffect(() => {
    const getSongs = async () => {
      const songs = await fetchSongs();
      setSongs(songs);
      setCurrentSong(songs[0]);
      setIsPlaying(false);
      // setFilteredSongs(songs); //use of this line ?
    };
    getSongs();

  }, []);

  //runs every time song changes.
  useEffect(() => {

    if (currentSong) {
      audioRef.current.src = currentSong.url;
      setIsPlaying(false);

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleSongEnd);
      console.log(currentSong.accent);
      return () => {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("ended", handleSongEnd);
      };
    }
  }, [currentSong]);

  //Convert song duration in seconds to minutes and seconds
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }


  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSongEnd = () => {
    handleNext();
  };

  // const handleSearch = (query) => {
  //   const filtered = songs.filter(
  //     (song) =>
  //       song.title.toLowerCase().includes(query.toLowerCase()) ||
  //       song.artist.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredSongs(filtered);
  // };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
  };

  //Toggles play and pause button 
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    //take the songs array and filter out the current song
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1);
    nextIndex < songs.length ? setCurrentSong(songs[nextIndex]) : null;
  };

  const handlePrevious = () => {
    //take the songs array and filter out the current song
    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevIndex = (currentIndex - 1);
    prevIndex >= 0 ? setCurrentSong(songs[prevIndex]) : null;
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  //Adding components to load for tabs
  const tabs = [
    { label: 'For You', content: <SongList songs={songs} onSelectSong={handleSelectSong} /> },
    { label: 'Top Tracks', content: <TopSongs songs={songs} onSelectSong={handleSelectSong} /> }
  ];


  return (
    <>
      <div className="app" style={adaptiveStyle}>
        <div className="profile">
          <img className="logo" src="../public/spotify-logo.svg" alt="Spotify Logo" />
          <CgProfile className="profile-icon" />
        </div>

        {/* Loading tabs */}
        <Tabs tabs={tabs} />

        {currentSong && (
          <div className="current-song" >
            <div className="song-name">
              <h2>{currentSong.name}</h2>
              <h3>{currentSong.artist}</h3>
            </div>
            <img
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.title}
            />

            <Seeker
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              formatTime={formatTime}
            />
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
