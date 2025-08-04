import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'fixed',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%',
  maxHeight: '70vh',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflowY: 'auto',
};

const ChatHistoryModal = ({ open, onClose, messages }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="chat-history-title" >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography id="chat-history-title" variant="h6">Chat History</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Box>
        <List>
          {messages.length === 0 && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No chat history available.
            </Typography>
          )}
          {messages.map((msg, idx) => (
            <ListItem key={idx} divider>
              <ListItemText
                primary={msg.text}
                primaryTypographyProps={{ 
                  component: 'span', 
                  style: { fontWeight: msg.sender === 'user' ? 'bold' : 'normal' }
                }}
                secondary={msg.sender === 'user' ? 'You' : 'AI Mentor'}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default ChatHistoryModal;
