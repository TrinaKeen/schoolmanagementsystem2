import { useEffect, useState } from 'react';

// Define types
type Message = {
  id: number;
  userId: number;
  message: string;
  createdAt: string; // or Date if you parse it
};

type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  async function fetchMessages() {
    try {
      const res = await fetch('/api/messages');
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }

  async function sendMessage() {
    if (!text.trim()) return;
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const newMsg: Message = await res.json();
      setMessages((prev) => [...prev, newMsg]);
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="chatbox">
        <button onClick={onClose}>Close</button>
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id}>{m.message}</div>
          ))}
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
