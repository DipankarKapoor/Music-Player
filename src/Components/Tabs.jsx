import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
// import SongList from "./Components/SongList";

const Tabs = ({ tabs, setSongs }) => {
  const [activeTab, setActiveTab] = useState(0);
  // tabs is an array of objects

  // useEffect(() => {
  //   setSongs();
  // }, [activeTab, setSongs, tabs]);

  return (
    <div className="music-list">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button 
            key={index} 
            className={`tab ${activeTab === index ? 'active' : ''}`} 
            onClick={() => setActiveTab(index)}
          >
            <p>{tab.label}</p>
          </button>
        ))}
      </div>
      <SearchBar />
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;