import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import HistoryIcon from '@mui/icons-material/History';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';

const BottomNav = ({
  onResourcesClick,
  onChatHistoryClick,
  onShareClick,
  onDownloadClick,
}) => {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Resources"
          icon={<RestoreIcon />}
          onClick={onResourcesClick}
        />
        <BottomNavigationAction
          label="Chat History"
          icon={<HistoryIcon />}
          onClick={onChatHistoryClick}
        />
        <BottomNavigationAction
          label="Share"
          icon={<ShareIcon />}
          onClick={onShareClick}
        />
        <BottomNavigationAction
          label="Download"
          icon={<DownloadIcon />}
          onClick={onDownloadClick}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
