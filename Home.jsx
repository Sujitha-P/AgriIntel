import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({navigate}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [crop, setCrop] = useState('');
  const [season, setSeason] = useState('');
  const [state, setState] = useState('');
  const [area, setArea] = useState('');
  const [yieldResult, setYieldResult] = useState(null);


  useEffect(() => {
    if (city) {
      const fetchWeatherData = async () => {
        try {
          const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (err) {
            console.error('Error fetching weather data:', err.message);
        }
      };

      fetchWeatherData();
    }
  }, [city]);

  const handleWeatherSubmit = async (e) => {
    e.preventDefault();
    setCity(city);
  };

  const handleYieldSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        crop, season, state, area
      });
      setYieldResult(response.data.predicted_yield);
    } catch (err) {
      console.error(err);
    }
  };

  const getUniqueDays = (data) => {
    const seenDates = new Set();
    return data.filter((day) => {
      const date = new Date(day.dt * 1000).toDateString();
      if (seenDates.has(date)) {
        return false;
      }
      seenDates.add(date);
      return true;
    });
  };

  return (
    <div className="home">
      <div className="weather-section">
        <h1>Weather Forecast</h1>
        <form onSubmit={handleWeatherSubmit} className="weather-form">
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <button type="submit">Get Weather</button>
        </form>
        {weatherData && (
          <div className="weather-container">
            {getUniqueDays(weatherData.list).slice(0, 5).map((day, index) => (
              <div key={index} className="weather-day">
                <h3>{new Date(day.dt * 1000).toDateString()}</h3>
                <p>Temperature: {day.main.temp}°C</p>
                <p>Weather: {day.weather[0].description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="crop-yield-section">
        <h1>Crop Yield Prediction</h1>
        <form onSubmit={handleYieldSubmit}>
          <div className="form-group">
            <label htmlFor="crop">Crop:</label>
            <input
              type="text"
              id="crop"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="season">Season:</label>
            <input
              type="text"
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">Area (in acres):</label>
            <input
              type="number"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>
          <button type="submit">Predict Yield</button>
        </form>
        {yieldResult !== null && <p>Predicted Yield: {yieldResult}</p>}

      </div>
      <div>
      <button onClick={() => navigate('login')}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
