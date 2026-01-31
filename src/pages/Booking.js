import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const getNext7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const timeSlots = [
  { label: 'Morning', slots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
  { label: 'Afternoon', slots: ['12:00 PM', '01:00 PM', '02:00 PM'] },
  { label: 'Evening', slots: ['04:00 PM', '05:00 PM', '06:00 PM'] },
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const center = location.state?.center;
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [success, setSuccess] = useState(false);

  const days = getNext7Days();

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) return;
    const booking = {
      center,
      date: selectedDate,
      slot: selectedSlot,
    };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    setSuccess(true);
    setTimeout(() => {
      navigate('/my-bookings');
    }, 1200);
  };

  return (
    <div className="booking-container">
      <h1>Book Appointment</h1>
      {center && (
        <div className="center-details">
          <h3>{center["Hospital Name"]}</h3>
          <p>{center.Address}, {center.City}, {center.State} {center["ZIP Code"]}</p>
          <p>Rating: {center["Overall Rating"]}</p>
        </div>
      )}
      <div className="calendar-section">
        <label>Select Date:</label>
        <div className="date-list">
          {days.map((d, idx) => (
            <button
              key={idx}
              className={selectedDate === d.toDateString() ? 'selected' : ''}
              onClick={() => setSelectedDate(d.toDateString())}
            >
              <p>{idx === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <span>{d.toLocaleDateString()}</span>
            </button>
          ))}
        </div>
      </div>
      {selectedDate && (
        <div className="slots-section">
          <label>Select Time Slot:</label>
          {timeSlots.map((group, idx) => (
            <div key={group.label} className="slot-group">
              <p>{group.label}</p>
              <div className="slot-list">
                {group.slots.map(slot => (
                  <button
                    key={slot}
                    className={selectedSlot === slot ? 'selected' : ''}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="book-btn"
        onClick={handleBooking}
        disabled={!selectedDate || !selectedSlot}
      >
        Book FREE Center Visit
      </button>
      {success && <p>Booking successful! Redirecting...</p>}
    </div>
  );
};

export default Booking;
