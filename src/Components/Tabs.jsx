import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const CustomTabs = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>For You</Tab>
        <Tab>Top Tracks</Tab>
      </TabList>

      {children}
    </Tabs>
  );
};

export default CustomTabs;
