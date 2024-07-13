import React, { useState } from 'react';
import SearchBar from './SearchBar';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import SongList from "./Components/SongList";
// import 'react-tabs/style/react-tabs.css';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // tabs is an array of objects

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