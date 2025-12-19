import React, { useState } from 'react';
import './SoilHealth.css';
import { Link } from 'react-router-dom';

function SoilHealth({ t }) {
  // Mock Data: Simulating a user whose soil is Low in Nitrogen
  const soilData = {
    n: { value: 240, status: 'low', label: t.low },    // Low N
    p: { value: 18, status: 'ideal', label: t.ideal }, // Ideal P
    k: { value: 280, status: 'high', label: t.high },  // High K
    s: { value: 8, status: 'low', label: t.low }       // Low Sulfur
  };

  // Calculator State
  const [acres, setAcres] = useState('');
  const [result, setResult] = useState(null);

  const calculateDose = () => {
    const size = parseFloat(acres);
    if (!size || size <= 0) return;

    // Logic: 1 Acre Wheat usually needs ~100kg Urea, ~50kg DAP, ~30kg MOP (Approx)
    // We adjust this because Nitrogen is 'Low' (add 20% more Urea)
    const baseUrea = 100; 
    const extraUrea = soilData.n.status === 'low' ? 20 : 0;
    
    setResult({
      urea: Math.ceil((baseUrea + extraUrea) * size),
      dap: Math.ceil(50 * size),
      mop: Math.ceil(30 * size),
      bagsUrea: Math.ceil(((baseUrea + extraUrea) * size) / 45), // 45kg bags
      bagsDap: Math.ceil((50 * size) / 50) // 50kg bags
    });
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>
      <h1>🧪 {t.soilTitle}</h1>

      {/* 1. SOIL HEALTH CARD */}
      <div className="health-card">
        <div className="report-header">
          <h3>{t.status}</h3>
          <span className="test-date">{t.lastTested}: 12 Oct 2024</span>
        </div>

        <div className="nutrient-grid">
          {/* Nitrogen */}
          <div className="nutrient-item">
            <div className={`circle-gauge status-${soilData.n.status}`}>
              <span className="gauge-val">{soilData.n.value}</span>
              <span className="gauge-label">Kg/Ha</span>
            </div>
            <span className="nutrient-name">{t.nitrogen}</span>
            <span className="status-text" style={{color: 'red'}}>⚠️ {soilData.n.label}</span>
          </div>

          {/* Phosphorus */}
          <div className="nutrient-item">
            <div className={`circle-gauge status-${soilData.p.status}`}>
              <span className="gauge-val">{soilData.p.value}</span>
              <span className="gauge-label">Kg/Ha</span>
            </div>
            <span className="nutrient-name">{t.phosphorus}</span>
            <span className="status-text">{soilData.p.label}</span>
          </div>

          {/* Potassium */}
          <div className="nutrient-item">
            <div className={`circle-gauge status-${soilData.k.status}`}>
              <span className="gauge-val">{soilData.k.value}</span>
              <span className="gauge-label">Kg/Ha</span>
            </div>
            <span className="nutrient-name">{t.potassium}</span>
            <span className="status-text">{soilData.k.label}</span>
          </div>

          {/* Sulfur */}
          <div className="nutrient-item">
            <div className={`circle-gauge status-${soilData.s.status}`}>
              <span className="gauge-val">{soilData.s.value}</span>
              <span className="gauge-label">PPM</span>
            </div>
            <span className="nutrient-name">{t.sulfur}</span>
            <span className="status-text" style={{color: 'red'}}>⚠️ {soilData.s.label}</span>
          </div>
        </div>
      </div>

      {/* 2. FERTILIZER CALCULATOR */}
      <h3>🔢 {t.calcTitle}</h3>
      <div className="calculator-box">
        <div className="calc-input-group">
          <input 
            type="number" 
            placeholder={t.enterLand} 
            className="land-input"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
          />
          <button className="calc-btn" onClick={calculateDose}>{t.calculate}</button>
        </div>

        {result && (
          <div className="calc-result">
            <h4 style={{marginBottom:'10px', color:'#1e40af'}}>{t.recommendation}:</h4>
            
            <div className="result-row">
              <span>{t.urea} (46% N)</span>
              <strong>{result.urea} kg ({result.bagsUrea} {t.bags})</strong>
            </div>
            
            <div className="result-row">
              <span>{t.dap} (18% N, 46% P)</span>
              <strong>{result.dap} kg ({result.bagsDap} {t.bags})</strong>
            </div>

            <div className="result-row" style={{borderTop:'1px solid #bfdbfe', paddingTop:'5px'}}>
              <span style={{fontSize:'0.8rem', color:'#60a5fa'}}>*Adjusted based on Low Nitrogen level</span>
            </div>
          </div>
        )}
      </div>

      <button className="btn-book">📅 {t.bookTest}</button>

    </div>
  );
}

export default SoilHealth;