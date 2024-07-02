import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the Socket.io server

const App = () => {
  useEffect(() => {
    // Request permission to show notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      });
    }

    // Listen for new messages from the server
    socket.on('newMessage', (data) => {
      console.log(data)
      if (Notification.permission === 'granted') {
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

  return (
    <div>
      <h1>React Push Notification Example</h1>
      <p>Check your notifications after 5 seconds of loading this page.</p>
    </div>
  );
};

export default App;
