"use client";

import { useAuthContext } from '@/context/AuthContext';
import { useEcho } from '@/context/EchoContext';
import { useEffect } from 'react';

export default function Lobby() {
  const user = useAuthContext();
  const echo = useEcho();

  // useEffect(() => {
  //   if (!echo) return;

  //   // You can subscribe to additional channels here
  //   echo.private('some-channel').listen('SomeEvent', (e) => {
  //     console.log('SomeEvent received', e);
  //   });
  // }, [echo]);

  useEffect(() => {
    if (!echo) return;

    echo.private(`user.${user.id}`)
      .listen('.test.event', (e) => {
        alert("Received: " + e.message);
      });
  }, [echo]);


  return <div>Lobby</div>;
}