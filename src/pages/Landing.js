import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Landing = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingStates(true);
    fetch('https://meddata-backend.onrender.com/states')
      .then(res => res.json())
      .then(data => {
        setStates(data);
        setLoadingStates(false);
      })
      .catch(() => setLoadingStates(false));
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(data => {
          setCities(data);
          setLoadingCities(false);
        })
        .catch(() => setLoadingCities(false));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/results?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <div className="landing-container">
      <nav className="top-nav">
        <ul className="nav-list">
          <li className="nav-item">Find Doctors</li>
          <li className="nav-item">Hospitals</li>
          <li className="nav-item">Medicines</li>
        </ul>
      </nav>
      <section className="search-section">
        <form className="search-form" onSubmit={handleSubmit}>
          <div id="state" className="dropdown-container">
            <label htmlFor="state-select">State:</label>
            <select
              id="state-select"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              disabled={loadingStates}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div id="city" className="dropdown-container">
            <label htmlFor="city-select">City:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              disabled={!selectedState || loadingCities}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button type="submit" id="searchBtn" className="search-btn" disabled={!selectedState || !selectedCity}>Search</button>
        </form>
      </section>
    </div>
  );
};

export default Landing;
