import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Sidebar from './components/Sidebar';
import AIReply from './components/AIReply';
import ChatInput from './components/ChatInput';
import BottomNav from './components/BottomNav';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ChatHistoryModal from './components/ChatHistoryModal';

import { fetchGeminiReply } from './api/gemini';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSignOut = async () => {
    await signOut(auth);
    setMessages([]);
  };

  const handleSend = async (userMessage) => {
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setMessages((prev) => [...prev, { sender: 'ai', text: 'Thinking...' }]);

    const aiText = await fetchGeminiReply(userMessage);

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 && msg.text === 'Thinking...'
          ? { ...msg, text: aiText }
          : msg
      )
    );
  };

  const toggleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  // Sidebar resource click handler adds predefined tips to chat
  const handleResourceClick = (type) => {
    let tip = '';
    switch (type) {
      case 'resume':
        tip = "Top Resume Tips:\n• Use clear action verbs.\n• Quantify achievements.\n• Keep to 1 page for entry-level.";
        break;
      case 'jobs':
        tip = "Popular Job Boards:\n• LinkedIn\n• Indeed\n• Glassdoor\n• AngelList";
        break;
      case 'interview':
        tip = "Interview Prep:\n• Research the company.\n• Practice common questions.\n• Prepare your own questions.";
        break;
      case 'advisor':
        tip = "Ask the AI Career Mentor any career question here!";
        break;
      default:
        tip = '';
    }
    if (tip) {
      setMessages((prev) => [...prev, { sender: 'ai', text: tip }]);
    }
  };

  const exportChatAsText = () => {
    let chatText = messages
      .map((msg) => `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`)
      .join('\n\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat-history.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareChat = async () => {
    try {
      const chatText = messages
        .map((msg) => `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`)
        .join('\n\n');

      if (navigator.share) {
        await navigator.share({
          title: 'AI Career Mentor Chat',
          text: chatText,
        });
      } else {
        alert('Sharing not supported on this browser.');
      }
    } catch (error) {
      alert('Error sharing: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Box sx={{ mt: 5 }}>
        {showSignUp ? (
          <>
            <SignUp onSignUpSuccess={() => setShowSignUp(false)} />
            <Button onClick={() => setShowSignUp(false)} sx={{ mt: 2 }}>
              Have an account? Sign In
            </Button>
          </>
        ) : (
          <>
            <SignIn onSignInSuccess={() => {}} />
            <Button onClick={() => setShowSignUp(true)} sx={{ mt: 2 }}>
              Don't have an account? Sign Up
            </Button>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            AI Career Mentor
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <Sidebar
        open={sidebarOpen}
        onClose={toggleSidebar}
        onResourceClick={handleResourceClick}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, mb: 10 }}>
        <button onClick={() => setMessages([])} style={{ marginBottom: '10px' }}>
          Clear Chat History
        </button>

        <AIReply messages={messages} />
        <ChatInput onSend={handleSend} />
      </Box>

      <BottomNav
        onChatHistoryClick={toggleHistory}
        onDownloadClick={exportChatAsText}
        onShareClick={shareChat}
        onResourcesClick={() => window.open('https://www.example.com/career-resources', '_blank')}
      />

      <ChatHistoryModal open={historyOpen} onClose={toggleHistory} messages={messages} />
    </Box>
  );
}

export default App;
