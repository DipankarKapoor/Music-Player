import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { fetchSongs } from "./API";
// import Header from './Components/Header';
import SearchBar from "./Components/SearchBar";
import SongList from "./Components/SongList";
import PlayerControls from "./Components/PlayerControls";
// import CustomTabs from './Components/Tabs';
import Seeker from "./Components/Seeker";
import "./App.css";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());
  //audioRef.current = new Audio(); The ref persists between renders and doesn't change when other state changes cause a re-render

  //currentSong is a song object which contains song details

  //Runs on mount
  useEffect(() => {
    const getSongs = async () => {
      const songs = await fetchSongs();
      setSongs(songs);
      // setFilteredSongs(songs); //use of this line ?
    };
    getSongs();
  }, []);

  //runs every time song changes.
  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("ended", handleSongEnd);

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

  //Convert seconds to minutes and second
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
    //seekbar doesn't work if we format time 
    const updateTime = formatTime(audioRef.current.currentTime);
    setCurrentTime(updateTime);
    console.log(currentTime);
  };

  const handleLoadedMetadata = () => {
    //Convert seconds to minutes and second
    const songDuration = formatTime(audioRef.current.duration);
    setDuration(songDuration);
    console.log(songDuration);
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

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setCurrentSong(filteredSongs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentSong(filteredSongs[prevIndex]);
  };

  // const handleSeek = (time) => {
  //   audioRef.current.currentTime = time;
  //   setCurrentTime(time);
  // };

  return (
    <>
      {/* <Header /> */}
      <div className="app">
        <div className="profile">
          <img src="./assets/spotify-logo.svg" alt="Spotify Logo" />
          <CgProfile className="profile-icon" />
        </div>

        {/* <CustomTabs> */}
        <div className="music-tab">
          {/* handle search below */}
          {/* <SearchBar onSearch={handleSearch} /> */}

          <SongList
            songs={songs}
            onSelectSong={handleSelectSong}
            songDuration={duration}
          />
        </div>
        {/* </CustomTabs> */}

        {/* React if statement, if currentSong exixts then render after && as null values are falsy */}
        {currentSong && (
          <div className="current-song">
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
            <img
              src={`https://cms.samespace.com/assets/${currentSong.cover}`}
              alt={currentSong.title}
            />
          
            <Seeker
              currentTime={currentTime}
              duration={duration}
              // onSeek={handleSeek}
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
