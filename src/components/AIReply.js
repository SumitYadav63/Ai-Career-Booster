import React from "react";
import { Box, Typography, Avatar } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const AIReply = ({ messages }) => {
  return (
    <Box mx={2} my={3}>
      {messages.map((msg, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
          mb={2}
        >
          {msg.sender === 'ai' && (
            <Avatar alt="AI" src="logo3.png" sx={{ mr: 1 }} />
          )}
          <Box
            bgcolor={msg.sender === 'ai' ? '#f7f7f7' : '#1976d2'}
            color={msg.sender === 'ai' ? 'black' : 'white'}
            p={2}
            borderRadius={2}
            maxWidth="60%"
            whiteSpace="pre-wrap"
            boxShadow={1}
          >
            {msg.sender === 'ai'
              ? <ReactMarkdown>{msg.text}</ReactMarkdown>
              : <Typography variant="body1">{msg.text}</Typography>}
          </Box>
          {msg.sender === 'user' && (
            <Avatar alt="User" src="https://i.pravatar.cc/40?img=5" sx={{ ml: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AIReply;
