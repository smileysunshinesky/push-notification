import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { Button } from '@mui/material';

const socket = io('http://localhost:3001'); // Adjust URL as necessary

const App = () => {
  useEffect(() => {
    // Request permission to show notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }

    // Listen for new messages from the server
    socket.on('newMessage', (data) => {
      if (Notification.permission === 'granted') {
        console.log(data);
        new Notification(data.title, {
          body: data.body,
          icon: data.icon,
        }).onclick = () => {
          console.log('Push Notification clicked');
        };
        
      } else {
        console.log('Notification permission not granted');
      }
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.off('newMessage');
    };
  }, []);

  const clickToNotify = () => {
    if (Notification.permission === 'granted') {
      new Notification('Hello', {
        body: 'Hello, how are you?',
        icon: 'https://via.placeholder.com/128', // Placeholder icon
      }).onclick = () => {
        console.log('Push Notification clicked');
      };
    } else {
      console.log('Notification permission not granted');
    }
  };

  return (
    <Button onClick={clickToNotify}>Test Notification</Button>
  );
};

export default App;
