import React from 'react';
import './CropAdvisory.css';
import { Link } from 'react-router-dom';

function CropAdvisory({ t }) {
  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>
      
      <h1>🌾 {t.advisory}</h1>
      <p style={{marginBottom: '20px', color: '#666'}}>
        {t.guidance} <strong>{t.rabi}</strong>.
      </p>

      {/* Wheat Details */}
      <div className="crop-item">
        <div className="card-header">
          {/* Shows "Wheat" in English or "गेहूं" in Hindi */}
          <h4>{t.wheat}</h4> 
          <span className="badge">{t.majorCrop}</span>
        </div>
        <div className="crop-details">
          <p><strong>📅 {t.sowingLabel}:</strong> {t.wheatSowing}</p>
          <p><strong>🧪 {t.fertLabel}:</strong> {t.wheatFert}</p>
          <p><strong>💧 {t.waterLabel}:</strong> {t.wheatWater}</p>
          <button className="secondary-btn" style={{marginTop: '10px'}}>{t.viewSchedule}</button>
        </div>
      </div>
      
      {/* Mustard Details */}
      <div className="crop-item">
        <div className="card-header">
          <h4>{t.mustard}</h4>
          <span className="badge">{t.oilseed}</span>
        </div>
        <div className="crop-details">
          <p><strong>📅 {t.sowingLabel}:</strong> {t.mustardSowing}</p>
          <p><strong>🧪 {t.fertLabel}:</strong> {t.mustardFert}</p>
          <p><strong>💧 {t.waterLabel}:</strong> {t.mustardWater}</p>
          <button className="secondary-btn" style={{marginTop: '10px'}}>{t.viewSchedule}</button>
        </div>
      </div>

    </div>
  );
}

export default CropAdvisory;