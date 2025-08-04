import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ccc' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your question here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
