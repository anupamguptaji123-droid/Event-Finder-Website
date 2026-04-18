import React, { useState } from 'react';

const EventForm = ({ onClose, onAddEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>➕ Add New Event</h2>
        <div className="form-group">
          <label>Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date & Time *</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo..."
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </div>
      </form>
    </>
  );
};

export default EventForm;