import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Articlecard } from './Articlecard';
import Newarticleform from './Newarticleform';

function Articles() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box className="mt-5 px-5">
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Articles" />
        <Tab label="New Article" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <div className="flex flex-wrap gap-5">
          {[1, 1, 1, 1].map((item, index) => (
            <Articlecard key={index} />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {/* Add content for "New Article" here */}
        <Box sx={{ mt: 2 }}>
          <Newarticleform />
        </Box>
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default Articles;
