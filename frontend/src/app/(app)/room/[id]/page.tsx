"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useEcho from "@/hooks/echo";
import { axios } from "@/lib/axios";
import { MyDateCard } from "@/components/DateCard";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id;
  const [room, setRoom] = useState();
  const echo = useEcho();
  const [messages, setMessages] = useState<any[]>([]);
  const [myDates, setMyDates] = useState<DateItem[]>([]);
  // const [newMsg, setNewMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch existing messages
  // const fetchMessages = async () => {
  //   const res = await axios.get(`/api/rooms/${roomId}/messages`);
  //   setMessages(res.data);
  // };

  const leaveRoom = async () => {
    await axios.post(`/api/rooms/${roomId}/leave`);
    router.push('/lobby');
  };


  // useEffect(() => {
  //   if (!roomId) return;
  //   fetchMessages();
  // }, [roomId]);

  // Subscribe to Echo
  useEffect(() => {
    if (!echo || !roomId) return;

    const channel = echo.private(`room.${roomId}`)
      .listen('.RoomMessageSent', (event: any) => {
        setMessages(prev => [...prev, event.message]);
      });

    return () => {
      channel.stopListening('.RoomMessageSent');
    };
  }, [echo, roomId]);

  // const sendMessage = async () => {
  //   if (!newMsg) return;
  //   await axios.post(`/api/rooms/${roomId}/messages`, { message: newMsg });
  //   setNewMsg('');
  // };

  useEffect(() => {
    async function fetchRoom() {
      const res = await axios.get(`/api/rooms/${roomId}`);
      setRoom(res.data);
    }

    fetchRoom();
  }, []);

  useEffect(() => {
    async function fetchDates() {
      try {
        const res = await axios.get<{ public_others: DateItem[], public_friends: DateItem[], mine: DateItem[] }>("/api/dates", {
          withCredentials: true,
        });

        // setOtherDates(res.data.public_others);
        // setFriendDates(res.data.public_friends);
        setMyDates(res.data.mine);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDates();
  }, []);

  return (
    <div>
      <button onClick={leaveRoom}>Leave Room</button>

      <h1>Room {roomId} | Status {room?.status}</h1>

      <section>
        <h2 className="font-bold text-lg mb-2">Users</h2>
        {room?.users.length > 0 ? (
          <ul className="flex gap-2">
            {room.users.map(user => (
              <div key={user.id}>
                {user.name}
              </div>
            ))}
          </ul>
        ) : (
          <p>Getting Users</p>
        )}
      </section>
      <div className="flex-1 flex flex-col gap-4">

        <section>
          <h2 className="font-bold text-lg mb-2">My Dates</h2>
          {myDates.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {myDates.map(date => (
                <MyDateCard key={date.id} date={date} />
              ))}
            </ul>
          ) : (
            <p>Getting Dates</p>
          )}
        </section>
      </div>

      {/* {messages.length > 0 ? (
        <div>
          {messages.map((m, i) => (
            <div key={i}><strong>{m.user?.name}:</strong> {m.message}</div>
          ))}
        </div>
      ) : (
        <div>No messages</div>
      )}
      <input value={newMsg} onChange={e => setNewMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button> */}
    </div>
  );
}
