import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { CalendarEvent, User } from './types';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Demo data
const DEMO_USER: User = {
  name: "John Doe",
  email: "john.doe@example.com",
  picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80"
};

const DEMO_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    summary: "Team Weekly Sync",
    start: {
      dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    end: {
      dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    location: "Meeting Room A"
  },
  {
    id: "2",
    summary: "Project Review",
    start: {
      dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    end: {
      dateTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    location: "Conference Room B"
  },
  {
    id: "3",
    summary: "Client Meeting",
    start: {
      dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    end: {
      dateTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(),
      timeZone: "UTC"
    },
    location: "Virtual"
  }
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(DEMO_EVENTS);

  const handleLogin = () => {
    // Simulate a small delay for realism
    setTimeout(() => {
      setUser(DEMO_USER);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9)
    };
    setEvents(prevEvents => [...prevEvents, event]);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {!user ? (
        <LoginPage onSuccess={handleLogin} />
      ) : (
        <Dashboard 
          events={events} 
          user={user} 
          onLogout={handleLogout}
          onAddEvent={handleAddEvent}
        />
      )}
    </GoogleOAuthProvider>
  );
}

export default App;