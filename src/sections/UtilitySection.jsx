import { Box } from '@mui/material';
import React from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SubjectPanel from '../forms/utility/SubjectPanel';
import BlocksPanel from '../forms/utility/BlocksPanel';
import DivisionPanel from '../forms/utility/DivisionPanel';

export default function UtilitySection() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Divisions"  value="1" sx={{textTransform:'capitalize'}}/>
            <Tab label="Subject" value="2" sx={{textTransform:'capitalize'}}/>
            <Tab label="Blocks" value="3" sx={{textTransform:'capitalize'}} />
          </TabList>
        </Box>
        <TabPanel value="1"><DivisionPanel /></TabPanel>
        <TabPanel value="2"><SubjectPanel /></TabPanel>
        <TabPanel value="3"><BlocksPanel /></TabPanel>
      </TabContext>
    </Box>
  );
}
