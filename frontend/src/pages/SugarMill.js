import React, { useState } from 'react';
import './SugarMill.css';
import { Link } from 'react-router-dom';

function SugarMill({ t }) {
  const [step, setStep] = useState(1); // 1 = Login, 2 = Dashboard
  const [activeTab, setActiveTab] = useState('calendar'); // calendar, supply, survey

  // Mock Form State
  const [captcha, setCaptcha] = useState('');
  
  // --- MOCK DATA FOR DROPDOWNS ---
  const districts = ["Shamli", "Meerut", "Saharanpur", "Muzaffarnagar"];
  const factories = ["Shamli Sugar Works", "Unn Sugar Mill", "Thanabhawan Mill"];
  const villages = ["Lank", "Kudana", "Bantikhera", "Sikka"];
  const growers = ["Ramesh Kumar", "Suresh Pal", "Mahendra Singh"];

  const handleLogin = () => {
    if (captcha === '5892') {
      setStep(2);
    } else {
      alert("Invalid Captcha! (Try 5892)");
    }
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-btn">{t.back}</Link>
      
      {/* HEADER SIMILAR TO GOVT SITE */}
      <div className="govt-header">
        <h2>चीनी उद्योग एवं गन्ना विकास विभाग</h2>
        <p>Sugar Industry & Cane Development Department, U.P.</p>
      </div>

      {/* STEP 1: ENQUIRY LOGIN FORM */}
      {step === 1 && (
        <div className="login-panel">
          
          {/* Captcha Simulation */}
          <div className="captcha-box">
            <p style={{marginBottom:'5px', fontSize:'0.9rem'}}>डाटा देखने के लिए कैप्चा डालें</p>
            <span className="captcha-code">5892</span>
            <input 
              type="text" 
              placeholder="Enter Code" 
              style={{padding:'5px', width:'100px', marginLeft:'10px'}}
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />
          </div>

          <div className="selection-grid">
            {/* District */}
            <div className="form-group">
              <label>District (जिला)</label>
              <select className="govt-select">
                <option>Select District</option>
                {districts.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Factory */}
            <div className="form-group">
              <label>Factory (फैक्ट्री)</label>
              <select className="govt-select">
                <option>Select Factory</option>
                {factories.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>

            {/* Village */}
            <div className="form-group">
              <label>Village (गाँव)</label>
              <select className="govt-select">
                <option>Select Village</option>
                {villages.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>

            {/* Grower */}
            <div className="form-group">
              <label>Grower (किसान)</label>
              <select className="govt-select">
                <option>Select Grower</option>
                {growers.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <button className="btn-view-data" onClick={handleLogin}>View (देखें)</button>
        </div>
      )}

      {/* STEP 2: DASHBOARD (After Login) */}
      {step === 2 && (
        <div className="dashboard-view">
          
          {/* GROWER INFO CARD */}
          <div className="grower-info-card">
            <h4 style={{margin:'0 0 10px 0', color:'#166534'}}>👤 Grower Details (कृषक विवरण)</h4>
            <div className="info-row">
              <span>Name:</span> <strong>Ramesh Kumar</strong>
            </div>
            <div className="info-row">
              <span>Village:</span> <strong>Lank (Shamli)</strong>
            </div>
            <div className="info-row">
              <span>Factory:</span> <strong>Shamli Sugar Works</strong>
            </div>
            <div className="info-row">
              <span>Mobile:</span> <strong>******8921</strong>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="tabs-scroll">
            <button 
              className={`tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveTab('calendar')}
            >
              🗓️ गन्ना कैलेंडर
            </button>
            <button 
              className={`tab-btn ${activeTab === 'supply' ? 'active' : ''}`}
              onClick={() => setActiveTab('supply')}
            >
              🎫 सप्लाई टिकट
            </button>
            <button 
              className={`tab-btn ${activeTab === 'survey' ? 'active' : ''}`}
              onClick={() => setActiveTab('survey')}
            >
              📊 सर्वे डेटा
            </button>
          </div>

          {/* TAB CONTENT: CALENDAR */}
          {activeTab === 'calendar' && (
            <div className="data-table-container">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th>Paksh (पक्ष)</th>
                    <th>Column (कॉलम)</th>
                    <th>Status</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3 (First Fortnight)</td>
                    <td>1</td>
                    <td><span className="status-issued">Issued</span></td>
                    <td>45 Qtls</td>
                  </tr>
                  <tr>
                    <td>4 (Second Fortnight)</td>
                    <td>3</td>
                    <td><span className="status-pending">Pending</span></td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td>5 (First Fortnight)</td>
                    <td>1</td>
                    <td><span className="status-pending">Pending</span></td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB CONTENT: TICKETS */}
          {activeTab === 'supply' && (
            <div className="data-table-container">
              <table className="calendar-table">
                <thead>
                  <tr>
                    <th>Ticket No</th>
                    <th>Date</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#892210</td>
                    <td>24 Dec 2025</td>
                    <td>Normal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB CONTENT: SURVEY */}
          {activeTab === 'survey' && (
            <div style={{padding:'20px', textAlign:'center', color:'#64748b'}}>
              <p>Basic Quota: <strong>450 Qtls</strong></p>
              <p>Cultivable Area: <strong>1.5 Hectare</strong></p>
              <p>Bonding: <strong>100%</strong></p>
            </div>
          )}

          <button className="btn-view-data" style={{background:'#64748b', marginTop:'20px'}} onClick={() => setStep(1)}>
            Logout (बाहर जाएं)
          </button>
        </div>
      )}

    </div>
  );
}

export default SugarMill;