import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking, idx) => (
            <div key={idx} className="booking-card">
              <h3>{booking.center["Hospital Name"]}</h3>
              <p>{booking.center.Address}, {booking.center.City}, {booking.center.State} {booking.center["ZIP Code"]}</p>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.slot}</p>
              <p>Rating: {booking.center["Overall Rating"]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
