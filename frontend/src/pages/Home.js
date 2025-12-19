import "./Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home({ t }) {
  // 1. Dynamic Greeting Logic
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    const today = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });

    setDate(today);

    // Set greeting key based on time
    if (hour < 12) setGreeting("goodMorning");
    else if (hour < 18) setGreeting("goodAfternoon");
    else setGreeting("goodEvening");
  }, []);

  return (
    <div className="home-page">
      {/* 2. Urgent Alert Banner */}
      <div className="urgent-banner">
        <span className="bell-icon">🔔</span>
        <div className="marquee">
          <span>
            ⚠️ <strong>{t.alertTitle}:</strong> {t.alertMsg} • 💊{" "}
            <strong>{t.taskTitle}:</strong> {t.taskMsg}
          </span>
        </div>
      </div>

      {/* 3. Hero Banner */}
      <div className="hero-banner">
        <div className="hero-text">
          <p className="date-badge">{date}</p>
          {/* Uses t[greeting] to get the correct language version */}
          <h2>
            {t[greeting] || "Namaste"}, {t.farmer}! 🚜
          </h2>
          <p>{t.welcomeSub}</p>
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div className="quick-actions">
        {/* Camera Scan */}
        <div className="action-btn" onClick={() => alert("Opening Camera...")}>
          <span className="icon-circle">📷</span>
          <span>{t.scan}</span>
        </div>

        {/* Expert Call */}
        <div className="action-btn" onClick={() => alert("Connecting...")}>
          <span className="icon-circle">📞</span>
          <span>{t.expert}</span>
        </div>

        {/* Calculator (Now Links to Soil Page where the Calc is) */}
        <Link to="/soil" className="action-btn">
          <span className="icon-circle">🔢</span>
          <span>{t.calc}</span>
        </Link>

        {/* News (Now Links to /news) */}
        <Link to="/news" className="action-btn">
          <span className="icon-circle">📰</span>
          <span>{t.news}</span>
        </Link>
      </div>
      {/* 5. Feature Grid */}
      <div className="features-grid">
        {/* Advisory */}
        <Link to="/advisory" className="card link-card advisory-card">
          <div className="card-top">
            <h3>🌾 {t.advisory}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>
            {t.nextTask}: <strong>{t.irrigation}</strong>
          </p>
          <div className="progress-bar">
            <div style={{ width: "70%" }}></div>
          </div>
        </Link>

        {/* Weather */}
        <Link to="/weather" className="card link-card weather-card">
          <div className="card-top">
            <h3>🌦️ {t.weather}</h3>
            <span className="live-temp">28°C</span>
          </div>
          <p>☁️ {t.rainLikely}</p>
        </Link>

        {/* Market */}
        <Link to="/market" className="card link-card market-card">
          <div className="card-top">
            <h3>💰 {t.market}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <div className="price-ticker">
            <span>
              Wheat: <strong>₹2100 ▲</strong>
            </span>
          </div>
        </Link>

        {/* Soil Health */}
        <Link to="/soil" className="card link-card soil-card">
          <div className="card-top">
            <h3>🧪 {t.soil}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>
            {t.lastTest}: <strong>{t.monthsAgo}</strong>
          </p>
        </Link>

        {/* Pest Detection */}
        <Link to="/pest" className="card link-card pest-card">
          <div className="card-top">
            <h3>🐛 {t.pest}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>{t.noOutbreaks}</p>
        </Link>

        {/* Gov Schemes */}
        <Link to="/schemes" className="card link-card scheme-card">
          <div className="card-top">
            <h3>🏦 {t.schemes}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>
            {t.nextPay}: <strong>{t.dec25}</strong>
          </p>
        </Link>

        {/* News Link in Home.js */}
        {/* News Card (New Design) */}
        <Link to="/news" className="card link-card news-card-grid">
          <div className="card-top">
            <h3>📰 {t.news}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>Latest Updates & Trends</p>
        </Link>

        {/* Sugar Mill Card */}
        <Link to="/sugarmill" className="card link-card sugar-card">
          <div className="card-top">
            <h3>🎋 {t.sugarTitle}</h3>
            <span className="arrow-btn">➜</span>
          </div>
          <p>{t.nextParchi}</p>
        </Link>
      </div>

      {/* 6. HOME FOOTER (New Addition) */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>🌱 AgriSmart</h4>
            <p>Empowering Farmers, feeding the nation.</p>
          </div>

          <div className="footer-links">
            <span>Help Center</span> • <span>Privacy Policy</span> •{" "}
            <span>Contact Us</span>
          </div>

          <div className="footer-contact">
            <p>
              📞 Kisan Call Center: <strong>8218485967</strong>
            </p>
          </div>

          <p className="copyright">
            © 2025 AgriSmart India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
