import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';

const resources = [
  { label: 'Resume Tips', type: 'resume' },
  { label: 'Job Boards', type: 'jobs' },
  { label: 'Interview Prep', type: 'interview' },
  { label: 'Ask Advisor', type: 'advisor' },
];

const Sidebar = ({ open, onClose, onResourceClick }) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Career Resources
        </Typography>
      </Toolbar>
      <List>
        {resources.map((resource) => (
          <ListItem
            button
            key={resource.type}
            onClick={() => {
              onResourceClick(resource.type);
              onClose();
            }}
          >
            <ListItemText primary={resource.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
