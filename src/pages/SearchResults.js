import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const state = query.get('state');
  const city = query.get('city');
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state && city) {
      setLoading(true);
      fetch(`https://meddata-backend.onrender.com/data?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
          setCenters(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch medical centers.');
          setLoading(false);
        });
    }
  }, [state, city]);

  const handleBook = (center) => {
    navigate('/booking', { state: { center } });
  };

  return (
    <div className="results-container">
      <h1>{centers.length} medical centers available in {city ? city.toLowerCase() : ''}</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="centers-list">
        {centers.map((center, idx) => (
          <div key={idx} className="center-card">
            <h3>{center["Hospital Name"]}</h3>
            <p>{center.Address}, {center.City}, {center.State} {center["ZIP Code"]}</p>
            <p>Rating: {center["Overall Rating"]}</p>
            <button onClick={() => handleBook(center)}>
              Book FREE Center Visit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
