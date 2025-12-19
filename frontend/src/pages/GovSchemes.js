import React, { useState, useEffect } from 'react';
import './GovSchemes.css';
import { Link } from 'react-router-dom';

function GovSchemes({ t }) {
  // Default to MOCK DATA immediately to ensure it works
  const [schemes, setSchemes] = useState([
    {
      scheme_name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      ministry_name: "Ministry of Agriculture & Farmers Welfare",
      details: "Direct income support of Rs. 6,000 per year to all landholding farmer families."
    },
    {
      scheme_name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      ministry_name: "Ministry of Agriculture",
      details: "Crop insurance scheme that provides financial support to farmers suffering crop loss/damage."
    },
    {
      scheme_name: "Kisan Credit Card (KCC)",
      ministry_name: "Ministry of Finance",
      details: "Provides farmers with timely and adequate credit for cultivation expenses."
    },
    {
      scheme_name: "Soil Health Card Scheme",
      ministry_name: "Dept of Agriculture",
      details: "Helps farmers check soil nutrient status and get advice on the right dosage of fertilizers."
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- API CALL (Commented out to fix your issue first) ---
  /* const fetchSchemes = async () => {
    setLoading(true);
    try {
      const API_KEY = "579b464db66ec23bdd000001424c4c823c1340f6511fe5e40830b214";
      const RESOURCE_ID = "9afdf346-16d7-4f17-a2e3-684540c59a77";
      const URL = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=25`;
      
      const response = await fetch(URL);
      const data = await response.json();
      
      if (data.records && data.records.length > 0) {
        setSchemes(data.records);
      }
    } catch (err) {
      console.log("API Failed, staying on Mock Data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchemes();
  }, []);
  */

  // --- SIMPLE FILTER LOGIC ---
  const filteredSchemes = schemes.filter(item => {
    if (searchTerm === "") return true; // Show all if search is empty
    
    const search = searchTerm.toLowerCase();
    
    // Check Name, Ministry, and Details
    const name = (item.scheme_name || "").toLowerCase();
    const ministry = (item.ministry_name || "").toLowerCase();
    const details = (item.details || "").toLowerCase();

    return name.includes(search) || ministry.includes(search) || details.includes(search);
  });

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>
      
      <h1>🏦 {t.schemesTitle}</h1>

      {/* Search Bar */}
      <div className="search-box-container">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder={t.searchSchemes} 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <div className="status-msg">⏳ {t.loadingSchemes}</div>}
      
      {/* Scheme List */}
      <div className="scheme-list">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, index) => (
            <div key={index} className="scheme-card">
              <div className="scheme-header">
                <h3>{scheme.scheme_name}</h3>
                <span className="ministry-badge">
                  {scheme.ministry_name}
                </span>
              </div>
              
              <div className="scheme-body">
                <p>
                  <strong>{t.benefits}:</strong><br/>
                  {scheme.details}
                </p>
              </div>

              <div className="scheme-footer">
                <button className="btn-details">{t.viewMore}</button>
                <button className="btn-apply">{t.applyNow}</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <span style={{fontSize: '3rem'}}>🕵️</span>
            <h3>No schemes found matching "{searchTerm}"</h3>
            <button className="clear-btn" onClick={() => setSearchTerm('')}>Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GovSchemes;