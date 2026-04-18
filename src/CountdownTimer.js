import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown">
      <h3>⏰ Time Remaining</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="time-unit">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.days || 0}</div>
          <div>Days</div>
        </div>
        <div className="time-unit">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.hours || 0}</div>
          <div>Hours</div>
        </div>
        <div className="time-unit">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.minutes || 0}</div>
          <div>Mins</div>
        </div>
        <div className="time-unit">
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{timeLeft.seconds || 0}</div>
          <div>Secs</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;