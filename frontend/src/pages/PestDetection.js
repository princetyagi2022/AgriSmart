import React, { useState } from 'react';
import './PestDetection.css';
import { Link } from 'react-router-dom';

function PestDetection({ t }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  // --- DATABASE OF PESTS & SOLUTIONS ---
  const pestDatabase = [
    {
      name: "Stem Borer (तना छेदक)",
      severity: "High",
      medicine: "Chlorantraniliprole 18.5% SC",
      dosage: "60ml per acre in 200L water",
      time: "Evening (After 4 PM)",
      icon: "🐛"
    },
    {
      name: "Brown Plant Hopper (BPH)",
      severity: "Moderate",
      medicine: "Imidacloprid 17.8% SL",
      dosage: "100ml per acre",
      time: "Morning (Before 10 AM) or Evening",
      icon: "🦗"
    },
    {
      name: "Leaf Folder (प पत्ता लपेटक)",
      severity: "Moderate",
      medicine: "Cartap Hydrochloride 50% SP",
      dosage: "400g per acre",
      time: "Any time (Avoid Windy Days)",
      icon: "🍂"
    }
  ];

  // --- SIMULATE SCANNING FUNCTION ---
  const startScan = () => {
    setResult(null); // Clear previous result
    setScanning(true);

    // Fake delay of 2.5 seconds to look like "AI Processing"
    setTimeout(() => {
      setScanning(false);
      // Pick a random pest from the database
      const randomPest = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
      setResult(randomPest);
    }, 2500);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>
      <h1>📷 {t.pestTitle}</h1>

      {/* 1. CAMERA / SCAN AREA */}
      <div className="scanner-box" onClick={!scanning ? startScan : null}>
        
        {scanning ? (
          <>
            <div className="scan-line"></div>
            <p className="scan-text">{t.scanning}</p>
          </>
        ) : (
          <>
            <span className="camera-icon">📷</span>
            <p className="scan-text">{t.tapToScan}</p>
          </>
        )}

      </div>

      {/* 2. RESULT SECTION (Only shows after scan) */}
      {result && (
        <div className="result-card">
          <div className="pest-header">
            <div>
              <h2 className="pest-name">{result.icon} {result.name}</h2>
              <span style={{fontSize:'0.9rem', color:'#6b7280'}}>{t.detected}</span>
            </div>
            <span className="severity-badge">{t.severity}: {result.severity}</span>
          </div>

          <h3>🛡️ {t.remedy}</h3>
          
          <div className="medicine-box">
            <div className="info-row">
              <span className="label">💊 {t.medicine}:</span>
              <span className="value" style={{fontWeight:'bold'}}>{result.medicine}</span>
            </div>
            
            <div className="info-row">
              <span className="label">💧 {t.dosage}:</span>
              <span className="value">{result.dosage}</span>
            </div>

            <div className="info-row">
              <span className="label">⏰ {t.whenToUse}:</span>
              <span className="value" style={{color:'#be123c', fontWeight:'bold'}}>{result.time}</span>
            </div>
          </div>

          <div className="action-row">
            <button className="btn-buy" onClick={() => alert("Opening Maps to nearest Agri-Store...")}>
              🛒 {t.buyNow}
            </button>
            <button className="btn-scan-again" onClick={() => setResult(null)}>
              🔄 {t.scanAgain}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default PestDetection;