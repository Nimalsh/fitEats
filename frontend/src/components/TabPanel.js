import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{width: '100%' }}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabPanel;