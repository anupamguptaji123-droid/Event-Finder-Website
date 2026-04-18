import React from 'react';

const EventCard = ({ event, onRegister }) => {
  const isRegistered = event.registered;
  
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <span>📍 {event.location}</span>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <button 
          className={`register-btn ${isRegistered ? 'registered' : ''}`}
          onClick={() => onRegister(event)}
        >
          {isRegistered ? '✅ Registered' : '📝 Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;