import React, { useState } from 'react';

const RegistrationModal = ({ event, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    setSubmitted(true);
    setTimeout(() => {
      onRegister();
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2>Registration Successful!</h2>
            <p>You are now registered for <strong>{event.title}</strong></p>
            <p>Check your email for confirmation.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '1rem' }}>
              Awesome!
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <h2>📝 Register for {event.title}</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          {event.description}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>College/University</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Now
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationModal;