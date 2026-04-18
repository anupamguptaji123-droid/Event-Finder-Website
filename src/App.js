import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventForm from './EventForm';
import CountdownTimer from './CountdownTimer';
import RegistrationModal from './RegistrationModal';
import './App.css';

const initialEvents = [
  {
    id: 1,
    title: "TechFest 2026",
    description: "Annual Technical Festival with coding competitions, workshops, and hackathons.",
    date: "2026-12-15T10:00:00",
    location: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    registered: false
  },
  {
    id: 2,
    title: "Career Summit",
    description: "Meet top recruiters from Google, Microsoft, and more!",
    date: "2025-12-10T09:00:00",
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    registered: false
  },
  {
    id: 3,
    title: "Cultural Night",
    description: "Music, dance, and food stalls!",
    date: "2026-12-20T18:00:00",
    location: "Sports Ground",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop",
    registered: false
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description: "Pitch your ideas to top angel investors.",
    date: "2026-11-25T14:00:00",
    location: "Innovation Hub",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop",
    registered: false
  },
  {
    id: 5,
    title: "Winter Hackathon",
    description: "48 hours of non-stop coding and building.",
    date: "2026-12-05T08:00:00",
    location: "Computer Labs",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
    registered: false
  },
  {
    id: 6,
    title: "Alumni Meet 2026",
    description: "Networking session with successful university alumni.",
    date: "2026-12-28T10:00:00",
    location: "Grand Ballroom",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    registered: false
  }
];

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  useEffect(() => {
    // const savedEvents = localStorage.getItem('events');
    // if (savedEvents) {
    //   setEvents(JSON.parse(savedEvents));
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now(), registered: false }]);
    setShowForm(false);
  };

  const toggleRegistration = (eventId) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, registered: !event.registered }
        : event
    ));
    setShowRegistrationModal(false);
  };

  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const pastEvents = events.filter(event => new Date(event.date) <= new Date());

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🎓 College Event Hub</h1>
          <p>Never miss an event again!</p>
          <button className="add-event-btn" onClick={() => setShowForm(true)}>
            + Add New Event
          </button>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {/* Featured Events */}
          {upcomingEvents.length > 0 && (
            <section className="featured-section">
              <h2>🔥 Featured Events</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {upcomingEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="featured-event">
                    <EventCard 
                      event={event} 
                      onRegister={() => {
                        setSelectedEvent(event);
                        setShowRegistrationModal(true);
                      }}
                    />
                    <CountdownTimer targetDate={event.date} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 3 && (
            <section className="events-section">
              <h2>📅 More Upcoming Events</h2>
              <div className="events-grid">
                {upcomingEvents.slice(3).map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onRegister={() => {
                      setSelectedEvent(event);
                      setShowRegistrationModal(true);
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section className="events-section">
              <h2>📜 Past Events</h2>
              <div className="events-grid">
                {pastEvents.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event}
                    onRegister={() => {
                      setSelectedEvent(event);
                      setShowRegistrationModal(true);
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {showForm && (
        <EventForm 
          onClose={() => setShowForm(false)}
          onAddEvent={addEvent}
        />
      )}

      {showRegistrationModal && selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setShowRegistrationModal(false)}
          onRegister={() => toggleRegistration(selectedEvent.id)}
        />
      )}
    </div>
  );
}

export default App;