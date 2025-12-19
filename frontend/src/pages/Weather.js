import React, { useState, useEffect } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';

function Weather({ t }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. HELPER: Get Icon based on WMO Weather Code ---
  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'; // Clear sky
    if (code >= 1 && code <= 3) return '⛅'; // Partly cloudy
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Showers
    if (code >= 95) return '⛈️'; // Thunderstorm
    return '❓';
  };

  // --- 2. FETCH DATA FROM API ---
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // We add '&current=...' and '&daily=...' to your link to get the full dashboard data
        const URL = "https://api.open-meteo.com/v1/forecast?latitude=28.57&longitude=77.32&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto";
        
        const response = await fetch(URL);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // --- 3. PREPARE DATA FOR DISPLAY ---
  if (loading || !weatherData) {
    return <div className="page-container" style={{textAlign:'center', paddingTop:'50px'}}>⏳ Loading Forecast...</div>;
  }

  const current = weatherData.current;
  
  // Logic to get the next 5 hours from "Now"
  const currentHourIndex = new Date().getHours(); 
  const next5Hours = weatherData.hourly.time.slice(currentHourIndex, currentHourIndex + 6).map((time, index) => {
    // The API returns hourly data aligned with the array index (0 = 12 AM, 1 = 1 AM...)
    const actualIndex = currentHourIndex + index;
    return {
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(weatherData.hourly.temperature_2m[actualIndex]),
      icon: getWeatherIcon(weatherData.hourly.weather_code[actualIndex])
    };
  });

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>

      {/* 1. Main Weather Card (Live Data) */}
      <div className="weather-large">
        <h1>{Math.round(current.temperature_2m)}°C</h1>
        <p className="weather-location">📍 New Delhi, India</p>
        <p className="weather-desc">
          {getWeatherIcon(current.weather_code)} • {t.today}
        </p>
        
        {/* Extra Details Grid */}
        <div className="weather-grid">
          <div className="weather-detail">
            <span>💨 {t.wind}</span>
            <strong>{current.wind_speed_10m} km/h</strong>
          </div>
          <div className="weather-detail">
            <span>💧 {t.humidity}</span>
            <strong>{current.relative_humidity_2m}%</strong>
          </div>
          <div className="weather-detail">
            <span>👁️ {t.visibility}</span>
            <strong>10 km</strong> {/* API doesn't give visibility, keeping static */}
          </div>
          <div className="weather-detail">
            <span>☀️ {t.uv}</span>
            <strong>Moderate</strong>
          </div>
        </div>
      </div>

      {/* 2. Farmer Advisory Box */}
      <div className="advice-box">
        <h4>💡 {t.tipTitle}</h4>
        <p>{current.relative_humidity_2m > 70 ? t.tipMsg : "Weather is clear. Good for irrigation."}</p>
      </div>

      {/* 3. Hourly Forecast (Dynamic) */}
      <h3>{t.hourlyHeader}</h3>
      <div className="hourly-scroll">
        {next5Hours.map((item, index) => (
          <div key={index} className="hourly-card">
            <span>{index === 0 ? 'Now' : item.time}</span>
            <span className="hourly-icon">{item.icon}</span>
            <strong>{item.temp}°</strong>
          </div>
        ))}
      </div>

      {/* 4. 5-Day Forecast (Dynamic) */}
      <h3 style={{margin: '20px 0 10px'}}>{t.weeklyHeader}</h3>
      <div className="forecast-list">
        {weatherData.daily.time.slice(0, 5).map((dateStr, index) => {
          const date = new Date(dateStr);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div className="forecast-item" key={index}>
              <span>{index === 0 ? t.today : dayName}</span>
              <span>{getWeatherIcon(weatherData.daily.weather_code[index])}</span>
              <strong>{Math.round(weatherData.daily.temperature_2m_max[index])}° / {Math.round(weatherData.daily.temperature_2m_min[index])}°</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Weather;